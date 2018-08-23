const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const url = require('url');

const handler = require("handler_zerorpc")();

let mainWindow;

app.on('Window-all-closed', () => {
    if (app.platform != 'darwin') {
        app.quit();
    }
})

app.on('will-quit', () => {
    const server = handler.getServer();
    if (server) {
        server.kill();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})

app.on('ready', () => {
    handler.run();

    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    mainWindow.loadURL(process.env.ELECTRON_START_URL || url.format({
        pathname: `${__dirname}/build/index.html`,
        protocol: 'file:',
        slashes: true
    }));

    // @TODO:
    mainWindow.webContents.openDevTools();

    ipcMain.on('req::test_calc', (event, arg) => {
        const { x, y } = JSON.parse(arg);

        const z = `${x} + ${y}`;

        handler.getClient().invoke("calc", z, (error, res) => {
            if (error) {
                console.error(error);
            } else {
                console.log(res);
                event.sender.send('res::test_calc', JSON.stringify({ z: res }));
            }
        })
    })

    ipcMain.on('req::test_mnist', (event, arg) => {
        const { x, y } = JSON.parse(arg);

        const z = `${x} + ${y}`;

        handler.getClient().invoke("eval", z, (error, res) => {
            if (error) {
                console.error(error);
            } else {
                console.log(res);
                event.sender.send('res::test_mnist', JSON.stringify({ z: res }));
            }
        })
    })

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
})