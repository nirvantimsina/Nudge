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

public class TierDto
{
    public int Id { get; set; }
    public string Label { get; set; } = default!;
    public decimal Amount { get; set; }
    public string? Note { get; set; }
}

public class RecentNudgeDto
{
    public string? DisplayName { get; set; }
    public decimal Amount { get; set; }
    public string? Message { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public string? NudgeType { get; set; }
}
