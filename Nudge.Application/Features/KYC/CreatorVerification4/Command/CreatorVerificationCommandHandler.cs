using MediatR;
using System.Data;
using Nudge.Domain.Models;
using ErrorOr;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.KYC.CreatorVerification.Commands
{
    public class CreatorVerificationCommandHandler : IRequestHandler<InsertCreatorVerificationCommand, ErrorOr<StatusResponse>>
    {
        private readonly IGenericRepository _repo;
        private readonly ICreatorContext _context;

        public CreatorVerificationCommandHandler(IGenericRepository repo, ICreatorContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<ErrorOr<StatusResponse>> Handle(InsertCreatorVerificationCommand request, CancellationToken cancellationToken)
        {
            var Params = new
            {
                p_creatorid = _context.CreatorId,
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