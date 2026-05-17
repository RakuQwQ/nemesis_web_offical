// ============================================================
// NEMESIS Guild — Shared Data
// ============================================================

export interface Activity {
  id: number;
  date: string;
  title: string;
  description: string;
  category: 'server' | 'event' | 'community' | 'vtuber' | 'uhc' | 'donation';
}

export interface Ban {
  name: string;
  leader: string;
  memberCount: number;
  description: string;
}

export interface Principle {
  icon: string;
  title: string;
  description: string;
}

export interface HistoryEntry {
  year: string;
  month: string;
  stage: string;
  description: string;
}

export interface Team {
  id: number;
  slug: string;
  name: string;
  nameEn: string;
  tier: 'Alpha' | 'Beta' | 'Gamma';
  memberCount: number;
  description: string;
  longDescription: string;
  color: string;
  image: string;
  responsibilities: string[];
  members?: string[];
  leader?: string;
  viceLeader?: string;
  bans?: Ban[];
  principles?: Principle[];
  history?: HistoryEntry[];
}

export interface Server {
  id: number;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'inactive' | 'seasonal';
  ip?: string;
  isPublic?: boolean; // defaults to true if omitted
  pinned?: boolean;  // defaults to false if omitted; pinned servers appear first
  tags: string[];
  version?: string;
  discordUrl?: string;
  wikiUrl?: string;
  youtubeUrl?: string;
  threadsUrl?: string;
  instagramUrl?: string;
}

export interface Creator {
  id: number;
  name: string;
  platform: string;
  description: string;
  url?: string;
  tags: string[];
}

