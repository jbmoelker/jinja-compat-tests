const nunjucks = require('nunjucks');
const path = require('path');
const saveFile = require('./lib/save-file');

const engine = 'nunjucks';
const rootDir = __dirname + '/';
const config = require('./config.json');
const inputDir = rootDir + config.inputDir;
const outputDir = rootDir + config.outputDir + engine + '/';
const templateData = require(rootDir + config.templateDataFile);

nunjucks.installJinjaCompat();

const renderer = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(inputDir, {
        noCache: true,
        watch: false
    }),
    { autoescape: true }
);

Object.keys(templateData).forEach(templateName => {
    renderTemplate(templateName, templateData[templateName]);
});

function renderTemplate(templateName, data) {
    const templateFilename = templateName + config.templateExt;
    renderer.render(templateFilename, data, (err, output) => {
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
    const pattern = new RegExp('\\(' + templateFilename + '\\)', 'g');
    const message = err.message.replace(pattern, '');
    saveFile(errorFilename, message);
}