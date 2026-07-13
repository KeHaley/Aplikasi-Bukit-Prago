using System;

namespace BPV4.Desktop;

public sealed class DesktopApplicationContext : ApplicationContext
{
    private readonly SplashForm splash;
    private readonly MainForm mainForm;

    public DesktopApplicationContext()
    {
        splash = new SplashForm();
        mainForm = new MainForm();

        mainForm.ApplicationReady += MainForm_ApplicationReady;
        mainForm.FormClosed += MainForm_FormClosed;

        splash.Show();

        _ = mainForm.InitializeAsync();
    }

    private void MainForm_ApplicationReady(object? sender, EventArgs e)
    {
        if (!splash.IsDisposed)
        {
            splash.Close();
            splash.Dispose();
        }

        mainForm.Show();
    }

    private void MainForm_FormClosed(object? sender, FormClosedEventArgs e)
    {
        ExitThread();
    }
}