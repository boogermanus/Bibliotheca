using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Services;

public class AuthorOpenLibraryService : BaseOpenLibraryService<Author>
{
    public AuthorOpenLibraryService(string url) : base(url)
    {
    }

    public async Task<Author?> GetAuthorAsync(string author)
    {
        return await GetAsync($"{author}.json");
    }
}