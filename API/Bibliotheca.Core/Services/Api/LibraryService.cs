using System.Drawing;
using Bibliotheca.Core.ApiModels;
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
    private readonly ILibraryBookshelfService _libraryBookshelfService;
    private readonly IUserService _userService;

    public LibraryService(
        ILibraryRepository libraryRepository,
        ILibraryUserService libraryUserService,
        ILibraryBookshelfService libraryBookshelfService,
        IUserService userService
        )
    {
        _libraryRepository = libraryRepository;
        _libraryUserService = libraryUserService;
        _libraryBookshelfService = libraryBookshelfService;
        _userService = userService;
    }
    public async Task<LibraryModel> AddLibraryAsync(LibraryModel model)
    {
        var newLibrary = model.ToDomainModel();
        newLibrary = await _libraryRepository.AddAsync(newLibrary);

        var libraryUser = new LibraryUserModel
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
        var libraries = await _libraryRepository.GetLibrariesForUserAsync(_userService.CurrentUserId);
        return libraries.Select(l => l.ToApiModel()).ToList();
    }

    public async Task<IEnumerable<LibraryUserModel>> GetLibraryUsersAsync(int libraryId)
    {
        var libraryUsers = await _libraryUserService.GetLibraryUsersAsync(libraryId);

        return libraryUsers;
    }

    public async Task<LibraryUserModel> AddLibraryUserAsync(LibraryUserModel model)
    {
        var newLibraryUser = await _libraryUserService.AddLibraryUserAsync(model);
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
        var library = await _libraryRepository.GetLibraryForUserAsync(libraryId, _userService.CurrentUserId);

        return library?.ToApiModel();
    }

    public async Task<LibraryBookshelfModel> AddLibraryBookshelfAsync(LibraryBookshelfModel libraryBookshelf)
    {
        var newBookShelf = await _libraryBookshelfService.AddLibraryBookshelfAsync(libraryBookshelf);
        return newBookShelf;
    }

    public async Task<LibraryBookshelfModel?> DeleteLibraryBookshelfAsync(int bookshelfId)
    {
        var deletedBookshelf = await _libraryBookshelfService.DeleteLibraryBookshelfAsync(bookshelfId);
        return deletedBookshelf;
    }

    public async Task<IEnumerable<LibraryBookshelfModel>> GetBookshelvesForLibrary(int libraryId)
    {
        var bookshelves = await _libraryBookshelfService.GetLibraryBookshelvesAsync(libraryId);
        return bookshelves;
    }
}