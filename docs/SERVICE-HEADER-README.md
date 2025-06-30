# Header de Serviços - Componente Reutilizável

## Visão Geral

Este componente foi criado para padronizar o header das páginas de serviços, reduzindo a necessidade de alterações manuais em cada página individual. O header é carregado dinamicamente via JavaScript, permitindo fácil manutenção e atualizações centralizadas.

## Arquivos do Componente

- `assets/components/service-header.html` - Template HTML do header
- `assets/js/components/service-header.js` - Script JavaScript para carregamento dinâmico

## Como Implementar

### 1. Estrutura HTML Básica

Adicione o container do header no início do `<body>`:

```html
<body>
    <!-- Container para o header de serviços (será carregado dinamicamente) -->
    <div data-service-header></div>
    
    <!-- Resto do conteúdo da página -->
</body>
```

### 2. Incluir o Script

Adicione o script antes dos outros scripts da página:

```html
<!-- Scripts -->
<script src="../assets/js/components/service-header.js"></script>
<!-- Outros scripts da página -->
```

## Funcionalidades

### Navegação
- Links para seções da página (Benefícios, Como Funciona, Contato)
- Navegação suave com scroll automático
- Menu responsivo para mobile

### Menu Mobile
- Botão hambúrguer que abre/fecha o menu
- Fecha automaticamente ao clicar em um link
- Animações suaves

### Comportamento no Scroll
- Header fica com fundo sólido após scroll
- Opção de esconder/mostrar header no scroll (configurável)

## Páginas Atualizadas

As seguintes páginas já foram atualizadas para usar o novo componente:

- ✅ `servicos/atendimento-online.html`
- ✅ `servicos/loja-virtual.html`
- ✅ `servicos/site-institucional.html`
- ✅ `servicos/landing-page.html`

**Nota:** As páginas de Salesforce e Zendesk foram intencionalmente ignoradas conforme solicitado.

## Personalização

### Modificar o Header

Para alterar o header, edite apenas o arquivo `assets/components/service-header.html`. As mudanças serão aplicadas automaticamente em todas as páginas que usam o componente.

### Adicionar Novos Links

1. Edite `assets/components/service-header.html`
2. Adicione os novos links na `<nav class="nav-menu">`
3. Certifique-se de que as seções correspondentes existem nas páginas

### Estilos CSS

O header usa as classes CSS existentes:
- `.landing-header` - Container principal
- `.logo` - Logo da Ziro
- `.nav-menu` - Menu de navegação
- `.cta-nav` - Botão de call-to-action
- `.hamburger-menu` - Botão do menu mobile

## Vantagens

1. **Manutenção Centralizada**: Alterações em um único arquivo
2. **Consistência**: Header idêntico em todas as páginas de serviços
3. **Performance**: Carregamento dinâmico otimizado
4. **Flexibilidade**: Fácil personalização e extensão
5. **Responsividade**: Funciona perfeitamente em mobile

## Troubleshooting

### Header não carrega
- Verifique se o caminho do script está correto
- Confirme se o arquivo `service-header.html` existe
- Verifique o console do navegador para erros

### Links não funcionam
- Certifique-se de que as seções com os IDs correspondentes existem
- Verifique se o script `service-header.js` está sendo carregado

### Problemas de estilo
- Confirme se os arquivos CSS estão sendo carregados
- Verifique se as classes CSS estão definidas

## Próximos Passos

Para adicionar o componente em novas páginas de serviços:

1. Adicione `<div data-service-header></div>` no início do `<body>`
2. Inclua o script `service-header.js` antes dos outros scripts
3. Certifique-se de que as seções referenciadas no menu existem na página

---

**Desenvolvido para Ziro Consultoria Digital**
*Componente criado para otimizar a manutenção das páginas de serviços* 