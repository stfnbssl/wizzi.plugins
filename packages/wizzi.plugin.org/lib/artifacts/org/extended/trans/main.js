/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.org\.wizzi-override\lib\artifacts\org\extended\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = verify.lineParser;

var md = module.exports = {};
var myname = 'wizzi.plugin.org.org..trans.main';

md.trans = function(model, ctx, callback) {
    var transformedModel = {};
    if (model.wzElement !== 'org') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "org". Received: ' + model.wzElement, model))
    }
    
    try {
        transformedModel = {
            profiles: [
                
            ]
         };
        var i, i_items=model.items, i_len=model.items.length, item;
        for (i=0; i<i_len; i++) {
            item = model.items[i];
            doitem(item, transformedModel)
        }
    } 
    catch (ex) {
        return callback(ex);
    } 
    callback(null, transformedModel);
}
;

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.org/lib/artifacts/org/extended/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function doitem(parent, resultObj) {
    var f = functors[parent.wzElement];
    if (f) {
        f(parent, resultObj)
    }
}
var functors = {};
functors.profile = function(parent, resultObj) {
    var profileObj = {
        id: parent.wzName, 
        tasks: [
            
        ]
     };
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        
        // ...
        if (child.wzElement == "task") {
        }
        else {
            newitems.push(child)
        }
    }
    resultObj.profiles.push(profileObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
}
;
