using Bibliotheca.Models;

namespace Bibliotheca.Data.Repositories
{
    public class LibraryRepository : BaseRepository<Library, ApplicationDbContext>
    {
        public LibraryRepository(ApplicationDbContext context) : base(context) {}
    }
}