/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.utils\.wizzi-override\src\actions\rename_1.js.ittf
    utc time: Mon, 06 May 2024 14:24:55 GMT
*/
'use strict';
const path = require("path");
const vfile = require("@wizzi/utils").fSystem.vfile;
const verify = require("@wizzi/utils").verify;
var fsfile =vfile();
const spawnUtils = require("../services/spawn");

const pluginsFolder = "C:/My/wizzi/stfnbssl/wizzi.plugins/packages";

const pluginList = [
    "css", 
    "graphql", 
    "html", 
    "ittf", 
    "js", 
    "json", 
    "md", 
    "prisma", 
    "svg", 
    "text", 
    "toml", 
    "ts", 
    "vtt", 
    "xml", 
    "yaml"
];

function doRename(ndx) {
    var pluginName = pluginList[ndx];
    // loog "pluginList", pluginList, ndx, pluginName
    if (!pluginName) {
        console.log("[32m%s[0m", "All plugin upgrades done");
        return ;
    }
    saveFiles(pluginName, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        renameFiles(pluginName, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            console.log("[32m%s[0m", "*** Rename of plugin folders of  " + pluginName + " DONE ***");
            doRename(ndx + 1)
        }
        )
    }
    )
}
doRename(0)
function deleteFolders(pluginName, callback) {
    // loog 'saveFiles', pluginName
    const schemasFolder = path.join(pluginsFolder, "wizzi.plugin." + pluginName, ".wizzi-override", "lib", "wizzi", "schemas", "upg");
    // loog 'schemasFolder', schemasFolder
    fsfile.deleteFolder(schemasFolder, callback)
}
function saveFiles(pluginName, callback) {
    // loog 'saveFiles', pluginName
    const schemasFolder = path.join(pluginsFolder, "wizzi.plugin." + pluginName, ".wizzi-override", "lib", "wizzi", "schemas");
    // loog 'schemasFolder', schemasFolder
    fsfile.getFiles(schemasFolder, {}, (err, files) => {
    
        if (err) {
            return callback(err);
        }
        // loog 'schemas files', result
        function doExec(ndx) {
            var f = files[ndx];
            if (!f) {
                return callback(null);
            }
            
            // loog 'toFile', toFile
            if (f.fullPath.indexOf('upg') < 0) {
                var toFile = path.join(schemasFolder, '.upg', '1', f.relPath);
                fsfile.copyFile(f.fullPath, toFile, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    console.log('copied file from', f.fullPath, 'to', toFile);
                    doExec(ndx + 1)
                }
                )
            }
            else {
                doExec(ndx + 1)
            }
        }
        doExec(0)
    }
    )
}
function renameFiles(pluginName, callback) {
    // loog 'renameFiles', pluginName
    const schemasFolder = path.join(pluginsFolder, "wizzi.plugin." + pluginName, ".wizzi-override", "lib", "wizzi", "schemas");
    // loog 'schemasFolder', schemasFolder
    fsfile.getFiles(schemasFolder, {}, (err, files) => {
    
        if (err) {
            return callback(err);
        }
        // loog 'schemas files', result
        function doExec(ndx) {
            var f = files[ndx];
            if (!f) {
                return callback(null);
            }
            if (f.fullPath.indexOf('upg') < 0) {
                var toFile = verify.replaceAll(f.fullPath, 'wfschema.ittf', 'wzschema.ittf');
                fsfile.rename(f.fullPath, toFile, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    console.log('file renamed from', f.fullPath, 'to', toFile);
                    doExec(ndx + 1)
                }
                )
            }
            else {
                doExec(ndx + 1)
            }
        }
        doExec(0)
    }
    )
}
module.exports = doRename;
