import { entities, relations, sources, timelineEvents } from './index';

const errors: string[] = [];
const entityIds = new Set<string>();
const slugs = new Set<string>();
const sourceIds = new Set(sources.map((source) => source.id));
const relationIds = new Set(relations.map((relation) => relation.id));

for (const entity of entities) {
  if (entityIds.has(entity.id)) errors.push(`Duplicate entity id: ${entity.id}`);
  if (slugs.has(entity.slug)) errors.push(`Duplicate entity slug: ${entity.slug}`);
  entityIds.add(entity.id); slugs.add(entity.slug);
  if (!entity.title.trim() || !entity.description.trim()) errors.push(`Entity missing title or description: ${entity.id}`);
  for (const link of entity.externalLinks ?? []) if (!/^https?:\/\//.test(link.url)) errors.push(`Invalid external URL on ${entity.id}: ${link.url}`);
  if (entity.image) {
    if (!entity.image.url.startsWith('/images/')) errors.push(`Entity image must be a local editorial asset: ${entity.id}`);
    if (!entity.image.alt.trim() || !entity.image.credit?.trim() || !entity.image.sourceUrl) errors.push(`Entity image missing alt, credit or source: ${entity.id}`);
  }
  if (entity.editorial && (!entity.editorial.whyItMatters.trim() || !entity.editorial.possibleResonance.trim() || !entity.editorial.themes.length)) errors.push(`Incomplete editorial reading: ${entity.id}`);
}

for (const relation of relations) {
  if (!entityIds.has(relation.from) || !entityIds.has(relation.to)) errors.push(`Relation points to missing entity: ${relation.id}`);
  if (!relation.sourceIds.length) errors.push(`Relation has no source: ${relation.id}`);
  for (const sourceId of relation.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Relation points to missing source: ${relation.id} -> ${sourceId}`);
  if (relation.type === 'collected' && relation.evidenceLevel !== 'confirmed') errors.push(`Collected relation must be confirmed: ${relation.id}`);
}

const timelineIds = new Set<string>();
const timelineRelationIds = new Set<string>();
for (const event of timelineEvents) {
  if (timelineIds.has(event.id)) errors.push(`Duplicate timeline event id: ${event.id}`);
  timelineIds.add(event.id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.sortDate)) errors.push(`Invalid timeline sort date: ${event.id}`);
  if (!event.title.trim() || !event.summary.trim()) errors.push(`Timeline event missing title or summary: ${event.id}`);
  if (!event.relationIds.length || !event.sourceIds.length) errors.push(`Timeline event missing relations or sources: ${event.id}`);
  for (const relationId of event.relationIds) {
    if (!relationIds.has(relationId)) errors.push(`Timeline event points to missing relation: ${event.id} -> ${relationId}`);
    if (timelineRelationIds.has(relationId)) errors.push(`Relation appears in multiple timeline events: ${relationId}`);
    timelineRelationIds.add(relationId);
  }
  for (const sourceId of event.sourceIds) if (!sourceIds.has(sourceId)) errors.push(`Timeline event points to missing source: ${event.id} -> ${sourceId}`);
}
for (const relation of relations.filter((item) => item.date)) if (!timelineRelationIds.has(relation.id)) errors.push(`Dated relation missing from timeline events: ${relation.id}`);

if (errors.length) throw new Error(errors.join('\n'));
console.log(`Data valid: ${entities.length} entities, ${relations.length} relations, ${sources.length} sources, ${timelineEvents.length} timeline events.`);
