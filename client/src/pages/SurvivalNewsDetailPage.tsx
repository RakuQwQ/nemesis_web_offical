// NEMI Survival Server — News Detail Page
// Route: /survival-wiki/news/:id

import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categoryColors, categoryLabels } from '@/lib/data';
import { nemiNews } from '@/lib/nemi-news/index';
import { useSeo } from '@/hooks/useSeo';

const SITE_URL = 'https://www.nemesis.wiki';

export default function SurvivalNewsDetailPage() {
  const { id } = useParams<{ id: string }>();

  const item = useMemo(
    () => nemiNews.find((a) => a.id === Number(id)),
    [id],
  );

  // Sidebar: other NEMI news sorted newest first, excluding current
  const related = useMemo(
    () =>
      [...nemiNews]
        .filter((a) => a.id !== Number(id))
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5),
    [id],
  );

  // ── SEO: per-article meta tags ──
  useSeo(
    item
      ? {
          title: item.title,
          description: item.description,
          canonical: `/survival-wiki/news/${item.id}`,
          ogType: 'article',
          publishedTime: item.date,
        }
      : { noIndex: true },
  );

  // ── JSON-LD: NewsArticle structured data ──
  useEffect(() => {
    if (!item) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: item.title,
      description: item.description,
      datePublished: item.date,
      url: `${SITE_URL}/survival-wiki/news/${item.id}`,
      publisher: {
        '@type': 'Organization',
        name: 'NEMESIS',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/img/nemesis_logo_red.png`,
        },
      },
      author: {
        '@type': 'Organization',
        name: 'NEMESIS',
      },
    };

    const id = 'jsonld-newsarticle';
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="text-gray-400 text-lg">找不到該消息。</p>
          <Link
            href="/survival-wiki"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={14} />
            返回生存百科
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const badgeCls = categoryColors[item.category];
  const categoryLabel = categoryLabels[item.category];

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-10 bg-[oklch(0.14_0.012_260)] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">首頁</Link>
            <span>/</span>
            <Link href="/survival-wiki" className="hover:text-gray-300 transition-colors">NEMI 生存伺服器</Link>
            <span>/</span>
            <span className="text-gray-400">最新消息</span>
          </div>

          <Link
            href="/survival-wiki"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回生存百科
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-1 text-xs rounded-full border ${badgeCls}`}>
              {categoryLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar size={11} />
              {item.date}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold text-white leading-snug"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            {item.title}
          </h1>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Main content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 min-w-0"
            >
              <div className="glass-card rounded-2xl p-8">
                <div className="prose prose-invert prose-sm max-w-none
                  prose-headings:font-bold prose-headings:text-white
                  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:first:mt-0
                  prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-blockquote:border-l-cyan-500/50 prose-blockquote:bg-cyan-500/5
                  prose-blockquote:rounded-r-xl prose-blockquote:px-5 prose-blockquote:py-1
                  prose-blockquote:text-cyan-200/80 prose-blockquote:not-italic
                  prose-strong:text-white prose-code:text-cyan-300
                  prose-code:bg-white/10 prose-code:px-1 prose-code:rounded
                  prose-hr:border-white/10"
                >
                  <ReactMarkdown>{item.body}</ReactMarkdown>
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/5">
                    <Tag size={12} className="text-gray-500" />
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>

            {/* Sidebar — other NEMI news */}
            <aside className="lg:w-64 shrink-0">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">
                其他消息
              </h3>
              <div className="space-y-2">
                {related.length === 0 ? (
                  <p className="text-xs text-gray-600">暫無其他消息。</p>
                ) : (
                  related.map((a) => (
                    <Link
                      key={a.id}
                      href={`/survival-wiki/news/${a.id}`}
                      className="block glass-card rounded-xl p-4 hover:border-purple-500/30 transition-all duration-200 hover:-translate-y-0.5 group"
                    >
                      <p className="text-sm text-white group-hover:text-purple-200 transition-colors line-clamp-2 leading-snug mb-1">
                        {a.title}
                      </p>
                      <p className="text-xs text-gray-500">{a.date}</p>
                    </Link>
                  ))
                )}
              </div>

              <Link
                href="/survival-wiki#news"
                className="inline-flex items-center gap-1.5 mt-4 text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft size={11} />
                查看全部消息
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
