using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;
using Bibliotheca.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace Bibliotheca.Core.Services.Api;

public class LibraryUserService : ILibraryUserService
{
    private readonly UserManager<User> _userManager;
    private readonly ILibraryUserRepository _libraryUserRepository;

    public LibraryUserService(ILibraryUserRepository libraryUserRepository, UserManager<User> userManager)
    {
        _libraryUserRepository = libraryUserRepository;
        _userManager = userManager;
    }
    
    public async Task<LibraryUserModel> AddLibraryUserAsync(string username, int libraryId)
    {
        var existingUser = await _userManager.FindByNameAsync(username);

        if (existingUser == null)
            throw new Exception($"User {username} is not registered.");

        var existingLibraryUser = await _libraryUserRepository.GetLibraryUserByLibraryAndUserAsync(existingUser.Id, libraryId);

        if (existingLibraryUser != null)
            throw new Exception($"User {username} already exists in library.");

        var newLibraryUser = await _libraryUserRepository.AddAsync(new LibraryUser
        {
            UserId = existingUser.Id,
            LibraryId = libraryId
        });

        return newLibraryUser.ToApiModel();

    }

    public async Task<LibraryUserModel> AddLibraryUserAsync(LibraryUser libraryUser)
    {
        var newLibraryUser = await _libraryUserRepository.AddAsync(libraryUser);
        return newLibraryUser.ToApiModel();
    }

    public async Task<LibraryUserModel?> DeleteLibraryUserAsync(int libraryUserId)
    {
        var deletedLibraryUser = await _libraryUserRepository.DeleteAsync(libraryUserId);
        return deletedLibraryUser?.ToApiModel();
    }

    public async Task<IEnumerable<LibraryUserModel>> GetLibraryUsersAsync(int libraryId)
    {
        var libraryUsers = await _libraryUserRepository.GetLibraryUsersByLibraryIdAsync(libraryId);
        return libraryUsers.Select(lu => lu.ToApiModel());
    }
}