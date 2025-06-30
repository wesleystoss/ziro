# Status do WebChat - Ziro

## 🚫 WebChat Desabilitado Temporariamente

O webchat foi desabilitado em todas as páginas do site. Atualmente, nenhum botão de chat ou WhatsApp aparece nas páginas.

## 📁 Arquivos Afetados

### Páginas Principais:
- `index.html` - Página inicial
- `servicos/blip.html` - Landing page Blip
- `servicos/salesforce.html` - Landing page Salesforce
- `servicos/zendesk.html` - Landing page Zendesk

### Páginas de Teste:
- `test-webchat.html` - Teste original
- `test-simple-webchat.html` - Teste simples

## 🔧 Como Reativar o WebChat

Para reativar o webchat, siga estes passos:

### 1. Páginas Principais
Em cada página, localize a linha comentada no `<head>`:

```html
<!-- WebChat - DESABILITADO TEMPORARIAMENTE -->
<!-- <script src="assets/js/webchat.js"></script> -->
```

E descomente a linha do script:

```html
<!-- WebChat -->
<script src="assets/js/webchat.js"></script>
```

### 2. Páginas de Landing Page
Para páginas na pasta `servicos/`, use o caminho relativo:

```html
<!-- WebChat -->
<script src="../assets/js/webchat.js"></script>
```

### 3. Páginas de Teste
Para as páginas de teste, descomente a linha:

```html
<!-- WebChat -->
<script src="assets/js/webchat.js"></script>
```

## 📋 Lista de Arquivos para Modificar

### Páginas Principais:
- [ ] `index.html` - Linha 12
- [ ] `servicos/blip.html` - Linha 12
- [ ] `servicos/salesforce.html` - Linha 12
- [ ] `servicos/zendesk.html` - Linha 12

### Páginas de Teste:
- [ ] `test-webchat.html` - Linha 10
- [ ] `test-simple-webchat.html` - Linha 18

## ✅ Verificação

Após reativar, verifique se:

1. **Botão de chat aparece** no canto inferior direito
2. **Console não mostra erros** (F12 → Console)
3. **Funciona em todas as páginas** testadas

## 🔍 Troubleshooting

Se o webchat não funcionar após reativar:

1. **Verifique o console** (F12) para erros
2. **Confirme os caminhos** dos scripts estão corretos
3. **Teste uma página por vez** para isolar problemas
4. **Verifique se o arquivo** `assets/js/webchat.js` existe

## 📝 Notas

- O webchat inclui fallback para WhatsApp se o Blip não carregar
- Funciona com múltiplos CDNs para maior confiabilidade
- Logs detalhados no console para debug
- Botão responsivo e estilizado

---

**Última atualização**: WebChat desabilitado em todas as páginas
**Status**: ❌ Desabilitado
**Próxima ação**: Descomentar scripts quando necessário reativar 