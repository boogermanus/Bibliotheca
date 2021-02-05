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
        private UserLibraryRepository _userLibraryRepository { get; set; }
        public LibraryController(LibraryRepository repository,
                                 ILogger<LibraryController> logger,
                                 UserLibraryRepository userLibraryRepository)
            : base(repository, logger) { 
                _userLibraryRepository = userLibraryRepository;
            }

        [Route("getlibrariesforuser")]
        [HttpPost]
        public async Task<List<Library>> GetLibrariesForUser([FromBody] string userId)
        {
            var currentUser = UserId ?? userId;
            return await Repository.GetLibrariesForUser(currentUser);
        }

        [HttpPost]
        public override async Task<Library> Post([FromBody] Library library)
        {
            library.UserId = UserId ?? library.UserId;
            var newLibrary = await base.Post(library);
            await _userLibraryRepository.Add(new UserLibrary {LibraryId = library.Id, userId = library.UserId});
            return newLibrary;
        }

        public override async Task<ActionResult<Library>> Get(int id)
        {

            return await Repository.GetLibraryFull(id);
        }
    }

}