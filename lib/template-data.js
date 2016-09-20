const fs = require('fs');
const glob = require('glob');
const path = require('path');

/**
 * Resolves with a mapping of templateName:data pairs.
 * Example :
 *  {
 *      "filters/abs/negative-float": {},
 *      "filters/abs/variable": { "varX": "varX" }
 *  }
 */
function templateData(dir, options) {
    templateNames = getTemplateNames(dir, options.templateExt);

    return Promise.all(templateNames.map(templateName => {
            return getData(path.join(dir, templateName + options.dataExt))
        }))
        .then(data => templateNames.reduce((map, templateName, index) => {
            map[templateName] = data[index];
            return map;
        }, {}));
}

function getTemplateNames(dir, templateExt) {
    const filenames = glob.sync(`**/*${templateExt}`, { cwd: dir });
    return filenames.map(filename => {
        return path.join(path.dirname(filename), path.basename(filename, templateExt));
    });
}

function getData(filename) {
    return new Promise((resolve, reject) => {
        fs.stat(filename, (err, stats) => {
            const data = stats ? JSON.parse(fs.readFileSync(filename, 'utf8')) : {};
            resolve(data);
        });
    });
}

module.exports = templateData;