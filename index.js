const glob = require('glob');
const merge = require('lodash').merge;
const saveJson = require('./lib/save-json');
const tree = require('./lib/file-contents-tree');
const versions = require('./lib/versions');

const inputDir = 'tests/';
const outputDir = 'output/';

saveJson(outputDir + 'tests.json', tree(inputDir, '.html'));
saveJson(outputDir + 'versions.json', versions);

glob('*/', { cwd: outputDir }, (err, dirnames) => {
    if (err) {
        return console.error(err);
    }

    const obj = dirnames
        .map(dirname => dirname.substring(0, dirname.length -1))
        .map(engineName => {
            const results = tree(`${outputDir}${engineName}/`, '.html');
            const logs = tree(`${outputDir}${engineName}/`, '.error.log');
            const contents = merge({}, results, logs);
            return { engineName, contents };
        }).reduce((output, item) => {
            output[item.engineName] = item.contents;
            return output;
        }, {});

    saveJson(outputDir + 'output.json', obj);
});