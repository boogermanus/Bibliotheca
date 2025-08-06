using Bibliotheca.OpenLibrary.Interfaces;
using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Services;

public class OpenLibraryService : IOpenLibraryService
{
    private readonly IsbnOpenLibraryService _isbnService;
    private readonly AuthorOpenLibraryService _authorService;
    private readonly WorksOpenLibraryService _worksService;
    private readonly WorkWithDescKeyService _workWithDescKeyService;

    public OpenLibraryService(IsbnOpenLibraryService isbnService, AuthorOpenLibraryService authorService,
        WorksOpenLibraryService worksService, WorkWithDescKeyService workWithDescKey)
    {
        _isbnService = isbnService;
        _authorService = authorService;
        _worksService = worksService;
        _workWithDescKeyService = workWithDescKey;
    }

    public async Task<OpenLibraryBook?> GetBookByIsbn(string isbn)
    {
        var book = await _isbnService.GetBookAsync(isbn);

        if (book?.IsEmpty() ?? true)
            return null;

        var authors = new List<Author>();

        foreach (var author in book.Authors)
        {
            var authorData = await _authorService.GetAuthorAsync(author.Key);

            if (authorData != null)
                authors.Add(authorData);
        }

        Work? work = null;
        WorkWithDescKey? workWithDescKey = null;
        
        try
        {
            // we may not be able to parse the work as open library isn't consistent with its values
            work = await _worksService.GetWorkAsync(book.Works.First().Key);
        }
        catch (Exception)
        {
            workWithDescKey = await _workWithDescKeyService.GetWorkAsync(book.Works.First().Key);
        }

        return work != null
            ? new OpenLibraryBook(book, authors.ToArray(), work)
            : new OpenLibraryBook(book, authors.ToArray(), workWithDescKey ?? new WorkWithDescKey());
    }
}