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
        home: '/index.html',
        salesforce: '/servicos/salesforce.html',
        blip: '/servicos/blip.html',
        zendesk: '/servicos/zendesk.html'
    },

    // Configurações de SEO
    seo: {
        home: {
            title: 'Ziro Consultoria Digital',
            description: 'Consultoria em Salesforce, Blip e Zendesk para empresas que querem inovar, vender mais e transformar o atendimento.',
            keywords: 'consultoria digital, salesforce, blip, zendesk, automação, crm, chatbot, atendimento'
        },
        salesforce: {
            title: 'Consultoria Salesforce | Ziro',
            description: 'Consultoria Salesforce para empresas que querem crescer, vender mais e automatizar processos. Implantação, integração e automação de vendas.',
            keywords: 'consultoria salesforce, crm, automação de vendas, implantação salesforce, integração salesforce'
        },
        blip: {
            title: 'Consultoria Blip | Ziro',
            description: 'Consultoria Blip para automação de atendimento, chatbots, WhatsApp, Instagram e canais digitais. Soluções omnichannel para sua empresa inovar.',
            keywords: 'consultoria blip, chatbot, whatsapp business, instagram, atendimento digital, omnichannel'
        },
        zendesk: {
            title: 'Consultoria Zendesk | Ziro',
            description: 'Consultoria Zendesk para empresas que querem elevar o atendimento ao cliente, aumentar vendas e otimizar processos. Implantação, automação e integração de canais digitais.',
            keywords: 'consultoria zendesk, suporte ao cliente, atendimento, automação de tickets, heservicosdesk'
        }
    },

    // Configurações de WhatsApp
    whatsapp: {
        baseUrl: 'https://wa.me/',
        messages: {
            home: 'Olá, gostaria de uma consultoria digital com a Ziro',
            salesforce: 'Olá, gostaria de uma consultoria Salesforce com a Ziro',
            blip: 'Olá, gostaria de uma consultoria Blip com a Ziro',
            zendesk: 'Olá, gostaria de uma consultoria Zendesk com a Ziro'
        }
    },

    // Configurações de analytics
    analytics: {
        googleAnalyticsId: '', // Adicione seu GA ID aqui
        facebookPixelId: '',   // Adicione seu FB Pixel ID aqui
        hotjarId: ''          // Adicione seu Hotjar ID aqui
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