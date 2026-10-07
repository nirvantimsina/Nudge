namespace Nudge.Application.Models.Common.Response;

public class TierDto
{
    public int Id { get; set; }
    public string Label { get; set; } = default!;
    public decimal Amount { get; set; }
    public string? Note { get; set; }
}