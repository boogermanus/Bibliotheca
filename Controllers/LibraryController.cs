using Bibliotheca.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Bibliotheca.Controllers
{
    [Route("[controller]")]
    public class LibraryController : Controller
    {
        private ApplicationDbContext _context;

        public LibraryController(ApplicationDbContext context)
        {
            _context = context;
        }
    }

}