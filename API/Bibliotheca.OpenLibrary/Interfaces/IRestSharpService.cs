namespace Bibliotheca.OpenLibrary.Interfaces;

public interface IRestSharpService
{
    Task<TEntity> GetAsync<TEntity>(
        string url,
        string path,
        Dictionary<string, string>? parameters = null,
        Dictionary<string, string>? headers = null
    );

}