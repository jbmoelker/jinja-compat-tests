import glob
import json
import os
from jinja2 import Environment, FileSystemLoader

inputDir = 'tests/'
outputDir = 'output/jinja2/'

env = Environment(loader=FileSystemLoader(inputDir))

def list_html_files(dir):
    files = glob.glob(dir + '*/*/*.html')
    paths = [file[len(dir):] for file in files]
    return paths

for filename in list_html_files(inputDir):
    data = {}

    (basename, ext) = os.path.splitext(inputDir + filename)
    dataFilename = basename + '.json'
    if (os.path.isfile(dataFilename)):
        with open(dataFilename) as data_file:
            data = json.load(data_file)

    template = env.get_template(filename)
    output = template.render(**data)

    dir = os.path.dirname(outputDir + filename)
    if not os.path.isdir(dir):
        os.makedirs(dir)

    outputFile = open(outputDir + filename, 'w')
    outputFile.write(output)
    outputFile.close()
