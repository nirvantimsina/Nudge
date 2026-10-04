namespace Nudge.Application.Common.Interfaces;

public interface ICacheableQuery
{
    string CacheKey { get; }
    TimeSpan? Expiration => null;
    
    bool IsCreatorScoped => false;
    bool IsUserScoped => false;
}