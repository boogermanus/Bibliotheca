using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Auth;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;

namespace Bibliotheca.Core.Services.Api;

public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;
    private readonly IUserService _userService;

    public BookService(
        IBookRepository bookRepository,
        IUserService userService)
    {
        _bookRepository = bookRepository;
        _userService = userService;
    }

    public async Task<BookModel> AddBookAsync(BookModel model)
    {
        var domainModel = model.ToDomainModel();

        var newBook = await _bookRepository.AddAsync(domainModel);

        return newBook.ToApiModel();
    }

    public async Task<IEnumerable<BookModel>> GetBooksForUserAsync()
    {
        var books = await _bookRepository.GetBooksForUserAsync(_userService.CurrentUserId);

        return books.Select(book => book.ToApiModel()).ToList();
    }
}