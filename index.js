const glob = require('glob');
const saveJson = require('./lib/save-json');
const tree = require('./lib/file-contents-tree');
const versions = require('./lib/versions');

const inputDir = 'tests/';
const outputDir = 'output/';
const apiDir = 'dist/api/';

const engines = glob.sync('*/', { cwd: outputDir }).map(dirname => dirname.substring(0, dirname.length -1));

saveJson(apiDir + 'tests.json', tree(inputDir, '.html'));
saveJson(apiDir + 'data.json', tree(inputDir, '.json'));
saveJson(apiDir + 'results.json', outputTree('.html'));
saveJson(apiDir + 'errors.json', outputTree('.error.log'));
saveJson(apiDir + 'versions.json', versions);

function outputTree(ext) {
    return engines
        .map(engineName => {
            const contents = tree(`${outputDir}${engineName}/`, ext);
            return { engineName, contents };
        }).reduce((output, item) => {
            output[item.engineName] = item.contents;
            return output;
        }, {});
}