const path = require('path');
const zerorpc = require("zerorpc");

module.exports = class Handler {
    constructor(port = 4242) {
        this.port = port;
        this.path_src = '../../src/test';
    }

    run() {
        this.server = require('child_process').spawn('python3', [
            path.join(__dirname, this.path_src, 'api.py'),
            this.port
        ]);
        if (this.server != null) {
            console.log('child process success');
        } else {
            console.error('fail to spawn PyProc');
        }

        this.clinet = new zerorpc.Client();
        this.clinet.connect(`tcp://127.0.0.1:${this.port}`);
        if (this.client) {
            console.log('zerorpc_client success');
        } else {
            console.error('fail to spawn zerorpc_client');
        }
    }

    getServer() {
        return this.server;
    }

    getClient() {
        return this.client;
    }
}