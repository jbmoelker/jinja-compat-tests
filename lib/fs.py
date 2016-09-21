import json
import os

def read_json(filename):
    data = {}
    with open(filename) as data_file:
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