<?php
require_once __DIR__ . '/../mcp/MCPServer.php';

function get_unsplash_image_url($query, $tags = [], $max_attempts = 10) {
    $base_url = "https://source.unsplash.com/960x540/?";
    $queries = array_merge([$query], $tags, ["business", "technology", "digital", "office", "success", "marketing", "people", "startup", "meeting", "workspace"]);
    $tried = [];
    $attempts = 0;
    foreach ($queries as $q) {
        if (!$q || in_array($q, $tried)) continue;
        $tried[] = $q;
        $url = $base_url . urlencode($q);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        $final_url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        curl_close($ch);
        if ($final_url && strpos($final_url, 'images.unsplash.com') !== false) {
            // HEAD para garantir que existe
            $head = curl_init($final_url);
            curl_setopt($head, CURLOPT_NOBODY, true);
            curl_setopt($head, CURLOPT_RETURNTRANSFER, true);
            curl_exec($head);
            $code = curl_getinfo($head, CURLINFO_HTTP_CODE);
            $type = curl_getinfo($head, CURLINFO_CONTENT_TYPE);
            curl_close($head);
            if ($code == 200 && strpos($type, 'image') !== false) {
                return $final_url;
            }
        }
        $attempts++;
        if ($attempts >= $max_attempts) break;
    }
    return null;
}

function gerar_prompt($tema, $subtitulo, $data_hoje, $seed) {
    return <<<PROMPT
Crie um artigo completo, profissional, persuasivo e com argumentos de autoridade sobre o tema: "$tema". O subtópico do artigo deve ser: "$subtitulo".
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
- Não repita argumentos, exemplos, listas ou estrutura de artigos anteriores. Inove na abordagem, use dados e cases atuais. Use como inspiração o dia de hoje: $data_hoje e o identificador único: $seed.
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
{
  "title": "...",
  "excerpt": "...",
  "content": "...HTML...",
  "featured_image": "URL da imagem do Unsplash",
  "category": "...",
  "tags": ["...", "..."],
  "seo_title": "...",
  "seo_description": "...",
  "seo_keywords": "..., ..."
}
- O modelo de CTA deve ser sempre o mesmo, apenas alterando o link conforme o serviço:
    <h3>🚀 Pronto para Dominar a Prospecção Multicanal?</h3>
    <p>A Ziro Consultoria Digital desenvolve estratégias multicanal completas que maximizam seus resultados de prospecção. Nossa equipe especializada integra todos os canais para gerar mais vendas.</p>
    <div class="blog-post-cta-buttons">
        <a href="/servicos/prospeccao-multicanal" class="btn-primary">Conheça Nossos Serviços Multicanal</a>
        <a href="https://wa.me/6199241137" class="btn-secondary">Fale Conosco no WhatsApp</a>
    </div>

PROMPT;
}

