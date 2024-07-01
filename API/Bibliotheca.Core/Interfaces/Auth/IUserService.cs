using System.Security.Claims;

namespace Bibliotheca.Core.Interfaces.Auth;

public interface IUserService
{
    ClaimsPrincipal? User { get; }
    string CurrentUserId { get; }
}