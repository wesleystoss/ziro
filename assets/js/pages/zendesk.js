/**
 * Configuração da Página Zendesk - Ziro
 * Define como os componentes devem ser renderizados na página Zendesk
 */

const ZENDESK_CONFIG = {
    header: {
        homeUrl: '../index.html',
        salesforceUrl: 'salesforce.html',
        blipUrl: 'blip.html',
        zendeskUrl: '#servico',
        isZendeskPage: true
    },
    footer: {}
};

// Inicializa componentes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async function() {
    // Corrige os caminhos dos componentes para funcionar a partir da pasta lp/
    const originalLoadComponent = window.ziroComponents.loadComponent;
    window.ziroComponents.loadComponent = function(componentName, path) {
        // Ajusta o caminho para funcionar a partir da pasta lp/
        const adjustedPath = path.replace('assets/', '../assets/');
        return originalLoadComponent.call(this, componentName, adjustedPath);
    };
    
    await window.ziroComponents.initComponents(ZENDESK_CONFIG);
}); 