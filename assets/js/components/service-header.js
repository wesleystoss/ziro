/**
 * Carregador do Header de Serviços
 * Carrega dinamicamente o header específico para páginas de serviços
 */

class ServiceHeaderLoader {
    constructor() {
        this.headerContainer = null;
        this.init();
    }

    async init() {
        try {
            // Aguarda o DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.loadHeader());
            } else {
                this.loadHeader();
            }
        } catch (error) {
            console.error('Erro ao carregar header de serviços:', error);
        }
    }

    async loadHeader() {
        try {
            // Busca o container do header (se existir)
            this.headerContainer = document.querySelector('[data-service-header]');
            
            if (!this.headerContainer) {
                // Se não encontrar um container específico, procura por um header existente
                const existingHeader = document.querySelector('.landing-header');
                if (existingHeader) {
                    // Remove o header existente para substituir
                    existingHeader.remove();
                }
                
                // Cria um novo container no início do body
                this.headerContainer = document.createElement('div');
                this.headerContainer.setAttribute('data-service-header', '');
                document.body.insertBefore(this.headerContainer, document.body.firstChild);
            }

            // Carrega o conteúdo do header
            const response = await fetch('/assets/components/service-header.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const headerContent = await response.text();
            this.headerContainer.innerHTML = headerContent;

            // Inicializa funcionalidades do header
            this.initializeHeaderFeatures();
            
        } catch (error) {
            console.error('Erro ao carregar header de serviços:', error);
            // Fallback: cria um header básico se falhar
            this.createFallbackHeader();
        }
    }

    initializeHeaderFeatures() {
        // Inicializa menu mobile
        this.initializeMobileMenu();
        
        // Inicializa navegação suave
        this.initializeSmoothScrolling();
        
        // Inicializa scroll behavior
        this.initializeScrollBehavior();
    }

    initializeMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Fecha menu ao clicar em um link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    initializeSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.landing-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initializeScrollBehavior() {
        let lastScrollTop = 0;
        const header = document.querySelector('.landing-header');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Adiciona/remove classe para efeito de scroll
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Esconde/mostra header no scroll (opcional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    createFallbackHeader() {
        const fallbackHeader = `
            <header class="landing-header">
                <div class="container">
                    <a href="/" class="logo">ZIRO</a>
                    <nav class="nav-menu">
                        <a href="#beneficios">Benefícios</a>
                        <a href="#como-funciona">Como Funciona</a>
                        <a href="#contato" class="cta-nav">Fale Conosco</a>
                    </nav>
                </div>
            </header>
        `;
        
        if (this.headerContainer) {
            this.headerContainer.innerHTML = fallbackHeader;
        }
    }
}

// Auto-inicialização quando o script é carregado
if (typeof window !== 'undefined') {
    window.serviceHeaderLoader = new ServiceHeaderLoader();
}

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServiceHeaderLoader;
} 