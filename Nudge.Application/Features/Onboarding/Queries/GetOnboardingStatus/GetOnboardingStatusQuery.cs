using ErrorOr;
using MediatR;

namespace Nudge.Application.Features.Onboarding.Queries.GetOnboardingStatus;

public record GetOnboardingStatusQuery : IRequest<ErrorOr<OnboardingStatusDto>>;

public record OnboardingStatusDto(
    bool HasCompletedOnboarding,
    bool IsCreator,
    int CreatorId
);
