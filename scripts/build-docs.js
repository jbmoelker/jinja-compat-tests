const glob = require('glob');
const path = require('path');
const saveJson = require('../lib/save-json');

const rootDir = path.join(__dirname, '/../');
const config = require(rootDir + 'config.json');
const docsDir = rootDir + config.docsDir;
const apiDir = rootDir + config.apiDir;

const filenames = glob.sync('*.json', { cwd: docsDir });

const docs = filenames.reduce((bundle, filename) => {
    const basename = path.basename(filename, path.extname(filename));
    bundle[basename] = require(docsDir + filename);
    return bundle;
}, {});

saveJson(apiDir + 'docs.json', docs);




