using MediatR;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.KYC.CreatorAddress.Commands.Insert;
using Nudge.Application.Features.KYC.CreatorAddress.Queries.Get;
using Nudge.Application.Features.KYC.CreatorDocs.Commands;
using Nudge.Application.Features.KYC.CreatorDocs.Query.Get;
using Nudge.Application.Features.KYC.CreatorInfo.Commands.Insert;
using Nudge.Application.Features.KYC.CreatorInfo.Query.Get;
using Nudge.Application.Features.KYC.CreatorVerification.Commands;
using Nudge.Application.Features.KYC.CreatorVerification.Query.Get;

namespace Nudge.Presentation.Controllers.KYC
{
    [ApiController]
    public class KYCController(IMediator mediator, ILogger<KYCController> logger)
        : ApiBaseController
    {
        [HttpGet("CreatorInfo")]
        public async Task<IActionResult> GetCreatorInfo()
        {
            var result = await mediator.Send(new GetCreatorInfoQuery());
            return HandleErrorOr(result);
        }

        [HttpPost("CreatorInfo")]
        public async Task<IActionResult> InsertCreatorInfo([FromBody] InsertCreatorInfoCommand command
        )
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

        [HttpPost("CreatorDocs")]
        public async Task<IActionResult> InsertCreatorDocs([FromBody] InsertCreatorDocsCommand command)
        {
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpGet("CreatorAddress")]
        public async Task<IActionResult> InsertCreatorAddress()
        {
            var result = await mediator.Send(new GetCreatorAddressQuery());
            return HandleErrorOr(result);
        }

        [HttpPost("CreatorAddress")]
        public async Task<IActionResult> GetCreatorAddress([FromBody] InsertCreatorAddressCommand query)
        {
            var result = await mediator.Send(query);
            return HandleErrorOr(result);
        }

        [HttpGet("CreatorVerification")]
        public async Task<IActionResult> GetCreatorVerification()
        {
            var result = await mediator.Send(new GetCreatorVerificationQuery());
            return HandleErrorOr(result);
        }

        [HttpPost("CreatorVerification")]
        public async Task<IActionResult> InsertCreatorVerification([FromBody] InsertCreatorVerificationCommand command)
        {
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }
    }
}
