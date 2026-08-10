# Development log

## 2026-08-10 — MVP foundation and first visual pass

### What was built

- Created the project from an empty repository with React, TypeScript, Vite and React Flow.
- Added a local, source-backed data model for entities, relations and source records.
- Added validation for missing entities, missing sources, duplicate IDs/slugs, invalid URLs and unsupported `collected` relations.
- Built the English archive experience:
  - home page with a mini cultural graph;
  - full interactive map at `/map`;
  - Explore with search and filters;
  - entity pages;
  - Timeline;
  - Sources;
  - About / Methodology.
- Added relation colours and evidence styles:
  - solid lines for `confirmed`;
  - dashed lines for `mentioned`;
  - light dashed lines for `editorial`.
- Added a graph selection panel and full-map legend.
- Added Science and Finside colour themes with persistent theme selection.
- Added responsive layout, keyboard-visible focus, alt-safe typographic fallbacks and reduced-motion support.
- Added metadata, canonical URL, JSON-LD, sitemap and robots.txt.

### Current verified dataset

- 16 entities
- 19 relations
- 5 source records
- 13 confirmed relations
- 6 mentioned relations
- 0 editorial relations (reserved for explicitly labelled interpretations)

### Verified source basis

- Weverse Magazine feature on RM and Korean modern and contemporary art.
- San Francisco Museum of Modern Art exhibition page for RM x SFMOMA.
- BIGHIT MUSIC official RM discography pages for Indigo and mono.

### Validation

```bash
npm run validate:data
npm run build
```

Both checks pass.

### Next likely work

- Expand the source-backed dataset without upgrading fan-archive leads into facts.
- Add more official music, books and film sources.
- Add a proper shortest-path interaction to the full graph.
- Add image assets only when rights and credits are clear.
