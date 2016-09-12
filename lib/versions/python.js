const findVersions = require('find-versions');
const shell = require('shelljs');

const readVersion = shell.exec('python -V', { silent: true });
const output = readVersion.stdout || readVersion.stderr; // version is send to stderr https://bugs.python.org/issue18338
const version = findVersions(output)[0];

module.exports = version;