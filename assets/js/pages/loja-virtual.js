const LOJA_VIRTUAL_CONFIG = {
    head: {
        pageTitle: 'Lojas Virtuais Profissionais | Ziro',
        pageDescription: 'Venda mais com uma loja virtual profissional, rápida e segura. Soluções completas para e-commerce, integração com pagamentos, automação de marketing e suporte especializado.',
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../index.html',
        blipUrl: 'blip.html',
        servicosUrl: 'servicos.html',
        lojaVirtualUrl: 'loja-virtual.html',
        siteInstitucionalUrl: 'site-institucional.html',
        isLojaVirtualPage: true,
        isHomePage: false
    },
    footer: {}
};

document.addEventListener('DOMContentLoaded', async function() {
    // Corrige os caminhos dos componentes para funcionar a partir da pasta lp/
    const originalLoadComponent = window.ziroComponents.loadComponent;
    window.ziroComponents.loadComponent = function(componentName, path) {
        const adjustedPath = path.replace('assets/', '../assets/');
        return originalLoadComponent.call(this, componentName, adjustedPath);
    };

    await window.ziroComponents.initComponents(LOJA_VIRTUAL_CONFIG);
}); 