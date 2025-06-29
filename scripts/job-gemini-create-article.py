# -*- coding: utf-8 -*-
"""
Job automático: cria artigo de rascunho usando Gemini 1.5 Flash, seguindo a identidade visual do blog Ziro
"""

import asyncio
import os
import sys
import requests

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../mcp')))
from mcp_server import ZiroBlogMCPServer

# Configure sua chave Gemini API aqui
gemini_api_key = os.getenv("GEMINI_API_KEY") or "SUA_CHAVE_AQUI"
gemini_api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + gemini_api_key

# Configure sua chave Perplexity API aqui
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY") or "SUA_CHAVE_AQUI"
PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions"

# Serviços oferecidos pela Ziro (pode ser expandido)
SERVICOS = [
    "Automação de Atendimento",
    "Loja Virtual",
    "Landing Page",
    "Site Institucional",
    "Consultoria em Marketing Digital",
    "Chatbots para WhatsApp",
    "SEO para Pequenas Empresas"
]

async def gerar_artigo_ia():
    import random
    from datetime import datetime, date
    import uuid
    subtitulos = [
        "Tendências para o futuro", "Erros comuns e como evitar", "Como aplicar na prática", "Dicas avançadas", "O que ninguém te conta", "Passo a passo para resultados", "Estudo de caso real", "Checklist definitivo", "Oportunidades para pequenas empresas", "Como escalar resultados", "Estratégias para 2025", "O que mudou este ano", "Como se destacar no mercado", "O segredo das empresas líderes", "Como evitar armadilhas", "O que fazer diferente", "Como inovar com pouco orçamento"
    ]
    tema = random.choice(SERVICOS)
    subtitulo = random.choice(subtitulos)
    data_hoje = date.today().isoformat()
    seed = str(uuid.uuid4())
    prompt = f'''
Crie um artigo completo, profissional, persuasivo e com argumentos de autoridade sobre o tema: "{tema}". O subtópico do artigo deve ser: "{subtitulo}".
O artigo deve ser voltado para empresários e gestores de pequenas e médias empresas.

Requisitos:
- O título do artigo deve ser único, criativo e nunca repetir títulos anteriores. Não use títulos genéricos ou já usados.
- Estrutura HTML igual ao exemplo abaixo, usando as classes: blog-post-intro, blog-section-title, blog-list, blog-post-highlight, blog-post-tip, blog-post-case, blog-post-cta, blog-post-tags, etc.
- Use títulos, subtítulos, listas, blocos de destaque, dicas, dados, citações e CTA forte.
- O HTML deve ser pronto para ser exibido no blog, com pelo menos 800 palavras, dividido em seções.
- Exemplo de estrutura:
<div class="blog-post-intro">...</div>
<h2>...</h2>
<ul>...</ul>
<div class="blog-post-highlight">...</div>
<h3>...</h3>
<ul>...</ul>
<div class="blog-post-tip">...</div>
<div class="blog-post-case">...</div>
<div class="blog-post-cta">...</div>
<div class="blog-post-tags">...</div>
- Pesquise uma imagem gratuita e relevante ao tema no Unsplash (https://unsplash.com) e use a URL como campo featured_image.
- Gere também o campo excerpt (resumo) de até 200 caracteres.
- Gere também os campos: category (relacionada ao tema), tags (lista de palavras-chave), seo_title, seo_description, seo_keywords (palavras separadas por vírgula).
- Não repita argumentos, exemplos, listas ou estrutura de artigos anteriores. Inove na abordagem, use dados e cases atuais. Use como inspiração o dia de hoje: {data_hoje} e o identificador único: {seed}.
- Não inclua as tags no corpo do artigo, apenas gere a lista de tags no campo apropriado do JSON.
- Ao criar o CTA do artigo, utilize o link correto conforme o serviço:
  - "Automação de Atendimento" → /servicos/atendimento-online
  - "Loja Virtual" → /servicos/loja-virtual
  - "Landing Page" → /servicos/landing-page
  - "Site Institucional" → /servicos/site-institucional
  - "Consultoria em Marketing Digital" → /servicos/landing-page
  - "Chatbots para WhatsApp" → /servicos/atendimento-online
  - "SEO para Pequenas Empresas" → /servicos/landing-page
  Nunca invente ou altere o link do CTA. Se o serviço não estiver listado, use apenas "/servicos".
- Responda apenas com um JSON no formato:
{{
  "title": "...",
  "excerpt": "...",
  "content": "...HTML...",
  "featured_image": "URL da imagem do Unsplash",
  "category": "...",
  "tags": ["...", "..."],
  "seo_title": "...",
  "seo_description": "...",
  "seo_keywords": "..., ..."
}}
O CTA precisa ter exatamente esses elementos, como no exemplo abaixo:

    <h3>🚀 Pronto para Dominar a Prospecção Multicanal?</h3>
    <p>A Ziro Consultoria Digital desenvolve estratégias multicanal completas que maximizam seus resultados de prospecção. Nossa equipe especializada integra todos os canais para gerar mais vendas.</p>
    <div class="blog-post-cta-buttons">
        <a href="/servicos/prospeccao-multicanal" class="btn-primary">Conheça Nossos Serviços Multicanal</a>
        <a href="https://wa.me/6199241137" class="btn-secondary">Fale Conosco no WhatsApp</a>
    </div>
- Altere apenas o texto do CTA, mantendo a estrutura HTML e as classes.
'''
    headers = {"Content-Type": "application/json"}
    data = {"contents": [{"parts": [{"text": prompt}]}]}
    response = requests.post(gemini_api_url, headers=headers, json=data, timeout=90)
    response.raise_for_status()
    import re, json as pyjson
    import demjson3
    text = response.json()["candidates"][0]["content"]["parts"][0]["text"]
    match = re.search(r'\{.*\}', text, re.DOTALL)
    if not match:
        raise Exception("Resposta da IA não contém JSON válido. Resposta bruta:\n" + text)
    json_str = match.group(0)
    # Tenta corrigir vírgulas a mais antes de fechar objetos/listas
    json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
    try:
        artigo = pyjson.loads(json_str)
    except Exception:
        try:
            artigo = demjson3.decode(json_str)
        except Exception as e:
            print("Erro ao decodificar JSON gerado pela IA (mesmo com demjson3):\n", json_str)
            raise e
    return artigo

