# MCP Server para Ziro Blog

Este é um servidor MCP (Model Context Protocol) personalizado para o Cursor que permite conectar com o banco de dados MySQL do blog Ziro e fornecer informações sobre o repositório.

## 🚀 Funcionalidades

O servidor MCP oferece as seguintes ferramentas:

### 📊 Banco de Dados
- **get_database_info**: Retorna informações completas sobre o banco de dados
  - Estatísticas do blog (total de artigos, visualizações, autores)
  - Lista de tabelas e suas informações
  - Últimos artigos publicados
  - Categorias e contagem de artigos

### 📁 Repositório
- **get_repository_info**: Fornece informações sobre o projeto
  - Estrutura de arquivos
  - Configurações do projeto
  - Serviços disponíveis
  - Tecnologias utilizadas

### 🔍 Busca de Artigos
- **search_articles**: Busca artigos por termo
  - Busca em título, conteúdo e excerpt
  - Filtra apenas artigos publicados
  - Retorna informações completas dos artigos

### 📄 Artigos Específicos
- **get_article_by_id**: Busca artigo específico por ID
  - Informações completas do artigo
  - Dados do autor e categoria
  - Tags associadas

## 📋 Pré-requisitos

- Python 3.7+
- MySQL Server
- Cursor IDE
- Acesso ao banco de dados do blog

## 🔧 Instalação

### 1. Clone ou baixe os arquivos
Certifique-se de que os seguintes arquivos estão no seu projeto:
- `mcp-server.py`
- `setup-mcp.py`
- `requirements.txt`

### 2. Execute o script de configuração
```bash
python setup-mcp.py
```

O script irá:
- Instalar as dependências Python
- Criar arquivo `.env` com configurações
- Testar conexão com banco de dados
- Configurar o Cursor automaticamente

### 3. Configure as credenciais
Edite o arquivo `.env` com suas credenciais reais do banco de dados:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u474727782_ziro
DB_USER=u474727782_root
DB_PASSWORD=sua_senha_real_aqui
```

### 4. Reinicie o Cursor
Feche e abra o Cursor para carregar a nova configuração MCP.

## 🎯 Como Usar

### No Cursor
Após a configuração, o MCP Server estará disponível como `ziro-blog`. Você pode:

1. **Consultar informações do banco de dados**:
   ```
   Use a ferramenta get_database_info para ver estatísticas do blog
   ```

2. **Buscar artigos**:
   ```
   Use a ferramenta search_articles com query "marketing digital" para encontrar artigos sobre marketing
   ```

3. **Ver informações do repositório**:
   ```
   Use a ferramenta get_repository_info para entender a estrutura do projeto
   ```

### Exemplos de Uso

#### Buscar artigos sobre vendas
```
Busque artigos que contenham "vendas" no título ou conteúdo
```

#### Ver estatísticas do blog
```
Mostre as estatísticas atuais do blog, incluindo total de artigos e visualizações
```

#### Analisar estrutura do projeto
```
Forneça informações sobre a estrutura de arquivos e tecnologias utilizadas
```

## 🗂️ Estrutura do Banco de Dados

O servidor MCP trabalha com as seguintes tabelas principais:

- **articles**: Artigos do blog
- **categories**: Categorias dos artigos
- **tags**: Tags para classificação
- **users**: Autores/administradores
- **comments**: Comentários dos leitores
- **article_tags**: Relacionamento artigos-tags
- **article_views**: Estatísticas de visualização

## 🔍 Solução de Problemas

### Erro de Conexão com Banco de Dados
1. Verifique se o MySQL está rodando
2. Confirme as credenciais no arquivo `.env`
3. Teste a conexão manualmente:
   ```bash
   mysql -h localhost -u u474727782_root -p u474727782_ziro
   ```

### MCP Server não aparece no Cursor
1. Verifique se o arquivo de configuração foi criado em `~/.cursor/settings.json`
2. Reinicie o Cursor completamente
3. Verifique se o Python está no PATH

### Dependências não instaladas
Execute manualmente:
```bash
pip install mysql-connector-python==8.2.0
```

## 📝 Desenvolvimento de Artigos

Com o MCP Server configurado, você pode facilmente:

1. **Analisar artigos existentes** para entender o estilo e formato
2. **Ver categorias populares** para escolher tópicos relevantes
3. **Buscar conteúdo similar** para evitar duplicação
4. **Entender a estrutura** do blog para criar artigos compatíveis

### Exemplo de Workflow para Novo Artigo

1. **Pesquisar tópicos existentes**:
   ```
   Busque artigos sobre "automação" para ver o que já foi publicado
   ```

2. **Ver categorias disponíveis**:
   ```
   Mostre as categorias do blog e quantos artigos cada uma tem
   ```

3. **Analisar artigos populares**:
   ```
   Mostre os artigos mais visualizados para entender o que funciona
   ```

4. **Criar artigo compatível**:
   Com base nas informações obtidas, criar um artigo que se encaixe no padrão do blog.

## 🔒 Segurança

- As credenciais do banco de dados são armazenadas no arquivo `.env`
- O arquivo `.env` deve ser adicionado ao `.gitignore`
- O servidor MCP só acessa o banco de dados em modo leitura
- Não há risco de modificação acidental dos dados

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do Cursor
2. Teste a conexão com o banco de dados manualmente
3. Execute o script de configuração novamente
4. Verifique se todas as dependências estão instaladas

## 🚀 Próximos Passos

Com o MCP Server configurado, você pode:

- Solicitar artigos diários baseados em tendências do blog
- Analisar performance de artigos existentes
- Identificar gaps de conteúdo
- Manter consistência no estilo e formato dos artigos

O servidor MCP torna o processo de criação de conteúdo muito mais eficiente e contextualizado! 