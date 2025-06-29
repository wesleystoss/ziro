# -*- coding: utf-8 -*-
"""
MCP Server para Ziro Blog
Conecta com banco de dados MySQL e fornece informações sobre o repositório
"""

import asyncio
import json
import os
import sys
from typing import Any, Dict, List, Optional
import mysql.connector
from mysql.connector import Error
from pathlib import Path
import re
from datetime import datetime

# Configurações do banco de dados
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': int(os.getenv('DB_PORT', 3306)),
    'database': os.getenv('DB_NAME', 'u474727782_ziro'),
    'user': os.getenv('DB_USER', 'u474727782_root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'charset': 'utf8mb4',
    'collation': 'utf8mb4_unicode_ci'
}

class ZiroBlogMCPServer:
    def __init__(self):
        self.connection = None
        self.project_root = Path(__file__).parent

    async def connect_database(self):
        try:
            self.connection = mysql.connector.connect(**DB_CONFIG)
            print("✅ Conectado ao banco de dados MySQL")
            return True
        except Error as e:
            print(f"❌ Erro ao conectar ao banco de dados: {e}")
            return False

    def get_database_info(self) -> Dict[str, Any]:
        if not self.connection:
            return {"error": "Não conectado ao banco de dados"}
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute("""
                SELECT 
                    TABLE_NAME,
                    TABLE_ROWS,
                    DATA_LENGTH,
                    INDEX_LENGTH,
                    CREATE_TIME,
                    UPDATE_TIME
                FROM information_schema.TABLES 
                WHERE TABLE_SCHEMA = %s
                ORDER BY TABLE_NAME
            """, (DB_CONFIG['database'],))
            tables = cursor.fetchall()
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_articles,
                    SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_articles,
                    SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_articles,
                    SUM(view_count) as total_views,
                    COUNT(DISTINCT author_id) as total_authors,
                    COUNT(DISTINCT category_id) as total_categories
                FROM articles
            """)
            blog_stats = cursor.fetchone()
            cursor.execute("""
                SELECT 
                    id, title, slug, status, published_at, view_count,
                    (SELECT name FROM categories WHERE id = articles.category_id) as category_name
                FROM articles 
                ORDER BY created_at DESC 
                LIMIT 10
            """)
            recent_articles = cursor.fetchall()
            cursor.execute("""
                SELECT 
                    c.name, c.slug, c.description,
                    COUNT(a.id) as article_count
                FROM categories c
                LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
                GROUP BY c.id
                ORDER BY article_count DESC
            """)
            categories = cursor.fetchall()
            cursor.close()
            return {
                "database_name": DB_CONFIG['database'],
                "tables": tables,
                "blog_statistics": blog_stats,
                "recent_articles": recent_articles,
                "categories": categories
            }
        except Error as e:
            return {"error": f"Erro ao consultar banco de dados: {e}"}

    def get_repository_info(self) -> Dict[str, Any]:
        try:
            files_structure = self._scan_directory(self.project_root)
            config_files = {
                "env_example": self._read_file("env.exemplo"),
                "database_schema": self._read_file("database/ziro_blog.sql"),
                "blog_index": self._read_file("blog/index.php"),
                "main_index": self._read_file("index.html")
            }
            services = []
            services_dir = self.project_root / "servicos"
            if services_dir.exists():
                for service_file in services_dir.glob("*.html"):
                    services.append({
                        "name": service_file.stem.replace("-", " ").title(),
                        "file": str(service_file.relative_to(self.project_root)),
                        "url": f"https://ziro.digital/servicos/{service_file.name}"
                    })
            return {
                "project_name": "Ziro Consultoria Digital",
                "project_description": "Sistema de blog e site institucional para consultoria digital",
                "project_url": "https://ziro.digital",
                "blog_url": "https://ziro.digital/blog",
                "files_structure": files_structure,
                "config_files": config_files,
                "services": services,
                "technologies": ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
                "features": [
                    "Blog com sistema de categorias e tags",
                    "Sistema de comentários",
                    "Estatísticas de visualização",
                    "Newsletter/Inscrições",
                    "Sistema de cache",
                    "SEO otimizado",
                    "Responsivo"
                ]
            }
        except Exception as e:
            return {"error": f"Erro ao analisar repositório: {e}"}

    def _scan_directory(self, path: Path, max_depth: int = 3, current_depth: int = 0) -> Dict[str, Any]:
        if current_depth > max_depth:
            return {"type": "directory", "truncated": True}
        result = {"type": "directory", "contents": {}}
        try:
            for item in sorted(path.iterdir()):
                if item.name.startswith('.'):
                    continue
                if item.is_file():
                    result["contents"][item.name] = {
                        "type": "file",
                        "size": item.stat().st_size,
                        "extension": item.suffix
                    }
                elif item.is_dir():
                    result["contents"][item.name] = self._scan_directory(
                        item, max_depth, current_depth + 1
                    )
        except PermissionError:
            result["contents"] = {"error": "Permissão negada"}
        return result

    def _read_file(self, file_path: str) -> Optional[str]:
        try:
            full_path = self.project_root / file_path
            if full_path.exists():
                return full_path.read_text(encoding='utf-8', errors='ignore')
            return None
        except Exception:
            return None

    def search_articles(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        if not self.connection:
            return [{"error": "Não conectado ao banco de dados"}]
        try:
            cursor = self.connection.cursor(dictionary=True)
            search_query = """
                SELECT 
                    a.id, a.title, a.slug, a.excerpt, a.status, a.published_at, a.view_count,
                    c.name as category_name,
                    GROUP_CONCAT(t.name SEPARATOR ', ') as tags
                FROM articles a
                LEFT JOIN categories c ON a.category_id = c.id
                LEFT JOIN article_tags at ON a.id = at.article_id
                LEFT JOIN tags t ON at.tag_id = t.id
                WHERE (a.title LIKE %s OR a.content LIKE %s OR a.excerpt LIKE %s)
                AND a.status = 'published'
                GROUP BY a.id
                ORDER BY a.published_at DESC
                LIMIT %s
            """
            search_term = f"%{query}%"
            cursor.execute(search_query, (search_term, search_term, search_term, limit))
            articles = cursor.fetchall()
            cursor.close()
            return [dict(article) for article in articles] if articles else []
        except Error as e:
            return [{"error": f"Erro na busca: {e}"}]

    def get_article_by_id(self, article_id: int) -> Optional[Dict[str, Any]]:
        if not self.connection:
            return {"error": "Não conectado ao banco de dados"}
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute("""
                SELECT 
                    a.*,
                    c.name as category_name,
                    c.slug as category_slug,
                    u.full_name as author_name,
                    GROUP_CONCAT(t.name SEPARATOR ', ') as tags
                FROM articles a
                LEFT JOIN categories c ON a.category_id = c.id
                LEFT JOIN users u ON a.author_id = u.id
                LEFT JOIN article_tags at ON a.id = at.article_id
                LEFT JOIN tags t ON at.tag_id = t.id
                WHERE a.id = %s
                GROUP BY a.id
            """, (article_id,))
            article = cursor.fetchone()
            cursor.close()
            return dict(article) if article else None
        except Error as e:
            return {"error": f"Erro ao buscar artigo: {e}"}

    def create_article(self, article_data: Dict[str, Any]) -> Dict[str, Any]:
        if not self.connection:
            return {"error": "Não conectado ao banco de dados"}
        try:
            cursor = self.connection.cursor(dictionary=True)
            required_fields = ['title', 'content']
            for field in required_fields:
                if not article_data.get(field):
                    return {"error": f"Campo obrigatório '{field}' não fornecido"}
            title = article_data['title']
            slug = self._generate_slug(title)
            cursor.execute("SELECT id FROM articles WHERE slug = %s", (slug,))
            if cursor.fetchone():
                slug = f"{slug}-{int(datetime.now().timestamp())}"
            category_id = None
            if article_data.get('category'):
                category_name = article_data['category']
                cursor.execute("SELECT id FROM categories WHERE name = %s", (category_name,))
                category_result = cursor.fetchone()
                if category_result:
                    category_id = category_result.get('id')
                else:
                    category_slug = self._generate_slug(category_name)
                    cursor.execute("""
                        INSERT INTO categories (name, slug, description, color, is_active)
                        VALUES (%s, %s, %s, %s, %s)
                    """, (category_name, category_slug, f"Artigos sobre {category_name}", "#2563eb", True))
                    category_id = cursor.lastrowid
            cursor.execute("SELECT id FROM users WHERE role IN ('admin', 'author') LIMIT 1")
            author_result = cursor.fetchone()
            if not author_result:
                return {"error": "Nenhum autor encontrado no sistema"}
            author_id = author_result.get('id')
            now = datetime.now()
            article_insert_data = {
                'title': title,
                'slug': slug,
                'excerpt': article_data.get('excerpt', ''),
                'content': article_data['content'],
                'author_id': author_id,
                'category_id': category_id,
                'status': article_data.get('status', 'draft'),
                'is_featured': article_data.get('is_featured', False),
                'allow_comments': article_data.get('allow_comments', True),
                'read_time': article_data.get('read_time', 5),
                'seo_title': article_data.get('seo_title', title),
                'seo_description': article_data.get('seo_description', article_data.get('excerpt', '')),
                'seo_keywords': article_data.get('seo_keywords', ''),
                'published_at': now if article_data.get('status') == 'published' else None
            }
            cursor.execute("""
                INSERT INTO articles (
                    title, slug, excerpt, content, author_id, category_id, status,
                    is_featured, allow_comments, read_time, seo_title, seo_description,
                    seo_keywords, published_at, created_at, updated_at
                ) VALUES (
                    %(title)s, %(slug)s, %(excerpt)s, %(content)s, %(author_id)s, %(category_id)s, %(status)s,
                    %(is_featured)s, %(allow_comments)s, %(read_time)s, %(seo_title)s, %(seo_description)s,
                    %(seo_keywords)s, %(published_at)s, %(created_at)s, %(updated_at)s
                )
            """, {**article_insert_data, 'created_at': now, 'updated_at': now})
            article_id = cursor.lastrowid
            if article_data.get('tags'):
                tags = article_data['tags']
                if isinstance(tags, str):
                    tags = [tag.strip() for tag in tags.split(',')]
                for tag_name in tags:
                    if tag_name.strip():
                        cursor.execute("SELECT id FROM tags WHERE name = %s", (tag_name.strip(),))
                        tag_result = cursor.fetchone()
                        if tag_result:
                            tag_id = tag_result.get('id')
                        else:
                            tag_slug = self._generate_slug(tag_name.strip())
                            cursor.execute("""
                                INSERT INTO tags (name, slug, description, color, is_active)
                                VALUES (%s, %s, %s, %s, %s)
                            """, (tag_name.strip(), tag_slug, f"Artigos sobre {tag_name.strip()}", "#64748b", True))
                            tag_id = cursor.lastrowid
                        cursor.execute("""
                            INSERT INTO article_tags (article_id, tag_id)
                            VALUES (%s, %s)
                        """, (article_id, tag_id))
            self.connection.commit()
            cursor.close()
            return {
                "success": True,
                "message": "Artigo criado com sucesso!",
                "article_id": article_id,
                "slug": slug,
                "url": f"https://ziro.digital/blog/{slug}",
                "status": article_insert_data['status']
            }
        except Error as e:
            if self.connection:
                self.connection.rollback()
            return {"error": f"Erro ao criar artigo: {e}"}

    def _generate_slug(self, text: str) -> str:
        text = text.lower()
        text = re.sub(r'[àáâãäå]', 'a', text)
        text = re.sub(r'[èéêë]', 'e', text)
        text = re.sub(r'[ìíîï]', 'i', text)
        text = re.sub(r'[òóôõö]', 'o', text)
        text = re.sub(r'[ùúûü]', 'u', text)
        text = re.sub(r'[ç]', 'c', text)
        text = re.sub(r'[^a-z0-9\s-]', '', text)
        text = re.sub(r'[\s-]+', '-', text)
        text = text.strip('-')
        return text

# Handlers para o protocolo MCP
async def handle_initialize(params: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "protocolVersion": "2024-11-05",
        "capabilities": {
            "tools": {
                "listChanged": True
            }
        },
        "serverInfo": {
            "name": "ziro-blog-mcp",
            "version": "1.0.0"
        }
    }

async def handle_tools_list(params: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "tools": [
            {
                "name": "get_database_info",
                "description": "Retorna informações sobre o banco de dados do blog",
                "inputSchema": {
                    "type": "object",
                    "properties": {},
                    "required": []
                }
            },
            {
                "name": "get_repository_info", 
                "description": "Retorna informações sobre o repositório do projeto",
                "inputSchema": {
                    "type": "object",
                    "properties": {},
                    "required": []
                }
            },
            {
                "name": "search_articles",
                "description": "Busca artigos no banco de dados",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Termo de busca"
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Número máximo de resultados",
                            "default": 10
                        }
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "get_article_by_id",
                "description": "Busca artigo específico por ID",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "article_id": {
                            "type": "integer",
                            "description": "ID do artigo"
                        }
                    },
                    "required": ["article_id"]
                }
            },
            {
                "name": "create_article",
                "description": "Cria um novo artigo no banco de dados",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "Título do artigo"
                        },
                        "content": {
                            "type": "string",
                            "description": "Conteúdo completo do artigo"
                        },
                        "excerpt": {
                            "type": "string",
                            "description": "Resumo do artigo"
                        },
                        "category": {
                            "type": "string",
                            "description": "Categoria do artigo"
                        },
                        "tags": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "Tags do artigo"
                        },
                        "status": {
                            "type": "string",
                            "enum": ["draft", "published"],
                            "description": "Status do artigo",
                            "default": "draft"
                        },
                        "is_featured": {
                            "type": "boolean",
                            "description": "Se o artigo deve ser destacado",
                            "default": False
                        },
                        "seo_title": {
                            "type": "string",
                            "description": "Título SEO"
                        },
                        "seo_description": {
                            "type": "string",
                            "description": "Descrição SEO"
                        },
                        "seo_keywords": {
                            "type": "string",
                            "description": "Palavras-chave SEO"
                        }
                    },
                    "required": ["title", "content"]
                }
            }
        ]
    }

async def handle_tools_call(params: Dict[str, Any]) -> Dict[str, Any]:
    server = ZiroBlogMCPServer()
    await server.connect_database()
    calls = params.get("calls", [])
    results = []
    for call in calls:
        tool_name = call.get("name")
        arguments = call.get("arguments", {})
        try:
            if tool_name == "get_database_info":
                result = server.get_database_info()
            elif tool_name == "get_repository_info":
                result = server.get_repository_info()
            elif tool_name == "search_articles":
                query = arguments.get("query", "")
                limit = arguments.get("limit", 10)
                result = server.search_articles(query, limit)
            elif tool_name == "get_article_by_id":
                article_id = arguments.get("article_id")
                result = server.get_article_by_id(article_id)
            elif tool_name == "create_article":
                result = server.create_article(arguments)
            else:
                result = {"error": f"Ferramenta desconhecida: {tool_name}"}
            results.append({
                "name": tool_name,
                "content": [
                    {
                        "type": "text",
                        "text": json.dumps(result, indent=2, ensure_ascii=False)
                    }
                ]
            })
        except Exception as e:
            results.append({
                "name": tool_name,
                "isError": True,
                "error": {
                    "message": str(e)
                }
            })
    return {"results": results}

async def main():
    server = ZiroBlogMCPServer()
    if await server.connect_database():
        print("🚀 Servidor MCP Ziro Blog iniciado com sucesso!")
        print("📊 Conectado ao banco de dados MySQL")
        print("📁 Repositório analisado")
        print("\nFerramentas disponíveis:")
        print("- get_database_info: Informações do banco de dados")
        print("- get_repository_info: Informações do repositório")
        print("- search_articles: Buscar artigos")
        print("- get_article_by_id: Buscar artigo específico")
        print("- create_article: Criar novo artigo")
    else:
        print("⚠️ Servidor iniciado sem conexão com banco de dados")
    while True:
        try:
            line = await asyncio.get_event_loop().run_in_executor(None, sys.stdin.readline)
            if not line:
                break
            message = json.loads(line)
            method = message.get("method")
            params = message.get("params", {})
            message_id = message.get("id")
            response = None
            if method == "initialize":
                response = await handle_initialize(params)
            elif method == "tools/list":
                response = await handle_tools_list(params)
            elif method == "tools/call":
                response = await handle_tools_call(params)
            else:
                response = {"error": {"code": -32601, "message": f"Método não encontrado: {method}"}}
            if message_id is not None:
                print(json.dumps({
                    "jsonrpc": "2.0",
                    "id": message_id,
                    "result": response
                }))
        except json.JSONDecodeError:
            continue
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Erro: {e}", file=sys.stderr)

if __name__ == "__main__":
    asyncio.run(main())

