const { app, BrowserWindow, ipcMain, Notification } = require('electron')


// Browser window startup
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// IPC with index for game setup
ipcMain.handle('create-new-game', (event, payload) =>{
  console.log(`Creating new game in ipcMain handler: ${payload}`);
});

ipcMain.handle('join-existing-game', (event, payload) =>{
  console.log("ipcMain handling join-existing-game action");
})
