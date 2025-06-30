<?php
require_once __DIR__ . '/connection.php';

echo "<h1>Teste de Conexão e Dados</h1>";

try {
    // Testar conexão
    echo "<h2>✅ Conexão com banco de dados: OK</h2>";
    
    // Verificar se existem artigos
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM articles WHERE status = 'published'");
    $stmt->execute();
    $total = $stmt->fetch()['total'];
    echo "<p>Total de artigos publicados: <strong>$total</strong></p>";
    
    // Listar artigos
    $stmt = $pdo->prepare("
        SELECT 
            a.id, 
            a.title, 
            a.status,
            c.name as category_name,
            u.full_name as author_name
        FROM articles a
        LEFT JOIN categories c ON a.category_id = c.id
        LEFT JOIN users u ON a.author_id = u.id
        ORDER BY a.id
    ");
    $stmt->execute();
    $articles = $stmt->fetchAll();
    
    echo "<h2>Artigos no banco:</h2>";
    echo "<ul>";
    foreach ($articles as $art) {
        echo "<li>ID: {$art['id']} - {$art['title']} (Status: {$art['status']}, Categoria: {$art['category_name']}, Autor: {$art['author_name']})</li>";
    }
    echo "</ul>";
    
    // Verificar categorias
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM categories");
    $stmt->execute();
    $totalCats = $stmt->fetch()['total'];
    echo "<p>Total de categorias: <strong>$totalCats</strong></p>";
    
    // Verificar usuários
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM users");
    $stmt->execute();
    $totalUsers = $stmt->fetch()['total'];
    echo "<p>Total de usuários: <strong>$totalUsers</strong></p>";
    
    // Verificar tags
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM tags");
    $stmt->execute();
    $totalTags = $stmt->fetch()['total'];
    echo "<p>Total de tags: <strong>$totalTags</strong></p>";
    
} catch (Exception $e) {
    echo "<h2>❌ Erro na conexão:</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
}
?>

<link rel="stylesheet" href="../assets/css/whatsapp-float.css">
<script src="../assets/js/components/whatsapp-float.js" defer></script> 