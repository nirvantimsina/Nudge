namespace Nudge.Application.Features.Auth.Commands.SyncUser;

public record UserSessionDto(
    int UserId,
    string UserName,
    string Name,
    int RoleId,
    string RoleName,
    int CreatorId,
    IReadOnlyList<string> Permissions,
    bool IsKycVerified
);