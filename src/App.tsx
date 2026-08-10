import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Background, Controls, Handle, MiniMap, Position, ReactFlow, type Edge, type Node, type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { entities, getEntity, getRelationsFor, getSource, relations, sources, timelineEvents } from './data';
import type { Entity, EntityType, EvidenceLevel, Relation, Source, TimelineCategory, TimelineEvent, TimelinePrecision } from './data/types';

const typeMeta: Record<EntityType, { label: string; color: string; icon: string }> = {
  person: { label: 'Person', color: '#4b4d91', icon: '◉' },
  book: { label: 'Book', color: '#b88d61', icon: '▤' },
  film: { label: 'Film', color: '#8b3d49', icon: '▰' },
  series: { label: 'Series', color: '#8b3d49', icon: '▥' },
  artist: { label: 'Artist', color: '#4d8064', icon: '✳' },
  artwork: { label: 'Artwork', color: '#4f78a4', icon: '▧' },
  album: { label: 'Album', color: '#765691', icon: '◒' },
  song: { label: 'Song', color: '#765691', icon: '♪' },
  exhibition: { label: 'Exhibition', color: '#b88937', icon: '▦' },
  museum: { label: 'Museum', color: '#b88937', icon: '⌂' },
};

const evidenceMeta: Record<EvidenceLevel, { label: string; hint: string }> = {
  confirmed: { label: 'Confirmed', hint: 'Directly supported by a source' },
  mentioned: { label: 'Mentioned', hint: 'Publicly appeared or was discussed, without a stronger claim' },
  editorial: { label: 'Editorial', hint: 'A clearly labelled interpretation by the archive' },
};

const relationLabel = (type: Relation['type']) => type.replaceAll('_', ' ');

type DomainKey = 'literature' | 'visual-art' | 'music' | 'screen' | 'institutions';
type GraphLayer = 'overview' | 'groups' | 'detail';
type EvidenceOrigin = 'direct_statement' | 'public_observation' | 'official_summary' | 'community_identification' | 'editorial_analysis';

const originMeta: Record<EvidenceOrigin, { label: string; color: string }> = {
  direct_statement: { label: 'Direct statement', color: '#4b4d91' },
  public_observation: { label: 'Public observation', color: '#238c91' },
  official_summary: { label: 'Official summary', color: '#43835f' },
  community_identification: { label: 'Community identification', color: '#a36d29' },
  editorial_analysis: { label: 'Editorial analysis', color: '#8b6c9d' },
};

const domainMeta: Record<DomainKey, { label: string; shortLabel: string; color: string; types: EntityType[]; x: number; y: number; width: number; height: number }> = {
  literature: { label: 'Literature', shortLabel: 'Books', color: '#b88d61', types: ['book'], x: 20, y: 20, width: 540, height: 480 },
  'visual-art': { label: 'Visual Art', shortLabel: 'Art', color: '#4d8064', types: ['artist', 'artwork'], x: 820, y: 20, width: 680, height: 580 },
  music: { label: 'Music', shortLabel: 'Music', color: '#765691', types: ['album', 'song'], x: 20, y: 650, width: 500, height: 300 },
  screen: { label: 'Film & Television', shortLabel: 'Screen', color: '#8b3d49', types: ['film', 'series'], x: 600, y: 700, width: 380, height: 250 },
  institutions: { label: 'Museums & Exhibitions', shortLabel: 'Institutions', color: '#b88937', types: ['museum', 'exhibition'], x: 1080, y: 680, width: 420, height: 280 },
};

const domainOrder = Object.keys(domainMeta) as DomainKey[];
const entityDomain = (entity: Entity): DomainKey | null => domainOrder.find((key) => domainMeta[key].types.includes(entity.type)) ?? null;
const relationOrigin = (relation: Relation): EvidenceOrigin => {
  if (relation.evidenceLevel === 'editorial') return 'editorial_analysis';
  const source = getSource(relation.sourceIds[0]);
  if (source?.sourceType === 'social_post') return 'public_observation';
  if (source?.sourceType === 'interview') return 'direct_statement';
  if (source?.sourceType === 'fan_archive') return 'community_identification';
  return 'official_summary';
};

const entityPositions: Record<string, { x: number; y: number }> = {
  rm: { x: 650, y: 520 },
  'book-depth-of-the-landscape': { x: 70, y: 130 }, 'book-honeybees-distant-thunder': { x: 300, y: 130 },
  'book-that-summers-end': { x: 70, y: 260 }, 'book-all-about-saul-leiter': { x: 300, y: 260 },
  'book-midnight-library': { x: 70, y: 390 }, 'book-doing-good-better': { x: 300, y: 390 },
  'yun-hyong-keun': { x: 860, y: 130 }, 'kim-whanki': { x: 1070, y: 130 }, 'lee-ungno': { x: 1280, y: 130 },
  'kwon-dae-sup': { x: 860, y: 245 }, 'joung-young-ju': { x: 1070, y: 245 }, 'kang-yobae': { x: 1280, y: 245 },
  'untitled-1973-yun': { x: 870, y: 420 }, 'the-eternal-song': { x: 1080, y: 420 },
  'bamboo-lee-ungno': { x: 870, y: 520 }, 'moon-jar-kwon': { x: 1080, y: 520 },
  indigo: { x: 90, y: 770 }, mono: { x: 310, y: 770 },
  'rm-x-sfmoma': { x: 1110, y: 790 }, sfmoma: { x: 1300, y: 790 }, 'seoul-museum-of-art': { x: 1200, y: 900 },
};

