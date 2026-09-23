using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorVerification.Commands
{
    public class CreatorVerificationCommandHandler
        : IRequestHandler<InsertCreatorVerificationCommand, ErrorOr<StatusResponse>>
    {
        private readonly IGenericRepository _repo;
        private readonly ICreatorContext _context;

        public CreatorVerificationCommandHandler(IGenericRepository repo, ICreatorContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<ErrorOr<StatusResponse>> Handle(
            InsertCreatorVerificationCommand request,
            CancellationToken cancellationToken
        )
        {
            var Params = new
            {
                p_creatorid = _context.CreatorId,
                p_primaryplatform = request.PrimaryPlatform,
                p_channelurl = request.ChannelURL,
                p_estimatedannualincome = request.EstimatedAnnualIncome,
            };

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                "select * from kyc.insert_kyc_Verification(@p_creatorid, @p_primaryplatform, @p_channelurl, @p_estimatedannualincome)",
                Params,
                commandType: CommandType.Text
            );

            return result.ToDbResult();
        }
    }
}
