using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Models.Loom.ResponseModel;

namespace Nudge.Application.Features.Loom.Public.Queries.GetCreatorBySlug;

public record GetCreatorBySlugQuery(string? slug) : IRequest<ErrorOr<LoomLinkResponseModel>>;

public class GetCreatorBySlugQueryHandler : IRequestHandler<GetCreatorBySlugQuery, ErrorOr<LoomLinkResponseModel>>
{
    private readonly IGenericRepository _repo;
    public GetCreatorBySlugQueryHandler(IGenericRepository repo)
    {
        _repo = repo;
    }

    public async Task<ErrorOr<LoomLinkResponseModel>> Handle(GetCreatorBySlugQuery request, CancellationToken token)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<LoomLinkResponseModel>(
            "select * from loom.get_loom_by_slug(@p_slug);",
            new { p_slug = request.slug },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}