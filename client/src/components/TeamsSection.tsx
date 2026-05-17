// NEMESIS Teams Section — Obsidian Chronicle Design
// Animated carousel of 4 team cards

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight, Users, ArrowRight } from 'lucide-react';
import { teams } from '@/lib/data';

const allCards = [
  ...teams,
  {
    id: 0,
    slug: '',
    name: '更多',
    nameEn: 'Coming Soon',
    tier: 'Gamma' as const,
    memberCount: 0,
    description: '更多團隊即將加入，敬請期待！',
    longDescription: '',
    color: 'from-gray-600 to-gray-900',
    image: '',
    responsibilities: [],
  },
];

export default function TeamsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const prev = () => setCurrent((c) => (c === 0 ? allCards.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === allCards.length - 1 ? 0 : c + 1));

  const tierColors: Record<string, string> = {
    Alpha: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    Beta: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    Gamma: 'text-gray-400 bg-gray-500/20 border-gray-500/30',
  };

  return (
    <section id="teams" ref={sectionRef} className="py-24 bg-[oklch(0.14_0.012_260)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Our Teams</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            公會團隊
          </h2>
        </motion.div>

        {/* Desktop: Grid view */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {allCards.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <TeamCard team={team} tierColors={tierColors} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <TeamCard team={allCards[current]} tierColors={tierColors} />
            </motion.div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {allCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-purple-400 w-6' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCard({ team, tierColors }: { team: typeof allCards[0]; tierColors: Record<string, string> }) {
  const isPlaceholder = team.id === 0;

  if (isPlaceholder) {
    return (
      <Link href="/more-teams" className="block h-full">
        <div className="glass-card rounded-2xl p-6 h-full min-h-[320px] flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-purple-500/10 transition-colors">
            <span className="text-3xl">✨</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
            更多
          </h3>
          <p className="text-gray-500 text-sm mb-4">NEMESIS 歡迎所有對 Minecraft 項目有興趣的人加入，組成新團。</p>
          <span className="text-xs text-purple-400 flex items-center gap-1">了解更多 <ArrowRight size={12} /></span>
        </div>
      </Link>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden group hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {team.image ? (
          <img
            src={team.image}
            alt={team.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${team.color}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.01_260)] via-transparent to-transparent" />

        {/* Tier badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${tierColors[team.tier]}`}>
            {team.tier}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-xl font-bold text-white mb-1"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          {team.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{team.nameEn}</p>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Users size={14} />
          <span>{team.memberCount} 名成員</span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
          {team.description}
        </p>

        <Link
          href={`/group/${team.id}`}
          className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors group/link"
        >
          查看詳情
          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
