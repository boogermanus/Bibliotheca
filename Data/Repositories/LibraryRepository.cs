using System.Collections.Generic;
using System.Threading.Tasks;
using Bibliotheca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Data.Repositories
{
    public class LibraryRepository : BaseRepository<Library, ApplicationDbContext>
    {
        public LibraryRepository(ApplicationDbContext context) : base(context) {}

        public async Task<List<Library>> GetLibrariesForUser(string userId)
        {
            return await GetAll();
        }
    }
}