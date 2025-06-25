/**
 * Ziro Consultoria Digital - JavaScript Principal
 * Funcionalidades globais e inicialização de componentes
 */

// Configurações globais
const ZIRO_CONFIG = {
    whatsapp: '6199241137',
    companyName: 'Ziro Consultoria Digital'
};

/**
 * Classe principal da aplicação Ziro
 */
class ZiroApp {
    constructor() {
        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            // Aguarda o DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupApp());
            } else {
                this.setupApp();
            }
        } catch (error) {
            console.error('Erro ao inicializar aplicação Ziro:', error);
        }
    }

    /**
     * Configura a aplicação
     */
    async setupApp() {
        // Inicializa componentes se disponível
        if (window.ziroComponents) {
            await this.initComponents();
        }

        // Inicializa funcionalidades
        this.initYear();
        this.initSmoothScroll();
        this.initAnalytics();
        this.initPerformance();
    }

    /**
     * Inicializa componentes baseado na página atual
     */
    async initComponents() {
        const currentPage = this.getCurrentPage();
        const config = this.getPageConfig(currentPage);
        
        if (config) {
            await window.ziroComponents.initComponents(config);
        }
    }

    /**
     * Obtém a página atual
     * @returns {string} - Nome da página
     */
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('salesforce.html')) return 'salesforce';
        if (path.includes('blip.html')) return 'blip';
        if (path.includes('zendesk.html')) return 'zendesk';
        return 'home';
    }

    /**
     * Obtém configuração específica da página
     * @param {string} page - Nome da página
     * @returns {Object} - Configuração dos componentes
     */
    getPageConfig(page) {
        const baseUrl = page === 'home' ? '.' : '..';
        
        const configs = {
            home: {
                head: {
                    pageTitle: 'Ziro Consultoria Digital',
                    pageDescription: 'Consultoria em Salesforce, Blip e Zendesk para empresas que querem inovar, vender mais e transformar o atendimento.',
                    cssPath: 'assets/css/style.css'
                },
                header: {
                    homeUrl: 'index.html',
                    salesforceUrl: 'lp/salesforce.html',
                    blipUrl: 'lp/blip.html',
                    zendeskUrl: 'lp/zendesk.html'
                }
            },
            salesforce: {
                head: {
                    pageTitle: 'Consultoria Salesforce | Ziro',
                    pageDescription: 'Consultoria Salesforce para empresas que querem crescer, vender mais e automatizar processos. Implantação, integração e automação de vendas.',
                    cssPath: '../assets/css/style.css'
                },
                header: {
                    homeUrl: '../index.html',
                    salesforceUrl: 'salesforce.html',
                    blipUrl: 'blip.html',
                    zendeskUrl: 'zendesk.html'
                }
            },
            blip: {
                head: {
                    pageTitle: 'Consultoria Blip | Ziro',
                    pageDescription: 'Consultoria Blip para automação de atendimento, chatbots, WhatsApp, Instagram e canais digitais. Soluções omnichannel para sua empresa inovar.',
                    cssPath: '../assets/css/style.css'
                },
                header: {
                    homeUrl: '../index.html',
                    salesforceUrl: 'salesforce.html',
                    blipUrl: 'blip.html',
                    zendeskUrl: 'zendesk.html'
                }
            },
            zendesk: {
                head: {
                    pageTitle: 'Consultoria Zendesk | Ziro',
                    pageDescription: 'Consultoria Zendesk para empresas que querem elevar o atendimento ao cliente, aumentar vendas e otimizar processos. Implantação, automação e integração de canais digitais.',
                    cssPath: '../assets/css/style.css'
                },
                header: {
                    homeUrl: '../index.html',
                    salesforceUrl: 'salesforce.html',
                    blipUrl: 'blip.html',
                    zendeskUrl: 'zendesk.html'
                }
            }
        };

        return configs[page] || configs.home;
    }

    /**
     * Atualiza o ano no footer
     */
    initYear() {
        const yearSpan = document.getElementById('ziro-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        
        // Inicializa o alerta de promoção
        this.initPromoAlert();
    }

    /**
     * Inicializa scroll suave para âncoras
     */
    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Inicializa analytics básico
     */
    initAnalytics() {
        // Tracking de cliques em botões principais
        const mainButtons = document.querySelectorAll('.ziro-btn-main, .ziro-btn-whatsapp');
        mainButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('button_click', {
                    button_text: button.textContent.trim(),
                    button_class: button.className
                });
            });
        });
    }

    /**
     * Inicializa otimizações de performance
     */
    initPerformance() {
        // Lazy loading para imagens
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Track de eventos para analytics
     * @param {string} event - Nome do evento
     * @param {Object} data - Dados do evento
     */
    trackEvent(event, data = {}) {
        // Implementação básica de tracking
        console.log('Event:', event, data);
        
        // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', event, data);
        }
    }

    /**
     * Alerta de Promoção - Aparece após 2min17s
     */
    initPromoAlert() {
        const promoTimeout = (2 * 60 + 17) * 1000; // 2 minutos e 17 segundos em milissegundos
        
        setTimeout(() => {
            this.showPromoAlert();
        }, promoTimeout);
    }

    showPromoAlert() {
        // Verifica se o alerta já foi mostrado
        if (localStorage.getItem('ziro_promo_shown')) {
            return;
        }
        
        // Cria o modal de promoção
        const modal = document.createElement('div');
        modal.className = 'ziro-promo-modal';
        modal.innerHTML = `
            <div class="ziro-promo-content">
                <button class="ziro-promo-close">&times;</button>
                <div class="ziro-promo-header">
                    <h2>🎉 Oferta Especial!</h2>
                    <p>Você ainda está aqui? Que tal aproveitar um desconto exclusivo?</p>
                </div>
                <div class="ziro-promo-body">
                    <div class="ziro-promo-offer">
                        <h3>🔥 20% de Desconto + Bônus</h3>
                        <ul>
                            <li>✅ 20% OFF na consultoria Blip</li>
                            <li>✅ Configuração de 2 canais extras GRÁTIS</li>
                            <li>✅ 2 meses de suporte adicional</li>
                            <li>✅ Relatórios personalizados inclusos</li>
                        </ul>
                        <div class="ziro-promo-timer">
                            <p>⏰ Esta oferta expira em:</p>
                            <div class="ziro-countdown" id="promo-countdown">15:00</div>
                        </div>
                    </div>
                    <div class="ziro-promo-cta">
                        <a href="https://wa.me/6199241137?text=Ol%C3%A1%2C+vi+a+oferta+especial+de+20%25+OFF+na+consultoria+Blip%21+Quero+aproveitar%21" 
                           target="_blank" 
                           class="ziro-btn-promo">
                            🚀 Quero Aproveitar Agora!
                        </a>
                        <p class="ziro-promo-note">*Oferta válida apenas para quem está vendo esta mensagem</p>
                    </div>
                </div>
            </div>
        `;
        
        // Adiciona o modal ao body
        document.body.appendChild(modal);
        
        // Marca que o alerta foi mostrado
        localStorage.setItem('ziro_promo_shown', 'true');
        
        // Inicia o countdown
        this.startPromoCountdown();
        
        // Event listeners
        const closeBtn = modal.querySelector('.ziro-promo-close');
        const modalOverlay = modal;
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modal.remove();
            }
        });
        
        // Fecha o modal após 5 minutos
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 5 * 60 * 1000);
    }

    startPromoCountdown() {
        let timeLeft = 15 * 60; // 15 minutos em segundos
        const countdownElement = document.getElementById('promo-countdown');
        
        const countdown = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(countdown);
                countdownElement.textContent = 'EXPIRADO';
                countdownElement.style.color = '#dc2626';
            }
        }, 1000);
    }
}

// Inicializa a aplicação quando o script for carregado
new ZiroApp(); 