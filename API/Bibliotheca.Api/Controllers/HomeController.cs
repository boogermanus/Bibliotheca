using Microsoft.AspNetCore.Mvc;

namespace Bibliotheca.Controllers;
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