// NEMESIS Creator Wiki Page — temporarily unpublished

import { Link } from 'wouter';
import { ArrowLeft, Construction } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';

export default function CreatorWikiPage() {
  useSeo({
    title: '創作者百科',
    description: 'NEMESIS 創作者百科 — 即將推出。收錄公會旗下 VTuber 及 Minecraft 創作者資訊。',
    canonical: '/creator-wiki',
    keywords: 'NEMESIS VTuber, 香港 Minecraft 創作者, NEMESIS 創作者, 香港 VTuber Minecraft',
  });

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

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
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Creator Directory</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            創作者百科
          </h1>
        </div>
      </section>

      <section className="py-24 flex items-center justify-center">
        <div className="text-center px-6">
          <Construction size={48} className="text-yellow-500/60 mx-auto mb-6" />
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            即將推出
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            創作者百科正在整理中，敬請期待。
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
