import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Background, Controls, Handle, MiniMap, Position, ReactFlow, type Edge, type Node, type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { entities, getEntity, getRelationsFor, getSource, relations, sources } from './data';
import type { Entity, EntityType, EvidenceLevel, Relation } from './data/types';

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

const relationColors: Partial<Record<Relation['type'], string>> = {
  admired: '#2f7250', mentioned: '#7f5b33', collected: '#9f6100', created_by: '#2d5e95',
  collaborated_with: '#63368a', held_at: '#862a3f', shown_at: '#862a3f', read: '#966d3f',
  recommended: '#966d3f', watched: '#862a3f',
};

const relationColor = (type: Relation['type']) => relationColors[type] ?? '#4b4d91';
type Theme = 'science' | 'finside';

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }, [title, description]);
}

function ArchiveNode({ data }: NodeProps<Node<{ label: string; type: EntityType; color: string; entityId: string }, 'archive'>>) {
  return <>
    <Handle type="target" position={Position.Left} className="flow-handle" />
    <div className={`archive-node node-${data.type}`} style={{ '--node-color': data.color } as React.CSSProperties}>
      <span className="node-icon">{typeMeta[data.type].icon}</span>
      <span>{data.label}</span>
    </div>
    <Handle type="source" position={Position.Right} className="flow-handle" />
  </>;
}

const nodeTypes = { archive: ArchiveNode };

