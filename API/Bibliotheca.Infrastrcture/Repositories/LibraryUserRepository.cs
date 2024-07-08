using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Infrastrcture.Repositories;

public class LibraryUserRepository : BaseRepository<LibraryUser>, ILibraryUserRepository
{
    public LibraryUserRepository(AppDbContext context) : base(context) {}

    public async Task<IEnumerable<LibraryUser>> GetLibraryUsersByLibraryIdAsync(int libraryId)
    {
        return await Entities
            .Include(e => e.User)
            .Where(query => query.LibraryId == libraryId)
            .ToListAsync();
    }
}