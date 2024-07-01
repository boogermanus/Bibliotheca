using Bibliotheca.Core.ApiModels.Api;

namespace Bibliotheca.Core.Interfaces.Services;

public interface ILibraryService
{
    Task<LibraryModel> AddLibraryAsync(LibraryModel model);
    Task<IEnumerable<LibraryModel>> GetLibrariesForUserAsync();
}