const dotty = require('dotty');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

function fileContentsTree(dir, ext) {
    return glob.sync('**/*' + ext, { cwd: dir })
        .map(filename => {
            const contents = fs.readFileSync(path.join(dir, filename), 'utf8');
            return { filename, contents };
        })
        .reduce((tree, item) => {
            const itemPath = removeExtension(item.filename, ext).replace(/\//g, '.');
            dotty.put(tree, itemPath, item.contents);
            return tree;
        }, {});
}

function removeExtension(filename, ext) {
    return path.join(path.dirname(filename), path.basename(filename, ext));
}

module.exports = fileContentsTree;