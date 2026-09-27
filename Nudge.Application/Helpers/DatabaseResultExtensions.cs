using ErrorOr;
using Nudge.Domain.Models;

namespace Nudge.Application.Common.Extensions;

public static class DatabaseResultExtensions
{
    public static ErrorOr<T> ToDbResult<T>(this T? result) where T : StatusResponse
    {
        if (result == null)
        {
            return Error.NotFound(description: "No record received from the server!");
        }

        if (result.Status != "0" && result.Status != null)
        {
            return Error.Validation(code: result.Status, description: result.MSG ?? "Validation failed.");
        }

        return result;
    }

    public static ErrorOr<List<T>> ToDbResultList<T>(this IEnumerable<T>? result) where T : StatusResponse
    {
        if (result == null)
        {
            return Error.NotFound(description: "No record received from the server!");
        }

        var list = result.ToList();
        var firstItem = list.FirstOrDefault();

        // If the database returned a row containing a status error
        if (firstItem != null && firstItem.Status != "0" && firstItem.Status != null)
        {
            return Error.Validation(
                code: firstItem.Status,
                description: firstItem.MSG ?? "An unexpected database validation error occurred."
            );
        }

        return list;
    }

}
