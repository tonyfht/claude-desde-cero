# fecha-limite Specification

## Purpose

Permite asignar a cada tarea una fecha límite opcional y destaca las tareas pendientes que ya han superado esa fecha, para que el usuario pueda priorizar.

## Requirements

### Requirement: Fecha límite opcional al crear una tarea
El formulario de nueva tarea SHALL ofrecer un campo de fecha (día, sin hora) etiquetado de forma accesible. Rellenarlo MUST ser opcional: una tarea se puede añadir con o sin fecha límite.

#### Scenario: Añadir una tarea con fecha límite
- **WHEN** el usuario escribe «Pagar el alquiler», elige la fecha 2026-11-01 y pulsa «Añadir»
- **THEN** la tarea aparece en la lista mostrando su fecha límite
- **AND** el campo de fecha queda vacío para la siguiente tarea

#### Scenario: Añadir una tarea sin fecha límite
- **WHEN** el usuario escribe un texto, deja el campo de fecha vacío y pulsa «Añadir»
- **THEN** la tarea se añade igual que antes y no muestra ninguna fecha límite

### Requirement: Mostrar la fecha límite de cada tarea
Cada tarea con fecha límite SHALL mostrar esa fecha junto a su texto, en el formato de fecha local del navegador (dd/mm/aaaa para un usuario en español). Las tareas sin fecha límite MUST NOT mostrar ninguna fecha; su control de fecha queda vacío y discreto.

#### Scenario: Tarea con fecha
- **WHEN** se muestra una tarea cuya fecha límite es 2026-11-01 en un navegador configurado en español
- **THEN** la fecha se ve junto al texto de la tarea como 01/11/2026

#### Scenario: Tarea sin fecha
- **WHEN** se muestra una tarea sin fecha límite
- **THEN** no aparece ninguna fecha para esa tarea

### Requirement: Cambiar o quitar la fecha límite
El usuario SHALL poder poner, cambiar o quitar la fecha límite de cualquier tarea ya existente desde la propia lista, incluidas las tareas creadas antes de que existiera esta función. El control MUST ser accesible con teclado y tener una etiqueta que identifique la tarea.

#### Scenario: Poner fecha a una tarea existente
- **WHEN** el usuario asigna una fecha a una tarea que no la tenía
- **THEN** la tarea pasa a mostrar esa fecha límite

#### Scenario: Quitar la fecha
- **WHEN** el usuario borra la fecha límite de una tarea
- **THEN** la tarea deja de tener fecha límite y deja de mostrarse como vencida si lo estaba

### Requirement: Resaltar las tareas vencidas
Una tarea SHALL considerarse vencida cuando no está hecha y su fecha límite es anterior al día de hoy según la hora local del dispositivo. Las tareas vencidas MUST mostrarse resaltadas, con una indicación textual (no solo color) que también llegue a los lectores de pantalla.

#### Scenario: Tarea pendiente con fecha pasada
- **WHEN** hoy es 2026-10-15 y una tarea pendiente tiene fecha límite 2026-10-14
- **THEN** la tarea aparece resaltada como vencida e incluye el texto «Vencida»

#### Scenario: La fecha límite es hoy
- **WHEN** hoy es 2026-10-15 y una tarea pendiente tiene fecha límite 2026-10-15
- **THEN** la tarea no se muestra como vencida

#### Scenario: Tarea hecha con fecha pasada
- **WHEN** una tarea con fecha límite pasada está marcada como hecha
- **THEN** no se resalta como vencida

#### Scenario: Volver a marcar como pendiente
- **WHEN** el usuario desmarca una tarea hecha cuya fecha límite ya pasó
- **THEN** la tarea vuelve a mostrarse como vencida

### Requirement: Conservar la fecha límite
La fecha límite SHALL guardarse con la tarea en el almacenamiento local y recuperarse al recargar la página. Las tareas guardadas sin fecha (incluidas las anteriores a este cambio) MUST cargarse sin errores como tareas sin fecha límite. Si no hay almacenamiento disponible, la función MUST seguir funcionando durante la sesión.

#### Scenario: Recargar la página
- **WHEN** el usuario añade una tarea con fecha límite y recarga la página
- **THEN** la tarea sigue mostrando la misma fecha límite

#### Scenario: Datos anteriores al cambio
- **WHEN** la página carga tareas guardadas antes de este cambio, sin fecha
- **THEN** todas se muestran correctamente, sin fecha límite y sin resaltado de vencida
