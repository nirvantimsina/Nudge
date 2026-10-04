using Dapper;
using Nudge.Infrastructure.Persistence;

public interface IUserIdentityService
{
    Task<UserIdentityDto> GetOrCreateUserAsync(string subjectId, string email, string userName);
}

public class UserIdentityDto
{
    public int UserId { get; set; }
    public int CreatorId { get; set; }
    public int RoleId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public bool IsKycVerified { get; set; }
}

public class UserIdentityService : IUserIdentityService
{
    private readonly DbConnectionFactory _db;

    public UserIdentityService(DbConnectionFactory db) => _db = db;

    public async Task<UserIdentityDto> GetOrCreateUserAsync(string subjectId, string email, string userName)
    {
        using var conn = _db.CreateConnection();

        // 1. Check if user already exists with this SubjectId
        const string selectSql = @"
            SELECT ""Id"" AS UserId, COALESCE(""CreatorId"", ""Id"") AS CreatorId, ""RoleId"", ""UserName"", COALESCE(""IsKycVerified"", true) AS IsKycVerified
            FROM ""Users""
            WHERE ""SubjectId"" = @SubjectId
            LIMIT 1;";

        var existing = await conn.QueryFirstOrDefaultAsync<UserIdentityDto>(selectSql, new { SubjectId = subjectId });
        if (existing != null) return existing;

        // 2. Just-In-Time Provisioning: insert new user and return generated integer Id
        const string insertSql = @"
            INSERT INTO ""Users"" (""SubjectId"", ""UserName"", ""Email"", ""RoleId"", ""CreatedAt"")
            VALUES (@SubjectId, @UserName, @Email, 1, NOW())
            RETURNING ""Id"" AS UserId, ""Id"" AS CreatorId, ""RoleId"", ""UserName"", true AS IsKycVerified;";

        return await conn.QuerySingleAsync<UserIdentityDto>(insertSql, new 
        { 
            SubjectId = subjectId, 
            UserName = string.IsNullOrWhiteSpace(userName) ? email : userName, 
            Email = email 
        });
    }
}