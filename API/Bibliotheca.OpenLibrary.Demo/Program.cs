using Bibliotheca.OpenLibrary.Services;

var service = new IsbnOpenLibraryService("https://openlibrary.org/isbn");
var book = await service.GetBook("9780140328721");
Console.WriteLine(book);

