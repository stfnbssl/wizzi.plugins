var path = require('path');
var wizzi = require("wizzi");
var wizziUtils = require("wizzi-utils");
var file = wizziUtils.fSystem.file;

var baseSearchPath = path.join(__dirname, '..');
var result = {
    wizziPackages: []
}
console.log("baseSearchPath", baseSearchPath);
var folders = file.getFolders(
    baseSearchPath,
    { deep: false }
);

// console.log("folders", folders);
folders.forEach(folderName => {
    var packagedata = detectWizziPackage(folderName, baseSearchPath);
    if (packagedata.ok) {
        result.wizziPackages.push(packagedata.item);
        var schemasData = detectSchemas(packagedata.item.fullPath, packagedata);
        // console.log("schemasData.schemas", schemasData.schemas);
        packagedata.item.schemas = [];
        for (var k in schemasData.schemas) {
            packagedata.item.schemas.push(schemasData.schemas[k]);
        }
        var artifactsData = { ok: false, artifacts: {}, transformations: {} };
        detectArtifacts(packagedata, ".wizzi", artifactsData);
        detectArtifacts(packagedata, ".wizzi-override", artifactsData);
        if (artifactsData.ok) {
            packagedata.item.artifacts = []
            packagedata.item.transformations = []
            for (var k in artifactsData.artifacts) {
                packagedata.item.artifacts.push(artifactsData.artifacts[k]);
            }
            for (var k in artifactsData.transformations) {
                packagedata.item.transformations.push(artifactsData.transformations[k]);
            }
        }
        var wizzifierData = { ok: false, wizzifiers: {} };
        detectWizzifier(packagedata, ".wizzi-override", wizzifierData);
        if (wizzifierData.ok) {
            packagedata.item.wizzifiers = []
            for (var k in wizzifierData.wizzifiers) {
                packagedata.item.wizzifiers.push(wizzifierData.wizzifiers[k]);
            }
        }
    }
})

function detectWizziPackage(folderName, folderPath) {
    var data = { ok: false };
    var folders = file.getFolders(
        path.join(folderPath, folderName),
        { deep: false }
    );
    folders.forEach(childFolderName => {
        // console.log("childFolderName", childFolderName);
        if (childFolderName == '.wizzi') {
            data.ok = true;
            data.item = { 
                name: folderName,
                fullPath: path.join(folderPath, folderName),
                hasWizziOverride: false,
                wizziConfigFiles: []
            } ;
        }
        if (childFolderName == '.wizzi-override') {
            data.ok = true;
            data.item = { 
                name: folderName,
                fullPath: path.join(folderPath, folderName),
                hasWizziOverride: true,
                wizziConfigFiles: []
            } ;
        }
    })
    var files = file.getFiles(
        path.join(folderPath, folderName),
        { deep: false }
    );
    files.forEach(childFileName => {
        // console.log("childFileName", childFileName);
        if (childFileName.startsWith('wizzi.config.')) {
            var fullPath = path.join(folderPath, folderName, childFileName);
            data.item.wizziConfigFiles.push({
                name: childFileName,
                fullPath: fullPath,
                content: require(fullPath)
            });
        }
    })
    return data;
}

function detectSchemas(packageFolder, packageData) {
    var data = { ok: false, schemas: {} };
    
    // Detect from wizzi.config files
    // console.log("packageData", packageData)
    packageData.item.wizziConfigFiles.forEach(configFileObj => {
        var configModule = require(configFileObj.fullPath);
        // console.log("configModule", configModule && configModule.schemas)
        if (configModule.schemas) {
            configModule.schemas.forEach(schema => {
                if (data.schemas[schema] && data.schemas[schema].fullPath.indexOf('.wizzi-override') > -1 ) {
                    // skip
                } else {
                    data.schemas[schema] = {
                        name: schema,
                        fullPath: path.join(path.dirname(configModule.wfjobPath), 'lib', 'wizzi', 'schemas', schema + '.wfschema.ittf'),
                        genConfig: configFileObj.name
                    };
                    try {data.schemas[schema].content = file.read(data.schemas[schema].fullPath);} catch {}
                }
            });
        }
    });

    return data;
}

function detectArtifacts(packageData, wizziFolder, artifactData) {
    
    var artifactsFolder = path.join(packageData.item.fullPath, wizziFolder, 'lib', 'artifacts');
    var artifactFolderSchemas = file.getFolders(
        artifactsFolder,
        { deep: false }
    );
    artifactFolderSchemas.forEach(schema => {
        // console.log("detectArtifacts.schema", schema);
        var artifactsFolderArtifacts = path.join(packageData.item.fullPath, wizziFolder, 'lib', 'artifacts', schema);
        var artifactFolderSchemaArtifacts = file.getFolders(
            artifactsFolderArtifacts,
            { deep: false }
        );
        artifactFolderSchemaArtifacts.forEach(artifact => {
            // console.log("detectArtifacts.artifact", artifact);
            var artifactsFolderArtifactsGenOrTrans = path.join(packageData.item.fullPath, wizziFolder, 'lib', 'artifacts', schema, artifact);
            var artifactFolderSchemaArtifactGenOrTrans = file.getFolders(
                artifactsFolderArtifactsGenOrTrans,
                { deep: false }
            );
            artifactFolderSchemaArtifactGenOrTrans.forEach(genortrans => {
                // console.log("detectArtifacts.genortrans", genortrans);
                if (genortrans == 'gen') {
                    artifactData.ok = true;
                    var artifactFullPath = path.join(packageData.item.fullPath, wizziFolder, 'lib', 'artifacts', schema, artifact, 'gen', 'main.js.ittf');
                    var key = schema + '/' + artifact;
                    artifactData.artifacts[key] ={
                        name: key,
                        schema: schema,
                        artifact: artifact,
                        fullPath: artifactFullPath,
                        content: file.read(artifactFullPath)
                    };
                }
                if (genortrans == 'trans') {
                    artifactData.ok = true;
                    var artifactFullPath = path.join(packageData.item.fullPath, wizziFolder, 'lib', 'artifacts', schema, artifact, 'trans', 'main.js.ittf');
                    var key = schema + '/' + artifact;
                    artifactData.transformations[key] ={
                        name: key,
                        schema: schema,
                        artifact: artifact,
                        fullPath: artifactFullPath,
                        content: file.read(artifactFullPath)
                    };
                }
            })
        });
    });
    
}

function detectWizzifier(packageData, wizziFolder, wizzifierData) {
    
    var wizzifiersFolder = path.join(packageData.item.fullPath, wizziFolder, 'lib', 'wizzifiers');
    if (file.exists(wizzifiersFolder)) {
        var wizzifierFolderSchemas = file.getFolders(
            wizzifiersFolder,
            { deep: false }
        );
        wizzifierFolderSchemas.forEach(schema => {
            var wizzifierFullPath = path.join(packageData.item.fullPath, wizziFolder, 'lib', 'wizzifiers', schema, 'wizzifier.js.ittf');
            if (file.exists(wizzifierFullPath)) {
                wizzifierData.ok = true;
                var key = schema;
                wizzifierData.wizzifiers[key] = {
                    name: key,
                    schema: schema,
                    fullPath: wizzifierFullPath,
                    content: file.read(wizzifierFullPath)
                };
            }
        });
    }
    
}

file.write('scaffolding.json', JSON.stringify(result, null, 4));
file.write('C:/My/wizzi/stfnbssl/wizzi.cli/packages/wizzi.cli.meta/src/cmds/data/wizzi.plugins.data.json', JSON.stringify(result, null, 4));

