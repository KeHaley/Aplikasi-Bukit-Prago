using System.Diagnostics;
using System.Text;

namespace BPV4.Desktop;

internal static class Program
{
    [STAThread]
    static void Main()
    {
        ApplicationConfiguration.Initialize();

        Directory.CreateDirectory("logs");

        Application.SetUnhandledExceptionMode(UnhandledExceptionMode.CatchException);

        Application.ThreadException += (_, e) =>
        {
            WriteLog("UI", e.Exception);
            MessageBox.Show(
                "Terjadi kesalahan pada aplikasi.\nSilakan lihat folder logs.",
                "Bukit Prago",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
        };

        AppDomain.CurrentDomain.UnhandledException += (_, e) =>
        {
            if (e.ExceptionObject is Exception ex)
            {
                WriteLog("APP", ex);
            }
        };

        try
        {
            Application.Run(new DesktopApplicationContext());
        }
        catch (Exception ex)
        {
            WriteLog("STARTUP", ex);

            MessageBox.Show(
                ex.Message,
                "Bukit Prago",
                MessageBoxButtons.OK,
                MessageBoxIcon.Error);
        }
    }

    private static void WriteLog(string source, Exception ex)
    {
        try
        {
            var file = Path.Combine(
                "logs",
                $"log-{DateTime.Now:yyyyMMdd}.txt");

            var sb = new StringBuilder();

            sb.AppendLine("========================================");
            sb.AppendLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            sb.AppendLine($"Source : {source}");
            sb.AppendLine(ex.ToString());
            sb.AppendLine();

            File.AppendAllText(file, sb.ToString());
        }
        catch
        {
            Debug.WriteLine(ex);
        }
    }
}