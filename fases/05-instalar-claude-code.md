# Fase 5 · Instalar Claude Code y abrir tu primera sesión

Guía completa con capturas: <https://antonioherrera.tech/guias/claude-desde-cero/fase-5-instalar-claude-code/>

**Objetivo:** instalar Claude Code, iniciar sesión y hacer la primera pregunta. **Tiempo:** 15 minutos.

## 1. Instalar

| Sistema | Comando |
|---|---|
| Windows (PowerShell) | `irm https://claude.ai/install.ps1 \| iex` |
| Windows (CMD) | `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` |
| macOS, Linux, WSL | `curl -fsSL https://claude.ai/install.sh \| bash` |
| macOS (Homebrew) | `brew install --cask claude-code` |
| Windows (WinGet) | `winget install Anthropic.ClaudeCode` |

En Windows conviene instalar también [Git para Windows](https://git-scm.com/downloads/win).

## 2. Comprobar

```bash
claude --version      # debe mostrar algo como: 2.1.300 (Claude Code)
```

## 3. Carpeta de práctica y primera sesión

```bash
mkdir mis-tareas
cd mis-tareas
claude                # la primera vez: iniciar sesión en el navegador y confiar en la carpeta
```

Dentro de Claude Code:

```text
/help
Hola. Explícame en 4 frases qué puedes hacer por mí en esta carpeta, que de momento está vacía.
/exit
```

## 4. Volver

```bash
claude -c     # continuar la última conversación de la carpeta
claude -r     # elegir una conversación anterior
```

## Atajos básicos

| Atajo | Para qué |
|---|---|
| `/` | Ver comandos |
| `@` | Mencionar un fichero |
| `!` | Ejecutar un comando de la terminal |
| `Shift+Tab` | Cambiar el modo de permisos |
| `Esc` | Detener a Claude o cerrar un menú |

## Checklist

- [ ] `claude --version` muestra una versión
- [ ] He iniciado sesión
- [ ] Tengo la carpeta `mis-tareas` y he confiado en ella
- [ ] He abierto `/help`
- [ ] Claude ha respondido a mi primera pregunta
- [ ] Sé salir (`/exit`) y volver (`claude -c`)

Fuentes: [Overview](https://code.claude.com/docs/en/overview) · [Quickstart](https://code.claude.com/docs/en/quickstart) · [Troubleshoot installation](https://code.claude.com/docs/en/troubleshoot-install)
