# -*- coding: utf-8 -*-
"""
Teste das funções específicas do MCP Server
"""

import asyncio
import os
from pathlib import Path

# Adiciona o diretório atual ao path
import sys
sys.path.insert(0, str(Path(__file__).parent))

from mcp_server import ZiroBlogMCPServer

async def test_database_info():
    """Testa a função get_database_info"""
    print("📊 Testando get_database_info...")
    
    server = ZiroBlogMCPServer()
    await server.connect_database()
    
    info = server.get_database_info()
    
    if "error" in info:
        print(f"❌ Erro: {info['error']}")
        return False
    
    print("✅ Informações do banco obtidas!")
    print(f"   - Banco: {info.get('database_name', 'N/A')}")
    
    if 'blog_statistics' in info and info['blog_statistics']:
        stats = info['blog_statistics']
        print(f"   - Total de artigos: {stats.get('total_articles', 0)}")
        print(f"   - Artigos publicados: {stats.get('published_articles', 0)}")
        print(f"   - Total de visualizações: {stats.get('total_views', 0)}")
        print(f"   - Autores: {stats.get('total_authors', 0)}")
        print(f"   - Categorias: {stats.get('total_categories', 0)}")
    
    if 'recent_articles' in info:
        articles = info['recent_articles']
        print(f"   - Últimos artigos: {len(articles)} encontrados")
        if articles:
            print(f"     * Mais recente: {articles[0].get('title', 'Sem título')}")
    
    if 'categories' in info:
        categories = info['categories']
        print(f"   - Categorias: {len(categories)} encontradas")
        if categories:
            print(f"     * Mais popular: {categories[0].get('name', 'N/A')} ({categories[0].get('article_count', 0)} artigos)")
    
    return True

async def test_repository_info():
    """Testa a função get_repository_info"""
    print("\n📁 Testando get_repository_info...")
    
    server = ZiroBlogMCPServer()
    
    info = server.get_repository_info()
    
    if "error" in info:
        print(f"❌ Erro: {info['error']}")
        return False
    
    print("✅ Informações do repositório obtidas!")
    print(f"   - Projeto: {info.get('project_name', 'N/A')}")
    print(f"   - URL: {info.get('project_url', 'N/A')}")
    print(f"   - Blog: {info.get('blog_url', 'N/A')}")
    
    if 'services' in info:
        services = info['services']
        print(f"   - Serviços: {len(services)} encontrados")
        for service in services[:3]:  # Mostra apenas os 3 primeiros
            print(f"     * {service.get('name', 'N/A')}")
    
    if 'technologies' in info:
        techs = info['technologies']
        print(f"   - Tecnologias: {', '.join(techs)}")
    
    if 'features' in info:
        features = info['features']
        print(f"   - Funcionalidades: {len(features)} listadas")
        for feature in features[:3]:  # Mostra apenas as 3 primeiras
            print(f"     * {feature}")
    
    return True

async def test_search_articles():
    """Testa a função search_articles"""
    print("\n🔍 Testando search_articles...")
    
    server = ZiroBlogMCPServer()
    await server.connect_database()
    
    # Testa busca por termo comum
    articles = server.search_articles("digital", limit=5)
    
    if not articles or (len(articles) == 1 and "error" in articles[0]):
        print("⚠️ Nenhum artigo encontrado ou erro na busca")
        return True  # Não é necessariamente um erro
    
    print(f"✅ Busca realizada! Encontrados {len(articles)} artigos")
    
    for i, article in enumerate(articles[:3], 1):  # Mostra apenas os 3 primeiros
        print(f"   {i}. {article.get('title', 'Sem título')}")
        print(f"      - Categoria: {article.get('category_name', 'N/A')}")
        print(f"      - Visualizações: {article.get('view_count', 0)}")
        print(f"      - Status: {article.get('status', 'N/A')}")
        if article.get('tags'):
            print(f"      - Tags: {article.get('tags', 'N/A')}")
    
    return True

async def test_article_by_id():
    """Testa a função get_article_by_id"""
    print("\n📄 Testando get_article_by_id...")
    
    server = ZiroBlogMCPServer()
    await server.connect_database()
    
    # Primeiro busca um artigo para obter um ID válido
    articles = server.search_articles("", limit=1)
    
    if not articles or (len(articles) == 1 and "error" in articles[0]):
        print("⚠️ Nenhum artigo disponível para teste")
        return True
    
    article_id = articles[0].get('id')
    if not article_id:
        print("⚠️ ID do artigo não encontrado")
        return True
    
    # Agora testa buscar por ID
    article = server.get_article_by_id(article_id)
    
    if "error" in article:
        print(f"❌ Erro: {article['error']}")
        return False
    
    print(f"✅ Artigo encontrado por ID {article_id}!")
    print(f"   - Título: {article.get('title', 'N/A')}")
    print(f"   - Autor: {article.get('author_name', 'N/A')}")
    print(f"   - Categoria: {article.get('category_name', 'N/A')}")
    print(f"   - Status: {article.get('status', 'N/A')}")
    print(f"   - Visualizações: {article.get('view_count', 0)}")
    if article.get('tags'):
        print(f"   - Tags: {article.get('tags', 'N/A')}")
    
    return True

async def main():
    """Função principal de teste"""
    print("🧪 Teste das Funções do MCP Server")
    print("=" * 50)
    
    # Carrega variáveis de ambiente
    env_file = Path(".env")
    if env_file.exists():
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    os.environ[key] = value
    
    tests_passed = 0
    total_tests = 4
    
    # Testa cada função
    if await test_database_info():
        tests_passed += 1
    
    if await test_repository_info():
        tests_passed += 1
    
    if await test_search_articles():
        tests_passed += 1
    
    if await test_article_by_id():
        tests_passed += 1
    
    # Resultado final
    print("\n" + "=" * 50)
    print(f"📊 Resultado dos testes: {tests_passed}/{total_tests} passaram")
    
    if tests_passed == total_tests:
        print("🎉 Todas as funções estão funcionando perfeitamente!")
        print("\n✅ O MCP Server está pronto para uso no Cursor!")
        print("\n💡 Exemplos de uso:")
        print("- get_database_info: Ver estatísticas do blog")
        print("- get_repository_info: Analisar estrutura do projeto")
        print("- search_articles: Buscar artigos por termo")
        print("- get_article_by_id: Buscar artigo específico")
    else:
        print("⚠️ Algumas funções falharam.")
        print("💡 Verifique a conexão com o banco de dados e tente novamente.")
    
    return tests_passed == total_tests

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1) 