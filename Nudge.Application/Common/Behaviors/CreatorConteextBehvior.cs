// Nudge.Application/Common/Behaviors/CreatorContextBehavior.cs
using MediatR;
using ErrorOr;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Common.Behaviors;

public class CreatorContextBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly ICreatorContext _creatorContext;

    public CreatorContextBehavior(ICreatorContext creatorContext)
    {
        _creatorContext = creatorContext;
    }

    public async Task<TResponse> Handle(
        TRequest request, 
        RequestHandlerDelegate<TResponse> next, 
        CancellationToken cancellationToken)
    {
        // 1. If it's a public endpoint or generic lookup, ignore and execute immediately
        if (request is not ICreatorScopedRequest scopedRequest)
        {
            return await next();
        }

        // 2. If it is scoped to a creator, enforce session validity
        if (!_creatorContext.IsAuthenticated || _creatorContext.CreatorId <= 0)
        {
            if (typeof(TResponse).IsGenericType && 
                typeof(TResponse).GetGenericTypeDefinition() == typeof(ErrorOr<>))
            {
                return (dynamic)Error.Unauthorized(
                    code: "Auth.Unauthorized", 
                    description: "A valid creator session is required to perform this action.");
            }

            throw new UnauthorizedAccessException("Valid creator session required.");
        }

        // 3. Automatically stamp the session creator ID
        scopedRequest.CreatorId = _creatorContext.CreatorId;

        return await next();
    }
}