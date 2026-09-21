using System.Data;
using Dapper;

namespace Nudge.Infrastructure.Common;

public class DateOnlyTypeHandler : SqlMapper.TypeHandler<DateOnly>
{
    public override void SetValue(IDbDataParameter parameter, DateOnly value)
    {
        parameter.DbType = DbType.Date;
        parameter.Value = value;
    }

    public override DateOnly Parse(object value) => value switch
    {
        DateOnly dateOnly => dateOnly,
        DateTime dateTime => DateOnly.FromDateTime(dateTime),
        string str when DateOnly.TryParse(str, out var parsed) => parsed,
        _ => throw new InvalidCastException($"Cannot cast {value?.GetType().FullName ?? "null"} to DateOnly")
    };
}

public class NullableDateOnlyTypeHandler : SqlMapper.TypeHandler<DateOnly?>
{
    public override void SetValue(IDbDataParameter parameter, DateOnly? value)
    {
        parameter.DbType = DbType.Date;
        parameter.Value = value.HasValue ? value.Value : DBNull.Value;
    }

    public override DateOnly? Parse(object value) => value switch
    {
        null or DBNull => null,
        DateOnly dateOnly => dateOnly,
        DateTime dateTime => DateOnly.FromDateTime(dateTime),
        string str when DateOnly.TryParse(str, out var parsed) => parsed,
        _ => throw new InvalidCastException($"Cannot cast {value.GetType().FullName} to Nullable<DateOnly>")
    };
}