using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bibliotheca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Data.Repositories
{
    public class UserLibraryRepository : BaseRepository<UserLibrary, ApplicationDbContext>
    {
        public UserLibraryRepository(ApplicationDbContext context) : base(context) { }
    }
}