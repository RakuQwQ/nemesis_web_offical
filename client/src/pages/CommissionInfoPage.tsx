
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowLeft, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Box, 
  Paintbrush, 
  PenTool, 
  Clock, 
  ShieldCheck, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  MessageSquare,
  Calculator
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';
import { showcaseItems } from '@/lib/data';

export default function CommissionInfoPage() {
  useSeo({
    title: '建築委託須知',
    description: 'NEMESIS 建築委託須知、收費標準、價格試算與流程說明。',
    canonical: '/commission-info',
  });

  const [openPricingIdx, setOpenPricingIdx] = useState<number | null>(0);

  const buildShowcase = useMemo(() => {
    const filtered = showcaseItems.filter(item => item.tags?.includes('建築'));

    const shuffled = [...filtered].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 5);
  }, []);

  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (buildShowcase.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % buildShowcase.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [buildShowcase.length]);

  const nextSlide = () => {
    setSlideIdx((prev) => (prev + 1) % buildShowcase.length);
  };
  const prevSlide = () => {
    setSlideIdx((prev) => (prev - 1 + buildShowcase.length) % buildShowcase.length);
  };


  // ── Calculator State ──
  const [detailedChunks, setDetailedChunks] = useState<number | ''>('');
  const [simpleChunks, setSimpleChunks] = useState<number | ''>('');
  const [styleMult, setStyleMult] = useState<number>(1.0);
  const [designMult, setDesignMult] = useState<number>(1.0);
  const [interiorMult, setInteriorMult] = useState<number>(1.0);
  const [needLight, setNeedLight] = useState<boolean>(false);
  const [needFunc, setNeedFunc] = useState<boolean>(false);
  const [timeMult, setTimeMult] = useState<number>(1.0);

  // ── Calculator Logic ──
  const calcResult = useMemo(() => {
    const N_d = Math.max(0, Number(detailedChunks) || 0);
    const N_s = Math.max(0, Number(simpleChunks) || 0);
    const totalN = N_d + N_s;

    if (totalN === 0) return { base: 0, final: 0, totalN: 0 };

    // Average price per chunk
    const pAvg = (N_d * 20 + N_s * 5) / totalN;
    
    // Tiered calculation
    const c1 = Math.min(totalN, 16);
    const c2 = Math.min(Math.max(totalN - 16, 0), 48);
    const c3 = Math.min(Math.max(totalN - 64, 0), 192);
    const c4 = Math.max(totalN - 256, 0);

    const tieredBase = (c1 * 1.0 + c2 * 0.7 + c3 * 0.4 + c4 * 0.1) * pAvg;

    const lightMult = needLight ? 1.05 : 1.0;
    const funcMult = needFunc ? 1.05 : 1.0;

    const finalPrice = tieredBase * styleMult * designMult * interiorMult * lightMult * funcMult * timeMult;

    return { 
      base: tieredBase, 
      final: finalPrice, 
      totalN 
    };
  }, [detailedChunks, simpleChunks, styleMult, designMult, interiorMult, needLight, needFunc, timeMult]);


  const workflowSteps = [
    {
      title: '口頭討論確認細節',
      content: '雙方會進行口頭討論，建築師會將委託細節記錄下來，並以文字形式傳送給委託方。經委託方確認文字記錄內容無誤後，委託才算正式開始並排單。'
    },
    {
      title: '輪廓階段確認',
      content: '建築師會建造建築的大概輪廓/骨架，並傳送截圖給委託方確認。注意：委託方確認輪廓無誤後，即鎖定結構。後續若要求修改輪廓，將加收總價 10% 的修改費用。'
    },
    {
      title: '大致建築確認',
      content: '建築師根據輪廓繼續建造，完成大致外觀與主體建築後，再次傳送截圖供委託方確認。注意：委託方確認大致建築無誤後，即鎖定主體。後續若要求大改主體或結構，將加收總價 10% 的修改費用。'
    },
    {
      title: '細節完工與成果展示',
      content: '建築師完成建築的所有細節（如外部微調、內部裝修等），並向委託方展示最終成果。本階段僅接受不影響主體結構的微調（如局部方塊更換）。'
    },
    {
      title: '尾款結清與檔案交付',
      content: '確認最終成果無誤且結清款項後，建築師會按照約定格式（預設 .schem）傳送地圖檔案給委託方。'
    }
  ];

  const pricingCategories = [
    {
      icon: <Layers size={18} />,
      title: '地圖大小 (按區塊計費)',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-300">地圖大小計算以 <strong>區塊（16*16 方塊）</strong>為單位。分為以下兩種複雜度：</p>
          <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
            <li><span className="text-cyan-300">仔細建築區：</span>需仔細完成的區域（如房屋、主體）。約 <strong>HKD $20 / 區塊</strong></li>
            <li><span className="text-cyan-300">簡略建築區：</span>高度重複或簡單地形。約 <strong>HKD $5 / 區塊</strong></li>
          </ul>
          <div className="overflow-x-auto mt-4 rounded-lg border border-white/10">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3">區塊數量</th>
                  <th className="px-4 py-3">計算方式 (按大小逐層遞減)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium">1 - 16 區塊</td>
                  <td className="px-4 py-3">按基礎原價 (100%) 計費</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium">17 – 64 區塊</td>
                  <td className="px-4 py-3 text-cyan-400">該區段之區塊享有 7 折優惠</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium">65 – 256 區塊</td>
                  <td className="px-4 py-3 text-cyan-400">該區段之區塊享有 4 折優惠</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium">257 區塊以上</td>
                  <td className="px-4 py-3 text-cyan-400">該區段之區塊享有 1 折優惠</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      icon: <Paintbrush size={18} />,
      title: '風格與設計需求',
      content: (
        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-2">風格加成</h4>
            <p className="text-gray-400">根據複雜度套用加成（如：中世紀 x1.05、現代風 x1.05、古日式和風 x1.1）。</p>
          </div>
          <div className="h-px w-full bg-white/10 my-2" />
          <div>
            <h4 className="font-semibold text-white mb-2">設計企劃完整度</h4>
            <ul className="space-y-2 text-gray-400">
              <li><strong className="text-cyan-300">自備詳細企劃 (9折)：</strong>提供明確參考圖、平面草圖及動線。</li>
              <li><strong className="text-cyan-300">備有簡略企劃 (原價)：</strong>擁有部分參考，需建築師進行部分設計。</li>
              <li><strong className="text-cyan-300">需要全權設計 (+15%)：</strong>僅有口頭概念，由建築師從零規劃與提案。</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      icon: <Box size={18} />,
      title: '仔細程度與內部裝修',
      content: (
        <ul className="space-y-3 text-sm text-gray-400">
          <li><strong className="text-white block mb-1">僅外裝 (基礎價)</strong>只負責外觀、屋頂、牆面細節。內部完全空心。適合背景或自行裝修者。</li>
          <li><strong className="text-white block mb-1">局部內裝 (+20%)</strong>包含外觀，並對重點大廳、出生點、主要動線進行裝修與光源鋪設。次要房間留空。</li>
          <li><strong className="text-white block mb-1">全內裝 (+60%)</strong>建築內部所有樓層、隔間、房間均進行符合主題的完整內裝。</li>
        </ul>
      )
    },
    {
      icon: <Clock size={18} />,
      title: '特殊需求與工期',
      content: (
        <div className="space-y-4 text-sm text-gray-400">
          <p><strong className="text-white">光線適配 (+5%)：</strong>配合特定時間或光影(Shaders)調整隱藏光源。</p>
          <p><strong className="text-white">功能空間預留 (+5%)：</strong>配合插件(如NPC、小遊戲傳送門)精確保留方塊空間。</p>
          <div className="h-px w-full bg-white/10 my-2" />
          <p><strong className="text-white">正常工期：</strong>無額外費用，依排單順序製作。</p>
          <p><strong className="text-yellow-400">加急排單 (+30%)：</strong>插單製作，縮短工期 (提早3-5天)。</p>
          <p><strong className="text-red-400">特急件 (+50% ~ 100%)：</strong>極速交件，視建築師行程決定是否承接。</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />

      {/* ── Header ───────────────────────────────────────── */}
      <section className="pt-24 pb-12 bg-[oklch(0.14_0.012_260)] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回作品展示
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
            <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
              Commission Guide
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            NEMESIS 建築委託須知
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-10">
            感謝您選擇 NEMESIS 為你服務。為確保委託順利進行並保障雙方權益，請在正式委託前詳細閱讀以下流程與條款。當您確認委託內容時，即視同同意本須知之所有規範。
          </p>

          {/* ── Slide Show ──────────────────────── */}
          {buildShowcase.length > 0 && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden group border border-white/10 shadow-2xl bg-black mt-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slideIdx}
                  src={buildShowcase[slideIdx].imageUrls[0]}
                  alt={buildShowcase[slideIdx].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Dark overlay at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Text Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                <div>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded mb-2 backdrop-blur-sm">
                    {buildShowcase[slideIdx].category === 'drawing' ? '繪圖設計' : '遊戲建築'}
                  </span>
                  <h3 className="text-white font-bold text-xl sm:text-2xl drop-shadow-md">
                    {buildShowcase[slideIdx].title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1 drop-shadow-md">
                    by {buildShowcase[slideIdx].author}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-black/60 border border-white/10"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-black/60 border border-white/10"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 right-6 flex gap-2">
                {buildShowcase.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSlideIdx(i)} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === slideIdx ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/40 hover:bg-white/80'
                    }`} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 委託人需要準備內容 (Preparation) ──────────────────────── */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="text-emerald-400" size={24} />
            <h2 className="text-2xl font-bold text-white">委託前準備</h2>
          </div>
          <p className="text-gray-400 mb-6 text-sm">為方便建築師更快瞭解委託內容與加快溝通，請務必準備以下資訊：</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-xl border border-white/10">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-2">
                <Box size={16} className="text-purple-400" /> 遊戲版本與模組
              </h3>
              <p className="text-sm text-gray-400">請註明 Java 或 Bedrock 及具體版本號（如 26.x）。若需安裝特定裝飾模組請於討論階段提出。</p>
            </div>
            <div className="glass-card p-5 rounded-xl border border-white/10">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-2">
                <Paintbrush size={16} className="text-cyan-400" /> 光影與資源包
              </h3>
              <p className="text-sm text-gray-400">若需配合特定光影或自定義資源包請提前說明。未註明則假設「不使用光影」進行視覺設計。</p>
            </div>
            <div className="glass-card p-5 rounded-xl border border-white/10 sm:col-span-2">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-emerald-400" /> 授權與版權確認
              </h3>
              <p className="text-sm text-gray-400">
                所有基礎報價均為「個人非商用授權」。若地圖用於商業項目（儲值伺服器、營利影片），需提前說明並支付商業授權費。建築師預設保留作品展示權，若需全保密(NDA)須另付費。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 費用計算規則 (Pricing Rules) ──────────────────────── */}
      <section className="py-16 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="text-cyan-400" size={24} />
            <h2 className="text-2xl font-bold text-white">委託費用計算方式</h2>
          </div>
          
          <div className="space-y-3">
            {pricingCategories.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl overflow-hidden border border-white/10"
              >
                <button
                  onClick={() => setOpenPricingIdx(openPricingIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="flex items-center gap-3 font-medium text-white text-sm sm:text-base">
                    <span className="text-purple-400">{item.icon}</span>
                    {item.title}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${openPricingIdx === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openPricingIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-white/5 pt-4">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 價格試算器 (Interactive Calculator) ──────────────────────── */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="text-emerald-400" size={24} />
            <h2 className="text-2xl font-bold text-white">委託費用試算器</h2>
          </div>
          
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-sm text-gray-400 mb-8">
              輸入您的需求以估算大概費用。最終報價請以與建築師詳細討論後的確認金額為準。
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* Chunks */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">仔細建築區塊 (Chunks)</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="例如: 10"
                    value={detailedChunks}
                    onChange={(e) => setDetailedChunks(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">($20 / 區塊)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">簡略建築區塊 (Chunks)</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="例如: 50"
                    value={simpleChunks}
                    onChange={(e) => setSimpleChunks(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">($5 / 區塊)</p>
                </div>
              </div>

              {/* Multipliers */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">建築風格</label>
                  <select 
                    value={styleMult}
                    onChange={(e) => setStyleMult(Number(e.target.value))}
                    className="w-full bg-[#1a1b1e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  >
                    <option value={1.0}>一般風格 (x1.0)</option>
                    <option value={1.05}>中世紀 / 現代風 (+5%)</option>
                    <option value={1.1}>古日式和風 (+10%)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">設計企劃</label>
                  <select 
                    value={designMult}
                    onChange={(e) => setDesignMult(Number(e.target.value))}
                    className="w-full bg-[#1a1b1e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  >
                    <option value={1.0}>備有簡略企劃 (原價)</option>
                    <option value={0.9}>自備詳細企劃 (9折)</option>
                    <option value={1.15}>需要全權設計 (+15%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">內部裝修</label>
                  <select 
                    value={interiorMult}
                    onChange={(e) => setInteriorMult(Number(e.target.value))}
                    className="w-full bg-[#1a1b1e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  >
                    <option value={1.0}>僅外裝 (原價)</option>
                    <option value={1.2}>局部內裝 (+20%)</option>
                    <option value={1.6}>全內裝 (+60%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">工期</label>
                  <select 
                    value={timeMult}
                    onChange={(e) => setTimeMult(Number(e.target.value))}
                    className="w-full bg-[#1a1b1e] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  >
                    <option value={1.0}>正常工期 (無額外)</option>
                    <option value={1.3}>加急排單 (+30%)</option>
                    <option value={1.5}>特急件 (+50%)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 mb-8 border-t border-white/5 pt-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={needLight}
                  onChange={(e) => setNeedLight(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500 bg-white/5"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">光線與時間軸適配 (+5%)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={needFunc}
                  onChange={(e) => setNeedFunc(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500 bg-white/5"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">功能性空間預留 (+5%)</span>
              </label>
            </div>

            {/* Result */}
            <div className="bg-[oklch(0.12_0.01_260)] rounded-xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">預估總區塊: {calcResult.totalN} chunks</p>
                <p className="text-gray-500 text-xs">（已套用大小遞減折扣）</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">估算總價 (HKD)</p>
                <p className="text-3xl font-bold text-emerald-400 font-mono">
                  ${calcResult.final.toFixed(0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 商業授權 (Licensing) ──────────────────────── */}
      <section className="py-16 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="text-purple-400" size={24} />
            <h2 className="text-2xl font-bold text-white">商業授權與版權歸屬</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
              <h3 className="text-lg font-bold text-emerald-400 mb-3">1. 個人與非商用授權 (基礎價)</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                支付基礎委託費用即獲永久非商用使用權。適用於個人存檔、無營利/儲值/VIP 機制的公開社群伺服器。
              </p>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>不得將檔案二次分發、轉售或贈送第三方。</li>
                <li>於影片或實況中公開展示，須標註本團隊/建築師。</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
              <h3 className="text-lg font-bold text-purple-400 mb-3">2. 商業授權與買斷方案</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                若伺服器包含儲值、VIP、營利影片等，須加收商業授權費。若預計轉售或作為企業專利，則需選擇「版權完全買斷」。
              </p>
              <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                <li>商授：可合法營利，但不可轉售地圖檔案。</li>
                <li>買斷：建築師讓渡所有權，承諾絕不二次改編或販售給他人。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 流程 (Workflow) ──────────────────────── */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <PenTool className="text-cyan-400" size={24} />
            <h2 className="text-2xl font-bold text-white">建築委託流程</h2>
          </div>
          
          <div className="relative pl-4 sm:pl-6 border-l-2 border-white/10 space-y-8">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[1.35rem] sm:-left-[1.85rem] top-1 w-4 h-4 rounded-full bg-[oklch(0.12_0.01_260)] border-[3px] border-cyan-500" />
                <div className="glass-card rounded-xl p-5 ml-2 hover:border-cyan-500/30 transition-colors">
                  <h3 className="text-white font-bold mb-2">Step {i + 1}: {step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 特別註明 & 免責 */}
          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
              <div className="text-sm text-blue-200/80">
                <strong className="text-blue-300 block mb-1">特別註明：</strong>
                交付檔案不包含「伺服器遠端安裝與地形對齊」服務。若需協助導入或對齊，需視工作量加收安裝服務費。涉及實體(ArmorStands)的建築，建築師會免費安裝一次，日後若因非建築師疏忽導致損壞，不提供免費二次安裝。
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
              <div className="text-sm text-red-200/80">
                <strong className="text-red-300 block mb-1">免責與違規聲明：</strong>
                本服務並非由 Mojang 或 Microsoft 官方贊助或營運。若發現委託方未經許可將地圖外流、低價倒賣或未經授權用於營利，本團隊有權收回授權並於各大黑名單聯名公告，且不退還款項。貨物一經交收，請自行妥善保管備份檔案。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────── */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            準備好開始委託了嗎？
          </h2>
          <p className="text-gray-400 mb-8">
            若您已經詳細閱讀並同意上述須知，歡迎進入我們的 Discord 尋找建築師進行詳細討論。
          </p>
          <a
            href="https://discord.gg/VdvBegG6ax"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
          >
            <MessageSquare size={18} />
            加入 Discord 聯絡我們
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
