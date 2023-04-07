/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.html\.wizzi-override\lib\wizzifiers\html\parser.js.ittf
    utc time: Fri, 07 Apr 2023 18:44:40 GMT
*/
'use strict';
var util = require('util');
var verbose = false;
function log(label, data) {
    if (verbose) {
        console.log(label, util.inspect(data, {
            depth: null
         }))
    }
}
var md = module.exports = {};
var priv = {};
var START = 0;
var WAIT_TAG_NAME = 1;
var TAG_NAME = 2;
var ENDTAG_NAME = 3;
var WAIT_ATTR_NAME = 4;
var ATTR_NAME = 5;
var WAIT_ATTR_EQU = 6;
var WAIT_ATTR_VALUE = 7;
var ATTR_VALUE = 8;
var TEXT = 9;
var WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE = 10;
var DOCTYPE = 11;
var START_COMMENT_1 = 21;
var START_COMMENT_2 = 22;
var COMMENT = 24;
var END_COMMENT_1 = 25;
var END_COMMENT_2 = 26;
var COULD_BE_ENDOFTEXT = 31;
var START_SWIG_1 = 41;
var SWIG = 42;
var END_SWIG_1 = 43;
var stateText = {
    n0: "START", 
    n1: "WAIT_TAG_NAME", 
    n2: "TAG_NAME", 
    n3: "ENDTAG_NAME", 
    n4: "WAIT_ATTR_NAME", 
    n5: "ATTR_NAME", 
    n6: "WAIT_ATTR_EQU", 
    n7: "WAIT_ATTR_VALUE", 
    n8: "ATTR_VALUE", 
    n9: "TEXT", 
    n10: "WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE", 
    n11: "DOCTYPE", 
    n12: "START_COMMENT_1", 
    n13: "START_COMMENT_2", 
    n24: "COMMENT", 
    n25: "END_COMMENT_1", 
    n26: "END_COMMENT_2", 
    n31: "COULD_BE_ENDOFTEXT", 
    n41: "START_SWIG_1", 
    n42: "SWIG", 
    n43: "END_SWIG_1"
 };
