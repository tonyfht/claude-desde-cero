// Genera las imágenes del README (logo, arquitectura de la demo y ruta de fases) en tema claro y oscuro.
// Uso: node docs/readme/build.mjs — escribe junto a este fichero. Los logos vienen de docs/readme/logos/.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`
const MONO = `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace`

const THEMES = {
  light: {
    name: 'light', bg: '#ffffff', card: '#f6f8fa', cardStrong: '#ffffff', border: '#d0d7de', text: '#1f2328',
    muted: '#59636e', accent: '#C15F3C', accentSoft: '#fbefe9', line: '#8c959f', pill: '#eaeef2',
    green: '#1a7f37', red: '#cf222e',
  },
  dark: {
    name: 'dark', bg: '#0d1117', card: '#161b22', cardStrong: '#0d1117', border: '#30363d', text: '#e6edf3',
    muted: '#9198a1', accent: '#E08A69', accentSoft: '#2a1c17', line: '#6e7681', pill: '#262c36',
    green: '#3fb950', red: '#f85149',
  },
}

// ── Utilidades ───────────────────────────────────────────────────────────────

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const pathOf = name => readFileSync(join(HERE, 'logos', `${name}.svg`), 'utf8').match(/ d="([^"]+)"/)[1]

function text(x, y, s, { size = 13, weight = 400, fill, anchor = 'start', font = FONT, spacing } = {}) {
  const ls = spacing ? ` letter-spacing="${spacing}"` : ''
  return `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls}>${esc(s)}</text>`
}
const rect = (x, y, w, h, fill, stroke, rx = 10) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`
const logo = (name, x, y, size, fill) =>
  `<g transform="translate(${x} ${y}) scale(${size / 24})"><path fill="${fill}" d="${pathOf(name)}"/></g>`

function arrow(t, x1, y1, x2, y2, label) {
  let s = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${t.line}" stroke-width="1.5" marker-end="url(#h)"/>`
  if (label) s += text((x1 + x2) / 2, Math.min(y1, y2) - 8, label, { size: 11, fill: t.muted, anchor: 'middle' })
  return s
}

function svg(w, h, title, t, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<defs><marker id="h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${t.line}"/></marker></defs>
${rect(0.5, 0.5, w - 1, h - 1, t.bg, t.border, 16)}
${body}
</svg>
`
}

// Tarjeta con antetítulo (la fase), título y líneas de detalle.
function card(t, { x, y, w, h, eyebrow, title, lines = [], mono = [], strong = false, icon }) {
  let s = rect(x, y, w, h, strong ? t.accentSoft : t.card, strong ? t.accent : t.border)
  const tx = icon ? x + 56 : x + 18
  if (icon) s += icon(x + 18, y + 20)
  s += text(tx, y + 28, eyebrow.toUpperCase(), { size: 10, weight: 700, fill: t.accent, spacing: 1.2 })
  s += text(tx, y + 50, title, { size: 16, weight: 700, fill: t.text })
  let ly = y + 78
  for (const l of lines) { s += text(x + 18, ly, l, { size: 12.5, fill: t.muted }); ly += 20 }
  for (const m of mono) {
    const w2 = m.length * 7.4 + 16
    s += rect(x + 18, ly - 14, w2, 22, t.pill, t.border, 6) + text(x + 26, ly + 1, m, { size: 11.5, fill: t.text, font: MONO })
    ly += 28
  }
  return s
}

// ── Logo ─────────────────────────────────────────────────────────────────────

function buildLogo(t) {
  const body =
    logo('claude', 40, 40, 96, '#D97757') +
    text(160, 104, 'Claude desde cero', { size: 58, weight: 700, fill: t.text, spacing: -1.5 }) +
    text(163, 138, 'DE LA PRIMERA CONVERSACIÓN A CLAUDE CODE', { size: 14, weight: 600, fill: t.accent, spacing: 3.2 })
  // El logo no lleva marco: se pinta sin el rectángulo de fondo.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="176" viewBox="0 0 760 176" role="img" aria-label="Claude desde cero">
<title>Claude desde cero</title>
${body}
</svg>
`
}

// ── Arquitectura de la demo «Mis tareas» ─────────────────────────────────────

