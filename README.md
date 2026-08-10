# The Namjoon (RM) Index

An independent, source-based cultural archive mapping the books, films, artists, artworks, exhibitions, museums and publicly confirmed collection connected to BTS’s RM, Kim Namjoon.

## Run locally

```bash
npm install
npm run dev
```

## Validate the data

```bash
npm run validate:data
```

The MVP uses local TypeScript data in `src/data/index.ts`. Every relation must point to existing entities and sources; `collected` relations are required to be `confirmed`.

## Build

```bash
npm run build
```

## Project journal

- [Development log](./DEVLOG.md) — decisions, milestones and next steps.
- [Changelog](./CHANGELOG.md) — user-facing project history.

The project is independent and unofficial. It is not affiliated with RM, BTS, BIGHIT MUSIC or HYBE.
