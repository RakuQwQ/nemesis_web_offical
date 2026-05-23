/**
 * generate-spa-routes.mjs
 *
 * Post-build script for GitHub Pages SPA hosting.
 *
 * Problem: GitHub Pages returns HTTP 404 for any URL that doesn't match a
 * physical file. The 404.html JS redirect trick restores routing for human
 * browsers, but Googlebot sees the 404 status and won't index subpages.
 *
 * Solution: Copy dist/public/index.html into a subdirectory for every known
 * route so GitHub Pages returns HTTP 200 directly for each URL.
 *
 * Static routes are listed explicitly below.
 * Dynamic news article IDs are discovered automatically from the .md frontmatter
 * so the script stays up-to-date whenever new articles are added.
 */

import { readdirSync, readFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT     = join(__dirname, '..');
const DIST     = join(ROOT, 'dist', 'public');
const INDEX    = join(DIST, 'index.html');

// ── Static routes ──────────────────────────────────────────────────────────
// Update this list whenever a new top-level page is added.
const STATIC_ROUTES = [
  'activities',
  'server-wiki',
  'creator-wiki',
  'survival-wiki',
  'survival-wiki/news',
  'more-teams',
  // Team pages (slugs match the `slug` field in data.ts)
  'group/1',
  'group/2',
  'group/3',
];

// ── Dynamic routes: NEMI news articles ────────────────────────────────────
// Read the `id:` field from each markdown frontmatter block so new articles
// are picked up automatically without editing this script.
function getNemiNewsIds() {
  const newsDir = join(ROOT, 'client', 'src', 'lib', 'nemi-news');
  return readdirSync(newsDir)
    .filter((f) => f.endsWith('.md'))
    .flatMap((f) => {
      const content = readFileSync(join(newsDir, f), 'utf8');
      const match = content.match(/^id:\s*(\d+)/m);
      return match ? [match[1]] : [];
    });
}

const newsIds      = getNemiNewsIds();
const allRoutes    = [
  ...STATIC_ROUTES,
  ...newsIds.map((id) => `survival-wiki/news/${id}`),
];

// ── Generate stubs ─────────────────────────────────────────────────────────
console.log('\n📄 Generating SPA route stubs for GitHub Pages…\n');

for (const route of allRoutes) {
  const dir = join(DIST, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(INDEX, join(dir, 'index.html'));
  console.log(`  ✓  /${route}/`);
}

console.log(`\n✅  ${allRoutes.length} routes generated (${newsIds.length} news articles discovered).\n`);
