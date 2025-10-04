using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.Core.Interfaces.Services;

public interface IBookService
{
    Task<BookModel> AddBookAsync(BookModel model);
    Task<IEnumerable<BookModel>> GetBooksForUserAsync();
    Task<BookModel?> GetBookForUserAsync(int bookId);
    Task<BookModel?> DeleteBookAsync(int bookId);
    Task<OpenLibraryBook?> GetSubjectsForUserAsync(OpenLibraryBook? book);
}