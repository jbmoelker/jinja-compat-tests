# [WIP] Jinja2 Compat Tests

**This project tests compatibility of Jinja2 template language with Nunjucks and Twig**

[Jinja2](http://jinja.pocoo.org/) (Python) introduced an expressive template language. It has since been adapted other languages: [Nunjucks](https://mozilla.github.io/nunjucks/) (JavaScript), [Twig](http://twig.sensiolabs.org/) (PHP) and others. While the template syntax between these implementations is very similar, they do have their differences. This project uses a single set of [tests](tests/), generates the output with all template engines separately, and then compares the output.


## Jinja2

### Install

The Jinja2 setup requires [Python](https://www.python.org/) (>= 3.3) and `pip3` (comes with Python3) to be installed. Then install dependencies:

```bash
pip3 install -r requirements.txt
```

### Run tests

```bash
python3 index.py
```


## Nunjucks

### Install

The Nunjucks setup requires [NodeJS](https://nodejs.org/en/) (>= 6.0) and [npm](https://www.npmjs.com/) (comes with Node) to be installed. Then install dependencies:

```bash
npm install
```

### Run tests


```bash
node index.js
```


## Twig

### Install

The Twig setup requires [PHP](https://secure.php.net/) (>= 5.5.9) and [Composer](https://getcomposer.org/) to be installed. Then install dependencies:

```bash
composer install
```

### Run tests

```bash
php index.php
```

