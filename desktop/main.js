const { app, BrowserWindow, nativeTheme, Notification } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow () {
  const win = new BrowserWindow({
    width: 960,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Load local built files from app/dist/index.html
  const indexPath = path.join(__dirname, 'app', 'index.html')
  win.loadFile(indexPath)

  // Optional: open devtools in development
  if (!app.isPackaged) {
    // win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
