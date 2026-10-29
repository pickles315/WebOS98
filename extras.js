// Extra WebOS 98 system files, maintenance tools, and apps.
const webos98SampleFiles = {
  "README.TXT": "Microsoft Windows 98\nSystem directory\n\nThis folder contains configuration files, drivers, libraries, and system utilities used by a Windows 98-style installation.\n\nWebOS 98 recreates the look and feel of the classic desktop.",
  "WIN.INI": "; Windows initialization file\n[windows]\nload=\nrun=\nNullPort=None\n\n[Desktop]\nWallpaper=\nTileWallpaper=0\n\n[Extensions]\n",
  "SYSTEM.INI": "; System configuration\n[boot]\nsystem.drv=system.drv\nお\n[user]\nprofile=\n\n[386Enh]\ndevice=*vshare\n\n[drivers]\nwave=mmsystem.dll\n",
  "WINVER.EXE": "Windows Version Information\nFile: WINVER.EXE\nVersion: 4.10.1998\nDescription: Displays Windows version information.",
  "EXPLORER.EXE": "Windows Explorer\nFile: EXPLORER.EXE\nVersion: 4.10.1998\nDescription: Desktop shell and file manager.",
  "NOTEPAD.EXE": "Notepad\nFile: NOTEPAD.EXE\nDescription: Plain-text editor.",
  "REGEDIT.EXE": "Registry Editor\nFile: REGEDIT.EXE\nDescription: Registry configuration utility.",
  "SCANREGW.EXE": "Registry Checker\nFile: SCANREGW.EXE\nDescription: Registry backup and checking utility.",
  "SFC.EXE": "System File Checker\nFile: SFC.EXE\nDescription: Checks protected system files.",
  "TASKMAN.EXE": "Task Manager\nFile: TASKMAN.EXE\nDescription: Shows running tasks.",
  "RUNDLL32.EXE": "Run DLL utility\nFile: RUNDLL32.EXE\nDescription: Loads a Windows library entry point.",
  "COMMAND.COM": "Microsoft(R) Windows 98 Command Processor\nVersion 4.10.1998",
  "AUTOEXEC.BAT": "@ECHO OFF\nPROMPT $P$G\nSET PATH=C:\\WINDOWS;C:\\WINDOWS\\COMMAND\nSET TEMP=C:\\WINDOWS\\TEMP",
  "CONFIG.SYS": "DEVICE=C:\\WINDOWS\\HIMEM.SYS\nDOS=HIGH,UMB\nFILES=30\nBUFFERS=30",
  "SYSTEM.DRV": "Windows system driver\nFile: SYSTEM.DRV\nType: virtual system component",
  "GDI.EXE": "Graphics Device Interface\nFile: GDI.EXE\nDescription: Windows graphics subsystem component.",
  "USER.EXE": "User Interface Library\nFile: USER.EXE\nDescription: Windows user interface component.",
  "KERNEL32.DLL": "Windows Kernel Library\nFile: KERNEL32.DLL\nDescription: Core system services.",
  "GDI32.DLL": "Graphics Device Interface Library\nFile: GDI32.DLL\nDescription: Graphics functions.",
  "USER32.DLL": "Windows User Interface Library\nFile: USER32.DLL\nDescription: Window and input functions.",
  "SHELL32.DLL": "Windows Shell Library\nFile: SHELL32.DLL\nDescription: Shell and file operations.",
  "COMCTL32.DLL": "Common Controls Library\nFile: COMCTL32.DLL\nDescription: Standard interface controls.",
  "COMDLG32.DLL": "Common Dialogs Library\nFile: COMDLG32.DLL\nDescription: Common file dialog components.",
  "ADVAPI32.DLL": "Advanced Windows API Library\nFile: ADVAPI32.DLL\nDescription: Security and registry API functions.",
  "WINMM.DLL": "Windows Multimedia Library\nFile: WINMM.DLL\nDescription: Multimedia services.",
  "MMSYSTEM.DLL": "Multimedia System Library\nFile: MMSYSTEM.DLL\nDescription: Legacy multimedia functions.",
  "WSOCK32.DLL": "Windows Sockets Library\nFile: WSOCK32.DLL\nDescription: Network socket functions.",
  "OLE32.DLL": "Object Linking and Embedding Library\nFile: OLE32.DLL\nDescription: Component object services.",
  "OLEAUT32.DLL": "OLE Automation Library\nFile: OLEAUT32.DLL\nDescription: Automation support.",
  "MSVCRT.DLL": "Microsoft C Runtime Library\nFile: MSVCRT.DLL\nDescription: C runtime functions.",
  "HIMEM.SYS": "Extended Memory Manager\nFile: HIMEM.SYS\nDescription: Extended memory access driver.",
  "IFSHLP.SYS": "Installable File System Helper\nFile: IFSHLP.SYS\nDescription: File system helper driver.",
  "VMM32.VXD": "Virtual Machine Manager\nFile: VMM32.VXD\nDescription: Virtual device driver collection.",
  "VCOMM.VXD": "Virtual Communications Driver\nFile: VCOMM.VXD\nDescription: Communications device support.",
  "VMM.VXD": "Virtual Machine Manager Driver\nFile: VMM.VXD\nDescription: Virtual device management.",
  "README-WEBOS.TXT": "WEBOS 98\n\nWelcome to your Windows 98-inspired desktop. Open files in Notepad, explore the system directory, and use the Start menu to launch apps.",
  "LICENSE.TXT": "WEBOS 98\nSample system-directory content for the WebOS 98 project."
};
if (!virtualFS.Win98) virtualFS.Win98 = {};
for (const [name, content] of Object.entries(webos98SampleFiles)) {
  if (!Object.prototype.hasOwnProperty.call(virtualFS.Win98, name)) virtualFS.Win98[name] = content;
}
saveVirtualFS();

