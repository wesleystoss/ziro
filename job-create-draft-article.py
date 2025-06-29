# -*- coding: utf-8 -*-
"""
Job automático para criar artigo de rascunho profissional, persuasivo e alinhado à identidade visual do blog Ziro
"""

import asyncio
import os
import sys
from mcp_server import ZiroBlogMCPServer

async def create_draft_article():
    print("🚀 Criando artigo de rascunho profissional e persuasivo...")
    server = ZiroBlogMCPServer()
    if not await server.connect_database():
        print("❌ Falha ao conectar ao banco de dados")
        return

    article_data = {
        "title": "Automação Digital: Como Empresas Inteligentes Dominam o Mercado em 2025",
        "content": '''
        <section class="blog-hero">
            <div class="container blog-hero-content">
                <div class="blog-hero-text">
                    <h1>Automação Digital: O Segredo das Empresas que Crescem Rápido</h1>
                    <p>Descubra como líderes de mercado estão usando automação para escalar resultados, reduzir custos e conquistar clientes todos os dias.</p>
                </div>
            </div>
        </section>
        <section class="container">
            <h2 class="blog-section-title">Por que a automação é inegociável em 2025?</h2>
            <p class="blog-paragraph">Segundo a <strong>Gartner</strong>, 80% das empresas que mais crescem já automatizam processos-chave. Não é tendência, é sobrevivência. Empresas que ignoram automação perdem competitividade e margem de lucro.</p>
            <blockquote class="blog-quote">“Automatizar é liberar o potencial humano para inovar e vender mais.” — <strong>Harvard Business Review</strong></blockquote>
            <h2 class="blog-section-title">5 Benefícios Imediatos da Automação</h2>
            <ul class="blog-list">
                <li><strong>Redução de custos:</strong> Menos tarefas manuais, mais eficiência.</li>
                <li><strong>Escalabilidade:</strong> Cresça sem aumentar equipe.</li>
                <li><strong>Decisões inteligentes:</strong> Dados em tempo real para agir rápido.</li>
                <li><strong>Experiência do cliente:</strong> Atendimento ágil e personalizado 24/7.</li>
                <li><strong>Mais vendas:</strong> Funis automatizados convertem mais leads em clientes.</li>
            </ul>
            <h2 class="blog-section-title">Case Real: Ziro Digital</h2>
            <p class="blog-paragraph">A Ziro implementou automação em mais de <strong>100 empresas</strong>, aumentando em média <strong>40% a produtividade</strong> e <strong>25% o faturamento</strong> dos clientes. Veja <a href="https://ziro.digital/cases" target="_blank">cases reais</a> e depoimentos de quem já transformou o negócio.</p>
            <img src="https://ziro.digital/assets/images/ziro-logo.png" alt="Case Ziro" class="blog-image" style="max-width:300px;display:block;margin:2rem auto;"/>
            <h2 class="blog-section-title">Como aplicar automação no seu negócio</h2>
            <ol class="blog-list-ordered">
                <li>Mapeie processos repetitivos e gargalos.</li>
                <li>Implemente ferramentas como <a href="/servicos/atendimento-online.html">chatbots</a> e automação de marketing.</li>
                <li>Integre sistemas para centralizar dados e comunicação.</li>
                <li>Monitore resultados e otimize continuamente.</li>
            </ol>
            <div class="cta-section" style="margin:3rem 0 2rem 0;">
                <div class="guarantee-badge" style="margin-bottom:1rem;">
                    <svg width="22" height="22" fill="none" stroke="#22c55e" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/><circle cx="12" cy="12" r="10"/></svg>
                    <strong>Garantia de Resultado</strong>
                </div>
                <h2>Sua empresa pronta para o próximo nível</h2>
                <p>Solicite um diagnóstico gratuito e veja como a Ziro pode transformar seu atendimento, vendas e presença digital. Resultados garantidos em até 30 dias.</p>
                <div class="cta-benefits">
                    <div class="cta-benefit">✅ Diagnóstico gratuito</div>
                    <div class="cta-benefit">✅ Implementação em até 15 dias</div>
                    <div class="cta-benefit">✅ Garantia de resultado</div>
                    <div class="cta-benefit">✅ Suporte especializado</div>
                </div>
                <div class="cta-buttons" style="margin-top:1.5rem;">
                    <a href="https://wa.me/6199241137?text=Olá! Quero profissionalizar meu negócio com soluções digitais" class="btn-cta-primary" target="_blank" rel="noopener">Falar no WhatsApp</a>
                    <a href="tel:+6199241137" class="btn-cta-secondary">Ligar Agora</a>
                </div>
                <p class="cta-note">* Diagnóstico gratuito. Sem compromisso. Resultados garantidos.</p>
            </div>
        </section>
        ''',
        "excerpt": "Descubra como empresas inteligentes usam automação para dominar o mercado em 2025. Dados, cases e CTA real da Ziro.",
        "category": "Automação",
        "tags": ["automação", "negócios digitais", "produtividade", "ziro", "cases", "chatbot", "marketing digital"],
        "status": "draft",
        "is_featured": True,
        "featured_image": "https://ziro.digital/assets/images/ziro-logo.png",
        "read_time": 8,
        "allow_comments": True,
        "seo_title": "Automação Digital: Como Empresas Inteligentes Dominam o Mercado | Ziro Blog",
        "seo_description": "Guia profissional sobre automação digital, com dados, cases, CTA e argumentos de autoridade para escalar empresas em 2025.",
        "seo_keywords": "automação, negócios digitais, produtividade, ziro, cases, chatbot, marketing digital"
    }

    result = server.create_article(article_data)
    if result.get("success"):
        print("✅ Artigo de rascunho profissional criado!")
        print(f"📝 ID: {result['article_id']}")
        print(f"🔗 Slug: {result['slug']}")
        print(f"🌐 URL: {result['url']}")
        print(f"📊 Status: {result['status']}")
    else:
        print(f"❌ Erro ao criar artigo: {result.get('error')}")

if __name__ == "__main__":
    asyncio.run(create_draft_article())
