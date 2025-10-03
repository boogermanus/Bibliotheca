using System.Globalization;
using System.Text;

namespace Bibliotheca.OpenLibrary.Models;

public class OpenLibraryBook
{
    public string Title { get; set; }
    public string[] Authors { get; set; }
    public string Author => string.Join(", ", Authors);
    public DateTime PublishDate { get; set; }
    public string Isbn10 { get; set; }
    public string Isbn13 { get; set; }
    public int NumberOfPages { get; set; }
    public string Description { get; set; }
    public string[] Subjects { get; set; }

    public OpenLibraryBook(Book book, Author[] authors, Work work)
    {
        Title = book.Title;
        Authors = authors.Select(a => a.Name).ToArray();
        PublishDate = book.PublishDate;
        Isbn10 = book.Isbn_10.FirstOrDefault() ?? string.Empty;
        Isbn13 = book.Isbn_13.FirstOrDefault() ?? string.Empty;
        NumberOfPages = book.Number_of_Pages;
        Description = work.Description ?? string.Empty;
        Subjects = work.Subjects.Any() ? work.Subjects.ToArray() : book.Subjects;
    }

    public OpenLibraryBook(Book book, Author[] authors, WorkWithDescKey workWithDescKey)
    {
        Title = book.Title;
        Authors = authors.Select(a => a.Name).ToArray();
        PublishDate = book.PublishDate;
        Isbn10 = book.Isbn_10.FirstOrDefault() ?? string.Empty;
        Isbn13 = book.Isbn_13.FirstOrDefault() ?? string.Empty;
        NumberOfPages = book.Number_of_Pages;
        Description = workWithDescKey.Description.Value;
        Subjects = workWithDescKey.Subjects.Any() ? workWithDescKey.Subjects.ToArray() : book.Subjects;
    }

    public override string ToString()
    {
        return new StringBuilder()
            .AppendLine(Title)
            .AppendLine(string.Join(", ", Authors))
            .AppendLine(PublishDate.ToString(CultureInfo.InvariantCulture))
            .AppendLine(Isbn10)
            .AppendLine(Isbn13)
            .AppendLine(NumberOfPages.ToString())
            .AppendLine(Description)
            .AppendLine(string.Join(", ", Subjects))
            .ToString();
    }
}