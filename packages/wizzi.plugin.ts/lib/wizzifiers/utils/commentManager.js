/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\wizzifiers\utils\commentManager.js.ittf
    utc time: Tue, 07 Jan 2025 04:22:48 GMT
*/
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var CommentManager = (function () {
    function CommentManager() {
        _classCallCheck(this, CommentManager);
        this.written = [];
    }
    CommentManager.prototype.addWritten = function(c, ittfCollection, ittfNode) {
        this.written.push({
            c: c, 
            ittfCollection: ittfCollection, 
            ittfNode: ittfNode
         })
    }
    CommentManager.prototype.checkWritten = function(c) {
        var i, i_items=this.written, i_len=this.written.length, item;
        for (i=0; i<i_len; i++) {
            item = this.written[i];
            if (c.start == item.c.start && c.end == item.c.end) {
                return true;
            }
        }
        return false;
    }
    CommentManager.prototype.removeWritten = function(c) {
        var i, i_items=this.written, i_len=this.written.length, item;
        for (i=0; i<i_len; i++) {
            item = this.written[i];
            if (c.start == item.c.start && c.end == item.c.end) {
                var index = item.ittfCollection.indexOf(item.ittfNode);
                if (index > -1) {
                    item.ittfCollection.splice(index, 1);
                }
            }
        }
    }
    CommentManager.prototype.isOneLine = function(c) {
        return c.loc.start.line == c.loc.end.line;
    }
    CommentManager.prototype.leadingIsInline = function(c, node) {
        // loog 'leadingIsInline', c.value, c.loc.start.line, c.loc.end.line, node.type, node.loc.start.line, node.loc.end.line
        return c.loc.end.line ==  node.loc.start.line;
    }
    CommentManager.prototype.trailingIsInline = function(c, node) {
        // loog 'trailingIsInline', c.value, c.loc.start.line, c.loc.end.line, node.type, node.loc.start.line, node.loc.end.line
        return c.loc.start.line ==  node.loc.end.line;
    }
    return CommentManager;
})();

module.exports = CommentManager;