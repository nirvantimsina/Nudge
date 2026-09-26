using Microsoft.Extensions.Options;
using Nudge.Application.Common.Interfaces;
using Seq.Api;

namespace Nudge.Infrastructure.Persistence.Seq;

public class SeqAnalyticsRepository(IOptions<SeqOptions> seqOptions) : IAnalyticsRepository
{
    private readonly SeqOptions _options = seqOptions.Value;

    public async Task<IEnumerable<LinkMetricDto>> GetCreatorLinkMetricsAsync(string creatorId, int daysAgo, CancellationToken cancellationToken)
    {
        var connection = new SeqConnection(_options.ServerUrl, apiKey: _options.ApiKey);

        string seqSqlQuery = $@"
            select count(*) as TotalClicks... 
            where Analytics_CreatorId = '{creatorId}'
            and @Timestamp >= now() - {daysAgo}d
            group by Analytics_Url";


        // Inside SeqAnalyticsRepository.cs
        var queryResult = await connection.Data.QueryAsync(seqSqlQuery);

        return queryResult.Rows.Select(row => new LinkMetricDto(
            LinkUrl: row[0]?.ToString() ?? "Unknown Link",
            TotalClicks: Convert.ToInt32(row[1]),
            UniqueClicks: Convert.ToInt32(row[2])
        ));

    }
}
