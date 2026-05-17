import { Link } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div
          className="text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          404
        </div>
        <h1
          className="text-3xl font-bold text-white mb-4"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          頁面不存在
        </h1>
        <p className="text-gray-400 mb-8">
          你所尋找的頁面已消失在虛空之中，就像被苦力怕炸掉的建築一樣。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-medium rounded-lg transition-colors"
          >
            <Home size={16} />
            返回首頁
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium rounded-lg transition-colors"
          >
            <ArrowLeft size={16} />
            上一頁
          </button>
        </div>
      </div>
    </div>
  );
}
