using System.Drawing;
using System.Windows.Forms;

namespace BPV4.Desktop;

partial class SplashForm
{
    private Label lblTitle = null!;
    private Label lblVersion = null!;
    private Label lblStatus = null!;
    private ProgressBar progress = null!;
    private PictureBox logo = null!;

    private void InitializeComponent()
    {
        logo = new PictureBox();
        lblTitle = new Label();
        lblVersion = new Label();
        lblStatus = new Label();
        progress = new ProgressBar();

        SuspendLayout();

        //
        // Logo
        //
        logo.Dock = DockStyle.Top;
        logo.Height = 180;
        logo.SizeMode = PictureBoxSizeMode.Zoom;

        if (File.Exists("assets/BukitPrago.png"))
        {
            logo.Image = Image.FromFile("assets/BukitPrago.png");
        }

        //
        // Title
        //
        lblTitle.Dock = DockStyle.Top;
        lblTitle.Height = 50;
        lblTitle.Text = "Bukit Prago";
        lblTitle.Font = new Font("Segoe UI", 22, FontStyle.Bold);
        lblTitle.TextAlign = ContentAlignment.MiddleCenter;

        //
        // Version
        //
        lblVersion.Dock = DockStyle.Top;
        lblVersion.Height = 30;
        lblVersion.Text = "Version 1.0";
        lblVersion.TextAlign = ContentAlignment.MiddleCenter;

        //
        // Status
        //
        lblStatus.Dock = DockStyle.Fill;
        lblStatus.Text = "Memulai aplikasi...";
        lblStatus.Font = new Font("Segoe UI", 10);
        lblStatus.TextAlign = ContentAlignment.TopCenter;

        //
        // Progress
        //
        progress.Dock = DockStyle.Bottom;
        progress.Style = ProgressBarStyle.Marquee;
        progress.MarqueeAnimationSpeed = 40;
        progress.Height = 8;

        //
        // Form
        //
        ClientSize = new Size(500, 320);

        Controls.Add(progress);
        Controls.Add(lblStatus);
        Controls.Add(lblVersion);
        Controls.Add(lblTitle);
        Controls.Add(logo);

        FormBorderStyle = FormBorderStyle.None;
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.White;
        ShowInTaskbar = false;

        ResumeLayout(false);
    }
}