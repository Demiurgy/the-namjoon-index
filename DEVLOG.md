# Development log

## 2026-08-11 — Research scale, theme parity and compact semantic map

### Research and attribution

- Expanded the archive from a small proof of concept to 25 entities, 34 relations and 12 source records.
- Added a public research ledger with seven findings whose unresolved status remains visible rather than being promoted into established graph connections.
- Inventoried fourteen community and fan-run archives as discovery candidates.
- Kept community discovery credit separate from verification: fan archives can identify, preserve or index a lead, while the published claim still depends on a reproducible primary or institutional source.
- Added explicit attribution trails and documented the rule that verification does not erase discovery credit.

### Images and music scope

- Added a rights-aware image register covering publication state, edition match, source owner, credit and fallback treatment.
- Added small editorial cover thumbnails for `Indigo` and `mono.` with source links and credit lines.
- Confirmed that `Do You` belongs to the 2015 `RM` mixtape, not `mono.`.
- Recorded the working music-scope rule: include major solo projects and standalone releases; create separate song nodes only when a track has a meaningful cross-domain or collaboration connection, so the atlas does not collapse into a conventional discography.

### Theme and typography decisions

- Kept Atlas and Finside visually distinct but made readability rules theme-independent.
- Set page labels to 16px and increased small interface typography across Map, Explore, Timeline, Sources and About.
- Unified main page-heading scales in both themes and kept headings and introductory copy on one line at desktop widths, with natural wrapping restored at mobile breakpoints.
- Removed terminal periods from main display headings.
- Replaced the visible evidence term `Editorial` with `Index interpretation`, clarifying that it is the archive's own labelled synthesis rather than a sourced statement about RM.
- Removed `Sorted by relevance` from Explore because the current results are not ranked by a relevance algorithm.
- Moved the About disclaimer ahead of the evidence methodology and placed the map methodology link inline with the map introduction.

### Map geometry and interaction

- Kept the default overview zoom at `0.74`, immediately below the `Groups` threshold of `0.75`, and preserved the user's last overview zoom before a semantic-layer transition.
- Introduced separate region bounds for `Areas`, `Groups` and `Entities`.
- The first compacting pass changed region dimensions but left hubs and group nodes at their old low coordinates. A follow-up screenshot correctly showed that the unused interior space was still present; the initial completion report was therefore inaccurate.
- The corrective pass moved both the frames and their contents: area hubs and group nodes now sit close to their labels, the central RM node moved upward, and Music, Screen and Institutions form a tighter lower row.
- Current region heights are 175–185px for `Areas`, 160–170px for `Groups`, and content-specific at `Entities` (120–380px depending on the domain).
- A production screenshot exposed the React Flow minimap as a large empty overlay in the lower-right corner; it has been removed in both themes while the zoom and fit controls remain available.
- Finside area containers now keep a uniform 28px rounded rectangle in every semantic phase; their internal area hubs and grouped nodes use the same 165px-wide, 16px-radius rounded-rectangle language, so the `Areas → Groups` transition no longer changes either visual layer unexpectedly.
- Entity cards already shared the same capped-width coordinate grid in Atlas and Finside, but Finside's taller area labels exposed an insufficient top gutter. Every detail region now reserves roughly 95–105px above its first content row, and Film & Television expands to fit all four rows rather than retaining its former one-row height.
- The Finside gradient had only been attached to the home hero, while the app shell and wide-screen gutters still used a flat paper colour. The gradient now belongs to the full Finside shell, the protocol background spans the viewport behind its constrained content, and the hero's wide-screen top padding is capped at 86px.
- The Finside protocol is now a full-width 58px desktop strip: its heading, explanation and methodology link share one line, with natural wrapping restored on small screens.
- The Atlas protocol prefix now reads `Protocol /`; the Finside protocol uses a 58px full-width desktop strip and a compact wrapping mobile treatment.

### Verification

```bash
npm run validate:data
npm run build
```

- Data validation passes: 25 entities, 34 relations, 12 sources, 7 labelled research findings, 14 community archives and 7 timeline events.
- Production build passes; Vite reports only the existing large-chunk advisory.
- Tested Atlas and Finside at desktop and mobile widths.
- Checked Literature, Visual Art, Music, Screen and Institutions independently: every rendered edge remains inside the graph canvas, with no page-level horizontal overflow or browser console errors.

### Next step

- Review the final local state once more, then commit, push and deploy the verified build.

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