async def create_draft_article():
    print("🚀 Gerando artigo de rascunho com Gemini 2.5 Flash...")
    artigo = await gerar_artigo_ia()
    server = ZiroBlogMCPServer()
    if not await server.connect_database():
        print("❌ Falha ao conectar ao banco de dados")
        return
    from datetime import datetime
    import random
    # Ajusta os campos dinamicamente conforme a resposta da IA
    article_data = {
        "title": artigo["title"],
        "content": artigo["content"],
        "excerpt": artigo["excerpt"],
        "category": artigo.get("category") or "Geral",
        "tags": artigo.get("tags") or ["ziro", "negócios digitais"],
        "status": "draft",
        "is_featured": False,
        "featured_image": artigo.get("featured_image") or "../assets/images/ziro-logo.png",
        "read_time": artigo.get("read_time") or 8,
        "allow_comments": True,
        "seo_title": artigo.get("seo_title") or artigo["title"] + " | Ziro Blog",
        "seo_description": artigo.get("seo_description") or artigo["excerpt"],
        "seo_keywords": artigo.get("seo_keywords") or ", ".join(artigo.get("tags", [])),
        "published_at": datetime.now().isoformat(),
        "author_id": random.choice([3, 4, 5])
    }
    result = server.create_article(article_data)
    if result.get("success"):
        print("✅ Artigo de rascunho criado pela IA!")
        print(f"📝 ID: {result['article_id']}")
        print(f"🔗 Slug: {result['slug']}")
        print(f"🌐 URL: {result['url']}")
        print(f"📊 Status: {result['status']}")
    else:
        print(f"❌ Erro ao criar artigo: {result.get('error')}")

if __name__ == "__main__":
    asyncio.run(create_draft_article())
