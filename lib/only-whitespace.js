module.exports = function onlyWhitespace(str) {
    return !/\S/.test(str);
}