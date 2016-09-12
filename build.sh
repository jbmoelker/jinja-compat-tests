#!/usr/bin/env bash

rm -rf output/

python test-jinja2.py
node test-nunjucks.js
php test-twig.php

node index.js
