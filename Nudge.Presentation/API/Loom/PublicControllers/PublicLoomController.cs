using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.Loom.Public.Queries.GetCreatorBySlug;
using Nudge.Application.Models.Loom.ResponseModel;

namespace Nudge.Presentation.Controllers;

[ApiController]
public class LoomController(IMediator mediator) : ApiBaseController
{
    [AllowAnonymous]
    [HttpGet("LoomLinkData/{slug}")]
    public async Task<IActionResult> GetLoomLinkData([FromRoute] string slug)
    {
        string loomSlug = string.IsNullOrWhiteSpace(slug) ? "default" : slug;
        ErrorOr<LoomLinkResponseModel> result = await mediator.Send(new GetCreatorBySlugQuery(loomSlug));

        return HandleErrorOr(result);
    }
}