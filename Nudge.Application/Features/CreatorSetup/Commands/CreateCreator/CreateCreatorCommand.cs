using ErrorOr;
using MediatR;

namespace Nudge.Application.Features.CreatorSetup.Commands.CreateCreator;

public record CreateCreatorCommand(
    string Slug,
    string Name,
    int CategoryId = 1,
    string? Bio = null,
    string? Description = null
) : IRequest<ErrorOr<CreateCreatorResultDto>>;

public record CreateCreatorResultDto(
    int CreatorId,
    string Slug,
    string Name
);
