using System.Net;
using System.Net.Http;

namespace BPV4.Desktop;

public sealed class ApplicationHealthService
{
    private readonly HttpClient httpClient;

    public ApplicationHealthService()
    {
        httpClient = new HttpClient();
    }

    public async Task<ApplicationHealthResult> CheckAsync(
        string url,
        int timeoutMilliseconds,
        CancellationToken cancellationToken = default)
    {
        try
        {
            using var timeout =
                CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);

            timeout.CancelAfter(timeoutMilliseconds);

            using var response = await httpClient.GetAsync(
                url,
                HttpCompletionOption.ResponseHeadersRead,
                timeout.Token);

            if (response.IsSuccessStatusCode)
            {
                return new ApplicationHealthResult(
                    true,
                    $"Application reachable ({(int)response.StatusCode} {response.StatusCode}).");
            }

            return new ApplicationHealthResult(
                false,
                $"Server returned {(int)response.StatusCode} {response.StatusCode}.");
        }
        catch (OperationCanceledException)
        {
            return new ApplicationHealthResult(
                false,
                "Connection timeout.");
        }
        catch (HttpRequestException ex)
        {
            return new ApplicationHealthResult(
                false,
                ex.Message);
        }
        catch (Exception ex)
        {
            return new ApplicationHealthResult(
                false,
                ex.Message);
        }
    }
}

public sealed class ApplicationHealthResult
{
    public bool IsHealthy { get; }

    public string Message { get; }

    public ApplicationHealthResult(
        bool isHealthy,
        string message)
    {
        IsHealthy = isHealthy;
        Message = message;
    }
}