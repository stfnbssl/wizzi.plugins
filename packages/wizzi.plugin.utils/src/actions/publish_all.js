/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.utils\.wizzi-override\src\actions\publish_all.js.ittf
    utc time: Fri, 19 Apr 2024 16:29:59 GMT
*/
'use strict';
const path = require("path");
const spawnUtils = require("../services/spawn");

const pluginList = [
    "css", 
    "graphql", 
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

function doPublish(ndx) {
    var pluginName = pluginList[ndx];
    if (!pluginName) {
        console.log("[32m%s[0m", "All publishings done");
        return ;
    }
    executePublishing(pluginName, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        console.log("[32m%s[0m", "*** publishing of plugin " + pluginName + " DONE ***");
        doPublish(ndx + 1)
    }
    )
}
doPublish(0)
function executePublishing(pluginName, callback) {
    console.log('Starting publishing of ', pluginName, __filename);
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

