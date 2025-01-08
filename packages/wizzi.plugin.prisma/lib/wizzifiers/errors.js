/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.prisma\.wizzi-override\lib\wizzifiers\errors.js.ittf
    utc time: Sat, 14 Dec 2024 12:38:23 GMT
*/
var util = require('util');

var md = module.exports = {};

function FileError(message, ex) {
    this.name = 'FileError';
    this.message = message;
    this.inner = ex;
    // 5/8/17 set this.stack = (new Error()).stack
}
FileError.prototype.toString = function() {
    return this.message;
}
;
FileError.prototype = Object.create(Error.prototype);
FileError.prototype.constructor = FileError;
md.FileError = FileError;

function NodeError(message, node) {
    this.name = 'NodeError';
    var msg = [
        message
    ];
    if (node) {
        if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            var filePath = 'TODO';
            if (node.wzSourceFilepath) {
                filePath = node.wzSourceFilepath(info.sourceKey);
            }
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + filePath));
        }
        else if (node.row) {
            msg.push((' at row: ' + node.row));
            msg.push((', col: ' + node.col));
        }
    }
    this.message = msg.join('');
    // loog 'NodeError', this.message
    // set this.node = node
    // 5/8/17 set this.stack = (new Error()).stack
}
NodeError.prototype.toString = function() {
    return this.message;
}
;
NodeError.prototype = Object.create(Error.prototype);
NodeError.prototype.constructor = NodeError;
md.NodeError = NodeError;
