/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\preprocess.js.ittf
    utc time: Thu, 27 Jul 2023 14:19:09 GMT
*/
'use strict';
var md = module.exports = {};
var myname = 'js.module.preprocess';
md.exec = function(model, ctx) {
    ctx.__wzModule = {
        seen: false, 
        vars: [], 
        consts: [], 
        functions: [], 
        classes: [], 
        requires: []
     };
    ctx.__wzItems = [];
    var i, i_items=model.statements, i_len=model.statements.length, topitem;
    for (i=0; i<i_len; i++) {
        topitem = model.statements[i];
        if (checkWzItem(topitem, ctx.__wzModule)) {
        }
        else if (topitem.wzElement === "wzIife") {
            ctx.__wzItems.push(wzTopLevel(topitem))
        }
    }
}
;
function wzTopLevel(topitem) {
    var wzItems = topitem.__wzItems = wzItems = {
        seen: false, 
        vars: [], 
        consts: [], 
        functions: [], 
        classes: [], 
        requires: []
     };
    var i, i_items=topitem.statements, i_len=topitem.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = topitem.statements[i];
        checkWzItem(item, wzItems);
    }
    // loog 'wzItems.requires.length', wzItems.requires.length
    // loog 'wzItems.vars.length', wzItems.vars.length
    // loog 'wzItems.consts.length', wzItems.consts.length
    // loog 'wzItems.functions.length', wzItems.functions.length
    // loog 'wzItems.classes.length', wzItems.classes.length
    return wzItems;
}
function checkWzItem(item, wzItems) {
    if (item.wzElement === "wzVar") {
        wzItems.vars.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzConst") {
        wzItems.consts.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzFunction") {
        wzItems.functions.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzClass") {
        wzItems.functions.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzRequire") {
        wzItems.requires.push(item);
        wzItems.seen = true;
        return true;
    }
    return false;
}
