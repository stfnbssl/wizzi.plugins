/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.java\.wizzi-override\examples\step_1_go.js.ittf
*/
'use strict';
// imports available to every examples
var path = require('path');
var fs = require('fs');
var util = require('util');
var async = require('async');
var wizzi = require('wizzi');
var stringify = require('json-stringify-safe');
var inspect = require('object-inspect');
var mtree = require('wizzi-mtree');
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var vfile = wizziUtils.vfile;
var mocks = wizziUtils.mocks;
var errors = wizziUtils.exampleErrors;
var fsfile = vfile();
const spawn = require("child_process").spawn;
var mTreeBuildupContext = {};
var artifactContext = {};
var globalContext = {};
var java_examples_step_1 = function(step_callback) {
    heading1('First `java` Wizzi Model')
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
        var className = "MyFirstClass";
        wf.loadModelAndGenerateArtifact(path.join(__dirname, 'step_1', className + '.java.ittf'), {
            modelRequestContext: {}, 
            artifactRequestContext: {}
         }, 'java/module', (err, artifactText) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            console.log(artifactText);
            const scriptPath = path.join(__dirname, 'result', className + '.java');
            const classPath = path.join(__dirname, 'result');
            fsfile.write(scriptPath, artifactText)
            const javaProcess = spawn('C:\\Program Files\\Common Files\\Oracle\\Java\\javapath\\javac',[scriptPath]);
            javaProcess.stdout.on('data', function(data) {
                printValue('java stdout', data.toString(), 'dashes')
            })
            javaProcess.stderr.on('data', function(data) {
                printValue('java stderr', data.toString(), 'dashes')
            })
            javaProcess.on('error', function(err) {
                console.log(`child process error`, err);
            })
            javaProcess.on('close', function(code) {
                console.log(`child process exited with code ${code}`);
                if (code == 0) {
                    const javaProcess = spawn('C:\\Program Files\\Common Files\\Oracle\\Java\\javapath\\java',[className], {
                        cwd: classPath
                     });
                    javaProcess.stdout.on('data', function(data) {
                        printValue('java stdout', data.toString(), 'dashes')
                    })
                    javaProcess.stderr.on('data', function(data) {
                        printValue('java stderr', data.toString(), 'dashes')
                    })
                    javaProcess.on('error', function(err) {
                        console.log(`child process error`, err);
                    })
                    javaProcess.on('close', function(code) {
                        console.log(`child process exited with code ${code}`);
                        if (code == 0) {
                        }
                    })
                }
            })
        }
        )
    }
    )
};
java_examples_step_1.__name = 'Level 0 - java_examples_step_1';
function getIttfFiles(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
        
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, (schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf'));
        }
        )
    ;
}
function getIttfFilesData(srcpath, schema) {
    var files = getIttfFiles(srcpath, schema);
    var ret = [];
    var i, i_items=files, i_len=files.length, file;
    for (i=0; i<i_len; i++) {
        file = files[i];
        ret.push({
            path: file, 
            name: file.substring(0, file.length - ('.' + schema + '.ittf').length), 
            fullPath: path.join(srcpath, file)
         })
    }
    return ret;
}
function createWizziFactory(globalContext, callback) {
    
    // The wizzi package will be the npm version from wizzi/node_modules
    if (wizzi == null) {
        wizzi = require('wizzi');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsFactory({
        plugins: {
            
         }, 
        globalContext: globalContext || {}
     }, callback)
}
function getLoadModelContext(mtreeBuilUpContext) {
    return mocks.getLoadModelContext(mtreeBuilUpContext);
}
function getWizziObject(callback) {
    if (typeof(callback) === 'undefined') {
        return {
                loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                    useCache: false
                 }), 
                file: wizziUtils.file, 
                verify: wizziUtils.verify, 
                errors: errors
             };
    }
    // In case the wizzi model has inner models and requires a wizziFactory instance
    else {
        createWizziFactory({}, (err, wf) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null, {
                    loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                        useCache: false
                     }), 
                    file: wizziUtils.file, 
                    verify: wizziUtils.verify, 
                    errors: errors, 
                    wizziFactory: wf
                 });
        }
        )
    }
}
function heading1(text) {
    console.log('');
    console.log('*'.repeat(120));
    console.log('** level 0 - step 1 - java_examples_step_1 - ' + text);
    console.log('*'.repeat(120));
    console.log('');
}
function heading2(text) {
    console.log('');
    console.log('   ', '-'.repeat(100));
    console.log('   ','-- java_examples_step_1 - ' + text);
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
module.exports = java_examples_step_1;
if (typeof require != 'undefined' && require.main === module) {
    java_examples_step_1();
}