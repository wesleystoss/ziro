const SERVICOS_CONFIG = {
    head: {
        pageTitle: 'Páginas de Conversão com Atendimento Online | Ziro',
        pageDescription: 'Crie páginas de conversão profissionais com atendimento online e aumente sua receita. Soluções completas para captação de leads, vendas e suporte digital.',
        cssPath: '../assets/css/style.css',
        jsPath: '../assets/js/'
    },
    header: {
        homeUrl: '../',
        atendimentoOnlineUrl: 'atendimento-online',
        servicosUrl: 'landing-page',
        lojaVirtualUrl: 'loja-virtual',
        siteInstitucionalUrl: 'site-institucional',
        isServicosPage: true,
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

    await window.ziroComponents.initComponents(SERVICOS_CONFIG);
});

/**
 * JavaScript para Páginas de Serviço
 * Inicializa o menu hambúrguer responsivo
 */

// Função para inicializar o menu hambúrguer nas páginas de serviço
function initServicePageHamburger() {
    const hamburger = document.querySelector('.landing-header .hamburger-menu');
    const navMenu = document.querySelector('.landing-header .nav-menu');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Toggle do menu ao clicar no hambúrguer
    hamburger.addEventListener('click', toggleMenu);
    
    // Fechar menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Fechar menu ao redimensionar a janela para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o menu hambúrguer para páginas de serviço
    initServicePageHamburger();
    
    // Navegação suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}); 