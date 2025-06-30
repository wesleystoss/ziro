# MCP PHP

- MCPServer.php: Classe principal para integração com banco e manipulação de artigos.
- config.php: Carrega variáveis do .env.
- database.php: Conexão MySQL.
- utils.php: Funções utilitárias (ex: gerar slug).

## Como usar

Inclua o MCPServer.php e use os métodos estáticos para criar, buscar e listar artigos.

Exemplo:
```php
require_once 'MCPServer.php';
$result = MCPServer::createArticle([...]);
```
