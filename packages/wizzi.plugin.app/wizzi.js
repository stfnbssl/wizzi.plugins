/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: json:/___template/wizzi.js.ittf
    utc time: Mon, 20 Jan 2025 16:28:10 GMT
*/
const path = require('path');
const util = require('util');
const fs = require('fs');
const async = require('async');
const chalk = require('chalk');
const wizzi = require('@wizzi/factory');
let arg = process.argv[2];
var configPath = getPath(arg);
if (configPath) {
    generate(configPath)
}
else {
    console.log("[31m%s[0m", `config file "wizzi.config.' + (arg ? arg + '.' : '') + 'js" not found`);
}
function getPath(name) {
    let configFilename = name ? 'wizzi.config.' + name + '.js' : 'wizzi.config.js';
    let currentDir = process.cwd();
    let currentPath = null;
    let configPath = null;
    // loog 'searching ', configFilename
    while (configPath == null && currentDir.length > 3) {
        currentPath = path.join(currentDir, configFilename);
        try {
            // loog 'wizzi-cli.generate.searching', currentPath
            const stat = fs.lstatSync(currentPath);
            if (stat.isFile()) {
                configPath = currentPath;
            }
        } 
        catch (ex) {
        } 
        currentDir = path.dirname(currentDir);
    }
    return configPath;
}
function generate(configPath) {
    const configInstance = require(configPath);
    console.log('wizzi-cli.generate.configInstance', configInstance, __filename);
    const x_pluginsBaseFolder = configInstance.pluginsBaseFolder || __dirname;
    if (!configInstance.pluginsBaseFolder) {
        console.log(chalk.red('wizzi-cli.generate - pluginsBaseFolder not set'))
        console.log(chalk.red('wizzi-cli.generate - pluginsBaseFolder defaulted to ' + x_pluginsBaseFolder))
    }
    var x_pluginsItems = [];
    if (configInstance.plugins && configInstance.plugins.length > 0) {
        x_pluginsItems = configInstance.plugins;
    }
    // TODO
    else {
        x_pluginsItems.push('@wizzi/plugin.js');
        chalk.red('wizzi-cli.generate - plugins not found in wizzi.config')
        chalk.red('wizzi-cli.generate - using default plugins: "wizzi-core", "wizzi-js", "wizzi-web"')
    }
    wizzi.executeWizziJob({
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: __dirname, 
            plugins: x_pluginsItems, 
            pluginsBaseFolder: x_pluginsBaseFolder
         }, 
        job: {
            name: configInstance.wzjobName, 
            ittfDocumentUri: configInstance.wzjobPath, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2, 
                dumps: {
                    dumpsBaseFolder: path.join(__dirname, '_dumps'), 
                    mTreeBuildUpJsWizziScript: {
                        dump: false
                     }
                 }
             }), 
            globalContext: configInstance.globalContext
         }
     }, function(err) {
        if (err) {
            return wizzi.printWizziJobError(configInstance.wzjobName, err);
        }
        if (configInstance.schemas && configInstance.schemas.length > 0) {
            generateSchemas(configInstance.schemas, path.dirname(configInstance.wzjobPath), configInstance.destPath, configInstance.packageName || configInstance.wzjobName, {
                items: x_pluginsItems, 
                baseFolder: x_pluginsBaseFolder
             })
        }
    })
}
function generateSchemas(schemasToGen, wfJobFolder, destPath, packageName, plugins) {
    async.mapSeries(schemasToGen, function(schemaName, callback) {
        console.log('wizzi-cli.generate.Generating schema ' + schemaName);
        var options = {};
        if (plugins) {
            options = {
                plugins: plugins.items, 
                pluginsBaseFolder: plugins.baseFolder
             };
        }
        wizzi.generateWizziModelTypes({
            configOptions: options, 
            wfschema: {
                name: schemaName, 
                ittfDocumentUri: path.join(wfJobFolder, 'lib', 'wizzi', 'schemas', schemaName + '.wzschema.ittf'), 
                outputPackageFolder: destPath
             }
         }, function(err, result) {
            if (err) {
                throw new Error('Package: ' + packageName + ' schema ' + schemaName + '  wizzi models production error: ' + (util.inspect(err, {
                        depth: null
                     })));
            }
            // loog 'wizzi-cli.generate.Generate schema result', result
            callback(null, result);
        })
    }, function(err, result) {
        if (err) {
            wizzi.printWizziJobError($name, err);
        }
    })
}