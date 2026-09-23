using MediatR;
using ErrorOr;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Models.KYC.ResponseModel;
using System.Data;
using Nudge.Application.Common.Extensions;

namespace Nudge.Application.Features.KYC.CreatorAddress.Queries.Get;

public record GetCreatorAddressQuery : IRequest<ErrorOr<CreatorAddressResponseModel>>;

public class GetCreatorAddressQueryHandler : IRequestHandler<GetCreatorAddressQuery, ErrorOr<CreatorAddressResponseModel>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public GetCreatorAddressQueryHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<CreatorAddressResponseModel>> Handle(GetCreatorAddressQuery request, CancellationToken cancellationToken)
    {
        const string sql = @"
            SELECT 
                addressid           AS AddressId,
                creatorid          AS CreatorId,
                permdistrict       AS PermDistrict,
                permmunicipality   AS PermMunicipality,
                permwardno         AS PermWardNo,
                currentaddressline AS CurrentAddressLine,
                currentdistrict    AS CurrentDistrict,
                currentward        AS CurrentWard,
                longitude          AS Longitude,
                latitude           AS Latitude
            FROM kyc.tblcreatoraddress
            WHERE creatorid = @CreatorId;";

        var result = await _repo.QueryFirstOrDefaultAsync<CreatorAddressResponseModel>(
            sql,
            new { CreatorId = _context.CreatorId },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}