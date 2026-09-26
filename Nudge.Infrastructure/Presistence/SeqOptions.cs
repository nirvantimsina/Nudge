namespace Nudge.Infrastructure.Persistence.Seq;

public class SeqOptions
{
    public const string SectionName = "SeqSettings";
    public string ServerUrl { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
}
