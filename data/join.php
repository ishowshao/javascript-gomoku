<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-17
 * Time: 下午9:03
 */

//合并 .log 的走棋日志
function minimize ($json) {
    $result = false;
    $mimi = array();
    $input = json_decode($json, true);
    if ($input) {
        foreach ($input as $piece) {
            if ($piece['color'] == 'black') {
                $color = 1;
            } else {
                $color = 3;
            }
            array_push($mimi, array($piece['coordinate'][0], $piece['coordinate'][1], $color));
        }
        $result = json_encode($mimi);
    }
    return $result;
}
$contents = array();
if ($handle = opendir('.')) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            $pathParts = pathinfo($entry);
            if ($pathParts['extension'] == 'log') {
                if ($mimi = minimize(file_get_contents($entry))) {
                    array_push($contents, $mimi);
                }
            }
        }
    }
    closedir($handle);
}
file_put_contents('logs.js', 'var logs = [');
file_put_contents('logs.js', implode(',', $contents), FILE_APPEND);
file_put_contents('logs.js', '];', FILE_APPEND);
