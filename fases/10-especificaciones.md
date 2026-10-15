# Fase 10 · Trabajar con especificaciones (OpenSpec)

Guía completa con capturas: <https://antonioherrera.tech/guias/claude-desde-cero/fase-10-especificaciones/> · Solución: [soluciones/fase-10](../soluciones/fase-10/)

## 1. Instalar e inicializar

```bash
npm install -g @fission-ai/openspec@latest
cd mis-tareas
openspec init --tools claude --language es
```

## 2. Proponer

```text
/opsx:propose Añadir una fecha límite opcional a cada tarea y resaltar las que estén vencidas
```

Revisa *proposal*, *specs*, *design*, *tasks* y, sobre todo, las decisiones que Claude tomó por su cuenta. Valida:

```text
!openspec validate anadir-fecha-limite --strict
```

## 3. Implementar

```text
/opsx:apply anadir-fecha-limite
```

Después, commit (como en la fase 7).

## 4. Archivar

```text
/opsx:archive anadir-fecha-limite
```

Elige **Sincronizar ahora** para pasar los requisitos a `openspec/specs/`.

Más: [SDD Lifecycle con OpenSpec](https://antonioherrera.tech/guias/sdd-lifecycle/).

## Checklist

- [ ] OpenSpec inicializado
- [ ] Propuesta revisada y validada
- [ ] Fecha límite funcionando
- [ ] Cambio archivado y spec sincronizada