function buildArquitectura(t) {
  const W = 1200, H = 790
  const terminal = (x, y) =>
    rect(x, y, 28, 24, t.text, t.text, 5) + text(x + 5, y + 16, '>_', { size: 11, weight: 700, fill: t.bg, font: MONO })
  const browser = (x, y) =>
    rect(x, y, 28, 24, t.cardStrong, t.text, 5) +
    `<line x1="${x}" y1="${y + 7}" x2="${x + 28}" y2="${y + 7}" stroke="${t.text}" stroke-width="1"/>` +
    `<circle cx="${x + 4.5}" cy="${y + 3.6}" r="1.4" fill="${t.text}"/><circle cx="${x + 9}" cy="${y + 3.6}" r="1.4" fill="${t.text}"/>`

  let b = ''
  b += text(40, 50, 'Arquitectura de la demo «Mis tareas»', { size: 22, weight: 700, fill: t.text })
  b += text(40, 72, 'La app de práctica que construyes con Claude Code, tal como queda al terminar la fase 10', { size: 13, fill: t.muted })

  // Fila 1: tú → Claude Code → la app
  b += card(t, { x: 40, y: 110, w: 210, h: 190, eyebrow: 'Fase 5', title: 'Tú', icon: terminal,
    lines: ['Pides en lenguaje natural,', 'revisas el plan y apruebas'], mono: ['claude'] })

  const cx = 330, cw = 520
  b += rect(cx, 110, cw, 190, t.accentSoft, t.accent)
  b += logo('claude', cx + 20, 128, 36, '#D97757')
  b += text(cx + 68, 138, 'FASES 6 · 7 · 8', { size: 10, weight: 700, fill: t.accent, spacing: 1.2 })
  b += text(cx + 68, 160, 'Claude Code', { size: 20, weight: 700, fill: t.text })
  b += text(cx + cw - 20, 160, 'plan → editar → revisar → commit', { size: 12, fill: t.muted, anchor: 'end' })
  const inner = (y, file, desc) =>
    rect(cx + 20, y, cw - 40, 44, t.cardStrong, t.border, 8) +
    text(cx + 36, y + 27, file, { size: 12.5, weight: 600, fill: t.text, font: MONO }) +
    text(cx + 200, y + 27, desc, { size: 12.5, fill: t.muted })
  b += inner(186, 'CLAUDE.md', 'Memoria: arquitectura, convenciones y cómo trabajar')
  b += inner(240, 'settings.json', 'Permisos: git add/commit sí · .env y git push no')

  b += card(t, { x: 930, y: 110, w: 230, h: 190, eyebrow: 'La app', title: 'Mis tareas', icon: browser,
    lines: ['HTML, CSS y JS en un archivo', 'Sin dependencias ni build'], mono: ['index.html', 'localStorage'] })

  b += arrow(t, 250, 205, 330, 205, 'prompts')
  b += arrow(t, 850, 205, 930, 205, 'Edit · Write')

  // Fila 2: cómo se extiende (fase 9)
  const cols = [40, 325, 610, 895], cwid = 265, ry = 380
  const bus = 340
  b += `<line x1="${cx + cw / 2}" y1="300" x2="${cx + cw / 2}" y2="${bus}" stroke="${t.line}" stroke-width="1.5"/>`
  b += `<line x1="${cols[0] + cwid / 2}" y1="${bus}" x2="${cols[3] + cwid / 2}" y2="${bus}" stroke="${t.line}" stroke-width="1.5"/>`
  for (const c of cols) b += arrow(t, c + cwid / 2, bus, c + cwid / 2, ry)
  b += rect(cx + cw / 2 - 118, bus - 11, 236, 22, t.bg, t.bg, 0)
  b += text(cx + cw / 2, bus + 4, 'Fase 9 · extender Claude Code', { size: 11.5, weight: 600, fill: t.muted, anchor: 'middle' })

  const ext = [
    { eyebrow: 'Hook', title: 'PostToolUse', lines: ['Tras cada Edit o Write anota', 'el fichero cambiado'], mono: ['cambios.log'] },
    { eyebrow: 'Subagente', title: 'revisor-accesibilidad', lines: ['WCAG 2.2 AA con Sonnet,', 'solo lectura'], mono: ['Read · Grep · Glob'] },
    { eyebrow: 'Skill', title: '/novedades', lines: ['Lee los últimos commits', 'y redacta el changelog'], mono: ['NOVEDADES.md'] },
    { eyebrow: 'Servidor MCP', title: 'DeepWiki', lines: ['Documentación de repos', 'de GitHub por HTTP'], mono: ['.mcp.json'] },
  ]
  ext.forEach((e, i) => { b += card(t, { x: cols[i], y: ry, w: cwid, h: 170, ...e }) })

  // Fila 3: especificaciones y git
  const sy = 590
  b += rect(40, sy, 780, 150, t.card, t.border)
  b += text(58, sy + 28, 'FASE 10 · OPENSPEC', { size: 10, weight: 700, fill: t.accent, spacing: 1.2 })
  b += text(58, sy + 50, 'Primero la especificación, después el código', { size: 16, weight: 700, fill: t.text })
  const steps = ['/opsx:propose', '/opsx:apply', '/opsx:archive', 'openspec/specs/']
  let px = 58
  steps.forEach((s, i) => {
    const w2 = s.length * 7.6 + 24
    b += rect(px, sy + 76, w2, 30, i === 3 ? t.accentSoft : t.cardStrong, i === 3 ? t.accent : t.border, 15)
    b += text(px + w2 / 2, sy + 95, s, { size: 12, fill: t.text, font: MONO, anchor: 'middle' })
    if (i < steps.length - 1) b += arrow(t, px + w2 + 6, sy + 91, px + w2 + 34, sy + 91)
    px += w2 + 40
  })
  b += text(58, sy + 132, 'Ejemplo real: la fecha límite y las tareas vencidas (cambio archivado en openspec/changes/archive/)', { size: 12, fill: t.muted })

  b += rect(840, sy, 320, 150, t.card, t.border)
  b += logo('github', 858, sy + 18, 26, t.text)
  b += text(896, sy + 28, 'FASES 7 · 8', { size: 10, weight: 700, fill: t.accent, spacing: 1.2 })
  b += text(896, sy + 50, 'Git', { size: 16, weight: 700, fill: t.text })
  b += text(858, sy + 90, '✓', { size: 16, weight: 700, fill: t.green }) + text(882, sy + 90, 'status · diff · add · commit', { size: 12.5, fill: t.text, font: MONO })
  b += text(858, sy + 120, '✗', { size: 16, weight: 700, fill: t.red }) + text(882, sy + 120, 'push (lo haces tú)', { size: 12.5, fill: t.text, font: MONO })

  b += text(40, H - 22, 'El código completo de cada etapa está en soluciones/fase-06 … soluciones/fase-10', { size: 12, fill: t.muted })
  return svg(W, H, 'Arquitectura de la demo «Mis tareas»', t, b)
}

