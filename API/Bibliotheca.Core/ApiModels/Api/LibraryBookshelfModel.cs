using Bibliotheca.Core.ApiModels.Api;

namespace Bibliotheca.Core.ApiModels;

public class LibraryBookshelfModel
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int NumberOfRows { get; set; }
}