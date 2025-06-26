/**
 * Auto WebChat Loader - Ziro
 * Carrega o webchat automaticamente em todas as páginas
 */

class AutoWebChatLoader {
    constructor() {
        this.webchatLoaded = false;
        this.init();
    }

    init() {
        // Aguarda o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadWebChat());
        } else {
            this.loadWebChat();
        }
    }

    loadWebChat() {
        // Verifica se o webchat já foi carregado
        if (this.webchatLoaded || typeof window.ZiroWebChat !== 'undefined') {
            console.log('AutoWebChat: WebChat já está disponível');
            return;
        }

        // Verifica se o script já existe no DOM
        const existingScript = document.querySelector('script[src*="webchat.js"]');
        if (existingScript) {
            console.log('AutoWebChat: WebChat já existe no DOM');
            this.webchatLoaded = true;
            return;
        }

        console.log('AutoWebChat: Carregando WebChat automaticamente...');

        // Detecta o caminho base
        const basePath = this.detectBasePath();
        
        // Cria e adiciona o script do webchat
        const script = document.createElement('script');
        script.src = basePath + 'webchat.js';
        script.type = 'text/javascript';
        
        script.onload = () => {
            console.log('AutoWebChat: WebChat carregado com sucesso');
            this.webchatLoaded = true;
        };
        
        script.onerror = () => {
            console.error('AutoWebChat: Erro ao carregar WebChat');
        };
        
        document.head.appendChild(script);
    }

    detectBasePath() {
        const currentPath = window.location.pathname;
        
        // Se estiver na pasta servicos/, usa caminho relativo
        if (currentPath.includes('/servicos/')) {
            return '../assets/js/';
        }
        
        // Se estiver na raiz, usa caminho direto
        return 'assets/js/';
    }
}

// Inicializa automaticamente
new AutoWebChatLoader(); 