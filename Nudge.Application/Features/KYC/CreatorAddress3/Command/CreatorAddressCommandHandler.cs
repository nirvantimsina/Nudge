using MediatR;
using System.Data;
using Nudge.Domain.Models;
using ErrorOr;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.KYC.CreatorAddress.Commands
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
                p_addressid = request.AddressId,
                p_premdistrict = request.PermDistrict,
                p_permmunicipality = request.PermMunicipality,
                p_permwardno = request.PermWardNo,
                p_currentaddressline = request.CurrentAddressLine
            };

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                "select kyc.insert_creator_Address(@p_creatorid, @p_addressid, @p_premdistrict, @p_permmunicipality, @p_permwardno, @p_currentaddressline)",
                Params,
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}