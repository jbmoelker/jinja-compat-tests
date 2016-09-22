'use strict';

const onlyWhitespace = require('./lib/only-whitespace');
const path = require('path');
const series = require('async').series;
const saveFile = require('./lib/save-file');
const twig = require('twig');

const engine = 'twigjs';
const rootDir = __dirname + '/';
const config = require('./config.json');
const inputDir = rootDir + config.inputDir;
const outputDir = rootDir + config.outputDir + engine + '/';
const templateData = require(rootDir + config.templateDataFile);

// params deducted from https://github.com/twigjs/twig.js/blob/05c7fedede/src/twig.exports.js#L18
const twigSettings = {
    autoescape: true,
    cache: false,
    views: inputDir
};

let errorMessage = '';
const consoleError = console.error;
const storeConsoleErrorToVar = message => { errorMessage = message; };
const restoreConsoleErrorLog = () => { console.error = console.Error; };

const templatesWithMemoryIssues = [
    'functions/range/negative-step'
];

renderAllTemplates();

/**
 * TwigJS does not pass error to `err` in twig.renderFile(filename, data, (err, html) => ...)
 * but instead uses `console.error`. To catch and save (async) render errors, all renderFile calls
 * are wrapped and executed in series. We temporarily override `console.error` to write to a var.
 * And that var is used to create an error which is saved to file.
 */
function renderAllTemplates() {
    console.error = storeConsoleErrorToVar;
    series(Object.keys(templateData).map(templateName => {
        return renderTemplate(templateName, templateData[templateName]);
    }), () => {
        restoreConsoleErrorLog();
    });
}

function renderTemplate(templateName, data) {
    return function(callback) {
        if(templatesWithMemoryIssues.indexOf(templateName) >= 0) {
            return saveError(templateName, { message: '(out of memory)' })
                .then(() => callback());
        }
        const templateFilename = templateName + config.templateExt;
        const options = Object.assign({}, data, { settings: twigSettings });
        twig.renderFile(inputDir + templateFilename, options, (err, output) => {
            if (!err && onlyWhitespace(output)) {
                err = { message: config.noOutputMessage }
            }
            if (output === 'undefined') {
                err = {message: errorMessage};
            }
            if (err) {
                saveError(templateName, err)
                    .then(() => callback());
            } else {
                saveFile(path.join(outputDir, templateFilename), output)
                    .then(() => callback());
            }
        });
    }
}

function saveError(templateName, err) {
    const errorFilename = path.join(outputDir, templateName + config.errorExt);
    const pattern = new RegExp('\(' + rootDir + '.*\)? at .*', 'g');
    const message = err.message.replace(pattern, '');
    return saveFile(errorFilename, message);
}