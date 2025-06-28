<?php require_once __DIR__ . '/connection.php'; ?>
<?php
// Consulta segura com paginação e JOINs para buscar informações relacionadas
$page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$perPage = 6;
$offset = ($page - 1) * $perPage;

// Consulta principal com JOINs para buscar categoria e tags
$stmt = $pdo->prepare("
    SELECT 
        a.id, 
        a.title, 
        a.excerpt, 
        a.slug, 
        a.published_at,
        a.is_featured,
        a.featured_image,
        c.name as category_name,
        c.slug as category_slug,
        GROUP_CONCAT(t.name SEPARATOR ',') as tags
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN article_tags at ON a.id = at.article_id
    LEFT JOIN tags t ON at.tag_id = t.id
    WHERE a.status = 'published'
    GROUP BY a.id, a.title, a.excerpt, a.slug, a.published_at, a.is_featured, a.featured_image, c.name, c.slug
    ORDER BY a.is_featured DESC, a.published_at DESC 
    LIMIT :limit OFFSET :offset
");
$stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$articles = $stmt->fetchAll();

// Buscar total de artigos para paginação
$stmtCount = $pdo->prepare("SELECT COUNT(*) as total FROM articles WHERE status = 'published'");
$stmtCount->execute();
$totalArticles = $stmtCount->fetch()['total'];
$totalPages = ceil($totalArticles / $perPage);

// Buscar estatísticas do blog
$stmtStats = $pdo->prepare("
    SELECT 
        COUNT(*) as total_articles,
        SUM(view_count) as total_views,
        COUNT(DISTINCT author_id) as total_authors
    FROM articles 
    WHERE status = 'published'
");
$stmtStats->execute();
$stats = $stmtStats->fetch();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Blog - Ziro Consultoria Digital | Insights e Estratégias Digitais</title>
    <meta name="description" content="Artigos e insights sobre marketing digital, vendas online e transformação digital. Dicas práticas para empresários que querem crescer no digital.">
    <meta name="keywords" content="blog, marketing digital, vendas online, transformação digital, dicas empresariais, automação">
    <meta name="author" content="Ziro Consultoria Digital">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ziro.digital/blog/">
    <meta property="og:title" content="Blog - Ziro Consultoria Digital | Insights e Estratégias Digitais">
    <meta property="og:description" content="Artigos e insights sobre marketing digital, vendas online e transformação digital. Dicas práticas para empresários.">
    <meta property="og:image" content="https://ziro.digital/assets/images/ziro-logo.png">
    <meta property="og:site_name" content="Ziro Consultoria Digital">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://ziro.digital/blog/">
    <meta property="twitter:title" content="Blog - Ziro Consultoria Digital | Insights e Estratégias Digitais">
    <meta property="twitter:description" content="Artigos e insights sobre marketing digital, vendas online e transformação digital.">
    <meta property="twitter:image" content="https://ziro.digital/assets/images/ziro-logo.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://ziro.digital/blog/">
    
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
      "@type": "Blog",
      "name": "Blog Ziro Consultoria Digital",
      "description": "Insights e estratégias para transformar seu negócio digital",
      "url": "https://ziro.digital/blog/",
      "publisher": {
        "@type": "Organization",
        "name": "Ziro Consultoria Digital",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ziro.digital/assets/images/ziro-logo.png"
        }
      }
    }
    </script>
