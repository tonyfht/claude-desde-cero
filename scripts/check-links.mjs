#!/usr/bin/env node
// Comprueba que los enlaces relativos de los ficheros .md apuntan a algo que existe.
// Sin dependencias. Uso: node scripts/check-links.mjs
// Ignora enlaces externos (http, https, mailto), anclas puras (#...) y bloques de código.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skipDirs = new Set([".git", "node_modules", "demo"]);

function* markdownFiles(dir) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* markdownFiles(path);
    else if (name.endsWith(".md")) yield path;
  }
}

function stripCode(text) {
  return text
    .replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, "")
    .replace(/`[^`\n]*`/g, "");
}

const linkPattern = /\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g;
const external = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

const broken = [];
let checked = 0;

for (const file of markdownFiles(root)) {
  const text = stripCode(readFileSync(file, "utf8"));
  for (const match of text.matchAll(linkPattern)) {
    let target = match[1];
    if (external.test(target) || target.startsWith("#")) continue;
    target = decodeURI(target.split("#")[0].split("?")[0]);
    if (target === "") continue;
    checked += 1;
    const resolved = target.startsWith("/")
      ? join(root, target)
      : resolve(dirname(file), target);
    if (!existsSync(resolved)) {
      broken.push(`${relative(root, file)} -> ${match[1]}`);
    }
  }
}

if (broken.length > 0) {
  console.error(`Enlaces rotos (${broken.length}):`);
  for (const line of broken) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`OK: ${checked} enlaces relativos comprobados, ninguno roto.`);
