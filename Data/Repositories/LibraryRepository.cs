using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bibliotheca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Data.Repositories
{
    public class LibraryRepository : BaseRepository<Library, ApplicationDbContext>
    {
        public LibraryRepository(ApplicationDbContext context) : base(context) { }

        public async Task<List<Library>> GetLibrariesForUser(string userId)
        {            
            return await _context.UserLibraries
                .Include(ul => ul.Library)
                .Where(ul => ul.userId == userId)
                .Select(ul => ul.Library)
                .ToListAsync();
        }

        public async Task<UserLibrary> AddUserLibrary(int libraryId, string userId)
        {
            var userLibrary = new UserLibrary
            {
                LibraryId = libraryId,
                userId = userId
            };

            _context.Add<UserLibrary>(userLibrary);
            await _context.SaveChangesAsync();

            return userLibrary;
        }

        public async Task<Library> GetLibraryFull(int libraryId)
        {
            return await _context.Libraries
                .Where(l => l.Id == libraryId)
                .Include(l => l.UserLibraries)
                .ThenInclude(l => l.User)
                .FirstOrDefaultAsync();
        }
    }
}