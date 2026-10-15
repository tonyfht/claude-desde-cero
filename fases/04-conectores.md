# Fase 4 · Conectores

Guía completa con capturas: <https://antonioherrera.tech/guias/claude-desde-cero/fase-4-conectores/>

**Objetivo:** que Claude use herramientas externas con permisos controlados. Practicamos con **DeepWiki**, un servidor MCP público que no pide cuenta.

## Pasos

1. **Personalización → Conectores** (o `+` en un chat → Conectores → Gestionar conectores).
2. **Añadir → Añadir conector personalizado**:
   - Nombre: `DeepWiki`
   - URL del servidor MCP: `https://mcp.deepwiki.com/mcp`
   - Autenticación: *Sin inicio de sesión* → **Añadir** → **Conectar**.
3. Revisa **Permisos de herramientas**: déjalas en *Requiere aprobación*.
4. Chat nuevo → `+` → **Conectores** → DeepWiki activado.

```text
Usa DeepWiki para explicarme en 5 líneas qué es el repositorio de GitHub anthropics/claude-code y cómo se instala.
```

5. Cuando Claude pida permiso: **Permitir una vez**.

> Antes de conectar tu correo o tus documentos, revisa los permisos y desconecta lo que no uses.

## Checklist

- [ ] DeepWiki añadido y conectado
- [ ] Permisos revisados
- [ ] Claude lo ha usado tras pedirme permiso
