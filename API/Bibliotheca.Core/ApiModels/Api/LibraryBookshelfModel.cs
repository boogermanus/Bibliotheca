using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.ApiModels;

public class LibraryBookshelfModel
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required int NumberOfRows { get; set; }
    public required int LibraryId {get; set; }
    public LibraryBookshelf ToDomainModel()
    {
        return new LibraryBookshelf
        {
            Name = Name,
            NumberOfRows = NumberOfRows,
            LibraryId = LibraryId
        };
    }
}