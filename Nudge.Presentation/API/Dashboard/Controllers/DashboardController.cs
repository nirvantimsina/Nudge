using MediatR;
using Microsoft.AspNetCore.Mvc;
using ErrorOr;
using Nudge.Application.Models.Dashboard.ResponseModel;
using Nudge.Application.Features.Dashboard.Queries.GetDashboard;

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
