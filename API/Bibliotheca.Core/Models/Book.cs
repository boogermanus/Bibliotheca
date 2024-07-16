using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Database;

namespace Bibliotheca.Core.Models;

public class Book : IEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    [MaxLength(300)]
    public required string Title { get; set; }
    [MaxLength(300)]
    public required string Author { get; set; }
    [MaxLength(100)]
    public required string Subject { get; set; }
    [MaxLength(100)]
    public required string Format { get; set; }
    [MaxLength(13)]
    public string Isbn13 { get; set; } = string.Empty;
    [MaxLength(10)]
    public string Isbn10 { get; set; } = string.Empty;
    public required int NumberOfPages { get; set; }
    public required DateTime PublishDate { get; set; }
    public string Description { get; set; } = string.Empty;
    public required int LibraryId { get; set; }
    public Library? Library { get; set; }
    public required int LibraryBookshelfId { get; set; }
    public required int Row { get; set; }
    public LibraryBookshelf? LibraryBookshelf { get; set; }

    public BookModel ToApiModel()
    {
        return new BookModel
        {
            Id = Id,
            Title = Title,
            Author = Author,
            Subject = Subject,
            Format = Format,
            Isbn13 = Isbn13,
            Isbn10 = Isbn10,
            NumberOfPages = NumberOfPages,
            PublishDate = PublishDate,
            Description = Description,
            LibraryId = LibraryId,
            Library = Library?.ToApiModel(),
            Row = Row,
            LibraryBookshelfId = LibraryBookshelfId,
            LibraryBookshelf = LibraryBookshelf?.ToApiModel()
        };
    }

}
