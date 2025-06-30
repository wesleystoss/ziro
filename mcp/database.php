<?php
require_once __DIR__ . '/config.php';

function get_db() {
    static $conn = null;
    if ($conn === null) {
        $conn = new mysqli(
            env('DB_HOST'),
            env('DB_USER'),
            env('DB_PASSWORD'),
            env('DB_NAME'),
            intval(env('DB_PORT', 3306))
        );
        if ($conn->connect_error) {
            die('Erro ao conectar ao banco: ' . $conn->connect_error);
        }
        $conn->set_charset(env('DB_CHARSET', 'utf8mb4'));
    }
    return $conn;
}
?>
