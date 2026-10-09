using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Features.Auth.Commands.SyncUser;
using Nudge.Application.Features.Auth.Queries.GetMenuList;
using Nudge.Application.Helpers;
using Nudge.Application.Models.Auth.Response;
using System.Data;

namespace Nudge.Application.Features.Auth.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, ErrorOr<LoginResponse>>
{
    private readonly IGenericRepository _repo;
    private readonly JWTHelper _jwt;
    private readonly IMediator _mediator;
    private readonly IZitadelService _zitadelService;

    public LoginCommandHandler(
        IGenericRepository repo,
        JWTHelper jwt,
        IMediator mediator,
        IZitadelService zitadelService)
    {
        _repo = repo;
        _jwt = jwt;
        _mediator = mediator;
        _zitadelService = zitadelService;
    }

    public async Task<ErrorOr<LoginResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Password))
            return Error.Validation("Auth.PasswordEmpty", "Password cannot be empty!");

        var username = request.UserName ?? string.Empty;

        // 1. Primary: Authenticate against Zitadel Identity Provider
        var zitadelAuth = await _zitadelService.AuthenticateAsync(username, request.Password, cancellationToken);

        if (zitadelAuth.Success)
        {
            // Sync & Upsert Zitadel user details into PostgreSQL
            var syncCmd = new SyncUserSessionCommand(
                SubjectId: zitadelAuth.SubjectId ?? Guid.NewGuid().ToString(),
                Email: zitadelAuth.Email ?? $"{username}@nudge.np",
                UserName: zitadelAuth.UserName ?? username,
                Name: zitadelAuth.Name ?? username
            );

            var syncResult = await _mediator.Send(syncCmd, cancellationToken);
            var userSession = syncResult.IsError ? null : syncResult.Value;

            var roleId = userSession?.RoleId ?? 2;
            var creatorId = userSession?.CreatorId ?? 1;
            var userId = userSession?.UserId ?? 1;
            var permissions = userSession?.Permissions?.ToList() ?? new List<string> { "USR.C" };

            var menuResponse = await _mediator.Send(new GetMenuListQuery { RoleId = roleId }, cancellationToken);
            var menuList = menuResponse != null && menuResponse.Success && menuResponse.Data is IEnumerable<MenuListResponseModel> menus
                ? menus.ToList()
                : new List<MenuListResponseModel>();

            return new LoginResponse
            {
                UserId = userId,
                CreatorId = creatorId,
                Token = zitadelAuth.AccessToken ?? _jwt.GenerateToken(userId, username, roleId, creatorId, permissions, Enumerable.Empty<string>()),
                UserName = username,
                Name = zitadelAuth.Name ?? username,
                RoleName = roleId == 1 ? "Admin" : "Creator",
                RoleId = roleId,
                Permissions = permissions,
                MenuList = menuList,
                CreatoId = creatorId
            };
        }

        // 2. Fallback: Local database authentication for development or migration transition
        var loginParams = new { p_flag = "B", p_username = username };

        var localUser = await _repo.QueryFirstOrDefaultAsync<UserLoginRow>(
            "SELECT * FROM permission.fn_auth(@p_flag, @p_username);",
            loginParams,
            commandType: CommandType.Text,
            cancellationToken: cancellationToken);

        string passwordHashToVerify = localUser?.Password ?? "$2a$11$DummyHashToFoolAttackersSimulatingFullBcryptWorkFactorLength";
        bool isPasswordValid = PasswordHelper.VerifyPassword(request.Password, passwordHashToVerify);

        if (localUser is null || !isPasswordValid)
            return Error.Unauthorized("Auth.InvalidCredentials", zitadelAuth.ErrorMessage ?? "Invalid username or password");

        if (!localUser.IsActive)
            return Error.Forbidden("Auth.AccountInactive", "Account is inactive");

        if (localUser.UserName is null)
            return Error.Unexpected("Auth.ProfileCorrupt", "User identity profile is corrupt!");

        var listPermissions = !string.IsNullOrWhiteSpace(localUser.CompressedPermissions) ?
            localUser.CompressedPermissions.Split(',').Select(p => p.Trim()).ToList() : new List<string>();

        var localMenuResponse = await _mediator.Send(new GetMenuListQuery { RoleId = localUser.RoleId }, cancellationToken);
        var localMenuList = localMenuResponse != null && localMenuResponse.Success && localMenuResponse.Data is IEnumerable<MenuListResponseModel> mList
            ? mList.ToList()
            : new List<MenuListResponseModel>();

        var localToken = _jwt.GenerateToken(localUser.UserId, localUser.UserName, localUser.RoleId, localUser.CreatorId, listPermissions, Enumerable.Empty<string>());

        return new LoginResponse
        {
            UserId = localUser.UserId,
            CreatorId = localUser.CreatorId,
            Token = localToken,
            UserName = localUser.UserName,
            Name = localUser.Name ?? string.Empty,
            RoleName = localUser.RoleName ?? string.Empty,
            RoleId = localUser.RoleId,
            Permissions = listPermissions,
            MenuList = localMenuList,
            CreatoId = localUser.CreatorId
        };
    }
}
