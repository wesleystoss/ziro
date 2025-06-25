/**
 * Ziro Consultoria Digital - JavaScript Principal
 */

// Função para animar contagem de números
function animateCounter(element, target, duration = 2000, suffix = '') {
    // Se o elemento já foi animado, não anima novamente
    if (element.classList.contains('counter-animated')) return;
    
    element.classList.add('counter-animated');
    
    const startTime = Date.now();
    const startValue = 0;
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Função de easing para suavizar a animação
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(target * easeOutQuart);
        
        // Atualiza o texto do elemento
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Garante que o valor final seja exato
            element.textContent = target + suffix;
            element.classList.add('animate');
            setTimeout(() => {
                element.classList.remove('animate');
            }, 500);
        }
    }
    
    // Inicia a animação
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
        { id: 'stat-garantia', target: 30 },
        { id: 'stat-resultados', target: 90 }
    ];
    
    let animated = false;
    
    function checkAndAnimate() {
        if (animated) return;
        
        // Para o hero, sempre executa a animação quando a página carrega
        animated = true;
        
        statsElements.forEach((stat, index) => {
            const element = document.getElementById(stat.id);
            
            if (element && !element.classList.contains('counter-animated')) {
                setTimeout(() => {
                    animateCounter(element, stat.target);
                }, index * 200); // Delay entre cada número
            }
        });
    }
    
    // Verifica imediatamente
    checkAndAnimate();
    
    // Também verifica no scroll caso a página seja recarregada
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
    
    let hasAnimated = false;
    
    function animateResults() {
        if (hasAnimated) return;
        
        const resultsContainer = document.querySelector('.ziro-resultados');
        if (resultsContainer && isElementInViewport(resultsContainer)) {
            hasAnimated = true;
            
            resultsElements.forEach((result, index) => {
                const element = document.getElementById(result.id);
                if (element && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    setTimeout(() => {
                        animateCounter(element, result.target, 2000, result.suffix);
                    }, index * 300);
                }
            });
        }
    }
    
    // Verifica imediatamente
    animateResults();
    
    // Verifica no scroll
    window.addEventListener('scroll', animateResults);
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano no footer
    const yearSpan = document.getElementById('ziro-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Inicia animação das estatísticas do hero com pequeno delay
    setTimeout(() => {
        startStatsAnimation();
    }, 100);
    
    // Inicia animação dos resultados
    startResultsAnimation();
}); 