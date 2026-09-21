using MediatR;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.KYC.CreatorAddress.Commands;
using Nudge.Application.Features.KYC.CreatorDocs.Commands;
using Nudge.Application.Features.KYC.CreatorDocs.Commands.Update;
using Nudge.Application.Features.KYC.CreatorInfo.Commands.Insert;
using Nudge.Application.Features.KYC.CreatorInfo.Commands.Update;
using Nudge.Application.Features.KYC.CreatorInfo.Query.Get;
using Nudge.Application.Features.KYC.CreatorVerification.Commands;
using Nudge.Application.Features.KYC.CreatorDocs.Query.Get;

namespace Nudge.Presentation.Controllers.KYC
{
    [ApiController]
    public class KYCController(IMediator mediator, ILogger<KYCController> logger) : ApiBaseController
    {
        [HttpPost("CreatorInfo")]
        public async Task<IActionResult> InsertCreatorInfo([FromBody] InsertCreatorInfoCommand command)
        {
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpPut("CreatorInfo")]
        public async Task<IActionResult> UpdateCreatorInfo([FromBody] UpdateCreatorInfoCommand command)
        {
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpGet("CreatorInfo")]
        public async Task<IActionResult> GetCreatorInfo()
        {
            var result = await mediator.Send(new GetCreatorInfoQuery());
            return HandleErrorOr(result);
        }

        [HttpPost("CreatorDocs")]
        public async Task<IActionResult> InsertCreatorDocs([FromBody] InsertCreatorDocsCommand command)
        {
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpPut("CreatorDocs")]
        public async Task<IActionResult> UpdateCreatorDocs([FromBody] UpdateCreatorDocsCommand command)
        {
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpGet("CreatorDocs")]
        public async Task<IActionResult> GetCreatorDocs()
        {
            var result = await mediator.Send(new GetCreatorDocsQuery());
            return HandleErrorOr(result);
        }

        [HttpGet("InsertCreatorAddress")]
        public async Task<IActionResult> InsertCreatorAddress([FromBody] InsertCreatorAddressCommand command)
        {
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpGet("InsertCreatorVerification")]
        public async Task<IActionResult> InsertCreatorVerification([FromBody] InsertCreatorVerificationCommand command)
        {
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }
    }
}