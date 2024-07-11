using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.ApiModels.Api;

public class LibraryUserModel
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public required int LibraryId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public IEnumerable<LibraryUserModel>? LibraryUsers { get; set; }
    public IEnumerable<LibraryBookshelfModel>? LibraryBookshelves { get; set; }

    public LibraryUser ToDomainModel()
    {
        return new LibraryUser
        {
            UserId = UserId,
            LibraryId = LibraryId,
        };
    }
}