/**
 * Sistema de Analytics - Ziro Consultoria Digital
 * Gerencia carregamento condicional do Google Analytics
 */

class ZiroAnalytics {
    constructor() {
        this.config = window.ZIRO_CONFIG?.analytics || {};
        this.isLoaded = false;
    }

    /**
     * Verifica se deve carregar analytics na página atual
     * @returns {boolean} - True se deve carregar analytics
     */
    shouldLoadAnalytics() {
        // Se não há configuração, carrega por padrão
        if (!this.config.shouldLoadAnalytics) {
            return true;
        }
        
        return this.config.shouldLoadAnalytics();
    }

    /**
     * Carrega o Google Analytics
     */
    loadGoogleAnalytics() {
        if (this.isLoaded || !this.shouldLoadAnalytics()) {
            return;
        }

        const gaId = this.config.googleAnalyticsId;
        if (!gaId) {
            console.warn('Google Analytics ID não configurado');
            return;
        }

        // Carrega o script do GTM
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        // Inicializa o gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', gaId);

        // Torna gtag global
        window.gtag = gtag;
        
        this.isLoaded = true;
        console.log('Google Analytics carregado com sucesso');
    }

    /**
     * Inicializa o analytics
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadGoogleAnalytics());
        } else {
            this.loadGoogleAnalytics();
        }
    }
}

// Inicializa o analytics quando o script é carregado
const ziroAnalytics = new ZiroAnalytics();
ziroAnalytics.init();

// Exporta para uso global
window.ziroAnalytics = ziroAnalytics; 