const groupDefinitions: { key: string; domain: DomainKey; label: string; types: EntityType[]; x: number; y: number }[] = [
  { key: 'books', domain: 'literature', label: 'Books', types: ['book'], x: 195, y: 220 },
  { key: 'artists', domain: 'visual-art', label: 'Artists', types: ['artist'], x: 930, y: 210 },
  { key: 'artworks', domain: 'visual-art', label: 'Artworks', types: ['artwork'], x: 1180, y: 410 },
  { key: 'releases', domain: 'music', label: 'Albums & songs', types: ['album', 'song'], x: 175, y: 760 },
  { key: 'screen-stories', domain: 'screen', label: 'Films & series', types: ['film', 'series'], x: 690, y: 790 },
  { key: 'museums', domain: 'institutions', label: 'Museums', types: ['museum'], x: 1120, y: 760 },
  { key: 'exhibitions', domain: 'institutions', label: 'Exhibitions', types: ['exhibition'], x: 1300, y: 860 },
];

const groupForEntity = (entity: Entity) => groupDefinitions.find((group) => group.types.includes(entity.type));
type Theme = 'science' | 'finside';

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }, [title, description]);
}

function ArchiveNode({ data }: NodeProps<Node<{ label: string; subtitle?: string; type: EntityType; color: string; entityId: string; image?: string }, 'archive'>>) {
  return <>
    <Handle type="target" position={Position.Left} className="flow-handle" />
    <div className={`archive-node node-${data.type}`} style={{ '--node-color': data.color } as React.CSSProperties}>
      {data.image ? <img src={data.image} alt="" /> : <span className="node-icon">{typeMeta[data.type].icon}</span>}
      <span className="node-copy"><strong>{data.label}</strong>{data.subtitle && <small>{data.subtitle}</small>}</span>
    </div>
    <Handle type="source" position={Position.Right} className="flow-handle" />
  </>;
}

function DomainRegionNode({ data }: NodeProps<Node<{ domain: DomainKey; label: string; count: number; color: string; selected: boolean }, 'domainRegion'>>) {
  return <div className={`domain-region ${data.selected ? 'selected' : ''}`} style={{ '--domain-color': data.color } as React.CSSProperties}><span>{data.label}</span><small>{data.count} {data.count === 1 ? 'entity' : 'entities'}</small></div>;
}

function DomainHubNode({ data }: NodeProps<Node<{ domain: DomainKey; label: string; count: number; color: string }, 'domainHub'>>) {
  return <><Handle type="target" position={Position.Left} className="flow-handle" /><button className="domain-hub" style={{ '--domain-color': data.color } as React.CSSProperties}><span>{data.label}</span><strong>{String(data.count).padStart(2, '0')}</strong><small>{data.count ? 'Open field' : 'Research queue'}</small></button><Handle type="source" position={Position.Right} className="flow-handle" /></>;
}

function DomainGroupNode({ data }: NodeProps<Node<{ domain: DomainKey; label: string; count: number; color: string }, 'domainGroup'>>) {
  return <><Handle type="target" position={Position.Left} className="flow-handle" /><button className="domain-group" style={{ '--domain-color': data.color } as React.CSSProperties}><span>{data.label}</span><strong>{data.count}</strong></button><Handle type="source" position={Position.Right} className="flow-handle" /></>;
}

const nodeTypes = { archive: ArchiveNode, domainRegion: DomainRegionNode, domainHub: DomainHubNode, domainGroup: DomainGroupNode };

function edgeStyle(level: EvidenceLevel, origin: EvidenceOrigin) {
  const color = originMeta[origin].color;
  return {
    style: { stroke: color, strokeWidth: level === 'editorial' ? 1 : 2, strokeDasharray: level === 'mentioned' ? '6 5' : level === 'editorial' ? '2 7' : undefined, opacity: level === 'editorial' ? 0.45 : 0.88 },
    labelStyle: { fill: color, fontSize: 9, fontFamily: 'DM Mono, monospace' },
    labelBgStyle: { fill: '#f3f0e8', fillOpacity: 0.92 },
  };
}

