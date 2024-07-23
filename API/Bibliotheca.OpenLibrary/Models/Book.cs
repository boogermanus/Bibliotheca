using System.Text;

namespace Bibliotheca.OpenLibrary.Models;

public class Book
{
    public string Title { get; set; } = string.Empty;
    public List<Author> Authors { get; set; } = null;
    public List<Work> Works { get; set; } = null;
    public string Publish_Date { get; set; }
    public List<string> Isbn_10 { get; set; } = null;
    public List<string> Isbn_13 { get; set; } = null;
    public DateTime PublishDate 
    {
        get => DateTime.Parse(Publish_Date);
    }
    public override string ToString()
    {
        var builder = new StringBuilder();
        builder.AppendLine($"Title {Title}");
        Authors.ForEach(a => builder.AppendLine(a.Key));
        Works.ForEach(a => builder.AppendLine(a.Key));
        builder.AppendLine($"{PublishDate}");
        Isbn_10.ForEach(isbn => builder.AppendLine(isbn));
        Isbn_13.ForEach(isbn => builder.AppendLine(isbn));
        return builder.ToString();
    }
}