using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Infrastrcture.Repositories;

public class LibraryUserRepository : BaseRepository<LibraryUser>, ILibraryUserRepository
{
    public LibraryUserRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<LibraryUser>> GetLibraryUsersByLibraryIdAsync(int libraryId)
    {
        return await Entities
            .Include(e => e.User)
            .Where(query => query.LibraryId == libraryId)
            .ToListAsync();
    }

    public async Task<LibraryUser> AddLibraryUserAsync(string username, int libraryId)
    {
        var existingUser = await DbContext.Users.FirstOrDefaultAsync(u => u.UserName == username);

        if (existingUser == null)
            throw new Exception($"User {username} is not registered.");

        var existingLibraryUser = 
            await Entities.FirstOrDefaultAsync(lu => lu.UserId == existingUser.Id && lu.LibraryId == libraryId);

        if(existingLibraryUser != null)
            throw new Exception($"User {username} already exists in library.");

        var newLibraryUser = new LibraryUser
        {
            LibraryId = libraryId,
            UserId = existingUser.Id
        };

        newLibraryUser = await AddAsync(newLibraryUser);

        return newLibraryUser;
    }
}