using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Infrastructure.Repositories;

public class LibraryRepository : BaseRepository<Library>, ILibraryRepository
{
    public LibraryRepository(AppDbContext context) : base(context) {}
    
    public async Task<IEnumerable<Library>> GetLibrariesForUserAsync(string userId)
    {
        var libraries = await DbContext.Libraries
            .Join(
                DbContext.LibraryUsers,
                library => library.Id,
                libraryUser => libraryUser.LibraryId,
                (library, libraryUser) => new {library, libraryUser})
            .Where(l => l.libraryUser.UserId == userId)
            .Select(l => l.library)
            .Include(l => l.LibraryUsers)
            .Include(l => l.LibraryBookshelves)
            .ToListAsync();

        return libraries;            
    }

    public async Task<Library?> GetLibraryForUserAsync(int libraryId, string userId)
    {
        var library = await DbContext.Libraries
            .Join(
                DbContext.LibraryUsers,
                library => library.Id,
                libraryUser => libraryUser.LibraryId,
                (library, libraryUser) => new {library, libraryUser}
            )
            .Where(l => l.library.Id == libraryId && l.libraryUser.UserId == userId)
            .Select(l => l.library)
            .FirstOrDefaultAsync();

        return library;
    }

    public async Task<int> GetLibraryBookCountAsync(int libraryId)
    {
        var count = await DbContext.Books
            .CountAsync(b => b.LibraryId == libraryId);

        return count;
    }
}