function buildGraph(evidence: EvidenceLevel[], zoom: number, selectedDomain?: DomainKey) {
  const allowedEvidence = new Set(evidence);
  const layer: GraphLayer = selectedDomain ? 'detail' : zoom >= 1.08 ? 'detail' : zoom >= 0.75 ? 'groups' : 'overview';
  const visibleDomains = selectedDomain ? [selectedDomain] : domainOrder;
  const allowedRelations = relations.filter((relation) => allowedEvidence.has(relation.evidenceLevel));
  const nodes: Node[] = [];

  for (const domain of visibleDomains) {
    const meta = domainMeta[domain];
    const count = entities.filter((entity) => entityDomain(entity) === domain).length;
    nodes.push({ id: `domain-region:${domain}`, type: 'domainRegion', position: { x: meta.x, y: meta.y }, data: { domain, label: meta.label, count, color: meta.color, selected: selectedDomain === domain }, style: { width: meta.width, height: meta.height }, draggable: false, selectable: false, zIndex: -10 });
  }

  const rm = getEntity('rm');
  if (rm) nodes.push({ id: rm.id, type: 'archive', position: entityPositions.rm, data: { label: rm.title, subtitle: 'At the intersection', type: rm.type, color: typeMeta[rm.type].color, entityId: rm.id }, zIndex: 5 });

  if (layer === 'overview') {
    for (const domain of visibleDomains) {
      const meta = domainMeta[domain];
      const count = entities.filter((entity) => entityDomain(entity) === domain).length;
      nodes.push({ id: `domain-hub:${domain}`, type: 'domainHub', position: { x: meta.x + meta.width / 2 - 75, y: meta.y + meta.height / 2 - 38 }, data: { domain, label: meta.shortLabel, count, color: meta.color }, zIndex: 2 });
    }
  } else if (layer === 'groups') {
    for (const group of groupDefinitions.filter((item) => visibleDomains.includes(item.domain))) {
      const count = entities.filter((entity) => group.types.includes(entity.type)).length;
      nodes.push({ id: `group:${group.key}`, type: 'domainGroup', position: { x: group.x, y: group.y }, data: { domain: group.domain, label: group.label, count, color: domainMeta[group.domain].color }, zIndex: 2 });
    }
  } else {
    const detailEntities = entities.filter((entity) => entity.id !== 'rm' && visibleDomains.includes(entityDomain(entity) as DomainKey));
    detailEntities.forEach((entity, index) => nodes.push({
      id: entity.id, type: 'archive', position: entityPositions[entity.id] ?? { x: 100 + (index % 4) * 200, y: 100 + Math.floor(index / 4) * 115 },
      data: { label: entity.title, subtitle: entity.creator ?? (entity.year ? String(entity.year) : undefined), type: entity.type, color: typeMeta[entity.type].color, entityId: entity.id, image: entity.image?.url }, zIndex: 3,
    }));
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  let edges: Edge[] = [];
  if (layer === 'detail') {
    edges = allowedRelations.filter((relation) => nodeIds.has(relation.from) && nodeIds.has(relation.to)).map((relation) => {
      const origin = relationOrigin(relation);
      return { id: relation.id, source: relation.from, target: relation.to, label: relationLabel(relation.type), type: 'smoothstep', animated: false, ...edgeStyle(relation.evidenceLevel, origin), data: { relationId: relation.id, origin } };
    });
  } else {
    const aggregates = new Map<string, { source: string; target: string; relations: Relation[] }>();
    for (const relation of allowedRelations) {
      const fromEntity = getEntity(relation.from); const toEntity = getEntity(relation.to);
      if (!fromEntity || !toEntity) continue;
      const endpoint = (entity: Entity) => {
        if (entity.id === 'rm') return 'rm';
        if (layer === 'overview') { const domain = entityDomain(entity); return domain ? `domain-hub:${domain}` : null; }
        const group = groupForEntity(entity); return group ? `group:${group.key}` : null;
      };
      const source = endpoint(fromEntity); const target = endpoint(toEntity);
      if (!source || !target || source === target || !nodeIds.has(source) || !nodeIds.has(target)) continue;
      const key = `${source}->${target}`; const existing = aggregates.get(key);
      if (existing) existing.relations.push(relation); else aggregates.set(key, { source, target, relations: [relation] });
    }
    edges = [...aggregates.entries()].map(([key, aggregate]) => {
      const strongest = aggregate.relations.find((relation) => relation.evidenceLevel === 'confirmed') ?? aggregate.relations[0];
      const origin = relationOrigin(strongest); const label = aggregate.relations.length === 1 ? relationLabel(strongest.type) : `${aggregate.relations.length} links`;
      return { id: `aggregate:${key}`, source: aggregate.source, target: aggregate.target, label, type: 'smoothstep', animated: false, ...edgeStyle(strongest.evidenceLevel, origin), data: { aggregate: true, domain: aggregate.target.replace('domain-hub:', '') } };
    });
  }
  return { nodes, edges, layer };
}

function Layout({ children, theme, onThemeChange }: { children: React.ReactNode; theme: Theme; onThemeChange: () => void }) {
  const location = useLocation();
  const nav = [{ to: '/map', label: 'Map' }, { to: '/explore', label: 'Explore' }, { to: '/timeline', label: 'Timeline' }, { to: '/sources', label: 'Sources' }, { to: '/about', label: 'About' }];
  return <div className={`app-shell theme-${theme}`}>
    <header className="site-header">
      <Link to="/" className="wordmark"><span className="wordmark-mark">NI</span><span>The Namjoon Index</span></Link>
      <nav className="main-nav" aria-label="Main navigation">{nav.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive || (item.to === '/' && location.pathname === '/') ? 'active' : ''}>{item.label}</NavLink>)}</nav>
      <div className="header-tools"><button className="theme-switch" onClick={onThemeChange} aria-label={`Switch to ${theme === 'science' ? 'Finside' : 'Science'} colour palette`} aria-pressed={theme === 'finside'}><span className="theme-dot" />{theme === 'science' ? 'Science' : 'Finside'}<span className="theme-switch-arrow">↗</span></button><span className="header-note">An independent archive</span></div>
    </header>
    <PrincipleBanner />
    <main>{children}</main>
    <footer className="site-footer"><span>The Namjoon (RM) Index</span><span>Independent · Unofficial · Source-based</span><Link to="/about">Read our methodology →</Link></footer>
  </div>;
}

function PrincipleBanner() {
  return <section className="principle-banner"><div><h2>Interesting is not the same as proven.</h2><p>Every line in this archive carries a source and a confidence level. A photograph is not ownership. A mention is not a recommendation.</p></div><Link className="text-link" to="/about">Read the methodology →</Link></section>;
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div>;
}

function EvidenceBadge({ level }: { level: EvidenceLevel }) { return <span className={`evidence-badge ${level}`}><i />{evidenceMeta[level].label}</span>; }

