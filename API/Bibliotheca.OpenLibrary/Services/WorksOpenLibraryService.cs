using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Services;

public class WorksOpenLibraryService: BaseOpenLibraryService<Work>
{
    public async Task<Work?> GetWorkAsync(string work)
    {
        return await GetAsync(work);
    }
}