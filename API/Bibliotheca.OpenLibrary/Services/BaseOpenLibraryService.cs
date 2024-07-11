using RestSharp;

namespace Bibliotheca.OpenLibrary.Services;

public abstract class BaseOpenLibraryService<TEntity> where TEntity : class
{
    private string _url { get; set; }
    private Dictionary<string, string> _headers { get; set; }
    private RestClientOptions _restClientOptions { get; set; }
    private RestClient _restClient { get; set; }

    protected BaseOpenLibraryService(string url)
    {
        _url = url;

        _headers = new Dictionary<string, string>
        {
            {"User-Agent","Bibliotheca/1.0 (boogermanus@gmail.com)"}
        };

        _restClientOptions = new RestClientOptions(url);
        _restClient = new RestClient(_restClientOptions);
    }

    protected Task<TEntity?> GetAsync(string path)
    {
        var request = new RestRequest(path);

        _headers.Keys.ToList().ForEach(key => request.AddHeader(key,_headers[key]));

        return _restClient.GetAsync<TEntity>(request);
    }
}