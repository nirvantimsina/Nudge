using MediatR;
using ErrorOr;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Models.KYC.ResponseModel;
using System.Data;
using Nudge.Application.Common.Extensions;

namespace Nudge.Application.Features.KYC.CreatorAddress.Queries.Get;

public class GetCreatorAddressQuery : IRequest<ErrorOr<CreatorAddressResponseModel>>;

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
            SELECT * FROM kyc.get_creator_address_by_creatorid(@p_creatorid);";

        var result = await _repo.QueryFirstOrDefaultAsync<CreatorAddressResponseModel>(
            sql,
            new { p_creatorid = _context.CreatorId },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}