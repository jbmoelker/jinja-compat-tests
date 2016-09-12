<?php

require_once 'vendor/autoload.php';

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Finder\Finder;

$inputDir = 'tests/';
$outputDir = 'output/twig/';
$errorExt = '.error.log';

$finder = new Finder(); // http://symfony.com/doc/current/components/finder.html
$fs = new Filesystem(); // http://symfony.com/doc/current/components/filesystem.html

$loader = new Twig_Loader_Filesystem($inputDir);
$twig = new Twig_Environment($loader, array());

$files = $finder->in($inputDir)->files()->name('*.html');

foreach ($files as $file) {
    $filename = $file->getRelativePathname();
    $dataFilename = str_replace('.html', '.json', ($inputDir . $filename));

    $data = $fs->exists($dataFilename) ? json_decode(file_get_contents($dataFilename), true) : Array();

    try {
        $output = $twig->render($filename, $data);
        $fs->dumpFile($outputDir . $filename, $output);
    } catch (Exception $e) {
        $errorFilename = str_replace('.html', $errorExt, ($outputDir . $filename));
        $fs->dumpFile($errorFilename, $e->getMessage());
    }
}