# 🗄️ Banco de Dados - Ziro Blog

Este diretório contém todos os arquivos necessários para configurar o banco de dados do sistema de blog da Ziro.

## 📁 Arquivos

- `ziro_blog.sql` - Script completo de criação do banco de dados
- `README.md` - Este arquivo com instruções

## 🚀 Instalação

### Pré-requisitos

- MySQL 5.7+ ou MariaDB 10.2+
- Acesso de administrador ao MySQL
- PHP 7.4+ (para conexão)

### Passo 1: Configurar Variáveis de Ambiente

1. Copie o arquivo `env.exemplo` para `.env`:
```bash
cp env.exemplo .env
```

2. Edite o arquivo `.env` com suas configurações:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ziro_blog
DB_USER=ziro_user
DB_PASSWORD=sua_senha_segura_aqui
```

### Passo 2: Criar Banco de Dados

#### Opção A: Via MySQL Command Line
```bash
mysql -u root -p < database/ziro_blog.sql
```

#### Opção B: Via phpMyAdmin
1. Acesse o phpMyAdmin
2. Clique em "SQL"
3. Cole o conteúdo do arquivo `ziro_blog.sql`
4. Clique em "Executar"

#### Opção C: Via MySQL Workbench
1. Abra o MySQL Workbench
2. Conecte ao seu servidor
3. Abra o arquivo `ziro_blog.sql`
4. Execute o script

### Passo 3: Criar Usuário do Banco

Execute como administrador MySQL:
```sql
CREATE USER 'ziro_user'@'localhost' IDENTIFIED BY 'sua_senha_segura_aqui';
GRANT ALL PRIVILEGES ON ziro_blog.* TO 'ziro_user'@'localhost';
FLUSH PRIVILEGES;
```

### Passo 4: Verificar Instalação

```sql
USE ziro_blog;
SHOW TABLES;
SELECT COUNT(*) as total_articles FROM articles;
```

## 📊 Estrutura do Banco

### Tabelas Principais

| Tabela | Descrição |
|--------|-----------|
| `users` | Administradores e autores |
| `categories` | Categorias dos artigos |
| `tags` | Tags para classificação |
| `articles` | Artigos do blog |
| `article_tags` | Relacionamento artigos-tags |
| `comments` | Comentários dos leitores |
| `article_views` | Estatísticas de visualização |
| `subscribers` | Newsletter |
| `site_settings` | Configurações do site |

### Dados Iniciais

O script inclui dados iniciais:
- ✅ Usuário administrador padrão
- ✅ Categorias principais (Marketing, Vendas, Atendimento, etc.)
- ✅ Tags populares
- ✅ Configurações padrão do site

## 🔧 Configurações

### Variáveis Importantes

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ziro_blog
DB_USER=ziro_user
DB_PASSWORD=sua_senha_segura_aqui

# Site
SITE_URL=https://ziro.digital
BLOG_URL=https://ziro.digital/blog

# Paginação
ARTICLES_PER_PAGE=6
RELATED_ARTICLES_LIMIT=3
FEATURED_ARTICLES_LIMIT=1
```

## 📈 Funcionalidades

### ✅ Implementadas
- Sistema completo de blog
- Categorização e tags
- Comentários aninhados
- Estatísticas de visualização
- Newsletter
- Cache
- Logs de acesso
- Backup automático
- SEO otimizado
- Performance otimizada

### 🔄 Views Úteis
- `v_articles_published` - Artigos publicados com informações completas
- `v_blog_stats` - Estatísticas gerais do blog

### ⚡ Procedures
- `IncrementArticleViews()` - Incrementa visualizações
- `UpdateTagUsageCount()` - Atualiza contagem de tags

## 🔒 Segurança

### Recomendações
1. Use senhas fortes para o banco
2. Configure firewall adequadamente
3. Mantenha MySQL atualizado
4. Faça backups regulares
5. Use SSL para conexões remotas

### Usuário Padrão
- **Username:** admin
- **Email:** admin@ziro.digital
- **Senha:** (definida no script - altere após instalação)

## 📝 Exemplos de Uso

### Inserir Artigo
```sql
INSERT INTO articles (title, slug, excerpt, content, author_id, category_id, status, published_at) 
VALUES (
    'Como aumentar vendas online',
    'como-aumentar-vendas-online',
    'Descubra estratégias comprovadas...',
    'Conteúdo completo do artigo...',
    1, 2, 'published', NOW()
);
```

### Buscar Artigos por Categoria
```sql
SELECT a.*, c.name as category_name, u.full_name as author_name
FROM articles a
JOIN categories c ON a.category_id = c.id
JOIN users u ON a.author_id = u.id
WHERE c.slug = 'marketing-digital'
AND a.status = 'published'
ORDER BY a.published_at DESC;
```

### Estatísticas do Blog
```sql
SELECT * FROM v_blog_stats;
```

## 🛠️ Manutenção

### Backup
```bash
mysqldump -u ziro_user -p ziro_blog > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore
```bash
mysql -u ziro_user -p ziro_blog < backup_file.sql
```

### Limpeza de Cache
```sql
DELETE FROM cache WHERE expires_at < NOW();
```

### Limpeza de Logs Antigos
```sql
DELETE FROM access_logs WHERE accessed_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

## 🐛 Troubleshooting

### Problemas Comuns

**Erro de conexão:**
- Verifique se o MySQL está rodando
- Confirme credenciais no .env
- Teste conexão: `mysql -u ziro_user -p`

**Erro de permissões:**
- Verifique se o usuário tem privilégios
- Execute: `SHOW GRANTS FOR 'ziro_user'@'localhost';`

**Erro de charset:**
- Confirme se o banco usa utf8mb4
- Execute: `SHOW CREATE DATABASE ziro_blog;`

## 📞 Suporte

Para dúvidas ou problemas:
- Email: contato@ziro.digital
- WhatsApp: (61) 99241-1377

---

**Ziro Consultoria Digital** - Transformando negócios com tecnologia! 🚀 