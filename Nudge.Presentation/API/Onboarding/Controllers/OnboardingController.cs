using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.Onboarding.Commands.SubmitOnboarding;
using Nudge.Application.Features.Onboarding.Queries.GetOnboardingStatus;
using Nudge.Presentation.Controllers;

namespace Nudge.Presentation.API.Onboarding.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OnboardingController(IMediator mediator) : ApiBaseController
{
    [HttpPost("Submit")]
    public async Task<IActionResult> Submit([FromBody] SubmitOnboardingCommand command)
    {
        var result = await mediator.Send(command);
        return HandleErrorOr(result);
    }

    [HttpGet("Status")]
    public async Task<IActionResult> GetStatus()
    {
        var result = await mediator.Send(new GetOnboardingStatusQuery());
        return HandleErrorOr(result);
    }
}
