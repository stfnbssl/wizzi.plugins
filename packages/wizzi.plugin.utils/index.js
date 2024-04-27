/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.utils\.wizzi-override\root\index.js.ittf
    utc time: Thu, 25 Apr 2024 11:38:59 GMT
*/
'use strict';
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
console.log('args', args, __filename);
let cmd = args._[0] || 'generate';
if (args.version || args.v) {
    cmd = 'version';
}
if (args.help || args.h || args['?']) {
    cmd = 'help';
}
console.log('cmd', cmd, __filename);
switch (cmd) {
    case 'genall': {
        require('./src/actions/generate_all')(args);
        break;
    }
    case 'puball': {
        require('./src/actions/publish_all')(args);
        break;
    }
    case 'upgrade_1': {
        require('./src/actions/upgrade_1')(args);
        break;
    }
    case 'rename_1': {
        require('./src/actions/rename_1')(args);
        break;
    }
    case 'install_all': {
        require('./src/actions/install_all')(args);
        break;
    }
    case 'help': {
        require('./src/actions/help')(args);
        break;
    }
    case 'version': {
        console.log('Version 0.1');
        break;
    }
    default: {
        console.log("[31m%s[0m", `"${cmd}" is not a valid command!`);
        console.log("[31m%s[0m", `try wizzi help`, true);
        break;
    }
}
