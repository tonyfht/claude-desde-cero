# Proposal

## Why

Ahora las tareas solo tienen texto y estado (hecha o pendiente), así que no hay forma de saber cuándo hay que terminarlas ni de ver de un vistazo cuáles se han pasado de plazo. Una fecha límite opcional y un resaltado de las vencidas ayudan a priorizar sin complicar la lista.

## What Changes

- El formulario de nueva tarea incluye un campo de fecha opcional; se puede añadir una tarea con o sin fecha límite.
- Cada tarea de la lista muestra su fecha límite, si la tiene, y permite ponerla, cambiarla o quitarla después (también en tareas creadas antes de este cambio).
- Las tareas pendientes cuya fecha límite es anterior al día de hoy se muestran resaltadas como vencidas, con una indicación textual además del color.
- La fecha límite se guarda con la tarea en el almacenamiento local, de modo que sobrevive a recargas igual que el resto de datos.
- Las tareas guardadas antes del cambio se siguen cargando sin errores y se tratan como tareas sin fecha límite. No hay cambios incompatibles.

Fuera de alcance: ordenar por fecha, un filtro «Vencidas», horas concretas, recordatorios o notificaciones.

## Capabilities

### New Capabilities
- `fecha-limite`: fecha límite opcional por tarea (asignarla, mostrarla, cambiarla, quitarla y conservarla) y la detección y el resaltado de las tareas vencidas.

### Modified Capabilities
<!-- No hay specs previas en openspec/specs/; no se modifica ninguna capacidad existente. -->

## Impact

- `index.html`: formulario (nuevo campo de fecha), `render()` (fecha y estado vencida por elemento), funciones de cambio (`anadir` y una nueva para editar la fecha) y estilos (nuevas variables de color en `:root` y en el bloque de modo oscuro).
- Datos en `localStorage` (clave `mis-tareas`): los objetos de tarea pasan a tener un campo opcional de fecha; compatibles con los datos existentes.
- Sin dependencias nuevas.
