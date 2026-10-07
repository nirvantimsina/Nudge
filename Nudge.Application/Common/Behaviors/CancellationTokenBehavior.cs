using MediatR;

namespace Nudge.Application.Common.Behaviors;

// 1. Context scoped token holder
public interface ICancellationTokenProvider
{
    CancellationToken Token { get; set; }
}

public class CancellationTokenProvider : ICancellationTokenProvider
{
    public CancellationToken Token { get; set; } = CancellationToken.None;
}

// 2. MediatR pipeline automatic registration 
public class CancellationTokenPipelineBehavior<TRequest, TResponse>(ICancellationTokenProvider provider) 
    : IPipelineBehavior<TRequest, TResponse> 
    where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        provider.Token = cancellationToken;
        return await next();
    }
}
