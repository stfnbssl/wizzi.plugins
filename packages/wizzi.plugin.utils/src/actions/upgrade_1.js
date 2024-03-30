/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.utils\.wizzi-override\src\actions\upgrade_1.js.ittf
    utc time: Thu, 21 Mar 2024 16:05:08 GMT
*/
'use strict';
const path = require("path");
const file = require("@wizzi/utils").fSystem.file;
const spawnUtils = require("../services/spawn");

const pluginsFolder = "C:/My/wizzi/stfnbssl/wizzi.plugins/packages";

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

function doUpgrade(ndx) {
    var pluginName = pluginList[ndx];
    if (!pluginName) {
        console.log("[32m%s[0m", "All plugin upgrades done");
        return ;
    }
    deleteFiles(pluginName, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        updateFiles(pluginName, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            updateFolders(pluginName, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                console.log("[32m%s[0m", "*** Upgrade of plugin folders of  " + pluginName + " DONE ***");
                doUpgrade(ndx + 1)
            }
            )
        }
        )
    }
    )
}
doUpgrade(0)
function updateFiles(pluginName, callback) {
    const pluginFolder = path.join(pluginsFolder, "wizzi.plugin." + pluginName);
    //
    //
    const files = [
        "root/t/cheatsheet.js", 
        "root/index.js", 
        "models/wzctx.json"
    ];
    var i, i_items=files, i_len=files.length, item;
    for (i=0; i<i_len; i++) {
        item = files[i];
        const fromFile = path.join(pluginFolder, ".wizzi", item + ".ittf");
        const toFile = path.join(pluginFolder, ".wizzi-override", item + ".ittf");
        file.copy(fromFile, toFile)
    }
    callback(null)
}
function deleteFiles(pluginName, callback) {
    const pluginFolder = path.join(pluginsFolder, "wizzi.plugin." + pluginName);
    const files = [];
    function exec(ndx) {
        const fileRelPath = files[ndx];
        if (!fileRelPath) {
            return callback(null);
        }
        let filePath = path.join(pluginFolder, '.wizzi', fileRelPath);
        file.deleteFile(filePath, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            console.log('deleted file', filePath, __filename);
            filePath = path.join(pluginFolder, '.wizzi-override', fileRelPath)
            ;
            file.deleteFile(filePath, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                console.log('deleted file', filePath, __filename);
                exec(ndx + 1)
            }
            )
        }
        )
    }
    exec(0)
}
function deleteFolders(pluginName, callback) {
    const pluginFolder = path.join(pluginsFolder, "wizzi.plugin." + pluginName);
    const folders = [];
    function exec(ndx) {
        const folderRelPath = folders[ndx];
        if (!folderRelPath) {
            return callback(null);
        }
        const folderPath = path.join(pluginFolder, folderRelPath);
        file.deleteFolder(folderRelPath, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            console.log('deleted folder', folderPath, __filename);
            exec(ndx + 1)
        }
        )
    }
    exec(0)
}
function updateFolders(pluginName, callback) {
    const pluginFolder = path.join(pluginsFolder, "wizzi.plugin." + pluginName);
    const folders = [];
    function exec(ndx) {
        const folderRelPath = folders[ndx];
        if (!folderRelPath) {
            return callback(null);
        }
        const fromFolder = path.join(pluginFolder, ".wizzi", folderRelPath);
        const toFolder = path.join(pluginFolder, folderRelPath);
        file.copyFolder(fromFolder, toFolder, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            console.log('copied folder from', fromFolder, 'to', toFolder, __filename);
            exec(ndx + 1)
        }
        )
    }
    exec(0)
}
module.exports = doUpgrade;
