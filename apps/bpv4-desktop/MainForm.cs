using Microsoft.Web.WebView2.WinForms;

namespace BPV4.Desktop;

public partial class MainForm : Form
{
    public MainForm()
    {
        InitializeComponent();
    }

    private async void MainForm_Load(
        object? sender,
        EventArgs e)
    {
        await webView.EnsureCoreWebView2Async();

        webView.Source = new Uri(
            "https://script.google.com/macros/s/AKfycbwkb8DYqH6nQ_8-_b29mFeK1K5z2FEBb95KPp8aBE2yVb4UAOMC_fShxzAW7OApNV7q/exec");
    }
}