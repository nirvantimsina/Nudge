using MediatR;
using Nudge.Application.Interfaces;
using System.Data;
using Nudge.Shared.Wrappers;
using ErrorOr;
using Nudge.Domain.Models;
using Nudge.Application.Common.Extensions;

namespace Nudge.Application.Features.KYC.CreatorInfo.Commands.Insert
{
    public class CreatorInfoCommandHandler : IRequestHandler<InsertCreatorInfoCommand, ErrorOr<StatusResponse>>
    {
        private readonly IGenericRepository _repo;

        public CreatorInfoCommandHandler(IGenericRepository repo)
        {
            _repo = repo;
        }

        public async Task<ErrorOr<StatusResponse>> Handle(InsertCreatorInfoCommand request, CancellationToken cancellationToken)
        {
            var Params = new
            {
                p_creatorid = request.CreatorId,
                p_fullname = request.FullName,
                p_dobad = request.DOBAD,
                p_dobbs = request.DOBBS,
                p_gender = request.Gender,
                p_fathername = request.FatherName,
                p_mothername = request.MotherName,
                p_grandfathername = request.GrandfatherName,
                p_spousename = request.SpouseName
            };

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                "select kyc.insert_creator_info(@p_creatorid, @p_fullname, @p_dobad, @p_dobbs, @p_gender, @p_fathername, @p_mothername, @p_grandfathername, @p_spousename)",
                Params,
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}