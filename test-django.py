import django
from django.conf import settings
from django.template.loader import get_template, render_to_string
import glob
import json
import os

#rootDir = os.path.dirname(os.path.realpath(__file__))
inputDir = 'tests/'
outputDir = 'output/django/'
errorExt = '.error.log'


def list_html_files(dir):
    files = glob.glob(dir + '*/*/*.html')
    paths = [file[len(dir):] for file in files]
    return paths


def get_data(filename):
    data = {}

    (basename, ext) = os.path.splitext(filename)
    dataFilename = basename + '.json'
    if (os.path.isfile(dataFilename)):
        with open(dataFilename) as data_file:
            data = json.load(data_file)

    return data


def make_dir(filename):
    dir = os.path.dirname(filename)
    if not os.path.isdir(dir):
        os.makedirs(dir)


def save_file(filename, content):
    make_dir(filename)
    outputFile = open(filename, 'w')
    outputFile.write(content)
    outputFile.close()


def write_error_log(filename, error):
    (basename, ext) = os.path.splitext(filename)
    errorFilename = basename + errorExt
    save_file(errorFilename, error)


settings.configure(
    TEMPLATES = [
        {
            'APP_DIRS': False,
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [inputDir],
        },
    ]
)

django.setup()


for filename in list_html_files(inputDir):
    data = get_data(inputDir + filename)

    try:
        output = render_to_string(filename, data)
        save_file(outputDir + filename, output)
    except Exception as e:
        write_error_log(outputDir + filename, str(e))