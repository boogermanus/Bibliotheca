using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.Interfaces.Database.Repositories;

public interface ILibraryRepository : IBaseRepository<Library>
{
    Task<IEnumerable<Library>> GetLibrariesForUserIdAsync(string userId);
    Task<Library?> GetLibraryForUserIdAsync(int libraryId, string userId);
}