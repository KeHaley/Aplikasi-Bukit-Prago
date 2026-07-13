namespace BPV4.Desktop;

internal static class Program
{
    [STAThread]
    static void Main()
    {
        ApplicationConfiguration.Initialize();

        using (var splash = new SplashForm())
        {
            splash.Show();
            Application.DoEvents();

            Thread.Sleep(2000);
        }

        Application.Run(new MainForm());
    }
}