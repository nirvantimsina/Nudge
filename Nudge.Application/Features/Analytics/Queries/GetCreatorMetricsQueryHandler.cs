using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Analytics.Queries;

public record GetCreatorMetricsQuery(int DaysAgo = 30) : IRequest<ErrorOr<IEnumerable<LinkMetricDto>>>;

public class GetCreatorMetricsQueryHandler(IAnalyticsRepository analyticsRepo, ICreatorContext context) 
    : IRequestHandler<GetCreatorMetricsQuery, ErrorOr<IEnumerable<LinkMetricDto>>>
{
    public async Task<ErrorOr<IEnumerable<LinkMetricDto>>> Handle(GetCreatorMetricsQuery request, CancellationToken cancellationToken)
    {
        if (request.DaysAgo <= 0 || request.DaysAgo > 365)
        {
            return Error.Validation("Analytics.InvalidRange", "Time range must be between 1 and 365 days.");
        }

        if (context.CreatorId <= 0) 
            return Error.Unauthorized("Creator.Unauthorized", "A valid creator context is required.");

        var metrics = await analyticsRepo.GetCreatorLinkMetricsAsync(
            context.CreatorId.ToString(), 
            request.DaysAgo, 
            cancellationToken);
        
        return metrics.ToList(); 
    }
}
