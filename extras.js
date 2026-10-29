// Extra WebOS 98 system files, maintenance tools, and apps.
const webos98SampleFiles = {
  "README.TXT": "Welcome to Windows 98!\n\nThis is a pretend system folder inside WebOS 98.",
  "LICENSE.TXT": "WEBOS 98 SAMPLE LICENSE\nThis is fictional sample text, not an original Microsoft license.",
  "WIN.INI": "; Sample Windows 98 configuration\n[windows]\nload=\nrun=\n[desktop]\nWallpaper=(none)\nTileWallpaper=0",
  "SYSTEM.INI": "; Sample system configuration for WebOS 98\n[boot]\nSystem.drv=system.drv\n[386Enh]\n; Example text only; not used by your device.",
  "AUTOEXEC.BAT": "@ECHO OFF\nPROMPT $P$G\nECHO Welcome to the WebOS 98 DOS prompt!\nREM Sample only; these commands do not run on your device.",
  "CONFIG.SYS": "REM Sample startup configuration\nREM This virtual file is for display only.\nDEVICE=HIMEM.SYS",
  "README-WEBOS.TXT": "WEBOS 98\n\nUse My Computer to browse virtual folders. Open text files with Notepad. Save As lets you choose a virtual folder and filename. Files stay inside this browser-based simulation."
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
    return '<div class="system-info"><h2>System Properties</h2><p><b>Operating system:</b> WebOS 98 (browser simulation)</p><p><b>Version:</b> 4.10.1998-inspired</p><p><b>Installed apps:</b> ' + installedApps.length + '</p><p><b>Virtual files:</b> ' + count + '</p><p><b>Storage:</b> Browser storage for this site</p><p class="system-warning">This is a simulated computer. It cannot see or clear files on your real device.</p></div>';
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