function buildGraph(visibleTypes?: EntityType[], evidence?: EvidenceLevel[]) {
  const allowedTypes = new Set(visibleTypes ?? Object.keys(typeMeta) as EntityType[]);
  const allowedEvidence = new Set(evidence ?? ['confirmed', 'mentioned', 'editorial']);
  const visibleIds = new Set<string>(['rm']);
  relations.filter((relation) => allowedEvidence.has(relation.evidenceLevel)).forEach((relation) => {
    const from = getEntity(relation.from); const to = getEntity(relation.to);
    if (from && to && allowedTypes.has(from.type) && allowedTypes.has(to.type)) { visibleIds.add(from.id); visibleIds.add(to.id); }
  });
  const graphEntities = entities.filter((entity) => visibleIds.has(entity.id) && allowedTypes.has(entity.type));
  const positions: Record<string, { x: number; y: number }> = {
    rm: { x: 390, y: 220 }, 'yun-hyong-keun': { x: 90, y: 50 }, 'kim-whanki': { x: 90, y: 180 },
    'lee-ungno': { x: 90, y: 320 }, 'kwon-dae-sup': { x: 90, y: 460 }, 'joung-young-ju': { x: 680, y: 60 },
    'kang-yobae': { x: 680, y: 180 }, 'untitled-1973-yun': { x: 680, y: 300 }, 'the-eternal-song': { x: 680, y: 420 },
    'bamboo-lee-ungno': { x: 680, y: 540 }, 'moon-jar-kwon': { x: 90, y: 600 }, 'rm-x-sfmoma': { x: 400, y: 500 },
    sfmoma: { x: 830, y: 500 }, indigo: { x: 420, y: 40 },
  };
  const nodes: Node[] = graphEntities.map((entity, index) => ({
    id: entity.id, type: 'archive', position: positions[entity.id] ?? { x: 160 + (index % 4) * 180, y: 100 + Math.floor(index / 4) * 110 },
    data: { label: entity.title, type: entity.type, color: typeMeta[entity.type].color, entityId: entity.id },
  }));
  const edges: Edge[] = relations.filter((relation) => visibleIds.has(relation.from) && visibleIds.has(relation.to) && allowedEvidence.has(relation.evidenceLevel)).map((relation) => ({
    id: relation.id, source: relation.from, target: relation.to, label: relationLabel(relation.type),
    type: 'smoothstep', animated: false,
    style: { stroke: relationColor(relation.type), strokeWidth: relation.evidenceLevel === 'editorial' ? 1 : 2, strokeDasharray: relation.evidenceLevel === 'mentioned' ? '5 5' : relation.evidenceLevel === 'editorial' ? '2 6' : undefined, opacity: relation.evidenceLevel === 'editorial' ? 0.4 : 0.85 },
    labelStyle: { fill: relationColor(relation.type), fontSize: 9, fontFamily: 'DM Mono, monospace' }, labelBgStyle: { fill: '#f3f0e8', fillOpacity: 0.9 },
  }));
  return { nodes, edges };
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

function GraphView({ compact = false }: { compact?: boolean }) {
  const [evidence, setEvidence] = useState<EvidenceLevel[]>(['confirmed', 'mentioned']);
  const [selected, setSelected] = useState<Entity | null>(null);
  const navigate = useNavigate();
  const graph = useMemo(() => buildGraph(undefined, evidence), [evidence]);
  const evidenceCounts = useMemo(() => ({ confirmed: relations.filter((relation) => relation.evidenceLevel === 'confirmed').length, mentioned: relations.filter((relation) => relation.evidenceLevel === 'mentioned').length, editorial: relations.filter((relation) => relation.evidenceLevel === 'editorial').length }), []);
  return <div className={`graph-wrap ${compact ? 'compact' : ''}`}>
    <div className="graph-toolbar"><span className="toolbar-label">Live cultural map</span><div className="graph-legend"><button className={evidence.includes('confirmed') ? 'selected' : ''} onClick={() => setEvidence((old) => old.includes('confirmed') ? old.filter((x) => x !== 'confirmed') : [...old, 'confirmed'])}><i className="legend-line confirmed" /><span>Confirmed <b>{evidenceCounts.confirmed}</b></span></button><button className={evidence.includes('mentioned') ? 'selected' : ''} onClick={() => setEvidence((old) => old.includes('mentioned') ? old.filter((x) => x !== 'mentioned') : [...old, 'mentioned'])}><i className="legend-line mentioned" /><span>Mentioned <b>{evidenceCounts.mentioned}</b></span></button><button className={evidence.includes('editorial') ? 'selected' : ''} onClick={() => setEvidence((old) => old.includes('editorial') ? old.filter((x) => x !== 'editorial') : [...old, 'editorial'])}><i className="legend-line editorial" /><span>Editorial <b>{evidenceCounts.editorial}</b></span></button></div></div>
    <div className="graph-canvas"><ReactFlow nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.18 }} minZoom={0.3} maxZoom={1.5} onNodeClick={(_, node) => setSelected(getEntity(node.id) ?? null)} proOptions={{ hideAttribution: true }}><Background color="#d6d1c8" gap={24} size={1} /><Controls showInteractive={false} /><MiniMap pannable zoomable nodeColor={(node) => typeMeta[(node.data as { type: EntityType }).type]?.color ?? '#4b4d91'} /></ReactFlow></div>
    {selected && <div className="graph-selection"><button className="selection-close" onClick={() => setSelected(null)} aria-label="Close selected node">×</button><span className="type-label" style={{ color: typeMeta[selected.type].color }}><i>{typeMeta[selected.type].icon}</i>{typeMeta[selected.type].label}</span><h3>{selected.title}</h3><p>{selected.description}</p><button className="selection-link" onClick={() => navigate(`/entity/${selected.slug}`)}>Open full entry <span>↗</span></button></div>}
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
  return <div className="map-page content-page"><div className="map-page-heading"><PageIntro eyebrow="Map" title="The cultural graph." description="Use the map to follow documented connections across people, works, music, museums and exhibitions. Line colour shows the relationship type; line style shows its evidence level." /><Link className="text-link" to="/about">Read the methodology →</Link></div><div className="relation-palette" aria-label="Relationship colour legend">{(['admired', 'mentioned', 'collected', 'created_by', 'collaborated_with', 'held_at'] as Relation['type'][]).map((type) => <span key={type}><i style={{ background: relationColor(type) }} />{relationLabel(type)}</span>)}</div><GraphView /></div>;
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

function EntityCard({ entity }: { entity: Entity }) { const meta = typeMeta[entity.type]; const entityRelations = getRelationsFor(entity.id); return <Link className="entity-card" to={`/entity/${entity.slug}`}><div className="card-top"><span className="type-label" style={{ color: meta.color }}><i>{meta.icon}</i>{meta.label}</span><span className="card-arrow">↗</span></div><div className="card-visual" style={{ '--card-color': meta.color } as React.CSSProperties}><span>{entity.title.slice(0, 1)}</span></div><h3>{entity.title}</h3>{entity.originalTitle && <p className="original-title">{entity.originalTitle}</p>}<p className="card-description">{entity.description}</p><div className="card-footer"><span>{entityRelations.length} {entityRelations.length === 1 ? 'connection' : 'connections'}</span>{entityRelations[0] && <EvidenceBadge level={entityRelations[0].evidenceLevel} />}</div></Link>; }

