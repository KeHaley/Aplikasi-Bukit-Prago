using Microsoft.Web.WebView2.WinForms;
using System.Drawing;

namespace BPV4.Desktop;

partial class MainForm
{
    private MenuStrip menuStrip = null!;
    private ToolStripMenuItem menuApplication = null!;
    private ToolStripMenuItem menuSettings = null!;
    private ToolStripMenuItem menuAbout = null!;

    private WebView2 webView = null!;

    private void InitializeComponent()
    {
        menuStrip = new MenuStrip();
        menuApplication = new ToolStripMenuItem();
        menuSettings = new ToolStripMenuItem();
        menuAbout = new ToolStripMenuItem();

        webView = new WebView2();

        SuspendLayout();

        //
        // MenuStrip
        //
        menuApplication.Text = "&Application";

        menuSettings.Text = "&Settings...";
        menuSettings.Click += MenuSettings_Click;

        menuAbout.Text = "&About";
        menuAbout.Click += MenuAbout_Click;

        menuApplication.DropDownItems.Add(menuSettings);
        menuApplication.DropDownItems.Add(new ToolStripSeparator());
        menuApplication.DropDownItems.Add(menuAbout);

        menuStrip.Items.Add(menuApplication);
        menuStrip.Dock = DockStyle.Top;

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

        MainMenuStrip = menuStrip;

        Controls.Add(webView);
        Controls.Add(menuStrip);

        ResumeLayout(false);
        PerformLayout();
    }
}