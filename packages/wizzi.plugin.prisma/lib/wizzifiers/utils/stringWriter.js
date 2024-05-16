/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.prisma\.wizzi-override\lib\wizzifiers\utils\stringWriter.js.ittf
    utc time: Wed, 15 May 2024 12:22:05 GMT
*/
'use strict';
class StringWriter {
    constructor(text) {
        this.buffer = [];
        if (text) {
            this.buffer.push(text);
        }
    }
    write(text) {
        this.buffer.push(text);
    }
    toString() {
        return this.buffer.join('');
    }
}
module.exports = StringWriter;