function EntityPage() {
  const { slug } = useParams(); const entity = entities.find((item) => item.slug === slug); const navigate = useNavigate();
  usePageMeta(entity ? `${entity.title} and RM (Kim Namjoon) | The Namjoon Index` : 'Entity not found | The Namjoon Index', entity ? `${entity.description} Explore its documented relationship with RM (Kim Namjoon), with sources and evidence levels.` : 'The requested entity was not found in The Namjoon Index.');
  if (!entity) return <div className="content-page"><div className="empty-state"><span>?</span><h3>Entity not found</h3><Link className="text-link" to="/explore">Back to Explore →</Link></div></div>;
  const entityRelations = getRelationsFor(entity.id);
  return <div className="content-page entity-page"><Link className="back-link" to="/explore">← Back to Explore</Link><div className="entity-header"><div><span className="type-label large" style={{ color: typeMeta[entity.type].color }}><i>{typeMeta[entity.type].icon}</i>{typeMeta[entity.type].label}</span><h1>{entity.title}</h1>{entity.originalTitle && <p className="entity-original">{entity.originalTitle}</p>}<p className="entity-lede">{entity.description}</p></div><div className="entity-index-mark"><span>Index entry</span><strong>{String(entities.indexOf(entity) + 1).padStart(2, '0')}</strong></div></div><div className="entity-layout"><section><div className="subsection-title"><span>Documented connections</span><span>{entityRelations.length}</span></div><div className="relation-list">{entityRelations.map((relation) => <RelationRow key={relation.id} relation={relation} entityId={entity.id} />)}</div></section><aside className="entity-aside"><div className="aside-box"><span className="eyebrow">In the graph</span><GraphView compact /></div><div className="aside-box source-note"><span className="eyebrow">Archive note</span><p>Evidence labels describe what the source supports — and deliberately do not go further.</p></div></aside></div><button className="button secondary" onClick={() => navigate('/explore')}>Continue exploring <span>→</span></button></div>;
}

function RelationRow({ relation, entityId }: { relation: Relation; entityId: string }) { const otherId = relation.from === entityId ? relation.to : relation.from; const other = getEntity(otherId); const source = getSource(relation.sourceIds[0]); if (!other) return null; return <div className="relation-row"><div className="relation-top"><EvidenceBadge level={relation.evidenceLevel} /><span className="relation-type">{relationLabel(relation.type)}</span>{relation.date && <span className="relation-date">{relation.date}</span>}</div><Link to={`/entity/${other.slug}`} className="relation-object">{other.title}<span>↗</span></Link><p>{relation.note}</p>{source && <a className="source-inline" href={source.url} target="_blank" rel="noreferrer">Source: {source.publisher} ↗</a>}{relation.evidenceLevel === 'editorial' && <small>Editorial interpretation</small>}</div>; }

function Timeline() {
  usePageMeta('Timeline | The Namjoon (RM) Index', 'A chronological record of public encounters, works and cultural milestones documented in The Namjoon (RM) Index.');
  const items = relations.filter((relation) => relation.date).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  return <div className="content-page"><PageIntro eyebrow="Timeline" title="A record in time." description="A chronological view of public encounters, works and milestones represented in the index." /><div className="timeline">{items.map((relation) => { const from = getEntity(relation.from); const to = getEntity(relation.to); if (!from || !to) return null; return <div className="timeline-item" key={relation.id}><div className="timeline-date">{relation.date}</div><div className="timeline-dot" /><div className="timeline-content"><div className="relation-top"><EvidenceBadge level={relation.evidenceLevel} /><span className="relation-type">{relationLabel(relation.type)}</span></div><h3><Link to={`/entity/${from.slug}`}>{from.title}</Link><span>→</span><Link to={`/entity/${to.slug}`}>{to.title}</Link></h3><p>{relation.note}</p><a className="source-inline" href={getSource(relation.sourceIds[0])?.url} target="_blank" rel="noreferrer">{getSource(relation.sourceIds[0])?.publisher} ↗</a></div></div>; })}</div></div>;
}

