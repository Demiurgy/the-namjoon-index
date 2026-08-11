# Community archive inventory

Reviewed: 2026-08-10

## Editorial decision

Phase one of the large inventory pass is source discovery, not claim verification. The structured source register lives in [`research/community-archives.json`](../community-archives.json). None of its entries are publication evidence by themselves. Traceable findings may be displayed in the public research ledger, but only with a visible provisional status and an explicit statement of what remains unverified.

The first pass found fourteen useful candidate archives:

- four P0 sources for immediate extraction;
- seven P1 sources for targeted extraction, chronology and recovery of primary URLs;
- three P2 sources for selective recovery and cross-checking.

The strongest starting pair is domain-specific:

- **Literature:** Namjoon's Booklist and Namjoon's Library;
- **Visual Art / Museums:** ARTWITHRM and its location map.

Vancouver Public Library's 83-item *Namjoon's Bookshelf* is also P0 because its structured bibliographic records and short provenance notes make it unusually efficient to ingest. It is not treated as stronger evidence merely because it is hosted by a library: its list still mixes recommendations, visible possessions and books connected to BTS.

## Why the archives remain separate from evidence sources

A fan archive can perform four valuable jobs without becoming proof:

1. identify a title, edition, artwork, venue or exhibition;
2. recover a date, programme name or deleted-post context;
3. preserve a route back to the original URL;
4. expose disagreements between earlier lists.

It cannot safely decide the public relationship. In particular, these labels must be re-evaluated from the primary material:

| Archive wording | Maximum provisional lead | Required primary check |
|---|---|---|
| recommended | `recommended` candidate | RM's explicit recommendation in a post, interview or recording |
| read | `read` candidate | direct statement or unambiguous scene with a locator |
| owns / bookshelf | `mentioned` candidate | visible and independently matched edition; never infer reading |
| inspired BTS | `referenced_in` candidate | official credit, direct statement or reproducible textual/visual reference |
| visited | `visited` candidate | RM/official post, institutional record or unmistakable public observation |
| collection | `collected` candidate | owner, artist, gallery, museum or catalogue confirmation |

## Intake order

### Batch A — specialised catalogues

1. Extract Namjoon's Booklist.
2. Extract Namjoon's Library and its external sheet.
3. Extract every ARTWITHRM location page.
4. Extract all 83 Vancouver Public Library records.

Each imported row should initially create or update a `research_lead`, not a claim. Preserve the archive's exact relationship language in `notes`, but map the proposed relation to the narrowest plausible value.

### Batch B — deduplication

Normalise and compare:

- English, Korean, Japanese and original-language titles;
- creator names and romanisation variants;
- editions, ISBNs and exhibition catalogues;
- institution branch names;
- artwork title, artist and year triples;
- identical primary moments cited by several archives.

One primary moment may generate several entities but should not be counted as several independent confirmations.

### Batch C — primary-source verification

Work in small clusters of ten leads sharing a source moment. A bookshelf photograph, one live broadcast or one museum visit can then be checked once while resolving several candidates.

For every candidate record:

1. open the original post, video, interview, institution page or catalogue;
2. record a timestamp, image number, post date, page or section;
3. verify the object independently through a publisher, artist, gallery or museum record;
4. set the narrowest defensible relationship;
5. record any conflicting identification instead of silently choosing one;
6. promote the item to the main graph only after the existing database rules are satisfied; before that, keep it visible only in the labelled research ledger.

## High-value recovery sources

- **BTS Bangtan Archive** and **r/bangtan** are especially useful for recovering exact legacy URLs and dates.
- **BTS Content Index** is the best candidate for finding the official programme or episode behind a video-based lead.
- **US BTS ARMY** preserves labelled references and screenshots for some RM Instagram posts that have since been archived.
- **Tertulia** preserves a partial mirror of Namjoon's Library social posts when X is inaccessible.

## Known traps from the first pass

- A source can be carefully curated and still collapse `owned`, `read` and `recommended` into one shelf.
- A table's “read” column may describe the compiler's progress, not RM's activity.
- Books used as props or associated with a BTS concept are not automatically RM reading records.
- A museum location does not establish which exhibition or artwork RM saw.
- An artwork visible at home does not establish title, edition, ownership or collection status without a second identification step.
- Downloadable PDF or EPUB links in older bibliographies are outside this project's intake process and must not be copied.
- Deleted Instagram screenshots are valuable context, but consequential claims should seek institutional or other independent corroboration.

## Definition of done for the next pass

The source-discovery phase is complete enough to begin extraction when:

- every P0 archive has an item count or an explicit `count_unknown` note;
- every item has its archive URL and archive-local locator;
- duplicates are clustered without discarding alternate title forms;
- no imported item is marked verified;
- every lead names the primary-source type needed for promotion.
