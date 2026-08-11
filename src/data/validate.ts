import { communityArchives, entities, relations, researchFindings, sources, timelineEvents } from './index';

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
  for (const credit of relation.discoveryCredits ?? []) {
    if (!sourceIds.has(credit.sourceId)) errors.push(`Discovery credit points to missing source: ${relation.id} -> ${credit.sourceId}`);
    if (!credit.note.trim()) errors.push(`Discovery credit has no note: ${relation.id} -> ${credit.sourceId}`);
  }
  if (relation.type === 'collected' && relation.evidenceLevel !== 'confirmed') errors.push(`Collected relation must be confirmed: ${relation.id}`);
}

const communityArchiveIds = new Set<string>();
for (const archive of communityArchives) {
  if (communityArchiveIds.has(archive.id)) errors.push(`Duplicate community archive id: ${archive.id}`);
  communityArchiveIds.add(archive.id);
  if (!/^https?:\/\//.test(archive.url)) errors.push(`Invalid community archive URL: ${archive.id}`);
  if (!archive.domains.length || !archive.sourceLinkage.trim()) errors.push(`Incomplete community archive: ${archive.id}`);
}

const researchFindingIds = new Set<string>();
for (const finding of researchFindings) {
  if (researchFindingIds.has(finding.id)) errors.push(`Duplicate research finding id: ${finding.id}`);
  researchFindingIds.add(finding.id);
  if (!entityIds.has(finding.entityId)) errors.push(`Research finding points to missing entity: ${finding.id} -> ${finding.entityId}`);
  if (!finding.title.trim() || !finding.summary.trim() || !finding.unresolved.trim()) errors.push(`Incomplete research finding: ${finding.id}`);
  if (!finding.sources.length) errors.push(`Research finding has no source trail: ${finding.id}`);
  for (const source of finding.sources) if (!/^https?:\/\//.test(source.url) || !source.label.trim() || !source.role.trim()) errors.push(`Invalid research finding source: ${finding.id}`);
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
console.log(`Data valid: ${entities.length} entities, ${relations.length} relations, ${sources.length} sources, ${researchFindings.length} labelled research findings, ${communityArchives.length} community archives, ${timelineEvents.length} timeline events.`);
