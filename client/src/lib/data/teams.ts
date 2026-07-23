// src/lib/data/teams.ts
import type { Team } from "./types";

export const teams: Team[] = [
  {
    id: 1,
    slug: "1",
    name: "熾級",
    nameEn: "Seraphim",
    tier: "Alpha",
    memberCount: 11,
    leader: "Raku_VTuber",
    viceLeader: "eliseqwq",
    description:
      "熾級是 NEMESIS 中最重要的團隊，負責進行公會管理及發展規劃事務。",
    longDescription:
      "熾級是 NEMESIS 中最重要的團隊，負責進行公會管理及發展規劃事務。成員都是經過嚴格篩選，擁有出色的視野和團隊協作能力。",
    color: "from-red-600 to-orange-900",
    image: "/img/serphan_bg.png",
    responsibilities: [
      "制定公會發展方向與策略",
      "舉辦及統籌各類公會活動",
      "維護公會 Discord 伺服器秩序",
      "招募及審核新成員申請",
      "管理公會財務及資源",
      "對外代表公會進行聯絡",
    ],
    bans: [
      {
        name: "創建班",
        leader: "YYK_Video",
        memberCount: 5,
        description: "建造動人建築",
      },
      {
        name: "技術班",
        leader: "Kraz",
        memberCount: 3,
        description: "管理所有技術相關事務",
      },
      {
        name: "宣傳班",
        leader: "Wing_HK",
        memberCount: 3,
        description: "為 NEMESIS 做宣傳活動",
      },
    ],
    principles: [
      {
        icon: "❤️",
        title: "團隊至上",
        description: "人無完人，要達成目標，每位成員的付出都是不可或缺的。",
      },
      {
        icon: "✨",
        title: "創新思維",
        description: "鼓勵使用創意突破界限，為公會帶來新道路解決問題。",
      },
      {
        icon: "🛡️",
        title: "敢做敢當",
        description:
          "熾級可自主決定任務內容，需主動訂立計劃及尋求其他熾級協助。",
      },
    ],
    history: [
      {
        year: "2021",
        month: "Nov",
        stage: "公會成立雛形",
        description:
          "Raku 和 6 位共同遊玩伺服器的玩家成立組織，名字定為 WorldEnd。他們在不同的伺服器中遊玩，結識不同的玩家。",
      },
      {
        year: "2022",
        month: "May",
        stage: "轉型",
        description:
          "隨著組織規模擴大，12 位玩家加入 WorldEnd 團隊，名字更改為 DeadEnd。此時的 DeadEnd 專注遊玩政治伺服器和研究 Minecraft 的知識。",
      },
      {
        year: "2023",
        month: "May",
        stage: "公會社群化",
        description:
          "隨着遊玩的伺服器增加，DeadEnd 開設了自己的 Discord 伺服器並改名為 NEMESIS。此時 NEMESIS 開始認為香港 Minecraft 圈需要多些聲音。",
      },
      {
        year: "2024",
        month: "Nov",
        stage: "公會公開化",
        description:
          "NEMESIS 為了連結圈子內的人，公開自己的 Discord 並主動和不同的人溝通，尋求合作機會。",
      },
      {
        year: "2025",
        month: "Feb - NOW",
        stage: "公會活動開啓",
        description: "NEMESIS 開始舉辦不同的活動，旨在連結圈子。",
      },
    ],
  },
  {
    id: 2,
    slug: "2",
    name: "生存團",
    nameEn: "The Survival",
    tier: "Alpha",
    memberCount: 8,
    leader: "Raku_VTuber",
    viceLeader: "TBD",
    description:
      "生存團是 NEMESIS 的核心戰鬥團隊，負責管理生存伺服器的運作和發展。成員在伺服器中被玩家稱為 Ruler。",
    longDescription:
      "生存團是 NEMESIS 的核心戰鬥團隊，負責管理生存伺服器的運作和發展。成員在伺服器中被玩家稱為 Ruler，擁有強大的生存技能和領導能力。",
    color: "from-emerald-600 to-cyan-900",
    image: "/img/raku_stand.png",
    responsibilities: [
      "維護及管理生存伺服器（mc.nemesis.wiki）",
      "制定及執行伺服器規則",
      "處理玩家投訴及申訴",
      "定期進行伺服器備份及更新",
      "舉辦生存主題活動及比賽",
      "協助新玩家融入伺服器",
    ],
    bans: [
      {
        name: "生存班",
        leader: "Raku_VTuber",
        memberCount: 3,
        description: "專注於生存伺服器的日常管理和玩家互動",
      },
      {
        name: "Ruler",
        leader: "Raku_VTuber",
        memberCount: 5,
        description: "伺服器的最高管理者，負責重大決策和方向規劃",
      },
    ],
    principles: [
      {
        icon: "🛡️",
        title: "守護伺服器",
        description: "維護生存伺服器的秩序，確保玩家有良好的遊戲體驗。",
      },
      {
        icon: "✨",
        title: "引領發展",
        description: "帶領伺服器發展方向，創造有趣的遊戲內容和活動。",
      },
      {
        icon: "❤️",
        title: "服務玩家",
        description: "以玩家為本，積極回應社群需求，建立友善環境。",
      },
    ],
  },
  {
    id: 3,
    slug: "3",
    name: "初見團",
    nameEn: "The Meetup",
    tier: "Beta",
    memberCount: 13,
    description:
      "公會 VTuber 創作團隊，透過直播及影片創作推廣公會及 Minecraft 文化。",
    longDescription:
      "初見團是 NEMESIS 公會於 2025 年 9 月成立的 VTuber 創作團隊，由一群熱愛直播及影片創作的成員組成。初見團成員以虛擬形象進行 Minecraft 直播及影片創作，為公會帶來更多曝光，同時推廣香港 Minecraft 文化。",
    color: "from-pink-600 to-purple-900",
    image: "/img/first_see_server.png",
    responsibilities: [
      "進行 Minecraft 主題 VTuber 直播",
      "製作及上傳 YouTube 影片",
      "推廣公會及 Minecraft 文化",
      "與其他 VTuber 及創作者合作",
      "擔當公會吉祥物（X",
      "製作活動宣傳素材",
    ],
  },
];
