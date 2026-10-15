---
name: novedades
description: Redacta la entrada de novedades (changelog) a partir de los últimos commits. Úsala cuando el usuario pida las novedades, el changelog o qué ha cambiado.
argument-hint: "[número de commits]"
---

## Últimos commits

!`git log --oneline -n 10`

## Instrucciones

Con los commits anteriores (o los $ARGUMENTS últimos, si se indica un número), redacta una entrada para el fichero `NOVEDADES.md`:

- Un título con la fecha de hoy.
- Las novedades agrupadas en «Añadido», «Cambiado» y «Corregido» (omite los grupos vacíos).
- Frases cortas, en español y pensadas para el usuario de la app, no para el programador.

Añade la entrada al principio de `NOVEDADES.md` (créalo si no existe) y enséñame el resultado.
