// NEMESIS Navbar — Obsidian Chronicle Design
// Fixed navbar with glassmorphism effect on scroll
// Dropdowns for sections, teams, and wiki pages

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { teams } from '@/lib/data';
import { DISCORD_INVITE_URL } from '@/lib/links';

const navSections = [
  { label: '關於公會', href: '/#about' },
  { label: '公會團隊', href: '/#teams' },
  { label: '近期活動', href: '/#activities' },
  { label: '加入我們', href: '/#join' },
];

const wikiLinks = [
  { label: '伺服器百科', href: '/server-wiki' },
  { label: 'NEMI 生存伺服器', href: '/survival-wiki' },
];

const commissionLinks = [
  { label: '委託須知', href: '/commission-info' },
  { label: '作品展示', href: '/showcase' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [wikiOpen, setWikiOpen] = useState(false);
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setTeamsOpen(false);
    setWikiOpen(false);
    setCommissionOpen(false);
  }, [location]);

  // On mount (or after navigation), check if there's a pending anchor to scroll to
  useEffect(() => {
    const pending = sessionStorage.getItem('scrollTo');
    if (pending && location === '/') {
      sessionStorage.removeItem('scrollTo');
      // Wait for the page to render before scrolling
      setTimeout(() => {
        const el = document.getElementById(pending);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleAnchorClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location === '/') {
        // Already on home, just scroll
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate home first, then scroll after landing
        sessionStorage.setItem('scrollTo', id);
        navigate('/');
      }
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[oklch(0.12_0.01_260/0.95)] backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img src="/img/nemesis_logo_red.png" alt="NEMESIS" className="h-9 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Sections dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5">
                頁面導覽 <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-44 bg-[oklch(0.16_0.012_260/0.98)] backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navSections.map((s) => (
                  <button
                    key={s.href}
                    onClick={() => handleAnchorClick(s.href)}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Teams dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5">
                公會團隊 <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-44 bg-[oklch(0.16_0.012_260/0.98)] backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {teams.map((t) => (
                  <Link
                    key={t.id}
                    href={`/group/${t.id}`}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 first:rounded-t-lg transition-colors"
                  >
                    {t.name}
                    <span className="ml-2 text-xs text-gray-500">{t.tier}</span>
                  </Link>
                ))}
                <div className="border-t border-white/10 my-1" />
                <Link
                  href="/more-teams"
                  className="block px-4 py-2.5 text-sm text-purple-300 hover:text-purple-200 hover:bg-white/5 last:rounded-b-lg transition-colors"
                >
                  未來團隊
                  <span className="ml-2 text-xs text-purple-500/60">✨</span>
                </Link>
              </div>
            </div>

            {/* Wiki dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5">
                百科 <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-44 bg-[oklch(0.16_0.012_260/0.98)] backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {wikiLinks.map((w) => (
                  <Link
                    key={w.href}
                    href={w.href}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {w.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 委託 Commission dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5">
                委託 <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-44 bg-[oklch(0.16_0.012_260/0.98)] backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {commissionLinks.map((w) => (
                  <Link
                    key={w.href}
                    href={w.href}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {w.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/activities"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              活動記錄
            </Link>
          </div>

          {/* Discord CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              加入 Discord
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[oklch(0.14_0.012_260/0.98)] backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navSections.map((s) => (
                <button
                  key={s.href}
                  onClick={() => handleAnchorClick(s.href)}
                  className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {s.label}
                </button>
              ))}
              <div className="pt-2 border-t border-white/10">
                <p className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">公會團隊</p>
                {teams.map((t) => (
                  <Link
                    key={t.id}
                    href={`/group/${t.id}`}
                    className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {t.name}
                  </Link>
                ))}
                <Link
                  href="/more-teams"
                  className="block px-3 py-2.5 text-sm text-purple-300 hover:text-purple-200 hover:bg-white/5 rounded-lg transition-colors"
                >
                  未來團隊 ✨
                </Link>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">百科</p>
                {wikiLinks.map((w) => (
                  <Link
                    key={w.href}
                    href={w.href}
                    className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {w.label}
                  </Link>
                ))}
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">委託</p>
                {commissionLinks.map((w) => (
                  <Link
                    key={w.href}
                    href={w.href}
                    className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {w.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/activities"
                className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                活動記錄
              </Link>
              <div className="pt-3">
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                  </svg>
                  加入 Discord
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
