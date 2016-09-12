const findVersions = require('find-versions');
const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname, '../../requirements.txt');
const config = fs.readFileSync(configFile, 'utf8');
const jinjaConfig = config.split('\n').reduce((match, item) => {
    return (/Jinja2 *=/.test(item)) ? item : match;
});
const version = findVersions(jinjaConfig, {loose: true})[0];

module.exports = version;