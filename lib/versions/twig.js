const findVersions = require('find-versions');
const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname, '../../composer.lock');
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
const twigPackage = config.packages.reduce((match, item) => {
    return (item.name === 'twig/twig') ? item : match;
});
const version = findVersions(twigPackage.version)[0];

module.exports = version;