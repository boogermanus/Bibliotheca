using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.ApiModels.Api;

public class LibraryUserModel
{
    public int Id { get; set; }
    public required string UserId { get; set; }
    public required int LibraryId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public LibraryUser ToDomainModel()
    {
        return new LibraryUser
        {
            UserId = UserId,
            LibraryId = LibraryId,
        };
    }
}