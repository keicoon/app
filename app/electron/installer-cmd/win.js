//
var createInstaller = require('electron-installer-squirrel-windows');

createInstaller({
    name: 'MakeupApp',
    path: './dist/win',
    out: './dist/installer',
    authors: 'keicoon',
    exe: 'TestApp.exe',
    appDirectory: './dist/win',
    overwrite: true,
    setup_icon: 'favicon.ico'
}, function done(e) {
    if (e) {
        console.error(e);
    } else {
        console.log('Build for win success');
    }
});