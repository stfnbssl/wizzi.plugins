/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\document\gen\utils\lineParser.js.ittf
*/
'use strict';

// old var verify = require('./verify')
var verify = require('wizzi-utils').helpers.verify;
// old var errors = require('./errors')
var errors = require('../../../../../../errors');

var md = module.exports = {};
md.parse = function(text, node) {
    if (!verify.isString(text)) {
        return {
                tokens: [], 
                join: function() {
                    return '';
                }
             };
    }
    var ch,
        l = text.length,
        tokens = [],
        token = {
            quote: null, 
            text: '', 
            raw: ''
         };
    for (var i = 0; i < l; i++) {
        ch = text[i];
        if (token.quote != null) {
            if (ch == token.quote) {
                tokens.push(token);
                token = {
                    quote: null, 
                    text: '', 
                    raw: ''
                 };
            }
            else {
                token.text += ch;
                token.raw += ch;
            }
        }
        else if (ch == '"' || ch == '\'') {
            if (token.text.length > 0) {
                errors.NodeError("Invalid use of quote inside text", node);
            }
            token.quote = ch;
        }
        else if (['(', ')', '[', ']', '{', '}'].indexOf(ch) > - (1)) {
            if (token.text.length > 0) {
                tokens.push(token);
            }
            tokens.push({
                quote: null, 
                text: ch, 
                raw: ch
             })
            token = {
                quote: null, 
                text: '', 
                raw: ''
             };
        }
        else if (ch == ' ' || ch == '\t') {
            if (token.text.length > 0) {
                token.raw += ch;
                tokens.push(token);
                token = {
                    quote: null, 
                    text: '', 
                    raw: ''
                 };
            }
        }
        else {
            token.text += ch;
            token.raw += ch;
        }
    }
    if (token.text.length > 0) {
        tokens.push(token);
        token = {
            quote: null, 
            text: '', 
            raw: ''
         };
    }
    return {
            tokens: tokens, 
            length: tokens.length, 
            join: function(sep, start) {
                var t = [],
                    startIndex = (start || 0);
                for (var i = startIndex; i < this.tokens.length; i++) {
                    if (sep === 'forValue') {
                        var s = this.tokens[i].text;
                        if (['(', ')', '[', ']', '{', '}'].indexOf(s) > - (1)) {
                            t.push(this.tokens[i].text)
                        }
                        else {
                            t.push((this.tokens[i].text + ' '));
                        }
                    }
                    else {
                        t.push(this.tokens[i].text)
                    }
                }
                if (sep === 'forValue') {
                    return t.join('').trim()
                    ;
                }
                else {
                    return t.join(sep).trim()
                    ;
                }
            }, 
            getByPos: function(pos) {
                return pos > this.length ? null : this.tokens[(pos - 1)];
                ;
            }, 
            matchByPos: function(pos, test) {
                return pos > this.length ? false : this.tokens[(pos - 1)].text === test;
            }, 
            name: function() {
                return this.length > 0 ? this.tokens[0].text : null;
            }, 
            value: function() {
                return this.join('forValue', 1);
            }, 
            nameValue: function() {
                var ret = {
                    name: '', 
                    value: ''
                 };
                if (this.tokens.length >= 2) {
                    tk = this.tokens[0];
                    ret.name = tk.text;
                    for (var i = 1; i < this.tokens.length; i++) {
                        tk = this.tokens[i];
                        ret.value += (tk.quote || '');
                        ret.value += tk.raw;
                        ret.value += (tk.quote || '');
                    }
                }
                return ret;
            }
         };
}
;
md.parseInterpolation = function(text, node, handlebar, ng) {
    if (!verify.isString(text)) {
        return {
                tokens: [], 
                join: function() {
                    return '';
                }
             };
    }
    var openMacro = ng ? '[' : '{';
    var closeMacro = ng ? ']' : '}';
    var ch,
        l = text.length,
        state = 0,
        tokens = [],
        token = {
            kind: 0, 
            text: ''
         };
    for (var i = 0; i < l; i++) {
        ch = text[i];
        if (ch == openMacro) {
            if (state === 0) {
                state = 1;
            }
            else if (state === 1) {
                if (token.text.length > 0) {
                    tokens.push(token);
                }
                token = {
                    kind: 1, 
                    text: ''
                 };
                state = 2;
            }
            else if (state === 2) {
                token.text += ch;
            }
            else if (state === 11) {
                token.text += closeMacro;
                state = 2;
            }
        }
        else if (ch == closeMacro) {
            if (state === 0) {
                token.text += ch;
            }
            else if (state === 1) {
                token.text += openMacro;
                state = 0;
            }
            else if (state === 2) {
                state = 11;
            }
            else if (state === 11) {
                if (token.text.length > 0) {
                    tokens.push(token);
                }
                token = {
                    kind: 0, 
                    text: ''
                 };
                state = 0;
            }
        }
        else {
            if (state === 1) {
                token.text += openMacro;
                state = 0;
            }
            else if (state === 11) {
                token.text += closeMacro;
                state = 2;
            }
            token.text += ch;
        }
    }
    if (state === 1) {
        token.text += openMacro;
        state = 0;
    }
    else if (state === 11) {
        token.text += closeMacro;
        state = 2;
    }
    if (token.text.length > 0) {
        tokens.push(token);
    }
    return {
            tokens: tokens, 
            length: tokens.length, 
            join: function() {
                var token,
                    t = [];
                for (var i = 0; i < this.tokens.length; i++) {
                    token = this.tokens[i];
                    if (t.length > 0) {
                        t.push(' + ');
                    }
                    if (token.kind === 0) {
                        t.push('"' + escapename(token.text) + '"');
                    }
                    else {
                        if (handlebar) {
                            t.push('"{{ ' + escapename(token.text) + '}}"');
                        }
                        else {
                            t.push(token.text)
                        }
                    }
                }
                return t.join('');
            }
         };
}
;
var STATE_WAIT_NAME = 0;
var STATE_NAME = 1;
var STATE_WAIT_VALUE = 2;
var STATE_VALUE = 3;
var STATE_ENDED = 4;
var STATE_NAME_BRACKET = 5;
md.parseNameValueRaw = function(text, node, options) {
    options = options || {};
    var isObjectProperty = options.objectProperty;
    var name_buf = [];
    var value_buf = [];
    if (verify.isNotEmpty(text)) {
        var ch,
            l = text.length,
            state = 0,
            q = null,
            bracketLevel = 0;
        for (var i = 0; i < l; i++) {
            ch = text[i];
            if (state == STATE_NAME_BRACKET) {
                name_buf.push(ch);
                if (ch == ']') {
                    bracketLevel--;
                    if (bracketLevel == 0) {
                        state = STATE_WAIT_VALUE;
                    }
                }
                else if (ch == '[') {
                    bracketLevel++;
                }
            }
            else if (isObjectProperty && state == STATE_WAIT_NAME && ch == '[') {
                name_buf.push(ch);
                state = STATE_NAME_BRACKET;
                bracketLevel++;
            }
            
            // state MUST BE STATE_NAME or STATE_VALUE
            else if (q != null) {
                if (state === STATE_NAME) {
                    name_buf.push(ch);
                }
                else if (state === STATE_VALUE) {
                    value_buf.push(ch);
                }
                // this is a bug
                else {
                    throw new Error('BUG. parseNameValue invalid state ' + state);
                }
                if (ch == '\\') {
                    i++;
                    ch = text[i];
                    if (state === STATE_NAME) {
                        name_buf.push(ch);
                    }
                    else if (state === STATE_VALUE) {
                        value_buf.push(ch);
                    }
                }
                else if (ch == q) {
                    q = null;
                    if (state === STATE_NAME) {
                        state = STATE_WAIT_VALUE;
                    }
                }
            }
            
            // state MUST BE STATE_WAIT_NAME or STATE_WAIT_VALUE
            else if (ch == '"' || ch == '\'') {
                if (state === STATE_NAME) {
                    throw new errors.NodeError("parseNameValue error. Invalid use of quote inside a name part. Source: " + text, node);
                }
                else if (state === STATE_VALUE) {
                    value_buf.push(ch);
                }
                else if (state === STATE_ENDED) {
                    throw new errors.NodeError("parseNameValue error. Invalid quote found after value. Source: " + text, node);
                }
                else if (state === STATE_WAIT_NAME) {
                    state = STATE_NAME;
                    name_buf.push(ch);
                    q = ch;
                }
                else if (state === STATE_WAIT_VALUE) {
                    state = STATE_VALUE;
                    value_buf.push(ch);
                    q = ch;
                }
            }
            else if (ch == ' ' || ch == '\t') {
                if (state === STATE_NAME) {
                    state = STATE_WAIT_VALUE;
                }
                else if (state === STATE_VALUE) {
                    value_buf.push(ch);
                }
                // ok. no action.
                else {
                }
            }
            else if (ch == '\r' || ch == '\n') {
                throw new errors.NodeError("parseNameValue error. Invalid char. Line cannot contain line breaks. Source: " + text, node);
            }
            else {
                if (state === STATE_WAIT_NAME) {
                    state = STATE_NAME;
                    name_buf.push(ch);
                }
                else if (state === STATE_WAIT_VALUE) {
                    state = STATE_VALUE;
                    value_buf.push(ch);
                }
                else if (state === STATE_NAME) {
                    name_buf.push(ch);
                }
                else if (state === STATE_VALUE) {
                    value_buf.push(ch);
                }
                else if (state === STATE_ENDED) {
                    throw new errors.NodeError("parseNameValue error. Invalid char after value. Source: " + text, node);
                }
            }
        }
    }
    
    // This almost surely is an error, but we cannot judge.
    if (q !== null && state === STATE_NAME) {
    }
    return {
            name: function() {
                return name_buf.join('');
            }, 
            value: function() {
                return value_buf.join('');
            }, 
            hasValue: function() {
                return value_buf.length > 0;
            }
         };
}
;
function escapename(value) {
    if (verify.isNotEmpty(value)) {
        return verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"');
    }
    else {
        return value;
    }
}
