using ErrorOr;
using MediatR;

namespace Nudge.Application.Features.Auth.Commands.SyncUser;

public record SyncUserSessionCommand(
    string SubjectId,
    string Email,
    string? UserName,
    string? Name
) : IRequest<ErrorOr<UserSessionDto>>;