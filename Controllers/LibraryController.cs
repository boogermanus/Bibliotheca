using System.Collections.Generic;
using System.Threading.Tasks;
using Bibliotheca.Data.Repositories;
using Bibliotheca.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
// learn to use this logging stuff
// using Microsoft.Extensions.Logging;

namespace Bibliotheca.Controllers
{
    [Route("api/[controller]")]
    public class LibraryController : BaseController<Library, LibraryRepository>
    {
        public LibraryController(LibraryRepository repository, ILogger<LibraryController> logger) 
            : base(repository, logger) {}

        [Route("getlibrariesforuser")]
        [HttpPost]
        public async Task<List<Library>> GetLibrariesForUser([FromBody]string userId)
        {
            return await Repository.GetLibrariesForUser(userId);   
        }
    }

}