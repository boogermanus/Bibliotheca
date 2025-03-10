using Bibliotheca.Core.ApiModels;
using Bibliotheca.Core.ApiModels.Api;

namespace Bibliotheca.Core.Interfaces.Services;

public interface ILibraryService
{
    Task<LibraryModel> AddLibraryAsync(LibraryModel model);
    Task<IEnumerable<LibraryModel>> GetLibrariesForUserAsync();
    Task<IEnumerable<LibraryUserModel>> GetLibraryUsersAsync(int libraryId);
    Task<LibraryUserModel> AddLibraryUserAsync(LibraryUserModel model);
    Task<LibraryModel?> DeleteLibraryAsync(int libraryId);
    Task<LibraryUserModel?> DeleteLibraryUserAsync(int libraryUserId);
    Task<LibraryModel?> GetLibraryForUserAsync(int libraryId);
    Task<LibraryBookshelfModel> AddLibraryBookshelfAsync(LibraryBookshelfModel libraryBookshelf);
    Task<LibraryBookshelfModel?> DeleteLibraryBookshelfAsync(int bookshelfId);
    Task<IEnumerable<LibraryBookshelfModel>> GetBookshelvesForLibrary(int libraryId);
}