function GraphView({ compact = false, domain }: { compact?: boolean; domain?: DomainKey }) {
  const [evidence, setEvidence] = useState<EvidenceLevel[]>(['confirmed', 'mentioned']);
  const [selected, setSelected] = useState<Entity | null>(null);
  const [selectedRelation, setSelectedRelation] = useState<Relation | null>(null);
  const [zoom, setZoom] = useState(compact ? 0.38 : 0.45);
  const navigate = useNavigate();
  const graph = useMemo(() => buildGraph(evidence, zoom, domain), [evidence, zoom, domain]);
  const evidenceCounts = useMemo(() => ({ confirmed: relations.filter((relation) => relation.evidenceLevel === 'confirmed').length, mentioned: relations.filter((relation) => relation.evidenceLevel === 'mentioned').length, editorial: relations.filter((relation) => relation.evidenceLevel === 'editorial').length }), []);
  const layerLabel: Record<GraphLayer, string> = { overview: 'Areas', groups: 'Groups', detail: 'Entities' };
  const openNode = (node: Node) => {
    if (node.id.startsWith('domain-hub:') || node.id.startsWith('group:')) {
      const nodeDomain = (node.data as { domain?: DomainKey }).domain;
      if (nodeDomain) navigate(`/map?domain=${nodeDomain}`);
      return;
    }
    const entity = getEntity(node.id); if (entity) { setSelectedRelation(null); setSelected(entity); }
  };
  return <div className={`graph-wrap ${compact ? 'compact' : ''}`}>
    <div className="graph-toolbar"><div className="toolbar-label"><span>Semantic map</span><b>{domain ? domainMeta[domain].label : layerLabel[graph.layer]}</b>{domain && <button onClick={() => navigate('/map')}>All areas ×</button>}</div><div className="graph-legend"><button className={evidence.includes('confirmed') ? 'selected' : ''} onClick={() => setEvidence((old) => old.includes('confirmed') ? old.filter((x) => x !== 'confirmed') : [...old, 'confirmed'])}><i className="legend-line confirmed" /><span>Confirmed <b>{evidenceCounts.confirmed}</b></span></button><button className={evidence.includes('mentioned') ? 'selected' : ''} onClick={() => setEvidence((old) => old.includes('mentioned') ? old.filter((x) => x !== 'mentioned') : [...old, 'mentioned'])}><i className="legend-line mentioned" /><span>Mentioned <b>{evidenceCounts.mentioned}</b></span></button><button className={evidence.includes('editorial') ? 'selected' : ''} onClick={() => setEvidence((old) => old.includes('editorial') ? old.filter((x) => x !== 'editorial') : [...old, 'editorial'])}><i className="legend-line editorial" /><span>Editorial <b>{evidenceCounts.editorial}</b></span></button></div></div>
    <div className="graph-canvas"><ReactFlow nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: domain ? 0.14 : 0.08 }} minZoom={0.28} maxZoom={1.55} nodesDraggable={false} nodesConnectable={false} onMove={(_, viewport) => setZoom(viewport.zoom)} onNodeClick={(_, node) => openNode(node)} onEdgeClick={(_, edge) => { const relation = relations.find((item) => item.id === edge.id); if (relation) { setSelected(null); setSelectedRelation(relation); } }} proOptions={{ hideAttribution: true }}><Background color="#d6d1c8" gap={24} size={1} /><Controls showInteractive={false} /><MiniMap pannable zoomable nodeColor={(node) => { const nodeDomain = (node.data as { domain?: DomainKey }).domain; const entityType = (node.data as { type?: EntityType }).type; return nodeDomain ? domainMeta[nodeDomain].color : entityType ? typeMeta[entityType].color : '#4b4d91'; }} /></ReactFlow></div>
    {!compact && <div className="semantic-scale" aria-hidden="true"><span className={graph.layer === 'overview' ? 'active' : ''}>Areas</span><i /><span className={graph.layer === 'groups' ? 'active' : ''}>Groups</span><i /><span className={graph.layer === 'detail' ? 'active' : ''}>Entities</span></div>}
    {selected && <div className="graph-selection"><button className="selection-close" onClick={() => setSelected(null)} aria-label="Close selected node">×</button><span className="type-label" style={{ color: typeMeta[selected.type].color }}><i>{typeMeta[selected.type].icon}</i>{typeMeta[selected.type].label}</span><h3>{selected.title}</h3><p>{selected.description}</p><button className="selection-link" onClick={() => navigate(`/entity/${selected.slug}`)}>Open full entry <span>↗</span></button></div>}
    {selectedRelation && <div className="graph-selection relation-selection"><button className="selection-close" onClick={() => setSelectedRelation(null)} aria-label="Close selected relation">×</button><span className="type-label" style={{ color: originMeta[relationOrigin(selectedRelation)].color }}><i>↗</i>{originMeta[relationOrigin(selectedRelation)].label}</span><h3>{relationLabel(selectedRelation.type)}</h3><p>{getEntity(selectedRelation.from)?.title} → {getEntity(selectedRelation.to)?.title}</p><p>{selectedRelation.note}</p><div className="relation-sources">{selectedRelation.sourceIds.map(getSource).filter((source): source is Source => Boolean(source)).map((source) => <a className="source-inline" href={source.url} target="_blank" rel="noreferrer" key={source.id}>{source.publisher} ↗</a>)}</div><EvidenceBadge level={selectedRelation.evidenceLevel} /></div>}
  </div>;
}