md.Parser = function(handlers) {
    this.handlers = handlers;
}
;
md.Parser.prototype.write = function(input) {
    var state = {
        input: input, 
        pos: 0, 
        cur: START, 
        prev: null, 
        stack: [], 
        line: 1, 
        col: 0, 
        currenttagname: null, 
        tagcount: 0, 
        chprev: null
     };
    priv.resetStateOpenTag(state);
    for (var k in this.handlers) {
        state[k] = this.handlers[k];
    }
    var ch,
        i,
        l = input.length;
    while (true) {
        if (state.pos >= l) {
            return ;
        }
        i = state.pos;
        ch = input[i];
        state.pos++;
        // loog 'main', 'pos,line,col', state.pos, state.line, state.col, 'ch,state', ch, stateText['n'+state.cur], 'currenttagname', state.currenttagname, 'state.quote', state.quote
        
        // loog '+COULD_BE_ENDOFTEXT, ch', ch
        if (state.cur === COULD_BE_ENDOFTEXT) {
            if (ch === '/') {
                priv.ontext(state);
                priv.resetStateOpenTag(state);
                state.cur = WAIT_TAG_NAME;
            }
            else {
                if (isOpenTag(input, l, i)) {
                    priv.ontext(state);
                    priv.resetStateOpenTag(state);
                    state.cur = WAIT_TAG_NAME;
                }
                else if (isOpenComment(input, l, i)) {
                    state.cur = WAIT_TAG_NAME;
                }
                else {
                    state.cur = TEXT;
                    state.text += '<';
                }
            }
        }
        else if (state.cur === START_SWIG_1 && ch !== '%') {
            if (state.prev === null) {
                priv.error("Missing prev state on START_SWIG_1" + stateText['n'+state.cur], state);
            }
            state.cur = state.prev;
            priv.append('{', state);
        }
        priv.loop(ch, state);
        state.chprev = ch;
    }
}
;
md.Parser.prototype.end = function() {
}
;
priv.resetStateOpenTag = function(state) {
    state.quote = null;
    state.tagname = null;
    state.attrname = null;
    state.attrvalue = null;
    state.text = null;
    state.attribs = {};
}
;
priv.loop = function(ch, state) {
    state.col++;
    // loog 'priv.loop', ch, stateText['n'+state.cur], state.pos, state.quote
    
    // loog '===================================rn', ch === '\r', ch === '\n'
    if (ch === '\r' || ch === '\n') {
        
        // loog '===================================n prev r'
        if (ch === '\n' && state.chprev === '\r') {
            return ;
        }
        state.line++;
        state.col = 0;
    }
    
    // loog ch, "is specialCases"
    if (priv.specialCases(ch, state)) {
        return ;
    }
    if (ch === '<') {
        priv.doLT(state);
    }
    else if (ch === '>') {
        if (state.cur === TEXT) {
            priv.append(ch, state);
        }
        else {
            priv.doGT(state);
        }
    }
    else if (ch === '/') {
        priv.doSlash(state);
    }
    else if (ch === '=') {
        priv.doEq(state);
    }
    else if (ch === '!') {
        priv.doExclamation(state);
    }
    else if (ch === '-') {
        priv.doMinus(state);
    }
    else if (ch === ':') {
        priv.doSemicolon(state);
    }
    else if (ch === '{') {
        priv.doOpenGraph(state);
    }
    else if (ch === '}') {
        priv.doCloseGraph(state);
    }
    else if (ch === '%') {
        priv.doPercent(state);
    }
    else if (ch === '\\') {
        priv.doEscape(ch, state);
    }
    
    // _ priv.doLF(state)
    else if (ch === '\r' || ch === '\n') {
        priv.doWhite(ch, state);
    }
    else if (isWhite(ch)) {
        priv.doWhite(ch, state);
    }
    else if (isQuote(ch)) {
        priv.doQuote(ch, state);
    }
    else {
        priv.append(ch, state);
    }
}
;
priv.specialCases = function(ch, state) {
    // loog 'specialCases.state.currenttagname', state.currenttagname
    if (state.currenttagname === 'script' || state.currenttagname === 'style') {
        
        // loog 'isEndTag', state.currenttagname
        
        // (NO done in priv.onclosetag) _ state.stack.pop
        if (isEndTag(state.currenttagname, ch, state)) {
            priv.ontext(state);
            priv.resetStateOpenTag(state);
            state.cur = TEXT;
            priv.onclosetag(state);
            return true;
        }
        else {
            state.text = (state.text || '') + ch;
            return true;
        }
    }
    
    // loog 'TEXT', ch, state.quote, state.text.length
    if (state.cur === TEXT && state.text) {
    }
    if (state.cur === COMMENT && ch !== '-') {
        state.comment = (state.comment || '') + ch;
        return true;
    }
    if (state.cur === TEXT && state.quote != null) {
        state.text = (state.text || '') + ch;
        if (ch === state.quote) {
            state.quote = null;
        }
        return true;
    }
    if (state.cur === TEXT && isQuote(ch) && (state.currenttagname === 'script' || state.currenttagname === 'style')) {
        state.text = (state.text || '') + ch;
        return true;
    }
    if (state.cur === ATTR_VALUE && state.quote != null && ch !== state.quote) {
        if (ch !== '\\') {
            state.attrvalue = (state.attrvalue || '') + ch;
        }
        return true;
    }
    if (state.cur === START_COMMENT_1 && ch !== '-') {
        if (state.tagcount == 0) {
            state.cur = DOCTYPE;
        }
        else {
            state.text = (state.text || '') + "<!";
            state.cur = TEXT;
        }
    }
    else if (state.cur === START_COMMENT_2 && ch !== '-') {
        state.text = (state.text || '') + "<!-";
        state.cur = TEXT;
    }
    else if ((state.cur === END_COMMENT_1) && (ch !== '-')) {
        state.comment = (((state.comment || '')) + "-");
        state.cur = COMMENT;
    }
    else if ((state.cur === END_COMMENT_2) && (ch !== '>')) {
        state.comment = (((state.comment || '')) + "--");
        state.cur = COMMENT;
    }
    return false;
}
;
priv.doLT = function(state) {
    // loog 'doLT', state.cur
    if (state.cur === START) {
        ;
    }
    
    // loog 'doLT', state.cur
    else if (state.cur === TEXT) {
        state.cur = COULD_BE_ENDOFTEXT;
        return ;
    }
    
    // be tolerant
    else if (state.cur === WAIT_ATTR_EQU) {
        state.attribs[state.attrname] = null;
        priv.onopentag(state);
    }
    else {
        priv.error("doLT invalid state.cur " + stateText['n'+state.cur], state);
    }
    state.cur = WAIT_TAG_NAME;
}
;
priv.doGT = function(state) {
    if (state.cur === TAG_NAME) {
        priv.onopentag(state);
    }
    else if (state.cur === WAIT_ATTR_NAME || state.cur === WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE) {
        priv.onopentag(state);
        if (state.cur === WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE) {
            priv.onclosetag(state);
        }
    }
    else if (state.cur === ATTR_NAME) {
        state.attribs[state.attrname] = null;
        priv.onopentag(state);
    }
    else if (state.cur === ATTR_VALUE) {
        priv.onopentag(state);
    }
    else if (state.cur === ENDTAG_NAME) {
        state.stack.pop();
        priv.onclosetag(state);
    }
    else if (state.cur === END_COMMENT_2) {
        priv.oncomment(state);
        state.comment = null;
    }
    else if (state.cur === DOCTYPE) {
        priv.ondoctype(state);
        state.doctype = null;
    }
    else {
        priv.error("doGT invalid state.cur " + stateText['n'+state.cur], state);
    }
    state.cur = TEXT;
}
;
priv.doSlash = function(state) {
    // loog 'doSlash', state.tag, state.cur, state.quote, state.attrname, state.attrvalue
    if (state.cur === ATTR_VALUE && state.quote == null) {
        state.attribs[state.attrname] = state.attrvalue;
        state.attrname = state.attrvalue = null;
        state.cur = WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE;
    }
    else if (state.cur === WAIT_TAG_NAME) {
        state.cur = ENDTAG_NAME;
    }
    else if (state.cur === TAG_NAME) {
        state.cur = WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE;
    }
    else if (state.cur === WAIT_ATTR_NAME) {
        state.cur = WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE;
    }
    else {
        priv.append('/', state);
    }
}
;
priv.doExclamation = function(state) {
    if (state.cur === WAIT_TAG_NAME) {
        state.cur = START_COMMENT_1;
    }
    else {
        priv.append('!', state);
    }
}
;
priv.doMinus = function(state) {
    if (state.cur === COMMENT) {
        state.cur = END_COMMENT_1;
    }
    else if (state.cur === END_COMMENT_1) {
        state.cur = END_COMMENT_2;
    }
    else if (state.cur === START_COMMENT_1) {
        state.cur = START_COMMENT_2;
    }
    else if (state.cur === START_COMMENT_2) {
        state.cur = COMMENT;
    }
    else if (state.cur === TAG_NAME || state.cur === ENDTAG_NAME) {
        state.tagname = (state.tagname || '') + '-';
    }
    else {
        priv.append('-', state);
    }
}
;
priv.doSemicolon = function(state) {
    if (state.cur === TAG_NAME || state.cur === ENDTAG_NAME) {
        state.tagname = (state.tagname || '') + ':';
    }
    else {
        priv.append(':', state);
    }
}
;
priv.doOpenGraph = function(state) {
    if (state.cur === START || state.cur === TEXT || state.cur === WAIT_ATTR_NAME) {
        state.prev = state.cur;
        state.preSwig = state.cur;
        state.cur = START_SWIG_1;
    }
    else {
        priv.append('{', state);
    }
}
;
priv.doCloseGraph = function(state) {
    if (state.cur === END_SWIG_1) {
        priv.onswig(state);
        state.cur = state.preSwig;
        state.preSwig = null;
    }
    else {
        priv.append('}', state);
    }
}
;
priv.doPercent = function(state) {
    if (state.cur === START_SWIG_1) {
        priv.ontext(state);
        state.cur = SWIG;
    }
    else if (state.cur === SWIG) {
        state.cur = END_SWIG_1;
    }
    else {
        priv.append('%', state);
    }
}
;
priv.doEq = function(state) {
    if ((state.cur === ATTR_NAME) || (state.cur === WAIT_ATTR_EQU)) {
        state.cur = WAIT_ATTR_VALUE;
    }
    else {
        priv.append('=', state);
    }
}
;
priv.doWhite = function(ch, state) {
    // loog 'doWhite', ch, state.cur
    if (state.cur === START) {
        ;
    }
    else if (state.cur === TAG_NAME) {
        state.cur = WAIT_ATTR_NAME;
    }
    else if (state.cur === ENDTAG_NAME) {
        ;
    }
    else if (state.cur === ATTR_NAME) {
        state.cur = WAIT_ATTR_EQU;
    }
    else if (state.cur === WAIT_ATTR_EQU) {
        ;
    }
    else if (state.cur === ATTR_VALUE && state.quote == null) {
        state.attribs[state.attrname] = state.attrvalue;
        state.attrname = state.attrvalue = null;
        state.cur = WAIT_ATTR_NAME;
    }
    else {
        priv.append(ch, state);
    }
}
;
priv.doLF = function(state) {
    // loog 'doLf'
    if (state.cur === START) {
        ;
    }
    else {
        priv.append('\n', state);
    }
}
;
priv.doQuote = function(ch, state) {
    // loog 'doQuote', ch, state.cur
    if (state.cur === WAIT_ATTR_VALUE) {
        state.cur = ATTR_VALUE;
        state.quote = ch;
    }
    else if (state.cur === ATTR_VALUE && state.quote === ch) {
        state.attribs[state.attrname] = state.attrvalue;
        state.attrname = state.attrvalue = null;
        state.cur = WAIT_ATTR_NAME;
        state.quote = null;
    }
    else {
        priv.append(ch, state);
    }
}
;
priv.doEscape = function(ch, state) {
    // loog 'doEscape', ch, state.cur
    
    // do nothing for now
    if (state.cur === WAIT_ATTR_VALUE || state.cur === WAIT_EMPTY_ELEMENT_TAG_RIGHT_CLOSE) {
    }
    else {
        priv.append(ch, state);
    }
}
;
priv.append = function(ch, state) {
    if (state.cur === WAIT_TAG_NAME) {
        state.tagname = ch;
        state.cur = TAG_NAME;
    }
    else if (state.cur === TAG_NAME || state.cur === ENDTAG_NAME) {
        state.tagname = (state.tagname || '') + ch;
    }
    else if (state.cur === WAIT_ATTR_NAME) {
        if (!(isWhite(ch))) {
            state.attrname = ch;
            state.cur = ATTR_NAME;
        }
    }
    else if (state.cur === ATTR_NAME) {
        state.attrname = (state.attrname || '') + ch;
    }
    else if (state.cur === WAIT_ATTR_EQU) {
        state.attribs[state.attrname] = null;
        state.cur = ATTR_NAME;
        state.attrname = ch;
    }
    else if (state.cur === WAIT_ATTR_VALUE) {
        state.cur = ATTR_VALUE;
        state.quote = null;
    }
    else if (state.cur === ATTR_VALUE) {
        state.attrvalue = (state.attrvalue || '') + ch;
    }
    else if (state.cur === TEXT) {
        state.text = (state.text || '') + ch;
    }
    else if (state.cur === COMMENT) {
        state.comment = (state.comment || '') + ch;
    }
    else if (state.cur === DOCTYPE) {
        state.doctype = (state.doctype || '') + ch;
    }
    else if (state.cur === SWIG) {
        state.swig = (state.swig || '') + ch;
    }
    else {
        priv.error("append invalid ch: " + ch + " state.cur: " + stateText['n'+state.cur], state);
    }
}
;
priv.onopentag = function(state) {
    state.tagcount++;
    state.stack.push(state.tagname)
    
    // loog 'onopentag', state.tagname, 'line', state.line
    if (state.tagname == 'script' || state.tagname == 'style') {
    }
    state.currenttagname = state.tagname;
    if (state.onopentag) {
        state.onopentag(state.tagname, state.attribs)
    }
    if (state.tagname in voidElements) {
        if (state.onclosetag) {
            state.stack.pop();
            state.onclosetag(state.tagname)
        }
    }
}
;
priv.onclosetag = function(state) {
    
    // loog 'onclosetag', state.tagname, 'line', state.line
    if (state.tagname == 'script' || state.tagname == 'style') {
    }
    if (state.onclosetag) {
        
        // done already
        if (state.tagname in voidElements) {
        }
        // loog 'state.stack after onclosetag', state.stack
        else {
            state.stack.pop();
            state.onclosetag(state.tagname)
            state.currenttagname = null;
        }
    }
}
;
priv.oncomment = function(state) {
    if (state.oncomment) {
        state.oncomment(state.comment)
    }
}
;
priv.ondoctype = function(state) {
    if (state.ondoctype) {
        state.ondoctype(state.doctype)
    }
}
;
priv.ontext = function(state) {
    if (typeof (state.text) == 'undefined' || state.text == null) {
        return ;
    }
    if (state.text.length == 0) {
        return ;
    }
    if (state.ontext) {
        state.ontext(state.text)
    }
    state.text = '';
}
;
priv.onswig = function(state) {
    if (state.onswig) {
        state.onswig(state.swig)
    }
    state.swig = '';
}
;
priv.error = function(message, state) {
    delete state.input
    // loog 'current state', state
    throw new Error(message + ' at line ' + state.line + ' col ' + state.col + ' text ' + state.text);
}
;
function isText(text) {
    var ch,
        l = text.length;
    for (var i = 0; i < l; i++) {
        ch = text[i];
        if (ch !== ' ' && ch !== '\t' && ch !== '\n' && ch !== '\r') {
            return true;
        }
    }
    return false;
}
var tagNameRegExp = /^[a-zA-Z0-9-:]*$/;
function isOpenTag(input, len, start) {
    var i = start;
    var ch = input[i];
    var tag = '';
    while (i < len && ch !== '>' && isWhite(ch) == false) {
        tag += ch;
        ch = input[++i];
    }
    // loog 'isOpenTag', tag, ch
    if (tag.substr(-1, 1) == '/') {
        var ttag = tag.substr(0, tag.length - 1);
        var istag = tagNameRegExp.test(ttag);
        return istag;
    }
    var istag = tagNameRegExp.test(tag);
    // loog 'isOpenTag.istag', tag, istag
    return istag;
}
function isOpenComment(input, len, start) {
    return (len - start) > 3 && input.substr(start, 3) === '!--';
}
function isEndTag(tagName, ch, state) {
    // loog 'isEndTag 1', ch, state.pos-1
    if (ch != '<') {
        return false;
    }
    var ch2 = state.input[state.pos];
    // loog 'isEndTag 2', ch2, state.pos
    if (ch2 != '/') {
        return false;
    }
    for (var i = 0; i < tagName.length; i++) {
        ch2 = state.input[state.pos+1+i];
        // loog 'isEndTag 3', ch2, state.pos+1+i, i, tagName.length, tagName
        if (isTagChar(ch2) == false) {
            return false;
        }
    }
    ch2 = state.input[state.pos+1+tagName.length];
    // loog 'isEndTag 4', ch2
    if (ch2 != '>') {
        return false;
    }
    // loog 'isEndTag 5', true
    state.pos += 2+tagName.length;
    return true;
}
function isTagChar(ch) {
    return ch.match(/[_]|[a-zA-Z]/i);
}
function isWhite(ch) {
    return (ch === ' ') || (ch === '\t') || (ch === '\r') || (ch === '\n');
}
function isQuote(ch) {
    return (ch === '"') || (ch === '\'');
}
var voidElements = {
    __proto__: null, 
    area: true, 
    base: true, 
    basefont: true, 
    br: true, 
    col: true, 
    command: true, 
    embed: true, 
    frame: true, 
    hr: true, 
    img: true, 
    input: true, 
    isindex: true, 
    keygen: true, 
    link: true, 
    meta: true, 
    param: true, 
    source: true, 
    track: true, 
    wbr: true, 
    path: true, 
    circle: true, 
    ellipse: true, 
    line: true, 
    rect: true, 
    use: true, 
    stop: true, 
    polyline: true, 
    polygone: true
 };
