# Fase 11 · Llevarlo a un equipo

Guía completa: <https://antonioherrera.tech/guias/claude-desde-cero/fase-11-equipo/>

## Qué se comparte y qué no

| Al repositorio (equipo) | Personal (fuera del repositorio) |
|---|---|
| `CLAUDE.md` | `CLAUDE.local.md` (añádelo a `.gitignore`) |
| `.claude/settings.json` | `.claude/settings.local.json` |
| `.claude/agents/`, `.claude/skills/` | `~/.claude/CLAUDE.md`, `~/.claude/settings.json` |
| `.mcp.json` | Claves, tokens y secretos (siempre) |
| `openspec/` | |

## Reglas mínimas

1. CLAUDE.md corto, revisado como código.
2. Permisos comunes con lista de prohibidos: `Read(./.env)`, `Bash(git push *)`…
3. Hooks para lo que no se negocia (formato, linter, registro).
4. Revisión humana de todo cambio (ramas y pull requests).
5. Especificación antes de los cambios grandes (fase 10).

## Uso y costes

| Comando | Para qué |
|---|---|
| `/usage` (alias `/cost`) | Coste de la sesión, límites del plan y actividad |
| `/context` | Cuánto contexto ocupa la conversación |
| `/clear` · `/compact` | Limpiar o resumir el contexto |
| `/model` | Cambiar modelo y esfuerzo |

## Siguiente paso: gobierno

- [Modelo Holístico de Gobierno IA en el SDLC](https://antonioherrera.tech/guias/modelo-ia-sdlc/)
- [SDD Lifecycle con OpenSpec](https://antonioherrera.tech/guias/sdd-lifecycle/)

## Checklist

- [ ] Sé qué ficheros van al repositorio
- [ ] CLAUDE.md y permisos comunes revisados
- [ ] Secretos y push directo bloqueados
- [ ] Revisión humana de todo cambio
- [ ] Cada persona consulta su uso con `/usage`
