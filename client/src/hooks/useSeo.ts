// useSeo — lightweight per-page SEO hook
// Sets <title>, meta description, keywords, Open Graph, Twitter Card, canonical, and robots
// without any external dependency (no react-helmet-async needed).

import { useEffect } from 'react';

const SITE_NAME = 'NEMESIS';
const SITE_URL = 'https://www.nemesis.wiki';
const DEFAULT_IMAGE = `${SITE_URL}/img/nemesis_logo_red.png`;
const DEFAULT_DESCRIPTION =
  'NEMESIS 香港 Minecraft 公會 — 香港最具規模的 Minecraft 社群，為你服務。';
const DEFAULT_KEYWORDS =
  'NEMESIS, 香港 Minecraft, 香港 Minecraft 公會, HK Minecraft, Minecraft 社群, nemesis.wiki';

export interface SeoOptions {
  /** Page-specific title. Will be formatted as "<title> | NEMESIS". Omit for home page. */
  title?: string;
  description?: string;
  /** Comma-separated keywords for this page, appended to the default keyword set. */
  keywords?: string;
  /** URL path, e.g. "/activities" or "/group/1". Defaults to window.location.pathname. */
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  /** ISO date string for article pages, e.g. "2026-05-16" */
  publishedTime?: string;
  noIndex?: boolean;
}

// ── helpers ──────────────────────────────────────────────────────────────────

function setMeta(selector: string, attr: string, attrValue: string, content: string): void {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta') as HTMLMetaElement;
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string): void {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link') as HTMLLinkElement;
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// ── WebSite JSON-LD (injected once at app level, updated on each navigation) ──

function injectWebSiteSchema(canonicalUrl: string): void {
  const id = 'jsonld-website';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'zh-HK',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/activities?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  });
}

// ── hook ─────────────────────────────────────────────────────────────────────

export function useSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  publishedTime,
  noIndex = false,
}: SeoOptions = {}): void {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — 香港 Minecraft 公會`;

    const canonicalPath = canonical ?? window.location.pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    const fullKeywords = keywords
      ? `${keywords}, ${DEFAULT_KEYWORDS}`
      : DEFAULT_KEYWORDS;

    // ── <title> ──
    document.title = fullTitle;

    // ── Standard meta ──
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', fullKeywords);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex,nofollow' : 'index,follow',
    );

    // ── Canonical ──
    setLink('canonical', canonicalUrl);

    // ── Open Graph ──
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'zh_HK');

    // ── Twitter Card ──
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // ── Article metadata ──
    if (publishedTime) {
      setMeta(
        'meta[property="article:published_time"]',
        'property',
        'article:published_time',
        publishedTime,
      );
    }

    // ── WebSite structured data (sitewide) ──
    injectWebSiteSchema(canonicalUrl);

    // Restore plain title on unmount (navigation away)
    return () => {
      document.title = `${SITE_NAME} — 香港 Minecraft 公會`;
    };
  }, [title, description, keywords, canonical, ogType, ogImage, publishedTime, noIndex]);
}
