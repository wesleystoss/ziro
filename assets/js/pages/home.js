/**
 * Configuração da Página Inicial - Ziro
 * Define como os componentes devem ser renderizados na página inicial
 */

const HOME_CONFIG = {
    head: {
        pageTitle: ZIRO_CONFIG.seo.home.title,
        pageDescription: ZIRO_CONFIG.seo.home.description,
        cssPath: 'assets/css/style.css'
    },
    header: {
        homeUrl: '#contato',
        blipUrl: 'lp/blip.html',
        isHomePage: true
    },
    footer: {}
};

// Inicializa componentes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async function() {
    await window.ziroComponents.initComponents(HOME_CONFIG);
}); 