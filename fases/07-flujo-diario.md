# Fase 7 · El flujo diario

Guía completa con capturas: <https://antonioherrera.tech/guias/claude-desde-cero/fase-7-flujo-diario/> · Solución: [soluciones/fase-07](../soluciones/fase-07/)

## 1. Planificar (Shift+Tab hasta *plan mode on*, o `/plan`)

```text
Quiero añadir filtros para ver todas las tareas, solo las pendientes o solo las hechas. Planifícalo antes de tocar nada.
```

Aprueba con **Yes, manually approve edits** para revisar cada diff. Opción 2 en un diff = aprobar el resto de ediciones de la sesión.

## 2. Commit conversando

```text
Un único commit inicial con todo, con un mensaje descriptivo.
```

## 3. Mencionar ficheros

```text
Explícame en 3 líneas cómo funcionan los filtros en @index.html
```

## 4. Cuidar el contexto

| Comando | Para qué |
|---|---|
| `/context` | Ver cuánto contexto usas |
| `/clear` | Conversación nueva (al cambiar de tarea) |
| `/compact` | Resumir para liberar espacio |
| `Esc` | Detener a Claude |
| `/rewind` | Volver a un punto anterior |
| `claude -c` | Continuar al día siguiente |

## Checklist

- [ ] Plan revisado antes de cambiar nada
- [ ] Al menos un diff revisado
- [ ] Filtros funcionando y commit hecho
