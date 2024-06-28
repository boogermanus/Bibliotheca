using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.ApiModels.Auth;

public class RegisterModel
{
    [Required]
    [EmailAddress]
    public string Username { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
    [Required]
    [DisplayName("Confirm Password")]
    [Compare(nameof(Password),ErrorMessage ="Passwords do not match")]
    public string ConfirmPassword { get; set; } = string.Empty;
    public string? Name { get; set; }

    public User ToDomainModel() 
    {
        return new User
        {
            UserName = Username,
            Name = Name ?? string.Empty,
            Email = Username
        };
    }

}