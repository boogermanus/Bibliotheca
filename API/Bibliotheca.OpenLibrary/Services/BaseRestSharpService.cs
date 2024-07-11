using Bibliotheca.OpenLibrary.Interfaces;
using RestSharp;

namespace Bibliotheca.OpenLibrary.Services;

public abstract class BaseRestSharpService : IRestSharpService
{
    public async Task<TEntity?> GetAsync<TEntity>(
        string url,
        string path,
        Dictionary<string, string>? parameters = null,
        Dictionary<string, string>? headers = null
    )
    {
        var options = new RestClientOptions(url);
        var client = new RestClient(options);
        var request = new RestRequest(path);

        if (parameters != null)
            request = AddParameters(request, parameters);

        if (headers != null)
            request = AddHeaders(request, headers);

        return await client.GetAsync<TEntity>(request);
    }

    private RestRequest AddParameters(RestRequest request, Dictionary<string, string> parameters)
    {
        parameters.Keys.ToList().ForEach(key => request.AddQueryParameter(key, parameters[key]));

        return request;
    }

    private RestRequest AddHeaders(RestRequest request, Dictionary<string, string> headers)
    {
        headers.Keys.ToList().ForEach(key => request.AddHeader(key, headers[key]));

        return request;
    }
}