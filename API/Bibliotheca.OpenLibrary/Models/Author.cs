namespace Bibliotheca.OpenLibrary.Models;

public class Author
{
    public string Name { get; set; } = string.Empty;

    public override string ToString()
    {
        return $"Author {Name}";
    }
}