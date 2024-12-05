namespace Bibliotheca.OpenLibrary.Models;

public class OpenLibraryBook
{
    public string Title { get; set; } = string.Empty;
    public string[] Authors { get; set; } = [];
    public DateTime PublishDate { get; set; }
    public string Isbn10 { get; set; } = string.Empty;
    public string Isbn13 { get; set; } = string.Empty;
    public int NumberOfPages { get; set; }
    public string Description { get; set; } = string.Empty;
    public string[] Subjects { get; set; } = [];

    public OpenLibraryBook(Book book, Author[] authors, Work work)
    {
        Title = book.Title;
        Authors = authors.Select(a => a.Name).ToArray();
        PublishDate = book.PublishDate;
        Isbn10 = book.Isbn_10.First();
        Isbn13 = book.Isbn_13.First();
        NumberOfPages = book.Number_of_Pages;
        Description = work.Description;
        Subjects = work.Subjects.ToArray();
    }
}