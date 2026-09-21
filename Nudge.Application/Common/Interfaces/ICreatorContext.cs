// Nudge.Application/Common/Interfaces/ICreatorContext.cs
namespace Nudge.Application.Common.Interfaces;

public interface ICreatorContext
{
    int CreatorId { get; }
    int UserId { get; }
    bool IsAuthenticated { get; }
}