using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Models.KYC.ResponseModel.CreatorInfo;

namespace Nudge.Application.Features.KYC.CreatorInfo.Query.Get;

public class GetCreatorInfoQuery : IRequest<ErrorOr<CreatorInfoResponseModel>>;

public class GetCreatorInfoQueryHandler : IRequestHandler<GetCreatorInfoQuery, ErrorOr<CreatorInfoResponseModel>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public GetCreatorInfoQueryHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<CreatorInfoResponseModel>> Handle(GetCreatorInfoQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<CreatorInfoResponseModel>(
            "SELECT * FROM kyc.get_creator_info_by_creatorid(@p_creatorid);",
            new { p_creatorid = _context.CreatorId },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}
