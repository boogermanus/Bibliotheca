using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Infrastrcture.Repositories;

public class BookRepository : BaseRepository<Book>, IBookRepository
{
    public BookRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Book>> GetBooksForUserAsync(string userId)
    {
        var books = await Entities
            .Join(DbContext.Libraries,
                book => book.LibraryId,
                library => library.Id,
                (book,library) => new {book}
            )
            .Select(q => q.book)
            .ToListAsync();

        return books;
    }
}