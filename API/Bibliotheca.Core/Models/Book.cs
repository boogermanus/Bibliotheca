using System.ComponentModel.DataAnnotations;
using Bibliotheca.Core.Interfaces.Database;

namespace Bibliotheca.Core.Models;

public class Book : IEntity
{
    public int Id { get; set; }
    [MaxLength(200)]
    public required string Title { get; set; }
    [MaxLength(200)]
    public required string Author { get; set; }
    [MaxLength(100)]
    public required string Subject { get; set; }
    [MaxLength(100)]
    public required string Format { get; set; }
    public required string Isbn13 { get; set; }
    public required string Isbn10 { get; set; }
    public required int NumberOfPages { get; set; }
    public required DateTime PublishDate { get; set; }
    public required int LibraryId { get; set; }
    public Library? Library { get; set; }
    public required int LibraryBookshelfId { get; set; }
    public LibraryBookshelf? LibraryBookshelf { get; set; }

}
