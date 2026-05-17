// NEMESIS Group Detail Page — Obsidian Chronicle Design

import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Shield, CheckCircle, Crown, Star } from 'lucide-react';
import { teams } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const tierColors: Record<string, { badge: string; glow: string; border: string }> = {
  Alpha: {
    badge: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    glow: 'shadow-purple-500/20',
    border: 'border-purple-500/30',
  },
  Beta: {
    badge: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    border: 'border-cyan-500/30',
  },
  Gamma: {
    badge: 'text-gray-400 bg-gray-500/20 border-gray-500/30',
    glow: 'shadow-gray-500/20',
    border: 'border-gray-500/30',
  },
};

export default function GroupPage() {
  const params = useParams<{ id: string }>();
  const team = teams.find((t) => t.slug === params.id);

  if (!team) {
    return (
      <div className="min-h-screen bg-[oklch(0.12_0.01_260)] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            找不到團隊
          </h1>
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  const colors = tierColors[team.tier];

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${team.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.01_260/0.7)] via-[oklch(0.12_0.01_260/0.85)] to-[oklch(0.12_0.01_260)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              返回首頁
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${colors.badge}`}>{team.tier}</span>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <Users size={14} />
                  {team.memberCount} 名成員
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                {team.name}
              </h1>
              <p className="text-xl text-gray-400 mb-4">{team.nameEn}</p>
              {(team.leader || team.viceLeader) && (
                <div className="flex flex-wrap gap-4 mb-6">
                  {team.leader && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Crown size={14} className="text-yellow-400" />
                      <span className="text-gray-500">團長：</span>{team.leader}
                    </div>
                  )}
                  {team.viceLeader && team.viceLeader !== 'TBD' && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Star size={14} className="text-gray-400" />
                      <span className="text-gray-500">副負責人：</span>{team.viceLeader}
                    </div>
                  )}
                </div>
              )}
              <p className="text-gray-300 text-lg leading-relaxed">{team.longDescription}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`rounded-2xl overflow-hidden shadow-2xl ${colors.glow} border ${colors.border}`}
            >
              {team.image ? (
                <img src={team.image} alt={team.name} className="w-full h-64 lg:h-80 object-cover" />
              ) : (
                <div className={`w-full h-64 lg:h-80 bg-gradient-to-br ${team.color}`} />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles */}
      {team.principles && team.principles.length > 0 && (
        <section className="py-16 bg-[oklch(0.12_0.01_260)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>團隊理念</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {team.principles.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="glass-card rounded-xl p-6 text-center hover:border-yellow-500/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{p.icon}</div>
                  <h3 className="text-white font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 班 structure */}
      {team.bans && team.bans.length > 0 && (
        <section className="py-16 bg-[oklch(0.14_0.012_260)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>班級架構</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.bans.map((ban, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="glass-card rounded-xl p-5 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold">{ban.name}</h3>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{ban.memberCount} 人</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <Crown size={11} className="text-yellow-500/70" />
                    {ban.name}總管：{ban.leader}
                  </div>
                  <p className="text-sm text-gray-400">{ban.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Responsibilities */}
      <section className="py-16 bg-[oklch(0.14_0.012_260)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>職責範圍</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.responsibilities.map((resp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="glass-card rounded-xl p-4 flex items-start gap-3 group hover:border-purple-500/30 transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{resp}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      {team.history && team.history.length > 0 && (
        <section className="py-16 bg-[oklch(0.12_0.01_260)]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>公會歷史</h2>
            </div>
            <div className="relative pl-6 border-l border-white/10 space-y-8">
              {team.history.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="relative"
                >
                  <div className="absolute -left-[1.625rem] top-1.5 w-3 h-3 rounded-full bg-[oklch(0.12_0.01_260)] border-2 border-cyan-500/60" />
                  <div className="glass-card rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                        {h.year} {h.month}
                      </span>
                      <span className="text-sm font-semibold text-white">{h.stage}</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{h.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other teams */}
      <section className="py-16 bg-[oklch(0.12_0.01_260)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Cinzel, serif' }}>其他團隊</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.filter((t) => t.id !== team.id).map((t) => (
              <Link
                key={t.id}
                href={`/group/${t.id}`}
                className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${t.color}`} />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-purple-200 transition-colors">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.memberCount} 名成員</div>
                </div>
                <ArrowLeft className="ml-auto w-4 h-4 text-gray-500 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
            <Link
              href="/more-teams"
              className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 group border-dashed"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-2xl">✨</div>
              <div>
                <div className="font-semibold text-white group-hover:text-purple-200 transition-colors">更多團隊</div>
                <div className="text-xs text-gray-500">了解更多</div>
              </div>
              <ArrowLeft className="ml-auto w-4 h-4 text-gray-500 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
