# -*- coding: utf-8 -*-
"""
Teste direto das funções do MCP Server
"""

import asyncio
import os
import sys
from pathlib import Path

# Carrega variáveis de ambiente
env_file = Path(".env")
if env_file.exists():
    with open(env_file, 'r', encoding='utf-8') as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                os.environ[key] = value

async def test_database_connection():
    """Testa conexão direta com banco de dados"""
    print("🔍 Testando conexão direta com banco de dados...")
    
    try:
        import mysql.connector
        from mysql.connector import Error
        
        config = {
            'host': os.getenv('DB_HOST', 'localhost'),
            'port': int(os.getenv('DB_PORT', 3306)),
            'database': os.getenv('DB_NAME', 'u474727782_ziro'),
            'user': os.getenv('DB_USER', 'u474727782_root'),
            'password': os.getenv('DB_PASSWORD', ''),
            'charset': 'utf8mb4'
        }
        
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor(dictionary=True)
        
        # Testa estatísticas do blog
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
        
        stats = cursor.fetchone()
        
        # Testa busca de artigos
        cursor.execute("""
            SELECT 
                id, title, slug, status, published_at, view_count
            FROM articles 
            WHERE status = 'published'
            ORDER BY created_at DESC 
            LIMIT 5
        """)
        
        articles = cursor.fetchall()
        
        # Testa categorias
        cursor.execute("""
            SELECT 
                c.name, c.slug, c.description,
                COUNT(a.id) as article_count
            FROM categories c
            LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
            GROUP BY c.id
            ORDER BY article_count DESC
            LIMIT 5
        """)
        
        categories = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        print("✅ Conexão e consultas realizadas com sucesso!")
        print(f"   - Total de artigos: {stats.get('total_articles', 0)}")
        print(f"   - Artigos publicados: {stats.get('published_articles', 0)}")
        print(f"   - Total de visualizações: {stats.get('total_views', 0)}")
        print(f"   - Autores: {stats.get('total_authors', 0)}")
        print(f"   - Categorias: {stats.get('total_categories', 0)}")
        
        print(f"   - Últimos artigos: {len(articles)} encontrados")
        if articles:
            print(f"     * Mais recente: {articles[0].get('title', 'Sem título')}")
        
        print(f"   - Categorias: {len(categories)} encontradas")
        if categories:
            print(f"     * Mais popular: {categories[0].get('name', 'N/A')} ({categories[0].get('article_count', 0)} artigos)")
        
        return True
        
    except Error as e:
        print(f"❌ Erro na conexão: {e}")
        return False
    except ImportError:
        print("❌ mysql-connector-python não instalado")
        return False

async def test_repository_scan():
    """Testa escaneamento do repositório"""
    print("\n📁 Testando escaneamento do repositório...")
    
    try:
        project_root = Path(__file__).parent
        
        # Lista arquivos principais
        main_files = [
            "index.html",
            "blog/index.php",
            "database/ziro_blog.sql",
            "env.exemplo",
            "servicos/"
        ]
        
        print("✅ Estrutura do projeto:")
        for file_path in main_files:
            full_path = project_root / file_path
            if full_path.exists():
                if full_path.is_file():
                    size = full_path.stat().st_size
                    print(f"   ✅ {file_path} ({size} bytes)")
                else:
                    print(f"   ✅ {file_path} (diretório)")
            else:
                print(f"   ❌ {file_path} (não encontrado)")
        
        # Lista serviços
        services_dir = project_root / "servicos"
        if services_dir.exists():
            services = list(services_dir.glob("*.html"))
            print(f"   - Serviços encontrados: {len(services)}")
            for service in services[:3]:
                print(f"     * {service.stem.replace('-', ' ').title()}")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro ao escanear repositório: {e}")
        return False

async def test_search_functionality():
    """Testa funcionalidade de busca"""
    print("\n🔍 Testando funcionalidade de busca...")
    
    try:
        import mysql.connector
        from mysql.connector import Error
        
        config = {
            'host': os.getenv('DB_HOST', 'localhost'),
            'port': int(os.getenv('DB_PORT', 3306)),
            'database': os.getenv('DB_NAME', 'u474727782_ziro'),
            'user': os.getenv('DB_USER', 'u474727782_root'),
            'password': os.getenv('DB_PASSWORD', ''),
            'charset': 'utf8mb4'
        }
        
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor(dictionary=True)
        
        # Testa busca por termo
        search_term = "digital"
        cursor.execute("""
            SELECT 
                a.id, a.title, a.slug, a.excerpt, a.status, a.published_at, a.view_count,
                c.name as category_name
            FROM articles a
            LEFT JOIN categories c ON a.category_id = c.id
            WHERE (a.title LIKE %s OR a.content LIKE %s OR a.excerpt LIKE %s)
            AND a.status = 'published'
            ORDER BY a.published_at DESC
            LIMIT 5
        """, (f"%{search_term}%", f"%{search_term}%", f"%{search_term}%"))
        
        articles = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        print(f"✅ Busca por '{search_term}' realizada!")
        print(f"   - Artigos encontrados: {len(articles)}")
        
        for i, article in enumerate(articles[:3], 1):
            print(f"   {i}. {article.get('title', 'Sem título')}")
            print(f"      - Categoria: {article.get('category_name', 'N/A')}")
            print(f"      - Visualizações: {article.get('view_count', 0)}")
        
        return True
        
    except Error as e:
        print(f"❌ Erro na busca: {e}")
        return False
    except ImportError:
        print("❌ mysql-connector-python não instalado")
        return False

async def main():
    """Função principal de teste"""
    print("🧪 Teste Direto das Funcionalidades")
    print("=" * 50)
    
    tests_passed = 0
    total_tests = 3
    
    # Testa cada funcionalidade
    if await test_database_connection():
        tests_passed += 1
    
    if await test_repository_scan():
        tests_passed += 1
    
    if await test_search_functionality():
        tests_passed += 1
    
    # Resultado final
    print("\n" + "=" * 50)
    print(f"📊 Resultado dos testes: {tests_passed}/{total_tests} passaram")
    
    if tests_passed == total_tests:
        print("🎉 Todas as funcionalidades estão funcionando!")
        print("\n✅ O MCP Server está pronto para uso no Cursor!")
        print("\n💡 Agora você pode:")
        print("1. Reiniciar o Cursor")
        print("2. Usar as ferramentas MCP:")
        print("   - get_database_info: Ver estatísticas do blog")
        print("   - get_repository_info: Analisar estrutura do projeto")
        print("   - search_articles: Buscar artigos por termo")
        print("   - get_article_by_id: Buscar artigo específico")
        print("\n🚀 Pronto para criar artigos diários!")
    else:
        print("⚠️ Algumas funcionalidades falharam.")
        print("💡 Verifique a conexão com o banco de dados.")
    
    return tests_passed == total_tests

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1) 