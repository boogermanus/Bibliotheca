using Bibliotheca.Data.Repositories;
using Bibliotheca.Models;
using Microsoft.AspNetCore.Mvc;
// learn to use this logging stuff
// using Microsoft.Extensions.Logging;

namespace Bibliotheca.Controllers
{
    [Route("api/[controller]")]
    public class LibraryController : BaseController<Library, LibraryRepository>
    {
        public LibraryController(LibraryRepository repository) : base(repository) {}
    }

}