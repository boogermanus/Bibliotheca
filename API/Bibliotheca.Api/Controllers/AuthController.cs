using Bibliotheca.Core.ApiModels.Auth;
using Bibliotheca.Core.Interfaces.Auth;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotheca.Controllers;

[ApiController()]
[Route("api/[controller]")]
public class AuthController : ControllerBase 
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationModel model)
    {
        var result = await _authService.Register(model);

        if(result.Succeeded)
            return Ok(true);

        result.Errors.ToList().ForEach(e => ModelState.AddModelError(e.Code, e.Description));

        return BadRequest(ModelState);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var result = await _authService.Login(model);

        if(result == null)
            return Unauthorized(ModelState);

        return Ok(result);
    }
}