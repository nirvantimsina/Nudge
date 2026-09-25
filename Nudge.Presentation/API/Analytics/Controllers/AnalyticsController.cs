using System.Text.Json;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace Nudge.Presentation.Controllers.Analytics;

public class AnalyticsController(IMediator mediator) : ApiBaseController
{
    [AllowAnonymous]
    // Adding a leading slash "/" bypasses ApiBaseController route layouts entirely
    [HttpPost("/api/Analytics/Track")] 
    public async Task<IActionResult> TrackEvent()
    {
        string rawJson = string.Empty;

        using (var reader = new StreamReader(Request.Body))
        {
            rawJson = await reader.ReadToEndAsync();
        }

        if (string.IsNullOrWhiteSpace(rawJson)) return BadRequest();

        var request = JsonSerializer.Deserialize<ClientTelemetryRequest>(rawJson, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        if (request == null) return BadRequest();

        // If CurrentUserId is 0, they are unauthenticated (Anonymous)
        string identityUserId = CurrentUserId > 0 ? CurrentUserId.ToString() : "Anonymous";
        string identityUserName = !string.IsNullOrEmpty(CurrentUserName) ? CurrentUserName : "Anonymous";
        string identityCreatorId = CurrentCreatorId > 0 ? CurrentCreatorId.ToString() : "None";

        string ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
        string userAgentStr = request.Browser ?? string.Empty;
        string deviceType = userAgentStr.Contains("Mobi", StringComparison.OrdinalIgnoreCase) ? "Mobile" : "Desktop";

        // ATTACH DIRECTLY TO SERILOG CONTEXT
        Log.ForContext("Analytics_UserId", identityUserId)
           .ForContext("Analytics_UserName", identityUserName)
           .ForContext("Analytics_CreatorId", identityCreatorId)
           .ForContext("Analytics_Event", request.EventName)
           .ForContext("Analytics_Url", request.Url)
           .ForContext("Analytics_DurationOrLoadMs", request.PerformanceMs)
           .ForContext("Analytics_DeviceType", deviceType)
           .ForContext("Analytics_Screen", request.ScreenSize)
           .ForContext("Analytics_IP", ipAddress)
           .ForContext("Analytics_Data", request.Metadata, destructureObjects: true)
           .Information("Analytics Suite: {EventName} on {Url} by {UserName}", request.EventName, request.Url, identityUserName);

        return Ok();
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