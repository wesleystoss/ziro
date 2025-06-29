# -*- coding: utf-8 -*-
"""
Script de teste para criar artigos usando o MCP Server
"""

import asyncio
import json
import sys
import os

# Adiciona o diretório atual ao path para importar o módulo
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importa a classe do servidor MCP
from mcp_server import ZiroBlogMCPServer

async def test_create_article():
    """Testa a criação de um artigo"""
    print("🧪 Testando criação de artigo...")
    
    server = ZiroBlogMCPServer()
    
    # Conectar ao banco de dados
    if not await server.connect_database():
        print("❌ Falha ao conectar ao banco de dados")
        return
    
    # Dados do artigo de teste
    article_data = {
        "title": "Como o MCP Server revoluciona a criação de conteúdo",
        "content": """
        <h2>Introdução</h2>
        <p>O Model Context Protocol (MCP) está transformando a forma como criamos e gerenciamos conteúdo digital. 
        Com a integração do MCP Server ao nosso blog Ziro, conseguimos automatizar e otimizar todo o processo de criação de artigos.</p>
        
        <h2>Benefícios do MCP Server</h2>
        <ul>
            <li><strong>Automação completa:</strong> Criação automática de artigos diretamente pelo Cursor</li>
            <li><strong>Integração perfeita:</strong> Conexão direta com banco de dados MySQL</li>
            <li><strong>SEO otimizado:</strong> Geração automática de slugs e metadados</li>
            <li><strong>Gestão de categorias:</strong> Criação automática de categorias e tags</li>
        </ul>
        
        <h2>Como funciona</h2>
        <p>O MCP Server atua como uma ponte entre o Cursor e nosso banco de dados, permitindo que você:</p>
        <ol>
            <li>Pesquise artigos existentes</li>
            <li>Crie novos artigos com todos os metadados</li>
            <li>Gerencie categorias e tags automaticamente</li>
            <li>Monitore estatísticas do blog</li>
        </ol>
        
        <h2>Exemplo prático</h2>
        <p>Para criar um novo artigo, basta usar a ferramenta <code>create_article</code> com os dados necessários. 
        O sistema automaticamente:</p>
        <ul>
            <li>Gera um slug único baseado no título</li>
            <li>Cria categorias se não existirem</li>
            <li>Associa tags automaticamente</li>
            <li>Define metadados SEO</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>A implementação do MCP Server no blog Ziro representa um avanço significativo em nossa capacidade de 
        criar e gerenciar conteúdo de forma eficiente e automatizada.</p>
        """,
        "excerpt": "Descubra como o MCP Server está revolucionando a criação de conteúdo no blog Ziro, automatizando todo o processo de criação de artigos.",
        "category": "Tecnologia",
        "tags": ["MCP", "Automação", "Blog", "Tecnologia", "Cursor"],
        "status": "draft",
        "is_featured": True,
        "seo_title": "MCP Server: Revolução na Criação de Conteúdo - Ziro Blog",
        "seo_description": "Descubra como o MCP Server automatiza a criação de artigos no blog Ziro, otimizando SEO e produtividade.",
        "seo_keywords": "MCP Server, automação, blog, criação de conteúdo, SEO, Cursor"
    }
    
    # Criar o artigo
    result = server.create_article(article_data)
    
    if result.get("success"):
        print("✅ Artigo criado com sucesso!")
        print(f"📝 ID do artigo: {result['article_id']}")
        print(f"🔗 Slug: {result['slug']}")
        print(f"🌐 URL: {result['url']}")
        print(f"📊 Status: {result['status']}")
    else:
        print(f"❌ Erro ao criar artigo: {result.get('error')}")

async def test_search_articles():
    """Testa a busca de artigos"""
    print("\n🔍 Testando busca de artigos...")
    
    server = ZiroBlogMCPServer()
    
    if not await server.connect_database():
        return
    
    # Buscar artigos sobre MCP
    articles = server.search_articles("MCP", limit=5)
    
    if articles and not articles[0].get("error"):
        print(f"📚 Encontrados {len(articles)} artigos:")
        for article in articles:
            print(f"  - {article['title']} (ID: {article['id']})")
    else:
        print("❌ Erro na busca ou nenhum artigo encontrado")

async def main():
    """Função principal"""
    print("🚀 Iniciando testes do MCP Server - Criação de Artigos")
    print("=" * 60)
    
    # Teste de criação de artigo
    await test_create_article()
    
    # Teste de busca
    await test_search_articles()
    
    print("\n✅ Testes concluídos!")

if __name__ == "__main__":
    asyncio.run(main())