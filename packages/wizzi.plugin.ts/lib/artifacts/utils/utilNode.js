/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\utils\utilNode.js.ittf
    utc time: Tue, 06 Aug 2024 14:55:17 GMT
*/

var verify = require('@wizzi/utils').verify;

var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";

var md = module.exports = {};
md.inlinedTextToTextLines = function(text) {
    if (typeof(text) === 'undefined' || text == null) {
        return {
                text: text, 
                lines: null
             };
    }
    var text = verify.replaceAll(text, work.textSep, '\n');
    var ss = text.split('\n');
    if (ss.length == 1) {
        return {
                text: ss[0], 
                lines: null
             };
    }
    else {
        var lines = verify.replaceAll(ss[1], work.lineSep, '\n').split('\n')
        ;
        return {
                text: ss[0], 
                lines: lines
             };
    }
}
;