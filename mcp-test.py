import sys
import json

def main():
    while True:
        line = sys.stdin.readline()
        if not line:
            break
        try:
            message = json.loads(line)
            method = message.get("method")
            message_id = message.get("id")
            if method == "initialize":
                result = {"protocolVersion": "2024-11-05", "capabilities": {"tools": {"listChanged": True}}, "serverInfo": {"name": "test-mcp", "version": "1.0.0"}}
            elif method == "tools/list":
                result = {"tools": [{"name": "hello_world", "description": "Diz olá", "inputSchema": {"type": "object", "properties": {}, "required": []}}]}
            elif method == "tools/call":
                result = {"results": [{"name": "hello_world", "content": [{"type": "text", "text": "Olá, mundo!"}]}]}
            else:
                result = {"error": {"code": -32601, "message": f"Método não encontrado: {method}"}}
            if message_id is not None:
                print(json.dumps({"jsonrpc": "2.0", "id": message_id, "result": result}))
        except Exception:
            continue

if __name__ == "__main__":
    main()