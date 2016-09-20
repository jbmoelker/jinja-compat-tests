const findVersions = require('find-versions');
const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname, '../../Gemfile.lock');
const config = fs.readFileSync(configFile, 'utf8');
const configLine = config.split('\n').reduce((match, item) => {
    return (/liquid \([0-9\.]*\)/.test(item)) ? item : match;
});
const version = findVersions(configLine, {loose: true})[0];

module.exports = version;
