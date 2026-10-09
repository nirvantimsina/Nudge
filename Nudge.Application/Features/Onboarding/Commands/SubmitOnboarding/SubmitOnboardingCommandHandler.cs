using System.Data;
using System.Text.Json;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.Onboarding.Commands.SubmitOnboarding;

public class SubmitOnboardingCommandHandler : IRequestHandler<SubmitOnboardingCommand, ErrorOr<OnboardingResultDto>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public SubmitOnboardingCommandHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<OnboardingResultDto>> Handle(SubmitOnboardingCommand request, CancellationToken cancellationToken)
    {
        var userId = _context.UserId;
        if (userId <= 0)
        {
            return Error.Unauthorized("Onboarding.Unauthenticated", "User must be authenticated to submit onboarding information.");
        }

        var metadataObj = new
        {
            other_referral = request.OtherReferralText,
            submitted_at = DateTime.UtcNow
        };
        var metadataJson = JsonSerializer.Serialize(metadataObj);

        var parameters = new
        {
            p_userid = userId,
            p_referral_source = request.ReferralSource,
            p_intended_use = request.IntendedUse,
            p_metadata = metadataJson,
            p_creator_slug = request.CreatorSlug,
            p_creator_name = request.CreatorName,
            p_categoryid = request.CategoryId ?? 1,
            p_bio = request.Bio
        };

        const string sql = @"
            SELECT 
                onboarding_id AS OnboardingId,
                creator_id AS CreatorId,
                status AS Status,
                msg AS Msg
            FROM analytics.fn_submit_onboarding(
                @p_userid,
                @p_referral_source,
                @p_intended_use,
                @p_metadata::jsonb,
                @p_creator_slug,
                @p_creator_name,
                @p_categoryid,
                @p_bio
            );";

        var result = await _repo.QueryFirstOrDefaultAsync<OnboardingDbRow>(
            sql,
            parameters,
            commandType: CommandType.Text,
            cancellationToken: cancellationToken);

        if (result is null)
        {
            return Error.Failure("Onboarding.Failed", "Failed to record onboarding details.");
        }

        var isCreator = result.CreatorId > 0;

        return new OnboardingResultDto(
            OnboardingId: result.OnboardingId,
            CreatorId: result.CreatorId,
            IsCreator: isCreator,
            CreatorSlug: request.CreatorSlug,
            Message: result.Msg ?? "Onboarding completed successfully."
        );
    }

    private sealed class OnboardingDbRow
    {
        public int OnboardingId { get; set; }
        public int CreatorId { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Msg { get; set; } = string.Empty;
    }
}
