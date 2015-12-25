// project config
module.exports = function(grunt) {
    grunt.initConfig({
        // deploy
        secret: grunt.file.readJSON('secret.json'),

        sshexec: {
            deploy: {
                command: [
                    'cd ~',
                    'rm -r BEE-server/ || true',
                    'git clone git@github.com:PierreCavalet/BEE-server.git',
                    'cd BEE-server',
                    'npm install',
                    'cp ~/config.json .',
                    'forever stop server.js || true',
                    'forever start server.js',
                    'forever list'
                ].join(' && '),
                options: {
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-ssh');
    grunt.registerTask('default', '');
    grunt.registerTask('deploy', ['sshexec:deploy']);


}
