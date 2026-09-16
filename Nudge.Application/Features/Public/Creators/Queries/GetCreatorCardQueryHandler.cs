using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Interfaces;
using Nudge.Application.Models.Public.Creators.ResponseModel;

namespace Nudge.Application.Features.Public.Creators.Queries.GetCreatorCard;

public record GetCreatorCardQuery(string? slug) : IRequest<ErrorOr<CreatorCardResponseModel>>;

public class GetCreatorCardQueryHandler : IRequestHandler<GetCreatorCardQuery, ErrorOr<CreatorCardResponseModel>>
{
    private readonly IGenericRepository _repo;

    public GetCreatorCardQueryHandler(IGenericRepository repo)
    {
        _repo = repo;
    }

    public async Task<ErrorOr<CreatorCardResponseModel>> Handle(GetCreatorCardQuery request, CancellationToken cancellationToken)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<CreatorCardResponseModel>(
            "select * from creator.get_creator_card(@p_slug);",
            new { p_slug = request.slug},
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}