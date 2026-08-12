import communityArchiveInventory from '../../research/community-archives.json';
import publicFindingInventory from '../../research/public-findings.json';
import type { CommunityArchive, Entity, Relation, ResearchFinding, Source, TimelineEvent } from './types';

export const communityArchives = communityArchiveInventory.archives as CommunityArchive[];
export const researchFindings = publicFindingInventory.findings as ResearchFinding[];

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
    id: 'artwork-kang-yobae-munnamu', slug: 'munnamu-kang-yobae', type: 'artwork', title: 'Munnamu',
    originalTitle: '먼나무', creator: 'Kang Yobae', year: 2020,
    description: 'A painting identified by Daegu Art Museum as the work shown in RM’s public verification photograph during Kang Yobae’s exhibition.',
    externalLinks: [{ label: 'Museum record', url: 'https://www.instagram.com/p/CWCNRdyvJDA/' }],
  },
  {
    id: 'exhibition-kang-yobae-carnation', slug: 'kang-yobae-carnation', type: 'exhibition',
    title: 'Kang Yobae: Carnation — When Mind Becomes Body', originalTitle: '강요배: 카네이션-마음이 몸이 될 때',
    creator: 'Daegu Art Museum', year: 2021,
    description: 'The 21st Lee In-sung Art Award exhibition, held at Daegu Art Museum from 13 October 2021 through 9 January 2022.',
    externalLinks: [
      { label: 'Exhibition record', url: 'https://www.artbava.com/exhibits/%EA%B0%95%EC%9A%94%EB%B0%B0-%EC%B9%B4%EC%9D%B4%EB%84%A4%EC%9D%B4%EC%85%98-%EB%A7%88%EC%9D%8C%EC%9D%B4-%EB%AA%B8%EC%9D%B4-%EB%90%A0-%EB%95%8C' },
      { label: 'Museum video', url: 'https://www.youtube.com/watch?v=qCG8cS9RW3E' },
    ],
  },
  {
    id: 'museum-daegu-art-museum', slug: 'daegu-art-museum', type: 'museum', title: 'Daegu Art Museum',
    originalTitle: '대구미술관', year: 2011,
    description: 'The municipal art museum that confirmed RM’s visit and identified Kang Yobae’s Munnamu in his public photograph.',
    externalLinks: [{ label: 'Museum website', url: 'https://daeguartmuseum.or.kr/' }],
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
    id: 'film-rm-rpwp', slug: 'rm-right-people-wrong-place', type: 'film', title: 'RM: Right People, Wrong Place',
    creator: 'Lee Seok-jun', year: 2024,
    description: 'A documentary following the making of Right Place, Wrong Person and the movement between RM’s public role and Kim Namjoon’s private creative process.',
    externalLinks: [{ label: 'Official release notice', url: 'https://weverse.io/bts/notice/23303' }],
  },
  {
    id: 'film-social-dilemma', slug: 'the-social-dilemma', type: 'film', title: 'The Social Dilemma',
    creator: 'Jeff Orlowski', year: 2020,
    description: 'A documentary-drama examining how platform design, recommendation systems and surveillance advertising shape attention and public life.',
    externalLinks: [{ label: 'Netflix title page', url: 'https://www.netflix.com/title/81254224' }],
  },
  {
    id: 'film-decision-to-leave', slug: 'decision-to-leave', type: 'film', title: 'Decision to Leave',
    originalTitle: '헤어질 결심', creator: 'Park Chan-wook', year: 2022,
    description: 'A romantic mystery in which an investigation, translation and mediated images continually rearrange what its two central figures can know about each other.',
    externalLinks: [{ label: 'CJ ENM film page', url: 'https://www.cjenm.com/en/featured-contents/decision-to-leave/' }],
  },
  {
    id: 'film-the-fortress', slug: 'the-fortress-2017', type: 'film', title: 'The Fortress',
    originalTitle: '남한산성', creator: 'Hwang Dong-hyuk', year: 2017,
    description: 'A historical drama about rival strategies of resistance and survival during the Qing invasion of Joseon in 1636.',
  },
  {
    id: 'film-eternal-sunshine', slug: 'eternal-sunshine-of-the-spotless-mind', type: 'film', title: 'Eternal Sunshine of the Spotless Mind',
    creator: 'Michel Gondry', year: 2004,
    description: 'A nonlinear romance about memory, erasure and the impossible wish to separate love from the pain it leaves behind.',
  },
  {
    id: 'series-sweet-home', slug: 'sweet-home', type: 'series', title: 'Sweet Home',
    originalTitle: '스위트홈', creator: 'Lee Eung-bok', year: 2020,
    description: 'A survival-horror series that turns private desire and social isolation into literal monsters inside an apartment block.',
    externalLinks: [{ label: 'Netflix title page', url: 'https://www.netflix.com/title/81061734' }],
  },
  {
    id: 'series-you-and-everything-else', slug: 'you-and-everything-else', type: 'series', title: 'You and Everything Else',
    originalTitle: '은중과 상연', creator: 'Jo Young-min', year: 2025,
    description: 'A limited series about two women whose friendship stretches across admiration, envy, estrangement and an end-of-life request.',
    externalLinks: [{ label: 'Netflix title page', url: 'https://www.netflix.com/title/81739037' }],
  },
  {
    id: 'film-the-world-of-love', slug: 'the-world-of-love', type: 'film', title: 'The World of Love',
    originalTitle: '세계의 주인', creator: 'Yoon Ga-eun', year: 2025,
    description: 'A coming-of-age drama that observes the difficult social world of adolescence from a young person’s point of view.',
  },
  {
    id: 'indigo', slug: 'indigo', type: 'album', title: 'Indigo', year: 2022,
    description: 'RM’s solo album, documented in the official BIGHIT MUSIC discography.',
    image: {
      url: '/images/music/indigo.jpg', alt: 'Cover of Indigo by RM',
      credit: 'Album cover: BIGHIT MUSIC; image via Apple Music', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://music.apple.com/us/album/indigo/1654548355',
    },
    externalLinks: [{ label: 'Official album page', url: 'https://bts.ibighit.com/eng/discography/rm/detail/indigo/' }],
  },
  {
    id: 'mono', slug: 'mono', type: 'album', title: 'mono.', year: 2018,
    description: 'RM’s playlist-style release, documented in the official BIGHIT MUSIC discography.',
    image: {
      url: '/images/music/mono.png', alt: 'Cover of mono. by RM',
      credit: 'Album cover: BIGHIT MUSIC', license: 'Low-resolution editorial reproduction', sourceUrl: 'https://bts.ibighit.com/eng/discography/rm/detail/mono/',
    },
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
  {
    id: 'daegu-museum-rm-kang', title: 'RM visit and Kang Yobae work', publisher: 'Daegu Art Museum',
    url: 'https://www.instagram.com/p/CWCNRdyvJDA/', publishedAt: '2021-11-08', accessedAt: '2026-08-10', sourceType: 'museum',
  },
  {
    id: 'artbava-kang-carnation', title: 'Kang Yobae: Carnation — When Mind Becomes Body', publisher: 'ARTBAVA',
    url: 'https://www.artbava.com/exhibits/%EA%B0%95%EC%9A%94%EB%B0%B0-%EC%B9%B4%EC%9D%B4%EB%84%A4%EC%9D%B4%EC%85%98-%EB%A7%88%EC%9D%8C%EC%9D%B4-%EB%AA%B8%EC%9D%B4-%EB%90%A0-%EB%95%8C', accessedAt: '2026-08-10', sourceType: 'secondary',
  },
  {
    id: 'daegu-museum-kang-video', title: 'Kang Yobae: Carnation — When Mind Becomes Body', publisher: 'Daegu Art Museum / YouTube',
    url: 'https://www.youtube.com/watch?v=qCG8cS9RW3E', accessedAt: '2026-08-10', sourceType: 'museum',
  },
  {
    id: 'fan-namjoons-booklist', title: 'Namjoon’s Booklist', publisher: 'Namjoon’s Booklist',
    url: 'https://namjoonsbooklist.com/', accessedAt: '2026-08-10', sourceType: 'fan_archive',
  },
  {
    id: 'fan-rkive-read-with-bts', title: 'read with bts rkive', publisher: 'to live, to love',
    url: 'https://rkivelibrary.wordpress.com/2023/01/25/read-with-bts-rkive/', publishedAt: '2023-01-25', accessedAt: '2026-08-10', sourceType: 'fan_archive',
  },
  {
    id: 'institution-vpl-bookshelf', title: 'Namjoon’s Bookshelf', publisher: 'Vancouver Public Library',
    url: 'https://vpl.bibliocommons.com/v2/list/display/1338249780/1429564517', accessedAt: '2026-08-10', sourceType: 'institutional',
  },
  {
    id: 'weverse-in-the-soop2-guide', title: 'In the SOOP BTS ver. Season 2 global paid content user guide', publisher: 'Weverse',
    url: 'https://weverse.io/bts/notice/1720', publishedAt: '2021-09-23', accessedAt: '2026-08-10', sourceType: 'official_media',
  },
  {
    id: 'publisher-hanbooks-depth', title: 'The Depth of the Landscape', publisher: 'HanBooks',
    url: 'https://www.hanbooks.com/deofla.html', accessedAt: '2026-08-10', sourceType: 'institutional',
  },
  {
    id: 'publisher-penguin-honeybees', title: 'Honeybees and Distant Thunder sample and edition record', publisher: 'Penguin Random House UK',
    url: 'https://cdn.penguin.co.uk/dam-assets/books/9780857527950/9780857527950-sample.pdf', accessedAt: '2026-08-10', sourceType: 'institutional',
  },
  {
    id: 'hankyung-summers-end', title: 'The book BTS RM reads at the end of summer', publisher: 'The Korea Economic Daily',
    url: 'https://www.hankyung.com/article/202209227766i', publishedAt: '2022-09-22', accessedAt: '2026-08-10', sourceType: 'secondary',
  },
  {
    id: 'publisher-thames-saul-leiter', title: 'All About Saul Leiter', publisher: 'Thames & Hudson',
    url: 'https://www.thamesandhudson.com/products/all-about-saul-leiter', accessedAt: '2026-08-10', sourceType: 'institutional',
  },
  {
    id: 'publisher-prh-midnight-library', title: 'The Midnight Library', publisher: 'Penguin Random House',
    url: 'https://www.penguinrandomhouse.com/books/575653/the-midnight-library-by-matt-haig/', accessedAt: '2026-08-10', sourceType: 'institutional',
  },
  {
    id: 'publisher-prh-doing-good', title: 'Doing Good Better', publisher: 'Penguin Random House',
    url: 'https://www.penguinrandomhouse.com/books/316786/doing-good-better-by-william-macaskill/', accessedAt: '2026-08-10', sourceType: 'institutional',
  },
  {
    id: 'reddit-its2-ep3', title: 'In the SOOP BTS ver. Season 2 — Episode 3 discussion', publisher: 'r/bangtan',
    url: 'https://www.reddit.com/r/bangtan/comments/qic9ls', publishedAt: '2021-10-29', accessedAt: '2026-08-10', sourceType: 'fan_archive',
  },
  {
    id: 'reddit-its2-ep4', title: 'In the SOOP BTS ver. Season 2 — Episode 4 discussion', publisher: 'r/bangtan',
    url: 'https://www.reddit.com/r/bangtan/comments/qnama0', publishedAt: '2021-11-05', accessedAt: '2026-08-10', sourceType: 'fan_archive',
  },
  {
    id: 'reddit-its2-ep5', title: 'In the SOOP BTS ver. Season 2 — Episode 5 discussion', publisher: 'r/bangtan',
    url: 'https://www.reddit.com/r/bangtan/comments/qsanxa', publishedAt: '2021-11-12', accessedAt: '2026-08-10', sourceType: 'fan_archive',
  },
  {
    id: 'elcomercio-its2-ep3', title: 'What book did SUGA read and why did ARMY react?', publisher: 'El Comercio',
    url: 'https://elcomercio.pe/luces/musica/bts-que-libro-leyo-suga-y-por-que-army-se-emociono-al-conocer-el-titulo-suga-rapero-k-pop-grupo-musical-idol-tdex-noticia/', publishedAt: '2021-11-24', accessedAt: '2026-08-10', sourceType: 'secondary',
  },
  {
    id: 'buro-midnight-library', title: 'Read like BTS’ RM: seven books connected to Kim Namjoon', publisher: 'BURO.',
    url: 'https://www.buro247.my/culture/read-like-bts-rm-book-recommendations-namjoon.html', accessedAt: '2026-08-10', sourceType: 'secondary',
  },
  {
    id: 'gq-midnight-library', title: 'GQ Reads: five books connected to RM', publisher: 'GQ India',
    url: 'https://www.gqindia.com/content/gq-reads-5-books-recommended-by-rm-that-flaunt-the-bts-leaders-lyrical-prowess', accessedAt: '2026-08-10', sourceType: 'secondary',
  },
  {
    id: 'ameblo-midnight-highlight', title: 'In the SOOP 2: RM and The Midnight Library highlighted passage', publisher: 'Ameblo / moon-jin1992',
    url: 'https://ameblo.jp/moon-jin1992/entry-12710503871.html', accessedAt: '2026-08-10', sourceType: 'fan_archive',
  },
  {
    id: 'bts-twitter-green', title: 'Green: RM photo set with books and art', publisher: 'BTS official account / X',
    url: 'https://x.com/BTS_twt/status/1445397240118382592', publishedAt: '2021-10-05', accessedAt: '2026-08-10', sourceType: 'social_post',
  },
  {
    id: 'reddit-rm-bookshelf', title: '211005 RM', publisher: 'r/bangtan',
    url: 'https://www.reddit.com/r/bangtan/comments/q1xo77', publishedAt: '2021-10-05', accessedAt: '2026-08-10', sourceType: 'fan_archive',
  },
  {
    id: 'weverse-rm-20201004', title: 'RM book, documentary and song post', publisher: 'Weverse',
    url: 'https://weverse.io/bts/artist/1640184234924405', publishedAt: '2020-10-04', accessedAt: '2026-08-10', sourceType: 'social_post',
  },
  {
    id: 'koreaboo-rm-recs', title: 'RM’s latest book, film and song recommendations', publisher: 'Koreaboo',
    url: 'https://www.koreaboo.com/news/bts-rm-latest-book-film-song-recommendations/', publishedAt: '2020-10-03', accessedAt: '2026-08-11', sourceType: 'secondary',
  },
  {
    id: 'reddit-weekly-20201004', title: 'Weekly Round-Up: September 28–October 4', publisher: 'r/bangtan',
    url: 'https://www.reddit.com/r/bangtan/comments/j5032t', publishedAt: '2020-10-04', accessedAt: '2026-08-10', sourceType: 'fan_archive',
  },
  {
    id: 'weverse-rpwp-film', title: 'RM: Right People, Wrong Place release information', publisher: 'Weverse',
    url: 'https://weverse.io/bts/notice/23303', publishedAt: '2024-10-30', accessedAt: '2026-08-11', sourceType: 'official_media',
  },
  {
    id: 'netflix-bts-watchlist', title: 'BTS’s favourite series to watch on Netflix', publisher: 'Netflix Tudum',
    url: 'https://www.netflix.com/tudum/articles/bts-watch-list', publishedAt: '2026-03-27', accessedAt: '2026-08-11', sourceType: 'official_media',
  },
  {
    id: 'soompi-rm-films-books', title: 'RM talks about films and books with fans', publisher: 'Soompi',
    url: 'https://www.soompi.com/article/1074523wpp/btss-rm-talks-films-books-fans', publishedAt: '2017-11-10', accessedAt: '2026-08-11', sourceType: 'secondary',
  },
  {
    id: 'archive-decision-to-leave', title: 'Finally, Park Chan-wook — interview with RM', publisher: 'BTS Interview Archive',
    url: 'https://btsinterviews.wordpress.com/2023/02/22/01-23-finally-park-chanwook-with-namjoon/', publishedAt: '2023-02-22', accessedAt: '2026-08-11', sourceType: 'fan_archive',
  },
  {
    id: 'republica-rm-sweet-home', title: 'RM explains why he liked Sweet Home', publisher: 'La República',
    url: 'https://larepublica.pe/cultura-asiatica/2021/01/19/bts-namjoon-revela-por-que-le-gusta-sweet-home-de-song-kang-en-netflix', publishedAt: '2021-01-19', accessedAt: '2026-08-11', sourceType: 'secondary',
  },
  {
    id: 'recreio-rm-films', title: 'Ten films connected to RM', publisher: 'Recreio',
    url: 'https://recreio.com.br/noticias/entretenimento/10-filmes-recomendados-por-rm-do-bts.phtml', publishedAt: '2024-12-08', accessedAt: '2026-08-11', sourceType: 'secondary',
  },
  {
    id: 'recreio-world-of-love', title: 'RM names a favourite film', publisher: 'Recreio',
    url: 'https://recreio.com.br/noticias/entretenimento/qual-e-o-filme-favorito-do-rm-descubra-o-titulo-recomendado-pelo-lider-do-bts.phtml', publishedAt: '2026-06-01', accessedAt: '2026-08-11', sourceType: 'secondary',
  },
];

