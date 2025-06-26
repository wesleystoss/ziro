const LOJA_VIRTUAL_CONFIG = {
    head: {
        pageTitle: 'Lojas Virtuais Profissionais | Ziro',
        pageDescription: 'Venda mais com uma loja virtual profissional, rápida e segura. Soluções completas para e-commerce, integração com pagamentos, automação de marketing e suporte especializado.',
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../index',
        blipUrl: 'blip',
        servicosUrl: 'landing-page',
        lojaVirtualUrl: 'loja-virtual',
        siteInstitucionalUrl: 'site-institucional',
        isLojaVirtuaservicosage: true,
        isHomePage: false
    },
    footer: {}
};

document.addEventListener('DOMContentLoaded', async function() {
    // Corrige os caminhos dos componentes para funcionar a partir da pasta servicos/
    const originalLoadComponent = window.ziroComponents.loadComponent;
    window.ziroComponents.loadComponent = function(componentName, path) {
        const adjustedPath = path.replace('assets/', '../assets/');
        return originalLoadComponent.call(this, componentName, adjustedPath);
    };

    await window.ziroComponents.initComponents(LOJA_VIRTUAL_CONFIG);
}); 