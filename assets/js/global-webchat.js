/**
 * Global WebChat Loader - Ziro
 * Script que pode ser incluído em qualquer página para carregar o webchat automaticamente
 * Funciona independentemente do sistema de componentes
 */

(function() {
    'use strict';
    
    // Evita carregar múltiplas vezes
    if (window.ZiroGlobalWebChatLoaded) {
        return;
    }
    
    window.ZiroGlobalWebChatLoaded = true;
    
    console.log('GlobalWebChat: Inicializando carregamento automático...');
    
    function loadWebChat() {
        // Verifica se o webchat já foi carregado
        if (typeof window.ZiroWebChat !== 'undefined' || typeof window.BlipChat !== 'undefined') {
            console.log('GlobalWebChat: WebChat já está disponível');
            return;
        }

        // Verifica se o script já existe no DOM
        const existingScript = document.querySelector('script[src*="webchat.js"]');
        if (existingScript) {
            console.log('GlobalWebChat: WebChat já existe no DOM');
            return;
        }

        console.log('GlobalWebChat: Carregando WebChat...');

        // Detecta o caminho base
        const currentPath = window.location.pathname;
        let basePath = 'assets/js/';
        
        // Se estiver na pasta lp/, usa caminho relativo
        if (currentPath.includes('/lp/')) {
            basePath = '../assets/js/';
        }
        
        // Cria e adiciona o script do webchat
        const script = document.createElement('script');
        script.src = basePath + 'webchat.js';
        script.type = 'text/javascript';
        
        script.onload = () => {
            console.log('GlobalWebChat: WebChat carregado com sucesso');
        };
        
        script.onerror = () => {
            console.error('GlobalWebChat: Erro ao carregar WebChat');
        };
        
        document.head.appendChild(script);
    }

    // Carrega quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadWebChat);
    } else {
        loadWebChat();
    }
})(); 