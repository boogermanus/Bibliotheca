using Microsoft.AspNetCore.Mvc;

namespace Bibliotheca.Api.Controllers;
[ApiController]
[Route("/")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok($"Bibilotheca API {DateTime.UtcNow}");
    }
}