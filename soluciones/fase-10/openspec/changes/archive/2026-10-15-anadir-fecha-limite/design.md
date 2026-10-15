# Design

## Context

Todo vive en `index.html`. El estado es el array `tareas` de objetos `{ id, texto, hecha }`, guardado como JSON en `localStorage` (`mis-tareas`) mediante `cargar()`/`guardar()` con try/catch. Cada cambio sigue el ciclo modificar → `guardar()` → `render()`, y `render()` reconstruye `<ul id="lista">` desde cero. Los colores son variables CSS en `:root` y en `@media (prefers-color-scheme: dark)`. Motivación y alcance: ver proposal.md; requisitos: ver specs/fecha-limite/spec.md.

## Goals / Non-Goals

**Goals:**
- Añadir la fecha con el mínimo de código y sin dependencias, respetando el ciclo modificar → guardar → renderizar.
- Evitar errores de zona horaria al comparar y mostrar fechas.
- Mantener compatibles los datos ya guardados sin paso de migración.

**Non-Goals:**
- Selector de fechas propio o librería de fechas.
- Recalcular «vencida» automáticamente a medianoche con la página abierta (se recalcula en cada `render()`).

## Decisions

**1. Modelo de datos: campo opcional `fecha` como cadena `AAAA-MM-DD`.**
Las tareas nuevas tienen `fecha` con el valor del `<input type="date">` o `null` si se deja vacío. Las tareas antiguas no tienen el campo y se tratan igual que `null` (`!tarea.fecha`). Es exactamente el formato que produce y consume `input.value`, así que no hay conversión al guardar ni al cargar.
*Alternativas*: guardar un timestamp (`Date.getTime()`) obliga a convertir en ambos sentidos y arrastra la hora y la zona horaria; descartado.

**2. «Vencida» por comparación de cadenas con la fecha local de hoy.**
Una función `hoy()` construye `AAAA-MM-DD` a partir de `getFullYear()`, `getMonth()` y `getDate()` (hora local). Una tarea está vencida si `!tarea.hecha && tarea.fecha && tarea.fecha < hoy()`. Las cadenas ISO de fecha se ordenan lexicográficamente igual que cronológicamente.
*Alternativas*: `new Date().toISOString().slice(0, 10)` da la fecha en UTC y fallaría cerca de medianoche; `new Date('AAAA-MM-DD')` también se interpreta en UTC. Ambas descartadas.

**3. Un `<input type="date">` nativo por tarea como visualización y edición a la vez.**
`render()` añade a cada `<li>` un `input.fecha` con `value = tarea.fecha || ''` y `aria-label` «Fecha límite de «texto»». El valor se confirma al perder el foco (`blur`) o al pulsar Enter, y también en `change` si el control no tiene el foco; confirmar llama a una nueva función `cambiarFecha(id, valor)` (solo si el valor difiere del guardado) que asigna `tarea.fecha = valor || null`, y luego `guardar()` y `render()`. No se confirma en cada `change` mientras el control tiene el foco porque Chrome dispara `change` en cuanto los tres segmentos son válidos (al primer dígito del año) y el `render()` destruiría el control a mitad de la escritura con teclado. El navegador muestra la fecha en su formato local y ofrece selector, teclado y borrado sin código propio. Cuando está vacío, el control se muestra con borde discontinuo para que no parezca un dato; no se atenúa con `opacity`, porque «dd/mm/aaaa» quedaría por debajo del contraste mínimo (2,3:1 en claro). Como `render()` reemplaza los controles, al confirmar se devuelve el foco al control de la lista al que iba (al salir) o al propio control de fecha (con Enter).
*Alternativas*: un texto formateado con `toLocaleDateString` más un botón que abra un input oculto con `showPicker()` da un formato más bonito («1 nov 2026»), pero exige botones extra para editar y quitar la fecha y depende de `showPicker()`; descartado por complejidad.

**4. Formulario de alta con un segundo campo.**
Se añade `<input type="date" id="fecha-nueva">` con `aria-label="Fecha límite (opcional)"` entre el texto y «Añadir». `anadir(texto, fecha)` guarda `fecha || null`; tras añadir se vacían ambos campos. Como el formulario usa `display: flex`, en pantallas estrechas se permite `flex-wrap` para que no desborde.

**5. Resaltado de vencidas: clase en el `<li>` más una etiqueta de texto.**
`render()` aplica `li.classList.toggle('vencida', …)` y, si procede, añade un `<span class="aviso-vencida">Vencida</span>` (texto creado con `textContent`), que lo leen los lectores de pantalla y no depende solo del color. El aviso se enlaza con `aria-describedby` desde la casilla y desde el control de fecha, para que se anuncie también al navegar con Tab. Los colores nuevos (`--vencida` y `--vencida-fondo`) se definen en `:root` y en el bloque de modo oscuro, con contraste suficiente en ambos temas.

## Risks / Trade-offs

- [El aspecto del `<input type="date">` varía entre navegadores y la fila puede quedar apretada en móvil] → `li` con `flex-wrap: wrap`, ancho mínimo del control y prueba visual a 360 px de ancho en modo claro y oscuro.
- [Al confirmar en `blur`, el resaltado de vencida se actualiza al salir del control, no mientras se escribe; y si se ha cambiado la fecha y se hace clic directamente en otro control de la lista, el `render()` puede reemplazar ese control y perderse el clic] → Aceptado; la fecha queda guardada y basta con repetir el clic.
- [El formato mostrado depende del idioma del navegador, no de `lang="es"`] → Aceptado; es el comportamiento estándar y el spec lo recoge.
- [Si la página queda abierta al cambiar de día, «vencida» no se actualiza hasta el siguiente `render()`] → Aceptado (cualquier interacción vuelve a renderizar); fuera de alcance.
- [Valores de `fecha` corruptos en `localStorage`] → `cargar()` ya tolera JSON inválido; una cadena extraña simplemente no se mostrará en el input (el navegador la ignora) y la comparación no rompe nada.

## Migration Plan

No hace falta migración: los datos existentes no tienen `fecha` y se interpretan como «sin fecha límite». Para revertir basta con volver a la versión anterior de `index.html`; el campo `fecha` extra en `localStorage` se ignora.
