using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bibliotheca.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
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
}