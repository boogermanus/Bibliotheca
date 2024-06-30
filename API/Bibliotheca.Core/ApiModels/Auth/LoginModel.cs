using System.ComponentModel.DataAnnotations;

namespace Bibliotheca.Core.ApiModels.Auth;

public class LoginModel
{
    [Required]
    [EmailAddress]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}