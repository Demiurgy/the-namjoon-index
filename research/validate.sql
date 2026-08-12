PRAGMA foreign_keys = ON;

CREATE TEMP TABLE validation_results (
  rule TEXT NOT NULL,
  violations INTEGER NOT NULL CHECK (violations = 0)
);

INSERT INTO validation_results
SELECT 'foreign key violations', COUNT(*)
FROM pragma_foreign_key_check;

INSERT INTO validation_results
SELECT 'publication-ready claim without supporting evidence', COUNT(*)
FROM claims c
WHERE c.publication_ready = 1
  AND NOT EXISTS (
    SELECT 1
    FROM claim_sources cs
    WHERE cs.claim_id = c.id
      AND cs.evidence_role IN ('supports', 'corroborates')
  );

INSERT INTO validation_results
SELECT 'publication-ready claim with an unverified entity', COUNT(*)
FROM claims c
JOIN entities object ON object.id = c.object_entity_id
WHERE c.publication_ready = 1
  AND object.research_status NOT IN ('verified', 'published');

INSERT INTO validation_results
SELECT 'direct statement without a confirmed evidence level', COUNT(*)
FROM claims
WHERE evidence_origin = 'direct_statement'
  AND evidence_level <> 'confirmed';

INSERT INTO validation_results
SELECT 'community identification published while still an open lead', COUNT(*)
FROM claims
WHERE evidence_origin = 'community_identification'
  AND verification_status = 'open_lead'
  AND publication_ready = 1;

INSERT INTO validation_results
SELECT 'published community identification without discovery credit', COUNT(*)
FROM claims c
WHERE c.evidence_origin = 'community_identification'
  AND c.publication_ready = 1
  AND NOT EXISTS (
    SELECT 1
    FROM claim_discovery_credits cdc
    WHERE cdc.claim_id = c.id
  );

INSERT INTO validation_results
SELECT 'corroborated claim with fewer than two evidence records', COUNT(*)
FROM claims c
WHERE c.verification_status = 'corroborated'
  AND (
    SELECT COUNT(*)
    FROM claim_sources cs
    WHERE cs.claim_id = c.id
      AND cs.evidence_role IN ('supports', 'corroborates')
  ) < 2;

SELECT rule, 'ok' AS result
FROM validation_results
ORDER BY rule;
