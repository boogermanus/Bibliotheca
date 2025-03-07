using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Infrastrcture.Repositories;

public class LibraryBookshelfRepository : BaseRepository<LibraryBookshelf>, ILibraryBookshelfRepository
{
    public LibraryBookshelfRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<LibraryBookshelf?> GetBookshelfByNameAndLibraryAsync(string name, int libraryId)
    {
        var found = await Entities.FirstOrDefaultAsync(lb => lb.Name == name & lb.LibraryId == libraryId);
        return found;
    }

    public async Task<IEnumerable<LibraryBookshelf>> GetBookshelvesByLibraryAsync(int libraryId)
    {
        var bookshelves = await Entities.Where(lb => lb.LibraryId == libraryId).ToListAsync();

        return bookshelves;
    }
}