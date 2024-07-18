using System.ComponentModel.DataAnnotations;
using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.ApiModels.Api;

public class LibraryModel
{
    public int? Id { get; set; }
    [MaxLength(50)]
    public string Name {get; set;} = string.Empty;
    public DateTime? CreateDate { get; set; }
    public IEnumerable<LibraryUserModel>? LibraryUsers { get; set; }
    public IEnumerable<LibraryBookshelfModel>? LibraryBookshelves { get; set; }
    public int BookCount { get; set; }

    public Library ToDomainModel()
    {
        return new Library
        {
            Name = Name,
            CreateDate = CreateDate ?? DateTime.UtcNow
        };

    }
}