const findVersions = require('find-versions');
const shell = require('shelljs');

const output = shell.exec('php -v', { silent: true }).stdout;
const version = findVersions(output)[0];

module.exports = version;