// ── Ruta de las 12 fases ─────────────────────────────────────────────────────

const GRUPOS = [
  { title: 'Claude en la app', fases: [['Preparación'], ['Primera', 'conversación'], ['Proyectos'], ['Artefactos'], ['Conectores']] },
  { title: 'Claude Code: lo esencial', fases: [['Instalar', 'Claude Code'], ['CLAUDE.md'], ['El flujo', 'diario'], ['Permisos']] },
  { title: 'Siguiente nivel', fases: [['Extender'], ['Especifi-', 'caciones'], ['Equipo']] },
]

function buildRuta(t) {
  const W = 1200, H = 250, COL = 80, GAP = 34
  let b = text(40, 50, 'La ruta: 12 fases', { size: 22, weight: 700, fill: t.text })
  b += text(40, 72, 'De la primera conversación en claude.ai a llevar Claude Code a tu equipo', { size: 13, fill: t.muted })
  let x = 40, n = 0
  GRUPOS.forEach((g, gi) => {
    const w = g.fases.length * COL + 30
    b += rect(x, 96, w, 130, gi === 0 ? t.card : t.accentSoft, gi === 0 ? t.border : t.accent)
    b += text(x + 16, 120, g.title.toUpperCase(), { size: 10, weight: 700, fill: t.accent, spacing: 1.2 })
    g.fases.forEach((lines, i) => {
      const cxp = x + 15 + COL * i + COL / 2
      b += `<circle cx="${cxp}" cy="152" r="16" fill="${t.cardStrong}" stroke="${t.accent}" stroke-width="1.5"/>`
      b += text(cxp, 157, n++, { size: 13, weight: 700, fill: t.accent, anchor: 'middle' })
      lines.forEach((l, li) => { b += text(cxp, 190 + li * 15, l, { size: 11.5, fill: t.text, anchor: 'middle' }) })
    })
    x += w
    if (gi < GRUPOS.length - 1) { b += arrow(t, x + 6, 161, x + GAP - 6, 161); x += GAP }
  })
  return svg(W, H, 'La ruta de las 12 fases', t, b)
}

for (const t of Object.values(THEMES)) {
  writeFileSync(join(HERE, `logo-${t.name}.svg`), buildLogo(t))
  writeFileSync(join(HERE, `arquitectura-${t.name}.svg`), buildArquitectura(t))
  writeFileSync(join(HERE, `ruta-${t.name}.svg`), buildRuta(t))
}
console.log('Imágenes generadas en', HERE)
