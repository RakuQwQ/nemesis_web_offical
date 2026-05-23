// NEMESIS Activities Page — Obsidian Chronicle Design
// Full activity history (29 events)

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Calendar, Filter } from 'lucide-react';
import { activities, categoryLabels, categoryColors, type Activity } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';

const allCategories = ['all', ...Object.keys(categoryLabels)] as const;
type FilterCategory = typeof allCategories[number];

export default function ActivitiesPage() {
  useSeo({
    title: '活動記錄',
    description: `NEMESIS 公會活動歷史 — 共 ${activities.length} 個活動，記錄自 2021 年至今，包括 UHC、社群活動、VTuber 企劃等。`,
    canonical: '/activities',
    keywords: 'NEMESIS 活動, Minecraft UHC 香港, 香港 Minecraft 活動記錄, NEMESIS 公會歷史, Minecraft 社群活動',
  });

  const [filter, setFilter] = useState<FilterCategory>('all');
  const [search, setSearch] = useState('');

  const sorted = [...activities].sort((a, b) => b.date.localeCompare(a.date));
  const filtered = sorted.filter((a) => {
    const matchCat = filter === 'all' || a.category === filter;
    const matchSearch =
      search === '' ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Group by year
  const grouped = filtered.reduce<Record<string, Activity[]>>((acc, act) => {
    const year = act.date.slice(0, 4);
    if (!acc[year]) acc[year] = [];
    acc[year].push(act);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

      {/* Header */}
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
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Event History</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            活動記錄
          </h1>
          <p className="text-gray-400">共 {activities.length} 個活動，記錄自 2021 年至今</p>
          {/* Count updates automatically from data.ts */}
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-[oklch(0.12_0.01_260/0.95)] backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="搜尋活動..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={14} className="text-gray-500" />
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                    filter === cat
                      ? 'bg-purple-500/30 border-purple-500/50 text-purple-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                  }`}
                >
                  {cat === 'all' ? '全部' : categoryLabels[cat as Activity['category']]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activity timeline */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              沒有符合條件的活動
            </div>
          ) : (
            years.map((year) => (
              <div key={year} className="mb-12">
                {/* Year header */}
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-3xl font-black text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    {year}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                  <span className="text-xs text-gray-500">{grouped[year].length} 個活動</span>
                </div>

                {/* Activities */}
                <div className="relative pl-6 border-l border-white/10 space-y-6">
                  {grouped[year].map((activity, i) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[1.625rem] top-4 w-3 h-3 rounded-full bg-[oklch(0.12_0.01_260)] border-2 border-purple-500/60" />

                      <div className="glass-card rounded-xl p-5 hover:border-purple-500/30 transition-all duration-300 group">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span
                            className={`px-2.5 py-1 text-xs font-medium rounded-full border ${categoryColors[activity.category]}`}
                          >
                            {categoryLabels[activity.category]}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar size={12} />
                            {activity.date}
                          </div>
                        </div>

                        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
