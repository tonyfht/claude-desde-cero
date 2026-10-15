# Fase 9 · Extender: MCP, hooks, subagentes y skills

Guía completa con capturas: <https://antonioherrera.tech/guias/claude-desde-cero/fase-9-extender/> · Solución: [soluciones/fase-09](../soluciones/fase-09/)

Todos los ficheros están en [ejemplos/](../ejemplos/). El hook necesita Node.js.

## 1. MCP

```bash
claude mcp add --transport http deepwiki --scope project https://mcp.deepwiki.com/mcp
```

Crea [.mcp.json](../ejemplos/.mcp.json). Al abrir Claude Code: **Use this MCP server**. Comprueba con `/mcp`.

```text
Usa el servidor MCP deepwiki para explicarme en 3 líneas qué es el repositorio Fission-AI/OpenSpec.
```

## 2. Hook (PostToolUse)

- Script: [ejemplos/.claude/hooks/registrar-cambio.js](../ejemplos/.claude/hooks/registrar-cambio.js)
- Registro en [ejemplos/.claude/settings.json](../ejemplos/.claude/settings.json):

```json
"hooks": {
  "PostToolUse": [
    { "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": "node",
                  "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/registrar-cambio.js"] }] }
  ]
}
```

> Usa siempre `${CLAUDE_PROJECT_DIR}`: con una ruta relativa el hook falla cuando Claude trabaja desde otra carpeta. La forma *exec* (`command` + `args`) funciona igual en Windows, macOS y Linux.

Comprueba con `/hooks` y, tras una edición, `!cat .claude/cambios.log` (añade `.claude/cambios.log` al `.gitignore`).

## 3. Subagente

[ejemplos/.claude/agents/revisor-accesibilidad.md](../ejemplos/.claude/agents/revisor-accesibilidad.md)

```text
Usa el subagente revisor-accesibilidad para revisar index.html.
```

## 4. Skill

[ejemplos/.claude/skills/novedades/SKILL.md](../ejemplos/.claude/skills/novedades/SKILL.md)

```text
/novedades
```

## Checklist

- [ ] DeepWiki en .mcp.json y usado
- [ ] El hook anota las ediciones
- [ ] El subagente ha revisado la accesibilidad
- [ ] /novedades ha creado NOVEDADES.md
