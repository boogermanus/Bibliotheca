using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Bibliotheca.Core.ApiModels.Auth;
using Bibliotheca.Core.Interfaces.Auth;
using Bibliotheca.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace Bibliotheca.Core.Services.Auth;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly byte[] _key;

    public AuthService(UserManager<User> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
        _key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty);
    }
    public async Task<AuthModel?> Login(LoginModel model)
    {
        var user = await AuthenticateUserAsync(model);

        if(user == null)
            return null;

        var token = GenerateJsonWebToken(user);

        return string.IsNullOrEmpty(token) ? null : new AuthModel(token);
    }

    private async Task<User?> AuthenticateUserAsync(LoginModel model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null)
            return null;

        var validPassword = await _userManager.CheckPasswordAsync(user, model.Password);

        if (validPassword)
            return user;

        return null;
    }

    private string GenerateJsonWebToken(User user)
    {
        var expires = int.Parse(_configuration["Jwt:Expires"] ?? string.Empty);
        var tokenHandler = new JwtSecurityTokenHandler();
        var credentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256Signature);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Name, user.Id),
            new Claim(JwtRegisteredClaimNames.NameId, user.UserName ?? string.Empty),
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddSeconds(expires),
            signingCredentials: credentials);

        return tokenHandler.WriteToken(token);
    }

    public async Task<IdentityResult> Register(RegistrationModel model)
    {
        return await _userManager.CreateAsync(model.ToDomainModel(), model.Password);
    }
}