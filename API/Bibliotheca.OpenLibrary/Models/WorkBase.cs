namespace Bibliotheca.OpenLibrary.Models;

public class WorkBase
{
    public string Title { get; set; } = string.Empty;
    public List<string> Subjects { get; set; } = new();
}