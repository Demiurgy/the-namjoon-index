export type EntityType =
  | 'person'
  | 'book'
  | 'film'
  | 'series'
  | 'artist'
  | 'artwork'
  | 'album'
  | 'song'
  | 'exhibition'
  | 'museum';

export type RelationType =
  | 'read'
  | 'recommended'
  | 'mentioned'
  | 'watched'
  | 'admired'
  | 'visited'
  | 'collected'
  | 'created_by'
  | 'shown_at'
  | 'held_at'
  | 'influenced'
  | 'referenced_in'
  | 'featured_in'
  | 'collaborated_with';

export type EvidenceLevel = 'confirmed' | 'mentioned' | 'editorial';
export type EvidenceOrigin = 'direct_statement' | 'public_observation' | 'official_summary' | 'community_identification' | 'editorial_analysis';
export type DiscoveryRole = 'identified' | 'independently_identified' | 'preserved' | 'indexed';

export type DiscoveryCredit = {
  sourceId: string;
  role: DiscoveryRole;
  locator?: string;
  note: string;
};

export type EditorialReading = {
  title: string;
  whyItMatters: string;
  possibleResonance: string;
  themes: string[];
};

export type Entity = {
  id: string;
  slug: string;
  type: EntityType;
  title: string;
  originalTitle?: string;
  alternativeNames?: string[];
  creator?: string;
  year?: number;
  description: string;
  image?: {
    url: string;
    alt: string;
    credit?: string;
    license?: string;
    sourceUrl?: string;
  };
  editorial?: EditorialReading;
  externalLinks?: { label: string; url: string }[];
};

export type Relation = {
  id: string;
  from: string;
  to: string;
  type: RelationType;
  date?: string;
  note: string;
  evidenceLevel: EvidenceLevel;
  evidenceOrigin?: EvidenceOrigin;
  sourceIds: string[];
  discoveryCredits?: DiscoveryCredit[];
};

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt?: string;
  accessedAt: string;
  sourceType: 'museum' | 'official_media' | 'interview' | 'social_post' | 'institutional' | 'secondary' | 'fan_archive';
};

export type TimelineCategory = 'literature' | 'visual-art' | 'music' | 'institutions' | 'screen';
export type TimelinePrecision = 'exact' | 'year' | 'approximate' | 'scheduled';

export type TimelineEvent = {
  id: string;
  sortDate: string;
  displayDate: string;
  precision: TimelinePrecision;
  category: TimelineCategory;
  title: string;
  summary: string;
  relationIds: string[];
  sourceIds: string[];
};

export type CommunityArchive = {
  id: string;
  title: string;
  url: string;
  relatedUrls?: string[];
  archiveType: string;
  domains: string[];
  priority: 'P0' | 'P1' | 'P2';
  access: string;
  coverageSignal: string;
  sourceLinkage: string;
  strengths: string[];
  risks: string[];
  nextAction: string;
};

export type ResearchFindingStatus = 'corroborated' | 'verifying' | 'open' | 'parked';

export type ResearchFinding = {
  id: string;
  domain: string;
  entityId: string;
  proposedRelation: RelationType;
  status: ResearchFindingStatus;
  date?: string;
  title: string;
  summary: string;
  unresolved: string;
  sources: {
    label: string;
    url: string;
    role: string;
    locator?: string;
  }[];
};
