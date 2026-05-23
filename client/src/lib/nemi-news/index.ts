// ============================================================
// NEMI News loader
// Reads all .md files in this folder via Vite's import.meta.glob.
//
// To add a new article: create a new .md file here.
// Filename convention: YYYY-MM-DD-slug.md
//
// Each file must have a minimal frontmatter block at the top:
//   ---
//   id: <unique number>
//   date: YYYY-MM-DD
//   description: One-line summary shown in the news list
//   ---
//
// Notes
//   • Title is generated automatically as `NEMI-NEWS（YYYY-MM-DD）`.
//   • NEMI News are blog-style records, NOT events. They do not appear
//     in 近期活動 on the home page or in the /activities timeline.
// ============================================================

export interface NemiNews {
  id: number;
  /** ISO date string, e.g. 2026-05-16 */
  date: string;
  /** Auto-generated headline: `NEMI-NEWS（YYYY-MM-DD）` */
  title: string;
  /** One-line summary shown in listings */
  description: string;
  /** Full markdown body for the detail page */
  body: string;
}

// Eagerly import every .md file as raw text (Vite supports ?raw natively)
const modules = import.meta.glob('./*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    meta[key] = value;
  });

  return { meta, body: match[2].trim() };
}

/** Auto-format the news title from its date. */
export function formatNewsTitle(date: string): string {
  return `NEMI-NEWS（${date}）`;
}

// Parse all files and sort newest first
export const nemiNews: NemiNews[] = Object.entries(modules)
  .map(([, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const date = meta.date ?? '';
    return {
      id: Number(meta.id),
      date,
      title: formatNewsTitle(date),
      description: meta.description ?? '',
      body,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
