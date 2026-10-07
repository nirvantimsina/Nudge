using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Nudge.Infrastructure.Persistence.Seq;

namespace Nudge.Presentation.Extensions;

public static class HealthCheckExtensions
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
    };

    public static IServiceCollection AddAppHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        var dbConnection = configuration.GetConnectionString("Nudge_DB") 
            ?? throw new InvalidOperationException("ConnectionStrings:Nudge_DB is missing.");
            
        var redisConnection = configuration.GetConnectionString("Redis") 
            ?? "localhost:6379,abortConnect=false";

        var seqUrl = configuration.GetValue<string>($"{SeqOptions.SectionName}:ServerUrl");
            
        var zitadelIssuer = configuration["Zitadel:Issuer"] ?? "http://localhost:8080";

        services.AddHealthChecks()
            .AddCheck("self", () => HealthCheckResult.Healthy(), tags: ["live"])
            .AddNpgSql(
                connectionString: dbConnection,
                name: "postgresql",
                failureStatus: HealthStatus.Unhealthy,
                tags: ["ready", "db"])
            .AddRedis(
                redisConnectionString: redisConnection,
                name: "redis",
                failureStatus: HealthStatus.Degraded,
                tags: ["ready", "cache"])
            .AddUrlGroup(
                uri: new Uri($"{zitadelIssuer.TrimEnd('/')}/.well-known/openid-configuration"),
                name: "zitadel_idp",
                failureStatus: HealthStatus.Degraded,
                tags: ["ready", "auth"])
            .AddUrlGroup(
                uri: new Uri($"{seqUrl.TrimEnd('/')}/health"),
                name: "Seq",
                failureStatus: HealthStatus.Unhealthy,
                tags: ["ready", "log"]
            );

        return services;
    }

    public static IEndpointRouteBuilder MapAppHealthChecks(this IEndpointRouteBuilder endpoints)
    {
        // Liveness probe (container orchestrator check)
        endpoints.MapHealthChecks("/health/live", new HealthCheckOptions
        {
            Predicate = check => check.Tags.Contains("live")
        });

        // Readiness probe (deep infrastructure dependencies)
        endpoints.MapHealthChecks("/health/ready", new HealthCheckOptions
        {
            Predicate = check => check.Tags.Contains("ready"),
            ResponseWriter = WriteJsonResponse
        });

        // Legacy / general alias
        endpoints.MapHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = WriteJsonResponse
        });

        return endpoints;
    }

    private static Task WriteJsonResponse(HttpContext context, HealthReport report)
    {
        context.Response.ContentType = "application/json";

        var response = new
        {
            status = report.Status == HealthStatus.Healthy ? "0" : "1",
            msg = report.Status.ToString(),
            data = new
            {
                totalDurationMs = report.TotalDuration.TotalMilliseconds,
                entries = report.Entries.Select(e => new
                {
                    name = e.Key,
                    status = e.Value.Status.ToString(),
                    description = e.Value.Description,
                    durationMs = e.Value.Duration.TotalMilliseconds,
                    error = e.Value.Exception?.Message
                })
            }
        };

        return context.Response.WriteAsync(JsonSerializer.Serialize(response, JsonOptions));
    }
}