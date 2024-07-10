using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;

namespace Bibliotheca.Infrastrcture.Repositories;

public class LibraryBookshelfRepository : BaseRepository<LibraryBookshelf>, ILibraryBookshelfRepository
{
    public LibraryBookshelfRepository(AppDbContext context) : base(context)
    {
    }
}