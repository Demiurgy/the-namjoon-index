PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS entities (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN (
    'person', 'book', 'film', 'series', 'artist', 'artwork',
    'album', 'song', 'exhibition', 'museum'
  )),
  title TEXT NOT NULL CHECK (length(trim(title)) > 0),
  original_title TEXT,
  creator TEXT,
  year INTEGER,
  research_status TEXT NOT NULL DEFAULT 'candidate' CHECK (research_status IN (
    'candidate', 'verified', 'published', 'rejected'
  )),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL CHECK (length(trim(title)) > 0),
  publisher TEXT NOT NULL CHECK (length(trim(publisher)) > 0),
  url TEXT NOT NULL UNIQUE CHECK (url GLOB 'https://*' OR url GLOB 'http://*'),
  source_class TEXT NOT NULL CHECK (source_class IN (
    'rm_direct', 'official_content', 'institutional_record',
    'reputable_secondary', 'community_archive'
  )),
  authority_rank INTEGER NOT NULL CHECK (authority_rank BETWEEN 1 AND 4),
  published_at TEXT,
  accessed_at TEXT NOT NULL,
  access_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS claims (
  id TEXT PRIMARY KEY,
  subject_entity_id TEXT NOT NULL REFERENCES entities(id),
  object_entity_id TEXT NOT NULL REFERENCES entities(id),
  relation_type TEXT NOT NULL CHECK (relation_type IN (
    'read', 'recommended', 'mentioned', 'watched', 'admired', 'visited',
    'collected', 'created_by', 'shown_at', 'held_at', 'influenced',
    'referenced_in', 'featured_in', 'collaborated_with'
  )),
  evidence_level TEXT NOT NULL CHECK (evidence_level IN (
    'confirmed', 'mentioned', 'editorial'
  )),
  evidence_origin TEXT NOT NULL CHECK (evidence_origin IN (
    'direct_statement', 'public_observation', 'official_summary',
    'community_identification', 'editorial_analysis'
  )),
  verification_status TEXT NOT NULL CHECK (verification_status IN (
    'verified', 'corroborated', 'open_lead', 'rejected'
  )),
  claim_text TEXT NOT NULL CHECK (length(trim(claim_text)) > 0),
  event_date TEXT,
  publication_ready INTEGER NOT NULL DEFAULT 0 CHECK (publication_ready IN (0, 1)),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (subject_entity_id <> object_entity_id),
  CHECK (relation_type <> 'collected' OR evidence_level = 'confirmed'),
  CHECK (publication_ready = 0 OR verification_status IN ('verified', 'corroborated'))
);

CREATE TABLE IF NOT EXISTS claim_sources (
  claim_id TEXT NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES sources(id),
  evidence_role TEXT NOT NULL CHECK (evidence_role IN (
    'supports', 'corroborates', 'context', 'contradicts'
  )),
  locator TEXT,
  evidence_note TEXT NOT NULL CHECK (length(trim(evidence_note)) > 0),
  checked_at TEXT NOT NULL,
  PRIMARY KEY (claim_id, source_id, evidence_role)
);

CREATE TABLE IF NOT EXISTS research_leads (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL CHECK (domain IN (
    'literature', 'film_tv', 'visual_art', 'music', 'museums_exhibitions'
  )),
  lead_text TEXT NOT NULL CHECK (length(trim(lead_text)) > 0),
  proposed_entity_title TEXT,
  proposed_relation_type TEXT,
  discovery_origin TEXT NOT NULL CHECK (discovery_origin IN (
    'direct_statement', 'public_observation', 'official_summary',
    'community_identification', 'editorial_analysis'
  )),
  source_url TEXT CHECK (source_url IS NULL OR source_url GLOB 'https://*' OR source_url GLOB 'http://*'),
  source_locator TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'triage', 'verifying', 'verified', 'rejected', 'parked'
  )),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_claims_object ON claims(object_entity_id);
CREATE INDEX IF NOT EXISTS idx_claims_verification ON claims(verification_status, publication_ready);
CREATE INDEX IF NOT EXISTS idx_sources_authority ON sources(authority_rank, source_class);
CREATE INDEX IF NOT EXISTS idx_leads_status ON research_leads(status, domain);

CREATE VIEW IF NOT EXISTS publication_queue AS
SELECT
  c.id AS claim_id,
  subject.title AS subject_title,
  object.title AS object_title,
  c.relation_type,
  c.evidence_level,
  c.evidence_origin,
  c.verification_status,
  c.claim_text,
  c.event_date,
  COUNT(CASE WHEN cs.evidence_role IN ('supports', 'corroborates') THEN 1 END) AS supporting_source_count
FROM claims c
JOIN entities subject ON subject.id = c.subject_entity_id
JOIN entities object ON object.id = c.object_entity_id
LEFT JOIN claim_sources cs ON cs.claim_id = c.id
WHERE c.publication_ready = 1
GROUP BY c.id;

CREATE VIEW IF NOT EXISTS open_leads AS
SELECT *
FROM research_leads
WHERE status IN ('new', 'triage', 'verifying');
