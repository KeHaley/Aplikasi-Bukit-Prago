#define MyAppName "Bukit Prago"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Bukit Prago"
#define MyAppExeName "BukitPrago.exe"

[Setup]
AppId={{A9BFEA5A-9E5F-4F2F-9A18-3E8B7A5D1F01}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}

DefaultDirName={autopf}\Bukit Prago
DefaultGroupName=Bukit Prago

OutputDir=Output
OutputBaseFilename=BukitPragoSetup

Compression=lzma
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin

SetupIconFile=D:\BPV4_MASTER\BPV4_Master\apps\bpv4-desktop\assets\BukitPrago.ico
UninstallDisplayIcon={app}\BukitPrago.exe

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Buat Shortcut Desktop"; GroupDescription: "Shortcut:"

[Files]
[Files]
Source: "D:\BPV4_MASTER\BPV4_Master\apps\bpv4-desktop\bin\Release\net8.0-windows\win-x64\publish\*"; \
    DestDir: "{app}"; \
    Flags: recursesubdirs createallsubdirs ignoreversion

[Icons]
Name: "{group}\Bukit Prago"; Filename: "{app}\BukitPrago.exe"

Name: "{autodesktop}\Bukit Prago"; Filename: "{app}\BukitPrago.exe"; Tasks: desktopicon

[Run]
Filename: "{app}\BukitPrago.exe"; Description: "Jalankan Bukit Prago"; Flags: nowait postinstall skipifsilent