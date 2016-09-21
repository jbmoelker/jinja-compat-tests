from lib.fs import read_json, save_file
from jinja2 import Environment, FileSystemLoader

engine = 'jinja2'
config = read_json('config.json')
inputDir = config['inputDir']
outputDir = config['outputDir'] + engine + '/'
templateData = read_json(config['templateDataFile'])

env = Environment(loader=FileSystemLoader(inputDir))


for templateName in templateData:
    data = templateData[templateName]
    try:
        template = env.get_template(templateName + config['templateExt'])
        output = template.render(**data)
        save_file(outputDir + templateName + config['templateExt'], output)
    except Exception as e:
        save_file(outputDir + templateName + config['errorExt'], str(e))