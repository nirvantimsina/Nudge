using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.Onboarding.Queries.GetOnboardingStatus;

public class GetOnboardingStatusQueryHandler : IRequestHandler<GetOnboardingStatusQuery, ErrorOr<OnboardingStatusDto>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public GetOnboardingStatusQueryHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<OnboardingStatusDto>> Handle(GetOnboardingStatusQuery request, CancellationToken cancellationToken)
    {
        var userId = _context.UserId;
        if (userId <= 0)
        {
            return Error.Unauthorized("Onboarding.Unauthenticated", "User must be authenticated to check onboarding status.");
        }

        const string sql = @"
            SELECT 
                EXISTS(SELECT 1 FROM analytics.tbluseronboarding WHERE userid = @p_userid) AS HasCompletedOnboarding,
                COALESCE((SELECT creatorid FROM creator.tblcreators WHERE userid = @p_userid LIMIT 1), 0) AS CreatorId;";

        var result = await _repo.QueryFirstOrDefaultAsync<OnboardingStatusDbRow>(
            sql,
            new { p_userid = userId },
            commandType: CommandType.Text,
            cancellationToken: cancellationToken);

        var hasCompleted = result?.HasCompletedOnboarding ?? false;
        var creatorId = result?.CreatorId ?? 0;

        return new OnboardingStatusDto(
            HasCompletedOnboarding: hasCompleted,
            IsCreator: creatorId > 0,
            CreatorId: creatorId
        );
    }

    private sealed class OnboardingStatusDbRow
    {
        public bool HasCompletedOnboarding { get; set; }
        public int CreatorId { get; set; }
    }
}
