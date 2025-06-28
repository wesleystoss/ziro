// Blog JavaScript - Funcionalidades para busca, filtros e artigos dinâmicos

class BlogManager {
    constructor() {
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.currentFilter = 'todos';
        this.searchTerm = '';
    }

    init() {
        // Inicializar funcionalidades básicas
        this.setupSearch();
        this.setupFilters();
        this.setupPagination();
    }

    setupSearch() {
        const searchInput = document.getElementById('blog-search-input');
        const searchBtn = document.getElementById('blog-search-btn');

        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.searchTerm = searchInput.value.toLowerCase();
                this.currentPage = 1;
                this.filterArticles();
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchTerm = searchInput.value.toLowerCase();
                    this.currentPage = 1;
                    this.filterArticles();
                }
            });
        }
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.category-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover classe active de todos os botões
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Adicionar classe active ao botão clicado
                btn.classList.add('active');
                
                // Atualizar filtro
                this.currentFilter = btn.dataset.category;
                this.currentPage = 1;
                this.filterArticles();
            });
        });
    }

    setupPagination() {
        const prevBtn = document.querySelector('.pagination-btn:not([disabled])');
        const nextBtn = document.querySelectorAll('.pagination-btn:not([disabled])')[1];

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.filterArticles();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentPage++;
                this.filterArticles();
            });
        }
    }

    filterArticles() {
        const articles = document.querySelectorAll('.blog-post-card');
        
        articles.forEach(article => {
            const category = article.dataset.category || '';
            const title = article.querySelector('h3')?.textContent || '';
            const excerpt = article.querySelector('p')?.textContent || '';
            const tags = article.querySelector('.blog-post-card-tags')?.textContent || '';
            
            let showArticle = true;

            // Aplicar filtro de categoria
            if (this.currentFilter && this.currentFilter !== 'todos') {
                if (!category.toLowerCase().includes(this.currentFilter)) {
                    showArticle = false;
                }
            }

            // Aplicar busca
            if (this.searchTerm && showArticle) {
                const searchText = `${title} ${excerpt} ${tags}`.toLowerCase();
                if (!searchText.includes(this.searchTerm)) {
                    showArticle = false;
                }
            }

            // Mostrar/ocultar artigo
            article.style.display = showArticle ? 'block' : 'none';
        });

        // Atualizar contagem de artigos visíveis
        this.updateVisibleCount();
    }

    updateVisibleCount() {
        const visibleArticles = document.querySelectorAll('.blog-post-card[style*="block"], .blog-post-card:not([style*="none"])');
        const container = document.getElementById('blog-posts-container');
        
        if (container && visibleArticles.length === 0) {
            container.innerHTML = '<p class="no-results">Nenhum artigo encontrado com os filtros aplicados.</p>';
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const blogManager = new BlogManager();
    blogManager.init();
}); 