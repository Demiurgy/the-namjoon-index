import type { Entity, Relation, Source } from './types';

export const entities: Entity[] = [
  {
    id: 'rm', slug: 'rm-kim-namjoon', type: 'person', title: 'RM / Kim Namjoon',
    alternativeNames: ['RM', 'Kim Namjoon', 'Kim Nam-joon', 'Namjoon', 'BTS RM', '김남준', '알엠'],
    description: 'Leader of BTS and an avid public student of art, literature, music and culture.',
    externalLinks: [{ label: 'Official BTS profile', url: 'https://ibighit.com/bts/eng/profile/' }],
  },
  {
    id: 'yun-hyong-keun', slug: 'yun-hyong-keun', type: 'artist', title: 'Yun Hyong-keun',
    originalTitle: '윤형근', year: 1928,
    description: 'A Korean painter known for deep, restrained fields of umber and ultramarine and a central figure in the Dansaekhwa movement.',
  },
  {
    id: 'kim-whanki', slug: 'kim-whanki', type: 'artist', title: 'Kim Whanki',
    originalTitle: '김환기', year: 1913,
    description: 'A pioneering Korean modernist whose lyrical abstractions and later dot paintings connect Korean motifs with an international visual language.',
  },
  {
    id: 'lee-ungno', slug: 'lee-ungno', type: 'artist', title: 'Lee Ungno',
    originalTitle: '이응노', year: 1904,
    description: 'A Korean artist whose practice moved from traditional ink painting toward abstract and humanist forms.',
  },
  {
    id: 'kwon-dae-sup', slug: 'kwon-dae-sup', type: 'artist', title: 'Kwon Dae-sup',
    originalTitle: '권대섭', description: 'A ceramic artist celebrated for contemporary moon jars rooted in Korean white porcelain traditions.',
  },
  {
    id: 'joung-young-ju', slug: 'joung-young-ju', type: 'artist', title: 'Joung Young-ju',
    originalTitle: '정영주', description: 'A Korean artist whose layered paper-and-paint cityscapes evoke disappearing hillside neighborhoods and memory.',
  },
  {
    id: 'kang-yobae', slug: 'kang-yobae', type: 'artist', title: 'Kang Yobae',
    originalTitle: '강요배', description: 'A Jeju-born painter whose landscapes carry the island’s history, seasons and lived memory.',
  },
  {
    id: 'untitled-1973-yun', slug: 'untitled-1973-yun-hyong-keun', type: 'artwork', title: 'Untitled', creator: 'Yun Hyong-keun', year: 1973,
    description: 'A work by Yun Hyong-keun listed by SFMOMA among the works in RM’s personal collection.',
  },
  {
    id: 'the-eternal-song', slug: 'the-eternal-song', type: 'artwork', title: 'The Eternal Song', originalTitle: '영원한 노래', creator: 'Kim Whanki', year: 1957,
    description: 'A painting by Kim Whanki that RM was photographed with at an exhibition at Seoul Museum of Art’s Buk-Seoul Museum of Art.',
  },
  {
    id: 'bamboo-lee-ungno', slug: 'bamboo-lee-ungno', type: 'artwork', title: 'Bamboo', originalTitle: '대나무', creator: 'Lee Ungno', year: 1971,
    description: 'An ink bamboo painting by Lee Ungno discussed in Weverse Magazine alongside RM’s public post and museum visit.',
  },
  {
    id: 'moon-jar-kwon', slug: 'moon-jar-kwon-dae-sup', type: 'artwork', title: 'Moon Jar', originalTitle: '달항아리', creator: 'Kwon Dae-sup',
    description: 'A contemporary moon jar associated with RM’s public interest in Kwon Dae-sup’s ceramics.',
  },
  {
    id: 'rm-x-sfmoma', slug: 'rm-x-sfmoma', type: 'exhibition', title: 'RM x SFMOMA: Between You and Me', year: 2026,
    description: 'An exhibition bringing together 200 works from RM’s collection and SFMOMA, curated by RM with SFMOMA curators.',
    externalLinks: [{ label: 'Exhibition page', url: 'https://www.sfmoma.org/exhibition/rm-x-sfmoma/' }],
  },
  {
    id: 'sfmoma', slug: 'sfmoma', type: 'museum', title: 'San Francisco Museum of Modern Art',
    alternativeNames: ['SFMOMA'], description: 'A major museum of modern and contemporary art in San Francisco and the presenting institution for RM x SFMOMA.',
    externalLinks: [{ label: 'Museum website', url: 'https://www.sfmoma.org/' }],
  },
  {
    id: 'seoul-museum-of-art', slug: 'seoul-museum-of-art', type: 'museum', title: 'Seoul Museum of Art',
    alternativeNames: ['SeMA', 'Buk-Seoul Museum of Art'], description: 'The Seoul museum venue where RM was photographed with Kim Whanki’s The Eternal Song.',
  },
  {
    id: 'indigo', slug: 'indigo', type: 'album', title: 'Indigo', year: 2022,
    description: 'RM’s solo album, documented in the official BIGHIT MUSIC discography.',
    externalLinks: [{ label: 'Official album page', url: 'https://bts.ibighit.com/eng/discography/rm/detail/indigo/' }],
  },
  {
    id: 'mono', slug: 'mono', type: 'album', title: 'mono.', year: 2018,
    description: 'RM’s playlist-style release, documented in the official BIGHIT MUSIC discography.',
    externalLinks: [{ label: 'Official album page', url: 'https://bts.ibighit.com/eng/discography/rm/detail/mono/' }],
  },
];

