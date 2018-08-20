module.exports = function (grunt) {

    /*  #preparation
        yarn global add grunt-cli
        yarn add --dev grunt grunt-exec
    */
    var platform = undefined;
    if (process.platform === "win32") {
        platform = 'win';
    } else if (process.platform === "darwin") {
        platform = 'mac'
    }
    if (!platform) {
        throw new Error(`Not support platform : ${process.platform}`);
    }

    [
        'grunt-exec'
    ].forEach(function (task) {
        grunt.loadNpmTasks(task);
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'exec': {
            'packager': {
                command: `npm run packager-${platform}`,
                stdout: true,
                stderr: true
            },
            'installer': {
                command: `npm run installer-${platform}`,
                stdout: true,
                stderr: true
            }
        }
    });

    grunt.registerTask('default', ['exec']);
};