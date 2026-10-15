#!/usr/bin/env node
// spec-check: verifica que cada requisito RF-x de cada spec tenga al menos
// un test cuyo nombre lo referencie como "[RF-x]".
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const SPECS_DIR = "specs";
const SRC_DIR = "src";

function walk(dir, filter) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path, filter) : filter(path) ? [path] : [];
  });
}

// 1. Requisitos declarados en las specs (ignora la plantilla)
const specFiles = walk(SPECS_DIR, (p) => p.endsWith("spec.md") && !p.includes("plantilla"));
const required = new Map(); // "RF-3" -> "specs/001-mvp"
for (const file of specFiles) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(/^\s*-\s*\*\*(RF-\d+)\*\*/gm)) {
    required.set(m[1], file.replace(/\/spec\.md$/, ""));
  }
}

// 2. Requisitos cubiertos por tests
const testFiles = walk(SRC_DIR, (p) => /\.test\.tsx?$/.test(p));
const covered = new Map(); // "RF-3" -> número de tests
for (const file of testFiles) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(/\[(RF-\d+)\]/g)) {
    covered.set(m[1], (covered.get(m[1]) ?? 0) + 1);
  }
}

// 3. Reporte
const sorted = [...required.keys()].sort((a, b) => Number(a.slice(3)) - Number(b.slice(3)));
const missing = sorted.filter((rf) => !covered.has(rf));
const green = "\x1b[32m", red = "\x1b[31m", dim = "\x1b[2m", reset = "\x1b[0m";

console.log(`\nspec-check · ${specFiles.length} spec(s) · ${sorted.length} requisitos\n`);
for (const rf of sorted) {
  const n = covered.get(rf);
  console.log(n ? `  ${green}✔${reset} ${rf} ${dim}(${n} test${n > 1 ? "s" : ""})${reset}` : `  ${red}✘ ${rf} sin test${reset} ${dim}${required.get(rf)}${reset}`);
}
const pct = sorted.length ? Math.round(((sorted.length - missing.length) / sorted.length) * 100) : 100;
console.log(`\nCobertura de la spec: ${pct}%`);
if (missing.length) {
  console.log(`${red}✘ ${missing.length} requisito(s) sin test. La spec no se cumple.${reset}\n`);
  process.exit(1);
}
console.log(`${green}✔ Todos los requisitos tienen al menos un test.${reset}\n`);
