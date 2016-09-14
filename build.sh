#!/usr/bin/env bash

rm -rf output/

python test-jinja2.py
node test-nunjucks.js
node test-swig.js
php test-twig.php

node index.js
node scripts/build-docs.js
node scripts/build-app.js
