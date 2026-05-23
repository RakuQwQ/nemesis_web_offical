// NEMESIS More Teams Page — 更多團隊

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Users, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';
import { DISCORD_INVITE_URL } from '@/lib/links';

const benefits = [
  { icon: '✨', title: '培養技能', items: ['獲得相互學習和練習的機會', '在友善和支持的環境中學習和成長', '有機會和他人工作，發展合作能力'] },
  { icon: '👥', title: '團隊協作', items: ['與志同道合的玩家合作，共同完成大型項目', '建立人脈，認識更多 Minecraft 愛好者'] },
  { icon: '🛡️', title: '資源支援', items: ['使用公會提供的資源和設施', '協作公會舉辦的各種活動和比賽'] },
];

export default function MoreTeamsPage() {
  useSeo({
    title: '更多團隊',
    description: 'NEMESIS 公會團隊架構介紹 — 了解熾級、生存團、初見團等各大團隊，歡迎組成新團。',
    canonical: '/more-teams',
    keywords: 'NEMESIS 團隊, 熾級大宅, 生存團, 初見團, Minecraft 公會架構, 加入 NEMESIS',
  });

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-[oklch(0.14_0.012_260)] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回首頁
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Special Interest Groups</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
            更多團隊
          </h1>
          <p className="text-gray-400 max-w-xl">
            NEMESIS 歡迎所有對 Minecraft 項目有興趣的人加入，組成新團。
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 text-center border-dashed border-2 border-purple-500/20 mb-16"
          >
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
              有想法？組成你的團！
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-6">
              NEMESIS 的架構由公會 → 團 → 班組成。每個團都有自己的主題，每個班負責特定任務。
              如果你對某個 Minecraft 項目有熱情，歡迎聯絡我們，一起組成新的團隊。
            </p>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-medium transition-colors"
            >
              <Users size={16} />
              加入 Discord 了解更多
            </a>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>加入好處</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="glass-card rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h3 className="text-white font-bold mb-3">{b.title}</h3>
                  <ul className="space-y-2">
                    {b.items.map((item, j) => (
                      <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Interest */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">有興趣加入？</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-purple-500 to-pink-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
            登記組成新團隊
          </h2>
          <p className="text-gray-400 mb-8">有想法想組成新團？填寫登記表，我們會盡快與你聯絡。</p>
          <a
            href="https://forms.gle/KH14SkfiuVaniV2b7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
          >
            填寫登記表
          </a>
        </div>
      </section>

      {/* Back to teams */}
      <section className="py-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h3 className="text-lg font-bold text-white mb-4">現有團隊</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/group/1', label: '熾級' },
              { href: '/group/2', label: '生存團' },
              { href: '/group/3', label: '初見團' },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-4 py-2 glass-card rounded-lg text-sm text-gray-300 hover:text-white hover:border-purple-500/30 transition-all duration-200"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
