using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Services;

public class IsbnOpenLibraryService : BaseOpenLibraryService<Book>
{
    public IsbnOpenLibraryService() : base()
    {
        Url = $"{Url}/isbn/";
    }

    public async Task<Book?> GetBookAsync(string isbn)
    {
        return await GetAsync($"{isbn}.json");
    }
}