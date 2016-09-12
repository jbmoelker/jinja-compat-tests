const saveFile = require('./save-file');

module.exports = (filename, obj) => saveFile(filename, JSON.stringify(obj, null, 4));