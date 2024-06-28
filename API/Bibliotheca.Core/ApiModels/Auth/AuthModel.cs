namespace Bibliotheca.Core.ApiModels.Auth;

public class AuthModel
{
    public string token { get; set; }

    public AuthModel(string token)
    {
        this.token = token;
    }
}