// ============================================================
// ACTIVITIES DATA (33 events)
// To add/edit events, update this array.
// Each entry needs: id, date (YYYY-MM-DD), title, description, category, participants (optional)
// Categories: 'server' | 'event' | 'community' | 'vtuber' | 'uhc' | 'donation'
// ============================================================
export const activities: Activity[] = [
  {
    id: 38,
    date: '2026-04-12',
    title: 'NEMI 終界積分挑戰',
    description: 'NEMI 生存活動',
    category: 'server',
  },
  {
    id: 37,
    date: '2026-05-16',
    title: 'NEMI 第一屆聯盟會議',
    description: 'NEMI 第一屆聯盟會議',
    category: 'server',
  },
  {
    id: 36,
    date: '2026-01-16',
    title: 'NEMESIS x 礦競之王',
    description: '協作模組材質',
    category: 'server',
  },
  {
    id: 35,
    date: '2026-04-21',
    title: 'NEMESIS 占卜系統 beta 2.0',
    description: 'NEMESIS 占卜系統修復',
    category: 'community',
  },
  {
    id: 34,
    date: '2026-04-09',
    title: 'NEMESIS 網址上線',
    description: 'NEMESIS 官方網站正式上線！',
    category: 'community',
  },
  {
    id: 33,
    date: '2026-03-18',
    title: 'NEMESIS 占卜系統 Beta 1.0',
    description: '使用 Minecraft 生物加礦物作占卜。',
    category: 'community',
  },
  {
    id: 32,
    date: '2026-03-05',
    title: '捐贈感謝',
    description: '感謝各位支持 NEMESIS！',
    category: 'donation',
  },
  {
    id: 31,
    date: '2026-02-17',
    title: 'UHC 第十七回（新春開年篇）',
    description: '第十七回 UHC（新春開年篇）。',
    category: 'uhc',
  },
  {
    id: 30,
    date: '2026-02-17',
    title: '新春開年套裝',
    description: 'NEMESIS 向團員派紅包。',
    category: 'event',
  },
  {
    id: 29,
    date: '2026-01-31',
    title: 'Donation 開啓',
    description: 'NEMESIS 開放捐款渠道。',
    category: 'donation',
  },
  {
    id: 28,
    date: '2026-01-07',
    title: '生存伺服器開啓',
    description: 'NEMESIS 官方生存伺服器開啓，共 30 人參與。',
    category: 'server',
  },
  {
    id: 27,
    date: '2025-12-11',
    title: '生存班招募',
    description: '為了管理生存伺服器，NEMESIS 招募生存班。',
    category: 'community',
  },
  {
    id: 26,
    date: '2025-11-23',
    title: 'UHC 第十六回',
    description: 'NEMESIS 公會第十六回 UHC，共 12 人參與。',
    category: 'uhc',
  },
  {
    id: 25,
    date: '2025-11-07',
    title: '「15-Minute 聖誕影片挑戰」',
    description: 'NEMESIS 聖誕影片活動，共 6 人參與。',
    category: 'event',
  },
  {
    id: 24,
    date: '2025-11-07',
    title: 'UHC 第十五回',
    description: 'NEMESIS 公會第十五回 UHC，共 6 人參與。',
    category: 'uhc',
  },
  {
    id: 23,
    date: '2025-10-22',
    title: '「2-Minute 恐怖短片挑戰」開鏡！',
    description: '恐怖短片創作活動，共 5 人參與。',
    category: 'event',
  },
  {
    id: 22,
    date: '2025-10-01',
    title: 'UHC 第十四回',
    description: 'NEMESIS 公會第十四回 UHC，共 7 人參與。',
    category: 'uhc',
  },
  {
    id: 21,
    date: '2025-09-25',
    title: '動畫觀賞大會',
    description: 'Nemesis 與成員一起觀賞 Minecraft 人氣動畫！共 18 人參與。',
    category: 'community',
  },
  {
    id: 20,
    date: '2025-09-24',
    title: 'UHC 第十三回',
    description: 'NEMESIS 公會第十三回 UHC，共 6 人參與。',
    category: 'uhc',
  },
  {
    id: 19,
    date: '2025-09-17',
    title: '「初見團」建立！',
    description: 'NEMESIS 聚集了一共 13 位初見的 VTuber 為大家獻上「初見！異域旅行團」系列！系列由 SharkyLab 贊助。',
    category: 'vtuber',
  },
  {
    id: 18,
    date: '2025-09-01',
    title: 'UHC 第十二回',
    description: 'NEMESIS 公會第十二回 UHC，共 7 人參與。',
    category: 'uhc',
  },
  {
    id: 17,
    date: '2025-08-05',
    title: 'UHC 第十一回',
    description: 'NEMESIS 公會第十一回 UHC，共 9 人參與。',
    category: 'uhc',
  },
  {
    id: 16,
    date: '2025-07-27',
    title: 'UHC 第十回',
    description: 'NEMESIS 公會第十回 UHC，共 7 人參與。',
    category: 'uhc',
  },
  {
    id: 15,
    date: '2025-07-21',
    title: 'UHC 第九回',
    description: 'NEMESIS 公會第九回 UHC，共 19 人參與。',
    category: 'uhc',
  },
  {
    id: 14,
    date: '2025-07-20',
    title: 'UHC 第八回',
    description: 'NEMESIS 公會第八回 UHC，共 13 人參與。',
    category: 'uhc',
  },
  {
    id: 13,
    date: '2025-07-19',
    title: 'UHC 第七回',
    description: 'NEMESIS 公會第七回 UHC，共 11 人參與。',
    category: 'uhc',
  },
  {
    id: 12,
    date: '2025-07-10',
    title: 'UHC 第六回',
    description: 'NEMESIS 公會第六回 UHC，共 8 人參與。',
    category: 'uhc',
  },
  {
    id: 11,
    date: '2025-07-10',
    title: 'UHC 第五回',
    description: 'NEMESIS 公會第五回 UHC，共 8 人參與。',
    category: 'uhc',
  },
  {
    id: 10,
    date: '2025-07-08',
    title: 'UHC 第四回',
    description: 'NEMESIS 公會第四回 UHC，共 6 人參與。',
    category: 'uhc',
  },
  {
    id: 9,
    date: '2025-07-03',
    title: '「初見團」！VTuber 招募',
    description: '招募香港 VTuber 做進行長期生存系列，共 15 人參與。',
    category: 'vtuber',
  },
  {
    id: 8,
    date: '2025-06-27',
    title: '歌唱大賽',
    description: '在 Discord 頻道內分享大家喜歡的音樂，共 21 人參與。',
    category: 'event',
  },
  {
    id: 7,
    date: '2025-06-15',
    title: '200 人感謝祭',
    description: 'NEMESIS 200 人感謝祭；NEMESIS 宣佈對未來的計劃及視野，共 200 人參與。',
    category: 'community',
  },
  {
    id: 6,
    date: '2025-06-15',
    title: 'UHC 第三回',
    description: 'NEMESIS 公會第三回 UHC，共 12 人參與。',
    category: 'uhc',
  },
  {
    id: 5,
    date: '2025-04-12',
    title: 'UHC 第二回',
    description: 'NEMESIS 公會第二回 UHC，共 10 人參與。',
    category: 'uhc',
  },
  {
    id: 4,
    date: '2025-04-09',
    title: '聯動！Chill Play 伺服器',
    description: 'NEMESIS 和 ChillPlay 共同管理生存伺服器，共 30 人參與。',
    category: 'server',
  },
  {
    id: 3,
    date: '2025-04-08',
    title: '無盡地城',
    description: 'NEMESIS 使用由天豹星雲製造的 PVE 地圖 -- 無盡地城；和玩家一起享受 PVE 的樂趣，共 13 人參與。',
    category: 'event',
  },
  {
    id: 2,
    date: '2025-02-05',
    title: 'UHC 第一回',
    description: 'NEMESIS 公會第一回 UHC，共 12 人參與。',
    category: 'uhc',
  },
  {
    id: 1,
    date: '2021-11-28',
    title: 'NEMESIS 正式公開',
    description: '經過一個月時間的計劃及執行，NEMESIS 終於開放 DC 讓各位玩家加入！',
    category: 'community',
  },
];

