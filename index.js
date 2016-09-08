const fs = require('fs');
const glob = require('glob');
const nunjucks = require('nunjucks');
const path = require('path');
const saveFile = require('./lib/save-file');

const inputDir = 'tests/';
const outputDir = 'output/nunjucks/';

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
    const dataFilename = path.join(inputDir, path.dirname(filename), path.basename(filename, path.extname(filename)) + '.json');

    fs.stat(dataFilename, (err, stats) => {
        const data = stats ? JSON.parse(fs.readFileSync(dataFilename, 'utf8')) : {};
        const output = renderer.render(filename, data);
        saveFile(path.join(outputDir, filename), output);
    });
}