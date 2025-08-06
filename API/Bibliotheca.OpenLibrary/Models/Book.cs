using System.Text;

namespace Bibliotheca.OpenLibrary.Models;

public class Book
{
    public string Title { get; set; } = string.Empty;
    public List<AuthorKey> Authors { get; set; } = new List<AuthorKey>();
    public List<WorkKey> Works { get; set; } = new List<WorkKey>();
    public string Publish_Date { get; set; } = string.Empty;
    public List<string> Isbn_10 { get; set; } = new List<string>();
    public List<string> Isbn_13 { get; set; } = new List<string>();
    public int Number_of_Pages { get; set; }
    public string[] Subjects { get; set; } = [];
    public DateTime PublishDate
    {
        get
        {
            try
            {
                return DateTime.Parse(Publish_Date);
            }
            catch
            {
                // some books only return a year
                return new DateTime(int.Parse(Publish_Date), 1, 1);
            }
        }
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
        builder.AppendLine(Number_of_Pages.ToString());
        return builder.ToString();
    }

    public bool IsEmpty()
    {
        return string.IsNullOrEmpty(Title);
    }
}