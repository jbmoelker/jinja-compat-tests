const getTemplateData = require('../lib/template-data');
const saveJson = require('../lib/save-json');

const config = require('../config.json');

getTemplateData(config.inputDir, {
        templateExt: config.templateExt,
        dataExt: config.dataExt
    })
    .then(templateData => saveJson(config.templateDataFile, templateData))
    .catch(err => console.error('Error building template data', err));