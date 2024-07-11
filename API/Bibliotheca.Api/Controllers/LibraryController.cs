using Bibliotheca.Core.ApiModels;
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
    public async Task<IActionResult> AddLibraryUser(LibraryUserModel model)
    {
        try
        {
            var user = await _libraryService.AddLibraryUserAsync(model);
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

    [HttpPost("AddLibraryBookshelf")]
    public async Task<IActionResult> AddLibraryBookshelf([FromBody]LibraryBookshelfModel model)
    {
        try
        {
            var bookshelf = await _libraryService.AddLibraryBookshelfAsync(model);
            return Ok(bookshelf);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("DeleteLibraryBookshelf/{id:int}")]
    public async Task<IActionResult> DeleteLibraryBookshelf(int id)
    {
        var deleted = await _libraryService.DeleteLibraryBookshelfAsync(id);
        return Ok(deleted);
    }

    [HttpGet("{id:int}/GetLibraryBookshelves")]
    public async Task<IActionResult> GetLibraryBookshelves(int id)
    {
        var bookshelvels = await _libraryService.GetBookshelvesForLibrary(id);
        return Ok(bookshelvels);
    }

}