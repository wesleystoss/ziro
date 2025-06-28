<?php
// blog/connection.php
// Conexão universal PDO para MySQL com boas práticas

// Função para carregar variáveis do .env se não estiverem disponíveis
if (!function_exists('env')) {
    function env($key, $default = null) {
        if (getenv($key) !== false) {
            return getenv($key);
        }
        // Tenta carregar do arquivo .env manualmente (caso não esteja usando um autoloader)
        $envPath = __DIR__ . '/../.env';
        if (file_exists($envPath)) {
            $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) continue;
                if (strpos($line, '=') === false) continue;
                list($envKey, $envValue) = array_map('trim', explode('=', $line, 2));
                if ($envKey === $key) return $envValue;
            }
        }
        return $default;
    }
}

$host = env('DB_HOST', 'localhost');
$db   = env('DB_NAME', 'u474727782_ziro');
$user = env('DB_USER', 'u474727782_root');
$pass = env('DB_PASSWORD', '');
$charset = env('DB_CHARSET', 'utf8mb4');

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    // Garante charset correto
    $pdo->exec("SET NAMES 'utf8mb4'");
} catch (PDOException $e) {
    http_response_code(500);
    echo '<h2>Erro ao conectar ao banco de dados.</h2>';
    if (env('DEBUG_MODE', 'false') === 'true') {
        echo '<pre>' . htmlspecialchars($e->getMessage()) . '</pre>';
    }
    exit;
}
// Nunca exponha variáveis sensíveis ou detalhes do erro em produção! 