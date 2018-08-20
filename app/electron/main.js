const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const url = require('url');
const path = require('path');

const zerorpc = require("zerorpc");

let mainWindow;
let pyProc;
let zerorpc_client;

app.on('Window-all-closed', () => {
    if (app.platform != 'darwin') {
        app.quit();
    }
})

app.on('will-quit', () => {
    if (pyProc) {
        pyProc.kill();
    }
    pyProc = null;
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})

app.on('ready', () => {
    pyProc = require('child_process').spawn('python3', [
        path.join(__dirname, '../../src/', 'api.py'),
        4242
    ]);

    if (pyProc != null) {
        console.log('child process success');
    } else {
        console.error('fail to spawn PyProc');
    }

    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    mainWindow.loadURL(process.env.ELECTRON_START_URL || url.format({
        pathname: `${__dirname}/build/index.html`,
        protocol: 'file:',
        slashes: true
    }));

    // @TODO:
    mainWindow.webContents.openDevTools();

    ipcMain.on('req::test', (event, arg) => {
        const { x, y } = JSON.parse(arg);
        
        const z = `${x} + ${y}`;

        zerorpc_client.invoke("calc", z, (error, res) => {
            if (error) {
                console.error(error);
            } else {
                console.log(res);
                event.sender.send('res::test', JSON.stringify({ z: res }));
            }
        })
    })

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    zerorpc_client = new zerorpc.Client();
    zerorpc_client.connect("tcp://127.0.0.1:4242");
    if (zerorpc_client != null) {
        console.log('zerorpc_client success');
    } else {
        console.error('fail to spawn zerorpc_client');
    }
})