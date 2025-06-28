-- Inserir artigo de teste completo
-- Primeiro, garantir que temos um usuário
INSERT IGNORE INTO users (id, username, email, password_hash, full_name, role, bio) VALUES
(1, 'admin', 'admin@ziro.digital', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador Ziro', 'admin', 'Administrador principal do sistema');

-- Garantir que temos categorias
INSERT IGNORE INTO categories (id, name, slug, description, color, icon, is_featured, sort_order) VALUES
(1, 'Marketing Digital', 'marketing-digital', 'Estratégias e táticas de marketing digital para empresas', '#2563eb', 'marketing', TRUE, 1),
(2, 'Vendas Online', 'vendas-online', 'Técnicas e ferramentas para aumentar vendas na internet', '#fbbf24', 'vendas', TRUE, 2);

-- Garantir que temos tags
INSERT IGNORE INTO tags (id, name, slug, description, color) VALUES
(1, 'Vendas', 'vendas', 'Técnicas de vendas', '#ef4444'),
(2, 'Marketing', 'marketing', 'Estratégias de marketing', '#2563eb'),
(3, 'Conversão', 'conversao', 'Estratégias para aumentar conversões', '#fbbf24');

-- Inserir artigo de teste
INSERT INTO articles (id, title, slug, excerpt, content, author_id, category_id, status, is_featured, published_at, read_time) VALUES
(1, 'Como aumentar suas vendas online em 30 dias', 'como-aumentar-suas-vendas-online', 'Descubra estratégias comprovadas para impulsionar suas vendas rapidamente.', 
'<h2>Introdução</h2>
<p>Se você é dono de uma pequena empresa e está lutando para vender online, este artigo é para você. Vamos compartilhar estratégias que já ajudaram nossos clientes a aumentar suas vendas em até 300% em apenas 30 dias.</p>

<h2>Por que sua empresa não está vendendo online?</h2>
<p>Antes de falarmos sobre soluções, precisamos entender os problemas mais comuns que impedem pequenas empresas de vender online:</p>

<div class="blog-post-highlight">
<h3>Principais problemas identificados:</h3>
<ul>
<li><strong>Falta de presença digital profissional:</strong> Sites mal feitos afastam clientes</li>
<li><strong>Ausência de estratégia de conversão:</strong> Muitos visitantes, poucas vendas</li>
<li><strong>Falta de automação:</strong> Processos manuais limitam o crescimento</li>
<li><strong>Inexistência de dados:</strong> Decisões baseadas em "achismo"</li>
</ul>
</div>

<h2>Estratégia 1: Otimize sua página de conversão</h2>
<p>A primeira coisa que você precisa fazer é criar uma página de conversão profissional. Não estamos falando de um site institucional comum, mas sim de uma página focada em converter visitantes em clientes.</p>

<div class="blog-post-tip">
<div class="blog-post-tip-icon">✓</div>
<div class="blog-post-tip-content">
<strong>Dica da Ziro:</strong> Uma página de conversão bem feita pode aumentar suas vendas em até 200%. O segredo está em focar em um único objetivo e eliminar distrações.
</div>
</div>

<h3>Elementos essenciais de uma página de conversão:</h3>
<ul>
<li><strong>Título impactante:</strong> Que comunique claramente o benefício principal</li>
<li><strong>Problema identificado:</strong> Mostre que você entende a dor do cliente</li>
<li><strong>Solução apresentada:</strong> Como seu produto/serviço resolve o problema</li>
<li><strong>Prova social:</strong> Depoimentos e casos de sucesso</li>
<li><strong>Chamada para ação clara:</strong> Botão de compra/contato bem posicionado</li>
</ul>

<h2>Estratégia 2: Automatize seu atendimento</h2>
<p>O atendimento online é fundamental para converter visitantes em clientes. Com um chatbot profissional, você pode:</p>

<div class="blog-post-stats">
<div class="blog-post-stat">
<span class="blog-post-stat-number">24/7</span>
<span class="blog-post-stat-label">Atendimento disponível</span>
</div>
<div class="blog-post-stat">
<span class="blog-post-stat-number">80%</span>
<span class="blog-post-stat-label">Mais conversões</span>
</div>
<div class="blog-post-stat">
<span class="blog-post-stat-number">50%</span>
<span class="blog-post-stat-label">Redução de custos</span>
</div>
</div>

<h2>Resultados reais de nossos clientes</h2>
<p>Veja alguns casos de sucesso de clientes que implementaram essas estratégias:</p>

<div class="blog-post-case">
<h3>Cliente: Loja de Roupas Online</h3>
<div class="blog-post-case-results">
<div class="blog-post-case-result">
<span class="blog-post-case-number">+250%</span>
<span class="blog-post-case-label">Aumento nas vendas</span>
</div>
<div class="blog-post-case-result">
<span class="blog-post-case-number">15 dias</span>
<span class="blog-post-case-label">Para implementação</span>
</div>
</div>
<p>"Implementamos uma página de conversão focada e um chatbot para atendimento. Em 30 dias, nossas vendas aumentaram 250% e o tempo de resposta aos clientes caiu de 2 horas para 30 segundos."</p>
</div>

<h2>Próximos passos</h2>
<p>Agora que você conhece as estratégias, é hora de implementá-las. A Ziro pode ajudar você a transformar seu negócio digital.</p>', 
1, 2, 'published', 1, NOW(), 8);

-- Relacionar artigo com tags
INSERT INTO article_tags (article_id, tag_id) VALUES
(1, 1), -- Vendas
(1, 2), -- Marketing
(1, 3); -- Conversão 