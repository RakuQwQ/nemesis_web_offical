// NEMESIS 作品展示 — Showcase Gallery
// Masonry-style grid of Minecraft builds, digital art, pixel art, etc.

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Search, X, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';
import {
  showcaseItems,
  showcaseCategoryLabels,
  showcaseCategoryColors,
  type ShowcaseCategory,
  type ShowcaseItem,
} from '@/lib/data';

const allFilters = ['all', 'minecraft', 'digital-art', 'pixel-art', 'other'] as const;
type Filter = typeof allFilters[number];

/** Aspect → CSS column-span / row-span hint for the masonry grid */
const aspectClass: Record<NonNullable<ShowcaseItem['aspect']>, string> = {
  landscape: 'row-span-1',
  portrait: 'row-span-2',
  square: 'row-span-1',
};

const aspectImageClass: Record<NonNullable<ShowcaseItem['aspect']>, string> = {
  landscape: 'aspect-video',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
};

export default function ShowcasePage() {
  useSeo({
    title: '作品展示',
    description: 'NEMESIS 公會成員作品展示 — Minecraft 建築、數碼插畫、像素藝術等創意作品。',
    canonical: '/showcase',
    keywords: 'NEMESIS 作品, Minecraft 建築, 數碼插畫, 像素藝術, 香港 Minecraft 創作',
  });

  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ShowcaseItem | null>(null);

  const filtered = useMemo(() => {
    return showcaseItems.filter((item) => {
      const matchCat = filter === 'all' || item.category === filter;
      const q = search.toLowerCase();
      const matchSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        (item.description ?? '').toLowerCase().includes(q) ||
        (item.tags ?? []).some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

      {/* ── Header ───────────────────────────────────────── */}
      <section className="pt-24 pb-12 bg-[oklch(0.14_0.012_260)] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回首頁
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              Creative Works
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            作品展示
          </h1>
          <p className="text-gray-400">
            公會成員的 Minecraft 建築、數碼插畫及像素藝術作品。
          </p>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────── */}
      <section className="sticky top-16 z-40 bg-[oklch(0.12_0.01_260/0.95)] backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="搜尋作品或作者..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            {/* Category chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {allFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                    filter === f
                      ? 'bg-purple-500/30 border-purple-500/50 text-purple-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                  }`}
                >
                  {f === 'all'
                    ? '全部'
                    : showcaseCategoryLabels[f as ShowcaseCategory]}
                </button>
              ))}
            </div>

            <span className="ml-auto text-xs text-gray-500 shrink-0">
              {filtered.length} 件作品
            </span>
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ─────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500">沒有符合條件的作品</div>
          ) : (
            <motion.div
              layout
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    className="break-inside-avoid mb-4 cursor-pointer group"
                    onClick={() => setSelected(item)}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                      {/* Image */}
                      <div
                        className={`w-full overflow-hidden ${
                          aspectImageClass[item.aspect ?? 'landscape']
                        }`}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.01_260/0.90)] via-[oklch(0.08_0.01_260/0.40)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span
                          className={`self-start px-2 py-0.5 text-xs rounded-full border mb-2 ${
                            showcaseCategoryColors[item.category]
                          }`}
                        >
                          {showcaseCategoryLabels[item.category]}
                        </span>
                        <h3 className="text-white font-semibold text-sm leading-snug mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs">by {item.author}</p>
                      </div>

                      {/* Always-visible bottom strip */}
                      <div className="px-3 py-2.5 border-t border-white/5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-white truncate">{item.title}</p>
                            <p className="text-xs text-gray-500 truncate">by {item.author}</p>
                          </div>
                          <span
                            className={`shrink-0 px-2 py-0.5 text-xs rounded-full border ${
                              showcaseCategoryColors[item.category]
                            }`}
                          >
                            {showcaseCategoryLabels[item.category]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-3xl w-full bg-[oklch(0.14_0.012_260)] rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/50 text-gray-300 hover:text-white hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="w-full max-h-[60vh] object-cover"
              />

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{selected.title}</h2>
                    <p className="text-sm text-gray-400">by {selected.author}</p>
                  </div>
                  <span
                    className={`shrink-0 px-3 py-1 text-xs rounded-full border ${
                      showcaseCategoryColors[selected.category]
                    }`}
                  >
                    {showcaseCategoryLabels[selected.category]}
                  </span>
                </div>

                {selected.description && (
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {selected.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {selected.date && (
                    <span className="text-xs text-gray-500">{selected.date}</span>
                  )}
                  {(selected.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
