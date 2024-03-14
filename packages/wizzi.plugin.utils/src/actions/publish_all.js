/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.utils\.wizzi-override\src\actions\publish_all.js.ittf
    utc time: Wed, 13 Mar 2024 07:14:10 GMT
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
    "wzjob", 
    "wzschema", 
    "xml", 
    "yaml"
];

function doPublish(ndx) {
    var pluginName = pluginList[ndx];
    if (!pluginName) {
        console.log("[32m%s[0m", "All generations done");
        return ;
    }
    executePublishing(pluginName, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        console.log("[32m%s[0m", "*** Generation of plugin " + pluginName + " DONE ***");
        doPublish(ndx + 1)
    }
    )
}
doPublish(0)
function executePublishing(pluginName, callback) {
    console.log('Starting generation of ', pluginName, __filename);
    const PowerShell = spawnUtils.PowerShell;
    let ps = new PowerShell("npm publish", {
        cwd: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages/wizzi.plugin." + pluginName
     });
    spawnUtils.psOutput(ps, {}, (err, stdout, stderr) => {
    
        console.log("powershell 2", err || stderr || stdout, __filename);
        callback(null)
    }
    )
}

module.exports = doPublish;

