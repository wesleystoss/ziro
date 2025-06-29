# 📝 Guia Completo: Como Criar Artigos no Blog Ziro

## 🚀 Introdução

Agora você pode criar artigos diretamente pelo Cursor usando o MCP Server! Esta funcionalidade permite criar artigos completos com todos os metadados necessários e salvá-los diretamente no banco de dados MySQL.

## 🛠️ Como Usar

### 1. **No Cursor, use a ferramenta `create_article`**

Exemplo de como solicitar a criação de um artigo:

```
Crie um artigo sobre "Como implementar automação de marketing" com:
- Título: "Guia Completo: Automação de Marketing para Pequenas Empresas"
- Categoria: "Marketing Digital"
- Tags: ["automação", "marketing", "pequenas empresas", "produtividade"]
- Status: "draft"
- Conteúdo completo em HTML
- SEO otimizado
```

### 2. **Parâmetros Disponíveis**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `title` | string | ✅ | Título do artigo |
| `content` | string | ✅ | Conteúdo completo em HTML |
| `excerpt` | string | ❌ | Resumo do artigo |
| `category` | string | ❌ | Categoria (criada automaticamente se não existir) |
| `tags` | array | ❌ | Lista de tags |
| `status` | string | ❌ | "draft" ou "published" (padrão: "draft") |
| `is_featured` | boolean | ❌ | Se deve ser destacado (padrão: false) |
| `seo_title` | string | ❌ | Título SEO |
| `seo_description` | string | ❌ | Descrição SEO |
| `seo_keywords` | string | ❌ | Palavras-chave SEO |

### 3. **Exemplo Completo**

```json
{
  "title": "Como o MCP Server revoluciona a criação de conteúdo",
  "content": "<h2>Introdução</h2><p>O Model Context Protocol...</p>",
  "excerpt": "Descubra como o MCP Server está revolucionando...",
  "category": "Tecnologia",
  "tags": ["MCP", "Automação", "Blog", "Tecnologia"],
  "status": "draft",
  "is_featured": true,
  "seo_title": "MCP Server: Revolução na Criação de Conteúdo",
  "seo_description": "Descubra como o MCP Server automatiza...",
  "seo_keywords": "MCP Server, automação, blog, criação de conteúdo"
}
```

## 🔧 Funcionalidades Automáticas

### ✅ **Geração de Slug**
- Cria automaticamente um slug único baseado no título
- Remove acentos e caracteres especiais
- Adiciona timestamp se o slug já existir

### ✅ **Gestão de Categorias**
- Cria categoria automaticamente se não existir
- Associa o artigo à categoria existente

### ✅ **Gestão de Tags**
- Cria tags automaticamente se não existirem
- Associa todas as tags ao artigo

### ✅ **SEO Automático**
- Gera metadados SEO se não fornecidos
- Usa título como SEO title padrão
- Usa excerpt como SEO description padrão

### ✅ **Autor Automático**
- Associa automaticamente ao primeiro autor disponível
- Suporta roles "admin" e "author"

## 📊 Status do Artigo

### **Draft (Rascunho)**
- Artigo salvo mas não publicado
- Não aparece no blog público
- Pode ser editado posteriormente

### **Published (Publicado)**
- Artigo publicado imediatamente
- Aparece no blog público
- Data de publicação definida automaticamente

## 🔍 Como Verificar

### 1. **Buscar Artigos Criados**
Use a ferramenta `search_articles` para encontrar seus artigos:

```
Busque artigos sobre "MCP" ou "automação"
```

### 2. **Verificar por ID**
Use a ferramenta `get_article_by_id` com o ID retornado:

```
Busque o artigo com ID [ID_DO_ARTIGO]
```

### 3. **Verificar no Banco**
Use a ferramenta `get_database_info` para ver estatísticas atualizadas.

## 🎯 Dicas de Uso

### **Para Artigos Diários**
1. Use status "draft" para revisar antes de publicar
2. Inclua sempre excerpt para melhor SEO
3. Use tags relevantes para categorização
4. Defina categoria específica para organização

### **Para SEO Otimizado**
1. Forneça seo_title personalizado
2. Escreva seo_description atrativa
3. Inclua seo_keywords relevantes
4. Use estrutura HTML adequada no conteúdo

### **Para Conteúdo Rico**
1. Use HTML para formatação
2. Inclua listas e títulos
3. Adicione links quando relevante
4. Mantenha estrutura lógica

## 🚨 Tratamento de Erros

### **Erros Comuns**
- **Campo obrigatório faltando**: Verifique se title e content estão fornecidos
- **Nenhum autor encontrado**: Verifique se há usuários com role "admin" ou "author"
- **Erro de conexão**: Verifique configurações do banco de dados

### **Soluções**
- Sempre forneça title e content
- Verifique se o banco está acessível
- Confirme se há usuários autorizados no sistema

## 📈 Próximos Passos

1. **Teste a funcionalidade** com artigos simples
2. **Crie conteúdo regular** usando o sistema
3. **Monitore estatísticas** do blog
4. **Otimize SEO** com metadados personalizados

## 🎉 Benefícios

- ✅ **Produtividade**: Criação rápida de artigos
- ✅ **Automação**: Processo totalmente automatizado
- ✅ **SEO**: Otimização automática
- ✅ **Organização**: Categorias e tags automáticas
- ✅ **Integração**: Conexão direta com banco de dados

---

**🎯 Agora você pode criar artigos diários de forma eficiente e automatizada!** 