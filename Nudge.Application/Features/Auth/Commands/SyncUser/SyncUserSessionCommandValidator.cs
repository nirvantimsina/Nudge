using FluentValidation;

namespace Nudge.Application.Features.Auth.Commands.SyncUser;

public class SyncUserSessionCommandValidator : AbstractValidator<SyncUserSessionCommand>
{
    public SyncUserSessionCommandValidator()
    {
        RuleFor(x => x.SubjectId)
            .NotEmpty().WithMessage("Subject identifier (sub) is missing from the identity token.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email claim is required.")
            .EmailAddress().WithMessage("A valid email address is required.");
    }
}