function Home() {
  usePageMeta("The Namjoon (RM) Index | BTS RM’s Books, Films and Art", "Explore the books, films, artists, exhibitions and publicly confirmed art collection connected to BTS’s RM, Kim Namjoon, through an interactive source-based cultural map.");
  return <>
    <section className="hero-grid"><div className="hero-copy"><p className="eyebrow">A source-based cultural archive</p><h1>The Namjoon<br /><em>(RM)</em> Index</h1><p className="hero-lede">Follow the connections behind Namjoon’s cultural world — what he reads, watches, collects and admires.</p><div className="hero-actions"><Link className="button primary" to="/explore">Explore the index <span>↗</span></Link><Link className="text-link" to="/about">How evidence works <span>→</span></Link></div><div className="hero-stats"><div><strong>{entities.length}</strong><span>entities</span></div><div><strong>{relations.length}</strong><span>documented links</span></div><div><strong>{sources.length}</strong><span>source records</span></div></div></div><div className="hero-orbit"><div className="orbit-label"><span>Index / 001</span><span>Updated 10.08.26</span></div><GraphView compact /><div className="orbit-caption"><span>The map grows slowly, one documented connection at a time.</span><Link className="map-open-link" to="/map">Open full map ↗</Link></div></div></section>
    <section className="route-section"><div className="section-heading"><div><p className="eyebrow">Curated routes</p><h2>Start somewhere specific</h2></div><Link className="text-link" to="/explore">View all entities →</Link></div><div className="route-grid"><RouteCard number="01" title="Korean modern art" description="Six artists, four works and the public trail connecting them to RM." filter="artists" /><RouteCard number="02" title="The confirmed collection" description="Works explicitly identified as part of RM’s personal collection." filter="collection" /><RouteCard number="03" title="Museum route" description="From Seoul exhibition encounters to RM x SFMOMA." filter="museums" /></div></section>
  </>;
}

