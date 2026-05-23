// NEMI Survival Server — News Gallery Page
// Route: /survival-wiki/news

import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, ChevronRight, Newspaper } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { nemiNews } from '@/lib/nemi-news/index';
import { useSeo } from '@/hooks/useSeo';

const PAGE_SIZE = 9;

export default function SurvivalNewsGalleryPage() {
  useSeo({
    title: 'NEMI 新聞',
    description: `NEMI 生存伺服器最新消息 — 共 ${nemiNews.length} 篇報導，涵蓋伺服器活動、社群消息及更新公告。NEMESIS Minecraft 公會官方新聞。`,
    canonical: '/survival-wiki/news',
    keywords: 'NEMI 新聞, NEMI 最新消息, NEMESIS Minecraft 公告, 生存伺服器更新, 香港 Minecraft 新聞',
  });

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const sorted = useMemo(
    () => [...nemiNews].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  const filtered = useMemo(() => {
    setPage(1);
    if (!search.trim()) return sorted;
    const q = search.toLowerCase();
    return sorted.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q),
    );
  }, [sorted, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-[oklch(0.14_0.012_260)] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">首頁</Link>
            <span>/</span>
            <Link href="/survival-wiki" className="hover:text-gray-300 transition-colors">NEMI 生存伺服器</Link>
            <span>/</span>
            <span className="text-gray-400">NEMI 新聞</span>
          </div>

          <Link
            href="/survival-wiki"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回生存百科
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase flex items-center gap-1.5">
              <Newspaper size={12} />
              NEMI News
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            NEMI 新聞
          </h1>
          <p className="text-gray-400">共 {nemiNews.length} 篇報導</p>
        </div>
      </section>

      {/* Search */}
      <div className="sticky top-16 z-40 bg-[oklch(0.12_0.01_260/0.95)] backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="搜尋新聞..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">沒有符合條件的新聞。</div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/survival-wiki/news/${item.id}`}
                      className="flex flex-col h-full glass-card rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      {/* Date */}
                      <p className="text-xs text-gray-500 mb-3">{item.date}</p>

                      {/* Title */}
                      <h2 className="text-base font-semibold text-white leading-snug mb-3 group-hover:text-purple-200 transition-colors line-clamp-3">
                        {item.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1">
                        {item.description}
                      </p>

                      {/* Read more */}
                      <div className="flex items-center gap-1 mt-4 text-xs text-purple-400 group-hover:text-purple-300 transition-colors">
                        閱讀全文
                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    上一頁
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 text-sm rounded-lg border transition-all ${
                        p === page
                          ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    下一頁
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
