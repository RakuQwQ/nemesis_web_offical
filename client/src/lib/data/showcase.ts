
import type { ShowcaseItem, ShowcaseCategory } from './types';

export const showcaseItems: ShowcaseItem[] = [
  /*{
    id: 1,
    title: 'Undertale 出生點',
    author: 'YYK',
    coAuthor: 'Elise Raku Cardat',
    category: 'map',
    imageUrls: [
      '/img/undertale_spawn/1.png', 
      "/img/undertale_spawn/2.png"
    ],
    description: '遊戲 Undertale 的出生點及委託地圖，遊玩光影。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  }*/
  { 
    id: 1, 
    title: 'Undertale 出生點', 
    author: 'Raku_VTuber', 
    category: 'map', 
    imageUrls: ['/img/undertale_spawn/1.png'], 
    description: '遊戲 Undertale 的出生點及委託地圖，遊玩光影。', 
    date: '2025-08-01', 
    tags: ['建築', '光影', '地圖'], 
    aspect: 'landscape' 
  },
  { 
    id: 2, 
    title: 'Hikari', 
    author: 'YYK_Video', 
    coAuthor: 'Elise, Raku_VTuber, Cardat',
    category: 'map', 
    imageUrls: [
      '/img/hikari/1.png', 
      "/img/hikari/2.png",
      "/img/hikari/3.png",
      "/img/hikari/4.png",
      "/img/hikari/5.png"
    ],
    description: '委託地圖，遊玩光影。', 
    date: '2025-06-15', 
    tags: ['建築', '光影', '地圖'], 
    aspect: 'landscape' 
  },
  { 
    id: 3, 
    title: '抑鬱辦公室', 
    author: 'Raku_VTuber', 
    category: 'map', 
    imageUrls: ['/img/depressed_office/1.png', '/img/depressed_office/2.png'], 
    description: '小品建築。', 
    date: '2026-02-10', 
    tags: ['建築', '光影', '地圖', '城市', '截圖'], 
    aspect: 'landscape' 
  },
  { 
    id: 4, 
    title: '活動小鎮（名字暫定）', 
    author: 'YYK_Video', 
    category: 'map', 
    imageUrls: ['/img/event_town/1.png', '/img/event_town/2.png'], 
    description: '活動地圖。', 
    date: '2025-09-17', 
    tags: ['建築', '光影', '地圖'], 
    aspect: 'landscape' 
  },
  { 
    id: 5, 
    title: 'Meki', 
    author: 'YYK_Video', 
    coAuthor: 'Elise, Raku_VTuber, Cardat',
    category: 'map', 
    imageUrls: [
      '/img/meki/1.png', 
      "/img/meki/2.png",
      "/img/meki/3.png",
      "/img/meki/4.png",
      "/img/meki/5.png",
      "/img/meki/6.png",
      "/img/meki/7.png"
    ],
    description: '委託地圖，廢棄城堡。', 
    date: '2025-12-01', 
    tags: ['建築', '光影', '地圖'], 
    aspect: 'landscape' 
  },
  { 
    id: 6, 
    title: '玩家人頭', 
    author: 'YYK_Video', 
    category: 'map', 
    imageUrls: [
      '/img/player_head/1.png', 
      "/img/player_head/2.png",
      "/img/player_head/3.png",
      "/img/player_head/4.png",
      "/img/player_head/5.png"
    ],
    description: '玩家頭顱建築。', 
    date: '2026-01-20', 
    tags: ['建築', '光影', '地圖'], 
    aspect: 'square' 
  },
  {
    id: 7,
    title: '城大反枱現場',
    author: 'Raku_VTuber',
    category: 'map',
    imageUrls: [
      '/img/cityu/1.png'
    ],
    description: '全部同我企起身。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 8,
    title: 'NEMI 聯盟會議場地',
    author: 'Raku_VTuber',
    category: 'map',
    imageUrls: [
      '/img/nemi_alliance_meeting_Venue/1.png', 
      '/img/nemi_alliance_meeting_Venue/2.png',
      '/img/nemi_alliance_meeting_Venue/3.png',
      '/img/nemi_alliance_meeting_Venue/4.png'
    ],
    description: 'NEMI 會議地圖 。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 9,
    title: 'NEMI 法庭',
    author: 'Raku_VTuber',
    category: 'map',
    imageUrls: [
      '/img/nemi_court/1.png'
    ],
    description: 'NEMI 法庭地圖 。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 10,
    title: 'KAMINO',
    author: 'YYK_Video',
    coAuthor: 'Elise',
    category: 'map',
    imageUrls: [
      '/img/kamino/1.png', 
      '/img/kamino/2.png'
    ],
    description: '委託建築，日式建築。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 11,
    title: 'Elmo 像',
    author: 'YYK_Video',
    category: 'map',
    imageUrls: [
      '/img/elmo/1.png'
    ],
    description: 'Elmo 像。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 12,
    title: '恐怖校園',
    author: 'Raku_VTuber',
    category: 'map',
    imageUrls: [
      '/img/scary_school/1.png',
      '/img/scary_school/2.png',
      '/img/scary_school/3.png'
    ],
    description: '拍攝恐怖片用。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 13,
    title: '畫廊',
    author: 'Raku_VTuber',
    category: 'map',
    imageUrls: [
      '/img/gallery/1.png'
    ],
    description: '畫廊。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 14,
    title: '酒館',
    author: 'YYK_Video, eliseqwq',
    coAuthor: 'Raku_VTuber',
    category: 'map',
    imageUrls: [
      '/img/tavern/1.png',
      '/img/tavern/2.png',
      '/img/tavern/3.png',
      '/img/tavern/4.png'
    ],
    description: ' 地下酒館。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 15,
    title: '小鎮',
    author: 'YYK_Video, Raku_VTuber, eliseqwq',
    category: 'map',
    imageUrls: [
      '/img/town/1.png',
      '/img/town/2.png',
      '/img/town/3.png',
      '/img/town/4.png',
      '/img/town/5.png'
    ],
    description: '中世紀 x STEAMPUNK。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 16,
    title: '豪華酒館',
    author: 'Raku_VTuber',
    category: 'map',
    imageUrls: [
      '/img/luxury_tavern/1.png',
      '/img/luxury_tavern/2.png',
      '/img/luxury_tavern/3.png',
      '/img/luxury_tavern/4.png',
      '/img/luxury_tavern/5.png'
    ],
    description: '豪華酒館。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  },
  {
    id: 17,
    title: '聖誕裝飾',
    author: 'Raku_VTuber',
    category: 'map',
    imageUrls: [
      '/img/christmas_decorations/1.png'
    ],
    description: '聖誕裝飾。',
    date: '2026-07-20',
    tags: ['建築', '光影', '地圖'],
    aspect: 'landscape'
  }
];

export const showcaseCategoryLabels: Record<ShowcaseCategory, string> = {
  drawing: '繪圖',
  map: '地圖',
  plugin_event: 'Plugin 活動相',
  other: '其他',
};

export const showcaseCategoryColors: Record<ShowcaseCategory, string> = {
  drawing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  map: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  plugin_event: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};
