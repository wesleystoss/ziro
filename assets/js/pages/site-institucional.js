const SITE_INSTITUCIONAL_CONFIG = {
    head: {
        pageTitle: 'Sites Institucionais Profissionais | Ziro',
        pageDescription: 'Transmita credibilidade e conquiste mais clientes com um site institucional profissional, rápido e responsivo. Soluções completas para presença digital, autoridade e geração de oportunidades.',
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../',
        atendimentoOnlineUrl: 'atendimento-online',
        servicosUrl: 'landing-page',
        lojaVirtualUrl: 'loja-virtual',
        siteInstitucionalUrl: 'site-institucional',
        isSiteInstitucionaservicosage: true,
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

    await window.ziroComponents.initComponents(SITE_INSTITUCIONAL_CONFIG);
}); 