</head>
<body>
    <!-- Header dinâmico -->
    <div data-component="header"></div>

    <main>
        <!-- Hero do Blog -->
        <section class="blog-hero" aria-labelledby="blog-hero-title">
            <div class="container">
                <div class="blog-hero-content">
                    <div class="blog-hero-text">
                        <h1 id="blog-hero-title">Blog Ziro</h1>
                        <p>Insights e estratégias para transformar seu negócio digital</p>
                        <div class="blog-hero-stats">
                            <div class="blog-stat">
                                <span class="blog-stat-number"><?= $stats['total_articles'] ?>+</span>
                                <span class="blog-stat-label">Artigos</span>
                            </div>
                            <div class="blog-stat">
                                <span class="blog-stat-number"><?= number_format($stats['total_views']) ?>+</span>
                                <span class="blog-stat-label">Visualizações</span>
                            </div>
                            <div class="blog-stat">
                                <span class="blog-stat-number"><?= $stats['total_authors'] ?>+</span>
                                <span class="blog-stat-label">Autores</span>
                            </div>
                        </div>
                    </div>
                    <div class="blog-hero-illustration">
                        <div class="blog-visual">
                            <div class="blog-preview">
                                <div class="preview-header">
                                    <div class="preview-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div class="preview-content">
                                    <div class="preview-text">
                                        <div class="text-line"></div>
                                        <div class="text-line"></div>
                                        <div class="text-line"></div>
                                    </div>
                                    <div class="preview-tags">
                                        <span class="tag">Marketing</span>
                                        <span class="tag">Vendas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Busca e Filtros -->
        <section class="blog-search" aria-labelledby="blog-search-title">
            <div class="container">
                <div class="blog-search-content">
                    <h2 id="blog-search-title">Encontre o conteúdo que você precisa</h2>
                    <div class="blog-search-form">
                        <div class="search-input-group">
                            <input type="text" id="blog-search-input" placeholder="Buscar artigos..." aria-label="Buscar artigos">
                            <button type="button" id="blog-search-btn" aria-label="Buscar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="m21 21-4.35-4.35"/>
                                </svg>
                            </button>
                        </div>
                        <div class="blog-categories">
                            <button class="category-btn active" data-category="todos">Todos</button>
                            <button class="category-btn" data-category="marketing">Marketing Digital</button>
                            <button class="category-btn" data-category="vendas">Vendas Online</button>
                            <button class="category-btn" data-category="atendimento">Atendimento</button>
                            <button class="category-btn" data-category="tecnologia">Tecnologia</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Lista de Artigos -->
        <section class="blog-list" aria-labelledby="blog-list-title">
            <div class="container">
                <h2 id="blog-list-title" class="sr-only">Artigos do blog</h2>
                
                <!-- Artigos em Destaque -->
                <?php 
                // Buscar artigos em destaque
                $stmtFeatured = $pdo->prepare("
                    SELECT 
                        a.id, 
                        a.title, 
                        a.excerpt, 
                        a.slug, 
                        a.published_at,
                        a.read_time,
                        a.featured_image,
                        c.name as category_name,
                        GROUP_CONCAT(t.name SEPARATOR ',') as tags
                    FROM articles a
                    LEFT JOIN categories c ON a.category_id = c.id
                    LEFT JOIN article_tags at ON a.id = at.article_id
                    LEFT JOIN tags t ON at.tag_id = t.id
                    WHERE a.status = 'published' AND a.is_featured = 1
                    GROUP BY a.id, a.title, a.excerpt, a.slug, a.published_at, a.read_time, a.featured_image, c.name
                    ORDER BY a.published_at DESC 
                    LIMIT 1
                ");
                $stmtFeatured->execute();
                $featuredArticles = $stmtFeatured->fetchAll();
                
                if (!empty($featuredArticles)): ?>
                <div class="blog-featured">
                    <h3>Artigos em Destaque</h3>
                    <div class="blog-featured-grid">
                        <?php foreach ($featuredArticles as $art): ?>
                        <article class="blog-featured-post">
                            <div class="blog-featured-image">
                                <?php if (!empty($art['featured_image'])): ?>
                                    <img src="<?= htmlspecialchars($art['featured_image']) ?>" alt="<?= htmlspecialchars($art['title']) ?>" loading="lazy">
                                <?php else: ?>
                                    <div class="featured-post-visual">
                                        <div class="featured-preview">
                                            <div class="featured-preview-header">
                                                <div class="featured-preview-dots">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div class="featured-preview-content">
                                                <div class="featured-preview-text">
                                                    <div class="featured-text-line"></div>
                                                    <div class="featured-text-line"></div>
                                                    <div class="featured-text-line"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <?php endif; ?>
                            </div>
                            <div class="blog-featured-content">
                                <div class="blog-post-meta">
                                    <span class="blog-post-category"><?= htmlspecialchars($art['category_name'] ?? 'Sem categoria') ?></span>
                                    <span class="blog-post-date"><?= date('d/m/Y', strtotime($art['published_at'])) ?></span>
                                    <span class="blog-post-read-time"><?= $art['read_time'] ?> min de leitura</span>
                                </div>
                                <h2><?= htmlspecialchars($art['title']) ?></h2>
                                <p><?= htmlspecialchars($art['excerpt']) ?></p>
                                <div class="blog-featured-tags">
                                    <?php
                                    if (!empty($art['tags'])) {
                                        $tags = explode(',', $art['tags']);
                                        foreach ($tags as $tag): 
                                            $tag = trim($tag);
                                            if (!empty($tag)): ?>
                                                <span class="blog-post-tag"><?= htmlspecialchars($tag) ?></span>
                                            <?php endif;
                                        endforeach;
                                    }
                                    ?>
                                </div>
                                <a href="artigo.php?id=<?= $art['id'] ?>" class="btn-primary">Ler artigo completo</a>
                            </div>
                        </article>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endif; ?>

                <!-- Todos os Artigos -->
                <div class="blog-all-posts">
                    <h3>Todos os Artigos</h3>
                    <div class="blog-posts-grid" id="blog-posts-container">
                        <?php foreach ($articles as $art): ?>
                            <article class="blog-post-card" data-category="<?= htmlspecialchars($art['category_name'] ?? 'Sem categoria') ?>">
                                <div class="blog-post-card-image">
                                    <?php if (!empty($art['featured_image'])): ?>
                                        <img src="<?= htmlspecialchars($art['featured_image']) ?>" alt="<?= htmlspecialchars($art['title']) ?>" loading="lazy">
                                    <?php else: ?>
                                        <div class="post-card-visual">
                                            <div class="post-card-preview">
                                                <div class="post-card-preview-header">
                                                    <div class="post-card-preview-dots">
                                                        <span></span>
                                                        <span></span>
                                                        <span></span>
                                                    </div>
                                                </div>
                                                <div class="post-card-preview-content">
                                                    <div class="post-card-preview-text">
                                                        <div class="post-card-text-line"></div>
                                                        <div class="post-card-text-line"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <div class="blog-post-card-content">
                                    <div class="blog-post-meta">
                                        <span class="blog-post-category"><?= htmlspecialchars($art['category_name'] ?? 'Sem categoria') ?></span>
                                        <span class="blog-post-date"><?= date('d/m/Y', strtotime($art['published_at'])) ?></span>
                                    </div>
                                    <h3><?= htmlspecialchars($art['title']) ?></h3>
                                    <p><?= htmlspecialchars($art['excerpt']) ?></p>
                                    <div class="blog-post-card-tags">
                                        <?php
                                        if (!empty($art['tags'])) {
                                            $tags = explode(',', $art['tags']);
                                            foreach ($tags as $tag): 
                                                $tag = trim($tag);
                                                if (!empty($tag)): ?>
                                                    <span class="blog-post-tag"><?= htmlspecialchars($tag) ?></span>
                                                <?php endif;
                                            endforeach;
                                        }
                                        ?>
                                    </div>
                                    <a href="artigo.php?id=<?= $art['id'] ?>" class="blog-post-card-link">Ler mais</a>
                                </div>
                            </article>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Paginação -->
                <div class="blog-pagination">
                    <?php if ($page > 1): ?>
                        <a href="?page=<?= $page - 1 ?>" class="pagination-btn" aria-label="Página anterior">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                        </a>
                    <?php else: ?>
                        <button class="pagination-btn" disabled aria-label="Página anterior">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                        </button>
                    <?php endif; ?>
                    
                    <span class="pagination-info">Página <?= $page ?> de <?= $totalPages ?></span>
                    
                    <?php if ($page < $totalPages): ?>
                        <a href="?page=<?= $page + 1 ?>" class="pagination-btn" aria-label="Próxima página">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </a>
                    <?php else: ?>
                        <button class="pagination-btn" disabled aria-label="Próxima página">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </button>
                    <?php endif; ?>
                </div>
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