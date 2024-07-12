using Bibliotheca.OpenLibrary.Services;
Console.WriteLine("Hello, World!");

var service = new IsbnOpenLibraryService("https://openlibrary.org/isbn");
var isbn = Console.ReadLine();
var book = await service.GetBook(isbn ?? string.Empty);
Console.WriteLine(book);