function gerar_artigo_ia() {
    $servicos = [
        "Automação de Atendimento",
        "Loja Virtual",
        "Landing Page",
        "Site Institucional",
        "Consultoria em Marketing Digital",
        "Chatbots para WhatsApp",
        "SEO para Pequenas Empresas"
    ];
    $subtitulos = [
        "Tendências para o futuro", "Erros comuns e como evitar", "Como aplicar na prática", "Dicas avançadas", "O que ninguém te conta", "Passo a passo para resultados", "Estudo de caso real", "Checklist definitivo", "Oportunidades para pequenas empresas", "Como escalar resultados", "Estratégias para 2025", "O que mudou este ano", "Como se destacar no mercado", "O segredo das empresas líderes", "Como evitar armadilhas", "O que fazer diferente", "Como inovar com pouco orçamento"
    ];
    $tema = $servicos[array_rand($servicos)];
    $subtitulo = $subtitulos[array_rand($subtitulos)];
    $data_hoje = date('Y-m-d');
    $seed = uniqid();
    $prompt = gerar_prompt($tema, $subtitulo, $data_hoje, $seed);
    $gemini_api_key = getenv('GEMINI_API_KEY');
    $gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$gemini_api_key";
    $body = json_encode(['contents' => [['parts' => [['text' => $prompt]]]]]);
    $ch = curl_init($gemini_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($http_code !== 200) {
        throw new Exception("Erro na requisição Gemini: $response");
    }
    $json = json_decode($response, true);
    if (!isset($json['candidates'][0]['content']['parts'][0]['text'])) {
        throw new Exception("Resposta inesperada da IA: " . $response);
    }
    $text = $json['candidates'][0]['content']['parts'][0]['text'];
    // Loga o texto bruto da IA para debug
    file_put_contents('last_gemini_raw.txt', $text);
    // Remove blocos markdown ```json ... ```
    $text = preg_replace('/^```json|```$/m', '', $text);
    $text = trim($text);
    // Extrai JSON do texto
    if (preg_match('/\{.*\}/s', $text, $m)) {
        $json_str = $m[0];
        // Limpa caracteres invisíveis e BOM (sem \uFEFF)
        $json_str = preg_replace('/[\x00-\x1F\x7F\xA0\xAD]/', '', $json_str);
        $json_str = trim($json_str);
        // Força UTF-8 válido e remove caracteres inválidos
        $json_str = iconv('UTF-8', 'UTF-8//IGNORE', $json_str);
        $json_str = trim($json_str);
        $artigo = json_decode($json_str, true, 512, JSON_INVALID_UTF8_SUBSTITUTE);
        if (!$artigo) {
            // Tenta corrigir vírgulas a mais
            $json_str2 = preg_replace('/,\s*([}\]])/', '$1', $json_str);
            $json_str2 = iconv('UTF-8', 'UTF-8//IGNORE', $json_str2);
            $artigo = json_decode($json_str2, true, 512, JSON_INVALID_UTF8_SUBSTITUTE);
        }
        if (!$artigo) {
            // Tenta remover aspas duplas duplicadas
            $json_str3 = preg_replace('/""/', '"', $json_str);
            $json_str3 = iconv('UTF-8', 'UTF-8//IGNORE', $json_str3);
            $artigo = json_decode($json_str3, true, 512, JSON_INVALID_UTF8_SUBSTITUTE);
        }
        if (!$artigo) {
            $errorMsg = json_last_error_msg();
            file_put_contents('last_gemini_json_error.txt', $json_str."\n\nErro: ".$errorMsg);
            throw new Exception("Erro ao decodificar JSON da IA. Veja last_gemini_json_error.txt (".$errorMsg.")");
        }
        return [$artigo, $tema];
    } else {
        file_put_contents('last_gemini_json_error.txt', $text);
        throw new Exception("JSON não encontrado na resposta da IA. Veja last_gemini_json_error.txt");
    }
}

if (php_sapi_name() === 'cli') {
    try {
        list($artigo, $tema) = gerar_artigo_ia();
        $img_url = get_unsplash_image_url($artigo['title'], $artigo['tags'] ?? []);
        $data = [
            'title' => $artigo['title'],
            'slug' => strtolower(preg_replace('/[^a-z0-9]+/', '-', $artigo['title'])),
            'excerpt' => $artigo['excerpt'],
            'content' => $artigo['content'],
            'featured_image' => $img_url,
            'author_id' => rand(3, 5),
            'category_id' => 1, // Ajuste conforme sua lógica
            'status' => 'published',
            'is_featured' => 0,
            'allow_comments' => 1,
            'read_time' => 8,
            'seo_title' => $artigo['seo_title'],
            'seo_description' => $artigo['seo_description'],
            'seo_keywords' => $artigo['seo_keywords'],
            'published_at' => null
        ];
        $result = MCPServer::createArticle($data);
        print_r($result);
    } catch (Exception $e) {
        echo "Erro: ".$e->getMessage()."\n";
    }
}
?>
