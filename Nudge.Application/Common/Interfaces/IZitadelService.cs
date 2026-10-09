namespace Nudge.Application.Common.Interfaces;

public interface IZitadelService
{
    Task<ZitadelAuthResult> AuthenticateAsync(string usernameOrEmail, string password, CancellationToken ct = default);
    Task<ZitadelCreateUserResult> CreateUserAsync(string username, string email, string name, string password, string? phone = null, CancellationToken ct = default);
    Task<ZitadelUserInfoResult?> GetUserInfoAsync(string accessToken, CancellationToken ct = default);
}

public record ZitadelAuthResult(
    bool Success,
    string? AccessToken = null,
    string? IdToken = null,
    string? ErrorMessage = null,
    string? SubjectId = null,
    string? Email = null,
    string? UserName = null,
    string? Name = null
);

public record ZitadelCreateUserResult(
    bool Success,
    string? UserId = null,
    string? ErrorMessage = null
);

public record ZitadelUserInfoResult(
    string SubjectId,
    string Email,
    string? UserName = null,
    string? Name = null,
    string? PhoneNumber = null
);
