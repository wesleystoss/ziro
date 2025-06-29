@echo off
echo ========================================
echo MCP Server para Ziro Blog
echo ========================================
echo.

REM Verifica se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Python nao encontrado!
    echo Instale o Python 3.7+ e tente novamente.
    pause
    exit /b 1
)

REM Verifica se o arquivo .env existe
if not exist ".env" (
    echo AVISO: Arquivo .env nao encontrado!
    echo Execute primeiro: python setup-mcp.py
    echo.
    pause
    exit /b 1
)

REM Instala dependências se necessário
echo Instalando dependencias...
pip install -r requirements.txt >nul 2>&1

REM Inicia o servidor MCP
echo.
echo Iniciando servidor MCP...
echo Pressione Ctrl+C para parar
echo.
python mcp-server.py

pause 