using Dapper;
using Nudge.Application.Models.Loom.ResponseModel; // <-- Add this namespace
using Nudge.Application.Models.Public.Creators.ResponseModel;

namespace Nudge.Infrastructure.Common;

public static class DapperTypeHandlers
{
    public static void Register()
    {
        SqlMapper.AddTypeHandler(new JsonTypeHandler<List<TierDto>>());
        SqlMapper.AddTypeHandler(new JsonTypeHandler<RecentNudgeDto>());
        SqlMapper.AddTypeHandler(new JsonTypeHandler<List<LoomLinkItem>>());
    }
}