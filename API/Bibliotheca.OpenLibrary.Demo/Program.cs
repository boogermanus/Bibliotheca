using Bibliotheca.OpenLibrary.Services;

var isbnService = new IsbnOpenLibraryService("https://openlibrary.org/isbn");
var book = await isbnService.GetBookAsync("9780140328721");
Console.WriteLine(book);
var authorService = new AuthorOpenLibraryService("https://openlibrary.org");
var author = await authorService.GetAuthorAsync(book?.Authors.First().Key ?? string.Empty);
Console.WriteLine(author);
