/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.utils\.wizzi-override\src\actions\install_all.js.ittf
    utc time: Tue, 02 Apr 2024 09:44:18 GMT
*/
'use strict';
const path = require("path");
const spawnUtils = require("../services/spawn");
const pluginList = [
    "css", 
    "html", 
    "ittf", 
    "js", 
    "json", 
    "md", 
    "svg", 
    "text", 
    "ts", 
    "vtt", 
    "xml", 
    "yaml"
];

function doInstall(ndx) {
    var pluginName = pluginList[ndx];
    if (!pluginName) {
        console.log("[32m%s[0m", "All npm installations done");
        return ;
    }
    executeWizziInstallation(pluginName, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        console.log("[32m%s[0m", "*** Npm installation of plugin " + pluginName + " DONE ***");
        doInstall(ndx + 1)
    }
    )
}
doInstall(0)
function executeWizziInstallation(pluginName, callback) {
    console.log('Starting npm installation of ', pluginName, __filename);
    const PowerShell = spawnUtils.PowerShell;
    let ps = new PowerShell("npm i", {
        cwd: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages/wizzi.plugin." + pluginName
     });
    spawnUtils.psOutput(ps, {}, (err, stdout, stderr) => {
    
        console.log("powershell 2", err || stderr || stdout, __filename);
        callback(null)
    }
    )
}

module.exports = doInstall;

