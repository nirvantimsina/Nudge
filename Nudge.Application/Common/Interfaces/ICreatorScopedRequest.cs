// Nudge.Application/Common/Interfaces/ICreatorScopedRequest.cs
namespace Nudge.Application.Common.Interfaces;

/// <summary>
/// Marker interface for commands/queries that must be restricted to 
/// and automatically stamped with the current authenticated creator.
/// </summary>
public interface ICreatorScopedRequest
{
    int CreatorId { get; set; }
    int UserId { get; set; }
}