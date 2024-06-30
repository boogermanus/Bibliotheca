using System.Security.Claims;

namespace Bibliotheca.Core.Interfaces.Auth;

public interface IUserService
{
    public ClaimsPrincipal User { get; }
    public string CurrentUserId { get; }
}