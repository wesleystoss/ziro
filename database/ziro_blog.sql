-- ========================================
-- BANCO DE DADOS ZIRO BLOG
-- ========================================
-- Descrição: Sistema completo de blog para Ziro Consultoria Digital
-- Autor: Sistema Ziro
-- Data: 2024
-- ========================================

-- Usar banco de dados existente
USE u474727782_ziro;

-- ========================================
-- TABELA: USUÁRIOS/ADMINISTRADORES
-- ========================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'editor', 'author') DEFAULT 'author',
    avatar_url VARCHAR(255),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active)
);

-- ========================================
-- TABELA: CATEGORIAS
-- ========================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#2563eb', -- Cor em hex
    icon VARCHAR(50), -- Nome do ícone (ex: 'marketing', 'vendas')
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active),
    INDEX idx_sort (sort_order)
);

-- ========================================
-- TABELA: TAGS
-- ========================================
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#64748b',
    usage_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_usage (usage_count),
    INDEX idx_active (is_active)
);

-- ========================================
-- TABELA: ARTIGOS
-- ========================================
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255),
    author_id INT NOT NULL,
    category_id INT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    allow_comments BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    read_time INT DEFAULT 5, -- Tempo de leitura em minutos
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_pinned (is_pinned),
    INDEX idx_published (published_at),
    INDEX idx_views (view_count),
    INDEX idx_author (author_id),
    INDEX idx_category (category_id)
);

-- ========================================
-- TABELA: RELACIONAMENTO ARTIGOS-TAGS
-- ========================================
CREATE TABLE article_tags (
    article_id INT NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    INDEX idx_article (article_id),
    INDEX idx_tag (tag_id)
);

-- ========================================
-- TABELA: COMENTÁRIOS
-- ========================================
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    parent_id INT NULL, -- Para comentários aninhados
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(100) NOT NULL,
    author_website VARCHAR(255),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    is_spam BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE,
    INDEX idx_article (article_id),
    INDEX idx_parent (parent_id),
    INDEX idx_approved (is_approved),
    INDEX idx_spam (is_spam),
    INDEX idx_created (created_at)
);

-- ========================================
-- TABELA: ESTATÍSTICAS DE VISUALIZAÇÃO
-- ========================================
CREATE TABLE article_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(255),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    INDEX idx_article (article_id),
    INDEX idx_viewed (viewed_at),
    INDEX idx_ip (ip_address)
);

-- ========================================
-- TABELA: NEWSLETTER/INSCRIÇÕES
-- ========================================
CREATE TABLE subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at DATETIME,
    INDEX idx_email (email),
    INDEX idx_active (is_active)
);

-- ========================================
-- TABELA: CONFIGURAÇÕES DO SITE
-- ========================================
CREATE TABLE site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key),
    INDEX idx_public (is_public)
);

-- ========================================
-- TABELA: LOGS DE ACESSO
-- ========================================
CREATE TABLE access_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    method VARCHAR(10) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    response_time INT, -- Tempo de resposta em ms
    status_code INT,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_url (url(100)),
    INDEX idx_method (method),
    INDEX idx_ip (ip_address),
    INDEX idx_accessed (accessed_at),
    INDEX idx_status (status_code)
);

-- ========================================
-- TABELA: CACHE
-- ========================================
CREATE TABLE cache (
    cache_key VARCHAR(255) PRIMARY KEY,
    cache_value LONGTEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_expires (expires_at)
);

-- ========================================
-- TABELA: BACKUPS
-- ========================================
CREATE TABLE backups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    backup_type ENUM('full', 'articles', 'users', 'settings') NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    INDEX idx_type (backup_type),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- ========================================
-- INSERIR DADOS INICIAIS
-- ========================================

