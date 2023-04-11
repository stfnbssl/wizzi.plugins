/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.text\.wizzi-override\lib\wizzifiers\text\parser.js.ittf
    utc time: Tue, 11 Apr 2023 14:27:35 GMT
*/
'use strict';
var md = module.exports = {};
var WAIT_PROP_NAME = 1;
var WAIT_PROP_VALUE = 2;
var PROP_NAME = 3;
var PROP_VALUE = 4;
function isWhiteSpace(ch) {
    if (ch === '\n') {
        return true;
    }
    if (ch === '\t') {
        return true;
    }
    if (ch === '\r') {
        return true;
    }
    if (ch === ' ') {
        return true;
    }
    return false;
}
md.parse = function(input) {
    var lines = input.split('\n');
    var resultLines = [];
    var tempLine = [];
    var i, i_items=lines, i_len=lines.length, line;
    for (i=0; i<i_len; i++) {
        line = lines[i];
        var state = WAIT_PROP_NAME;
        tempLine = [];
        var ch,
            l = line.length;
        for (var j = 0; j < l; j++) {
            ch = line[j];
            if (isWhiteSpace(ch)) {
                if (state == WAIT_PROP_NAME) {
                    tempLine.push(ch);
                }
                else if (state == PROP_NAME) {
                    state = WAIT_PROP_VALUE;
                    tempLine.push(ch);
                }
                else {
                    tempLine.push(ch);
                }
            }
            else if (ch == '(') {
                if (state == WAIT_PROP_NAME || state == PROP_NAME) {
                    tempLine.push("$" + "{'('}");
                    if (state == WAIT_PROP_NAME) {
                        state = PROP_NAME;
                    }
                }
                else {
                    tempLine.push(ch);
                }
            }
            else {
                if (state == WAIT_PROP_NAME) {
                    state = PROP_NAME;
                }
                tempLine.push(ch);
            }
        }
        if (state == WAIT_PROP_NAME) {
            resultLines.push('br')
        }
        else {
            resultLines.push(tempLine.join(''))
        }
    }
    console.log('resultLines', resultLines, __filename);
    return resultLines;
}
;
