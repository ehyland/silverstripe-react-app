var path = require('path');
module.exports = function (shipit) {

    require('shipit-deploy')(shipit);
    require('shipit-npm')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/eamon-app-build',
            deployTo: '/var/www/app-deployed',
            repositoryUrl: 'https://github.com/ehyland/eamon-app.git',
            branch: 'prep-for-production',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            deleteOnRollback: false,
            shallowClone: true,
            npm: {
                remote: false,
                cmd: ['build']
            }
        },
        live: {
            servers: 'root@fucker'
        }
    });

    shipit.on('npm_installed', function(){
        shipit.start('npm:cmd');
    })

    shipit.on('published', function(){
        var publishedPath = path.resolve(shipit.config.deployTo, 'current');
        shipit.remote('pm2 startOrRestart pm2.json', {cwd: publishedPath });
    })
};
