/**
 * Sistema de Componentes Ziro
 * Carrega e renderiza componentes HTML reutilizáveis
 */

class ZiroComponents {
    constructor() {
        this.components = {};
        this.templates = {};
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
        return this.renderTemplate(template, variables);
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

// Carrega header e footer dinamicamente
function loadComponent(selector, url) {
    const el = document.querySelector(`[data-component="${selector}"]`);
    if (el) {
        fetch(url)
            .then(res => res.text())
            .then(html => { el.innerHTML = html; });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', '/assets/components/header.html');
    loadComponent('footer', '/assets/components/footer.html');
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
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = btn.closest('.dropdown');
            const isOpen = dropdown.classList.contains('open');
            document.querySelectorAll('.dropdown.open').forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
                d.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                dropdown.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            } else {
                dropdown.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
    // Fechar ao clicar fora
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.dropdown.open').forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                const btn = dropdown.querySelector('.dropdown-toggle');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', enableDropdownClick);
setTimeout(enableDropdownClick, 500); 