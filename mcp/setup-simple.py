# -*- coding: utf-8 -*-
"""
Script de configuração simplificado para o MCP Server do Ziro Blog
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def install_dependencies():
    """Instala as dependências Python necessárias"""
    print("📦 Instalando dependências...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "mysql-connector-python==8.2.0"])
        print("✅ Dependências instaladas com sucesso!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao instalar dependências: {e}")
        return False

def create_env_file():
    """Cria arquivo .env com as configurações do banco de dados"""
    env_file = Path(".env")
    if env_file.exists():
        print("⚠️ Arquivo .env já existe")
        return True
    
    print("🔧 Criando arquivo .env...")
    
    env_content = """# Configurações do banco de dados para MCP Server
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u474727782_ziro
DB_USER=u474727782_root
DB_PASSWORD=sua_senha_aqui

# Configurações do site
SITE_URL=https://ziro.digital
BLOG_URL=https://ziro.digital/blog
"""
    
    try:
        with open(env_file, 'w', encoding='utf-8') as f:
            f.write(env_content)
        print("✅ Arquivo .env criado!")
        print("⚠️ IMPORTANTE: Edite o arquivo .env com suas credenciais reais do banco de dados")
        return True
    except Exception as e:
        print(f"❌ Erro ao criar arquivo .env: {e}")
        return False

def test_connection():
    """Testa a conexão com o banco de dados"""
    print("🔍 Testando conexão com banco de dados...")
    
    # Carrega variáveis de ambiente do arquivo .env
    env_file = Path(".env")
    if env_file.exists():
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    os.environ[key] = value
    
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
        cursor = connection.cursor()
        
        # Testa se as tabelas existem
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        print(f"✅ Conexão bem-sucedida! Encontradas {len(tables)} tabelas")
        return True
        
    except Error as e:
        print(f"❌ Erro na conexão: {e}")
        print("💡 Verifique suas credenciais no arquivo .env")
        return False
    except ImportError:
        print("❌ mysql-connector-python não está instalado")
        return False

def create_cursor_config():
    """Cria arquivo de configuração para o Cursor"""
    print("⚙️ Criando configuração do Cursor...")
    
    # Determina o caminho do arquivo de configuração do Cursor
    home = Path.home()
    cursor_config_dir = home / ".cursor"
    cursor_config_file = cursor_config_dir / "settings.json"
    
    if not cursor_config_dir.exists():
        cursor_config_dir.mkdir(parents=True)
    
    # Lê configuração existente ou cria nova
    config = {}
    if cursor_config_file.exists():
        try:
            with open(cursor_config_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
        except json.JSONDecodeError:
            print("⚠️ Arquivo de configuração do Cursor corrompido, criando novo...")
            config = {}
    
    # Adiciona configuração do MCP
    if 'mcpServers' not in config:
        config['mcpServers'] = {}
    
    # Obtém o caminho absoluto do script MCP
    mcp_script = Path(__file__).parent / "mcp-server.py"
    
    config['mcpServers']['ziro-blog'] = {
        "command": sys.executable,
        "args": [str(mcp_script)],
        "env": {
            "DB_HOST": os.getenv('DB_HOST', 'localhost'),
            "DB_PORT": os.getenv('DB_PORT', '3306'),
            "DB_NAME": os.getenv('DB_NAME', 'u474727782_ziro'),
            "DB_USER": os.getenv('DB_USER', 'u474727782_root'),
            "DB_PASSWORD": os.getenv('DB_PASSWORD', 'sua_senha_aqui')
        }
    }
    
    try:
        with open(cursor_config_file, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        print(f"✅ Configuração salva em: {cursor_config_file}")
        return True
    except Exception as e:
        print(f"❌ Erro ao salvar configuração: {e}")
        return False

def main():
    """Função principal"""
    print("🚀 Configuração do MCP Server para Ziro Blog")
    print("=" * 50)
    
    # Instala dependências
    if not install_dependencies():
        return False
    
    # Cria arquivo .env
    if not create_env_file():
        return False
    
    # Testa conexão
    if not test_connection():
        print("⚠️ Continuando sem conexão com banco de dados...")
    
    # Cria configuração do Cursor
    if not create_cursor_config():
        return False
    
    print("\n" + "=" * 50)
    print("✅ Configuração concluída!")
    print("\n📋 Próximos passos:")
    print("1. Edite o arquivo .env com suas credenciais reais do banco de dados")
    print("2. Reinicie o Cursor para carregar a nova configuração")
    print("3. O MCP Server estará disponível como 'ziro-blog'")
    print("\n🔧 Ferramentas disponíveis:")
    print("- get_database_info: Informações do banco de dados")
    print("- get_repository_info: Informações do repositório")
    print("- search_articles: Buscar artigos")
    print("- get_article_by_id: Buscar artigo por ID")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 