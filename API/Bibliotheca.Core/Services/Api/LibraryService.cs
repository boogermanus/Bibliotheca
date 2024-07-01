using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Auth;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;
using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.Services.Api;

public class LibraryService : ILibraryService
{
    private readonly ILibraryRepository _libraryRepository;
    private readonly ILibraryUserRepository _libraryUserRepository;
    private readonly IUserService _userService;

    public LibraryService(ILibraryRepository libraryRepository, ILibraryUserRepository libraryUserRepository, IUserService userService)
    {
        _libraryRepository = libraryRepository;
        _userService = userService;
        _libraryUserRepository = libraryUserRepository;
    }
    public async Task<LibraryModel> AddLibraryAsync(LibraryModel model)
    {
        var newLibrary = model.ToDomainModel();
        newLibrary = await _libraryRepository.AddAsync(newLibrary);

        var libraryUser = new LibraryUser
        {
            UserId = _userService.CurrentUserId,
            LibraryId = newLibrary.Id
        };

        await _libraryUserRepository.AddAsync(libraryUser);

        return newLibrary.ToApiModel();
    }

    public async Task<IEnumerable<LibraryModel>> GetLibrariesForUserAsync()
    {
        var libraries = await _libraryRepository.GetLibrariesForUserIdAsync(_userService.CurrentUserId);
        return libraries.Select(l => l.ToApiModel()).ToList();
    }
}