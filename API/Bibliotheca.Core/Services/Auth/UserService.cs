using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Bibliotheca.Core.Interfaces.Auth;
using Microsoft.AspNetCore.Http;

namespace Bibliotheca.Core.Services.Auth;

public class UserService : IUserService
{
    private readonly IHttpContextAccessor _context;
    public ClaimsPrincipal User => _context.HttpContext.User;

    public string CurrentUserId => User.FindFirstValue(JwtRegisteredClaimNames.NameId) ?? string.Empty;


    public UserService(IHttpContextAccessor context)
    {
        _context = context;
    }
}