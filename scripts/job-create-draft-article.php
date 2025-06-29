<?php
require_once __DIR__ . '/../mcp/MCPServer.php';

if (php_sapi_name() === 'cli') {
    $data = [
        'title' => 'Rascunho PHP',
        'slug' => 'rascunho-php',
        'excerpt' => 'Resumo de rascunho gerado em PHP',
        'content' => '<div>Conteúdo de rascunho em PHP</div>',
        'featured_image' => null,
        'author_id' => 1,
        'category_id' => 1,
        'status' => 'draft',
        'is_featured' => 0,
        'allow_comments' => 1,
        'read_time' => 5,
        'seo_title' => 'SEO Title Draft PHP',
        'seo_description' => 'SEO Desc Draft PHP',
        'seo_keywords' => 'draft, php',
        'published_at' => null
    ];
    $result = MCPServer::createArticle($data);
    print_r($result);
}
?>
