namespace Bibliotheca.OpenLibrary.Models;

public class OpenLibraryBook
{
    public string Title { get; set; } = string.Empty;
    public string[] Authors { get; set; } = [];
    public DateTime PublishDate { get; set; }
    public string Isbn10 { get; set; } = string.Empty;
    public string Isbn13 { get; set; } = string.Empty;
    public string NumberOfPages { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Subjects { get; set; } = [];
}