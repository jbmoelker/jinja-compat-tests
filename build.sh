#!/usr/bin/env bash

rm -rf dist/
rm -rf output/

node scripts/build-template-data.js

python test-django.py
python test-jinja2.py
node test-nunjucks.js
node test-swig.js
php test-twig.php
ruby test-liquid.rb

node scripts/build-api.js
node scripts/build-docs.js
node scripts/build-app.js
