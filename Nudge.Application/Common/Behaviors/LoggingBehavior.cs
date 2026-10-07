using System.Diagnostics;
using ErrorOr;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Nudge.Application.Common.Behaviors;

public class LoggingBehavior<TRequest, TResponse>(ILogger<LoggingBehavior<TRequest, TResponse>> logger) 
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    public async Task<TResponse> Handle(
        TRequest request, 
        RequestHandlerDelegate<TResponse> next, 
        CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        
        logger.LogInformation("Handling request {RequestName}", requestName);
        
        var stopwatch = Stopwatch.StartNew();
        var response = await next();
        stopwatch.Stop();

        // Check if the response model implements or is an instance of ErrorOr
        if (response is IErrorOr errorOrResponse && errorOrResponse.IsError)
        {
            // Log business logic/validation failures as warnings with structured parameters
            logger.LogWarning(
                "Request {RequestName} failed after {ElapsedMilliseconds}ms with errors: {@Errors}", 
                requestName, 
                stopwatch.ElapsedMilliseconds, 
                errorOrResponse.Errors);
        }
        else
        {
            logger.LogInformation(
                "Successfully processed request {RequestName} in {ElapsedMilliseconds}ms", 
                requestName, 
                stopwatch.ElapsedMilliseconds);
        }

        return response;
    }
}
