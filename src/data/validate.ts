import { entities, relations, sources } from './index';

const errors: string[] = [];
const entityIds = new Set<string>();
const slugs = new Set<string>();
const sourceIds = new Set(sources.map((source) => source.id));

for (const entity of entities) {
  if (entityIds.has(entity.id)) errors.push(`Duplicate entity id: ${entity.id}`);
  if (slugs.has(entity.slug)) errors.push(`Duplicate entity slug: ${entity.slug}`);
  entityIds.add(entity.id); slugs.add(entity.slug);
  if (!entity.title.trim() || !entity.description.trim()) errors.push(`Entity missing title or description: ${entity.id}`);
  for (const link of entity.externalLinks ?? []) if (!/^https?:\/\//.test(link.url)) errors.push(`Invalid external URL on ${entity.id}: ${link.url}`);
}

for (const relation of relations) {
  if (!entityIds.has(relation.from) || !entityIds.has(relation.to)) errors.push(`Relation points to missing entity: ${relation.id}`);
  if (!relation.sourceIds.length) errors.push(`Relation has no source: ${relation.id}`);
  for (const sourceId of relation.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Relation points to missing source: ${relation.id} -> ${sourceId}`);
  if (relation.type === 'collected' && relation.evidenceLevel !== 'confirmed') errors.push(`Collected relation must be confirmed: ${relation.id}`);
}

if (errors.length) throw new Error(errors.join('\n'));
console.log(`Data valid: ${entities.length} entities, ${relations.length} relations, ${sources.length} sources.`);
