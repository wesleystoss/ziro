/**
 * WebChat Manager - Ziro
 * Gerencia o webchat do Blip com fallbacks para WhatsApp
 */

class ZiroWebChat {
    constructor() {
        this.appKey = 'YXByZXNlbnRhY2FvMzE6OTA1MDQ5MjItYmNjNi00ODcxLWE2Y2UtMGUyYWVmMThjMmE2';
        this.customUrl = 'https://wesley-santos-3bh7y.chat.blip.ai/';
        this.whatsappNumber = '6199241137';
        this.whatsappMessage = 'Olá, gostaria de uma consultoria digital com a Ziro';
        this.cdnUrls = [
            'https://unpkg.com/blip-chat-widget',
            'https://cdn.jsdelivr.net/npm/blip-chat-widget@latest/dist/blip-chat-widget.min.js',
            'https://unpkg.com/blip-chat-widget@1.0.0/dist/blip-chat-widget.min.js'
        ];
        this.currentCdnIndex = 0;
        this.maxRetries = 3;
        this.retryCount = 0;
    }

    // Inicializa o webchat
    async init() {
        console.log('Iniciando Ziro WebChat...');
        
        // Tenta carregar o BlipChat
        await this.loadBlipChat();
        
        // Se não conseguir carregar, usa WhatsApp como fallback
        if (typeof BlipChat === 'undefined') {
            console.log('BlipChat não disponível, usando WhatsApp como fallback');
            this.createWhatsAppFallback();
        } else {
            this.initBlipChat();
        }
    }

    // Carrega o script do BlipChat com retry
    async loadBlipChat() {
        return new Promise((resolve) => {
            if (typeof BlipChat !== 'undefined') {
                resolve();
                return;
            }

            const loadScript = (url) => {
                return new Promise((resolveScript, rejectScript) => {
                    const script = document.createElement('script');
                    script.src = url;
                    script.type = 'text/javascript';
                    
                    script.onload = () => {
                        console.log(`BlipChat carregado de: ${url}`);
                        resolveScript();
                    };
                    
                    script.onerror = () => {
                        console.log(`Falha ao carregar de: ${url}`);
                        rejectScript();
                    };
                    
                    document.head.appendChild(script);
                });
            };

            const tryLoad = async () => {
                if (this.retryCount >= this.maxRetries) {
                    console.log('Máximo de tentativas atingido');
                    resolve();
                    return;
                }

                try {
                    await loadScript(this.cdnUrls[this.currentCdnIndex]);
                    resolve();
                } catch (error) {
                    this.retryCount++;
                    this.currentCdnIndex = (this.currentCdnIndex + 1) % this.cdnUrls.length;
                    console.log(`Tentativa ${this.retryCount} falhou, tentando próximo CDN...`);
                    setTimeout(tryLoad, 1000); // Espera 1 segundo antes da próxima tentativa
                }
            };

            tryLoad();
        });
    }

    // Inicializa o BlipChat
    initBlipChat() {
        try {
            new BlipChat()
                .withAppKey(this.appKey)
                .withButton({
                    "color": "#0ec853",
                    "icon": ""
                })
                .withCustomCommonUrl(this.customUrl)
                .build();
            
            console.log('BlipChat inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar BlipChat:', error);
            this.createWhatsAppFallback();
        }
    }

    // Cria o fallback do WhatsApp
    createWhatsAppFallback() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createWhatsAppButton());
        } else {
            this.createWhatsAppButton();
        }
    }

    // Cria o botão de WhatsApp
    createWhatsAppButton() {
        // Remove botão existente se houver
        const existingButton = document.getElementById('ziro-whatsapp-fallback');
        if (existingButton) {
            existingButton.remove();
        }

        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
        
        const whatsappButton = document.createElement('div');
        whatsappButton.id = 'ziro-whatsapp-fallback';
        whatsappButton.innerHTML = `
            <a href="${whatsappUrl}" 
               target="_blank" 
               class="ziro-whatsapp-button"
               title="Falar no WhatsApp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>WhatsApp</span>
            </a>
        `;

        // Adiciona estilos CSS inline
        const style = document.createElement('style');
        style.textContent = `
            .ziro-whatsapp-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #25D366;
                color: white;
                padding: 15px 20px;
                border-radius: 50px;
                text-decoration: none;
                box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 8px;
                font-family: 'Montserrat', sans-serif;
                font-weight: 600;
                font-size: 14px;
                transition: all 0.3s ease;
                border: none;
                cursor: pointer;
            }
            
            .ziro-whatsapp-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
                color: white;
                text-decoration: none;
            }
            
            .ziro-whatsapp-button:active {
                transform: scale(0.95);
            }
            
            @media (max-width: 768px) {
                .ziro-whatsapp-button {
                    bottom: 15px;
                    right: 15px;
                    padding: 12px 16px;
                    font-size: 13px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(whatsappButton);
        
        console.log('Botão WhatsApp criado como fallback');
    }
}

// Inicializa o webchat quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const webchat = new ZiroWebChat();
        webchat.init();
    });
} else {
    const webchat = new ZiroWebChat();
    webchat.init();
} 