/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ppt\.wizzi-override\examples\getData.js.ittf
    utc time: Fri, 06 Jun 2025 19:59:24 GMT
*/
var path = require('path');
var wizziUtils = require('@wizzi/utils');
var vfile = wizziUtils.vfile;
var fsfile =vfile();
fsfile.getFiles("C:/Users/Stefano Bassoli/Pictures/obesi", {}, (err, files) => {
    if (err) {
        return callback(err);
    }
    console.log('files', files, __filename);
    const sb = [];
    sb.push('{');
    sb.push('\t[ slides');
    var i, i_items=files, i_len=files.length, file;
    for (i=0; i<i_len; i++) {
        file = files[i];
        sb.push('\t\t{');
        sb.push('\t\t\t[ objects');
        sb.push('\t\t\t\t{');
        sb.push('\t\t\t\t\tkind "image"');
        sb.push('\t\t\t\t\tposition "full"');
        sb.push('\t\t\t\t\tpath "' + file.fullPath.replaceAll('\\', '/') + '"');
        sb.push('\t\t\t\t{');
        sb.push('\t\t\t\t\tkind "title"');
        sb.push('\t\t\t\t\ttext "' + file.relPath.replaceAll('\\', '/') + '"');
    }
    console.log(sb.join('\n'), __filename);
    fsfile.write(path.join(__dirname, 'getData.json.ittf'), sb.join('\n'))
}
)