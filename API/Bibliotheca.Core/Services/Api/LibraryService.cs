using System.Drawing;
using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Auth;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;
using Bibliotheca.Core.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Bibliotheca.Core.Services.Api;

public class LibraryService : ILibraryService
{
    private readonly ILibraryRepository _libraryRepository;
    private readonly ILibraryUserService _libraryUserService;
    private readonly IUserService _userService;

    public LibraryService(
        ILibraryRepository libraryRepository,
        ILibraryUserService libraryUserService,
        IUserService userService
        )
    {
        _libraryRepository = libraryRepository;
        _libraryUserService = libraryUserService;
        _userService = userService;
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

        await _libraryUserService.AddLibraryUserAsync(libraryUser);

        return newLibrary.ToApiModel();
    }

    public async Task<LibraryModel?> DeleteLibraryAsync(int libraryId)
    {
        var deletedLibrary = await _libraryRepository.DeleteAsync(libraryId);
        return deletedLibrary?.ToApiModel();
    }

    public async Task<IEnumerable<LibraryModel>> GetLibrariesForUserAsync()
    {
        var libraries = await _libraryRepository.GetLibrariesForUserIdAsync(_userService.CurrentUserId);
        return libraries.Select(l => l.ToApiModel()).ToList();
    }

    public async Task<IEnumerable<LibraryUserModel>> GetLibraryUsersAsync(int libraryId)
    {
        var libraryUsers = await _libraryUserService.GetLibraryUsersAsync(libraryId);

        return libraryUsers;
    }

    public async Task<LibraryUserModel> AddLibraryUserAsync(string username, int libraryId)
    {
        var newLibraryUser = await _libraryUserService.AddLibraryUserAsync(username, libraryId);
        return newLibraryUser;
    }
    public async Task<LibraryModel?> GetLibraryAsync(int libraryId)
    {
        var library = await _libraryRepository.GetAsync(libraryId);
        return library?.ToApiModel();
    }

    public async Task<LibraryUserModel?> DeleteLibraryUserAsync(int libraryUserId)
    {
        var libaryUser = await _libraryUserService.DeleteLibraryUserAsync(libraryUserId);

        return libaryUser;
    }

    public async Task<LibraryModel?> GetLibraryForUserAsync(int libraryId)
    {
        var library = await _libraryRepository.GetLibraryForUserIdAsync(libraryId, _userService.CurrentUserId);

        return library?.ToApiModel();
    }
    
}