using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Nudge.Application.Common.Interfaces;
using Seq.Api;

namespace Nudge.Infrastructure.Persistence.Seq;

public class SeqAnalyticsRepository : IAnalyticsRepository
{
    private readonly string _serverUrl;
    private readonly string _apiKey;

    // Inject both options AND configuration as a defensive backup strategy
    public SeqAnalyticsRepository(IOptions<SeqOptions> seqOptions, IConfiguration configuration)
    {
        // 1. Try to get it from the standard options binding
        _serverUrl = seqOptions.Value?.ServerUrl ?? string.Empty;
        _apiKey = seqOptions.Value?.ApiKey ?? string.Empty;

        // 2. Backup Fallback: If it's empty, read directly from configuration keys
        if (string.IsNullOrWhiteSpace(_serverUrl))
        {
            _serverUrl = configuration["SeqSettings:ServerUrl"] ?? string.Empty;
            _apiKey = configuration["SeqSettings:ApiKey"] ?? string.Empty;
        }

        // 3. Absolute Defensive Guard: Stop it before it fires an invalid HttpClient request
        if (string.IsNullOrWhiteSpace(_serverUrl) || !_serverUrl.StartsWith("http"))
        {
            throw new InvalidOperationException(
                "CRITICAL CONFIGURATION ERROR: Nudge is unable to locate your Seq ServerUrl. " +
                "Please verify that 'SeqSettings' section exists with a valid 'ServerUrl' (e.g., 'http://localhost:5341') " +
                "inside your active appsettings.json file."
            );
        }
    }

    public async Task<IEnumerable<LinkMetricDto>> GetCreatorLinkMetricsAsync(string creatorId, int daysAgo, CancellationToken cancellationToken)
    {
        // Initialize using our completely safe validated fields
        var connection = new SeqConnection(_serverUrl, apiKey: _apiKey);

    string seqSqlQuery = $@"
        select count(*) as TotalClicks, 
               count(distinct(Analytics_UserId)) as UniqueClicks 
        from stream 
        where (Analytics_Event = 'LinkClick' or Analytics_Event = 'ui_click')
          and Analytics_CreatorId = '{creatorId}' 
          and @Timestamp >= now() - {daysAgo}d
        group by Analytics_ButtonLabel
        order by TotalClicks desc";

        var queryResult = await connection.Data.QueryAsync(seqSqlQuery);

    return queryResult.Rows.Select(row => new LinkMetricDto(
        LinkUrl: row[0]?.ToString() ?? "Unknown Link", 
        TotalClicks: Convert.ToInt32(row[1]),
        UniqueClicks: Convert.ToInt32(row[2])
        ));
    }
}
