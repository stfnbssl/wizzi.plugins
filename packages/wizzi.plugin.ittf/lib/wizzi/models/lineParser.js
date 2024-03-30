/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ittf\.wizzi-override\lib\wizzi\models\lineParser.js.ittf
    utc time: Thu, 21 Mar 2024 16:05:35 GMT
*/
'use strict';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
/**
     ignore quotes
     name = first not (blank or tab) char sequence
     value = all remaining chars after name + (blank or tab)
     example
     "trip to the london bridge"
     name() = "trip"
     value() = "to the london bridge"
*/
md.parseNameValueRaw = function(text, node) {
    var name = '',
        value = '';
    if (verify.isNotEmpty(text)) {
        var ch,
            state = 0,
            l = text.length;
        for (var i = 0; i < l; i++) {
            ch = text[i];
            if (ch == ' ' || ch == '\t') {
                if (state == 0) {
                    ;
                }
                else if (state == 1) {
                    state = 2;
                }
                else if (state == 2) {
                    value += ch;
                }
            }
            else {
                if (state == 0) {
                    name = ch;
                    state = 1;
                }
                else if (state == 1) {
                    name += ch;
                }
                else if (state == 2) {
                    value += ch;
                }
            }
        }
    }
    return {
            name: function() {
                return name;
            }, 
            value: function() {
                return value;
            }, 
            hasValue: function() {
                return value.length > 0;
            }
         };
}
;
