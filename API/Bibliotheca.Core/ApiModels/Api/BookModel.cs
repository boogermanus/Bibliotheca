using System.ComponentModel.DataAnnotations;
using Bibliotheca.Core.Models;

namespace Bibliotheca.Core.ApiModels.Api;

public class BookModel
{
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
    public LibraryModel? Library { get; set; }
    public required int LibraryBookshelfId { get; set; }
    public required int Row { get; set; }
    public LibraryBookshelfModel? LibraryBookshelf { get; set; }

    public Book ToDomainModel()
    {
        return new Book
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
            Row = Row,
            LibraryBookshelfId = LibraryBookshelfId
        };
    }
}