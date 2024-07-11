using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.Interfaces.Database.Repositories;

public interface ILibraryBookshelfRepository : IBaseRepository<LibraryBookshelf>
{
    Task<LibraryBookshelf?> GetBookshelfByNameAndLibraryAsync(string name, int libraryId);
    Task<IEnumerable<LibraryBookshelf>> GetBookshelvesByLibraryAsync(int libraryId);
}