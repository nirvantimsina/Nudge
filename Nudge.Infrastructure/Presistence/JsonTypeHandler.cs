using System.Data;
using System.Text.Json;
using Dapper;

namespace Nudge.Infrastructure.Persistence;

public class JsonTypeHandler<T> : SqlMapper.TypeHandler<T>
{
    private static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web);

    public override void SetValue(IDbDataParameter parameter, T? value)
        => parameter.Value = value is null ? DBNull.Value : JsonSerializer.Serialize(value, Options);

    public override T? Parse(object value)
        => value is null or DBNull
            ? default
            : JsonSerializer.Deserialize<T>((string)value, Options);
}