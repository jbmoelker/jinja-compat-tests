const findVersions = require('find-versions');
const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname, '../../requirements.txt');
const config = fs.readFileSync(configFile, 'utf8');
const configLine = config.split('\n').reduce((match, item) => {
    return (/Django *=/.test(item)) ? item : match;
});
const version = findVersions(configLine, {loose: true})[0];

module.exports = version;