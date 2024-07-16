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
}