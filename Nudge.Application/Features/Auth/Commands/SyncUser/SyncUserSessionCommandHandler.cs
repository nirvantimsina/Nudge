using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.Auth.Commands.SyncUser;

public class SyncUserSessionCommandHandler : IRequestHandler<SyncUserSessionCommand, ErrorOr<UserSessionDto>>
{
    private readonly IGenericRepository _repo;

    public SyncUserSessionCommandHandler(IGenericRepository repo)
    {
        _repo = repo;
    }

    public async Task<ErrorOr<UserSessionDto>> Handle(SyncUserSessionCommand request, CancellationToken cancellationToken)
    {
        var resolvedUserName = !string.IsNullOrWhiteSpace(request.UserName) 
            ? request.UserName 
            : (!string.IsNullOrWhiteSpace(request.Email) ? request.Email.Split('@')[0] : "user");

        var parameters = new
        {
            p_subject_id = request.SubjectId,
            p_email = request.Email,
            p_username = resolvedUserName,
            p_role_id = 2 // Default creator role
        };

        const string sql = @"
            SELECT 
                user_id AS UserId,
                creator_id AS CreatorId,
                role_id AS RoleId,
                user_name AS UserName,
                name AS Name,
                email AS Email
            FROM permission.fn_upsert_user(
                @p_subject_id, 
                @p_email, 
                @p_username, 
                @p_role_id
            );";

        var user = await _repo.QueryFirstOrDefaultAsync<UserSessionDbRow>(
            sql,
            parameters,
            commandType: CommandType.Text,
            cancellationToken: cancellationToken);

        if (user is null)
        {
            return Error.Failure("Auth.UserSyncFailed", "Failed to resolve or provision user record.");
        }

        return new UserSessionDto(
            UserId: user.UserId,
            UserName: user.UserName,
            Name: string.IsNullOrWhiteSpace(user.Name) ? (request.Name ?? user.UserName) : user.Name,
            RoleId: user.RoleId,
            RoleName: user.RoleId == 1 ? "Admin" : "Creator",
            CreatorId: user.CreatorId,
            Permissions: new[] { "USR.C" },
            IsKycVerified: true
        );
    }

    public sealed class UserSessionDbRow
    {
        public int UserId { get; set; }
        public int CreatorId { get; set; }
        public int RoleId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}