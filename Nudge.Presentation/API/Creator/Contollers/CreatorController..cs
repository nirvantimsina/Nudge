using MediatR;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.Creator.Queries.GetSummary;
using Nudge.Presentation.Controllers;

namespace Nudge.API.Controllers;

public class CreatorController(IMediator mediator) : ApiBaseController
{
    [HttpGet("Summary")]
    public async Task<IActionResult> GetSummary()
    {
        var result = await mediator.Send(new GetCreatorSummaryQuery());
        return HandleErrorOr(result);
    }
}