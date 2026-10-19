# Cómo contribuir

Gracias por querer mejorar *Claude desde cero*. Este repositorio es el material de apoyo de la
[guía en la web](https://antonioherrera.tech/guias/claude-desde-cero/): las correcciones y las
mejoras pequeñas son lo que más ayuda.

## Qué se agradece

- **Un comando que ya no funciona** o que ha cambiado con una versión nueva de Claude o de Claude Code.
- **Una errata o una explicación confusa** en `fases/`, `prompts/` o el README.
- **Un enlace roto** (los enlaces entre ficheros los comprueba el CI; los externos, no).
- **Una mejora de `ejemplos/` o `soluciones/`** que siga el mismo criterio que el resto de la guía.

Si el cambio es grande (una fase nueva, reorganizar carpetas), abre antes un issue para acordarlo.

## Qué conviene saber antes

- La guía es independiente y no es documentación oficial de Anthropic. Los comandos se comprueban contra la
  [documentación oficial](https://code.claude.com/docs/en/overview) y se ejecutan de verdad. Si propones un
  comando, indica contra qué versión lo has probado.
- Las respuestas de Claude no son deterministas: `soluciones/` es una referencia, no un resultado exacto.
- Nunca subas claves, tokens ni capturas con datos personales. La carpeta `demo/` está en `.gitignore`
  a propósito.

## Comprobar el cambio

No hace falta instalar nada salvo Node 20 o superior. Desde la raíz del repositorio:

```bash
node scripts/check-links.mjs
```

Falla si algún enlace relativo de un `.md` apunta a un fichero o carpeta que no existe. El CI ejecuta lo mismo
en cada pull request.

## Pull requests

1. Haz un fork y crea una rama desde `main`.
2. Un cambio por pull request: así se revisa antes.
3. Si cambias una fase, revisa que la tabla del [README](README.md) y la carpeta `soluciones/` siguen siendo coherentes.
4. Describe qué cambia y por qué, y con qué versión lo has probado si afecta a un comando.

## Licencia de lo que aportes

Al contribuir aceptas que tu aportación se publique con las licencias del repositorio: el código y la
configuración bajo [MIT](LICENSE) y los textos bajo [CC BY 4.0](LICENSE-docs.md).
