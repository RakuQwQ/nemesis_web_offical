// NEMESIS Join Section — Obsidian Chronicle Design
// 3 cards: server IP, Discord, email + guild rules

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, MessageCircle, Mail, Shield } from 'lucide-react';

const joinCards = [
  {
    icon: Server,
    title: '遊戲伺服器',
    subtitle: 'Minecraft Server',
    value: 'mc.nemesis.wiki',
    description: '加入我們的 Minecraft 生存伺服器，與公會成員一起冒險建設。',
    action: '複製 IP',
    color: 'from-emerald-500/20 to-emerald-900/20',
    borderColor: 'hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20',
  },
  {
    icon: MessageCircle,
    title: 'Discord 伺服器',
    subtitle: 'Community Hub',
    value: 'discord.gg/VdvBegG6ax',
    description: '加入我們的 Discord 伺服器，與 500+ 名成員交流、參與活動。',
    action: '加入 Discord',
    color: 'from-[#5865F2]/20 to-[#5865F2]/5',
    borderColor: 'hover:border-[#5865F2]/40',
    iconColor: 'text-[#5865F2]',
    iconBg: 'bg-[#5865F2]/20',
    href: 'https://discord.gg/VdvBegG6ax',
  },
  {
    icon: Mail,
    title: '聯絡我們',
    subtitle: 'Contact',
    value: 'contact@nemesis.wiki',
    description: '有任何問題或合作意向，歡迎透過電郵聯絡公會管理層。',
    action: '發送郵件',
    color: 'from-purple-500/20 to-purple-900/20',
    borderColor: 'hover:border-purple-500/40',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/20',
    href: 'mailto:contact@nemesis.wiki',
  },
];

const rules = [
  {
    title: '互相尊重',
    lines: [
      '公會希望每位玩家都可以得到尊重，所以請以你希望被對待的方式對待別人！',
      '請勿作出種族歧視、仇恨言論或人身攻擊相關行為',
      '同時亦請勿讓網絡上的事情影響到成員的現實生活',
    ],
  },
  {
    title: '建設性評論',
    lines: [
      '鼓勵社羣成員提供建設性評論，以促進成長和學習！',
      '請勿貶低、侮辱或不尊重他人努力的成果！',
      '請勿將網絡世界的爭執帶至現實世界',
      '若發生爭吵事件，請盡快找尋 @公會接待員',
    ],
  },
  {
    title: '嚴禁洗版',
    lines: ['禁止成員洗板，令其他成員難以爬文。'],
  },
  {
    title: '請留意頻道標題',
    lines: [
      '公會把不同話題分成不同的頻道，希望大家可以在適當的地方討論，令其他成員都可以加入討論。',
      '無關頻道的訊息可能會被管理員刪走，以維持良好的交流討論體驗！',
    ],
  },
  {
    title: '宣傳及商業行為限制',
    lines: ['公會希望宣傳相關內容只出現於宣傳區。'],
  },
  {
    title: '一切規條都由團長決定',
    lines: [
      '為了應付不同時候的需求，團長會不時更新規條哦～',
      '違反規定的訊息及成員會被處理哦 >w<',
    ],
  },
];

export default function JoinSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleCopyIP = () => {
    navigator.clipboard.writeText('mc.nemesis.wiki');
  };

  return (
    <section id="join" ref={sectionRef} className="py-24 bg-[oklch(0.14_0.012_260)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">Join Us</span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500" />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            加入我們
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            成為 NEMESIS 公會的一員，與香港最活躍的 Minecraft 社群一起冒險。
          </p>
        </motion.div>

        {/* Join cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {joinCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`glass-card rounded-2xl p-6 border border-white/10 ${card.borderColor} transition-all duration-300 hover:-translate-y-1 group bg-gradient-to-br ${card.color}`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.iconBg} mb-5`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>

              <div className="mb-1">
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="text-xs text-gray-500">{card.subtitle}</p>
              </div>

              <p className="text-sm font-mono text-gray-300 bg-white/5 rounded-lg px-3 py-2 my-3 break-all">
                {card.value}
              </p>

              <p className="text-sm text-gray-400 mb-5 leading-relaxed">{card.description}</p>

              {card.href ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    card.href.includes('discord')
                      ? 'bg-[#5865F2] hover:bg-[#4752C4] text-white'
                      : 'bg-purple-500/30 hover:bg-purple-500/50 text-purple-300'
                  }`}
                >
                  {card.action}
                </a>
              ) : (
                <button
                  onClick={handleCopyIP}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-emerald-500/30 hover:bg-emerald-500/50 text-emerald-300 transition-all duration-200"
                >
                  {card.action}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Guild Rules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h3
              className="text-xl font-bold text-white"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              公會規條
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-purple-400 font-bold">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{rule.title}</p>
                  <ul className="space-y-0.5">
                    {rule.lines.map((line, j) => (
                      <li key={j} className="text-sm text-gray-400 leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
