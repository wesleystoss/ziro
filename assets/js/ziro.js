/**
 * Ziro Consultoria Digital - JavaScript Principal
 */

// Função para animar contagem de números
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
            element.classList.add('animate');
            setTimeout(() => {
                element.classList.remove('animate');
            }, 500);
        }
    }
    
    updateCounter();
}

// Função para verificar se elemento está visível
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

// Função para iniciar animação das estatísticas do hero
function startStatsAnimation() {
    const statsElements = [
        { id: 'stat-dias', target: 15 },
        { id: 'stat-foco', target: 100 },
        { id: 'stat-suporte', target: 24 }
    ];
    
    let animated = false;
    
    function checkAndAnimate() {
        if (animated) return;
        
        const statsContainer = document.querySelector('.ziro-hero-stats');
        if (statsContainer && isElementInViewport(statsContainer)) {
            animated = true;
            
            statsElements.forEach((stat, index) => {
                const element = document.getElementById(stat.id);
                if (element) {
                    setTimeout(() => {
                        animateCounter(element, stat.target);
                    }, index * 200); // Delay entre cada número
                }
            });
        }
    }
    
    // Verifica imediatamente
    checkAndAnimate();
    
    // Verifica no scroll
    window.addEventListener('scroll', checkAndAnimate);
}

// Função para iniciar animação dos resultados
function startResultsAnimation() {
    const resultsElements = [
        { id: 'result-vendas', target: 300, suffix: '%' },
        { id: 'result-leads', target: 500, suffix: '%' },
        { id: 'result-reducao', target: 85, suffix: '%' },
        { id: 'result-atendimento', target: 24, suffix: '/7' }
    ];
    
    function animateResults() {
        resultsElements.forEach((result, index) => {
            const element = document.getElementById(result.id);
            if (element) {
                setTimeout(() => {
                    animateCounter(element, result.target, 2000, result.suffix);
                }, index * 300);
            }
        });
    }
    
    // Inicia a animação após um pequeno delay para garantir que o DOM está pronto
    setTimeout(animateResults, 500);
    
    // Também inicia quando a página carrega completamente
    window.addEventListener('load', animateResults);
    
    // E quando o usuário faz scroll até a seção
    window.addEventListener('scroll', () => {
        const resultsContainer = document.querySelector('.ziro-resultados');
        if (resultsContainer && isElementInViewport(resultsContainer)) {
            animateResults();
        }
    });
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano no footer
    const yearSpan = document.getElementById('ziro-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Inicia animação das estatísticas do hero
    startStatsAnimation();
    
    // Inicia animação dos resultados
    startResultsAnimation();
}); 