// ============================================================
// NEMI Server — Announcements
// For short operational notices: maintenance, IP changes,
// rule updates, whitelist changes, etc.
//
// Add new entries at the TOP (newest first).
//
// type:
//   'maintenance' – server downtime / maintenance windows
//   'update'      – version / plugin / rule updates
//   'notice'      – general notices
// ============================================================

export interface Announcement {
  id: number;
  date: string;
  title: string;
  content: string;
  type: 'maintenance' | 'update' | 'notice';
}

export const announcements: Announcement[] = [
  {
    id: 1,
    date: '2026-01-07',
    title: '伺服器正式開放',
    content: 'NEMI 生存伺服器正式開放，伺服器 IP 為 mc.nemesis.wiki。歡迎白名單玩家登入！',
    type: 'notice',
  },
  {
    id: 2,
    date: '2026-05-20',
    title: '伺服器升級通知',
    content: '伺服器將會23-24/5在升級至26.12，同時更新公會系統！',
    type: 'notice',
  },
  // 👇 在此加入新公告（請保持最新在最上方）
];
