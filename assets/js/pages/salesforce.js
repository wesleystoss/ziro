/**
 * Configuração da Página Salesforce - Ziro
 * Define como os componentes devem ser renderizados na página Salesforce
 */

const SALESFORCE_CONFIG = {
    head: {
        pageTitle: ZIRO_CONFIG.seo.salesforce.title,
        pageDescription: ZIRO_CONFIG.seo.salesforce.description,
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../',
        salesforceUrl: 'salesforce',
        blipUrl: 'blip',
        zendeskUrl: 'zendesk',
        servicosUrl: 'landing-page',
        lojaVirtualUrl: 'loja-virtual',
        siteInstitucionalUrl: 'site-institucional',
        isHomePage: false
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
    
    await window.ziroComponents.initComponents(SALESFORCE_CONFIG);
}); 