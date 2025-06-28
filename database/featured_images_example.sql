-- ========================================
-- EXEMPLOS DE IMAGENS DESTACADAS
-- ========================================
-- Descrição: Exemplos de como atualizar o campo featured_image nos artigos
-- Autor: Sistema Ziro
-- Data: 2024
-- ========================================

-- Exemplos de URLs de imagens que você pode usar:

-- 1. Imagens do Unsplash (gratuitas e de alta qualidade)
-- Marketing Digital
UPDATE articles SET featured_image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop' WHERE id = 1;
UPDATE articles SET featured_image = 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=400&fit=crop' WHERE id = 2;

-- Vendas Online
UPDATE articles SET featured_image = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop' WHERE id = 3;
UPDATE articles SET featured_image = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop' WHERE id = 4;

-- Atendimento
UPDATE articles SET featured_image = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop' WHERE id = 5;
UPDATE articles SET featured_image = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop' WHERE id = 6;

-- Tecnologia
UPDATE articles SET featured_image = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop' WHERE id = 7;
UPDATE articles SET featured_image = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop' WHERE id = 8;

-- 2. Imagens locais (se você quiser hospedar suas próprias imagens)
-- Coloque as imagens na pasta assets/images/blog/ e use URLs relativas:
-- UPDATE articles SET featured_image = '../assets/images/blog/marketing-digital.jpg' WHERE id = 1;

-- 3. Imagens do Pexels (também gratuitas)
-- UPDATE articles SET featured_image = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=800&h=400&fit=crop' WHERE id = 1;

-- ========================================
-- COMO USAR:
-- ========================================

-- 1. Para atualizar um artigo específico:
-- UPDATE articles SET featured_image = 'URL_DA_IMAGEM' WHERE id = ID_DO_ARTIGO;

-- 2. Para atualizar todos os artigos de uma categoria:
-- UPDATE articles SET featured_image = 'URL_DA_IMAGEM' WHERE category_id = ID_DA_CATEGORIA;

-- 3. Para remover a imagem destacada:
-- UPDATE articles SET featured_image = NULL WHERE id = ID_DO_ARTIGO;

-- ========================================
-- DICAS:
-- ========================================

-- 1. Use imagens com proporção 2:1 (800x400px) para melhor visualização
-- 2. Otimize as imagens para web (compressão)
-- 3. Use URLs HTTPS para segurança
-- 4. Teste se as imagens carregam corretamente antes de atualizar o banco
-- 5. Se usar imagens locais, certifique-se de que a pasta existe

-- ========================================
-- EXEMPLOS DE IMAGENS POR CATEGORIA:
-- ========================================

-- Marketing Digital:
-- https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop
-- https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=400&fit=crop
-- https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop

-- Vendas Online:
-- https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop
-- https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop

-- Atendimento:
-- https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop
-- https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop

-- Tecnologia:
-- https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop
-- https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop 