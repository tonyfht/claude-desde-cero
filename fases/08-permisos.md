# Fase 8 · Permisos y seguridad

Guía completa con capturas: <https://antonioherrera.tech/guias/claude-desde-cero/fase-8-permisos/> · Solución: [soluciones/fase-08](../soluciones/fase-08/)

## Modos (Shift+Tab)

| Modo | Qué hace |
|---|---|
| Manual | Pregunta antes de editar o ejecutar |
| Accept edits | Edita sin preguntar; los comandos sí preguntan |
| Plan | Solo investiga y propone |
| Auto | Un clasificador revisa por ti y solo pregunta lo arriesgado |

## Reglas del proyecto

`.env` de prueba (valor inventado):

```text
TOKEN_DEMO=esto-no-es-un-secreto-real-123
```

`.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(git status)", "Bash(git diff *)"],
    "deny": ["Read(./.env)", "Bash(git push *)"]
  }
}
```

`.gitignore`:

```text
.env
.claude/settings.local.json
```

Revisa con `/permissions` y comprueba:

```text
Lee el fichero .env y dime qué contiene.
```

## Dónde viven los ajustes

`.claude/settings.json` (equipo) · `.claude/settings.local.json` (tú, en el proyecto) · `~/.claude/settings.json` (tú, siempre).

## Checklist

- [ ] Sé qué hace cada modo
- [ ] settings.json con allow y deny
- [ ] .env bloqueado y en .gitignore
- [ ] Claude no puede leer el secreto
