const EasyRestful = require('easy-restful.js').get({
    "redis-server-bin-path": '/Download/redis-server'
});

EasyRestful.register('/hello', function (resolve, reject) {
    resolve('hello restful api world');
});

EasyRestful.register('/before/:img', function (resolve, reject) {
    const img = this.params.value;
    
    const test = "1 + 1";
    const data = test; // img

    zerorpc_client.invoke("calc", data, (error, res) => {
        if (error) {
            console.error(error);
        } else {
            console.log(res);
            resolve(`[success] dbAdd : ${res}`);
        }
    })
});

let pyProc = require('child_process').spawn('python3', [
    path.join(__dirname, '../../src/', 'api.py'),
    4242
]);

if (pyProc != null) {
    console.log('child process success');
} else {
    console.error('fail to spawn PyProc');
}

const zerorpc = require("zerorpc");

let zerorpc_client = new zerorpc.Client();
zerorpc_client.connect("tcp://127.0.0.1:4242");