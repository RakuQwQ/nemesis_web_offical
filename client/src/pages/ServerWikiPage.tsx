// NEMESIS Server Wiki Page — Obsidian Chronicle Design
// Hong Kong Minecraft server directory

import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Server, Wifi, WifiOff, Clock, Tag, Copy, Check, EyeOff, Pin, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 12;
import { servers } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const statusConfig = {
  active: { label: '運行中', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', icon: Wifi },
  inactive: { label: '已關閉', color: 'text-red-400 bg-red-500/20 border-red-500/30', icon: WifiOff },
  seasonal: { label: '季節性', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30', icon: Clock },
};

const serverTypeIcons: Record<string, string> = {
  '生存': '⛏️',
  '探索': '🗺️',
  'UHC': '⚔️',
  'SMP': '🏘️',
  '創意': '🎨',
  '模組': '🔧',
  '社群': '👥',
  '競技': '🏆',
};

// Fixed tag filters
const TAG_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '運行中' },
  { key: 'seasonal', label: '季節性' },
  { key: 'public', label: '公開' },
  { key: 'private', label: '非公開' },
] as const;

type TagFilter = typeof TAG_FILTERS[number]['key'];

// Shuffle array (Fisher-Yates)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isPrivateIp(ip?: string) {
  return !ip || ip === 'NA' || ip.toLowerCase() === 'disclosed';
}

function IpBadge({ ip }: { ip?: string }) {
  const [copied, setCopied] = useState(false);
  const hidden = isPrivateIp(ip);

  const handleCopy = () => {
    if (hidden || !ip) return;
    navigator.clipboard.writeText(ip).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (hidden) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 border border-white/10 rounded-lg px-3 py-2 mb-3">
        <EyeOff size={12} />
        未公開
      </div>
    );
  }

  return (
    <button
      onClick={handleCopy}
      title="點擊複製 IP"
      className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 mb-3 w-full hover:bg-emerald-500/20 transition-colors cursor-pointer group"
    >
      <Server size={12} className="shrink-0" />
      <span className="flex-1 text-left truncate">{ip}</span>
      {copied ? (
        <Check size={12} className="shrink-0 text-emerald-300" />
      ) : (
        <Copy size={12} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}

export default function ServerWikiPage() {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<TagFilter>('all');
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Pinned first, then randomized
  const shuffled = useMemo(() => {
    const pinned = servers.filter((s) => s.pinned);
    const rest = shuffle(servers.filter((s) => !s.pinned));
    return [...pinned, ...rest];
  }, []);

  const filtered = useMemo(() => {
    setPage(1);
    const results = shuffled.filter((s) => {
      const matchSearch =
        search === '' ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchTag =
        tagFilter === 'all' ||
        (tagFilter === 'active' && s.status === 'active') ||
        (tagFilter === 'seasonal' && s.status === 'seasonal') ||
        (tagFilter === 'public' && (s.isPublic ?? true)) ||
        (tagFilter === 'private' && !(s.isPublic ?? true));
      return matchSearch && matchTag;
    });
    // Keep pinned at top even after filtering
    return [...results.filter((s) => s.pinned), ...results.filter((s) => !s.pinned)];
  }, [shuffled, search, tagFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p: number) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Server Directory</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            伺服器百科
          </h1>
          <p className="text-gray-400">香港 Minecraft 伺服器目錄，共收錄 {servers.length} 個伺服器</p>
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
                placeholder="搜尋伺服器..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            {/* Tag filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {TAG_FILTERS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTagFilter(t.key)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                    tagFilter === t.key
                      ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                  }`}
                >
                  {t.key !== 'all' && <Tag size={10} />}
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Server grid */}
      <section className="py-12" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">沒有符合條件的伺服器</div>
          ) : (
            <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginated.map((server, i) => {
                const status = statusConfig[server.status];
                const StatusIcon = status.icon;

                return (
                  <motion.div
                    key={server.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="glass-card rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* Server icon & name */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{serverTypeIcons[server.type] || '🌐'}</div>
                      <div className="flex items-center gap-1.5">
                        {server.pinned && (
                          <span className="flex items-center gap-1 px-2 py-1 text-xs rounded-full border text-amber-400 bg-amber-500/20 border-amber-500/30">
                            <Pin size={10} />
                            置頂
                          </span>
                        )}
                        <span className={`flex items-center gap-1.5 px-2 py-1 text-xs rounded-full border ${status.color}`}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                      {server.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded text-gray-400">
                        {server.type}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{server.description}</p>

                    <IpBadge ip={server.ip} />

                    {server.version && (
                      <div className="text-xs text-gray-500 mb-4">版本：{server.version}</div>
                    )}

                    {/* Links */}
                    {(server.discordUrl || server.wikiUrl || server.youtubeUrl || server.threadsUrl || server.instagramUrl) && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {server.discordUrl && (
                          <a href={server.discordUrl} target="_blank" rel="noopener noreferrer"
                            className="px-2.5 py-1 text-xs bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-full hover:bg-indigo-500/30 transition-colors">
                            Discord
                          </a>
                        )}
                        {server.wikiUrl && (
                          <a href={server.wikiUrl} target="_blank" rel="noopener noreferrer"
                            className="px-2.5 py-1 text-xs bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full hover:bg-blue-500/30 transition-colors">
                            Wiki
                          </a>
                        )}
                        {server.youtubeUrl && (
                          <a href={server.youtubeUrl} target="_blank" rel="noopener noreferrer"
                            className="px-2.5 py-1 text-xs bg-red-500/20 border border-red-500/30 text-red-300 rounded-full hover:bg-red-500/30 transition-colors">
                            YouTube
                          </a>
                        )}
                        {server.threadsUrl && (
                          <a href={server.threadsUrl} target="_blank" rel="noopener noreferrer"
                            className="px-2.5 py-1 text-xs bg-gray-500/20 border border-gray-500/30 text-gray-300 rounded-full hover:bg-gray-500/30 transition-colors">
                            Threads
                          </a>
                        )}
                        {server.instagramUrl && (
                          <a href={server.instagramUrl} target="_blank" rel="noopener noreferrer"
                            className="px-2.5 py-1 text-xs bg-pink-500/20 border border-pink-500/30 text-pink-300 rounded-full hover:bg-pink-500/30 transition-colors">
                            Instagram
                          </a>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {server.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded text-gray-500"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} />
                  上一頁
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-8 h-8 text-sm rounded-lg border transition-all ${
                        p === page
                          ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  下一頁
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </section>

      {/* Join Interest */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">有興趣加入？</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-purple-500 to-cyan-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
            登記加入伺服器百科
          </h2>
          <p className="text-gray-400 mb-8">想將你的伺服器收錄到百科？填寫登記表，我們會盡快與你聯絡。</p>
          <a
            href="https://forms.gle/KH14SkfiuVaniV2b7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
          >
            填寫登記表
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
