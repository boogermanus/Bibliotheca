namespace Bibliotheca.OpenLibrary.Models;

public class Work 
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Subjects { get; set; } = new List<string>();
}