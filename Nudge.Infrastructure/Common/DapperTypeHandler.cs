using Dapper;
using Nudge.Application.Models.Common.Response;
using Nudge.Application.Models.Loom.ResponseModel;

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