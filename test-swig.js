const path = require('path');
const saveFile = require('./lib/save-file');
const swig = require('swig');

const engine = 'swig';
const rootDir = __dirname + '/';
const config = require('./config.json');
const inputDir = rootDir + config.inputDir;
const outputDir = rootDir + config.outputDir + engine + '/';
const templateData = require(rootDir + config.templateDataFile);

const renderer = new swig.Swig({
    autoescape: true,
    cache: false,
    loader: swig.loaders.fs(path.join(inputDir))
});

Object.keys(templateData).forEach(templateName => {
    renderTemplate(templateName, templateData[templateName]);
});

function renderTemplate(templateName, data) {
    const templateFilename = templateName + config.templateExt;
    renderer.renderFile(templateFilename, data, (err, output) => {
        if (err) {
            saveError(templateName, err);
        } else {
            saveFile(path.join(outputDir, templateFilename), output);
        }
    });
}

function saveError(templateName, err) {
    const errorFilename = path.join(outputDir, templateName + config.errorExt);
    const templateFilename = inputDir + templateName + config.templateExt;
    const pattern = new RegExp('\( on line \\d+\)? in file ' + templateFilename, 'g');
    const message = err.message.replace(pattern, '');
    saveFile(errorFilename, message);
}