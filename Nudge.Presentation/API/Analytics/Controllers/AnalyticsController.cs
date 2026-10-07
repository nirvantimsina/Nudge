using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Analytics.Queries;
using Serilog;
using System.Text.Json;

namespace Nudge.Presentation.Controllers.Analytics;

public class AnalyticsController(IMediator mediator) : ApiBaseController
{
    [AllowAnonymous]
    [HttpPost("Track")] 
    public async Task<IActionResult> TrackEvent([FromBody] ClientTelemetryRequest request)
    {
        if (request == null) return BadRequest();

        // 1. Clean the Metadata values from JsonElement to raw types
        var cleanMetadata = new Dictionary<string, object>();
        if (request.Metadata != null)
        {
            foreach (var kvp in request.Metadata)
            {
                if (kvp.Value is JsonElement jsonElement)
                {
                    cleanMetadata[kvp.Key] = jsonElement.ValueKind switch
                    {
                        JsonValueKind.String => jsonElement.GetString() ?? "",
                        JsonValueKind.Number => jsonElement.GetDouble(),
                        JsonValueKind.True => true,
                        JsonValueKind.False => false,
                        _ => jsonElement.GetRawText()
                    };
                }
                else
                {
                    cleanMetadata[kvp.Key] = kvp.Value;
                }
            }
        }

        // 2. Safely extract explicit tracking parameters for Seq columns
        string buttonLabel = "Unknown Target";

        if (cleanMetadata.TryGetValue("custom_tag", out var tag) && !string.IsNullOrWhiteSpace(tag?.ToString()))
        {
            buttonLabel = tag.ToString()!;
        }
        else if (cleanMetadata.TryGetValue("element_text", out var text) && !string.IsNullOrWhiteSpace(text?.ToString()))
        {
            buttonLabel = text.ToString()!;
        }

        string identityUserId = CurrentUserId > 0 ? CurrentUserId.ToString() : "Anonymous";
        string identityUserName = !string.IsNullOrEmpty(CurrentUserName) ? CurrentUserName : "Anonymous";
        string identityCreatorId = CurrentCreatorId > 0 ? CurrentCreatorId.ToString() : "None";

        string ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
        string userAgentStr = request.Browser ?? string.Empty;
        string deviceType = userAgentStr.Contains("Mobi", StringComparison.OrdinalIgnoreCase) ? "Mobile" : "Desktop";

        // 3. Dispatch structured parameters straight to Serilog
        Log.ForContext("Analytics_UserId", identityUserId)
           .ForContext("Analytics_UserName", identityUserName)
           .ForContext("Analytics_CreatorId", identityCreatorId)
           .ForContext("Analytics_Event", request.EventName)
           .ForContext("Analytics_Url", request.Url ?? "/")
           .ForContext("Analytics_ButtonLabel", buttonLabel)
           .ForContext("Analytics_DurationOrLoadMs", request.PerformanceMs)
           .ForContext("Analytics_DeviceType", deviceType)
           .ForContext("Analytics_Screen", request.ScreenSize)
           .ForContext("Analytics_IP", ipAddress)
           .ForContext("Analytics_Data", cleanMetadata, destructureObjects: true)
           .Information("Analytics Suite: {EventName} on {Url} by {UserName}", request.EventName, request.Url, identityUserName);

        return Ok();
    }

    [HttpGet("CreatorMetrics")]
    public async Task<IActionResult> GetCreatorLinkMetrics([FromQuery] int daysAgo = 30)
    {
        var result = await mediator.Send(new GetCreatorMetricsQuery(daysAgo));
        return HandleErrorOr(result);
    }
}

public class ClientTelemetryRequest
{
    public string? EventName { get; set; }
    public string? Url { get; set; }
    public double PerformanceMs { get; set; }
    public string? Payload { get; set; }
    public string? ScreenSize { get; set; }
    public string? Language { get; set; }
    public Dictionary<string, object>? Metadata { get; set; }
    public string? Browser { get; set; }
}
