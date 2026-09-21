using MediatR;
using Nudge.Application.Interfaces;
using System.Data;
using Nudge.Shared.Wrappers;
using Nudge.Domain.Models;
using ErrorOr;
using Nudge.Application.Common.Extensions;

namespace Nudge.Application.Features.KYC.CreatorVerification.Commands
{
    public class CreatorVerificationCommandHandler : IRequestHandler<InsertCreatorVerificationCommand, ErrorOr<StatusResponse>>
    {
        private readonly IGenericRepository _repo;

        public CreatorVerificationCommandHandler(IGenericRepository repo)
        {
            _repo = repo;
        }

        public async Task<ErrorOr<StatusResponse>> Handle(InsertCreatorVerificationCommand request, CancellationToken cancellationToken)
        {
            var Params = new
            {
                p_creatorid = request.CreatorId,
                p_Verificationid = request.VId,
                p_primaryplatform = request.PrimaryPlatform,
                p_channelurl = request.ChannelURL,
                p_estimatedannualincome = request.EstimatedAnnualIncome,
                p_kycstatus = request.KYCStatus
                
            };

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                "select kyc.insert_creator_Verification(@p_creatorid, @p_Verificationid, @p_primaryplatform, @p_channelurl, @p_estimatedannualincome, @p_kycstatus)",
                Params,
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}