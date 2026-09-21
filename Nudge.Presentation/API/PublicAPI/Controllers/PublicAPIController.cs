using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.Public.Creators.Queries.GetCreatorCard;
using Nudge.Application.Features.Public.Creators.Queries.GetFeaturedCreators;
using Nudge.Application.Models.Public.Creators.ResponseModel;
using Nudge.Shared.Wrappers;

namespace Nudge.Presentation.Controllers.PublicAPI;

[ApiController]
public class PublicAPIController(IMediator mediator, ILogger<PublicAPIController> logger) : ApiBaseController
{
    [HttpGet("FeaturedCreators")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFeaturedCreatorsAsync([FromQuery] string Category = "all")
    {
        string searchCategory = string.IsNullOrWhiteSpace(Category) ? "all" : Category;
        ErrorOr<List<FeaturedCreatorsResponseModel>> result = await mediator.Send(new GetFeaturedCreatorsQuery(searchCategory));

        return HandleErrorOr(result);
    }

    [HttpGet("CreatorCard/{slug}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetCreatorCardAsync([FromRoute] string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return BadRequest(ApiResponse.Fail("The slug parameter is required."));
        }
        ErrorOr<CreatorCardResponseModel> result = await mediator.Send(new GetCreatorCardQuery(slug));

        return HandleErrorOr(result);
    }
}