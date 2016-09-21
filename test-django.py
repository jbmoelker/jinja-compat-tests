from lib.fs import read_json, save_file
import django
from django.conf import settings
from django.template.loader import get_template, render_to_string

engine = 'django'
config = read_json('config.json')
inputDir = config['inputDir']
outputDir = config['outputDir'] + engine + '/'
templateData = read_json(config['templateDataFile'])


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


for templateName in templateData:
    data = templateData[templateName]
    try:
        output = render_to_string(templateName + config['templateExt'], data)
        save_file(outputDir + templateName + config['templateExt'], output)
    except Exception as e:
        save_file(outputDir + templateName + config['errorExt'], str(e))