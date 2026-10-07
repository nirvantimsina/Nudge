namespace Nudge.Application.Models.Common.Response;

public class RecentNudgeDto
{
    public string? DisplayName { get; set; }
    public decimal Amount { get; set; }
    public string? Message { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public string? NudgeType { get; set; }
}