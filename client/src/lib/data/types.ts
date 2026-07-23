
export interface Activity {
  id: number;
  date: string;
  title: string;
  description: string;
  content?: string;
  category: 'server' | 'event' | 'community' | 'vtuber' | 'uhc' | 'donation';
  tags?: string[];
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
  isPublic?: boolean;
  pinned?: boolean;
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

export type ShowcaseCategory = 'drawing' | 'map' | 'plugin_event' | 'other';

export interface ShowcaseItem {
  id: number;
  title: string;
  author: string;
  coAuthor?: string; // <-- 新增的協作者屬性
  category: ShowcaseCategory;
  imageUrls: string[]; 
  description?: string;
  date?: string;
  tags?: string[];
  aspect?: 'landscape' | 'portrait' | 'square';
}
