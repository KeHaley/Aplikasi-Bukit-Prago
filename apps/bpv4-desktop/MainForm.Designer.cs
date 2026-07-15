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

        //
        // WebView
        //
        webView.Dock = DockStyle.Fill;

        //
        // Form
        //
        AutoScaleMode = AutoScaleMode.Font;

        ClientSize = new Size(1600, 900);

        Text = "Bukit Prago";

        WindowState = FormWindowState.Maximized;

        Controls.Add(webView);

        ResumeLayout(false);
    }
}