// ============================================================
// TEAMS DATA
// ============================================================
export const teams: Team[] = [
  {
    id: 1,
    slug: '1',
    name: '熾級',
    nameEn: 'Seraphim',
    tier: 'Alpha',
    memberCount: 11,
    leader: 'Raku_VTuber',
    viceLeader: 'eliseqwq',
    description: '熾級是 NEMESIS 中最重要的團隊，負責進行公會管理及發展規劃事務。',
    longDescription: '熾級是 NEMESIS 中最重要的團隊，負責進行公會管理及發展規劃事務。成員都是經過嚴格篩選，擁有出色的視野和團隊協作能力。',
    color: 'from-red-600 to-orange-900',
    image: '/img/serphan_bg.png',
    responsibilities: [
      '制定公會發展方向與策略',
      '舉辦及統籌各類公會活動',
      '維護公會 Discord 伺服器秩序',
      '招募及審核新成員申請',
      '管理公會財務及資源',
      '對外代表公會進行聯絡',
    ],
    bans: [
      { name: '創建班', leader: 'YYK_Video', memberCount: 5, description: '建造動人建築' },
      { name: '技術班', leader: 'Kraz', memberCount: 3, description: '管理所有技術相關事務' },
      { name: '宣傳班', leader: 'Wing_HK', memberCount: 3, description: '為 NEMESIS 做宣傳活動' },
    ],
    principles: [
      { icon: '❤️', title: '團隊至上', description: '人無完人，要達成目標，每位成員的付出都是不可或缺的。' },
      { icon: '✨', title: '創新思維', description: '鼓勵使用創意突破界限，為公會帶來新道路解決問題。' },
      { icon: '🛡️', title: '敢做敢當', description: '熾級可自主決定任務內容，需主動訂立計劃及尋求其他熾級協助。' },
    ],
    history: [
      { year: '2021', month: 'Nov', stage: '公會成立雛形', description: 'Raku 和 6 位共同遊玩伺服器的玩家成立組織，名字定為 WorldEnd。他們在不同的伺服器中遊玩，結識不同的玩家。' },
      { year: '2022', month: 'May', stage: '轉型', description: '隨著組織規模擴大，12 位玩家加入 WorldEnd 團隊，名字更改為 DeadEnd。此時的 DeadEnd 專注遊玩政治伺服器和研究 Minecraft 的知識。' },
      { year: '2023', month: 'May', stage: '公會社群化', description: '隨着遊玩的伺服器增加，DeadEnd 開設了自己的 Discord 伺服器並改名為 NEMESIS。此時 NEMESIS 開始認為香港 Minecraft 圈需要多些聲音。' },
      { year: '2024', month: 'Nov', stage: '公會公開化', description: 'NEMESIS 為了連結圈子內的人，公開自己的 Discord 並主動和不同的人溝通，尋求合作機會。' },
      { year: '2025', month: 'Feb - NOW', stage: '公會活動開啓', description: 'NEMESIS 開始舉辦不同的活動，旨在連結圈子。' },
    ],
  },
  {
    id: 2,
    slug: '2',
    name: '生存團',
    nameEn: 'The Survival',
    tier: 'Alpha',
    memberCount: 8,
    leader: 'Raku_VTuber',
    viceLeader: 'TBD',
    description: '生存團是 NEMESIS 的核心戰鬥團隊，負責管理生存伺服器的運作和發展。成員在伺服器中被玩家稱為 Ruler。',
    longDescription: '生存團是 NEMESIS 的核心戰鬥團隊，負責管理生存伺服器的運作和發展。成員在伺服器中被玩家稱為 Ruler，擁有強大的生存技能和領導能力。',
    color: 'from-emerald-600 to-cyan-900',
    image: '/img/raku_stand.png',
    responsibilities: [
      '維護及管理生存伺服器（mc.nemesis.wiki）',
      '制定及執行伺服器規則',
      '處理玩家投訴及申訴',
      '定期進行伺服器備份及更新',
      '舉辦生存主題活動及比賽',
      '協助新玩家融入伺服器',
    ],
    bans: [
      { name: '生存班', leader: 'Raku_VTuber', memberCount: 3, description: '專注於生存伺服器的日常管理和玩家互動' },
      { name: 'Ruler', leader: 'Raku_VTuber', memberCount: 5, description: '伺服器的最高管理者，負責重大決策和方向規劃' },
    ],
    principles: [
      { icon: '🛡️', title: '守護伺服器', description: '維護生存伺服器的秩序，確保玩家有良好的遊戲體驗。' },
      { icon: '✨', title: '引領發展', description: '帶領伺服器發展方向，創造有趣的遊戲內容和活動。' },
      { icon: '❤️', title: '服務玩家', description: '以玩家為本，積極回應社群需求，建立友善環境。' },
    ],
  },
  {
    id: 3,
    slug: '3',
    name: '初見團',
    nameEn: 'The Meetup',
    tier: 'Beta',
    memberCount: 13,
    description: '公會 VTuber 創作團隊，透過直播及影片創作推廣公會及 Minecraft 文化。',
    longDescription: '初見團是 NEMESIS 公會於 2025 年 9 月成立的 VTuber 創作團隊，由一群熱愛直播及影片創作的成員組成。初見團成員以虛擬形象進行 Minecraft 直播及影片創作，為公會帶來更多曝光，同時推廣香港 Minecraft 文化。',
    color: 'from-pink-600 to-purple-900',
    image: '/img/first_see_server.png',
    responsibilities: [
      '進行 Minecraft 主題 VTuber 直播',
      '製作及上傳 YouTube 影片',
      '推廣公會及 Minecraft 文化',
      '與其他 VTuber 及創作者合作',
      '擔當公會吉祥物（X',
      '製作活動宣傳素材',
    ],
  },
];

