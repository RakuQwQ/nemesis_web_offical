// NEMESIS Footer — Obsidian Chronicle Design

import { Link } from 'wouter';
import { teams } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.10_0.01_260)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-sm rotate-45" />
              <span
                className="text-lg font-black text-white tracking-widest"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                NEMESIS
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              香港 Minecraft 公會，為你服務。
            </p>
            <p className="text-xs text-gray-600 mt-3 italic">
              "Building legends, one block at a time."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">導覽</h4>
            <ul className="space-y-2">
              {[
                { label: '關於公會', href: '/#about' },
                { label: '公會團隊', href: '/#teams' },
                { label: '近期活動', href: '/#activities' },
                { label: '加入我們', href: '/#join' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">團隊</h4>
            <ul className="space-y-2">
              {teams.map((team) => (
                <li key={team.id}>
                  <Link
                    href={`/group/${team.id}`}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {team.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/activities"
                  className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  活動記錄
                </Link>
              </li>
            </ul>
          </div>

          {/* Wiki & Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">百科</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/server-wiki"
                  className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  伺服器百科
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/VdvBegG6ax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© 2026 NEMESIS. All rights reserved.</p>
          <p className="italic">"Building legends, one block at a time."</p>
        </div>
      </div>
    </footer>
  );
}
