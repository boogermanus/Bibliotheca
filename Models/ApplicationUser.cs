using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
namespace Bibliotheca.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<UserLibrary> UserLibraries { get; set; }
    }
}
