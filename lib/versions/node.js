const findVersions = require('find-versions');
const shell = require('shelljs');

const output = shell.exec('node --version', { silent: true }).stdout;
const version = findVersions(output)[0];

module.exports = version;