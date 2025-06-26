/**
 * Sistema de Componentes Ziro
 * Carrega e renderiza componentes HTML reutilizáveis
 */

class ZiroComponents {
    constructor() {
        this.components = {};
        this.templates = {};
        this.webchatLoaded = false;
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
     * Carrega o webchat dinamicamente
     * @param {string} basePath - Caminho base para os assets
     */
    loadWebChat(basePath = 'assets/js/') {
        if (this.webchatLoaded) {
            console.log('ZiroComponents: WebChat já foi carregado');
            return;
        }

        console.log('ZiroComponents: Carregando WebChat dinamicamente...');
        
        // Verifica se o script já existe
        const existingScript = document.querySelector('script[src*="webchat.js"]');
        if (existingScript) {
            console.log('ZiroComponents: WebChat já existe no DOM');
            this.webchatLoaded = true;
            return;
        }

        // Cria e adiciona o script do webchat
        const script = document.createElement('script');
        script.src = basePath + 'webchat.js';
        script.type = 'text/javascript';
        
        script.onload = () => {
            console.log('ZiroComponents: WebChat carregado com sucesso');
            this.webchatLoaded = true;
        };
        
        script.onerror = () => {
            console.error('ZiroComponents: Erro ao carregar WebChat');
        };
        
        document.head.appendChild(script);
    }

    /**
     * Detecta o caminho base dos assets baseado na URL atual
     * @returns {string} - Caminho base para os assets
     */
    detectBasePath() {
        const currentPath = window.location.pathname;
        
        // Se estiver na pasta lp/, usa caminho relativo
        if (currentPath.includes('/lp/')) {
            return '../assets/js/';
        }
        
        // Se estiver na raiz, usa caminho direto
        return 'assets/js/';
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

        // Carrega webchat automaticamente
        const basePath = this.detectBasePath();
        this.loadWebChat(basePath);
    }

    /**
     * Substitui o conteúdo do head
     * @param {string} content - Conteúdo HTML
     */
    replaceHeadContent(content) {
        const head = document.head;
        
        // Remove apenas meta tags específicas e title, preservando CSS
        const existingMeta = head.querySelectorAll('meta[charset], meta[name="viewport"], title, meta[name="description"]');
        existingMeta.forEach(el => el.remove());
        
        // Cria um elemento temporário para parsear o HTML
        const temp = document.createElement('div');
        temp.innerHTML = content;
        
        // Adiciona apenas os novos elementos ao head, evitando duplicar CSS
        Array.from(temp.children).forEach(child => {
            // Não adiciona links de CSS se já existirem
            if (child.tagName === 'LINK' && child.rel === 'stylesheet') {
                const existingLink = head.querySelector(`link[href="${child.href}"]`);
                if (!existingLink) {
                    head.appendChild(child.cloneNode(true));
                }
            } else {
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