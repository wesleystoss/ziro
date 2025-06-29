# -*- coding: utf-8 -*-
"""
Script de teste simplificado para o MCP Server do Ziro Blog
"""

import os
import sys
from pathlib import Path

def test_python():
    """Testa se o Python está funcionando"""
    print("🐍 Testando Python...")
    print(f"   - Versão: {sys.version}")
    print(f"   - Executável: {sys.executable}")
    return True

def test_dependencies():
    """Testa se as dependências estão instaladas"""
    print("\n📦 Testando dependências...")
    
    try:
        import mysql.connector
        print("✅ mysql-connector-python instalado")
        return True
    except ImportError:
        print("❌ mysql-connector-python não instalado")
        print("💡 Execute: py -m pip install mysql-connector-python==8.2.0")
        return False

def test_env_file():
    """Testa se o arquivo .env existe"""
    print("\n🔧 Testando arquivo .env...")
    
    env_file = Path(".env")
    if env_file.exists():
        print("✅ Arquivo .env encontrado")
        
        # Lê o conteúdo
        with open(env_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if "sua_senha_aqui" in content:
            print("⚠️ IMPORTANTE: Edite o arquivo .env com sua senha real do banco de dados")
        else:
            print("✅ Credenciais configuradas")
        
        return True
    else:
        print("❌ Arquivo .env não encontrado")
        print("💡 Execute: py setup-simple.py")
        return False

def test_database_connection():
    """Testa conexão com banco de dados"""
    print("\n🔍 Testando conexão com banco de dados...")
    
    # Carrega variáveis de ambiente
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
        
        # Lista algumas tabelas
        print("   - Tabelas encontradas:")
        for table in tables[:5]:  # Mostra apenas as 5 primeiras
            print(f"     * {table[0]}")
        if len(tables) > 5:
            print(f"     ... e mais {len(tables) - 5} tabelas")
        
        return True
        
    except Error as e:
        print(f"❌ Erro na conexão: {e}")
        print("💡 Verifique:")
        print("   1. Se o MySQL está rodando")
        print("   2. Se as credenciais no .env estão corretas")
        print("   3. Se o banco de dados existe")
        return False
    except ImportError:
        print("❌ mysql-connector-python não instalado")
        return False

def test_cursor_config():
    """Testa se a configuração do Cursor foi criada"""
    print("\n⚙️ Testando configuração do Cursor...")
    
    home = Path.home()
    cursor_config_file = home / ".cursor" / "settings.json"
    
    if cursor_config_file.exists():
        try:
            import json
            with open(cursor_config_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
            
            if 'mcpServers' in config and 'ziro-blog' in config['mcpServers']:
                print("✅ Configuração do Cursor encontrada")
                print("   - Servidor MCP: ziro-blog")
                return True
            else:
                print("❌ Configuração MCP não encontrada no Cursor")
                return False
        except Exception as e:
            print(f"❌ Erro ao ler configuração do Cursor: {e}")
            return False
    else:
        print("❌ Arquivo de configuração do Cursor não encontrado")
        print("💡 Execute: py setup-simple.py")
        return False

def main():
    """Função principal de teste"""
    print("🧪 Teste do MCP Server para Ziro Blog")
    print("=" * 50)
    
    tests_passed = 0
    total_tests = 5
    
    # Testa Python
    if test_python():
        tests_passed += 1
    
    # Testa dependências
    if test_dependencies():
        tests_passed += 1
    
    # Testa arquivo .env
    if test_env_file():
        tests_passed += 1
    
    # Testa conexão com banco de dados
    if test_database_connection():
        tests_passed += 1
    
    # Testa configuração do Cursor
    if test_cursor_config():
        tests_passed += 1
    
    # Resultado final
    print("\n" + "=" * 50)
    print(f"📊 Resultado dos testes: {tests_passed}/{total_tests} passaram")
    
    if tests_passed == total_tests:
        print("🎉 Todos os testes passaram! O MCP Server está pronto para uso.")
        print("\n✅ Próximos passos:")
        print("1. Reinicie o Cursor")
        print("2. O MCP Server estará disponível como 'ziro-blog'")
        print("3. Você pode começar a usar as ferramentas MCP!")
    else:
        print("⚠️ Alguns testes falharam.")
        print("\n🔧 Para resolver:")
        if tests_passed < 3:
            print("1. Execute: py setup-simple.py")
        if tests_passed < 4:
            print("2. Configure suas credenciais no arquivo .env")
        if tests_passed < 5:
            print("3. Reinicie o Cursor após a configuração")
    
    return tests_passed == total_tests

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 