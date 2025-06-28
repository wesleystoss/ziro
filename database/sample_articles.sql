-- Artigos de exemplo para popular o blog
INSERT INTO articles (title, slug, excerpt, content, author_id, category_id, status, is_featured, published_at)
VALUES
('Como aumentar suas vendas online em 30 dias', 'como-aumentar-suas-vendas-online', 'Descubra estratégias comprovadas para impulsionar suas vendas rapidamente.', 'Conteúdo completo do artigo 1...', 1, 2, 'published', 1, NOW()),
('O futuro do atendimento online: tendências para 2024', 'futuro-do-atendimento-online', 'Veja as principais tendências em atendimento digital.', 'Conteúdo completo do artigo 2...', 1, 3, 'published', 0, NOW()),
('SEO para iniciantes: como aparecer no Google', 'seo-para-iniciantes', 'Aprenda o básico de SEO e melhore o posicionamento do seu site.', 'Conteúdo completo do artigo 3...', 1, 6, 'published', 0, NOW());

-- Relacionar artigos com tags
INSERT INTO article_tags (article_id, tag_id) VALUES
(1, 4), -- Vendas
(1, 5), -- Marketing
(2, 3), -- Chatbot
(2, 2), -- Automação
(3, 6), -- SEO
(3, 5); -- Marketing 