/**
 * Sistema de Componentes Ziro
 * Carrega e renderiza componentes HTML reutilizáveis
 */

class ZiroComponents {
    constructor() {
        this.components = {};
        this.templates = {};
        this.isInBlogDirectory = this.checkIfInBlogDirectory();
    }

    /**
     * Verifica se estamos no diretório blog
     * @returns {boolean}
     */
    checkIfInBlogDirectory() {
        return window.location.pathname.includes('/blog/');
    }

    /**
     * Ajusta caminhos baseado na localização atual
     * @param {string} content - Conteúdo HTML
     * @returns {string} - Conteúdo com caminhos ajustados
     */
    adjustPaths(content) {
        if (!this.isInBlogDirectory) {
            return content;
        }

        // Ajusta caminhos para funcionar a partir do diretório blog/
        let adjustedContent = content;

        // Ajusta logo e links principais
        adjustedContent = adjustedContent.replace(/href="\//g, 'href="../');
        adjustedContent = adjustedContent.replace(/src="\//g, 'src="../');

        // Ajusta links de serviços para voltar ao diretório raiz
        adjustedContent = adjustedContent.replace(/href="\.\.\/servicos\//g, 'href="../servicos/');

        // Ajusta âncoras para voltar ao index principal
        adjustedContent = adjustedContent.replace(/href="#/g, 'href="../index.html#');

        return adjustedContent;
    }

    /**
     * Carrega um componente HTML
     * @param {string} componentName - Nome do componente
     * @param {string} path - Caminho do arquivo
     * @returns {Promise<string>} - Conteúdo do componente
     */
    async loadComponent(componentName, path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Erro ao carregar componente ${componentName}: ${response.status}`);
            }
            const content = await response.text();
            this.templates[componentName] = content;
            return content;
        } catch (error) {
            console.error(`Erro ao carregar componente ${componentName}:`, error);
            return '';
        }
    }

    /**
     * Renderiza um template com variáveis
     * @param {string} template - Template HTML
     * @param {Object} variables - Variáveis para substituição
     * @returns {string} - HTML renderizado
     */
    renderTemplate(template, variables = {}) {
        let rendered = template;
        
        // Processa condicionais simples {{#if variavel}}...{{/if}}
        rendered = rendered.replace(/\{\{#if\s+(\w+)\}\}(.*?)\{\{\/if\}\}/gs, (match, condition, content) => {
            return variables[condition] ? content : '';
        });
        
        // Substitui variáveis no formato {{variavel}}
        Object.keys(variables).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            rendered = rendered.replace(regex, variables[key]);
        });
        
        return rendered;
    }

    /**
     * Carrega e renderiza um componente
     * @param {string} componentName - Nome do componente
     * @param {string} path - Caminho do arquivo
     * @param {Object} variables - Variáveis para renderização
     * @returns {Promise<string>} - HTML renderizado
     */
    async renderComponent(componentName, path, variables = {}) {
        const template = await this.loadComponent(componentName, path);
        const rendered = this.renderTemplate(template, variables);
        return this.adjustPaths(rendered);
    }

    /**
     * Inicializa componentes na página
     * @param {Object} config - Configuração dos componentes
     */
    async initComponents(config) {
        // Carrega head
        if (config.head) {
            const headContent = await this.renderComponent('head', 'assets/components/head.html', config.head);
            this.replaceHeadContent(headContent);
        }

        // Carrega header
        if (config.header) {
            const headerContent = await this.renderComponent('header', 'assets/components/header.html', config.header);
            this.replaceHeaderContent(headerContent);
        }

        // Carrega footer
        if (config.footer) {
            const footerContent = await this.renderComponent('footer', 'assets/components/footer.html', config.footer);
            this.replaceFooterContent(footerContent);
        }
    }

    /**
     * Substitui o conteúdo do head
     * @param {string} content - Conteúdo HTML
     */
    replaceHeadContent(content) {
        const head = document.head;
        
        // Remove apenas meta tags específicas e title, preservando CSS e scripts
        const existingMeta = head.querySelectorAll('meta[charset], meta[name="viewport"], title, meta[name="description"]');
        existingMeta.forEach(el => el.remove());
        
        // Cria um elemento temporário para parsear o HTML
        const temp = document.createElement('div');
        temp.innerHTML = content;
        
        // Adiciona apenas os novos elementos ao head, evitando duplicar CSS e scripts
        Array.from(temp.children).forEach(child => {
            // Não adiciona links de CSS se já existirem
            if (child.tagName === 'LINK' && child.rel === 'stylesheet') {
                const existingLink = head.querySelector(`link[href="${child.href}"]`);
                if (!existingLink) {
                    head.appendChild(child.cloneNode(true));
                }
            }
            // Não adiciona scripts se já existirem
            else if (child.tagName === 'SCRIPT') {
                const existingScript = head.querySelector(`script[src="${child.src}"]`);
                if (!existingScript) {
                    head.appendChild(child.cloneNode(true));
                }
            }
            else {
                head.appendChild(child.cloneNode(true));
            }
        });
    }

    /**
     * Substitui o conteúdo do header
     * @param {string} content - Conteúdo HTML
     */
    replaceHeaderContent(content) {
        const headerPlaceholder = document.querySelector('[data-component="header"]');
        if (headerPlaceholder) {
            headerPlaceholder.outerHTML = content;
        }
    }

    /**
     * Substitui o conteúdo do footer
     * @param {string} content - Conteúdo HTML
     */
    replaceFooterContent(content) {
        const footerPlaceholder = document.querySelector('[data-component="footer"]');
        if (footerPlaceholder) {
            footerPlaceholder.outerHTML = content;
        }
    }
}

// Instância global
window.ziroComponents = new ZiroComponents();

// Função para detectar se estamos no diretório blog
function isInBlogDirectory() {
    return window.location.pathname.includes('/blog/');
}

// Função para ajustar caminhos baseado na localização
function adjustPathsForLocation(content) {
    if (!isInBlogDirectory()) {
        return content;
    }

    let adjustedContent = content;

    // Ajusta logo e links principais
    adjustedContent = adjustedContent.replace(/href="\//g, 'href="../');
    adjustedContent = adjustedContent.replace(/src="\//g, 'src="../');

    // Ajusta links de serviços para voltar ao diretório raiz
    adjustedContent = adjustedContent.replace(/href="\.\.\/servicos\//g, 'href="../servicos/');

    // Ajusta âncoras para voltar ao index principal
    adjustedContent = adjustedContent.replace(/href="#/g, 'href="../index.html#');

    return adjustedContent;
}

// Carrega header e footer dinamicamente
function loadComponent(selector, url) {
    const el = document.querySelector(`[data-component="${selector}"]`);
    if (el) {
        fetch(url)
            .then(res => res.text())
            .then(html => { 
                // Ajusta caminhos se estivermos no diretório blog
                const adjustedHtml = adjustPathsForLocation(html);
                el.outerHTML = adjustedHtml; 
                
                // Inicializa menu hambúrguer e dropdown após carregar o header
                if (selector === 'header') {
                    setTimeout(() => {
                        if (typeof initHamburgerMenu === 'function') {
                            initHamburgerMenu();
                        }
                        // Inicializa dropdown após carregar o header
                        enableDropdownClick();
                    }, 100);
                }
            });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Determina o caminho base baseado na localização atual
    const basePath = isInBlogDirectory() ? '../' : '/';
    
    loadComponent('header', basePath + 'assets/components/header.html');
    loadComponent('footer', basePath + 'assets/components/footer.html');
    
    // Inicializa dropdown imediatamente para desktop
    enableDropdownClick();
});

// Navegação suave para âncoras do header
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', enableSmoothScroll);
// Também ativar após carregar header dinamicamente
setTimeout(enableSmoothScroll, 500);

// Dropdown de serviços por clique
function enableDropdownClick() {
    // Remove event listeners existentes para evitar duplicação
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
        btn.removeEventListener('click', dropdownClickHandler);
        btn.addEventListener('click', dropdownClickHandler);
    });
    
    // Remove event listener global existente
    document.removeEventListener('click', dropdownOutsideClickHandler);
    document.addEventListener('click', dropdownOutsideClickHandler);
}

// Handler para clique no dropdown
function dropdownClickHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const dropdown = this.closest('.dropdown');
    const isOpen = dropdown.classList.contains('open');
    
    // Fecha outros dropdowns abertos
    document.querySelectorAll('.dropdown.open').forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('open');
            const btn = d.querySelector('.dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Toggle do dropdown atual
    if (!isOpen) {
        dropdown.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
    } else {
        dropdown.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
    }
}

// Handler para clique fora do dropdown
function dropdownOutsideClickHandler(e) {
    document.querySelectorAll('.dropdown.open').forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            const btn = dropdown.querySelector('.dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        }
    });
} 