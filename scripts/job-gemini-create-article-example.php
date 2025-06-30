<?php
require_once __DIR__ . '/../mcp/MCPServer.php';

// Exemplo de uso via CLI ou cron job para criar artigo real
if (php_sapi_name() === 'cli') {
    $data = [
        'title' => 'Como Automatizar Artigos com PHP',
        'slug' => 'como-automatizar-artigos-com-php',
        'excerpt' => 'Veja como criar artigos automaticamente usando PHP e MySQL.',
        'content' => '<div>Exemplo de artigo criado via job PHP.</div>',
        'featured_image' => null,
        'author_id' => 1,
        'category_id' => 1,
        'status' => 'draft',
        'is_featured' => 0,
        'allow_comments' => 1,
        'read_time' => 5,
        'seo_title' => 'Automatize Artigos com PHP',
        'seo_description' => 'Automatize a criação de artigos no seu blog com PHP.',
        'seo_keywords' => 'php, automação, artigos',
        'published_at' => null
    ];
    $result = MCPServer::createArticle($data);
    print_r($result);
}
?>
