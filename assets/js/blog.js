// Blog JavaScript - Funcionalidades para busca, filtros e artigos dinâmicos

class BlogManager {
    constructor() {
        this.articles = [
            {
                id: 1,
                title: "Como aumentar suas vendas online em 30 dias: Guia completo para pequenas empresas",
                excerpt: "Descubra estratégias comprovadas que podem transformar seu negócio digital e gerar resultados reais em apenas um mês.",
                category: "Marketing Digital",
                date: "15 de Janeiro, 2024",
                readTime: "5 min de leitura",
                tags: ["Marketing Digital", "Vendas Online", "Conversão", "Pequenas Empresas"],
                content: `
                    <p class="blog-post-intro">
                        Se você é dono de uma pequena empresa e está lutando para vender online, este artigo é para você. 
                        Vamos compartilhar estratégias que já ajudaram nossos clientes a aumentar suas vendas em até 300% em apenas 30 dias.
                    </p>

                    <h2>Por que sua empresa não está vendendo online?</h2>
                    <p>
                        Antes de falarmos sobre soluções, precisamos entender os problemas mais comuns que impedem 
                        pequenas empresas de vender online:
                    </p>

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
                    <p>
                        A primeira coisa que você precisa fazer é criar uma página de conversão profissional. 
                        Não estamos falando de um site institucional comum, mas sim de uma página focada em converter visitantes em clientes.
                    </p>

                    <div class="blog-post-tip">
                        <div class="blog-post-tip-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <div class="blog-post-tip-content">
                            <strong>Dica da Ziro:</strong> Uma página de conversão bem feita pode aumentar suas vendas em até 200%. 
                            O segredo está em focar em um único objetivo e eliminar distrações.
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
                    <p>
                        O atendimento online é fundamental para converter visitantes em clientes. 
                        Com um chatbot profissional, você pode:
                    </p>

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

                    <h2>Estratégia 3: Use dados para tomar decisões</h2>
                    <p>
                        Implementar analytics e acompanhar métricas é essencial para otimizar seus resultados. 
                        Você precisa saber:
                    </p>

                    <ul>
                        <li>De onde vêm seus visitantes</li>
                        <li>Onde eles abandonam seu site</li>
                        <li>Quais páginas convertem melhor</li>
                        <li>Qual o comportamento dos seus clientes</li>
                    </ul>

                    <h2>Resultados reais de nossos clientes</h2>
                    <p>
                        Veja alguns casos de sucesso de clientes que implementaram essas estratégias:
                    </p>

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
                        <p>
                            "Implementamos uma página de conversão focada e um chatbot para atendimento. 
                            Em 30 dias, nossas vendas aumentaram 250% e o tempo de resposta aos clientes caiu de 2 horas para 30 segundos."
                        </p>
                    </div>

                    <h2>Próximos passos</h2>
                    <p>
                        Agora que você conhece as estratégias, é hora de implementá-las. 
                        A Ziro pode ajudar você a:
                    </p>

                    <div class="blog-post-cta">
                        <h3>Quer implementar essas estratégias na sua empresa?</h3>
                        <p>Solicite um diagnóstico gratuito e veja como podemos transformar seu negócio digital.</p>
                        <div class="blog-post-cta-buttons">
                            <a href="https://wa.me/6199241137?text=Ol%C3%A1%2C+li+o+artigo+sobre+vendas+online+e+gostaria+de+uma+consultoria" target="_blank" class="btn-primary">
                                Falar com especialista
                            </a>
                            <a href="tel:+6199241137" class="btn-secondary">
                                Ligar agora
                            </a>
                        </div>
                    </div>
                `
            },
            {
                id: 2,
                title: "5 erros que matam suas vendas online",
                excerpt: "Descubra os principais erros que impedem sua empresa de vender mais na internet e como evitá-los.",
                category: "Marketing Digital",
                date: "12 de Janeiro, 2024",
                readTime: "4 min de leitura",
                tags: ["Vendas", "Erros", "Marketing Digital"],
                content: `
                    <p class="blog-post-intro">
                        Muitas empresas cometem erros básicos que impedem o sucesso das vendas online. 
                        Neste artigo, vamos identificar os 5 erros mais comuns e como corrigi-los.
                    </p>

                    <h2>Erro 1: Não conhecer seu público</h2>
                    <p>
                        O primeiro e mais grave erro é não entender quem é seu cliente ideal. 
                        Sem essa informação, você está atirando no escuro.
                    </p>

                    <div class="blog-post-highlight">
                        <h3>Solução:</h3>
                        <ul>
                            <li>Crie personas detalhadas</li>
                            <li>Pesquise o comportamento do seu público</li>
                            <li>Analise dados de analytics</li>
                            <li>Faça pesquisas com clientes existentes</li>
                        </ul>
                    </div>

                    <h2>Erro 2: Site lento e mal otimizado</h2>
                    <p>
                        Sites lentos são um dos principais motivos de abandono. 
                        Os usuários esperam carregamento em menos de 3 segundos.
                    </p>

                    <div class="blog-post-tip">
                        <div class="blog-post-tip-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <div class="blog-post-tip-content">
                            <strong>Dica:</strong> Use ferramentas como Google PageSpeed Insights para otimizar seu site.
                        </div>
                    </div>

                    <h2>Erro 3: Falta de prova social</h2>
                    <p>
                        As pessoas compram de quem confiam. Sem depoimentos e casos de sucesso, 
                        você perde credibilidade.
                    </p>

                    <h2>Erro 4: Processo de compra complicado</h2>
                    <p>
                        Quanto mais passos para finalizar a compra, maior a chance de abandono. 
                        Simplifique sempre.
                    </p>

                    <h2>Erro 5: Não acompanhar métricas</h2>
                    <p>
                        Sem dados, você não sabe o que está funcionando ou não. 
                        Implemente analytics e acompanhe regularmente.
                    </p>

                    <div class="blog-post-cta">
                        <h3>Quer evitar esses erros?</h3>
                        <p>Fale com nossos especialistas e receba um diagnóstico completo do seu negócio digital.</p>
                        <div class="blog-post-cta-buttons">
                            <a href="https://wa.me/6199241137?text=Ol%C3%A1%2C+quero+evitar+erros+nas+vendas+online" target="_blank" class="btn-primary">
                                Falar com especialista
                            </a>
                        </div>
                    </div>
                `
            },
            {
                id: 3,
                title: "Como criar uma loja virtual que vende",
                excerpt: "Guia completo para criar uma loja online profissional que realmente converte visitantes em clientes.",
                category: "Vendas Online",
                date: "10 de Janeiro, 2024",
                readTime: "6 min de leitura",
                tags: ["E-commerce", "Conversão", "Vendas Online"],
                content: `
                    <p class="blog-post-intro">
                        Criar uma loja virtual que realmente vende vai muito além de apenas colocar produtos online. 
                        Neste guia completo, você aprenderá as estratégias essenciais.
                    </p>

                    <h2>Planejamento estratégico</h2>
                    <p>
                        Antes de começar a desenvolver, é fundamental ter um planejamento sólido.
                    </p>

                    <div class="blog-post-highlight">
                        <h3>Checklist de planejamento:</h3>
                        <ul>
                            <li>Defina seu público-alvo</li>
                            <li>Escolha os produtos certos</li>
                            <li>Defina sua proposta de valor</li>
                            <li>Planeje a experiência do usuário</li>
                            <li>Defina estratégias de marketing</li>
                        </ul>
                    </div>

                    <h2>Design focado em conversão</h2>
                    <p>
                        O design da sua loja deve ser pensado para converter, não apenas para ser bonito.
                    </p>

                    <div class="blog-post-stats">
                        <div class="blog-post-stat">
                            <span class="blog-post-stat-number">75%</span>
                            <span class="blog-post-stat-label">Julgam credibilidade pelo design</span>
                        </div>
                        <div class="blog-post-stat">
                            <span class="blog-post-stat-number">3x</span>
                            <span class="blog-post-stat-label">Mais conversões com design otimizado</span>
                        </div>
                    </div>

                    <h2>Elementos essenciais</h2>
                    <ul>
                        <li><strong>Header claro:</strong> Logo, navegação e busca</li>
                        <li><strong>Hero section:</strong> Proposta de valor clara</li>
                        <li><strong>Produtos em destaque:</strong> Categorias principais</li>
                        <li><strong>Prova social:</strong> Depoimentos e avaliações</li>
                        <li><strong>Call-to-action:</strong> Botões de compra estratégicos</li>
                    </ul>

                    <h2>Otimização para mobile</h2>
                    <p>
                        Mais de 60% das compras online são feitas por dispositivos móveis. 
                        Sua loja deve ser perfeita no mobile.
                    </p>

                    <div class="blog-post-tip">
                        <div class="blog-post-tip-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <div class="blog-post-tip-content">
                            <strong>Dica:</strong> Teste sempre em dispositivos reais, não apenas em simuladores.
                        </div>
                    </div>

                    <h2>Estratégias de marketing</h2>
                    <p>
                        Uma loja virtual sem marketing é como uma loja física em uma rua deserta.
                    </p>

                    <div class="blog-post-case">
                        <h3>Casos de sucesso</h3>
                        <div class="blog-post-case-results">
                            <div class="blog-post-case-result">
                                <span class="blog-post-case-number">+400%</span>
                                <span class="blog-post-case-label">Aumento nas vendas</span>
                            </div>
                            <div class="blog-post-case-result">
                                <span class="blog-post-case-number">20 dias</span>
                                <span class="blog-post-case-label">Para implementação</span>
                            </div>
                        </div>
                    </div>

                    <div class="blog-post-cta">
                        <h3>Quer criar sua loja virtual?</h3>
                        <p>Nossa equipe pode ajudar você a criar uma loja que realmente vende.</p>
                        <div class="blog-post-cta-buttons">
                            <a href="https://wa.me/6199241137?text=Ol%C3%A1%2C+quero+criar+uma+loja+virtual" target="_blank" class="btn-primary">
                                Falar sobre loja virtual
                            </a>
                        </div>
                    </div>
                `
            }
        ];

        this.currentFilter = 'todos';
        this.currentSearch = '';
        this.currentPage = 1;
        this.articlesPerPage = 6;

        this.init();
    }

