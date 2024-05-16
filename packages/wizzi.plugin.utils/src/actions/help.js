/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.utils\.wizzi-override\src\actions\help.js.ittf
    utc time: Mon, 06 May 2024 14:24:55 GMT
*/
'use strict';
const menus = {
    main: [
        "", 
        "", 
        "wzCtx.App.CLIName [noarguments] | configname | [command] <options>", 
        "", 
        "noarguments ......... execute ... using wizzi.config.js", 
        "configname .......... execute ... using wizzi.config.<configname>.js", 
        "first ............... execute ...", 
        "version ............. show package version", 
        "help ................ show help menu for a command"
    ].join('\n'), 
    create: [
        "", 
        "", 
        "wzCtx.App.CLIName create <options>", 
        "", 
        "--kind | -k <kindname> ... the project kind <kindname>", 
        "", 
        "valid kindnames:", 
        "  webpack", 
        "  express", 
        "  plugin"
    ].join('\n'), 
    fy: [
        "", 
        "", 
        "wzCtx.App.CLIName fy <options>", 
        "", 
        "[--source | -s] <file | folder> .... the source file or folder", 
        "[--dest | -d] <file | folder> ...... the destination file or folder"
    ].join('\n')
 };
module.exports = (args) => {

    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main, __filename);
}
;
