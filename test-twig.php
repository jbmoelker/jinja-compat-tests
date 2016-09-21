<?php

require_once 'vendor/autoload.php';

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;

$engine = 'twig';
$config = readJson('config.json');
$inputDir = $config['inputDir'];
$outputDir = $config['outputDir'] . $engine . '/';
$templateData = readJson($config['templateDataFile']);

$fs = new Filesystem(); // http://symfony.com/doc/current/components/filesystem.html

function readJson($filename) {
    return json_decode(file_get_contents($filename), true);
}

function startsWith($haystack, $needle) {
     return (substr($haystack, 0, strlen($needle)) === $needle);
}

class Twig_Warning extends Exception
{
    protected $rawMessage;

    public function __construct($message) {
        $this->setRawMessage($message);
    }

    public function getRawMessage() {
        return $this->rawMessage;
    }

    protected function setRawMessage($message) {
        $rootDir = preg_quote(dirname(__FILE__), '/');
        $rawMessage = preg_replace('/ in ' . $rootDir . '.* on line \d+/', '', $message);
        $this->rawMessage = $rawMessage;
    }
}

$loader = new Twig_Loader_Filesystem($inputDir);
$twig = new Twig_Environment($loader, array());

foreach ($templateData as $templateName => $data) {
    try {
        $output = $twig->render($templateName . $config['templateExt'], $data);
        if (startsWith(trim($output), 'Warning: ')) {
            throw new Twig_Warning($output);
        }
        $fs->dumpFile($outputDir . $templateName . $config['templateExt'], $output);
    } catch (Exception $e) {
        $fs->dumpFile($outputDir . $templateName . $config['errorExt'], $e->getRawMessage());
    }
}