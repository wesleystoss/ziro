<?php require_once __DIR__ . '/connection.php'; ?>
<?php
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;
if (!$id) {
    http_response_code(404);
    echo '<h2>Artigo não encontrado.</h2>';
    exit;
}

// Consulta com JOINs para buscar informações relacionadas
$stmt = $pdo->prepare("
    SELECT 
        a.*,
        u.full_name as author_name,
        u.avatar_url as author_avatar,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        GROUP_CONCAT(t.name) as tags
    FROM articles a
    LEFT JOIN users u ON a.author_id = u.id
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN article_tags at ON a.id = at.article_id
    LEFT JOIN tags t ON at.tag_id = t.id
    WHERE a.id = :id AND a.status = 'published'
    GROUP BY a.id
    LIMIT 1
");
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$stmt->execute();
$article = $stmt->fetch();
echo '<pre>'; print_r($article); echo '</pre>';
if (!$article) {
    http_response_code(404);
    echo '<h2>Artigo não encontrado.</h2>';
    exit;
}

// Incrementar visualizações
$stmtView = $pdo->prepare("UPDATE articles SET view_count = view_count + 1 WHERE id = :id");
$stmtView->bindValue(':id', $id, PDO::PARAM_INT);
$stmtView->execute();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title><?= htmlspecialchars($article['title']) ?> - Blog Ziro</title>
    <meta name="description" content="Artigos e insights sobre marketing digital, vendas online e transformação digital. Dicas práticas para empresários que querem crescer no digital.">
    <meta name="keywords" content="blog, marketing digital, vendas online, transformação digital, dicas empresariais, automação">
    <meta name="author" content="Ziro Consultoria Digital">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://ziro.digital/blog/artigo.html">
    <meta property="og:title" content="Artigo - Ziro Consultoria Digital | Insights e Estratégias Digitais">
    <meta property="og:description" content="Artigos e insights sobre marketing digital, vendas online e transformação digital. Dicas práticas para empresários.">
    <meta property="og:image" content="https://ziro.digital/assets/images/ziro-logo.png">
    <meta property="og:site_name" content="Ziro Consultoria Digital">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://ziro.digital/blog/artigo.html">
    <meta property="twitter:title" content="Artigo - Ziro Consultoria Digital | Insights e Estratégias Digitais">
    <meta property="twitter:description" content="Artigos e insights sobre marketing digital, vendas online e transformação digital.">
    <meta property="twitter:image" content="https://ziro.digital/assets/images/ziro-logo.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://ziro.digital/blog/artigo.html">
    
    <!-- Preconnect para performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- CSS -->
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/blog.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Como aumentar suas vendas online em 30 dias: Guia completo para pequenas empresas",
      "description": "Descubra estratégias comprovadas que podem transformar seu negócio digital e gerar resultados reais em apenas um mês.",
      "image": "https://ziro.digital/assets/images/ziro-logo.png",
      "author": {
        "@type": "Organization",
        "name": "Ziro Consultoria Digital"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ziro Consultoria Digital",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ziro.digital/assets/images/ziro-logo.png"
        }
      },
      "datePublished": "2024-01-15",
      "dateModified": "2024-01-15",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://ziro.digital/blog/artigo.html"
      }
    }
    </script>
</head>
<body>
    <!-- Header dinâmico -->
    <div data-component="header"></div>

    <main>
        <!-- Conteúdo do Blog -->
        <section class="blog-content" aria-labelledby="blog-post-title">
            <div class="container">
                <article class="blog-post">
                    <!-- Breadcrumb -->
                    <nav class="breadcrumb" aria-label="Navegação do breadcrumb">
                        <a href="/">Home</a>
                        <span>/</span>
                        <a href="/blog/">Blog</a>
                        <span>/</span>
                        <span aria-current="page" id="breadcrumb-title">Artigo</span>
                    </nav>

                    <!-- Cabeçalho do Post -->
                    <header class="blog-post-header">
                        <div class="blog-post-meta">
                            <span class="blog-post-category" id="post-category"><?= htmlspecialchars($article['category_name'] ?? 'Sem categoria') ?></span>
                            <span class="blog-post-date" id="post-date"><?= date('d F, Y', strtotime($article['published_at'])) ?></span>
                            <span class="blog-post-read-time" id="post-read-time"><?= $article['read_time'] ?> min de leitura</span>
                        </div>
                        <h1 id="blog-post-title" class="blog-post-title"><?= htmlspecialchars($article['title']) ?></h1>
                        <p class="blog-post-excerpt" id="post-excerpt">
                            <?= htmlspecialchars($article['excerpt']) ?>
                        </p>
                        <div class="blog-post-author">
                            <div class="blog-post-author-avatar">
                                <img src="<?= htmlspecialchars($article['author_avatar'] ?: '../assets/images/ziro-logo.png') ?>" alt="<?= htmlspecialchars($article['author_name']) ?>" width="50" height="50">
                            </div>
                            <div class="blog-post-author-info">
                                <strong><?= htmlspecialchars($article['author_name']) ?></strong>
                                <span>Consultoria Digital</span>
                            </div>
                        </div>
                    </header>

                    <!-- Conteúdo do Post -->
                    <div class="blog-post-body" id="post-content">
                        <?= nl2br(htmlspecialchars($article['content'])) ?>
                        
                        <!-- Tags do Post -->
                        <?php if (!empty($article['tags'])): ?>
                        <div class="blog-post-tags" id="post-tags">
                            <?php
                            $tags = explode(',', $article['tags']);
                            foreach ($tags as $tag): 
                                $tag = trim($tag);
                                if (!empty($tag)): ?>
                                    <span class="blog-post-tag"><?= htmlspecialchars($tag) ?></span>
                                <?php endif;
                            endforeach; ?>
                        </div>
                        <?php endif; ?>
                    </div>
                </article>

                <!-- Posts Relacionados -->
                <section class="blog-related" aria-labelledby="blog-related-title">
                    <h2 id="blog-related-title">Artigos relacionados</h2>
                    <div class="blog-related-grid" id="related-posts">
                        <!-- Posts relacionados serão carregados dinamicamente -->
                    </div>
                </section>
            </div>
        </section>
    </main>

    <!-- Footer dinâmico -->
    <div data-component="footer"></div>

    <!-- Scripts -->
    <script src="../assets/js/components.js"></script>
    <script src="../assets/js/ziro.js"></script>
    <script src="../assets/js/blog.js"></script>
</body>
</html> 