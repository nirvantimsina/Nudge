using Nudge.Application.Models.Common.Response;
using Nudge.Domain.Models;

namespace Nudge.Application.Models.Public.Creators.ResponseModel;

public class CreatorCardResponseModel : StatusResponse
{
    public int Id { get; set; }
    public string? Slug { get; set; }
    public string? Name { get; set; }
    public string? FirstName { get; set; }
    public string? Bio { get; set; }
    public string? Avatar { get; set; }
    public bool IsVerified { get; set; }

    public List<TierDto> Tiers { get; set; } = new();
    public RecentNudgeDto? RecentNudge { get; set; }
}
