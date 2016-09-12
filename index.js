const saveJson = require('./lib/save-json');
const tree = require('./lib/file-contents-tree');
const versions = require('./lib/versions');

const inputDir = 'tests/';
const outputDir = 'output/';

saveJson(outputDir + 'tests.json', tree(inputDir, '.html'));
saveJson(outputDir + 'versions.json', versions);
