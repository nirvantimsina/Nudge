using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Common.Behaviors;

public class CachingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : ICacheableQuery
{
    private readonly ICacheService _cache;
    private readonly ICreatorContext _context;

    public CachingBehavior(ICacheService cache, ICreatorContext context)
    {
        _cache = cache;
        _context = context;
    }

    public async Task<TResponse> Handle(
        TRequest request, 
        RequestHandlerDelegate<TResponse> next, 
        CancellationToken cancellationToken)
    {
        // 1. Build the unique key
        string resolvedKey = request.CacheKey;

        if (request.IsCreatorScoped)
        {
            if (_context.CreatorId <= 0)
            {
                // Safety guard: never cache unauthenticated/unresolved sessions
                return await next();
            }

            resolvedKey = $"creator:{_context.CreatorId}:{request.CacheKey}";
        }

        if (request.IsUserScoped)
        {
            if (_context.UserId <= 0)
            {
                return await next();
            }

            resolvedKey = $"user:{_context.UserId}:{request.CacheKey}";
        }

        // 2. Look up in Redis
        var cachedResponse = await _cache.GetAsync<TResponse>(resolvedKey, cancellationToken);
        if (cachedResponse is not null)
        {
            return cachedResponse;
        }

        // 3. Execute DB query
        var response = await next();

        // 4. Cache only valid successful responses
        if (response is IErrorOr errorOrResponse)
        {
            if (!errorOrResponse.IsError)
            {
                await _cache.SetAsync(resolvedKey, response, request.Expiration, cancellationToken);
            }
        }
        else if (response is not null)
        {
            await _cache.SetAsync(resolvedKey, response, request.Expiration, cancellationToken);
        }

        return response;
    }
}