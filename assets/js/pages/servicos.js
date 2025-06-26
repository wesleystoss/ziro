const SERVICOS_CONFIG = {
    head: {
        pageTitle: 'Páginas de Conversão com Atendimento Online | Ziro',
        pageDescription: 'Crie páginas de conversão profissionais com atendimento online e aumente sua receita. Soluções completas para captação de leads, vendas e suporte digital.',
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../index.html',
        blipUrl: 'blip.html',
        servicosUrl: 'servicos.html',
        isServicosPage: true,
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

    await window.ziroComponents.initComponents(SERVICOS_CONFIG);
}); 