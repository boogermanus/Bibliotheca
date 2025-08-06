using Bibliotheca.OpenLibrary.Services;

var isbnService = new IsbnOpenLibraryService();
var authorService = new AuthorOpenLibraryService();
var worksService = new WorksOpenLibraryService();
var worksDescService = new WorkWithDescKeyService();

var service = new OpenLibraryService(isbnService, authorService, worksService, worksDescService);

var result = await service.GetBookByIsbn("067174559X");
Console.WriteLine(result);
