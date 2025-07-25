using Bibliotheca.OpenLibrary.Interfaces;
using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Services;

public class OpenLibraryService : IOpenLibraryService
{
    private IsbnOpenLibraryService _isbnService;
    private AuthorOpenLibraryService _authorService;
    private WorksOpenLibraryService _worksService;

    public OpenLibraryService(IsbnOpenLibraryService isbnService, AuthorOpenLibraryService authorService, WorksOpenLibraryService worksService)
    {
        _isbnService = isbnService;
        _authorService = authorService;
        _worksService = worksService;
    }

    public async Task<OpenLibraryBook?> GetBookByIsbn(string isbn)
    {
        var book = await _isbnService.GetBookAsync(isbn);

        if(book == null) 
            return null;

        var authors = new List<Author>();

        foreach(var author in book.Authors)
        {
            var authorData = await _authorService.GetAuthorAsync(author.Key);
            
            if(authorData != null)
                authors.Add(authorData);
        }

        var work = await _worksService.GetWorkAsync(book.Works.First().Key);

        var result = new OpenLibraryBook(book, authors.ToArray(), work ?? new Work());

        return result;
    }
}