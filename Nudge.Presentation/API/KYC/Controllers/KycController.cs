using MediatR;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.KYC.CreatorAddress.Commands;
using Nudge.Application.Features.KYC.CreatorDocs.Commands;
using Nudge.Application.Features.KYC.CreatorInfo.Commands.Insert;
using Nudge.Application.Features.KYC.CreatorVerification.Commands;
using Nudge.Application.Features.Public.Creators.CreatorInfo.Commands.Update;
using Nudge.Application.Features.Public.Creators.CreatorInfo.Query.Get;
using Nudge.Shared.Wrappers;

namespace Nudge.Presentation.Controllers.KYC
{
    [ApiController]
    public class KYCController(IMediator mediator, ILogger<KYCController> logger) : ApiBaseController
    {
        [HttpPost("CreatorInfo")]
        public async Task<IActionResult> InsertCreatorInfo([FromBody] InsertCreatorInfoCommand command)
        {
            if (CurrentCreatorId == 0)
                return Unauthorized(ApiResponse.Fail("Active creator profile not found for this account."));

            command.CreatorId = CurrentCreatorId;

            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpPut("CreatorInfo")]
        public async Task<IActionResult> UpdateCreatorInfo([FromBody] UpdateCreatorInfoCommand command)
        {
            // Lock to session user
            // command.CreatorId = CurrentUserId;
            
            logger.LogInformation("KYC Info Update for Creator ID: {CreatorId}", command.CreatorId);
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpGet("CreatorInfo")]
        public async Task<IActionResult> GetCreatorInfo()
        {
            if (CurrentCreatorId == 0)
                return Unauthorized(ApiResponse.Fail("Active creator profile not found for this account."));

            var query = new GetCreatorInfoQuery(CurrentCreatorId);
            var result = await mediator.Send(query);
            return HandleErrorOr(result);
        }

        [HttpPost("CreatorDocs")]
        public async Task<IActionResult> InsertCreatorDocs([FromBody] InsertCreatorDocsCommand command)
        {
            if (CurrentCreatorId == 0)
                return Unauthorized(ApiResponse.Fail("Active creator profile not found for this account."));
            
            command.CreatorId = CurrentCreatorId;

            logger.LogInformation("KYC Creator Docs insert for creator: {CreatoId}", command.CreatorId);
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpGet("InsertCreatorAddress")]
        public async Task<IActionResult> InsertCreatorAddress([FromBody] InsertCreatorAddressCommand command)
        {
            if (CurrentCreatorId == 0)
                return Unauthorized(ApiResponse.Fail("Active creator profile not found for this account."));
            
            command.CreatorId = CurrentCreatorId;

            logger.LogInformation("KYC Creator address insert for creator: {CreatorId}", command.CreatorId);
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }

        [HttpGet("InsertCreatorVerification")]
        public async Task<IActionResult> InsertCreatorVerification([FromBody] InsertCreatorVerificationCommand command)
        {
            if (CurrentCreatorId == 0)
                return Unauthorized(ApiResponse.Fail("Active creator profile not found for this account."));
            
            command.CreatorId = CurrentCreatorId;

            logger.LogInformation("kyc creator verification details sent for creator: {CreatorId}", command.CreatorId);
            var result = await mediator.Send(command);
            return HandleErrorOr(result);
        }
    }
}