apps.clock = {
  title: "Clock", icon: "🕒", w: 330, h: 230,
  render: () => '<div class="clock-app"><div class="clock-face" id="clock-face"></div><h2 id="clock-date"></h2><p>WebOS 98 Clock</p></div>'
};
apps.systeminfo = {
  title: "System Information", icon: "🖥️", w: 390, h: 300,
  render: () => {
    const count = Object.values(virtualFS).reduce((n, folder) => n + Object.keys(folder).length, 0);
    return '<div class="system-info"><h2>System Properties</h2><p><b>Operating system:</b> WebOS 98 (browser simulation)</p><p><b>Version:</b> 4.10.1998-inspired</p><p><b>Installed apps:</b> ' + installedApps.length + '</p><p><b>Virtual files:</b> ' + count + '</p><p><b>Storage:</b> Browser storage for this site</p></div>';
  }
};
appStoreMarkup = function () {
  const entries = [
    ["calculator","🧮","Calculator","A basic four-function calculator."],
    ["calendar","📅","Calendar","A simple calendar for checking dates."],
    ["paint","🎨","Paint","Draw with a mouse or touch."],
    ["clock","🕒","Clock","A live digital clock and date."],
    ["systeminfo","🖥️","System Information","View virtual PC details and file count."]
  ];
  return '<div class="store-page"><h2>WebOS 98 App Store</h2><p>Free apps for your desktop.</p><div class="store-list">' +
    entries.map(([id,icon,name,desc]) => '<article class="store-app"><span class="store-icon">' + icon + '</span><div class="store-info"><strong>' + name + '</strong><p>' + desc + '</p></div><button class="retro-button" data-action="install-app" data-app="' + id + '">' + (installedApps.includes(id) ? "Installed" : "Install") + '</button></article>').join("") +
    '</div></div>';
};

const originalWebOSOpenApp = openApp;
openApp = function (name) {
  originalWebOSOpenApp(name);
  if (name !== "clock") return;
  const win = $("#win-clock");
  if (!win || win.dataset.clockRunning) return;
  win.dataset.clockRunning = "1";
  const tick = () => {
    if (!document.body.contains(win)) { clearInterval(timer); return; }
    const now = new Date();
    $("#clock-face", win).textContent = now.toLocaleTimeString();
    $("#clock-date", win).textContent = now.toLocaleDateString(undefined, {weekday:"long",year:"numeric",month:"long",day:"numeric"});
  };
  tick();
  const timer = setInterval(tick, 1000);
};

// Put the Clear PC control directly in My Computer.
const originalComputerRender = apps.computer.render;
apps.computer.render = () => originalComputerRender().replace(
  '<div class="statusbar">4 objects</div>',
  '<div class="computer-maintenance"><button class="retro-button" data-action="clear-pc">🧹 Clear PC…</button><span>Reset this virtual PC</span></div><div class="statusbar">6 objects</div>'
);

document.addEventListener("click", e => {
  const button = e.target.closest('[data-action="clear-pc"]');
  if (!button) return;
  if (!confirm("Clear this virtual PC? Your files in My Documents and Downloads, installed apps, desktop shortcuts, and wallpaper will be reset. Win98 sample system files will stay. This cannot be undone.")) return;
  virtualFS = {"My Documents": {}, "Downloads": {}, "Win98": {}};
  for (const [name, content] of Object.entries(webos98SampleFiles)) virtualFS.Win98[name] = content;
  saveVirtualFS();
  installedApps = [...defaultInstalled];
  saveInstalled();
  desktopShortcuts = [];
  saveShortcuts();
  wallpaper = "teal";
  localStorage.setItem("webos98-wallpaper", wallpaper);
  applyWallpaper();
  $$(".window").forEach(w => { if (w.dataset.app !== "computer") w.remove(); });
  fileManagerFolder = "Computer";
  renderDesktopShortcuts();
  refreshStartApps();
  syncTasks();
  const computer = $("#win-computer");
  if (computer) { computer.classList.remove("hidden"); computer.style.zIndex = ++z; activeId = "computer"; }
  alert("Virtual PC cleared. Win98 sample system files were kept.");
});
renderDesktopShortcuts();
refreshStartApps();