function RouteCard({ number, title, description, filter }: { number: string; title: string; description: string; filter: string }) { return <Link to={`/explore?filter=${filter}`} className="route-card"><span className="route-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><span className="route-arrow">↗</span></Link>; }

function MapPage() {
  usePageMeta('The Cultural Map | The Namjoon (RM) Index', 'Explore the full interactive graph of source-backed cultural connections around RM, Kim Namjoon.');
  const location = useLocation(); const domainParam = new URLSearchParams(location.search).get('domain');
  const domain = domainOrder.includes(domainParam as DomainKey) ? domainParam as DomainKey : undefined;
  return <div className="map-page content-page"><div className="map-page-heading"><PageIntro eyebrow="Map" title="The cultural atlas." description="Move through one continuous map: cultural areas at a distance, internal groups in the middle and individual entities up close. Position shows domain; line colour shows evidence origin; line style shows claim strength." /><Link className="text-link" to="/about">Read the methodology →</Link></div><nav className="domain-nav" aria-label="Cultural areas"><Link to="/map" className={!domain ? 'active' : ''}><span>All areas</span><strong>{entities.filter((entity) => entity.id !== 'rm').length}</strong></Link>{domainOrder.map((key) => { const count = entities.filter((entity) => entityDomain(entity) === key).length; return <Link key={key} to={`/map?domain=${key}`} className={domain === key ? 'active' : ''} style={{ '--domain-color': domainMeta[key].color } as React.CSSProperties}><span>{domainMeta[key].label}</span><strong>{count}</strong></Link>; })}</nav><div className="map-legends"><div className="origin-palette" aria-label="Evidence origin colours">{(Object.keys(originMeta) as EvidenceOrigin[]).map((origin) => <span key={origin}><i style={{ background: originMeta[origin].color }} />{originMeta[origin].label}</span>)}</div><div className="line-palette" aria-label="Claim strength line styles"><span><i className="legend-line confirmed" />Confirmed</span><span><i className="legend-line mentioned" />Mentioned</span><span><i className="legend-line editorial" />Editorial</span></div></div><GraphView key={domain ?? 'all'} domain={domain} /></div>;
}

const allTypes: { key: string; label: string; types: EntityType[] }[] = [
  { key: 'all', label: 'All entities', types: Object.keys(typeMeta) as EntityType[] }, { key: 'artists', label: 'Artists', types: ['artist'] }, { key: 'artworks', label: 'Artworks', types: ['artwork'] }, { key: 'collection', label: 'Collection', types: ['artwork'] }, { key: 'museums', label: 'Museums & exhibitions', types: ['museum', 'exhibition'] }, { key: 'books', label: 'Books', types: ['book'] }, { key: 'films', label: 'Films & series', types: ['film', 'series'] }, { key: 'music', label: 'Music', types: ['album', 'song'] },
];

function Explore() {
  usePageMeta('Explore the Index | The Namjoon (RM) Index', 'Browse the source-backed books, films, artists, artworks, exhibitions, museums and music connected to RM, Kim Namjoon.');
  const [query, setQuery] = useState(''); const [filter, setFilter] = useState('all'); const [evidence, setEvidence] = useState<EvidenceLevel[]>(['confirmed', 'mentioned']);
  const location = useLocation();
  useEffect(() => { const value = new URLSearchParams(location.search).get('filter'); if (value && allTypes.some((item) => item.key === value)) setFilter(value); }, [location.search]);
  const visible = useMemo(() => { const selected = allTypes.find((item) => item.key === filter) ?? allTypes[0]; return entities.filter((entity) => { const matchesType = selected.key === 'collection' ? relations.some((relation) => relation.from === 'rm' && relation.to === entity.id && relation.type === 'collected' && relation.evidenceLevel === 'confirmed') : selected.types.includes(entity.type); const haystack = [entity.title, entity.originalTitle, entity.creator, ...(entity.alternativeNames ?? [])].filter(Boolean).join(' ').toLowerCase(); const matchesSearch = haystack.includes(query.toLowerCase()); const matchesEvidence = entity.id === 'rm' || getRelationsFor(entity.id).some((relation) => evidence.includes(relation.evidenceLevel)); return matchesType && matchesSearch && matchesEvidence; }); }, [filter, query, evidence]);
  return <div className="content-page"><PageIntro eyebrow="Explore" title="The index, in pieces." description="Browse the entities and documented relationships that make up this growing cultural map." /><div className="explore-controls"><label className="search-field"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, creator or alternate name" aria-label="Search the index" /></label><div className="filter-row">{allTypes.map((item) => <button key={item.key} onClick={() => setFilter(item.key)} className={filter === item.key ? 'filter active' : 'filter'}>{item.label}</button>)}</div><div className="evidence-filter"><span>Evidence</span>{(['confirmed', 'mentioned', 'editorial'] as EvidenceLevel[]).map((level) => <label key={level}><input type="checkbox" checked={evidence.includes(level)} onChange={() => setEvidence((old) => old.includes(level) ? old.filter((item) => item !== level) : [...old, level])} /><EvidenceBadge level={level} /></label>)}</div></div><div className="results-head"><span>{visible.length} results</span><span>Sorted by relevance</span></div><div className="entity-grid">{visible.map((entity) => <EntityCard key={entity.id} entity={entity} />)}</div>{visible.length === 0 && <div className="empty-state"><span>∅</span><h3>No documented entities found</h3><p>Try a different search or evidence filter.</p></div>}</div>;
}

function EntityCard({ entity }: { entity: Entity }) {
  const meta = typeMeta[entity.type]; const entityRelations = getRelationsFor(entity.id);
  return <Link className="entity-card" to={`/entity/${entity.slug}`}>
    <div className="card-top"><span className="type-label" style={{ color: meta.color }}><i>{meta.icon}</i>{meta.label}</span><span className="card-arrow">↗</span></div>
    <div className={`card-visual ${entity.image ? 'has-image' : ''}`} style={{ '--card-color': meta.color } as React.CSSProperties}>
      {entity.image ? <img src={entity.image.url} alt="" loading="lazy" /> : <span>{entity.title.slice(0, 1)}</span>}
      {entity.editorial && <span className="card-reading-flag">Index reading</span>}
    </div>
    <h3>{entity.title}</h3>{entity.originalTitle && <p className="original-title">{entity.originalTitle}</p>}<p className="card-description">{entity.description}</p>
    <div className="card-footer"><span>{entityRelations.length} {entityRelations.length === 1 ? 'connection' : 'connections'}</span>{entityRelations[0] && <EvidenceBadge level={entityRelations[0].evidenceLevel} />}</div>
  </Link>;
}

function EntityPage() {
  const { slug } = useParams(); const entity = entities.find((item) => item.slug === slug); const navigate = useNavigate();
  usePageMeta(entity ? `${entity.title} and RM (Kim Namjoon) | The Namjoon Index` : 'Entity not found | The Namjoon Index', entity ? `${entity.description} Explore its documented relationship with RM (Kim Namjoon), with sources and evidence levels.` : 'The requested entity was not found in The Namjoon Index.');
  if (!entity) return <div className="content-page"><div className="empty-state"><span>?</span><h3>Entity not found</h3><Link className="text-link" to="/explore">Back to Explore →</Link></div></div>;
  const entityRelations = getRelationsFor(entity.id);
  return <div className="content-page entity-page"><Link className="back-link" to="/explore">← Back to Explore</Link><div className="entity-header"><div><span className="type-label large" style={{ color: typeMeta[entity.type].color }}><i>{typeMeta[entity.type].icon}</i>{typeMeta[entity.type].label}</span><h1>{entity.title}</h1>{entity.originalTitle && <p className="entity-original">{entity.originalTitle}</p>}<p className="entity-lede">{entity.description}</p></div><div className="entity-header-side">{entity.image && <figure className={`entity-image entity-image-${entity.type}`}><img src={entity.image.url} alt={entity.image.alt} /><figcaption>{entity.image.sourceUrl ? <a href={entity.image.sourceUrl} target="_blank" rel="noreferrer">{entity.image.credit ?? 'Image source'} ↗</a> : entity.image.credit}{entity.image.license && <span>{entity.image.license}</span>}</figcaption></figure>}<div className="entity-index-mark"><span>Index entry</span><strong>{String(entities.indexOf(entity) + 1).padStart(2, '0')}</strong></div></div></div>{entity.editorial && <section className="editorial-reading"><div className="editorial-reading-label"><span>Index reading</span><i>Editorial synthesis</i></div><div className="editorial-reading-copy"><p className="eyebrow">Why this work may matter</p><h2>{entity.editorial.title}</h2><div className="editorial-reading-columns"><div><h3>Why it matters</h3><p>{entity.editorial.whyItMatters}</p></div><div><h3>Possible resonance</h3><p>{entity.editorial.possibleResonance}</p></div></div><div className="theme-chips">{entity.editorial.themes.map((theme) => <span key={theme}>{theme}</span>)}</div><p className="editorial-disclosure">This section is a compilation by The Namjoon Index. It connects public evidence, the work’s documented themes and wider cultural context; it is not a quotation from RM and does not claim to know his private intentions.</p></div></section>}<div className="entity-layout"><section><div className="subsection-title"><span>Documented connections</span><span>{entityRelations.length}</span></div><div className="relation-list">{entityRelations.map((relation) => <RelationRow key={relation.id} relation={relation} entityId={entity.id} />)}</div></section><aside className="entity-aside"><div className="aside-box"><span className="eyebrow">In the graph</span><GraphView compact /></div><div className="aside-box source-note"><span className="eyebrow">Archive note</span><p>Evidence labels describe what the source supports — and deliberately do not go further. The separate Index reading is our labelled interpretation.</p></div></aside></div><button className="button secondary" onClick={() => navigate('/explore')}>Continue exploring <span>→</span></button></div>;
}

function RelationRow({ relation, entityId }: { relation: Relation; entityId: string }) { const otherId = relation.from === entityId ? relation.to : relation.from; const other = getEntity(otherId); const relationSources = relation.sourceIds.map(getSource).filter((source): source is Source => Boolean(source)); if (!other) return null; return <div className="relation-row"><div className="relation-top"><EvidenceBadge level={relation.evidenceLevel} /><span className="relation-type">{relationLabel(relation.type)}</span>{relation.date && <span className="relation-date">{relation.date}</span>}</div><Link to={`/entity/${other.slug}`} className="relation-object">{other.title}<span>↗</span></Link><p>{relation.note}</p>{relationSources.length > 0 && <div className="relation-sources">{relationSources.map((source, index) => <a className="source-inline" href={source.url} target="_blank" rel="noreferrer" key={source.id}>{index === 0 ? 'Source' : 'Also'}: {source.publisher} ↗</a>)}</div>}{relation.evidenceLevel === 'editorial' && <small>Editorial interpretation</small>}</div>; }

const timelineCategoryMeta: Record<TimelineCategory, { label: string; color: string }> = {
  literature: { label: 'Literature', color: domainMeta.literature.color },
  'visual-art': { label: 'Visual art', color: domainMeta['visual-art'].color },
  music: { label: 'Music', color: domainMeta.music.color },
  institutions: { label: 'Museums & exhibitions', color: domainMeta.institutions.color },
  screen: { label: 'Film & television', color: domainMeta.screen.color },
};

const timelinePrecisionMeta: Record<TimelinePrecision, string> = {
  exact: 'Exact date', year: 'Year known', approximate: 'Approximate public record', scheduled: 'Scheduled dates',
};

function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const eventRelations = event.relationIds.map((id) => relations.find((relation) => relation.id === id)).filter((relation): relation is Relation => Boolean(relation));
  const eventEntities = [...new Set(eventRelations.flatMap((relation) => [relation.from, relation.to]))].map(getEntity).filter((entity): entity is Entity => Boolean(entity));
  const eventSources = event.sourceIds.map(getSource).filter((source): source is Source => Boolean(source));
  return <article className="timeline-event" style={{ '--event-color': timelineCategoryMeta[event.category].color } as React.CSSProperties}>
    <div className="timeline-event-head"><div><span className="timeline-event-date">{event.displayDate}</span><span className={`timeline-precision ${event.precision}`}>{timelinePrecisionMeta[event.precision]}</span></div><span className="timeline-category"><i />{timelineCategoryMeta[event.category].label}</span></div>
    <h3>{event.title}</h3><p>{event.summary}</p>
    <div className="timeline-entities">{eventEntities.map((entity) => <Link to={`/entity/${entity.slug}`} key={entity.id}>{entity.title}<span>↗</span></Link>)}</div>
    <details className="timeline-connections"><summary>{eventRelations.length} documented {eventRelations.length === 1 ? 'connection' : 'connections'} <span>＋</span></summary><div>{eventRelations.map((relation) => { const from = getEntity(relation.from); const to = getEntity(relation.to); if (!from || !to) return null; return <div className="timeline-connection" key={relation.id}><EvidenceBadge level={relation.evidenceLevel} /><span>{from.title}</span><i>→</i><span>{to.title}</span><small>{relationLabel(relation.type)}</small></div>; })}</div></details>
    <div className="timeline-sources">{eventSources.map((source, index) => <a className="source-inline" href={source.url} target="_blank" rel="noreferrer" key={source.id}>{index === 0 ? 'Source' : 'Also'}: {source.publisher} ↗</a>)}</div>
  </article>;
}

