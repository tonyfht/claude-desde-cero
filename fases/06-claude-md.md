# Fase 6 · CLAUDE.md y contexto

Guía completa con capturas: <https://antonioherrera.tech/guias/claude-desde-cero/fase-6-claude-md/> · Solución: [soluciones/fase-06](../soluciones/fase-06/)

## 1. Crear la app (modo manual)

```text
Crea una app web de lista de tareas en un único fichero index.html, con HTML, CSS y JavaScript y sin dependencias. Debe permitir añadir tareas, marcarlas como hechas y borrarlas, y guardarlas en localStorage. Diseño limpio y textos en español.
```

Al preguntar *Do you want to create index.html?*: **1** (sí). Abre `index.html` con doble clic.

## 2. Git sin salir de Claude (modo shell)

```text
!git init
```

## 3. Generar y personalizar el CLAUDE.md

```text
/init
Reescribe el CLAUDE.md en español y añade al final una sección «Forma de trabajar» con dos reglas: propón un plan y espera mi aprobación antes de cambios grandes, y escribe los commits en español y en imperativo.
```

## 4. Memoria

| Fichero | Alcance |
|---|---|
| `./CLAUDE.md` | Proyecto (al repositorio) |
| `~/.claude/CLAUDE.md` | Tú, en todos los proyectos |
| `./CLAUDE.local.md` | Tú, en este proyecto (`.gitignore`) |

`/memory` abre y edita estos ficheros y la memoria automática. Ejemplo completo: [ejemplos/CLAUDE.md](../ejemplos/CLAUDE.md).

## Checklist

- [ ] La app funciona
- [ ] He aprobado la creación de un fichero
- [ ] He usado `!`
- [ ] CLAUDE.md generado con `/init` y personalizado
