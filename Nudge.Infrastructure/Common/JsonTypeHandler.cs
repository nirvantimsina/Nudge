using System.Data;
using System.Text.Json;
using Dapper;

namespace Nudge.Infrastructure.Common;

public class JsonTypeHandler<T> : SqlMapper.TypeHandler<T>
{
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public override void SetValue(IDbDataParameter parameter, T? value)
    {
        parameter.Value = value == null ? DBNull.Value : JsonSerializer.Serialize(value, Options);
        parameter.DbType = DbType.String;
    }

    public override T? Parse(object value)
    {
        if (value is null or DBNull)
            return default;

        var json = value.ToString();
        if (string.IsNullOrWhiteSpace(json))
            return default;

        return JsonSerializer.Deserialize<T>(json, Options);
    }
}