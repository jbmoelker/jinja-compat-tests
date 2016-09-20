require 'json'
require 'fileutils'
require 'liquid'

config = JSON.parse(File.read('config.json'))
outputDir = config['outputDir'] + 'liquid/'
templateData = JSON.parse(File.read('output/template-data.json'))

def saveFile(filename, content)
    dirname = File.dirname(filename)
    unless File.directory?(dirname)
      FileUtils.mkdir_p(dirname)
    end
    File.open(filename, 'w') { |file| file.write(content) }
end

Liquid.cache_classes = false

templateData.each do |templateName, data|
    begin
        filename = config['inputDir'] + templateName + config['templateExt']
        template = Liquid::Template.parse(File.read(filename))
        output = template.render(data)
        saveFile(outputDir + templateName + config['templateExt'], output)
    rescue Exception => e
        saveFile(outputDir + templateName + config['errorExt'], e.message)
    end
end
