using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;

namespace Bibliotheca.Infrastrcture.Repositories;

public class BookRepository : BaseRepository<Book>, IBookRepository
{
    public BookRepository(AppDbContext context) : base(context)
    {
    }
}