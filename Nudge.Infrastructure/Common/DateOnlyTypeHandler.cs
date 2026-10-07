using System.Data;
using Dapper;

namespace Nudge.Infrastructure.Common;

/// <summary>
/// Dapper type handler to map PostgreSQL 'DATE' columns to .NET 6+ 'DateOnly'.
/// </summary>
public sealed class DateOnlyTypeHandler : SqlMapper.TypeHandler<DateOnly>
{
    public override void SetValue(IDbDataParameter parameter, DateOnly value)
    {
        parameter.DbType = DbType.Date;
        // Setting as DateTime or DateOnly depends on Npgsql version; 
        // passing DateOnly directly works natively with Npgsql 6+, while ToDateTime ensures ADO.NET fallback compatibility.
        parameter.Value = value.ToDateTime(TimeOnly.MinValue);
    }

    public override DateOnly Parse(object value)
    {
        return value switch
        {
            DateOnly dateOnly => dateOnly,
            DateTime dateTime => DateOnly.FromDateTime(dateTime),
            string str when DateOnly.TryParse(str, out var parsedDate) => parsedDate,
            _ => throw new DataException($"Cannot convert database value of type '{value.GetType().FullName}' to DateOnly.")
        };
    }
}