using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Infrastructure.Services;

public class ZitadelService : IZitadelService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ZitadelService> _logger;
    private readonly string _issuer;
    private readonly string _clientId;
    private readonly string _clientSecret;

    public ZitadelService(
        HttpClient httpClient,
        IConfiguration configuration,
        ILogger<ZitadelService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
        _issuer = (configuration["Zitadel:Issuer"] ?? "http://localhost:8080").TrimEnd('/');
        _clientId = configuration["Zitadel:ClientId"] ?? configuration["Zitadel:Audience"] ?? "392645870304100356";
        _clientSecret = configuration["Zitadel:ClientSecret"] ?? string.Empty;

        if (_httpClient.BaseAddress == null)
        {
            _httpClient.BaseAddress = new Uri(_issuer);
        }
    }

    public async Task<ZitadelAuthResult> AuthenticateAsync(string usernameOrEmail, string password, CancellationToken ct = default)
    {
        try
        {
            var formParams = new Dictionary<string, string>
            {
                { "grant_type", "password" },
                { "client_id", _clientId },
                { "username", usernameOrEmail },
                { "password", password },
                { "scope", "openid profile email urn:zitadel:iam:user:metadata" }
            };

            if (!string.IsNullOrWhiteSpace(_clientSecret))
            {
                formParams.Add("client_secret", _clientSecret);
            }

            var request = new HttpRequestMessage(HttpMethod.Post, $"{_issuer}/oauth/v2/token")
            {
                Content = new FormUrlEncodedContent(formParams)
            };

            var response = await _httpClient.SendAsync(request, ct);
            var content = await response.Content.ReadAsStringAsync(ct);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning("Zitadel token request failed with status {StatusCode}: {Response}", response.StatusCode, content);
                string userFriendlyError = "Invalid username or password";
                
                try
                {
                    using var doc = JsonDocument.Parse(content);
                    if (doc.RootElement.TryGetProperty("error_description", out var desc))
                    {
                        userFriendlyError = desc.GetString() ?? userFriendlyError;
                    }
                }
                catch
                {
                    // Keep fallback message
                }

                return new ZitadelAuthResult(false, ErrorMessage: userFriendlyError);
            }

            using var tokenDoc = JsonDocument.Parse(content);
            var root = tokenDoc.RootElement;
            var accessToken = root.GetProperty("access_token").GetString();
            var idToken = root.TryGetProperty("id_token", out var idProp) ? idProp.GetString() : null;

            string? sub = null;
            string? email = null;
            string? userName = null;
            string? name = null;

            // Extract claims from ID token or userinfo
            if (!string.IsNullOrEmpty(idToken))
            {
                var payload = DecodeJwtPayload(idToken);
                if (payload.HasValue)
                {
                    var p = payload.Value;
                    if (p.TryGetProperty("sub", out var subProp)) sub = subProp.GetString();
                    if (p.TryGetProperty("email", out var emailProp)) email = emailProp.GetString();
                    if (p.TryGetProperty("preferred_username", out var uProp)) userName = uProp.GetString();
                    if (p.TryGetProperty("name", out var nameProp)) name = nameProp.GetString();
                }
            }

            // Fallback to UserInfo if claims were missing from ID token
            if (string.IsNullOrEmpty(sub) && !string.IsNullOrEmpty(accessToken))
            {
                var userInfo = await GetUserInfoAsync(accessToken, ct);
                if (userInfo != null)
                {
                    sub = userInfo.SubjectId;
                    email = userInfo.Email;
                    userName = userInfo.UserName;
                    name = userInfo.Name;
                }
            }

            return new ZitadelAuthResult(
                Success: true,
                AccessToken: accessToken,
                IdToken: idToken,
                SubjectId: sub,
                Email: email ?? usernameOrEmail,
                UserName: userName ?? usernameOrEmail,
                Name: name ?? userName ?? usernameOrEmail
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception while authenticating against Zitadel for user: {User}", usernameOrEmail);
            return new ZitadelAuthResult(false, ErrorMessage: "Authentication provider connection error");
        }
    }

    public async Task<ZitadelCreateUserResult> CreateUserAsync(
        string username,
        string email,
        string name,
        string password,
        string? phone = null,
        CancellationToken ct = default)
    {
        try
        {
            var nameParts = name.Trim().Split(' ', 2, StringSplitOptions.RemoveEmptyEntries);
            var firstName = nameParts.Length > 0 ? nameParts[0] : username;
            var lastName = nameParts.Length > 1 ? nameParts[1] : firstName;

            // Try Zitadel v2 User API (POST /v2/users/human)
            var v2Payload = new
            {
                username = username.ToLowerInvariant(),
                profile = new
                {
                    givenName = firstName,
                    familyName = lastName,
                    displayName = name
                },
                email = new
                {
                    email = email,
                    isVerified = true
                },
                phone = string.IsNullOrWhiteSpace(phone) ? null : new
                {
                    phone = phone,
                    isVerified = true
                },
                password = new
                {
                    password = password,
                    changeRequired = false
                }
            };

            var jsonContent = new StringContent(
                JsonSerializer.Serialize(v2Payload),
                Encoding.UTF8,
                "application/json");

            var request = new HttpRequestMessage(HttpMethod.Post, $"{_issuer}/v2/users/human")
            {
                Content = jsonContent
            };

            var response = await _httpClient.SendAsync(request, ct);
            var content = await response.Content.ReadAsStringAsync(ct);

            if (response.IsSuccessStatusCode)
            {
                using var doc = JsonDocument.Parse(content);
                string? userId = null;
                if (doc.RootElement.TryGetProperty("userId", out var uId)) userId = uId.GetString();
                else if (doc.RootElement.TryGetProperty("id", out var id)) userId = id.GetString();

                return new ZitadelCreateUserResult(true, UserId: userId ?? Guid.NewGuid().ToString());
            }

            _logger.LogWarning("Zitadel user creation returned status {StatusCode}: {Content}", response.StatusCode, content);

            // Attempt fallback to v1 Management API
            var v1Payload = new
            {
                userName = username.ToLowerInvariant(),
                profile = new
                {
                    firstName = firstName,
                    lastName = lastName,
                    displayName = name
                },
                email = new
                {
                    email = email,
                    isEmailVerified = true
                },
                initialPassword = password
            };

            var v1Request = new HttpRequestMessage(HttpMethod.Post, $"{_issuer}/management/v1/users/human")
            {
                Content = new StringContent(JsonSerializer.Serialize(v1Payload), Encoding.UTF8, "application/json")
            };

            var v1Response = await _httpClient.SendAsync(v1Request, ct);
            var v1Content = await v1Response.Content.ReadAsStringAsync(ct);

            if (v1Response.IsSuccessStatusCode)
            {
                using var v1Doc = JsonDocument.Parse(v1Content);
                string? userId = null;
                if (v1Doc.RootElement.TryGetProperty("userId", out var uId)) userId = uId.GetString();
                return new ZitadelCreateUserResult(true, UserId: userId ?? Guid.NewGuid().ToString());
            }

            string errorMessage = "Failed to create user in identity provider.";
            try
            {
                using var errorDoc = JsonDocument.Parse(content);
                if (errorDoc.RootElement.TryGetProperty("message", out var msg))
                {
                    errorMessage = msg.GetString() ?? errorMessage;
                }
            }
            catch { }

            return new ZitadelCreateUserResult(false, ErrorMessage: errorMessage);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user in Zitadel: {UserName}", username);
            return new ZitadelCreateUserResult(false, ErrorMessage: "Identity service unavailable");
        }
    }

    public async Task<ZitadelUserInfoResult?> GetUserInfoAsync(string accessToken, CancellationToken ct = default)
    {
        try
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"{_issuer}/oidc/v1/userinfo");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await _httpClient.SendAsync(request, ct);
            if (!response.IsSuccessStatusCode) return null;

            var content = await response.Content.ReadAsStringAsync(ct);
            using var doc = JsonDocument.Parse(content);
            var root = doc.RootElement;

            var sub = root.GetProperty("sub").GetString() ?? string.Empty;
            var email = root.TryGetProperty("email", out var e) ? e.GetString() ?? string.Empty : string.Empty;
            var userName = root.TryGetProperty("preferred_username", out var u) ? u.GetString() : null;
            var name = root.TryGetProperty("name", out var n) ? n.GetString() : null;
            var phone = root.TryGetProperty("phone_number", out var p) ? p.GetString() : null;

            return new ZitadelUserInfoResult(sub, email, userName, name, phone);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch userinfo from Zitadel");
            return null;
        }
    }

    private static JsonElement? DecodeJwtPayload(string token)
    {
        try
        {
            var parts = token.Split('.');
            if (parts.Length < 2) return null;
            var base64 = parts[1].Replace('-', '+').Replace('_', '/');
            switch (base64.Length % 4)
            {
                case 2: base64 += "=="; break;
                case 3: base64 += "="; break;
            }
            var bytes = Convert.FromBase64String(base64);
            var json = Encoding.UTF8.GetString(bytes);
            return JsonDocument.Parse(json).RootElement;
        }
        catch
        {
            return null;
        }
    }
}
