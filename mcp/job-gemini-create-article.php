<?php
require_once __DIR__ . '/MCPServer.php';

// Exemplo de uso via CLI ou cron job
if (php_sapi_name() === 'cli') {
    // Aqui você pode implementar a chamada à API Gemini e Unsplash em PHP
    // e montar o array $data conforme esperado pelo MCPServer::createArticle
    // Exemplo mínimo:
    $data = [
        'title' => 'Exemplo PHP',
        'slug' => 'exemplo-php',
        'excerpt' => 'Resumo gerado em PHP',
        'content' => '<div>Conteúdo gerado em PHP</div>',
        'featured_image' => null,
        'author_id' => 1,
        'category_id' => 1,
        'status' => 'draft',
        'is_featured' => 0,
        'allow_comments' => 1,
        'read_time' => 5,
        'seo_title' => 'SEO Title PHP',
        'seo_description' => 'SEO Desc PHP',
        'seo_keywords' => 'palavra1, palavra2',
        'published_at' => null
    ];
    $result = MCPServer::createArticle($data);
    print_r($result);
}
?>
