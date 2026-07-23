// src/lib/data/creators.ts
import type { Creator } from "./types";

export const creators: Creator[] = [
  {
    id: 1,
    name: "NemesisHK",
    platform: "YouTube",
    description:
      "NEMESIS 公會官方 YouTube 頻道，定期上傳活動精華、UHC 比賽錄影及公會相關內容。",
    url: "https://youtube.com",
    tags: ["官方", "UHC", "活動"],
  },
  {
    id: 2,
    name: "初見 Vtuber 1",
    platform: "YouTube / Twitch",
    description: "初見團成員，專注於 Minecraft 生存及建築直播，風格輕鬆幽默。",
    tags: ["VTuber", "生存", "建築"],
  },
  {
    id: 3,
    name: "初見 Vtuber 2",
    platform: "YouTube",
    description:
      "初見團成員，專注於 Minecraft 冒險及探索影片，擅長解說及劇情創作。",
    tags: ["VTuber", "冒險", "劇情"],
  },
];
