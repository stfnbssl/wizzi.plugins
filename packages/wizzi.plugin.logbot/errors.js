/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.logbot\.wizzi-override\root\errors.js.ittf
    utc time: Fri, 24 Jan 2025 15:11:09 GMT
*/

var util = require('util');
var stringify = require('json-stringify-safe');
var chalk = require('chalk');

var md = module.exports = {};
md.name = 'wizzi.plugin.logbot.errors';

class WizziPluginError extends Error {
    constructor(message, model, other) {
        super(message);
        this.name = "WizziPluginError";
        // legacy error test
        this.__is_error = true;
        this.data = {
            model, 
            ...other||{}
         };
        Error.captureStackTrace(this, this.constructor);
        if (model) {
            this.errorLines = [
                'TODO'
            ];
        }
    }
    toString() {
        var msg = [];
        msg.push(chalk.red('Error: ' + this.message));
        msg.push(chalk.red('  name: ' + this.data.errorName));
        if (this.data.model) {
        }
        else if (this.data.uri) {
            msg.push(chalk.yellow('  uri: ' + this.data.uri));
        }
        else {
            msg.push(chalk.yellow('  uri: unknown'));
        }
        if (this.errorLines) {
            var i, i_items=this.errorLines, i_len=this.errorLines.length, line;
            for (i=0; i<i_len; i++) {
                line = this.errorLines[i];
                msg.push(chalk.yellow('  ' + line));
            }
        }
        if (this.data.errorName === 'JsWizziError') {
            msg.push(chalk.yellow('  onStatement: ' + this.data.onStatement));
        }
        if (this.data.inner) {
            msg.push(chalk.magenta('  Inner error: ' + this.data.inner.name + ': ' + this.data.inner.message));
        }
        return msg.join('\n');
    }
}
md.WizziPluginError = WizziPluginError;
class InternalWizziPluginError extends WizziPluginError {
    constructor(error) {
        super(error.message);
        this.data = {
            error
         };
    }
}
md.InternalWizziPluginError = InternalWizziPluginError;