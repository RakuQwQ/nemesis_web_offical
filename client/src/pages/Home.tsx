// NEMESIS Home Page — Obsidian Chronicle Design
// Main page with all sections

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TeamsSection from '@/components/TeamsSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import JoinSection from '@/components/JoinSection';
import Footer from '@/components/Footer';
import { useSeo } from '@/hooks/useSeo';

export default function Home() {
  useSeo({
    canonical: '/',
    ogType: 'website',
    description: 'NEMESIS 香港 Minecraft 公會 — 香港最具規模的 Minecraft 社群，旗下設有熾級大宅、生存伺服器 NEMI、UHC 活動及 VTuber 企劃，歡迎加入。',
    keywords: 'NEMESIS 公會, 香港 Minecraft 公會, NEMI 生存伺服器, Minecraft UHC 香港, 熾級大宅, Minecraft 香港社群',
  });

  // JSON-LD: Organization structured data
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NEMESIS',
      description: 'NEMESIS 香港 Minecraft 公會 — 香港最具規模的 Minecraft 社群。',
      url: 'https://www.nemesis.wiki',
      logo: 'https://www.nemesis.wiki/img/nemesis_logo_red.png',
      foundingDate: '2021-11-28',
      sameAs: ['https://discord.gg/VdvBegG6ax'],
    };

    const elId = 'jsonld-organization';
    let el = document.getElementById(elId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = elId;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById(elId)?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.01_260)]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TeamsSection />
      <ActivitiesSection />
      <JoinSection />
      <Footer />
    </div>
  );
}
