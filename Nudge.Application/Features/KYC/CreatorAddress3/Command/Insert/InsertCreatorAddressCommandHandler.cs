using MediatR;
using System.Data;
using Nudge.Domain.Models;
using ErrorOr;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.KYC.CreatorAddress.Commands.Insert
{
    public class CreatorAddressCommandHandler : IRequestHandler<InsertCreatorAddressCommand, ErrorOr<StatusResponse>>
    {
        private readonly IGenericRepository _repo;
        private readonly ICreatorContext _context;
        public CreatorAddressCommandHandler(IGenericRepository repo, ICreatorContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<ErrorOr<StatusResponse>> Handle(InsertCreatorAddressCommand request, CancellationToken cancellationToken)
        {
            var Params = new
            {
                p_creatorid = _context.CreatorId,
                p_permdistrict = request.PermDistrict,
                p_permmunicipality = request.PermMunicipality,
                p_permwardno = request.PermWardNo,
                p_currentaddressline = request.CurrentAddressLine,
                p_currentdistrict = request.CurrentDistrict,
                p_currentward = request.CurrentWard,
                p_longitude = request.Longitude,
                p_latitude = request.Latitude
            };

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                @"SELECT * FROM kyc.insert_creator_address(
                    @p_creatorid, 
                    @p_permdistrict, 
                    @p_permmunicipality, 
                    @p_permwardno, 
                    @p_currentaddressline, 
                    @p_currentdistrict, 
                    @p_currentward, 
                    @p_longitude, 
                    @p_latitude
                );",
                Params,
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}