function Timeline() {
  usePageMeta('Timeline | The Namjoon (RM) Index', 'A chronological record of public encounters, works and cultural milestones documented in The Namjoon (RM) Index.');
  const [category, setCategory] = useState<TimelineCategory | 'all'>('all');
  const categories = (Object.keys(timelineCategoryMeta) as TimelineCategory[]).filter((key) => timelineEvents.some((event) => event.category === key));
  const visible = timelineEvents.filter((event) => category === 'all' || event.category === category).sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  const years = [...new Set(visible.map((event) => event.sortDate.slice(0, 4)))];
  const datedConnections = new Set(timelineEvents.flatMap((event) => event.relationIds)).size;
  return <div className="content-page timeline-page"><PageIntro eyebrow="Timeline" title="Moments, not timestamps." description="A chronology of documented cultural episodes. Related connections are grouped together, and uncertain dates remain visibly uncertain." />
    <div className="timeline-summary"><div><strong>{timelineEvents.length}</strong><span>episodes</span></div><div><strong>{datedConnections}</strong><span>dated connections</span></div><div><strong>2018—2027</strong><span>current span</span></div><p>Dates describe the cultural event or public record—not the day a source was accessed. Structural links without a defensible date stay on the map and do not appear here.</p></div>
    <div className="timeline-controls"><span>Show</span><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>All episodes</button>{categories.map((key) => <button key={key} className={category === key ? 'active' : ''} onClick={() => setCategory(key)} style={{ '--filter-color': timelineCategoryMeta[key].color } as React.CSSProperties}>{timelineCategoryMeta[key].label}</button>)}</div>
    <div className="timeline-date-key"><span><i className="exact" />Exact or scheduled</span><span><i className="year" />Year known</span><span><i className="approximate" />Approximate public record</span></div>
    <div className="timeline-years">{years.map((year) => <section className="timeline-year-group" key={year}><div className="timeline-year"><span>{year}</span><small>{visible.filter((event) => event.sortDate.startsWith(year)).length} {visible.filter((event) => event.sortDate.startsWith(year)).length === 1 ? 'episode' : 'episodes'}</small></div><div className="timeline-year-events">{visible.filter((event) => event.sortDate.startsWith(year)).map((event) => <TimelineEventCard event={event} key={event.id} />)}</div></section>)}</div>
    {visible.length === 0 && <div className="empty-state"><span>∅</span><h3>No dated episodes in this area yet</h3><p>The area remains visible on the map while its chronology is researched.</p></div>}
  </div>;
}

