using Bibliotheca.OpenLibrary.Models;

namespace Bibliotheca.OpenLibrary.Interfaces;

public interface IOpenLibraryService
{
    Task<OpenLibraryBook?> GetBookByIsbn(string isbn);
}