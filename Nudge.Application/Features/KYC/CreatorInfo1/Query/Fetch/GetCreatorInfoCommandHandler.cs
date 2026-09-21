using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Models.KYC.ResponseModel.CreatorInfo;

namespace Nudge.Application.Features.Public.Creators.CreatorInfo.Query.Get;

public class GetCreatorInfoQuery : IRequest<ErrorOr<CreatorInfoResponseModel>>;

public class GetCreatorInfoQueryHandler : IRequestHandler<GetCreatorInfoQuery, ErrorOr<CreatorInfoResponseModel>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorScopedRequest _scope;

    public GetCreatorInfoQueryHandler(IGenericRepository repo, ICreatorScopedRequest scope)
    {
        _repo = repo;
        _scope = scope;
    }

    public async Task<ErrorOr<CreatorInfoResponseModel>> Handle(GetCreatorInfoQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<CreatorInfoResponseModel>(
            "SELECT * FROM kyc.get_creator_info_by_id(@p_creatorid);",
            new { p_creatorid = _scope.CreatorId },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}
