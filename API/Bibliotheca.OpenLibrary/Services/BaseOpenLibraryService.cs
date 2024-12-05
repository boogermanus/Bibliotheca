using RestSharp;

namespace Bibliotheca.OpenLibrary.Services;

public abstract class BaseOpenLibraryService<TEntity> where TEntity : class
{
    private string _url { get; set; }
    protected string URL
    {
        get => _url;
        set
        {
            _url = value;
            var setup = SetupRestClient(_url);
            _restClientOptions = setup.Item1;
            _restClient = setup.Item2;
        }
    }
    private Dictionary<string, string> _headers { get; set; }
    private RestClientOptions _restClientOptions { get; set; }
    private RestClient _restClient { get; set; }

    protected BaseOpenLibraryService(string url = "https://openlibrary.org")
    {
        _url = url;

        _headers = new Dictionary<string, string>
        {
            {"User-Agent","Bibliotheca/1.0 (boogermanus@gmail.com)"}
        };

        var setup = SetupRestClient(_url);
        _restClientOptions = setup.Item1;
        _restClient = setup.Item2;
    }

    private Tuple<RestClientOptions, RestClient> SetupRestClient(string url)
    {
        _restClientOptions = new RestClientOptions(url);
        _restClient = new RestClient(_restClientOptions);
        return new Tuple<RestClientOptions, RestClient>(_restClientOptions, _restClient);
    }

    protected Task<TEntity?> GetAsync(string path)
    {
        var request = new RestRequest(path);

        _headers.Keys.ToList().ForEach(key => request.AddHeader(key, _headers[key]));

        var entity = _restClient.GetAsync<TEntity>(request);
        return entity;
    }
}