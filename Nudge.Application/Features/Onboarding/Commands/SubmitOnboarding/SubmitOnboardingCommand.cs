using ErrorOr;
using MediatR;

namespace Nudge.Application.Features.Onboarding.Commands.SubmitOnboarding;

public record SubmitOnboardingCommand(
    string ReferralSource,
    string IntendedUse,
    string? OtherReferralText = null,
    string? CreatorSlug = null,
    string? CreatorName = null,
    int? CategoryId = 1,
    string? Bio = null
) : IRequest<ErrorOr<OnboardingResultDto>>;

public record OnboardingResultDto(
    int OnboardingId,
    int CreatorId,
    bool IsCreator,
    string? CreatorSlug,
    string Message
);
