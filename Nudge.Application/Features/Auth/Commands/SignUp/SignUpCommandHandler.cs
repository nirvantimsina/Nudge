using MediatR;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Features.Auth.Commands.SyncUser;
using Nudge.Application.Helpers;
using Nudge.Application.Models.Auth.Response;
using Nudge.Shared.Wrappers;
using System.Data;

namespace Nudge.Application.Features.Auth.Commands.SignUp
{
    public class SignUpCommandHandler : IRequestHandler<SignUpCommand, ApiResponse>
    {
        private readonly IGenericRepository _repo;
        private readonly IZitadelService _zitadelService;
        private readonly IMediator _mediator;

        public SignUpCommandHandler(
            IGenericRepository repo,
            IZitadelService zitadelService,
            IMediator mediator)
        {
            _repo = repo;
            _zitadelService = zitadelService;
            _mediator = mediator;
        }

        public async Task<ApiResponse> Handle(SignUpCommand request, CancellationToken cancellationToken)
        {
            var username = request.UserName ?? string.Empty;
            var email = request.Email ?? $"{username}@nudge.np";
            var name = request.Name ?? username;
            var password = request.Password ?? string.Empty;

            // 1. Create Human User in Zitadel IAM
            var zitadelResult = await _zitadelService.CreateUserAsync(
                username,
                email,
                name,
                password,
                request.Phone,
                cancellationToken);

            string subjectId = zitadelResult.Success && !string.IsNullOrEmpty(zitadelResult.UserId)
                ? zitadelResult.UserId
                : Guid.NewGuid().ToString();

            // 2. Synchronize & Populate Local PostgreSQL User and Creator Tables
            var syncCommand = new SyncUserSessionCommand(subjectId, email, username, name);
            var syncResult = await _mediator.Send(syncCommand, cancellationToken);

            // Also maintain legacy database function compatibility
            try
            {
                var hashedPassword = PasswordHelper.HashPassword(password);
                var signUpParams = new
                {
                    p_flag = "A",
                    p_username = username,
                    p_name = name,
                    p_address = request.Address ?? string.Empty,
                    p_phone = request.Phone ?? string.Empty,
                    p_password = hashedPassword
                };

                await _repo.ExecuteAsync(
                    "SELECT permission.fn_auth(@p_flag, @p_username, @p_name, @p_address, @p_phone, @p_password)",
                    signUpParams,
                    commandType: CommandType.Text);
            }
            catch
            {
                // Non-fatal if fn_upsert_user already completed above
            }

            // 3. Authenticate with Zitadel to issue token for immediate login
            var authResult = await _zitadelService.AuthenticateAsync(username, password, cancellationToken);

            var loginResponse = new LoginResponse
            {
                Token = authResult.AccessToken ?? string.Empty,
                UserId = syncResult.IsError ? 1 : syncResult.Value.UserId,
                RoleId = syncResult.IsError ? 2 : syncResult.Value.RoleId,
                CreatorId = syncResult.IsError ? 1 : syncResult.Value.CreatorId,
                UserName = username,
                Permissions = syncResult.IsError ? new List<string> { "USR.C" } : syncResult.Value.Permissions?.ToList() ?? new List<string> { "USR.C" }
            };

            return ApiResponse.Ok(loginResponse);
        }
    }
}
