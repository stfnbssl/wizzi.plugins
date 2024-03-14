/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.c\.wizzi-override\examples\step_3_go.js.ittf
    utc time: Wed, 13 Mar 2024 07:01:14 GMT
*/
'use strict';
// imports available to every examples
var path = require('path');
var util = require('util');
var async = require('async');
var wizzi = require('wizzi');
var stringify = require('json-stringify-safe');
var inspect = require('object-inspect');
var wzutils = require('wizzi-utils');
var verify = require('wizzi-utils').verify;
var vfile = require('wizzi-utils').vfile;
var fsfile = vfile();
const spawn = require("child_process").spawn;
const exec = require('child_process').exec;
var mTreeBuildupContext = {};
var artifactContext = {};
var globalContext = {};
var c_examples_step_3 = function(step_callback) {
    heading1('Socket server `c` Wizzi Model')
    wizzi.fsFactory({
        plugins: {
            items: [
                './index'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..')
         }
     }, (err, wf) => {
    
        if (err) {
            console.log("[31m%s[0m", 'err', err);
            throw err;
        }
        wf.loadModelAndGenerateArtifact(path.join(__dirname, 'step_3', 'server.c.ittf'), {
            modelRequestContext: {}, 
            artifactRequestContext: {}
         }, 'c/module', (err, artifactText) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            console.log(artifactText);
            const scriptPath = path.join(__dirname, 'step_3', 'result', 'server.c');
            fsfile.write(scriptPath, artifactText)
            const exePath = path.join(__dirname, 'step_3', 'result', 'server.exe');
            exec('C:\\msys64\\mingw64\\bin\\gcc ' + scriptPath + ' -o ' + exePath + ' -lws2_32', {
                cwd: "C:\\msys64\\mingw64\\bin"
             }, (error, stdout, stderr) => {
            
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                if (error) {
                    console.log(`exec error: ${error}`);
                }
            }
            )
            wf.loadModelAndGenerateArtifact(path.join(__dirname, 'step_3', 'client.c.ittf'), {
                modelRequestContext: {}, 
                artifactRequestContext: {}
             }, 'c/module', (err, artifactText) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                console.log(artifactText);
                const scriptPath = path.join(__dirname, 'step_3', 'result', 'client.c');
                fsfile.write(scriptPath, artifactText)
                const exePath = path.join(__dirname, 'step_3', 'result', 'client.exe');
                exec('C:\\msys64\\mingw64\\bin\\gcc ' + scriptPath + ' -o ' + exePath + ' -lws2_32', {
                    cwd: "C:\\msys64\\mingw64\\bin"
                 }, (error, stdout, stderr) => {
                
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                    if (error) {
                        console.log(`exec error: ${error}`);
                    }
                }
                )
            }
            )
        }
        )
    }
    )
};
c_examples_step_3.__name = 'Level 0 - c_examples_step_3';
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 3 - c_examples_step_3 - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- c_examples_step_3 - ' + text);
    console.log('   ', '-'.repeat(100));
    console.log('');
}
function printArray(name, arr, fields, format) {
    if (format === 'dashes') {
        console.log('   ', '-'.repeat(100));
    }
    console.log('   ', '* array ' + name + ' : ');
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        console.log('    {', i);
        var keys = fields || Object.keys(item);
        var j, j_items=keys, j_len=keys.length, k;
        for (j=0; j<j_len; j++) {
            k = keys[j];
            printValue(k, item[k])
        }
    }
}
function printValue(key, value, format, p1) {
    if (format === 'dashes' || format === 'meter') {
        console.log('   ', '-'.repeat(100));
    }
    if (format === 'json') {
        value = stringify(value, null, 4)
        ;
    }
    if (verify.isNotEmpty(value)) {
        var lines = verify.splitLines(value, {
            numbered: true
         });
        if (lines.length === 1) {
            console.log('   ', key, ':', lines[0].text);
        }
        else {
            for (var i=0; i<lines.length; i++) {
                if (i === 0) {
                    console.log('   ', key, ':', lines[0].numFmt, lines[0].text);
                }
                else {
                    console.log('   ', spaces(key.length+1), ' ', lines[i].numFmt, lines[i].text);
                }
            }
        }
    }
    else if (verify.isObject(value)) {
        console.log('   ', key, ':', inspect(value));
    }
    else {
        console.log('   ', key, ':', value);
    }
    if (format === 'meter') {
        meterLine(p1, '     ' + new Array(1 + key.length).join(' '));
    }
}
function spaces(len) {
    return new Array(len).join(' ');
}
function meterLine(len, indent) {
    var sb = [];
    var numW = len < 10 ? 1 : ( len < 100 ? 2 : 3 );
    var x;
    for (var i=0; i<numW; i++) {
        for (var j=0; j<len; j++) {
            x = formatNum(j, numW);
            sb.push(x.substr(i,1));
        }
        console.log(indent, sb.join(''));
        sb = [];
    }
}
function formatNum(num, len) {
    var x = num.toString();
    return new Array(1 + len-x.length).join(' ') + x;
}
module.exports = c_examples_step_3;
if (typeof require != 'undefined' && require.main === module) {
    c_examples_step_3();
}
