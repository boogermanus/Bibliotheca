using Bibliotheca.OpenLibrary.Services;

var isbnService = new IsbnOpenLibraryService();
var book = await isbnService.GetBookAsync("9780140328721");
Console.WriteLine(book);
var authorService = new AuthorOpenLibraryService();
var author = await authorService.GetAuthorAsync(book?.Authors.First().Key ?? string.Empty);
Console.WriteLine(author);
var worksService = new WorksOpenLibraryService();
var work = await worksService.GetWorkAsync(book?.Works.First().Key ?? string.Empty);
Console.WriteLine(work);
