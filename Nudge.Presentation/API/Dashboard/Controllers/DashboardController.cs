using MediatR;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.Dashboard.Queries.GetDashboard;
using ErrorOr;
using Nudge.Application.Models.Dashboard.ResponseModel;
using Nudge.Shared.Wrappers;

namespace Nudge.Presentation.Controllers
{
    [ApiController]
    public class DashboardController(IMediator mediator) : ApiBaseController
    {
        [HttpGet("DashboardData")]
        public async Task<IActionResult> GetDashboardData([FromQuery] GetDashboardQuery query)
        {
            ErrorOr<DashboardResponseModel> result = await mediator.Send(query);

            return HandleErrorOr(result);
        }
    }
}