function SourcesPage() { usePageMeta('Sources | The Namjoon (RM) Index', 'Explore the museums, official media and first-party source records behind The Namjoon (RM) Index.'); const grouped = ['museum', 'official_media', 'interview', 'social_post', 'fan_archive'] as const; return <div className="content-page"><PageIntro eyebrow="Sources" title="Where the lines come from." description="The archive is only as useful as its trail of evidence. Every relation links back to a source record." /><div className="source-summary"><strong>{sources.length}</strong><span>source records currently in the archive</span><Link className="text-link" to="/about">Read source policy →</Link></div><div className="source-groups">{grouped.map((type) => { const group = sources.filter((source) => source.sourceType === type); if (!group.length) return null; return <section className="source-group" key={type}><div className="subsection-title"><span>{type.replaceAll('_', ' ')}</span><span>{String(group.length).padStart(2, '0')}</span></div>{group.map((source) => <a href={source.url} target="_blank" rel="noreferrer" className="source-card" key={source.id}><div><span className="source-publisher">{source.publisher}</span><h3>{source.title}</h3><p>{source.publishedAt ? `Published ${source.publishedAt} · ` : ''}Accessed {source.accessedAt}</p></div><span className="source-arrow">↗</span></a>)}</section>; })}</div></div>; }

function About() { usePageMeta('About & Methodology | The Namjoon (RM) Index', 'Learn how The Namjoon (RM) Index classifies evidence, handles editorial connections and chooses sources and images.'); return <div className="content-page about-page"><PageIntro eyebrow="About" title="A careful map of cultural connections." description="The Namjoon (RM) Index is an independent, source-based cultural archive mapping the books, films, artists, artworks, exhibitions, museums and publicly confirmed collection connected to BTS’s RM, Kim Namjoon." /><div className="about-grid"><div><h2>What counts as evidence?</h2><p>Each relationship is classified according to the strongest claim its source can support. The archive does not turn a sighting into ownership or a mention into a recommendation.</p><div className="method-list"><div><EvidenceBadge level="confirmed" /><p>The source directly confirms the action or relationship: a recommendation, a collection record, a stated visit or a documented collaboration.</p></div><div><EvidenceBadge level="mentioned" /><p>The object appeared in a public post, photograph or conversation. It is visible in the record, but the archive makes no stronger claim.</p></div><div><EvidenceBadge level="editorial" /><p>A reasoned interpretation made by the archive. Editorial graph links are lighter and visually distinct. Entity essays appear separately as “Index reading.”</p></div></div></div><div><h2>Source policy</h2><p>We prioritize museums, official media, interviews and first-party statements. Fan archives can help locate a lead, but their claims are not promoted into the index without a primary source.</p><h2 className="small-heading">Index reading</h2><p>These short essays compile documented themes, cultural context and cautious comparisons across the archive. They are always separated from evidence and never presented as RM’s words, motives or endorsement.</p><h2 className="small-heading">Images & rights</h2><p>Book covers and artwork reproductions are shown only as small editorial references with a credit and source link. They are not offered at publication quality or used as decorative backgrounds. When the source terms are restrictive or an exact work cannot be identified, the entity keeps a typographic card.</p></div></div><div className="disclaimer"><span>Independent project</span><p>The Namjoon Index is an independent, unofficial research project. It is not affiliated with RM, BTS, BIGHIT MUSIC or HYBE. All relationships are based on publicly available sources and are classified by their level of evidence.</p></div></div>; }

function App() { const location = useLocation(); const [theme, setTheme] = useState<Theme>(() => (window.localStorage.getItem('namjoon-index-theme') as Theme) || 'science'); useEffect(() => { window.localStorage.setItem('namjoon-index-theme', theme); }, [theme]); useEffect(() => { if (location.pathname === '/') document.title = "The Namjoon (RM) Index | BTS RM’s Books, Films and Art"; }, [location.pathname]); return <Layout theme={theme} onThemeChange={() => setTheme((current) => current === 'science' ? 'finside' : 'science')}><Routes><Route path="/" element={<Home />} /><Route path="/map" element={<MapPage />} /><Route path="/explore" element={<Explore />} /><Route path="/timeline" element={<Timeline />} /><Route path="/sources" element={<SourcesPage />} /><Route path="/about" element={<About />} /><Route path="/entity/:slug" element={<EntityPage />} /><Route path="*" element={<Home />} /></Routes></Layout>; }

export default App;
