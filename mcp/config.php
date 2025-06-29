<?php
// Carrega variáveis do .env (simples)
function env($key, $default = null) {
    static $vars = null;
    if ($vars === null) {
        $vars = [];
        if (file_exists(__DIR__ . '/../.env')) {
            foreach (file(__DIR__ . '/../.env') as $line) {
                if (preg_match('/^([A-Z0-9_]+)=(.*)$/', trim($line), $m)) {
                    $vars[$m[1]] = trim($m[2], "\"'");
                }
            }
        }
    }
    return $vars[$key] ?? $default;
}
?>
