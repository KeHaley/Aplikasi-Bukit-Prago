using Microsoft.Web.WebView2.Core;
using System.Net.NetworkInformation;

namespace BPV4.Desktop;

public partial class MainForm : Form
{
    private readonly AppConfiguration config = AppConfiguration.Load();

    private readonly System.Windows.Forms.Timer retryTimer = new();
    private readonly System.Windows.Forms.Timer startupTimeout = new();

    private bool applicationReady;

    public event EventHandler? ApplicationReady;

    public MainForm()
    {
        InitializeComponent();

        ShowInTaskbar = true;
        Opacity = 0;

        retryTimer.Interval = config.RetryInterval;
        retryTimer.Tick += RetryTimer_Tick;

        startupTimeout.Interval = config.StartupTimeout;
        startupTimeout.Tick += StartupTimeout_Tick;
    }

    public async Task InitializeAsync()
    {
        try
        {
            startupTimeout.Start();

            if (!NetworkInterface.GetIsNetworkAvailable())
            {
                ShowOfflineMessage();
                retryTimer.Start();
                return;
            }

            await webView.EnsureCoreWebView2Async();

            webView.CoreWebView2.NavigationCompleted -= OnNavigationCompleted;
            webView.CoreWebView2.ProcessFailed -= OnProcessFailed;

            webView.CoreWebView2.NavigationCompleted += OnNavigationCompleted;
            webView.CoreWebView2.ProcessFailed += OnProcessFailed;

            webView.Source = new Uri(config.Url);
        }
        catch (Exception ex)
        {
            startupTimeout.Stop();

            MessageBox.Show(
                ex.Message,
                config.Name,
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);

            Close();
        }
    }

    private async void RetryTimer_Tick(object? sender, EventArgs e)
    {
        if (!NetworkInterface.GetIsNetworkAvailable())
            return;

        retryTimer.Stop();

        await InitializeAsync();
    }

    private void StartupTimeout_Tick(object? sender, EventArgs e)
    {
        startupTimeout.Stop();

        if (applicationReady)
            return;

        ShowOfflineMessage();

        retryTimer.Start();
    }

    private void OnNavigationCompleted(
        object? sender,
        CoreWebView2NavigationCompletedEventArgs e)
    {
        if (!e.IsSuccess)
        {
            ShowOfflineMessage();
            retryTimer.Start();
            return;
        }

        applicationReady = true;

        startupTimeout.Stop();

        Opacity = 1;

        ApplicationReady?.Invoke(this, EventArgs.Empty);
    }

    private void OnProcessFailed(
        object? sender,
        CoreWebView2ProcessFailedEventArgs e)
    {
        startupTimeout.Stop();

        retryTimer.Start();

        MessageBox.Show(
            "WebView2 mengalami gangguan.\nAplikasi akan mencoba kembali otomatis.",
            config.Name,
            MessageBoxButtons.OK,
            MessageBoxIcon.Warning);
    }

    private void ShowOfflineMessage()
    {
        MessageBox.Show(
            "Koneksi internet tidak tersedia.\nAplikasi akan mencoba kembali otomatis.",
            config.Name,
            MessageBoxButtons.OK,
            MessageBoxIcon.Information);
    }

    protected override void OnFormClosed(FormClosedEventArgs e)
    {
        startupTimeout.Stop();
        retryTimer.Stop();

        startupTimeout.Dispose();
        retryTimer.Dispose();

        base.OnFormClosed(e);
    }
}