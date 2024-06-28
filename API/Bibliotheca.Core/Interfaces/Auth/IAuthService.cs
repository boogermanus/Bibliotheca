using Bibliotheca.Core.ApiModels.Auth;
using Microsoft.AspNetCore.Identity;

namespace Bibliotheca.Core.Interfaces.Auth;

public interface IAuthService
{
    Task<IdentityResult> Register(RegisterModel model);
    Task<AuthModel> Login();
    
}