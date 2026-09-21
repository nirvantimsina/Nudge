using MediatR;
using System.Data;
using Nudge.Shared.Wrappers;
using Nudge.Domain.Models;
using ErrorOr;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.KYC.CreatorVerification.Commands
{
    public class CreatorVerificationCommandHandler : IRequestHandler<InsertCreatorVerificationCommand, ErrorOr<StatusResponse>>
    {
        private readonly IGenericRepository _repo;
        private readonly ICreatorScopedRequest _scope;

        public CreatorVerificationCommandHandler(IGenericRepository repo, ICreatorScopedRequest scope)
        {
            _repo = repo;
            _scope = scope;
        }

        public async Task<ErrorOr<StatusResponse>> Handle(InsertCreatorVerificationCommand request, CancellationToken cancellationToken)
        {
            var Params = new
            {
                p_creatorid = _scope.CreatorId,
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