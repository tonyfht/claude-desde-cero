# CLAUDE.md

Este archivo orienta a Claude Code (claude.ai/code) cuando trabaja con el código de este repositorio.

## Proyecto

«Mis tareas» es una lista de tareas en un único archivo: todo (HTML, CSS y JS) está en `index.html`. No hay paso de compilación, gestor de paquetes, linter ni pruebas. Para ejecutarla, abre `index.html` directamente en el navegador.

## Arquitectura

- **Estado**: un array `tareas` a nivel de módulo, con objetos `{ id, texto, hecha }`. Se guarda como JSON en `localStorage` con la clave `mis-tareas` (`CLAVE`). `cargar()` y `guardar()` envuelven el acceso al almacenamiento en try/catch, de modo que la app sigue funcionando durante la sesión si no hay almacenamiento disponible. Hay que conservar este comportamiento.
- **Ciclo de renderizado**: cada cambio (`anadir`, `alternar`, `eliminar`) modifica `tareas`, después llama a `guardar()` y por último a `render()`. `render()` reconstruye desde cero `<ul id="lista">` y actualiza la línea de resumen y el mensaje de lista vacía. Los cambios nuevos deben seguir el mismo patrón (modificar → guardar → renderizar) en lugar de retocar el DOM directamente.
- **Seguridad**: el texto de las tareas se inserta con `textContent`, nunca con `innerHTML`. Mantenlo así.
- **Temas**: los colores son propiedades personalizadas de CSS en `:root`, redefinidas en `@media (prefers-color-scheme: dark)`. Los colores nuevos se añaden como variables en ambos bloques.

## Convenciones

- La interfaz está en español (`lang="es"`), y los identificadores, clases CSS y comentarios también (`anadir`, `hecha`, `borrar`, `vacio`). El código y los textos nuevos deben seguir esta norma.
- Sin dependencias externas: la app se mantiene autocontenida en un solo archivo.

## Forma de trabajar

- Antes de hacer cambios grandes, propón un plan y espera mi aprobación.
- Escribe los mensajes de commit en español y en imperativo (por ejemplo, «Añade filtro de tareas pendientes»).
