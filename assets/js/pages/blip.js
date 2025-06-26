/**
 * Configuração da Página Blip - Ziro
 * Define como os componentes devem ser renderizados na página Blip
 */

const BLIP_CONFIG = {
    head: {
        pageTitle: ZIRO_CONFIG.seo.blip.title,
        pageDescription: ZIRO_CONFIG.seo.blip.description,
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../index.html',
        salesforceUrl: 'salesforce.html',
        blipUrl: '#servico',
        zendeskUrl: 'zendesk.html',
        servicosUrl: 'landing-page.html',
        lojaVirtualUrl: 'loja-virtual.html',
        siteInstitucionalUrl: 'site-institucional.html',
        isBlipPage: true
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
    
    await window.ziroComponents.initComponents(BLIP_CONFIG);
}); 