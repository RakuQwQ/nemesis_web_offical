// NEMESIS About Section — Obsidian Chronicle Design
// Stats, description, and tabbed mission section

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Hammer, MapPin } from 'lucide-react';

const ABOUT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663523994091/QRnbKXe9gP54xWfeQLYjE4/nemesis-about-bg-YqH4sTcwZ4CaYboqFoRdQY.webp';

const stats = [
  { icon: Users, value: 600, suffix: '+', label: '公會成員' },
  { icon: Hammer, value: 30, suffix: '+', label: '完成項目' },
  { icon: MapPin, value: 'HK', suffix: '', label: '地區' },
];

const missions = [
  {
    id: 'serve',
    label: '服務社羣',
    icon: '⚔️',
    title: '服務社羣',
    description:
      'NEMESIS 致力為香港 Minecraft 玩家提供優質的遊戲環境。我們維護穩定的伺服器、組織精彩的活動，並提供友善的社群支援，讓每位成員都能享受最佳的 Minecraft 體驗。',
    highlights: ['穩定的生存伺服器', '定期舉辦活動', '友善的社群環境'],
  },
  {
    id: 'creativity',
    label: '推廣創意',
    icon: '🎨',
    title: '推廣創意',
    description:
      '我們相信 Minecraft 是一個無限創意的平台。NEMESIS 積極舉辦建築比賽、創意挑戰，並支持成員的創作項目，鼓勵每位玩家發揮想像力，創造獨特的 Minecraft 作品。',
    highlights: ['建築比賽', '創意挑戰', '作品展覽'],
  },
  {
    id: 'connect',
    label: '連結圈子',
    icon: '🌐',
    title: '連結圈子',
    description:
      'NEMESIS 不僅是一個公會，更是連結香港 Minecraft 玩家的橋樑。我們與其他伺服器、創作者合作，共同建立一個更緊密的香港 Minecraft 生態圈。',
    highlights: ['跨伺服器合作', '創作者支援', '社群活動'],
  },
];

function CountUp({ target, suffix }: { target: number | string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || typeof target !== 'number') return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
      {typeof target === 'number' ? count : target}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('serve');
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const activeMission = missions.find((m) => m.id === activeTab)!;

  return (
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${ABOUT_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.01_260)] via-[oklch(0.14_0.012_260/0.95)] to-[oklch(0.12_0.01_260)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">About Us</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            關於 NEMESIS
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            NEMESIS 是由一群熱愛 Minecraft 的香港玩家共同建立的公會，自 2021 年創立以來，
            持續為香港 Minecraft 社群提供優質的遊戲體驗與社群連結。
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card rounded-xl p-6 text-center group hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-4xl font-black text-white mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Tab buttons */}
          <div>
            <h3
              className="text-2xl font-bold text-white mb-8"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              公會使命
            </h3>
            <div className="space-y-3">
              {missions.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-200 ${
                    activeTab === m.id
                      ? 'bg-purple-500/20 border border-purple-500/40 text-white'
                      : 'bg-white/5 border border-white/5 text-gray-400 hover:bg-white/8 hover:text-gray-300'
                  }`}
                >
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <div className="font-semibold">{m.label}</div>
                    {activeTab === m.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-purple-400 mt-0.5"
                      >
                        查看詳情
                      </motion.div>
                    )}
                  </div>
                  {activeTab === m.id && (
                    <div className="ml-auto w-1.5 h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="text-4xl mb-4">{activeMission.icon}</div>
            <h4
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {activeMission.title}
            </h4>
            <p className="text-gray-400 leading-relaxed mb-6">{activeMission.description}</p>
            <div className="space-y-2">
              {activeMission.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
