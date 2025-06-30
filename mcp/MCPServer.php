<?php
require_once __DIR__ . '/database.php';

class MCPServer {
    public static function getDatabaseInfo() {
        $db = get_db();
        $dbName = env('DB_NAME');
        $tables = [];
        $res = $db->query("SHOW TABLE STATUS FROM `$dbName`");
        while ($row = $res->fetch_assoc()) {
            $tables[] = $row;
        }
        return ['database_name' => $dbName, 'tables' => $tables];
    }

    public static function searchArticles($query, $limit = 10) {
        $db = get_db();
        $stmt = $db->prepare("SELECT * FROM articles WHERE title LIKE ? OR content LIKE ? ORDER BY published_at DESC LIMIT ?");
        $like = "%$query%";
        $stmt->bind_param('ssi', $like, $like, $limit);
        $stmt->execute();
        $res = $stmt->get_result();
        $articles = [];
        while ($row = $res->fetch_assoc()) {
            $articles[] = $row;
        }
        return $articles;
    }

    public static function getArticleById($id) {
        $db = get_db();
        $stmt = $db->prepare("SELECT * FROM articles WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $res = $stmt->get_result();
        return $res->fetch_assoc();
    }

    public static function createArticle($data) {
        $db = get_db();
        $stmt = $db->prepare("INSERT INTO articles (title, slug, excerpt, content, featured_image, author_id, category_id, status, is_featured, allow_comments, read_time, seo_title, seo_description, seo_keywords, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->bind_param(
            'sssssiississsss',
            $data['title'],
            $data['slug'],
            $data['excerpt'],
            $data['content'],
            $data['featured_image'],
            $data['author_id'],
            $data['category_id'],
            $data['status'],
            $data['is_featured'],
            $data['allow_comments'],
            $data['read_time'],
            $data['seo_title'],
            $data['seo_description'],
            $data['seo_keywords'],
            $data['published_at']
        );
        $stmt->execute();
        return ['success' => $stmt->affected_rows > 0, 'article_id' => $db->insert_id];
    }
}
?>
