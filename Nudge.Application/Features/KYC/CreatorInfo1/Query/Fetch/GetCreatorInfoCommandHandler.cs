using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Interfaces;
using Nudge.Application.Models.KYC.ResponseModel.CreatorInfo;

namespace Nudge.Application.Features.Public.Creators.CreatorInfo.Query.Get;

public record GetCreatorInfoQuery(int CreatorId) : IRequest<ErrorOr<CreatorInfoResponseModel>>;

public class GetCreatorInfoQueryHandler : IRequestHandler<GetCreatorInfoQuery, ErrorOr<CreatorInfoResponseModel>>
{
    private readonly IGenericRepository _repo;

    public GetCreatorInfoQueryHandler(IGenericRepository repo)
    {
        _repo = repo;
    }

    public async Task<ErrorOr<CreatorInfoResponseModel>> Handle(GetCreatorInfoQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<CreatorInfoResponseModel>(
            "SELECT * FROM kyc.get_creator_info_by_id(@p_creatorid);",
            new { p_creatorid = request.CreatorId },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}
