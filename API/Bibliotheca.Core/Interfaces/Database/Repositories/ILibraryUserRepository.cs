using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.Interfaces.Database.Repositories;

public interface ILibraryUserRepository : IBaseRepository<LibraryUser>
{
    Task<IEnumerable<LibraryUser>> GetLibraryUsersByLibraryIdAsync(int libraryId);
}