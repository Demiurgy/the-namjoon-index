# Changelog

All notable changes to The Namjoon (RM) Index are recorded here.

## Unreleased — 2026-08-10

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

### Fixed

- Confirmed graph relationships now render as solid lines instead of React Flow animated dashed lines.
- Removed decorative page numbers that made the archive hierarchy confusing.
- Kept the methodology principle compact and consistently sized across themes.

### Verified

- `npm run validate:data`
- `npm run build`
