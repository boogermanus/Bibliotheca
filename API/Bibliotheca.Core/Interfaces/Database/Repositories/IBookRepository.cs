using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.Interfaces.Database.Repositories;

public interface IBookRepository : IBaseRepository<Book>
{
    Task<IEnumerable<Book>> GetBooksForUserAsync(string userId);
    Task<Book?> GetBookForUserAsync(int bookId, string userId);
}