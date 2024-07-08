using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotheca.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LibraryController : ControllerBase
{
    private readonly ILibraryService _libraryService;
    public LibraryController(ILibraryService service)
    {
        _libraryService = service;
    }

    [HttpPost("AddLibrary")]
    public async Task<IActionResult> AddLibrary([FromBody]LibraryModel model)
    {
        var newLibrary = await _libraryService.AddLibraryAsync(model);
        return Ok(newLibrary);
    }

    [HttpGet("GetLibrariesForUser")]
    public async Task<IActionResult> GetLibrariesForUser()
    {
        return Ok(await _libraryService.GetLibrariesForUserAsync());
    }

    [HttpGet("GetLibraryUsers")]
    public async Task<IActionResult> GetLibraryUsers([FromQuery]int libraryId)
    {
        return Ok(await _libraryService.GetLibraryUsersAsync(libraryId));
    }

    [HttpPost("AddLibraryUser")]
    public async Task<IActionResult> AddLibraryUser([FromQuery]string email, [FromQuery]int libraryId)
    {
        try
        {
            var user = await _libraryService.AddLibraryUserAsync(email,libraryId);
            return Ok(user);
        }
        catch(Exception e)
        {
            if(e.Message.Contains("registered"))
                return NotFound(e.Message);

            return BadRequest(e.Message);
        }
    }
}