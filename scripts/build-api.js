const glob = require('glob');
const path = require('path');
const saveJson = require('../lib/save-json');
const tree = require('../lib/file-contents-tree');
const versions = require('../lib/versions');

const rootDir = path.join(__dirname, '/../');
const config = require(rootDir + 'config.json');
const inputDir = rootDir + config.inputDir;
const outputDir = rootDir + config.outputDir;
const apiDir = rootDir + config.apiDir;

const engines = glob.sync('*/', { cwd: outputDir }).map(dirname => dirname.substring(0, dirname.length -1));

saveJson(apiDir + 'tests.json', tree(inputDir, config.templateExt));
saveJson(apiDir + 'data.json', tree(inputDir, config.dataExt));
saveJson(apiDir + 'results.json', outputTree(config.templateExt));
saveJson(apiDir + 'errors.json', outputTree(config.errorExt));
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