function SourcesPage() { usePageMeta('Sources | The Namjoon (RM) Index', 'Explore the museums, official media and first-party source records behind The Namjoon (RM) Index.'); const grouped = ['museum', 'official_media', 'interview', 'social_post', 'fan_archive'] as const; return <div className="content-page"><PageIntro eyebrow="Sources" title="Where the lines come from." description="The archive is only as useful as its trail of evidence. Every relation links back to a source record." /><div className="source-summary"><strong>{sources.length}</strong><span>source records currently in the archive</span><Link className="text-link" to="/about">Read source policy →</Link></div><div className="source-groups">{grouped.map((type) => { const group = sources.filter((source) => source.sourceType === type); if (!group.length) return null; return <section className="source-group" key={type}><div className="subsection-title"><span>{type.replaceAll('_', ' ')}</span><span>{String(group.length).padStart(2, '0')}</span></div>{group.map((source) => <a href={source.url} target="_blank" rel="noreferrer" className="source-card" key={source.id}><div><span className="source-publisher">{source.publisher}</span><h3>{source.title}</h3><p>{source.publishedAt ? `Published ${source.publishedAt} · ` : ''}Accessed {source.accessedAt}</p></div><span className="source-arrow">↗</span></a>)}</section>; })}</div></div>; }

function About() { usePageMeta('About & Methodology | The Namjoon (RM) Index', 'Learn how The Namjoon (RM) Index classifies evidence, handles editorial connections and chooses sources and images.'); return <div className="content-page about-page"><PageIntro eyebrow="About" title="A careful map of cultural connections." description="The Namjoon (RM) Index is an independent, source-based cultural archive mapping the books, films, artists, artworks, exhibitions, museums and publicly confirmed collection connected to BTS’s RM, Kim Namjoon." /><div className="about-grid"><div><h2>What counts as evidence?</h2><p>Each relationship is classified according to the strongest claim its source can support. The archive does not turn a sighting into ownership or a mention into a recommendation.</p><div className="method-list"><div><EvidenceBadge level="confirmed" /><p>The source directly confirms the action or relationship: a recommendation, a collection record, a stated visit or a documented collaboration.</p></div><div><EvidenceBadge level="mentioned" /><p>The object appeared in a public post, photograph or conversation. It is visible in the record, but the archive makes no stronger claim.</p></div><div><EvidenceBadge level="editorial" /><p>A reasoned interpretation made by the archive. These links are intentionally lighter, visually distinct and labelled as editorial.</p></div></div></div><div><h2>Source policy</h2><p>We prioritize museums, official media, interviews and first-party statements. Fan archives can help locate a lead, but their claims are not promoted into the index without a primary source.</p><h2 className="small-heading">Images & rights</h2><p>When image rights are unclear, an entity uses a typographic card instead. The absence of an image is a deliberate choice, not a gap in the record.</p></div></div><div className="disclaimer"><span>Independent project</span><p>The Namjoon Index is an independent, unofficial research project. It is not affiliated with RM, BTS, BIGHIT MUSIC or HYBE. All relationships are based on publicly available sources and are classified by their level of evidence.</p></div></div>; }

function App() { const location = useLocation(); const [theme, setTheme] = useState<Theme>(() => (window.localStorage.getItem('namjoon-index-theme') as Theme) || 'science'); useEffect(() => { window.localStorage.setItem('namjoon-index-theme', theme); }, [theme]); useEffect(() => { if (location.pathname === '/') document.title = "The Namjoon (RM) Index | BTS RM’s Books, Films and Art"; }, [location.pathname]); return <Layout theme={theme} onThemeChange={() => setTheme((current) => current === 'science' ? 'finside' : 'science')}><Routes><Route path="/" element={<Home />} /><Route path="/map" element={<MapPage />} /><Route path="/explore" element={<Explore />} /><Route path="/timeline" element={<Timeline />} /><Route path="/sources" element={<SourcesPage />} /><Route path="/about" element={<About />} /><Route path="/entity/:slug" element={<EntityPage />} /><Route path="*" element={<Home />} /></Routes></Layout>; }

export default App;