export const relations: Relation[] = [
  { id: 'rm-yun', from: 'rm', to: 'yun-hyong-keun', type: 'admired', date: '2020', note: 'Weverse describes RM as deeply engaged with Yun Hyong-keun’s work and notes that he visited exhibitions in Venice, New York and Seoul.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-kim', from: 'rm', to: 'kim-whanki', type: 'mentioned', note: 'RM was photographed with Kim Whanki’s The Eternal Song at an exhibition; the source supports the encounter, not ownership.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-lee', from: 'rm', to: 'lee-ungno', type: 'mentioned', note: 'Weverse records RM’s social post about Lee Ungno’s Bamboo and his visit to the National Museum of Modern and Contemporary Art exhibition.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-kwon', from: 'rm', to: 'kwon-dae-sup', type: 'admired', note: 'The source describes RM posting a photograph with a Kwon Dae-sup moon jar and expressing admiration for the artist’s work.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-joung', from: 'rm', to: 'joung-young-ju', type: 'admired', note: 'Joung Young-ju is included among the Korean artists discussed through RM’s public interests in the official Weverse feature.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-kang', from: 'rm', to: 'kang-yobae', type: 'mentioned', note: 'Weverse identifies Kang Yobae’s art essay as a book RM introduced as something he was recently immersed in.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-depth-landscape', from: 'rm', to: 'book-depth-of-the-landscape', type: 'read', date: '2020', note: 'Weverse Magazine states that RM had been reading Kang Yobae’s collection of art and personal writing.', evidenceLevel: 'confirmed', evidenceOrigin: 'official_summary', sourceIds: ['weverse-modern-art', 'weverse-bibilly-hills'], discoveryCredits: [{ sourceId: 'fan-namjoons-booklist', role: 'indexed', note: 'This community bibliography helped surface the title and preserve a route back to public references.' }] },
  { id: 'depth-landscape-kang', from: 'book-depth-of-the-landscape', to: 'kang-yobae', type: 'created_by', note: 'The volume brings together Kang Yobae’s own writing, paintings and reflections, creating a documented bridge between literature and visual art.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-honeybees', from: 'rm', to: 'book-honeybees-distant-thunder', type: 'mentioned', note: 'Weverse Magazine includes Mitsubachi to Enrai among books RM had recently mentioned. The source does not establish a direct recommendation.', evidenceLevel: 'mentioned', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-that-summers-end', from: 'rm', to: 'book-that-summers-end', type: 'mentioned', date: '2022', note: 'Weverse Magazine includes End of the Summer among books RM had recently mentioned. The archive uses the collection’s English title, That Summer’s End.', evidenceLevel: 'mentioned', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-all-about-saul-leiter', from: 'rm', to: 'book-all-about-saul-leiter', type: 'mentioned', note: 'Weverse Magazine includes All About Saul Leiter among books RM had recently mentioned.', evidenceLevel: 'mentioned', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-midnight-library', from: 'rm', to: 'book-midnight-library', type: 'mentioned', date: '2021', note: 'Weverse Magazine includes The Midnight Library among books RM had recently mentioned. Independent research into the exact In the SOOP 2 scene remains outside this public claim.', evidenceLevel: 'mentioned', evidenceOrigin: 'official_summary', sourceIds: ['weverse-bibilly-hills'], discoveryCredits: [{ sourceId: 'fan-rkive-read-with-bts', role: 'identified', locator: 'In the SOOP 2 table: episode 1 TBR mention; episode 3 reading', note: 'This fan archive mapped the episode sequence behind a stronger reading lead. The public claim remains the narrower official mention until a primary timestamp is checked.' }] },
  { id: 'rm-doing-good-better', from: 'rm', to: 'book-doing-good-better', type: 'mentioned', date: '2021', note: 'Weverse Magazine includes Doing Good Better among books RM had recently mentioned. A bookshelf identification exists in research, but no reading or recommendation claim is made here.', evidenceLevel: 'mentioned', evidenceOrigin: 'official_summary', sourceIds: ['weverse-bibilly-hills'], discoveryCredits: [{ sourceId: 'institution-vpl-bookshelf', role: 'identified', locator: 'Doing Good Better entry', note: 'Vancouver Public Library identified the book in RM’s official 2021 bookshelf photograph. That dated visual identification remains a separate research finding pending an independent edition match.' }] },
  { id: 'rm-yun-work', from: 'rm', to: 'untitled-1973-yun', type: 'collected', date: '2026', note: 'SFMOMA lists this work as part of the collection of RM.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'yun-work-artist', from: 'untitled-1973-yun', to: 'yun-hyong-keun', type: 'created_by', note: 'The artwork is attributed to Yun Hyong-keun by SFMOMA.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-eternal-song', from: 'rm', to: 'the-eternal-song', type: 'mentioned', note: 'RM was photographed with the work at a museum exhibition; this does not establish ownership.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'eternal-kim', from: 'the-eternal-song', to: 'kim-whanki', type: 'created_by', note: 'The work is identified as Kim Whanki’s The Eternal Song.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'eternal-sema', from: 'the-eternal-song', to: 'seoul-museum-of-art', type: 'shown_at', note: 'The work was encountered at an exhibition at Seoul Museum of Art’s Buk-Seoul Museum of Art.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-bamboo', from: 'rm', to: 'bamboo-lee-ungno', type: 'mentioned', note: 'The work appeared in RM’s public post and is discussed in the official feature.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'bamboo-lee', from: 'bamboo-lee-ungno', to: 'lee-ungno', type: 'created_by', note: 'The work is identified as Lee Ungno’s Bamboo.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-moon-jar', from: 'rm', to: 'moon-jar-kwon', type: 'mentioned', note: 'RM was photographed with a Kwon Dae-sup moon jar; the source does not confirm that this particular work belongs to him.', evidenceLevel: 'mentioned', sourceIds: ['weverse-modern-art'] },
  { id: 'moon-jar-artist', from: 'moon-jar-kwon', to: 'kwon-dae-sup', type: 'created_by', note: 'The work is presented as a Kwon Dae-sup moon jar.', evidenceLevel: 'confirmed', sourceIds: ['weverse-modern-art'] },
  { id: 'rm-daegu-art-museum', from: 'rm', to: 'museum-daegu-art-museum', type: 'visited', date: '2021', note: 'Daegu Art Museum states that RM visited its exhibitions. The museum post is dated 8 November; the exact visit date is not stated.', evidenceLevel: 'confirmed', evidenceOrigin: 'official_summary', sourceIds: ['daegu-museum-rm-kang'] },
  { id: 'rm-kang-carnation', from: 'rm', to: 'exhibition-kang-yobae-carnation', type: 'visited', date: '2021', note: 'Daegu Art Museum connects RM’s visit and photograph to Kang Yobae’s active solo exhibition.', evidenceLevel: 'confirmed', evidenceOrigin: 'official_summary', sourceIds: ['daegu-museum-rm-kang', 'artbava-kang-carnation'] },
  { id: 'rm-munnamu', from: 'rm', to: 'artwork-kang-yobae-munnamu', type: 'mentioned', date: '2021', note: 'Daegu Art Museum identifies Munnamu (2020) as the work in RM’s public verification photograph. Visibility supports an encounter, not ownership.', evidenceLevel: 'mentioned', evidenceOrigin: 'official_summary', sourceIds: ['daegu-museum-rm-kang'] },
  { id: 'munnamu-kang', from: 'artwork-kang-yobae-munnamu', to: 'kang-yobae', type: 'created_by', note: 'Daegu Art Museum credits Munnamu to Kang Yobae and supplies the title and year.', evidenceLevel: 'confirmed', evidenceOrigin: 'official_summary', sourceIds: ['daegu-museum-rm-kang'] },
  { id: 'kang-carnation-daegu', from: 'exhibition-kang-yobae-carnation', to: 'museum-daegu-art-museum', type: 'held_at', date: '2021', note: 'The exhibition record and museum video document Kang Yobae’s exhibition at Daegu Art Museum.', evidenceLevel: 'confirmed', evidenceOrigin: 'official_summary', sourceIds: ['artbava-kang-carnation', 'daegu-museum-kang-video'] },
  { id: 'munnamu-kang-carnation', from: 'artwork-kang-yobae-munnamu', to: 'exhibition-kang-yobae-carnation', type: 'shown_at', date: '2021', note: 'The museum identifies the work within RM’s visit context while the Kang Yobae exhibition was active.', evidenceLevel: 'confirmed', evidenceOrigin: 'official_summary', sourceIds: ['daegu-museum-rm-kang', 'artbava-kang-carnation'] },
  { id: 'rm-sfmoma-exhibition', from: 'rm', to: 'rm-x-sfmoma', type: 'collaborated_with', date: '2026', note: 'SFMOMA states that the exhibition is curated by RM with SFMOMA curators.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'exhibition-sfmoma', from: 'rm-x-sfmoma', to: 'sfmoma', type: 'held_at', date: '2026', note: 'SFMOMA is the presenting museum for the exhibition.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-collection', from: 'rm', to: 'sfmoma', type: 'collected', date: '2026', note: 'SFMOMA explicitly describes the exhibition as featuring artworks from RM’s personal collection.', evidenceLevel: 'confirmed', sourceIds: ['sfmoma-rm-exhibition'] },
  { id: 'rm-indigo', from: 'rm', to: 'indigo', type: 'created_by', date: '2022', note: 'Indigo appears in RM’s official BIGHIT MUSIC discography.', evidenceLevel: 'confirmed', sourceIds: ['bighit-indigo'] },
  { id: 'yun-indigo-cover', from: 'yun-hyong-keun', to: 'indigo', type: 'featured_in', date: '2022', note: 'Weverse Magazine states that Indigo features work by Yun Hyong-keun on its cover, connecting RM’s music and visual-art interests.', evidenceLevel: 'confirmed', sourceIds: ['weverse-bibilly-hills'] },
  { id: 'rm-mono', from: 'rm', to: 'mono', type: 'created_by', date: '2018', note: 'mono. appears in RM’s official BIGHIT MUSIC discography.', evidenceLevel: 'confirmed', sourceIds: ['bighit-mono'] },
  { id: 'rm-rpwp-film', from: 'rm', to: 'film-rm-rpwp', type: 'featured_in', date: '2024', note: 'The official release notice identifies this as RM’s documentary and describes its focus on the creation of Right Place, Wrong Person.', evidenceLevel: 'confirmed', evidenceOrigin: 'official_summary', sourceIds: ['weverse-rpwp-film'] },
  { id: 'rm-social-dilemma', from: 'rm', to: 'film-social-dilemma', type: 'mentioned', date: '2020', note: 'A contemporaneous report reproduces RM’s Weverse post and identifies The Social Dilemma as the documentary he recommended. The archived primary URL is retained, but its wording is not currently accessible without sign-in.', evidenceLevel: 'mentioned', evidenceOrigin: 'public_observation', sourceIds: ['weverse-rm-20201004', 'koreaboo-rm-recs'] },
  { id: 'rm-decision-to-leave', from: 'rm', to: 'film-decision-to-leave', type: 'watched', date: '2023', note: 'A translated archive of RM’s published conversation with Park Chan-wook records that Decision to Leave was the only film he had watched more than four times.', evidenceLevel: 'mentioned', evidenceOrigin: 'direct_statement', sourceIds: ['archive-decision-to-leave'] },
  { id: 'rm-the-fortress', from: 'rm', to: 'film-the-fortress', type: 'watched', date: '2017', note: 'A contemporaneous recap of RM’s V Live says he had recently watched The Fortress and discussed the historical conflict at its centre.', evidenceLevel: 'mentioned', evidenceOrigin: 'official_summary', sourceIds: ['soompi-rm-films-books'] },
  { id: 'rm-eternal-sunshine', from: 'rm', to: 'film-eternal-sunshine', type: 'mentioned', note: 'Later screen watchlist compilations repeatedly connect the film to RM; the index keeps the relationship at mentioned until the original broadcast or post is located.', evidenceLevel: 'mentioned', evidenceOrigin: 'community_identification', sourceIds: ['recreio-rm-films'] },
  { id: 'rm-sweet-home', from: 'rm', to: 'series-sweet-home', type: 'watched', date: '2021', note: 'A report on RM’s live conversation records that he watched Sweet Home and discussed enjoying the series. The original broadcast locator remains to be added.', evidenceLevel: 'mentioned', evidenceOrigin: 'official_summary', sourceIds: ['republica-rm-sweet-home'] },
  { id: 'rm-you-and-everything-else', from: 'rm', to: 'series-you-and-everything-else', type: 'recommended', date: '2026', note: 'Netflix’s own BTS watchlist identifies You and Everything Else as recommended by RM.', evidenceLevel: 'confirmed', evidenceOrigin: 'official_summary', sourceIds: ['netflix-bts-watchlist'] },
  { id: 'rm-world-of-love', from: 'rm', to: 'film-the-world-of-love', type: 'mentioned', date: '2026', note: 'A recent report attributes a favourite-film statement to RM. Until the underlying fan conversation receives a precise locator, the index publishes only the narrower mentioned relationship.', evidenceLevel: 'mentioned', evidenceOrigin: 'public_observation', sourceIds: ['recreio-world-of-love'] },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-screen-2026', sortDate: '2026-06-01', displayDate: '2026 · PUBLIC RECORD', precision: 'approximate', category: 'screen',
    title: 'Two new screen choices enter the record',
    summary: 'Netflix directly identifies You and Everything Else as RM’s recommendation. A separate report connects him to The World of Love, but the latter stays at mentioned until its original conversation has a precise locator.',
    relationIds: ['rm-you-and-everything-else', 'rm-world-of-love'], sourceIds: ['netflix-bts-watchlist', 'recreio-world-of-love'],
  },
  {
    id: 'event-rm-x-sfmoma', sortDate: '2026-10-03', displayDate: '03 OCT 2026 — 07 FEB 2027', precision: 'scheduled', category: 'institutions',
    title: 'RM x SFMOMA opens a collection to the public',
    summary: 'One exhibition episode joins RM’s curatorial role, SFMOMA, works from his collection and the first identified artwork currently represented in the index.',
    relationIds: ['rm-sfmoma-exhibition', 'exhibition-sfmoma', 'rm-collection', 'rm-yun-work'], sourceIds: ['sfmoma-rm-exhibition'],
  },
  {
    id: 'event-rpwp-film', sortDate: '2024-12-05', displayDate: '05 DEC 2024', precision: 'exact', category: 'screen',
    title: 'Right People, Wrong Place moves from album process to cinema',
    summary: 'The official documentary release creates a screen record centred on RM’s own creative process and premiered after its selection for the Busan International Film Festival.',
    relationIds: ['rm-rpwp-film'], sourceIds: ['weverse-rpwp-film'],
  },
  {
    id: 'event-decision-to-leave', sortDate: '2023-02-22', displayDate: '2023 · PUBLISHED CONVERSATION', precision: 'year', category: 'screen',
    title: 'Decision to Leave becomes a repeated viewing',
    summary: 'A translated archive of RM’s conversation with Park Chan-wook records an unusually sustained return to the film. The index preserves the direct-statement origin while identifying the available source as an archive.',
    relationIds: ['rm-decision-to-leave'], sourceIds: ['archive-decision-to-leave'],
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
    id: 'event-daegu-kang-yobae', sortDate: '2021-11-08', displayDate: 'NOV 2021 · MUSEUM RECORD', precision: 'approximate', category: 'institutions',
    title: 'A museum visit connects Kang Yobae’s writing to an exhibited work',
    summary: 'Daegu Art Museum confirmed RM’s visit and identified Munnamu in his public photograph, completing a documented route from The Depth of the Landscape to Kang Yobae’s exhibition practice.',
    relationIds: ['rm-daegu-art-museum', 'rm-kang-carnation', 'rm-munnamu', 'kang-carnation-daegu', 'munnamu-kang-carnation'], sourceIds: ['daegu-museum-rm-kang', 'artbava-kang-carnation', 'daegu-museum-kang-video'],
  },
  {
    id: 'event-sweet-home', sortDate: '2021-01-19', displayDate: 'JAN 2021 · LIVE RECAP', precision: 'approximate', category: 'screen',
    title: 'Sweet Home appears in a live-viewing conversation',
    summary: 'A contemporaneous report records RM discussing the series after watching it. The exact broadcast timestamp remains a research locator, so the connection stays at mentioned strength.',
    relationIds: ['rm-sweet-home'], sourceIds: ['republica-rm-sweet-home'],
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
    id: 'event-social-dilemma', sortDate: '2020-10-04', displayDate: '04 OCT 2020 · WEVERSE POST', precision: 'exact', category: 'screen',
    title: 'The Social Dilemma joins a book, film and song recommendation post',
    summary: 'The archived primary URL and a contemporaneous illustrated report converge on the documentary. Because the legacy post currently requires sign-in, the public graph retains the narrower mentioned label.',
    relationIds: ['rm-social-dilemma'], sourceIds: ['weverse-rm-20201004', 'koreaboo-rm-recs'],
  },
  {
    id: 'event-mono', sortDate: '2018-12-31', displayDate: '2018', precision: 'year', category: 'music',
    title: 'mono. enters RM’s solo discography',
    summary: 'The playlist-style release anchors the earliest dated connection currently represented in this version of the index.',
    relationIds: ['rm-mono'], sourceIds: ['bighit-mono'],
  },
  {
    id: 'event-the-fortress', sortDate: '2017-11-10', displayDate: 'NOV 2017 · LIVE RECAP', precision: 'approximate', category: 'screen',
    title: 'The Fortress anchors the earliest screen conversation',
    summary: 'A contemporaneous report on RM’s broadcast records a recent viewing and his discussion of the historical conflict dramatised by the film.',
    relationIds: ['rm-the-fortress'], sourceIds: ['soompi-rm-films-books'],
  },
];

export const entityById = new Map(entities.map((entity) => [entity.id, entity]));
export const sourceById = new Map(sources.map((source) => [source.id, source]));

export const getEntity = (id: string) => entityById.get(id);
export const getRelationsFor = (id: string) => relations.filter((relation) => relation.from === id || relation.to === id);
export const getSource = (id: string) => sourceById.get(id);
