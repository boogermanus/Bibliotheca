using Microsoft.AspNetCore.Identity;

namespace Bibliotheca.Core.Models;

public class User : IdentityUser 
{
    public string Name { get; set; } = string.Empty;
}