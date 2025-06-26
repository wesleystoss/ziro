/**
 * Configuração da Página Zendesk - Ziro
 * Define como os componentes devem ser renderizados na página Zendesk
 */

const ZENDESK_CONFIG = {
    head: {
        pageTitle: ZIRO_CONFIG.seo.zendesk.title,
        pageDescription: ZIRO_CONFIG.seo.zendesk.description,
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../index',
        salesforceUrl: 'salesforce',
        blipUrl: 'blip',
        zendeskUrl: '#servico',
        isZendeskPage: true
    },
    footer: {}
};

// Inicializa componentes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async function() {
    // Corrige os caminhos dos componentes para funcionar a partir da pasta servicos/
    const originalLoadComponent = window.ziroComponents.loadComponent;
    window.ziroComponents.loadComponent = function(componentName, path) {
        // Ajusta o caminho para funcionar a partir da pasta servicos/
        const adjustedPath = path.replace('assets/', '../assets/');
        return originalLoadComponent.call(this, componentName, adjustedPath);
    };
    
    await window.ziroComponents.initComponents(ZENDESK_CONFIG);
}); 