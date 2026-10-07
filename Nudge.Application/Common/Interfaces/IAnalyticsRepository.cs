namespace Nudge.Application.Common.Interfaces;

public interface IAnalyticsRepository
{
    Task<IEnumerable<LinkMetricDto>> GetCreatorLinkMetricsAsync(string creatorId, int daysAgo, CancellationToken cancellationToken);
}


public record LinkMetricDto(string LinkUrl, int TotalClicks, int UniqueClicks);
