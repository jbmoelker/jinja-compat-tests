const fs = require('fs');
const glob = require('glob');
const nunjucks = require('nunjucks');
const path = require('path');
const saveFile = require('./lib/save-file');

const inputDir = 'tests/';
const outputDir = 'output/nunjucks/';
const errorExt = '.error.log';

const renderer = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(inputDir, {
        noCache: true,
        watch: false
    }),
    { autoescape: true }
);

glob('**/*.html', { cwd: inputDir }, (err, filenames) => {
    if (err) {
        return console.error(err);
    }

    filenames.forEach(renderFile);
});

function renderFile(filename) {
    const dataFilename = path.join(inputDir, changeFileExt(filename, '.json'));

    fs.stat(dataFilename, (err, stats) => {
        const data = stats ? JSON.parse(fs.readFileSync(dataFilename, 'utf8')) : {};

        renderer.render(filename, data, (err, output) => {
            if (err) {
                const errorFilename = path.join(outputDir, changeFileExt(filename, errorExt));
                const message = err.message.replace(__dirname, '');
                saveFile(errorFilename, message);
            } else {
                saveFile(path.join(outputDir, filename), output);
            }
        });
    });
}

function changeFileExt(filename, ext) {
    return path.join(path.dirname(filename), path.basename(filename, path.extname(filename)) + ext);
}