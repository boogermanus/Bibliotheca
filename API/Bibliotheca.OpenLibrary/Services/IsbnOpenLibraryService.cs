using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Services;

public class IsbnOpenLibraryService : BaseOpenLibraryService<Book>
{
    public IsbnOpenLibraryService() : base()
    {
        URL = $"{URL}/isbn/";
    }

    public async Task<Book?> GetBookAsync(string isdn)
    {
        return await GetAsync($"{isdn}.json");
    }
}