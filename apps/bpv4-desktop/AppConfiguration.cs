using System.Text.Json;

namespace BPV4.Desktop;

public sealed class AppConfiguration
{
    public string Name { get; init; } = "Bukit Prago";
    public string Url { get; init; } = string.Empty;
    public int StartupTimeout { get; init; } = 30000;
    public int RetryInterval { get; init; } = 5000;

    public static AppConfiguration Load()
    {
        var fileName = Path.Combine(
            AppContext.BaseDirectory,
            "appsettings.json");

        if (!File.Exists(fileName))
        {
            throw new FileNotFoundException(
                $"Configuration file '{fileName}' was not found.");
        }

        using var stream = File.OpenRead(fileName);
        using var document = JsonDocument.Parse(stream);

        var application = document.RootElement.GetProperty("Application");

        return new AppConfiguration
        {
            Name = application.GetProperty("Name").GetString() ?? "Bukit Prago",
            Url = application.GetProperty("Url").GetString() ?? string.Empty,
            StartupTimeout = application.GetProperty("StartupTimeout").GetInt32(),
            RetryInterval = application.GetProperty("RetryInterval").GetInt32()
        };
    }
}