using Bibliotheca.OpenLibrary.Services;

var isbnService = new IsbnOpenLibraryService();
var authorService = new AuthorOpenLibraryService();
var worksService = new WorksOpenLibraryService();
var worksDescService = new WorkWithDescKeyService();
// var book = await isbnService.GetBookAsync("9780140328721");
// Console.WriteLine(book);

// var author = await authorService.GetAuthorAsync(book?.Authors.First().Key ?? string.Empty);
// Console.WriteLine(author);

// var work = await worksService.GetWorkAsync(book?.Works.First().Key ?? string.Empty);
// Console.WriteLine(work);

// var book = await isbnService.GetBookAsync("067174559X");
// Console.WriteLine(book);

// var work = await worksService.GetWorkAsync(book?.Works.First().Key ?? string.Empty);
// Console.WriteLine(work);

// var workDescriptionKeyService = new WorkWithDescKeyService();
// var workDk = await workDescriptionKeyService.GetWorkAsync(book?.Works.First().Key ?? string.Empty);
// Console.Read();

var service = new OpenLibraryService(isbnService, authorService, worksService, worksDescService);

var result = await service.GetBookByIsbn("067174559X");
Console.WriteLine(result);
