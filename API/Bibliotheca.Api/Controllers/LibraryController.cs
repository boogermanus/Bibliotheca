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

    [HttpGet("{id:int}/GetLibraryUsers")]
    public async Task<IActionResult> GetLibraryUsers(int id)
    {
        return Ok(await _libraryService.GetLibraryUsersAsync(id));
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

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteLibrary(int id) 
    {
        return Ok(await _libraryService.DeleteLibraryAsync(id));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetLibrary(int id) 
    {
        var library = await _libraryService.GetLibraryForUserAsync(id);

        if(library == null)
            return NotFound();

        return Ok(library);
    }

    [HttpDelete("DeleteLibraryUser/{id:int}")]
    public async Task<IActionResult> DeleteLibraryUser(int id)
    {
        var libraryUser = await _libraryService.DeleteLibraryUserAsync(id);
        return Ok(libraryUser);
    }

}