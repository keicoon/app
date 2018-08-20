const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const url = require('url');
const bDEV = false;

let mainWindow;

app.on('Window-all-closed', () => {
    if (app.platform != 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    mainWindow.loadURL(bDEV 
        ? `http://localhost:3000` 
        : url.format({
        pathname: `${__dirname}/build/index.html`,
        protocol: 'file:',
        slashes: true
    }));

    // @TODO:
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
})