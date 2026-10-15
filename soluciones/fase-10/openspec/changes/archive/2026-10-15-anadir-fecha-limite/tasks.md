# Tasks

## 1. Modelo de datos y lógica de fechas

- [x] 1.1 Añadir en `index.html` la función `hoy()` que devuelve la fecha local como `AAAA-MM-DD` (sin `toISOString`) y la función `estaVencida(tarea)` (`!hecha && fecha && fecha < hoy()`); verificar en la consola del navegador que `hoy()` devuelve la fecha local correcta y que `estaVencida` da `true` para una tarea pendiente con fecha de ayer y `false` para hoy, para una tarea hecha y para una tarea sin `fecha`
- [x] 1.2 Cambiar `anadir(texto, fecha)` para guardar `fecha || null` y añadir `cambiarFecha(id, valor)` siguiendo el ciclo modificar → `guardar()` → `render()`; verificar que, tras usarlas, el JSON de `localStorage['mis-tareas']` contiene el campo `fecha` esperado
- [x] 1.3 Actualizar la sección de Arquitectura de `CLAUDE.md` para describir las tareas como `{ id, texto, hecha, fecha }` con `fecha` opcional (`AAAA-MM-DD` o `null`); verificar que el texto coincide con el código

## 2. Formulario de alta

- [x] 2.1 Añadir `<input type="date" id="fecha-nueva" aria-label="Fecha límite (opcional)">` al formulario, pasar su valor a `anadir` y vaciarlo tras añadir; permitir `flex-wrap` en el formulario; verificar que se puede añadir una tarea con fecha y otra sin fecha, y que el campo queda vacío después

## 3. Lista: mostrar, editar y resaltar

- [x] 3.1 En `render()`, añadir a cada `<li>` un `input.fecha` de tipo fecha con `value = tarea.fecha || ''`, `aria-label` «Fecha límite de «texto»» que confirma con `cambiarFecha` al perder el foco, al pulsar Enter o en `change` sin foco (no en cada `change` con foco, para no cortar la escritura con teclado); verificar que se puede poner, cambiar y quitar la fecha de una tarea (también de una creada antes del cambio) con ratón y con teclado
- [x] 3.2 En `render()`, aplicar la clase `vencida` al `<li>` y añadir `<span class="aviso-vencida">Vencida</span>` (con `textContent`) cuando `estaVencida(tarea)`; verificar los escenarios del spec: fecha de ayer pendiente → vencida; fecha de hoy → no; tarea hecha → no; desmarcarla → vuelve a vencida; quitar la fecha → deja de estar vencida
- [x] 3.3 Añadir estilos: variables `--vencida` y `--vencida-fondo` en `:root` y en el bloque de modo oscuro, estilos de `li.vencida`, `.aviso-vencida` e `input.fecha` (discreto cuando está vacío —borde discontinuo— sin bajar el contraste del texto) y `flex-wrap` en `li`; verificar visualmente en modo claro y oscuro y a 360 px de ancho que no hay desbordamiento horizontal y que el resaltado es legible

## 4. Comprobación integrada

- [x] 4.1 Con datos guardados por la versión anterior (tareas sin `fecha`) en `localStorage`, abrir `index.html` y verificar que se cargan sin errores en consola, sin fecha y sin resaltado; añadir una tarea con fecha, recargar y verificar que la fecha se conserva
- [x] 4.2 Bloquear el almacenamiento (ventana privada con almacenamiento desactivado o `localStorage` que lanza excepción) y verificar que añadir, editar fechas y el resaltado siguen funcionando durante la sesión
- [x] 4.3 Pasar el agente `revisor-accesibilidad` sobre `index.html` y resolver los problemas que señale en los controles nuevos (etiquetas, contraste del resaltado, teclado)

## Workflow follow-up

- Hacer commit en español e imperativo (por ejemplo, «Añade fecha límite opcional y resalta tareas vencidas»).
- Actualizar `NOVEDADES.md` con la skill `novedades` si se desea.
- Archivar el cambio con `/opsx:archive` tras la revisión.
