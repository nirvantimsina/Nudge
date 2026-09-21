// CreatorInfoCommandHandler.cs
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
            var parameters = new
            {
                p_creatorid = request.CreatorId,
                p_fullname = request.FullName?.Trim(),
                p_dobad = request.DOBAD?.Date,
                p_dobbs = request.DOBBS?.Trim(),
                p_gender = request.Gender,
                p_fathername = request.FatherName?.Trim(),
                p_mothername = request.MotherName?.Trim(),
                p_grandfathername = request.GrandfatherName?.Trim(),
                p_spousename = string.IsNullOrWhiteSpace(request.SpouseName) ? null : request.SpouseName.Trim()
            };

            const string sql = @"
                SELECT * FROM kyc.insert_creator_info(
                    @p_creatorid, 
                    @p_fullname, 
                    @p_dobad::date, 
                    @p_dobbs, 
                    @p_gender, 
                    @p_fathername, 
                    @p_mothername, 
                    @p_grandfathername, 
                    @p_spousename
                );";

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                sql,
                parameters,
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}