import type { Entity, Relation, Source, TimelineEvent } from './types';

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
    id: 'book-depth-of-the-landscape', slug: 'the-depth-of-the-landscape', type: 'book', title: 'The Depth of the Landscape',
    originalTitle: '풍경의 깊이', creator: 'Kang Yobae',
    description: 'A Korean-language collection bringing together Kang Yobae’s writing, paintings and reflections on art, history and the landscape of Jeju.',
    image: {
      url: '/images/books/depth-of-the-landscape.jpg', alt: 'Cover of The Depth of the Landscape by Kang Yobae',
      credit: 'Cover: Dolbegae; bibliographic image via HanBooks', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://www.hanbooks.com/deofla.html',
    },
    editorial: {
      title: 'The landscape as memory, not scenery',
      whyItMatters: 'Kang writes from inside his own visual practice, treating landscape as a record of bodies, history and lived time. The book therefore connects literature and visual art rather than simply explaining paintings.',
      possibleResonance: 'Within this archive, the book may illuminate RM’s recurring movement between reading, museum-going and Korean modern art. That is an editorial synthesis, not a claim about his private reasons for reading it.',
      themes: ['Jeju', 'memory', 'history', 'artist writing', 'landscape'],
    },
    externalLinks: [{ label: 'Book record', url: 'https://www.hanbooks.com/deofla.html' }],
  },
  {
    id: 'book-honeybees-distant-thunder', slug: 'honeybees-and-distant-thunder', type: 'book', title: 'Honeybees and Distant Thunder',
    originalTitle: '蜜蜂と遠雷', creator: 'Riku Onda', year: 2016,
    description: 'A Japanese novel following four musicians through an international piano competition and the different ways they understand talent, rivalry and listening.',
    image: {
      url: '/images/books/honeybees-distant-thunder.jpg', alt: 'Japanese cover of Honeybees and Distant Thunder by Riku Onda',
      credit: 'Cover: Gentosha', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://www.gentosha.co.jp/book/detail/9784344030039/',
    },
    editorial: {
      title: 'Listening as a creative act',
      whyItMatters: 'The novel treats performance as more than technical victory: every musician hears, interprets and changes the same musical world differently. Competition becomes a way to ask what originality and artistic generosity look like.',
      possibleResonance: 'For a musician, its questions about interpretation, discipline and public judgment form a plausible point of interest. The archive does not infer that RM identified with any particular character.',
      themes: ['music', 'competition', 'talent', 'interpretation', 'listening'],
    },
    externalLinks: [{ label: 'Publisher page', url: 'https://www.gentosha.co.jp/book/detail/9784344030039/' }],
  },
  {
    id: 'book-that-summers-end', slug: 'that-summers-end', type: 'book', title: 'That Summer’s End',
    originalTitle: '그 여름의 끝', creator: 'Lee Seong-bok', year: 1990,
    description: 'A poetry collection in which natural images, love, suffering and change become instruments for sustained self-reflection.',
    image: {
      url: '/images/books/that-summers-end.jpg', alt: 'Korean cover of That Summer’s End by Lee Seong-bok',
      credit: 'Cover: Munhakgwa Jisung; image via YES24', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://www.yes24.com/product/goods/64337',
    },
    editorial: {
      title: 'Feeling held inside natural form',
      whyItMatters: 'Lee’s poems repeatedly let weather, paths, rivers and seasons carry emotions that resist direct explanation. The landscape is not background; it becomes the structure through which grief, longing and impermanence can be approached.',
      possibleResonance: 'That indirect movement between natural imagery and interior feeling may be useful when reading the archive beside RM’s own recurring language of seasons and landscape. It is a thematic comparison, not evidence of influence.',
      themes: ['poetry', 'seasons', 'longing', 'nature', 'impermanence'],
    },
    externalLinks: [{ label: 'Korean edition', url: 'https://www.yes24.com/product/goods/64337' }],
  },
  {
    id: 'book-all-about-saul-leiter', slug: 'all-about-saul-leiter', type: 'book', title: 'All About Saul Leiter',
    originalTitle: 'ソール・ライターのすべて', creator: 'Saul Leiter', year: 2017,
    description: 'A compact survey of Saul Leiter’s photographs, paintings and words, centered on his quiet and painterly attention to everyday New York.',
    image: {
      url: '/images/books/all-about-saul-leiter.jpg', alt: 'Japanese cover of All About Saul Leiter',
      credit: 'Cover: Seigensha; photograph © Saul Leiter Foundation', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://www.seigensha.com/feature/saulleiter/',
    },
    editorial: {
      title: 'A private scale of attention',
      whyItMatters: 'Leiter found abstraction, colour and tenderness in ordinary streets rather than chasing grand subjects. The book makes a case for looking slowly and allowing a fragment, reflection or obstruction to remain incomplete.',
      possibleResonance: 'Its combination of photography, painting and an intentionally unhurried artistic life fits the archive’s broader pattern of cross-medium curiosity. We do not treat that fit as proof of direct influence.',
      themes: ['photography', 'everyday life', 'colour', 'slowness', 'observation'],
    },
    externalLinks: [{ label: 'Publisher feature', url: 'https://www.seigensha.com/feature/saulleiter/' }],
  },
  {
    id: 'book-midnight-library', slug: 'the-midnight-library', type: 'book', title: 'The Midnight Library',
    creator: 'Matt Haig', year: 2020,
    description: 'A novel about regret, possibility and the imagined lives that branch from choices not taken.',
    image: {
      url: '/images/books/midnight-library.jpg', alt: 'Cover of The Midnight Library by Matt Haig',
      credit: 'Cover: Penguin Random House', license: 'Low-resolution editorial reproduction; representative edition', sourceUrl: 'https://www.penguinrandomhouse.com/books/575653/the-midnight-library-by-matt-haig/',
    },
    editorial: {
      title: 'The seduction of the unlived life',
      whyItMatters: 'The novel turns counterfactual thinking into a literal library: every unopened life appears available, while fulfillment remains harder to measure. Its central tension is between imagined perfection and inhabiting one finite life.',
      possibleResonance: 'The book extends the index toward questions of identity, choice and alternate selves that also recur across contemporary songwriting. This is contextual reading only; it does not assign the novel’s conclusions to RM.',
      themes: ['choice', 'regret', 'identity', 'alternate lives', 'fulfillment'],
    },
    externalLinks: [{ label: 'Publisher page', url: 'https://www.penguinrandomhouse.com/books/575653/the-midnight-library-by-matt-haig/' }],
  },
  {
    id: 'book-doing-good-better', slug: 'doing-good-better', type: 'book', title: 'Doing Good Better',
    creator: 'William MacAskill', year: 2015,
    description: 'An introduction to effective altruism and its argument for using evidence to compare how actions can help others.',
    image: {
      url: '/images/books/doing-good-better.jpg', alt: 'Cover of Doing Good Better by William MacAskill',
      credit: 'Cover: Avery / Penguin Random House', license: 'Low-resolution editorial reproduction; representative edition', sourceUrl: 'https://www.penguinrandomhouse.com/books/316786/doing-good-better-by-william-macaskill/',
    },
    editorial: {
      title: 'Good intentions subjected to evidence',
      whyItMatters: 'The book asks readers to examine not only whether an action feels generous, but how much good it actually produces. Its value to the map lies in the friction between moral emotion, measurement and responsibility.',
      possibleResonance: 'This title widens the archive beyond aesthetics toward civic and ethical inquiry. Its presence should not be read as endorsement of effective altruism or any of the movement’s later debates.',
      themes: ['ethics', 'evidence', 'giving', 'responsibility', 'social impact'],
    },
    externalLinks: [{ label: 'Publisher page', url: 'https://www.penguinrandomhouse.com/books/316786/doing-good-better-by-william-macaskill/' }],
  },
  {
    id: 'untitled-1973-yun', slug: 'untitled-1973-yun-hyong-keun', type: 'artwork', title: 'Untitled', creator: 'Yun Hyong-keun', year: 1973,
    description: 'A work by Yun Hyong-keun listed by SFMOMA among the works in RM’s personal collection.',
    image: {
      url: '/images/artworks/yun-untitled-1973.jpg', alt: 'Untitled, 1973, by Yun Hyong-keun',
      credit: '© Yun Seong-ryeol; courtesy PKM Gallery; photo courtesy Seoul Auction', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://www.sfmoma.org/exhibition/rm-x-sfmoma/',
    },
    editorial: {
      title: 'Restraint that accumulates force',
      whyItMatters: 'Yun’s dark vertical fields are built from repeated layers of umber and ultramarine. Their apparent simplicity holds material time, pressure and variation, asking for slower attention than a single glance can provide.',
      possibleResonance: 'The work offers a visual language for restraint, repetition and Korean modernity—concerns that can productively sit beside RM’s collecting and his public interest in Yun. The interpretation is ours; ownership alone does not disclose motive.',
      themes: ['restraint', 'repetition', 'material time', 'Dansaekhwa', 'Korean modernity'],
    },
  },
  {
    id: 'the-eternal-song', slug: 'the-eternal-song', type: 'artwork', title: 'The Eternal Song', originalTitle: '영원한 노래', creator: 'Kim Whanki', year: 1957,
    description: 'A painting by Kim Whanki that RM was photographed with at an exhibition at Seoul Museum of Art’s Buk-Seoul Museum of Art.',
    image: {
      url: '/images/artworks/eternal-song.jpg', alt: 'The Eternal Song, 1957, by Kim Whanki',
      credit: '© Whanki Foundation and Whanki Museum', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://magazine.weverse.io/article/view/120?artist=BTS&lang=en',
    },
    editorial: {
      title: 'A modern language made from inherited symbols',
      whyItMatters: 'Birds, mountains, clouds, deer and ceramics gather into a modernist composition without losing their connection to Korean visual and poetic traditions. The work makes cultural continuity feel active rather than fixed.',
      possibleResonance: 'That negotiation between Korean inheritance and an international modern language is one of the clearest crosscurrents in the index. RM’s museum encounter is documented; the larger thematic meaning remains our synthesis.',
      themes: ['Korean motifs', 'modernism', 'poetry', 'nature', 'cultural continuity'],
    },
  },
  {
    id: 'bamboo-lee-ungno', slug: 'bamboo-lee-ungno', type: 'artwork', title: 'Bamboo', originalTitle: '대나무', creator: 'Lee Ungno', year: 1971,
    description: 'An ink bamboo painting by Lee Ungno discussed in Weverse Magazine alongside RM’s public post and museum visit.',
    image: {
      url: '/images/artworks/bamboo.jpg', alt: 'Bamboo, 1971, by Lee Ungno',
      credit: '© Lee Ungno Museum', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://magazine.weverse.io/article/view/120?artist=BTS&lang=en',
    },
    editorial: {
      title: 'Tradition as a living method',
      whyItMatters: 'Bamboo belongs to a classical ink-painting lineage, yet Lee’s scale, rhythm and later movement toward abstraction make tradition a point of departure. Looking across his career reveals change without a clean break from earlier practice.',
      possibleResonance: 'The documented post suggests attention not only to one image but to an artist’s evolution. That makes Bamboo useful as a hinge between inherited technique and experimental form; the emphasis is an editorial reading.',
      themes: ['ink painting', 'bamboo', 'tradition', 'evolution', 'abstraction'],
    },
  },
  {
    id: 'moon-jar-kwon', slug: 'moon-jar-kwon-dae-sup', type: 'artwork', title: 'Moon Jar', originalTitle: '달항아리', creator: 'Kwon Dae-sup',
    description: 'A contemporary moon jar associated with RM’s public interest in Kwon Dae-sup’s ceramics.',
    image: {
      url: '/images/artworks/moon-jar.jpg', alt: 'A Moon Jar by Kwon Dae-sup',
      credit: 'Image courtesy K Auction', license: 'Low-resolution editorial reproduction; representative work', sourceUrl: 'https://magazine.weverse.io/article/view/120?artist=BTS&lang=en',
    },
    editorial: {
      title: 'Perfection made human by asymmetry',
      whyItMatters: 'A moon jar is joined from two separately formed halves, so its calm geometry contains slight imbalance and the visible intelligence of hand, clay and fire. Kwon renews a historic form without erasing those irregularities.',
      possibleResonance: 'The object brings together restraint, craft and Korean material tradition—three themes visible elsewhere in the art cluster. The available image is representative, and the archive does not claim it is the exact jar RM held.',
      themes: ['ceramics', 'craft', 'asymmetry', 'white porcelain', 'Korean tradition'],
    },
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
    id: 'weverse-bibilly-hills', title: 'RM’s Bibilly Hills', publisher: 'Weverse Magazine',
    url: 'https://magazine.weverse.io/article/view/632?artist=BTS&lang=en', publishedAt: '2023-01-09', accessedAt: '2026-08-10', sourceType: 'official_media',
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
  { id: 'rm-depth-landscape', from: 'rm', to: 'book-depth-of-the-landscape', type: 'read', date: '2020', note: 'Weverse Magazine states that RM had been reading Kang Yobae’s collection of art and personal writing.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art', 'weverse-bibilly-hills'] },
  { id: 'depth-landscape-kang', from: 'book-depth-of-the-landscape', to: 'kang-yobae', type: 'created_by', note: 'The volume brings together Kang Yobae’s own writing, paintings and reflections, creating a documented bridge between literature and visual art.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-honeybees', from: 'rm', to: 'book-honeybees-distant-thunder', type: 'mentioned', note: 'Weverse Magazine includes Mitsubachi to Enrai among books RM had recently mentioned. The source does not establish a direct recommendation.', evidenceLevel: 'mentioned', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-that-summers-end', from: 'rm', to: 'book-that-summers-end', type: 'mentioned', date: '2022', note: 'Weverse Magazine includes End of the Summer among books RM had recently mentioned. The archive uses the collection’s English title, That Summer’s End.', evidenceLevel: 'mentioned', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-all-about-saul-leiter', from: 'rm', to: 'book-all-about-saul-leiter', type: 'mentioned', note: 'Weverse Magazine includes All About Saul Leiter among books RM had recently mentioned.', evidenceLevel: 'mentioned', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-midnight-library', from: 'rm', to: 'book-midnight-library', type: 'mentioned', date: '2021', note: 'Weverse Magazine includes The Midnight Library among books RM had recently mentioned. Independent research into the exact In the SOOP 2 scene remains outside this public claim.', evidenceLevel: 'mentioned', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-doing-good-better', from: 'rm', to: 'book-doing-good-better', type: 'mentioned', date: '2021', note: 'Weverse Magazine includes Doing Good Better among books RM had recently mentioned. A bookshelf identification exists in research, but no reading or recommendation claim is made here.', evidenceLevel: 'mentioned', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-yun-work', from: 'rm', to: 'untitled-1973-yun', type: 'collected', date: '2026', note: 'SFMOMA lists this work as part of the collection of RM.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'yun-work-artist', from: 'untitled-1973-yun', to: 'yun-hyong-keun', type: 'created_by', note: 'The artwork is attributed to Yun Hyong-keun by SFMOMA.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-eternal-song', from: 'rm', to: 'the-eternal-song', type: 'mentioned', note: 'RM was photographed with the work at a museum exhibition; this does not establish ownership.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'eternal-kim', from: 'the-eternal-song', to: 'kim-whanki', type: 'created_by', note: 'The work is identified as Kim Whanki’s The Eternal Song.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'eternal-sema', from: 'the-eternal-song', to: 'seoul-museum-of-art', type: 'shown_at', note: 'The work was encountered at an exhibition at Seoul Museum of Art’s Buk-Seoul Museum of Art.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-bamboo', from: 'rm', to: 'bamboo-lee-ungno', type: 'mentioned', note: 'The work appeared in RM’s public post and is discussed in the official feature.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'bamboo-lee', from: 'bamboo-lee-ungno', to: 'lee-ungno', type: 'created_by', note: 'The work is identified as Lee Ungno’s Bamboo.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-moon-jar', from: 'rm', to: 'moon-jar-kwon', type: 'mentioned', note: 'RM was photographed with a Kwon Dae-sup moon jar; the source does not confirm that this particular work belongs to him.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'moon-jar-artist', from: 'moon-jar-kwon', to: 'kwon-dae-sup', type: 'created_by', note: 'The work is presented as a Kwon Dae-sup moon jar.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-sfmoma-exhibition', from: 'rm', to: 'rm-x-sfmoma', type: 'collaborated_with', date: '2026', note: 'SFMOMA states that the exhibition is curated by RM with SFMOMA curators.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'exhibition-sfmoma', from: 'rm-x-sfmoma', to: 'sfmoma', type: 'held_at', date: '2026', note: 'SFMOMA is the presenting museum for the exhibition.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-collection', from: 'rm', to: 'sfmoma', type: 'collected', date: '2026', note: 'SFMOMA explicitly describes the exhibition as featuring artworks from RM’s personal collection.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-indigo', from: 'rm', to: 'indigo', type: 'created_by', date: '2022', note: 'Indigo appears in RM’s official BIGHIT MUSIC discography.', evidenceLevel: 'confirmed', sourceIds: ['bighit-indigo'] },
  { id: 'yun-indigo-cover', from: 'yun-hyong-keun', to: 'indigo', type: 'featured_in', date: '2022', note: 'Weverse Magazine states that Indigo features work by Yun Hyong-keun on its cover, connecting RM’s music and visual-art interests.', evidenceLevel: 'confirmed', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-mono', from: 'rm', to: 'mono', type: 'created_by', date: '2018', note: 'mono. appears in RM’s official BIGHIT MUSIC discography.', evidenceLevel: 'confirmed', sourceIds: ['bighit-mono'] },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-rm-x-sfmoma', sortDate: '2026-10-03', displayDate: '03 OCT 2026 — 07 FEB 2027', precision: 'scheduled', category: 'institutions',
    title: 'RM x SFMOMA opens a collection to the public',
    summary: 'One exhibition episode joins RM’s curatorial role, SFMOMA, works from his collection and the first identified artwork currently represented in the index.',
    relationIds: ['rm-sfmoma-exhibition', 'exhibition-sfmoma', 'rm-collection', 'rm-yun-work'], sourceIds: ['sfmoma-rm-exhibition'],
  },
  {
    id: 'event-indigo', sortDate: '2022-12-31', displayDate: '2022', precision: 'year', category: 'music',
    title: 'Indigo brings music and visual art onto one surface',
    summary: 'RM’s solo album enters the record together with its documented use of work by Yun Hyong-keun, making a visible bridge between two areas of the atlas.',
    relationIds: ['rm-indigo', 'yun-indigo-cover'], sourceIds: ['bighit-indigo', 'weverse-bibilly-hills'],
  },
  {
    id: 'event-that-summers-end', sortDate: '2022-06-30', displayDate: '2022 · PUBLIC RECORD', precision: 'approximate', category: 'literature',
    title: 'That Summer’s End appears among recently mentioned books',
    summary: 'The available source supports a recent mention, but not a recommendation and not a precise reading date.',
    relationIds: ['rm-that-summers-end'], sourceIds: ['weverse-bibilly-hills'],
  },
  {
    id: 'event-books-2021', sortDate: '2021-12-31', displayDate: '2021 · PUBLIC RECORD', precision: 'approximate', category: 'literature',
    title: 'Two books enter the public record',
    summary: 'The Midnight Library and Doing Good Better are documented as public appearances or mentions. The archive deliberately does not convert either appearance into endorsement.',
    relationIds: ['rm-midnight-library', 'rm-doing-good-better'], sourceIds: ['weverse-bibilly-hills'],
  },
  {
    id: 'event-art-and-landscape-2020', sortDate: '2020-12-31', displayDate: '2020', precision: 'year', category: 'visual-art',
    title: 'Yun Hyong-keun and Kang Yobae connect looking with reading',
    summary: 'Public engagement with Yun’s work sits beside documented reading of Kang Yobae’s writing on painting, history and the landscape of Jeju.',
    relationIds: ['rm-yun', 'rm-depth-landscape'], sourceIds: ['weverse-modern-art', 'weverse-bibilly-hills'],
  },
  {
    id: 'event-mono', sortDate: '2018-12-31', displayDate: '2018', precision: 'year', category: 'music',
    title: 'mono. enters RM’s solo discography',
    summary: 'The playlist-style release anchors the earliest dated connection currently represented in this version of the index.',
    relationIds: ['rm-mono'], sourceIds: ['bighit-mono'],
  },
];

export const entityById = new Map(entities.map((entity) => [entity.id, entity]));
export const sourceById = new Map(sources.map((source) => [source.id, source]));

export const getEntity = (id: string) => entityById.get(id);
export const getRelationsFor = (id: string) => relations.filter((relation) => relation.from === id || relation.to === id);
export const getSource = (id: string) => sourceById.get(id);