// ============================================================
// SERVERS DATA
// To add/edit servers, update this array.
// ============================================================
export const servers: Server[] = [
  {
    id: 1,
    name: 'NEMI',
    description: '公會系統、定期活動。適合休閒玩家及生存玩家',
    type: '生存、微政治',
    status: 'active',
    ip: 'mc.nemesis.wiki',
    pinned: true,
    tags: ['生存', '微政治', '公會系統'],
    version: '1.20.10',
    discordUrl: 'https://discord.com/invite/8JtmB3bugS',
  },
  {
    id: 2,
    name: '初見！異域旅行團',
    description: '不定期活動、拍攝注意。非公開活動伺服器',
    type: '生存、微政治',
    status: 'seasonal',
    ip: 'Disclosed',
    isPublic: false,
    tags: ['活動', '非公開', 'VTuber'],
    version: '1.20.6',
    discordUrl: 'https://discord.com/invite/8JtmB3bugS',
  },
  {
    id: 3,
    name: 'NEMESIS UHC',
    description: '不定期舉辦 UHC 活動。極限 PVP 非公開賽事伺服器。',
    type: '極限、PVP',
    status: 'seasonal',
    ip: 'nemesis.mcsv.pro',
    isPublic: true,
    tags: ['UHC', 'PvP', '極限'],
    version: '1.20–1.21.7',
    discordUrl: 'https://discord.com/invite/8JtmB3bugS',
  },
  {
    id: 4,
    name: 'Rubik SMP',
    description: '不定期活動。建立領地、PVP 公開伺服器，適合活動及建築玩家',
    type: '建立領地、PVP',
    status: 'active',
    ip: 'rubiksmp.net',
    tags: ['SMP', '領地', 'PvP'],
    version: '1.20–1.21.7',
    discordUrl: 'https://discord.rubiksmp.net/',
  },
  {
    id: 5,
    name: '察洛斯 Chsemnos',
    description: '不定期活動。RPG 生存伺服器，適合建築、生存及 RPG 玩家。',
    type: 'RPG、生存',
    status: 'active',
    ip: 'rubiksmp.net',
    tags: ['RPG', '生存', '建築'],
    version: '1.21.4',
    discordUrl: 'https://discord.gg/D5p7peGDCq',
    wikiUrl: 'https://chsemnos.fandom.com/zh-hk/wiki/Main_Page',
  },
  {
    id: 6,
    name: 'Xhakyialk Zone',
    description: '純生存伺服器，公會幫派發展、定期活動比賽。適合生存、紅石及建築玩家。',
    type: '公會幫派、定期活動',
    status: 'active',
    ip: 'xhakyialk.ddns.net:19132',
    tags: ['生存', '紅石', '建築'],
    version: 'Bedrock 1.26.0+',
    discordUrl: 'https://discord.gg/6N7zkVV4Qb',
    youtubeUrl: 'https://www.youtube.com/channel/UC4C9dvY_5u-jpit5KM88XtQ',
    wikiUrl:'https://xhakyialk.ddns.net/',
  },
  {
    id: 7,
    name: 'BCMCHK',
    description: '純生存伺服器，自家 Datapack。適合生存、紅石及建築玩家。',
    type: '生存',
    status: 'active',
    tags: ['生存', 'Datapack', '紅石'],
    version: '不定',
    discordUrl: 'https://discord.gg/4UB9dW8',
    threadsUrl: 'https://www.threads.com/@bcmc.hk/post/DKzK78OIg0A',
  },
  {
    id: 8,
    name: '競技拍 FanEdition',
    description: '週末舉辦活動、原創地圖。適合競技拍觀眾及小遊戲玩家。',
    type: '週末活動、原創地圖',
    status: 'seasonal',
    tags: ['競技', '小遊戲', '原創地圖'],
    version: '不定',
    discordUrl: 'https://discord.com/invite/Jh89fDWrxX',
    threadsUrl: 'https://www.threads.com/@challengepark.fe',
  },
  {
    id: 9,
    name: 'InstantSMP',
    description: '生存地圖為基本，建造各類建築發展成為一個城市',
    type: '週末活動、原創地圖',
    status: 'seasonal',
    ip: '23.109.122.175:25648',
    tags: ['生存', '活動', '紅石建築'],
    version: '1.21.11',
    discordUrl: 'https://discord.gg/caQZcwDEad',
    threadsUrl: 'https://www.threads.com/@challengepark.fe',
  },
  {
    id: 10,
    name: 'UKCF Minecraft Server',
    description: '一個隨緣玩既SMP兼PVP server，得閒就會有人玩',
    type: 'SMP',
    status: 'seasonal',
    tags: ['生存', 'PVP'],
    version: 'MCBE最新版',
    discordUrl: 'https://discord.gg/beeReeTU9a',
  },
  {
    id: 11,
    name: 'Formosa  Network',
    description: 'Formosa 是一個結合了FFA與練習模式的台灣 PvP 伺服器，不定期舉辦各式活動',
    type: '台灣, 活動',
    status: 'active',
    ip: 'formosa.network',
    tags: ['PVP', 'UHC'],
    version: '1.21.3+',
    discordUrl: 'https://discord.gg/U22ut75A4V',
    wikiUrl: 'https://www.mc-list.xyz/1243/info',
  },
  {
    id: 12,
    name: '霓虹士多 Neon Store',
    description: '一個由多位粵語 Minecraft 創作者組成的生存系列',
    type: '拍攝用, 直播',
    status: 'active',
    tags: ['紅石', 'Minigame'],
    version: '1.21.11',
    instagramUrl: 'https://www.instagram.com/neon_store_hk/',
    wikiUrl: 'linktr.ee/neonstore_hk',
  },
  {
    id: 13,
    name: '試住先 Just try only',
    description: 'Just for Fun. 希望你可以入嚟體驗自製地圖或者吹吓水～',
    type: '地圖創作、休閒',
    status: 'seasonal',
    tags: ['自製地圖', 'just for fun'],
    version: 'NA',
    discordUrl: 'https://discord.gg/tB9fBtrppZ',
    instagramUrl: 'https://www.instagram.com/just.try_only?igsh=bWlucmdocXh6cDM3',
    threadsUrl: 'https://www.threads.com/@just.try_only?igshid=NTc4MTIwNjQ2YQ==',
  },
  {
    id: 14,
    name: '鳩揈揈養老伺服器',
    description: '養老同建築 有普通佛系 少少方便生存嘅特殊道具 不影響普通生存嘅抽獎 主要朋友歡樂交流',
    type: '生存、建築',
    status: 'active',
    tags: ['原味生存', '金錢系統'],
    version: '1.21.11',
  },
  
];