-- Inserir usuário administrador padrão
INSERT INTO users (username, email, password_hash, full_name, role, bio) VALUES
('admin', 'admin@ziro.digital', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador Ziro', 'admin', 'Administrador principal do sistema');

-- Inserir categorias padrão
INSERT INTO categories (name, slug, description, color, icon, is_featured, sort_order) VALUES
('Marketing Digital', 'marketing-digital', 'Estratégias e táticas de marketing digital para empresas', '#2563eb', 'marketing', TRUE, 1),
('Vendas Online', 'vendas-online', 'Técnicas e ferramentas para aumentar vendas na internet', '#fbbf24', 'vendas', TRUE, 2),
('Atendimento', 'atendimento', 'Automação e otimização de atendimento ao cliente', '#22c55e', 'atendimento', TRUE, 3),
('Tecnologia', 'tecnologia', 'Inovações tecnológicas e tendências do mercado', '#8b5cf6', 'tecnologia', TRUE, 4),
('E-commerce', 'e-commerce', 'Dicas e estratégias para lojas virtuais', '#ef4444', 'ecommerce', FALSE, 5),
('SEO', 'seo', 'Otimização para motores de busca', '#10b981', 'seo', FALSE, 6);

-- Inserir tags padrão
INSERT INTO tags (name, slug, description, color) VALUES
('Conversão', 'conversao', 'Estratégias para aumentar conversões', '#fbbf24'),
('Automação', 'automacao', 'Processos automatizados', '#22c55e'),
('Chatbot', 'chatbot', 'Atendimento automatizado', '#8b5cf6'),
('Vendas', 'vendas', 'Técnicas de vendas', '#ef4444'),
('Marketing', 'marketing', 'Estratégias de marketing', '#2563eb'),
('SEO', 'seo', 'Otimização para busca', '#10b981'),
('E-commerce', 'ecommerce', 'Comércio eletrônico', '#f59e0b'),
('Psicologia', 'psicologia', 'Psicologia das vendas', '#ec4899'),
('IA', 'ia', 'Inteligência Artificial', '#06b6d4'),
('Inovação', 'inovacao', 'Tecnologias inovadoras', '#84cc16');

-- Inserir configurações padrão do site
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Ziro Consultoria Digital', 'string', 'Nome do site'),
('site_description', 'Transforme seu negócio com soluções digitais profissionais', 'string', 'Descrição do site'),
('articles_per_page', '6', 'number', 'Número de artigos por página'),
('related_articles_limit', '3', 'number', 'Número de artigos relacionados'),
('featured_articles_limit', '1', 'number', 'Número de artigos em destaque'),
('enable_comments', 'true', 'boolean', 'Habilitar comentários'),
('enable_newsletter', 'true', 'boolean', 'Habilitar newsletter'),
('whatsapp_number', '6199241137', 'string', 'Número do WhatsApp'),
('whatsapp_message', 'Olá! Quero saber mais sobre soluções digitais', 'string', 'Mensagem padrão do WhatsApp'),
('social_media', '{"facebook":"https://facebook.com/ziroconsultoria","instagram":"https://instagram.com/ziroconsultoria","linkedin":"https://linkedin.com/company/ziroconsultoria"}', 'json', 'Redes sociais');

-- ========================================
-- CRIAR ÍNDICES ADICIONAIS PARA PERFORMANCE
-- ========================================

-- Índices para busca full-text
ALTER TABLE articles ADD FULLTEXT(title, excerpt, content);
ALTER TABLE categories ADD FULLTEXT(name, description);
ALTER TABLE tags ADD FULLTEXT(name, description);

-- Índices compostos para consultas frequentes
CREATE INDEX idx_articles_status_published ON articles(status, published_at);
CREATE INDEX idx_articles_featured_published ON articles(is_featured, published_at);
CREATE INDEX idx_articles_category_status ON articles(category_id, status);
CREATE INDEX idx_articles_author_status ON articles(author_id, status);

-- ========================================
-- CRIAR VIEWS ÚTEIS
-- ========================================

-- View para artigos publicados com informações completas
CREATE VIEW v_articles_published AS
SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.featured_image,
    a.view_count,
    a.read_time,
    a.published_at,
    a.is_featured,
    a.is_pinned,
    u.full_name as author_name,
    u.avatar_url as author_avatar,
    c.name as category_name,
    c.slug as category_slug,
    c.color as category_color,
    GROUP_CONCAT(t.name) as tags,
    GROUP_CONCAT(t.slug) as tag_slugs
FROM articles a
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
WHERE a.status = 'published'
GROUP BY a.id
ORDER BY a.is_pinned DESC, a.is_featured DESC, a.published_at DESC;

-- View para estatísticas do blog
CREATE VIEW v_blog_stats AS
SELECT 
    COUNT(*) as total_articles,
    COUNT(CASE WHEN is_featured = 1 THEN 1 END) as featured_articles,
    COUNT(CASE WHEN status = 'published' THEN 1 END) as published_articles,
    SUM(view_count) as total_views,
    AVG(view_count) as avg_views_per_article,
    COUNT(DISTINCT author_id) as total_authors,
    COUNT(DISTINCT category_id) as total_categories
FROM articles;

-- ========================================
-- CRIAR PROCEDURES ÚTEIS
-- ========================================

-- Procedure para incrementar visualizações
DELIMITER //
CREATE PROCEDURE IncrementArticleViews(IN article_id INT, IN ip_address VARCHAR(45))
BEGIN
    -- Verifica se já existe visualização desta IP nas últimas 24h
    IF NOT EXISTS (
        SELECT 1 FROM article_views 
        WHERE article_id = article_id 
        AND ip_address = ip_address 
        AND viewed_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)
    ) THEN
        -- Insere nova visualização
        INSERT INTO article_views (article_id, ip_address) VALUES (article_id, ip_address);
        
        -- Incrementa contador no artigo
        UPDATE articles SET view_count = view_count + 1 WHERE id = article_id;
    END IF;
