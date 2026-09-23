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
                CreatorId = _context.CreatorId,
                request.PermDistrict,
                request.PermMunicipality,
                request.PermWardNo,
                request.CurrentAddressLine,
                request.CurrentDistrict,
                request.CurrentWard,
                request.Longitude,
                request.Latitude
            };

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                "SELECT * FROM kyc.insert_creator_address(@CreatorId, @PermDistrict, @PermMunicipality, @PermWardNo, @CurrentAddressLine, @CurrentDistrict, @CurrentWard, @Longitude, @Latitude);",
                Params,
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}