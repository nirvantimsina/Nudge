using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.Creator.Queries.GetSummary;
using Nudge.Application.Features.CreatorSetup.Commands.CreateCreator;
using Nudge.Presentation.Controllers;

namespace Nudge.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CreatorController(IMediator mediator) : ApiBaseController
{
    [HttpGet("Summary")]
    public async Task<IActionResult> GetSummary()
    {
        var result = await mediator.Send(new GetCreatorSummaryQuery());
        return HandleErrorOr(result);
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] CreateCreatorCommand command)
    {
        var result = await mediator.Send(command);
        return HandleErrorOr(result);
    }
}