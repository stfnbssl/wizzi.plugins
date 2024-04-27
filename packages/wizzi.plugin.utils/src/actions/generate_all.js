/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.utils\.wizzi-override\src\actions\generate_all.js.ittf
    utc time: Thu, 25 Apr 2024 11:39:00 GMT
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

function doGenerate(ndx) {
    var pluginName = pluginList[ndx];
    if (!pluginName) {
        console.log("[32m%s[0m", "All generations done");
        return ;
    }
    executeWizziGeneration(pluginName, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        console.log("[32m%s[0m", "*** Generation of plugin " + pluginName + " DONE ***");
        doGenerate(ndx + 1)
    }
    )
}
doGenerate(0)
function executeWizziGeneration(pluginName, callback) {
    console.log('Starting generation of ', pluginName, __filename);
    const PowerShell = spawnUtils.PowerShell;
    let ps = new PowerShell("wz lastsafe", {
        cwd: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages/wizzi.plugin." + pluginName
     });
    spawnUtils.psOutput(ps, {}, (err, stdout, stderr) => {
    
        console.log("powershell 2", err || stderr || stdout, __filename);
        callback(null)
    }
    )
}

module.exports = doGenerate;