    init() {
        // Verificar se estamos na página de listagem ou artigo individual
        if (window.location.pathname.includes('/blog/')) {
            if (window.location.pathname.includes('/artigo.html')) {
                this.loadArticle();
            } else {
                this.initListPage();
            }
        }
    }

    initListPage() {
        this.setupSearch();
        this.setupFilters();
        this.setupPagination();
        this.renderArticles();
    }

    setupSearch() {
        const searchInput = document.getElementById('blog-search-input');
        const searchBtn = document.getElementById('blog-search-btn');

        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.currentSearch = searchInput.value.toLowerCase();
                this.currentPage = 1;
                this.renderArticles();
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.currentSearch = searchInput.value.toLowerCase();
                    this.currentPage = 1;
                    this.renderArticles();
                }
            });
        }
    }

    setupFilters() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover classe active de todos os botões
                categoryBtns.forEach(b => b.classList.remove('active'));
                
                // Adicionar classe active ao botão clicado
                btn.classList.add('active');
                
                // Atualizar filtro
                this.currentFilter = btn.dataset.category;
                this.currentPage = 1;
                this.renderArticles();
            });
        });
    }

    setupPagination() {
        const prevBtn = document.querySelector('.pagination-btn:first-child');
        const nextBtn = document.querySelector('.pagination-btn:last-child');
        const pageInfo = document.querySelector('.pagination-info');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderArticles();
                }
            });

            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(this.getFilteredArticles().length / this.articlesPerPage);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.renderArticles();
                }
            });
        }
    }

    getFilteredArticles() {
        let filtered = this.articles;

        // Aplicar filtro de categoria
        if (this.currentFilter !== 'todos') {
            filtered = filtered.filter(article => 
                article.category.toLowerCase().includes(this.currentFilter) ||
                article.tags.some(tag => tag.toLowerCase().includes(this.currentFilter))
            );
        }

        // Aplicar busca
        if (this.currentSearch) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(this.currentSearch) ||
                article.excerpt.toLowerCase().includes(this.currentSearch) ||
                article.tags.some(tag => tag.toLowerCase().includes(this.currentSearch))
            );
        }

        return filtered;
    }

    renderArticles() {
        const container = document.getElementById('blog-posts-container');
        if (!container) return;

        const filteredArticles = this.getFilteredArticles();
        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = filteredArticles.slice(startIndex, endIndex);

        // Limpar container
        container.innerHTML = '';

        if (articlesToShow.length === 0) {
            container.innerHTML = `
                <div class="blog-no-results">
                    <h3>Nenhum artigo encontrado</h3>
                    <p>Tente ajustar sua busca ou filtros.</p>
                </div>
            `;
            return;
        }

        // Renderizar artigos
        articlesToShow.forEach(article => {
            const articleElement = this.createArticleCard(article);
            container.appendChild(articleElement);
        });

        // Atualizar paginação
        this.updatePagination(filteredArticles.length);
    }

    createArticleCard(article) {
        const articleElement = document.createElement('article');
        articleElement.className = 'blog-post-card';
        articleElement.dataset.category = article.tags.join(' ').toLowerCase();

        articleElement.innerHTML = `
            <div class="blog-post-card-image">
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
            </div>
            <div class="blog-post-card-content">
                <div class="blog-post-meta">
                    <span class="blog-post-category">${article.category}</span>
                    <span class="blog-post-date">${article.date}</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="blog-post-card-tags">
                    ${article.tags.slice(0, 2).map(tag => `<span class="blog-post-tag">${tag}</span>`).join('')}
                </div>
                <a href="artigo.html?id=${article.id}" class="blog-post-card-link">Ler mais</a>
            </div>
        `;

        return articleElement;
    }

    updatePagination(totalArticles) {
        const totalPages = Math.ceil(totalArticles / this.articlesPerPage);
        const prevBtn = document.querySelector('.pagination-btn:first-child');
        const nextBtn = document.querySelector('.pagination-btn:last-child');
        const pageInfo = document.querySelector('.pagination-info');

        if (prevBtn && nextBtn && pageInfo) {
            prevBtn.disabled = this.currentPage === 1;
            nextBtn.disabled = this.currentPage === totalPages;
            pageInfo.textContent = `Página ${this.currentPage} de ${totalPages}`;
        }
    }

    loadArticle() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = parseInt(urlParams.get('id'));

        if (!articleId) {
            this.showArticleNotFound();
            return;
        }

        const article = this.articles.find(a => a.id === articleId);
        if (!article) {
            this.showArticleNotFound();
            return;
        }

        this.renderArticle(article);
        this.loadRelatedArticles(article);
    }

    renderArticle(article) {
        // Atualizar meta tags
        document.title = `${article.title} - Ziro Consultoria Digital`;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = article.excerpt;
        }

        // Atualizar breadcrumb
        const breadcrumbTitle = document.getElementById('breadcrumb-title');
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = article.title;
        }

        // Atualizar cabeçalho do artigo
        const category = document.getElementById('post-category');
        const date = document.getElementById('post-date');
        const readTime = document.getElementById('post-read-time');
        const title = document.getElementById('blog-post-title');
        const excerpt = document.getElementById('post-excerpt');
        const content = document.getElementById('post-content');
        const tags = document.getElementById('post-tags');

        if (category) category.textContent = article.category;
        if (date) date.textContent = article.date;
        if (readTime) readTime.textContent = article.readTime;
        if (title) title.textContent = article.title;
        if (excerpt) excerpt.textContent = article.excerpt;
        if (content) content.innerHTML = article.content;
        if (tags) {
            tags.innerHTML = article.tags.map(tag => 
                `<span class="blog-post-tag">${tag}</span>`
            ).join('');
        }
    }

    loadRelatedArticles(currentArticle) {
        const relatedContainer = document.getElementById('related-posts');
        if (!relatedContainer) return;

        // Encontrar artigos relacionados (mesma categoria ou tags similares)
        const relatedArticles = this.articles
            .filter(article => article.id !== currentArticle.id)
            .filter(article => 
                article.category === currentArticle.category ||
                article.tags.some(tag => currentArticle.tags.includes(tag))
            )
            .slice(0, 3);

        if (relatedArticles.length === 0) {
            // Se não houver relacionados, mostrar artigos aleatórios
            const randomArticles = this.articles
                .filter(article => article.id !== currentArticle.id)
                .slice(0, 3);
            this.renderRelatedArticles(randomArticles, relatedContainer);
        } else {
            this.renderRelatedArticles(relatedArticles, relatedContainer);
        }
    }

    renderRelatedArticles(articles, container) {
        container.innerHTML = articles.map(article => `
            <article class="blog-related-post">
                <div class="blog-related-post-image">
                    <div class="related-post-visual">
                        <div class="related-preview">
                            <div class="related-preview-header">
                                <div class="related-preview-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div class="related-preview-content">
                                <div class="related-preview-text">
                                    <div class="related-text-line"></div>
                                    <div class="related-text-line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="blog-related-post-content">
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <a href="artigo.html?id=${article.id}" class="blog-related-post-link">Ler mais</a>
                </div>
            </article>
        `).join('');
    }

    showArticleNotFound() {
        const content = document.getElementById('post-content');
        if (content) {
            content.innerHTML = `
                <div class="blog-not-found">
                    <h2>Artigo não encontrado</h2>
                    <p>O artigo que você está procurando não foi encontrado.</p>
                    <a href="index.html" class="btn-primary">Voltar ao blog</a>
                </div>
            `;
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
}); 