using ErrorOr;
using FluentValidation;
using MediatR;
using Nudge.Application.Models.Public.Creators.ResponseModel;

namespace Nudge.Application.Features.Public.Creators.Queries;

public record GetCreatorCardQuery(string Slug) : IRequest<ErrorOr<CreatorCardResponseModel>>;

public class GetCreatorCardQueryValidator : AbstractValidator<GetCreatorCardQuery>
{
    public GetCreatorCardQueryValidator()
    {
        RuleFor(x => x.Slug)
            .NotEmpty().WithMessage("The creator handle or slug cannot be empty.")
            .MinimumLength(3).WithMessage("The creator handle must be at least 3 characters long.")
            .Matches(@"^[a-zA-Z0-BA-9_\-]+$").WithMessage("The handle contains invalid URL characters.");
    }
}
