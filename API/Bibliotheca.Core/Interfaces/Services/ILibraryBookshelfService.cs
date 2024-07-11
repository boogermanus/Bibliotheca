using Bibliotheca.Core.ApiModels;

namespace Bibliotheca.Core.Interfaces.Services;

public interface ILibraryBookshelfService
{
    Task<IEnumerable<LibraryBookshelfModel>> GetLibraryBookshelvesAsync(int libraryId);
    Task<LibraryBookshelfModel> AddLibraryBookshelfAsync(LibraryBookshelfModel model);
    Task<LibraryBookshelfModel?> DeleteLibraryBookshelfAsync(int bookshelfId);
}