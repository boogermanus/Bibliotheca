using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Services;

public class IsbnOpenLibraryService : BaseOpenLibraryService<Book>
{
    public IsbnOpenLibraryService(string url) : base(url)
    {

    }

    public async Task<Book?> GetBook(string isdn)
    {
        return await GetAsync($"{isdn}.json");
    }
}