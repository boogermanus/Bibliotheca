using System.Collections.Generic;
using System.Threading.Tasks;
using Bibliotheca.Data;
using Bibliotheca.Data.Repositories;
using Bibliotheca.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
// learn to use this logging stuff
// using Microsoft.Extensions.Logging;

namespace Bibliotheca.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationUserController
    {
        private ApplicationDbContext _context { get; set; }
        
        public ApplicationUserController(ApplicationDbContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ApplicationUser> Get([FromQuery]string userName)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName.Contains(userName));
        }

        [HttpGet("usersforlibrary/{library}")]
        public async Task<List<ApplicationUser>> GetUsersForLibrary([FromRoute]int library)
        {
            return await _context.Users
                .Join(_context.UserLibraries, 
                    applicationUser => applicationUser.Id,
                    userLibrary => userLibrary.userId,
                    (applicationUser, userLibrary) => applicationUser)
                .ToListAsync();

            // this returns the exact same thing as the code above
            // but it is much easier to read.                    
            // return await _context.UserLibraries
            //     .Where(ul => ul.LibraryId == library)
            //     .Select(ul => ul.User)
            //     .ToListAsync();
        }
    }

}