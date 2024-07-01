using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;

namespace Bibliotheca.Infrastrcture.Repositories;

public class LibraryUserRepository : BaseRepository<LibraryUser>, ILibraryUserRepository
{
    public LibraryUserRepository(AppDbContext context) : base(context) {}
}