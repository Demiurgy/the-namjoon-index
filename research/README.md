# Research database

This directory contains the editorial research layer for The Namjoon Index.

The public site reads established graph relations from `src/data/index.ts` and a separately labelled research ledger from `public-findings.json`. The SQLite database is used to collect leads, document evidence and decide which claims are safe to promote onto the main graph.

## Create the local database

From the project root:

```bash
sqlite3 research/namjoon-index-research.sqlite ".read research/schema.sql" ".read research/seed.sql"
```

The local `.sqlite` file is ignored by Git. The reproducible schema and reviewed seed remain in the project.

Validate the database after every research update:

```bash
sqlite3 -bail research/namjoon-index-research.sqlite ".read research/validate.sql"
```

## Useful checks

Publication queue:

```bash
sqlite3 -header -column research/namjoon-index-research.sqlite "SELECT * FROM publication_queue;"
```

Open research leads:

```bash
sqlite3 -header -column research/namjoon-index-research.sqlite "SELECT id, proposed_entity_title, status, source_locator FROM open_leads;"
```

Source audit for one claim:

```bash
sqlite3 -header -column research/namjoon-index-research.sqlite "SELECT c.id, c.claim_text, s.publisher, cs.evidence_role, cs.locator FROM claims c JOIN claim_sources cs ON cs.claim_id = c.id JOIN sources s ON s.id = cs.source_id WHERE c.id = 'claim-rm-midnight-library';"
```

Community discovery credits for one claim:

```bash
sqlite3 -header -column research/namjoon-index-research.sqlite "SELECT s.publisher, cdc.discovery_role, cdc.locator, cdc.credit_note FROM claim_discovery_credits cdc JOIN sources s ON s.id = cdc.source_id WHERE cdc.claim_id = 'claim-rm-midnight-library-read';"
```

## Editorial rule

A community source may start a lead, but it does not by itself upgrade a claim. Save the primary URL and locator, publish the unresolved item only inside the explicitly labelled research ledger, verify the narrowest supportable relationship, and only then mark the claim as publication-ready for the main graph.

Verification does not erase discovery credit. Keep `claim_discovery_credits` separate from `claim_sources` so a public card can show both `Discovered by` and `Verified with`. A community archive may appear in both tables when it genuinely contributed context or corroboration, but the roles must remain explicit.

Disagreement is preserved rather than flattened. Attach two or three sources to the same claim with `supports`, `corroborates`, `context` or `contradicts`, and describe the exact disagreement in `evidence_note`. If a finding cannot be attributed to a reproducible source, keep it in `research_leads`; `source_url` may be empty. A corroborated claim requires at least two independent supporting or corroborating evidence records.

## Image assets

Book-cover and artwork candidates live in [`image-assets.json`](./image-assets.json). The accompanying [image research notes](./images/README.md) explain edition matching, rights review, credits and fallbacks. Image discovery is independent from claim verification: a correct official image can still be unavailable for republication.

## Community archive intake

The discovery register for fan bibliographies, art maps and general recovery archives lives in [`community-archives.json`](./community-archives.json). The [inventory note](./findings/community-archive-inventory.md) records priorities, intake order and known traps.

These archives generate leads only. Their relationship labels are not imported as facts, and their entries do not count as primary-source verification. Traceable leads may nevertheless appear in the public research ledger when their provisional status, source trail and missing verification are shown together.
