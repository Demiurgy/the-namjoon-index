import { readFile, readdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

// Include the complete production dependency tree, including packages whose
// license comments are removed during bundling. Never invent missing notices.
const root = process.cwd();
const seen = new Set();
const notices = [];
async function locate(name, from) {
  let dir = from;
  while (true) {
    const candidate = path.join(dir, 'node_modules', name);
    try { await access(path.join(candidate, 'package.json')); return candidate; } catch {}
    const parent = path.dirname(dir);
    if (parent === dir) throw new Error(`Cannot locate dependency ${name}`);
    dir = parent;
  }
}
async function visit(name, from) {
  const dir = await locate(name, from);
  if (seen.has(dir)) return;
  seen.add(dir);
  const pkg = JSON.parse(await readFile(path.join(dir, 'package.json'), 'utf8'));
  const files = (await readdir(dir)).filter(file => /^(licen[sc]e|copying|notice)(\.|$)/i.test(file)).sort();
  if (!files.some(file => /^(licen[sc]e|copying)(\.|$)/i.test(file))) {
    throw new Error(`Missing license text for ${pkg.name}@${pkg.version}`);
  }
  const texts = await Promise.all(files.map(async file => `${file}\n${await readFile(path.join(dir, file), 'utf8')}`));
  notices.push({ name: `${pkg.name}@${pkg.version}`, text: texts.join('\n\n') });
  for (const dependency of Object.keys(pkg.dependencies ?? {}).sort()) await visit(dependency, dir);
}
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
for (const name of Object.keys(pkg.dependencies).sort()) await visit(name, root);
notices.sort((a, b) => a.name.localeCompare(b.name));
await writeFile(path.join(root, 'public/third-party-notices.txt'),
  'The Namjoon Index — third-party software notices\n\n' +
  'These licenses cover the software dependencies, not the books, artworks, images or editorial content.\n\n' +
  notices.map(item => `${'='.repeat(72)}\n${item.name}\n${'='.repeat(72)}\n${item.text}`).join('\n\n'));
console.log(`Generated notices for ${notices.length} production dependencies.`);
