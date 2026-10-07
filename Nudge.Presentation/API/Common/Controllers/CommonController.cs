using MediatR;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.Common.Queries.GetDropdownItems;
using Nudge.Shared.Wrappers;

namespace Nudge.Presentation.Controllers;

public class DropdownController(IMediator mediator) : ApiBaseController
{
    [HttpGet("{flag}")]
    public async Task<IActionResult> GetByFlag(string flag)
    {
        var query = new GetDropdownItemQuery(flag);
        var result = await mediator.Send(query);

        return HandleErrorOr(result);
    }
}
