using System.Text;
using System.Text.Json.Serialization;

namespace Bibliotheca.OpenLibrary.Models;

public class WorkWithDescKey : WorkBase
{
    public KeyValuePair<string, string> Description { get; set; }

    public override string ToString()
    {
        var builder = new StringBuilder();
        builder.AppendLine(Title);
        builder.AppendLine(Description.Value);
        builder.AppendLine(string.Join(',',Subjects));
        return builder.ToString();
    }
}