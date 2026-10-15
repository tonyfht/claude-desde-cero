# Claude desde cero · Claude y Claude Code en español

Repositorio de apoyo de la guía **[Claude desde cero: de la primera conversación a Claude Code](https://antonioherrera.tech/guias/claude-desde-cero/)**.
Una guía práctica, de la mano y con capturas reales para empezar con Claude: primero la app y después Claude Code.

> Guía independiente. No es documentación oficial de Anthropic. Cada comando se ha comprobado en la
> [documentación oficial](https://code.claude.com/docs/en/overview) y se ha ejecutado de verdad.
> Última revisión: 15 de octubre de 2026 (Claude Code 2.1.300).

## Cómo usar este repositorio

1. Sigue la guía en la web: cada fase explica los pasos con capturas.
2. Usa la carpeta [`fases/`](fases/) como chuleta: el resumen de cada fase con los comandos listos para copiar.
3. Copia lo que necesites de [`ejemplos/`](ejemplos/) (configuración de Claude Code) y [`prompts/`](prompts/) (plantillas para la app).
4. Si te pierdes construyendo la app de práctica, compara con [`soluciones/`](soluciones/): cómo queda al terminar cada fase.

```bash
git clone https://github.com/tonyfht/claude-desde-cero.git
```

## Qué hay en el repositorio

| Carpeta | Contenido |
|---|---|
| [`fases/`](fases/) | Chuleta de cada fase: pasos, prompts y comandos listos para copiar |
| [`prompts/`](prompts/) | El brief del caso práctico (fases 1–4) y la plantilla para pedir bien |
| [`ejemplos/`](ejemplos/) | Configuración de Claude Code lista para copiar: `CLAUDE.md`, `.claude/settings.json` (permisos y hook), un hook, un subagente, una skill y `.mcp.json` |
| [`soluciones/`](soluciones/) | La app de práctica *Mis tareas* tal como queda al terminar las fases 6, 7, 8, 9 y 10 |

> Las respuestas de Claude no son deterministas: tu app no será idéntica a la de `soluciones/`, y no pasa nada. Úsala para comparar o para continuar desde un punto conocido.

## Las 12 fases

| Fase | Tema | Resumen |
|---|---|---|
| **Claude en la app** | | |
| 0 | Preparación | [fases/00-preparacion.md](fases/00-preparacion.md) |
| 1 | Primera conversación | [fases/01-primera-conversacion.md](fases/01-primera-conversacion.md) |
| 2 | Proyectos | [fases/02-proyectos.md](fases/02-proyectos.md) |
| 3 | Artefactos | [fases/03-artefactos.md](fases/03-artefactos.md) |
| 4 | Conectores | [fases/04-conectores.md](fases/04-conectores.md) |
| **Claude Code: lo esencial** | | |
| 5 | Instalar Claude Code | [fases/05-instalar-claude-code.md](fases/05-instalar-claude-code.md) |
| 6 | CLAUDE.md y contexto | [fases/06-claude-md.md](fases/06-claude-md.md) |
| 7 | El flujo diario | [fases/07-flujo-diario.md](fases/07-flujo-diario.md) |
| 8 | Permisos y seguridad | [fases/08-permisos.md](fases/08-permisos.md) |
| **Claude Code: siguiente nivel** | | |
| 9 | Extender: subagentes, hooks, skills y MCP | [fases/09-extender.md](fases/09-extender.md) |
| 10 | Trabajar con especificaciones (OpenSpec) | [fases/10-especificaciones.md](fases/10-especificaciones.md) |
| 11 | Llevarlo a un equipo | [fases/11-equipo.md](fases/11-equipo.md) |

## Requisitos

- **Fases 0–4 (app):** una cuenta de Claude en [claude.ai](https://claude.ai).
- **Fases 5–11 (Claude Code):** un plan de pago (Pro, Max, Team o Enterprise) o una cuenta de Claude Console,
  y Windows, macOS o Linux. Las capturas de la guía están hechas en Windows con el plan Pro.

## Licencia

- Código y configuración: [MIT](LICENSE).
- Textos: [CC BY 4.0](LICENSE-docs.md).

Hecho por [Antonio Herrera](https://antonioherrera.tech). Claude y Claude Code son marcas de Anthropic.
