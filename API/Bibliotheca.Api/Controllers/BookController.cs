using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Services;
using Bibliotheca.OpenLibrary.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotheca.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;
    private readonly IOpenLibraryService _openLibraryService;

    public BookController(IBookService bookService, IOpenLibraryService openLibraryService)
    {
        _bookService = bookService;
        _openLibraryService = openLibraryService;
    }

    [HttpPost("AddBook")]
    public async Task<IActionResult> AddBook([FromBody]BookModel book)
    {
        var newBook = await _bookService.AddBookAsync(book);

        return Ok(newBook);
    }

    [HttpGet("GetBooksForUser")]
    public async Task<IActionResult> GetBooksForUser()
    {
        var books = await _bookService.GetBooksForUserAsync();
        return Ok(books);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetBookForUser(int id)
    {
        var book = await _bookService.GetBookForUserAsync(id);

        if(book == null)
            return NotFound();

        return Ok(book);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _bookService.DeleteBookAsync(id);
        return Ok(book);
    }
    [HttpGet("GetOpenLibraryBook")]
    public async Task<IActionResult> GetBook([FromQuery] string isbn)
    {
        var book = await _openLibraryService.GetBookByIsbn(isbn);
        book = await _bookService.GetSubjectsAsync(book);
        
        if(book == null)
            return NotFound();
        
        return Ok(book);
    }
    
}