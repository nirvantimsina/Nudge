using Dapper;
using Nudge.Application.Models.Public.Creators.ResponseModel;

namespace Nudge.Infrastructure.Persistence;

public static class DapperTypeHandlers
{
    public static void Register()
    {
        SqlMapper.AddTypeHandler(new JsonTypeHandler<List<TierDto>>());
        SqlMapper.AddTypeHandler(new JsonTypeHandler<RecentNudgeDto>());
    }
}