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
}