using System.Text;

namespace Bibliotheca.OpenLibrary.Models;

public class Work 
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Subjects { get; set; } = new List<string>();
    public override string ToString()
    {
        var builder = new StringBuilder();
        builder.AppendLine(Title);
        builder.AppendLine(Description);
        builder.AppendLine(string.Join(',',Subjects));
        return builder.ToString();
    }
}