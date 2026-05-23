// NEMESIS Survival Server Wiki Page — NEMI
// Sections: Server Info, Rules, Announcements, NEMI News, Server Events, Culture, World Info, FAQ

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowLeft,
  Server,
  Copy,
  Check,
  ChevronDown,
  Shield,
  Flame,
  Newspaper,
  HelpCircle,
  Globe,
  BookOpen,
  Info,
  ExternalLink,
  ChevronRight,
  Megaphone,
  CalendarDays,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { activities, categoryColors, categoryLabels } from '@/lib/data';
import { nemiNews } from '@/lib/nemi-news/index';
import { announcements, type Announcement } from '@/lib/nemi-announcements';
import { useSeo } from '@/hooks/useSeo';
import { DISCORD_INVITE_URL } from '@/lib/links';

// ── Data ──────────────────────────────────────────────────────────────────────

interface RuleCategory {
  icon: string;
  category: string;
  items: string[];
}

interface CultureItem {
  icon: string;
  title: string;
  description: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const SERVER_IP = 'mc.nemesis.wiki';
const SERVER_VERSION = '1.20.10';

const rules: RuleCategory[] = [
  {
    icon: '🚫',
    category: '1. 請勿使用外掛',
    items: [
      '請勿使用 Cheat Client',
      '請勿使用 X-ray、Killaura 等破壞遊戲平衡及體驗的模組',
      '請勿利用伺服器的漏洞',
    ],
  },
  {
    icon: '🤝',
    category: '2. 請尊重其他玩家',
    items: [
      '保持禮貌：避免使用侮辱性、攻擊性言語，即使開玩笑也要注意分寸',
      '理性處理爭執：與其他玩家有異議時，請保持冷靜並適當時尋求管理員協助',
      '尊重私隱：不得人肉搜索，不得公開他人個人資訊（IP、住址、真實身份等，即使對方個人資訊為公開）',
      '尊重字眼：禁止使用歧視性字眼（包括但不限於種族、性別、宗教、政治立場等）',
      '洗版禁止：請勿反覆傳送過長、重複性高的內容，遮蔽其他玩家的視線',
    ],
  },
  {
    icon: '⚔️',
    category: '3. 玩家行為相關',
    items: [
      '不論直接或間接方式，禁止擊殺其他玩家',
      '嚴禁擅自進入他人建築範圍',
      '禁止偷竊',
      '未經許可，請勿擅自使用他人的農場、自動化設施或資源點',
      '未經許可，禁止破壞其他玩家建築',
      '禁止濫用紅石機械造成伺服器卡頓或崩潰（發現漏洞請立即向管理員回報，不得私自利用或散佈）',
      '使用公共資源設施時請遵守使用規則並補充消耗品',
    ],
  },
  {
    icon: '❤️',
    category: '4. 開心遊玩',
    items: [
      '感謝你支持 NEMI！',
      '好玩的遊戲體驗需要大家保持友善 >w<//',
      '有任何問題隨時在 Discord #【🧭】指南針 開 Ticket 尋求協助',
    ],
  },
];

const culture: CultureItem[] = [
  {
    icon: '🏛️',
    title: '聯盟與公會系統',
    description:
      '玩家可自行組建聯盟或加入公會，透過外交、合作或競爭發展勢力，完成任務與活動提升排名。NEMI 的政治生態完全由玩家共同塑造。',
  },
  {
    icon: '⚖️',
    title: 'Ruler 制度',
    description:
      'Ruler 是伺服器的管理員，由生存團成員擔任。他們負責維護伺服器秩序，同時也作為伺服器內的 NPC 角色參與遊戲。',
  },
  {
    icon: '🗺️',
    title: '探索精神',
    description:
      '鼓勵玩家積極探索世界，開拓新疆土，發現隱藏資源。每一片土地都是待書寫的故事。',
  },
  {
    icon: '🤝',
    title: '互助社群',
    description:
      '我們重視玩家之間的合作與互動。無論是資源交換、建築協作，還是組隊冒險，伺服器提供豐富的社群互動空間。',
  },
  {
    icon: '📣',
    title: '重視玩家聲音',
    description:
      '伺服器積極聆聽玩家意見，定期收集反饋並作出改善。每位玩家的聲音都是推動伺服器進步的動力。',
  },
  {
    icon: '📜',
    title: '歷史傳承',
    description:
      '伺服器鼓勵玩家記錄自己的故事與建設。每個聯盟、每座城市都承載著獨一無二的歷史。',
  },
];

const faq: FaqItem[] = [
  {
    q: '如何加入 NEMI 伺服器？',
    a: '加入我們的 Discord 伺服器後，依照申請流程填寫入伺申請。審核通過後，你將會收到伺服器 IP 及白名單資訊。',
  },
  {
    q: '伺服器支援哪個版本的 Minecraft？',
    a: `目前伺服器版本為 ${SERVER_VERSION}（Java Edition）。請確保你的遊戲版本相符。`,
  },
  {
    q: '如何回報違規玩家？',
    a: '請在 Discord 的 #申訴回報 頻道提交回報，附上截圖及相關證據，Ruler 會盡快跟進。',
  },
  {
    q: '可以使用哪些 Mod / 外掛？',
    a: '只允許使用純視覺類 Mod（如光影、高清材質）及小地圖 Mod。任何提供不公平遊戲優勢的 Mod 均被禁止。',
  },
  {
    q: '如何申請領地保護？',
    a: '（待填入）',
  },
  {
    q: '伺服器有哪些特色系統？',
    a: '伺服器設有公會系統、微政治系統及定期活動。詳情請參考伺服器Discord內的公告頻道。',
  },
];

interface WorldDimension {
  icon: string;
  title: string;
  titleEn: string;
  badge: string;
  badgeColor: string;
  gradient: string;
  features: string[];
}

const worldSections: WorldDimension[] = [
  {
    icon: '🌍',
    title: '主世界',
    titleEn: 'Overworld',
    badge: '無邊際',
    badgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    gradient: 'from-emerald-900/60 to-cyan-900/40',
    features: [
      '無邊際地圖，自由建設及探索',
      '熾級大宅（Seraphim HQ）',
      '生存團 Ruler 基地',
      '玩家聯盟領地及自建建築',
      '出生點（Spawn）位於主世界',
    ],
  },
  {
    icon: '🔥',
    title: '地獄',
    titleEn: 'The Nether',
    badge: '標準地獄',
    badgeColor: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
    gradient: 'from-red-900/60 to-orange-900/40',
    features: [
      '標準原版地獄維度',
      '豐富地獄資源（靈魂沙、螢石、地獄磚等）',
      '地獄堡壘及遺跡探索',
      '快速交通：地獄坐標比例 1:8',
    ],
  },
  {
    icon: '🐉',
    title: '終界',
    titleEn: 'The End',
    badge: '標準終界',
    badgeColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    gradient: 'from-purple-900/60 to-indigo-900/40',
    features: [
      '標準原版終界維度',
      '終界城及鞘翅探索',
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function IpCopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title="點擊複製 IP"
      className="inline-flex items-center gap-2 font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 hover:bg-emerald-500/20 transition-colors group"
    >
      <Server size={14} className="shrink-0" />
      <span>{SERVER_IP}</span>
      {copied ? (
        <Check size={14} className="shrink-0 text-emerald-300" />
      ) : (
        <Copy size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}

function SectionHeader({ icon, label, title }: { icon: React.ReactNode; label: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
        <span className="text-purple-400 text-xs font-medium tracking-widest uppercase flex items-center gap-1.5">
          {icon}
          {label}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>
        {title}
      </h2>
    </div>
  );
}

function RulesSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="rules" className="py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeader icon={<Shield size={12} />} label="Rules" title="伺服器守則" />
        <div className="space-y-3">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-3 font-medium text-white">
                  <span className="text-lg">{rule.icon}</span>
                  {rule.category}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="px-5 pb-5 space-y-2 border-t border-white/5 pt-4">
                      {rule.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Notification reminder */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-5 py-4"
        >
          <Megaphone size={15} className="text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-sm text-cyan-200/80 leading-relaxed">
            <span className="font-semibold text-cyan-300">獲取伺服器通知：</span>
            伺服器不時有更新及宣佈，請留意 Discord 的{' '}
            <span className="font-mono text-cyan-300">#【📯】生存伺服器宣佈</span> 以獲取最新通知！
          </p>
        </motion.div>

        {/* Consequences */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-3 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4"
        >
          <AlertTriangle size={15} className="text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <p className="font-semibold text-red-300 mb-1">違反規條後果！</p>
            <p className="text-red-200/70">
              違反規條者將會面臨嚴重的處罰。仇恨言論、威脅、人肉搜索將導致{' '}
              <span className="font-semibold text-red-300">永久封禁且不設上訴</span>。
            </p>
          </div>
        </motion.div>

        {/* Footnotes */}
        <div className="mt-4 space-y-1">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <Info size={12} />
            伺服器守則會隨時間及需要更改，請留意 Discord 公告。
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <Info size={12} />
            規則未寫的不代表伺服器容許；一切規則解釋權由團長擁有。
          </p>
        </div>
      </div>
    </section>
  );
}

function CultureSection() {
  return (
    <section id="culture" className="py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeader icon={<Flame size={12} />} label="Culture" title="伺服器文化" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {culture.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-card rounded-xl p-5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Announcement type config ──────────────────────────────────────────────────
const announcementConfig: Record<Announcement['type'], { icon: React.ElementType; badge: string; label: string }> = {
  maintenance: { icon: RefreshCw,     badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', label: '維護' },
  update:      { icon: Info,          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',       label: '更新' },
  notice:      { icon: AlertTriangle, badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30', label: '通知' },
};

// ── Announcements (最新消息) ──────────────────────────────────────────────────
function AnnouncementsSection() {
  const [openId, setOpenId] = useState<number | null>(announcements[0]?.id ?? null);
  const sorted = useMemo(() => [...announcements].sort((a, b) => b.date.localeCompare(a.date)), []);

  return (
    <section id="announcements" className="py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeader icon={<Megaphone size={12} />} label="Announcements" title="最新消息" />
        {sorted.length === 0 ? (
          <p className="text-gray-500 text-sm">暫無公告。</p>
        ) : (
          <div className="space-y-3">
            {sorted.map((item, i) => {
              const cfg = announcementConfig[item.type];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="glass-card rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`shrink-0 flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border ${cfg.badge}`}>
                        <Icon size={10} />
                        {cfg.label}
                      </span>
                      <span className="font-medium text-white text-sm truncate">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-gray-500 hidden sm:block">{item.date}</span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${openId === item.id ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-3 border-t border-white/5">
                          <p className="text-sm text-gray-300 leading-relaxed">{item.content}</p>
                          <p className="mt-3 text-xs text-gray-500">{item.date}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
        <p className="mt-5 text-xs text-gray-500 flex items-center gap-1.5">
          <Megaphone size={12} />
          伺服器維護、IP 變更及規則更新等重要通知。
        </p>
      </div>
    </section>
  );
}

// ── NEMI News (blog posts) ────────────────────────────────────────────────────
const NEMI_NEWS_PREVIEW = 3;

function NemiNewsSection() {
  const sorted = useMemo(() => [...nemiNews].sort((a, b) => b.date.localeCompare(a.date)), []);
  const preview = sorted.slice(0, NEMI_NEWS_PREVIEW);

  return (
    <section id="nemi-news" className="py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeader icon={<Newspaper size={12} />} label="NEMI News" title="NEMI 新聞" />
        {preview.length === 0 ? (
          <p className="text-gray-500 text-sm">暫無新聞。</p>
        ) : (
          <div className="space-y-3">
            {preview.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Link
                  href={`/survival-wiki/news/${item.id}`}
                  className="flex items-center justify-between gap-4 glass-card rounded-xl px-5 py-4 hover:border-purple-500/30 transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <div className="min-w-0">
                    <span className="font-medium text-white text-sm truncate group-hover:text-purple-200 transition-colors block">
                      {item.title}
                    </span>
                    <span className="text-xs text-gray-500 mt-0.5 block line-clamp-1">{item.description}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-500 hidden sm:block">{item.date}</span>
                    <ChevronRight size={14} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* See all button */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <Newspaper size={12} />
            顯示最新 {Math.min(NEMI_NEWS_PREVIEW, sorted.length)} / {sorted.length} 篇
          </p>
          <Link
            href="/survival-wiki/news"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 rounded-lg transition-all duration-200 group"
          >
            查看所有新聞
            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Server Events (events from data.ts tagged 'nemi') ────────────────────────
function ServerEventsSection() {
  const events = useMemo(
    () =>
      activities
        .filter((a) => a.tags?.includes('nemi'))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  return (
    <section id="events" className="py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeader icon={<CalendarDays size={12} />} label="Server Events" title="伺服器活動" />
        {events.length === 0 ? (
          <p className="text-gray-500 text-sm">暫無活動記錄。</p>
        ) : (
          <div className="space-y-2">
            {events.map((item, i) => {
              const badgeCls = categoryColors[item.category];
              const label = categoryLabels[item.category];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="glass-card rounded-xl px-5 py-4 flex items-center gap-4"
                >
                  <span className={`shrink-0 px-2 py-0.5 text-xs rounded-full border ${badgeCls}`}>{label}</span>
                  <span className="flex-1 text-sm text-white">{item.title}</span>
                  <span className="text-xs text-gray-500 hidden sm:block shrink-0">{item.date}</span>
                </motion.div>
              );
            })}
          </div>
        )}
        <div className="mt-5 flex items-center gap-2">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <CalendarDays size={12} />
            顯示所有標記為 NEMI 的活動。
          </p>
          <Link
            href="/activities"
            className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            查看全部活動
            <ExternalLink size={10} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeader icon={<HelpCircle size={12} />} label="FAQ" title="常見問題" />
        <div className="space-y-3">
          {faq.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors gap-4"
              >
                <span className="font-medium text-white text-sm">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 shrink-0 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pt-2 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorldSection() {
  return (
    <section id="world" className="py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeader icon={<Globe size={12} />} label="World Info" title="世界資訊" />
        <div className="grid sm:grid-cols-3 gap-6">
          {worldSections.map((dim, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Dimension banner */}
              <div className={`relative h-28 bg-gradient-to-br ${dim.gradient} flex items-center justify-center`}>
                <span className="text-5xl drop-shadow-lg">{dim.icon}</span>
                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${dim.badgeColor}`}>
                    {dim.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-lg font-bold text-white mb-0.5"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {dim.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{dim.titleEn}</p>

                <ul className="space-y-2">
                  {dim.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section nav anchors
const TOC = [
  { href: '#server-info', label: '伺服器資訊' },
  { href: '#rules', label: '規則' },
  { href: '#announcements', label: '最新消息' },
  { href: '#nemi-news', label: 'NEMI 新聞' },
  { href: '#events', label: '伺服器活動' },
  { href: '#culture', label: '文化' },
  { href: '#world', label: '世界資訊' },
  { href: '#faq', label: '常見問題' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SurvivalWikiPage() {
  useSeo({
    title: 'NEMI 生存伺服器',
    description: 'NEMESIS 官方 Minecraft 生存伺服器 NEMI — 公會系統、微政治、定期活動。伺服器 IP：mc.nemesis.wiki，版本 Java 1.20.10，白名單制。',
    canonical: '/survival-wiki',
    keywords: 'NEMI 生存伺服器, mc.nemesis.wiki, 香港 Minecraft 生存伺服器, Minecraft SMP 香港, 公會系統 Minecraft, 白名單伺服器',
  });

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-[oklch(0.14_0.012_260)] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回首頁
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500" />
            <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">Survival Wiki</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            NEMI 生存伺服器
          </h1>
          <p className="text-gray-400 mb-6">
            NEMESIS 官方生存伺服器 — 公會系統、微政治、定期活動
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 items-center">
            <IpCopyButton />
            <span className="flex items-center gap-1.5 px-3 py-2 text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              運行中
            </span>
            <span className="px-3 py-2 text-xs bg-white/5 border border-white/10 text-gray-400 rounded-lg">
              Java {SERVER_VERSION}
            </span>
          </div>
        </div>
      </section>

      {/* Sticky page TOC */}
      <nav className="sticky top-16 z-40 bg-[oklch(0.12_0.01_260/0.95)] backdrop-blur-xl border-b border-white/5 py-3 overflow-x-auto">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-1 min-w-max">
            <BookOpen size={13} className="text-gray-500 mr-2 shrink-0" />
            {TOC.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Server Info */}
      <section id="server-info" className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeader icon={<Server size={12} />} label="Server Info" title="伺服器資訊" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: '伺服器 IP', value: SERVER_IP, mono: true, href: undefined },
              { label: '版本', value: `Java ${SERVER_VERSION}`, mono: false, href: undefined },
              { label: '類型', value: '生存、微政治', mono: false, href: undefined },
              { label: '管理團隊', value: '生存團 (NEMESIS)', mono: false, href: undefined },
              { label: '開服日期', value: '2026 年 1 月 7 日', mono: false, href: undefined },
              { label: '申請方式', value: 'Discord 申請', mono: false, href: DISCORD_INVITE_URL },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                {stat.href ? (
                  <a
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    {stat.value}
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <p className={`text-white font-medium ${stat.mono ? 'font-mono text-emerald-400 text-sm' : ''}`}>
                    {stat.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <RulesSection />
      <AnnouncementsSection />
      <NemiNewsSection />
      <ServerEventsSection />
      <CultureSection />
      <WorldSection />
      <FaqSection />

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500" />
            <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">有興趣加入？</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-emerald-500 to-cyan-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
            加入 NEMI 生存伺服器
          </h2>
          <p className="text-gray-400 mb-8">
            加入我們的 Discord，提交入伺申請，一起建設屬於你的王國。
          </p>
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
          >
            加入 Discord
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
