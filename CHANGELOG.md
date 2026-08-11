# Changelog

All notable changes to The Namjoon (RM) Index are recorded here.

## Unreleased — 2026-08-11

### Added

- Initial React / TypeScript / Vite application.
- Interactive React Flow cultural graph.
- Full map route at `/map` with relation-colour legend.
- Explore, entity, timeline, sources and methodology pages.
- Local entity, relation and source data model.
- Automated data validation script.
- Source and evidence-level badges.
- Search, entity-type filters, evidence filters and confirmed-collection filter.
- Science and Finside visual themes.
- Responsive and reduced-motion styling.
- SEO metadata, JSON-LD, sitemap and robots.txt.
- README, development log and changelog.
- Public research ledger with seven clearly labelled findings and fourteen attributed community archives.
- Attribution trails that preserve community discovery credit alongside primary-source verification.
- Editorial image register and low-resolution, credited covers for `Indigo` and `mono.`.

### Changed

- Established Atlas as the default cartographic theme while retaining Finside as an alternate fan-facing palette.
- Unified page-title scale, one-line desktop headings, page labels, subheadings and small-interface typography across both themes.
- Replaced the visible `Editorial` evidence label with the clearer `Index interpretation` wording.
- Condensed page introductions and placed the map methodology link directly after its explanatory text.
- Moved the independent-project disclaimer before the evidence methodology on About.
- Reworked map geometry per semantic layer: compact area hubs for `Areas`, tighter grouped nodes for `Groups`, and content-fitted regions for `Entities`.
- Moved group nodes, the central RM node and the lower map row to remove unused interior space instead of only shrinking their background frames.
- Reduced the Finside evidence-protocol banner and changed the Atlas prefix from `Protocol 01 /` to `Protocol /`.

### Fixed

- Confirmed graph relationships now render as solid lines instead of React Flow animated dashed lines.
- Removed decorative page numbers that made the archive hierarchy confusing.
- Kept the methodology principle compact and consistently sized across themes.
- Preserved the last `Areas` zoom level before the map changes to `Groups`.
- Removed trailing periods from main display headings.
- Removed the unsupported `Sorted by relevance` label from Explore.
- Removed large empty areas inside default and grouped map regions while keeping every rendered connection inside the graph canvas.

### Verified

- `npm run validate:data`
- `npm run build`
- Current validation: 25 entities, 34 relations, 12 sources, 7 labelled research findings, 14 community archives and 7 timeline events.
- Atlas and Finside checked at desktop and mobile widths; all domain-specific edge paths remain inside the graph canvas.
