using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Infrastructure.Repositories;

public class BookRepository : BaseRepository<Book>, IBookRepository
{
    public BookRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Book>> GetBooksForUserAsync(string userId)
    {
        var books = await Entities
            .Join(DbContext.LibraryUsers,
                book => book.LibraryId,
                libraryUser => libraryUser.LibraryId,
                (book, libraryUser) => new {book, libraryUser})
                .Where(q => q.libraryUser.UserId == userId)
                .Select(q => q.book)
                .Include(q => q.LibraryBookshelf)
                .Include(q => q.Library)
                .ToListAsync();

            return books;
    }

    public async Task<Book?> GetBookForUserAsync(int bookId, string userId)
    {
        var book = await Entities
            .Join(DbContext.LibraryUsers,
                book => book.LibraryId,
                libraryUser => libraryUser.LibraryId,
                (book, libraryUser) => new {book, libraryUser})
            .Where(q => q.book.Id == bookId && q.libraryUser.UserId == userId)
            .Select(q => q.book)
            .Include(q => q.LibraryBookshelf)
            .Include(q => q.Library)
            .FirstOrDefaultAsync();

        return book;
    }

    public async Task<IEnumerable<string>> GetSubjectsForUserAsync(string userId)
    {
        var subjects = await Entities
            .Join(DbContext.LibraryUsers,
                book => book.LibraryId,
                libraryUser => libraryUser.LibraryId,
                (book, libraryUser) => new { book, libraryUser })
            .Where(q => q.libraryUser.UserId == userId)
            .Select(q => q.book.Subject)
            .Distinct()
            .ToListAsync();
        
        return subjects;
    }

    public async Task<Book?> DeleteBookForUserAsync(int bookId, string userId)
    {
        throw new NotImplementedException();
    }
}