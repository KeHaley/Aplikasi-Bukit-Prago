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
        var baseDirectory = AppContext.BaseDirectory;

        MessageBox.Show(
            $"Base Directory:\n\n{baseDirectory}",
            "Bukit Prago");

        var fileName = Path.Combine(
            baseDirectory,
            "appsettings.json");

        MessageBox.Show(
            $"Config File:\n\n{fileName}",
            "Bukit Prago");

        if (!File.Exists(fileName))
        {
            MessageBox.Show(
                "File tidak ditemukan:\n\n" + fileName,
                "Bukit Prago",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);

            throw new FileNotFoundException(
                $"File konfigurasi '{fileName}' tidak ditemukan.");
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