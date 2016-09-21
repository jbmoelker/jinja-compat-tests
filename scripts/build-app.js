const fs = require('fs');
const nunjucks = require('nunjucks');
const path = require('path');
const saveFile = require('../lib/save-file');

const rootDir = path.join(__dirname, '/../');
const distDir = rootDir + 'dist/';
const apiDir = rootDir + 'dist/api/';
const appDir = rootDir + 'src/app/';

const docs = require(apiDir + 'docs.json');
const errors = require(apiDir + 'errors.json');
const inputData = require(apiDir + 'data.json');
const results = require(apiDir + 'results.json');
const tests = require(apiDir + 'tests.json');
const versions = require(apiDir + 'versions.json');

const renderer = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(appDir, {
        noCache: true,
        watch: false
    }),
    { autoescape: true }
);

renderIndex();

Object.keys(tests).forEach(type => {
    Object.keys(tests[type]).forEach(feature => renderFeature(type, feature));
});

function renderIndex() {
    const data = {
        engines: Object.keys(results),
        errors,
        title: 'Overview',
        tests,
        versions
    };
    renderer.render('index.html', data, (err, html) => {
        if (err) {
            console.error(err);
        } else {
            saveFile(path.join(distDir, 'index.html'), html);
        }
    });
}

function renderFeature(type, name) {
    const data = {
        docs,
        errors,
        inputData,
        name,
        paths: { root: '../../' },
        results,
        tests: tests[type][name],
        title: `${name} ${type.slice(0, -1)}`,
        type,
        versions
    };
    renderer.render('feature.html', data, (err, html) => {
        if (err) {
            console.error(err);
        } else {
            saveFile(path.join(distDir, type, '/', name, '/', 'index.html'), html);
        }
    });
}