using Microsoft.Web.WebView2.WinForms;
using System.Drawing;

namespace BPV4.Desktop;

partial class MainForm
{
    private WebView2 webView = null!;

    private void InitializeComponent()
    {
        webView = new WebView2();

        SuspendLayout();

        webView.Dock = DockStyle.Fill;

        Controls.Add(webView);

        AutoScaleMode = AutoScaleMode.Font;

        ClientSize = new Size(1600, 900);

        Text = "Bukit Prago";


        WindowState = FormWindowState.Maximized;

        Shown += async (_, _) => await InitializeAsync();

        ResumeLayout(false);
    }
}