// ============================================================
// CREATORS DATA
// ============================================================
export const creators: Creator[] = [
  {
    id: 1,
    name: 'NemesisHK',
    platform: 'YouTube',
    description: 'NEMESIS 公會官方 YouTube 頻道，定期上傳活動精華、UHC 比賽錄影及公會相關內容。',
    url: 'https://youtube.com',
    tags: ['官方', 'UHC', '活動'],
  },
  {
    id: 2,
    name: '初見 Vtuber 1',
    platform: 'YouTube / Twitch',
    description: '初見團成員，專注於 Minecraft 生存及建築直播，風格輕鬆幽默。',
    tags: ['VTuber', '生存', '建築'],
  },
  {
    id: 3,
    name: '初見 Vtuber 2',
    platform: 'YouTube',
    description: '初見團成員，專注於 Minecraft 冒險及探索影片，擅長解說及劇情創作。',
    tags: ['VTuber', '冒險', '劇情'],
  },
];

// Category labels
export const categoryLabels: Record<Activity['category'], string> = {
  server: '伺服器',
  event: '活動',
  community: '社群',
  vtuber: 'VTuber',
  uhc: 'UHC',
  donation: '捐款',
};

export const categoryColors: Record<Activity['category'], string> = {
  server: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  event: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  community: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  vtuber: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  uhc: 'bg-red-500/20 text-red-400 border-red-500/30',
  donation: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};
