using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Models.KYC.ResponseModel.CreatorDocs;

namespace Nudge.Application.Features.KYC.CreatorDocs.Query.Get;

public class GetCreatorDocsQuery : IRequest<ErrorOr<CreatorDocsResponseModel>>;

public class GetCreatorDocsQueryHandler : IRequestHandler<GetCreatorDocsQuery, ErrorOr<CreatorDocsResponseModel>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public GetCreatorDocsQueryHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<CreatorDocsResponseModel>> Handle(GetCreatorDocsQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<CreatorDocsResponseModel>(
            "SELECT * FROM kyc.get_creator_docs_by_creatorid(@p_creatorid);",
            new { p_creatorid = _context.CreatorId },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}
