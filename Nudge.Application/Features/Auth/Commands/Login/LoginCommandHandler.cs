using ErrorOr;
using MediatR;
using Nudge.Application.Features.Auth.Queries.GetMenuList;
using Nudge.Application.Helpers;
using Nudge.Application.Models.Auth.Response;
using System.Data;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.Auth.Commands.Login;

// Standardized to return ErrorOr<LoginResponse> to keep application core pure
public class LoginCommandHandler : IRequestHandler<LoginCommand, ErrorOr<LoginResponse>>
{
    private readonly IGenericRepository _repo;
    private readonly JWTHelper _jwt;
    private readonly IMediator _mediator;

    public LoginCommandHandler(IGenericRepository repo, JWTHelper jwt, IMediator mediator)
    {
        _repo = repo;
        _jwt = jwt;
        _mediator = mediator;
    }

    public async Task<ErrorOr<LoginResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Password))
            return Error.Validation("Auth.PasswordEmpty", "Password cannot be empty!");

        var loginParams = new { p_flag = "B", p_username = request.UserName };

        // 1. Forwarded cancellationToken to native Dapper setup
        var user = await _repo.QueryFirstOrDefaultAsync<UserLoginRow>(
            "SELECT * FROM permission.fn_auth(@p_flag, @p_username);",
            loginParams,
            commandType: CommandType.Text,
            cancellationToken: cancellationToken);

        // 2. Timing Attack Mitigation: Run a dummy verification if the user doesn't exist
        // This ensures the response takes ~1 second regardless of whether the username is valid
        string passwordHashToVerify = user?.Password ?? "$2a$11$DummyHashToFoolAttackersSimulatingFullBcryptWorkFactorLength";
        bool isPasswordValid = PasswordHelper.VerifyPassword(request.Password, passwordHashToVerify);

        if (user is null || !isPasswordValid)
            return Error.Unauthorized("Auth.InvalidCredentials", "Invalid username or password");

        if (!user.IsActive)
            return Error.Forbidden("Auth.AccountInactive", "Account is inactive");

        if (user.UserName is null)
            return Error.Unexpected("Auth.ProfileCorrupt", "User identity profile is corrupt!");

        // 3. Clean string separation handling
        var listPermissions = !string.IsNullOrWhiteSpace(user.CompressedPermissions) ?
            user.CompressedPermissions.Split(',').Select(p => p.Trim()).ToList() : [];

        // 4. Fetch dependent queries cleanly via internal MediatR pipelines
        var menuResponse = await _mediator.Send(new GetMenuListQuery { RoleId = user.RoleId }, cancellationToken);
        
        // Unpack the ApiResponse model safely
        var menuList = menuResponse != null && menuResponse.Success && menuResponse.Data is IEnumerable<MenuListResponseModel> menus
            ? menus.ToList()
            : new List<MenuListResponseModel>();


        var token = _jwt.GenerateToken(user.UserId, user.UserName, user.RoleId, user.CreatorId, listPermissions, Enumerable.Empty<string>());

        return new LoginResponse
        {
            Token = token,
            UserName = user.UserName,
            Name = user.Name ?? string.Empty,
            RoleName = user.RoleName ?? string.Empty,
            RoleId = user.RoleId,
            Permissions = listPermissions,
            MenuList = menuList,
            CreatoId = user.CreatorId
        };
    }
}
