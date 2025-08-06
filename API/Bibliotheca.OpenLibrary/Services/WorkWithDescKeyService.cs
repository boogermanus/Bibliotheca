using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Services;

public class WorkWithDescKeyService : BaseOpenLibraryService<WorkWithDescKey>
{
    public async Task<WorkWithDescKey?> GetWorkAsync(string work)
    {
        return await GetAsync($"{work}.json");
    }
}
