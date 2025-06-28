/**
 * Configuração da Página Atendimento Online - Ziro
 * Define como os componentes devem ser renderizados na página Atendimento Online
 */

const ATENDIMENTO_ONLINE_CONFIG = {
    head: {
        pageTitle: 'Atendimento Online | Ziro',
        pageDescription: 'Automação de atendimento, chatbots, WhatsApp, Instagram e canais digitais. Soluções omnichannel para sua empresa inovar.',
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../',
        salesforceUrl: 'salesforce',
        atendimentoOnlineUrl: 'atendimento-online',
        zendeskUrl: 'zendesk',
        servicosUrl: 'landing-page',
        lojaVirtualUrl: 'loja-virtual',
        siteInstitucionalUrl: 'site-institucional',
        isHomePage: false
    },
    footer: {}
};

document.addEventListener('DOMContentLoaded', async function() {
    // Corrige os caminhos dos componentes para funcionar a partir da pasta servicos/
    const originalLoadComponent = window.ziroComponents.loadComponent;
    window.ziroComponents.loadComponent = function(componentName, path) {
        // Ajusta o caminho para funcionar a partir da pasta servicos/
        const adjustedPath = path.replace('assets/', '../assets/');
        return originalLoadComponent.call(this, componentName, adjustedPath);
    };
    await window.ziroComponents.initComponents(ATENDIMENTO_ONLINE_CONFIG);
}); 