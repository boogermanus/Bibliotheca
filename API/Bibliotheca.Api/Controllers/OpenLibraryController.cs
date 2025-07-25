using Bibliotheca.OpenLibrary.Interfaces;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;

namespace Bibliotheca.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OpenLibraryController : ControllerBase
{
    private readonly IOpenLibraryService _openLibraryService;

    public OpenLibraryController(IOpenLibraryService openLibraryService)
    {
        _openLibraryService = openLibraryService;
    }

    [HttpGet("GetBook")]
    public async Task<IActionResult> GetBook([FromQuery] string isbn)
    {
        var book = await _openLibraryService.GetBookByIsbn(isbn);
        
        if(book == null)
            return NotFound();
        
        return Ok(book);
    }
}