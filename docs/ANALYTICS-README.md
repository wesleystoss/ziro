# Sistema de Analytics - Ziro Consultoria Digital

## Como Funciona

O sistema de analytics foi implementado de forma centralizada e inteligente para funcionar em todas as páginas, exceto aquelas que devem ser excluídas.

### Arquivos Principais

1. **`assets/js/config.js`** - Configuração centralizada
   - Define o ID do Google Analytics
   - Lista as páginas que devem excluir analytics
   - Função `shouldLoadAnalytics()` para verificar se deve carregar

2. **`assets/js/analytics.js`** - Sistema de carregamento
   - Classe `ZiroAnalytics` que gerencia o carregamento
   - Verifica automaticamente se deve carregar baseado na configuração
   - Carrega o GTM apenas quando necessário

3. **`assets/components/head.html`** - Componente head
   - Template simples sem lógica de analytics
   - O analytics é gerenciado pelo JavaScript

### Páginas Excluídas

O analytics **NÃO** será carregado nas seguintes páginas:
- `/servicos/salesforce.html`
- `/servicos/zendesk.html`
- `/test-auto-webchat.html`
- `/test-simple-webchat.html`
- `/test-simple.html`
- `/test-webchat.html`

### Como Adicionar/Remover Páginas

Para adicionar ou remover páginas da lista de exclusão, edite o arquivo `assets/js/config.js`:

```javascript
excludePages: [
    '/servicos/salesforce.html',
    '/servicos/zendesk.html',
    '/test-auto-webchat.html',
    '/test-simple-webchat.html',
    '/test-simple.html',
    '/test-webchat.html',
    // Adicione ou remova páginas aqui
]
```

### Ordem de Carregamento dos Scripts

Para funcionar corretamente, os scripts devem ser carregados nesta ordem:

1. `config.js` - Configurações globais
2. `analytics.js` - Sistema de analytics
3. `components.js` - Sistema de componentes
4. Outros scripts específicos da página

### Vantagens desta Implementação

✅ **Centralizado**: Toda configuração em um lugar
✅ **Flexível**: Fácil adicionar/remover páginas da exclusão
✅ **Performance**: Analytics só carrega quando necessário
✅ **Manutenível**: Código limpo e bem organizado
✅ **Escalável**: Fácil adicionar novos tipos de analytics

### Debug

Para verificar se o analytics está funcionando:

1. Abra o console do navegador
2. Procure pela mensagem: "Google Analytics carregado com sucesso"
3. Verifique se o `gtag` está disponível globalmente
4. Teste em páginas incluídas e excluídas

### Exemplo de Uso

```javascript
// Verificar se analytics está carregado
if (window.gtag) {
    // Analytics está disponível
    gtag('event', 'button_click', {
        'event_category': 'engagement',
        'event_label': 'cta_button'
    });
}
``` 