const prism = require('prismjs');
require('prismjs/components/prism-json'); // adds `json` to global `prism.languages` instance
require('prismjs/components/prism-twig'); // adds `twig` to global `prism.languages` instance

module.exports = (code, language) => {
    language = (prism.languages.hasOwnProperty(language)) ? language : 'markup';
    const formattedCode = prism.highlight(code, prism.languages[language]);
    return `<pre class="language-${language}"><code>${formattedCode}</code></pre>`;
};