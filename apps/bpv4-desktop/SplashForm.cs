namespace BPV4.Desktop;

public partial class SplashForm : Form
{
    public SplashForm()
    {
        InitializeComponent();

        DoubleBuffered = true;

        UpdateStatus("Memulai aplikasi...");
    }

    public void UpdateStatus(string message)
    {
        if (InvokeRequired)
        {
            Invoke(() => UpdateStatus(message));
            return;
        }

        lblStatus.Text = message;

        lblStatus.Refresh();
    }
}