export const sources: Source[] = [
  {
    id: 'weverse-modern-art', title: 'Following RM through Korean modern and contemporary art', publisher: 'Weverse Magazine',
    url: 'https://magazine.weverse.io/article/view/120?artist=BTS&lang=ko', accessedAt: '2026-08-10', sourceType: 'official_media',
  },
  {
    id: 'sfmoma-rm-exhibition', title: 'RM x SFMOMA: Between You and Me', publisher: 'San Francisco Museum of Modern Art',
    url: 'https://www.sfmoma.org/exhibition/rm-x-sfmoma/', accessedAt: '2026-08-10', sourceType: 'museum',
  },
  {
    id: 'bts-profile', title: 'BTS official profile', publisher: 'BIGHIT MUSIC',
    url: 'https://ibighit.com/bts/eng/profile/', accessedAt: '2026-08-10', sourceType: 'official_media',
  },
  {
    id: 'bighit-indigo', title: 'Indigo | RM', publisher: 'BIGHIT MUSIC',
    url: 'https://bts.ibighit.com/eng/discography/rm/detail/indigo/', accessedAt: '2026-08-10', sourceType: 'official_media',
  },
  {
    id: 'bighit-mono', title: 'mono. | RM', publisher: 'BIGHIT MUSIC',
    url: 'https://bts.ibighit.com/eng/discography/rm/detail/mono/', accessedAt: '2026-08-10', sourceType: 'official_media',
  },
];

export const relations: Relation[] = [
  { id: 'rm-yun', from: 'rm', to: 'yun-hyong-keun', type: 'admired', date: '2020', note: 'Weverse describes RM as deeply engaged with Yun Hyong-keun’s work and notes that he visited exhibitions in Venice, New York and Seoul.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-kim', from: 'rm', to: 'kim-whanki', type: 'mentioned', note: 'RM was photographed with Kim Whanki’s The Eternal Song at an exhibition; the source supports the encounter, not ownership.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-lee', from: 'rm', to: 'lee-ungno', type: 'mentioned', note: 'Weverse records RM’s social post about Lee Ungno’s Bamboo and his visit to the National Museum of Modern and Contemporary Art exhibition.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-kwon', from: 'rm', to: 'kwon-dae-sup', type: 'admired', note: 'The source describes RM posting a photograph with a Kwon Dae-sup moon jar and expressing admiration for the artist’s work.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-joung', from: 'rm', to: 'joung-young-ju', type: 'admired', note: 'Joung Young-ju is included among the Korean artists discussed through RM’s public interests in the official Weverse feature.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-kang', from: 'rm', to: 'kang-yobae', type: 'mentioned', note: 'Weverse identifies Kang Yobae’s art essay as a book RM introduced as something he was recently immersed in.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-yun-work', from: 'rm', to: 'untitled-1973-yun', type: 'collected', date: '2026', note: 'SFMOMA lists this work as part of the collection of RM.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'yun-work-artist', from: 'untitled-1973-yun', to: 'yun-hyong-keun', type: 'created_by', note: 'The artwork is attributed to Yun Hyong-keun by SFMOMA.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-eternal-song', from: 'rm', to: 'the-eternal-song', type: 'mentioned', note: 'RM was photographed with the work at a museum exhibition; this does not establish ownership.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'eternal-kim', from: 'the-eternal-song', to: 'kim-whanki', type: 'created_by', note: 'The work is identified as Kim Whanki’s The Eternal Song.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-bamboo', from: 'rm', to: 'bamboo-lee-ungno', type: 'mentioned', note: 'The work appeared in RM’s public post and is discussed in the official feature.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'bamboo-lee', from: 'bamboo-lee-ungno', to: 'lee-ungno', type: 'created_by', note: 'The work is identified as Lee Ungno’s Bamboo.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-moon-jar', from: 'rm', to: 'moon-jar-kwon', type: 'mentioned', note: 'RM was photographed with a Kwon Dae-sup moon jar; the source does not confirm that this particular work belongs to him.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'moon-jar-artist', from: 'moon-jar-kwon', to: 'kwon-dae-sup', type: 'created_by', note: 'The work is presented as a Kwon Dae-sup moon jar.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-sfmoma-exhibition', from: 'rm', to: 'rm-x-sfmoma', type: 'collaborated_with', date: '2026', note: 'SFMOMA states that the exhibition is curated by RM with SFMOMA curators.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'exhibition-sfmoma', from: 'rm-x-sfmoma', to: 'sfmoma', type: 'held_at', date: '2026', note: 'SFMOMA is the presenting museum for the exhibition.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-collection', from: 'rm', to: 'sfmoma', type: 'collected', date: '2026', note: 'SFMOMA explicitly describes the exhibition as featuring artworks from RM’s personal collection.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-indigo', from: 'rm', to: 'indigo', type: 'created_by', date: '2022', note: 'Indigo appears in RM’s official BIGHIT MUSIC discography.', evidenceLevel: 'confirmed', sourceIds: ['bighit-indigo'] },
  { id: 'rm-mono', from: 'rm', to: 'mono', type: 'created_by', date: '2018', note: 'mono. appears in RM’s official BIGHIT MUSIC discography.', evidenceLevel: 'confirmed', sourceIds: ['bighit-mono'] },
];

export const entityById = new Map(entities.map((entity) => [entity.id, entity]));
export const sourceById = new Map(sources.map((source) => [source.id, source]));

export const getEntity = (id: string) => entityById.get(id);
export const getRelationsFor = (id: string) => relations.filter((relation) => relation.from === id || relation.to === id);
export const getSource = (id: string) => sourceById.get(id);
