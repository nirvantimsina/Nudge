using System.Data;
using Dapper;

namespace Nudge.Infrastructure.Common;

/// <summary>
/// Dapper type handler to map nullable PostgreSQL 'DATE' columns to .NET 6+ 'DateOnly?'.
/// </summary>
public sealed class NullableDateOnlyTypeHandler : SqlMapper.TypeHandler<DateOnly?>
{
    public override void SetValue(IDbDataParameter parameter, DateOnly? value)
    {
        parameter.DbType = DbType.Date;
        parameter.Value = value.HasValue 
            ? value.Value.ToDateTime(TimeOnly.MinValue) 
            : DBNull.Value;
    }

    public override DateOnly? Parse(object value)
    {
        if (value is null or DBNull)
        {
            return null;
        }

        return value switch
        {
            DateOnly dateOnly => dateOnly,
            DateTime dateTime => DateOnly.FromDateTime(dateTime),
            string str when DateOnly.TryParse(str, out var parsedDate) => parsedDate,
            _ => throw new DataException($"Cannot convert database value of type '{value.GetType().FullName}' to Nullable<DateOnly>.")
        };
    }
}