END //
DELIMITER ;

-- Procedure para atualizar contagem de uso das tags
DELIMITER //
CREATE PROCEDURE UpdateTagUsageCount()
BEGIN
    UPDATE tags t 
    SET usage_count = (
        SELECT COUNT(*) 
        FROM article_tags at 
        WHERE at.tag_id = t.id
    );
END //
DELIMITER ;

-- ========================================
-- CRIAR TRIGGERS
-- ========================================

-- Trigger para atualizar contagem de tags quando artigo é deletado
DELIMITER //
CREATE TRIGGER after_article_delete
AFTER DELETE ON articles
FOR EACH ROW
BEGIN
    CALL UpdateTagUsageCount();
END //
DELIMITER ;

-- Trigger para atualizar contagem de tags quando artigo_tag é modificado
DELIMITER //
CREATE TRIGGER after_article_tag_change
AFTER INSERT ON article_tags
FOR EACH ROW
BEGIN
    CALL UpdateTagUsageCount();
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_article_tag_delete
AFTER DELETE ON article_tags
FOR EACH ROW
BEGIN
    CALL UpdateTagUsageCount();
END //
DELIMITER ;

-- ========================================
-- COMENTÁRIOS FINAIS
-- ========================================

/*
ESTRUTURA DO BANCO CRIADA COM SUCESSO!

TABELAS PRINCIPAIS:
- users: Administradores e autores
- categories: Categorias dos artigos
- tags: Tags para classificação
- articles: Artigos do blog
- article_tags: Relacionamento artigos-tags
- comments: Comentários dos leitores
- article_views: Estatísticas de visualização
- subscribers: Newsletter
- site_settings: Configurações do site

FUNCIONALIDADES INCLUÍDAS:
- Sistema completo de blog
- Categorização e tags
- Comentários aninhados
- Estatísticas de visualização
- Newsletter
- Cache
- Logs de acesso
- Backup automático
- SEO otimizado
- Performance otimizada

PRÓXIMOS PASSOS:
1. Configurar arquivo .env com as credenciais
2. Implementar API/backend para consumir os dados
3. Conectar o frontend com o banco de dados
4. Testar todas as funcionalidades
*/ 