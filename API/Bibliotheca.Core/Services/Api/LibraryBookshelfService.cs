using Bibliotheca.Core.ApiModels;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;

namespace Bibliotheca.Core.Services.Api;

public class LibraryBookshelfService : ILibraryBookshelfService
{
    private readonly ILibraryBookshelfRepository _libraryBookshelfRepository;
    
    public LibraryBookshelfService(ILibraryBookshelfRepository libraryBookshelfRepository)
    {
        _libraryBookshelfRepository = libraryBookshelfRepository;
    }

    public async Task<LibraryBookshelfModel> AddLibraryBookshelfAsync(LibraryBookshelfModel model)
    {
        var found = await _libraryBookshelfRepository.GetBookshelfByNameAndLibraryAsync(model.Name, model.LibraryId);

        if(found != null && found.Name.ToLower() == model.Name.ToLower())
            throw new Exception("Bookshelf already exists in library.");

        var newBookshelf = await _libraryBookshelfRepository.AddAsync(model.ToDomainModel());

        return  newBookshelf.ToApiModel();
    }

    public async Task<LibraryBookshelfModel?> DeleteLibraryBookshelfAsync(int bookshelfId)
    {
        var deletedModel = await _libraryBookshelfRepository.DeleteAsync(bookshelfId);

        return deletedModel?.ToApiModel();
    }

    public async Task<IEnumerable<LibraryBookshelfModel>> GetLibraryBookshelvesAsync(int libraryId)
    {
        var bookshelves = await _libraryBookshelfRepository.GetBookshelvesByLibraryAsync(libraryId);

        return bookshelves.Select(lb => lb.ToApiModel()).ToList();
    }
}
