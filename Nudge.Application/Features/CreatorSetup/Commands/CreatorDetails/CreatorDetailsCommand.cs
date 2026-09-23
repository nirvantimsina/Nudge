using MediatR;
using Nudge.Shared.Wrappers;

namespace Nudge.Application.Features.CreatorSetup.Commands.CreatorDetails;

public class CreatorDetailsCommand : IRequest<ApiResponse>
{
    public string? Platform { get; set; }
    public string? UserName { get; set; }
    public string? Link { get; set; }
}