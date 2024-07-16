using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;

namespace Bibliotheca.Core.Services.Api;

public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;

    public BookService(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    public async Task<BookModel> AddBookAsync(BookModel model)
    {
        var domainModel = model.ToDomainModel();

        var newBook = await _bookRepository.AddAsync(domainModel);

        return newBook.ToApiModel();
    }
}