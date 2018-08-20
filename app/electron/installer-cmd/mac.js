//
var createInstaller = require('electron-installer-dmg');

createInstaller({
    name: 'MakeupApp',
    appPath: './dist/mac/makeup-app-darwin-x64/makeup-app.app',
    out: './dist/installer'
}, function done(e) {
    if (e) {
        console.error(e);
    } else {
        console.log('Build for mac success');
    }
});