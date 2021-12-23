<?php

function writeLogs($message)
{
    $logs = fopen('php.log', 'a+');
    fwrite($logs, date('d.m.y H:i:s') . ': ' . $message . "\n");
    fclose($logs);
}

function validate() {
    return isset($_POST['X']) && isset($_POST['Y']) && isset($_POST['R']);
}

function checkTriangle($x, $y, $r) {
    return $x >= 0 && $y <= 0 && $y >= 2 * $x - $r;
}

function checkRectangle($x, $y, $r) {
    return $x <= 0 && $x >= -$r/2 && $y >= 0 && $y <= $r;
}
function checkSector ($x, $y, $r) {
    return $x >= 0 && $y >= 0 && sqrt($x * $x + $y * $y) <= $r/2;
}

function checkArea($x, $y, $r) {
    return checkTriangle($x, $y, $r) || checkRectangle($x, $y, $r) || checkSector($x, $y, $r);
}

function validateX($x) {
    return is_numeric($x) && $x > -5 && $x <= 5;
}

function validateY($y) {
    return is_numeric($y) && ($y == -2 || $y == -1.5 || $y == -1 || $y == 0.5 || $y == 0 || $y == 0.5 || $y == 1 || $y == 1.5 || $y == 2);
}

function validateR($r) {
    return is_numeric($r) && ($r == 1 || $r == 2 || $r == 3 || $r == 4 || $r == 5);
}

if (validate()) {
    date_default_timezone_set('Europe/Moscow');
    $x = trim($_POST['X']);
    $y = trim($_POST['Y']);
    $r = trim($_POST['R']);
    if (validateX($x) && validateY($y) && validateR($r)) {
        $currentTime = date("d.m.Y H:i:s", time());
        $scriptTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 6);
        $inArea = checkArea($x, $y, $r) ? 'Да':'Нет';
        $data =  "{\"x\" : $x, \"y\" : $y, \"r\" : $r, \"current\" : \"$currentTime\", \"execution\" : $scriptTime, \"result\" : \"$inArea\"}";
        echo $data;
    } else echo "{\"error\" : true}";
} else {
    echo "error";
}



