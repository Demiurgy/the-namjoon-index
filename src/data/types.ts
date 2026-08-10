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
  sourceIds: string[];
};

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt?: string;
  accessedAt: string;
  sourceType: 'museum' | 'official_media' | 'interview' | 'social_post' | 'fan_archive';
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
