/**
 * Configurações Globais - Ziro Consultoria Digital
 * Centraliza todas as configurações do projeto
 */

const ZIRO_CONFIG = {
    // Informações da empresa
    company: {
        name: 'Ziro Consultoria Digital',
        whatsapp: '6199241137',
        email: 'contato@ziro.com.br',
        website: 'https://ziro.com.br'
    },

    // URLs das páginas
    pages: {
        home: '/',
        siteInstitucional: '/servicos/site-institucional',
        atendimentoOnline: '/servicos/atendimento-online',
        lojaVirtual: '/servicos/loja-virtual'
    },

    // Configurações de SEO
    seo: {
        home: {
            title: 'Ziro Consultoria Digital',
            description: 'Consultoria em criação de sites, atendimento automatizado e soluções digitais para empresas que querem inovar, vender mais e transformar o atendimento.',
            keywords: 'consultoria digital, criação de sites, atendimento automatizado, chatbot, automação, e-commerce, site institucional'
        },
        siteInstitucional: {
            title: 'Criação de Site Institucional | Ziro',
            description: 'Criação de sites institucionais profissionais para empresas que querem crescer, vender mais e estabelecer presença digital. Design moderno e responsivo.',
            keywords: 'criação de site, site institucional, design responsivo, presença digital, marketing digital'
        },
        atendimentoOnline: {
            title: 'Atendimento Online | Ziro',
            description: 'Automação de atendimento, chatbots, WhatsApp, Instagram e canais digitais. Soluções omnichannel para sua empresa inovar.',
            keywords: 'atendimento online, chatbot, whatsapp business, instagram, atendimento digital, omnichannel'
        },
        lojaVirtual: {
            title: 'Criação de Loja Virtual | Ziro',
            description: 'Criação de lojas virtuais e e-commerce para empresas que querem vender online. Plataformas completas com pagamento e gestão de pedidos.',
            keywords: 'loja virtual, e-commerce, venda online, plataforma de vendas, site de vendas'
        }
    },

    // Configurações de WhatsApp
    whatsapp: {
        baseUrl: 'https://wa.me/',
        messages: {
            home: 'Olá, gostaria de uma consultoria digital com a Ziro',
            siteInstitucional: 'Olá, gostaria de um site institucional com a Ziro',
            atendimentoOnline: 'Olá, gostaria de um atendimento online com a Ziro',
            lojaVirtual: 'Olá, gostaria de uma loja virtual com a Ziro'
        }
    },

    // Configurações de analytics
    analytics: {
        googleAnalyticsId: 'G-QGCLW60H6F',
        facebookPixelId: '',   // Adicione seu FB Pixel ID aqui
        hotjarId: '',          // Adicione seu Hotjar ID aqui
        
        // Páginas que devem excluir analytics
        excludePages: [
            '/servicos/site-institucional.html',
            '/servicos/loja-virtual.html',
            '/test-auto-webchat.html',
            '/test-simple-webchat.html',
            '/test-simple.html',
            '/test-webchat.html'
        ],
        
        // Função para verificar se deve carregar analytics
        shouldLoadAnalytics: function() {
            const currentPath = window.location.pathname;
            return !this.excludePages.some(page => currentPath.includes(page.replace('.html', '')));
        }
    },

    // Configurações de performance
    performance: {
        lazyLoading: true,
        preloadCritical: true,
        cacheStrategy: 'cache-first'
    },

    // Configurações de acessibilidade
    accessibility: {
        skipToContent: true,
        focusVisible: true,
        ariaLabels: {
            menu: 'Menu principal',
            whatsapp: 'Abrir WhatsApp',
            backToTop: 'Voltar ao topo'
        }
    }
};

// Exporta para uso global
window.ZIRO_CONFIG = ZIRO_CONFIG; 