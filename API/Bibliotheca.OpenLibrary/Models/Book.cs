namespace Bibliotheca.OpenLibrary.Models;

public class Book
{
    public string Title { get; set; } = string.Empty;
    public override string ToString()
    {
        return Title;
    }
}