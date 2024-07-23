using Bibliotheca.Core.ApiModels.Api;

namespace Bibliotheca.Core.Interfaces.Services;

public interface IBookService
{
    Task<BookModel> AddBookAsync(BookModel model);
    Task<IEnumerable<BookModel>> GetBooksForUserAsync();
}