const fs = require('fs');
const glob = require('glob');
const path = require('path');
const saveFile = require('./lib/save-file');
const swig = require('swig');

const inputDir = 'tests/';
const outputDir = 'output/swig/';
const errorExt = '.error.log';
const filenames = glob.sync('**/*.html', { cwd: inputDir });

const renderer = new swig.Swig({
    autoescape: true,
    cache: false,
    loader: swig.loaders.fs(path.join(__dirname, '/', inputDir))
});

filenames.forEach(renderFile);

function renderFile(filename) {
    getData(filename)
        .then(data => {
            renderer.renderFile(filename, data, (err, output) => {
                if (err) {
                    saveError(filename, err);
                } else {
                    saveFile(path.join(outputDir, filename), output);
                }
            });
        });
}

function changeFileExt(filename, ext) {
    return path.join(path.dirname(filename), path.basename(filename, path.extname(filename)) + ext);
}

function getData(filename) {
    return new Promise((resolve, reject) => {
        const dataFilename = path.join(inputDir, changeFileExt(filename, '.json'));

        fs.stat(dataFilename, (err, stats) => {
            const data = stats ? JSON.parse(fs.readFileSync(dataFilename, 'utf8')) : {};
            resolve(data);
        });
    });
}

function saveError(filename, err) {
    const errorFilename = path.join(outputDir, changeFileExt(filename, errorExt));
    const pattern = new RegExp('\( on line \\d+\)? in file ' + __dirname + '/' + inputDir + filename, 'g');
    const message = err.message.replace(pattern, '');
    saveFile(errorFilename, message);
}