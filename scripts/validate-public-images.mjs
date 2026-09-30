import { readFileSync, readdirSync, existsSync } from 'node:fs';

// Public files ship even when the application does not reference them.
const inventory = JSON.parse(readFileSync(new URL('../research/image-assets.json', import.meta.url), 'utf8'));
const allowed = new Set(inventory.assets.filter(asset => asset.publicationState === 'approved' && asset.rightsStatus === 'cleared' && asset.rightsUrl).map(asset => asset.localPath));
function walk(directory, prefix) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? walk(new URL(`${entry.name}/`, directory), `${prefix}/${entry.name}`)
    : [`${prefix}/${entry.name}`]);
}
const directory = new URL('../public/images/', import.meta.url);
const files = existsSync(directory) ? walk(directory, '/images') : [];
for (const file of files) if (!allowed.has(file)) throw new Error(`Unapproved public image: ${file}`);
for (const file of allowed) if (!files.includes(file)) throw new Error(`Missing approved image: ${file}`);
console.log(`Public images valid: ${files.length} approved file(s).`);
