using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;
using Nudge.Shared.Models;

namespace Nudge.Application.Features.Common.Queries.GetDropdownItems;

public record GetDropdownItemQuery(string Flag) 
    : IRequest<ErrorOr<List<DropdownListModel>>>, ICacheableQuery
{
    public string CacheKey => $"dropdown:flag:{Flag?.Trim().ToUpperInvariant()}";
    public TimeSpan? Expiration => TimeSpan.FromMinutes(10);
}

public class GetDropdownItemQueryHandler 
    : IRequestHandler<GetDropdownItemQuery, ErrorOr<List<DropdownListModel>>>
{
    private readonly IGenericRepository _repo;

    public GetDropdownItemQueryHandler(IGenericRepository repo) => _repo = repo;

    public async Task<ErrorOr<List<DropdownListModel>>> Handle(GetDropdownItemQuery request, CancellationToken ct)
    {
        var rows = await _repo.QueryAsync<DropdownListModel>(
            "SELECT text AS Text, value AS Value FROM get_dropdown_data(@p_flag);",
            new { p_flag = request.Flag },
            commandType: CommandType.Text,
            cancellationToken: ct);

        return rows.ToList();
    }
}