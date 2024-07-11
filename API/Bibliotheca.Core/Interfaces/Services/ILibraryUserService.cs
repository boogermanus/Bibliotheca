using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.Interfaces.Services;

public interface ILibraryUserService
{
    Task<IEnumerable<LibraryUserModel>> GetLibraryUsersAsync(int libraryId);
    Task<LibraryUserModel?> DeleteLibraryUserAsync(int libraryUserId);
    Task<LibraryUserModel> AddLibraryUserAsync(LibraryUserModel model);
}