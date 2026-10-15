// Hook PostToolUse: anota en .claude/cambios.log cada fichero que Claude crea o edita.
// Claude Code envía por la entrada estándar un JSON con los datos de la herramienta usada
// y expone la carpeta del proyecto en la variable de entorno CLAUDE_PROJECT_DIR.
const fs = require('node:fs');
const path = require('node:path');

let datos = '';
process.stdin.on('data', trozo => (datos += trozo));
process.stdin.on('end', () => {
  const evento = JSON.parse(datos || '{}');
  const proyecto = process.env.CLAUDE_PROJECT_DIR || evento.cwd || process.cwd();
  const fichero = evento.tool_input?.file_path ?? '(desconocido)';
  const linea = `${new Date().toISOString()}  ${evento.tool_name}  ${path.basename(fichero)}\n`;
  fs.appendFileSync(path.join(proyecto, '.claude', 'cambios.log'), linea);
});
