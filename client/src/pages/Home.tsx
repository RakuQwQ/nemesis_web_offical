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
      sameAs: ['https://discord.com/invite/8JtmB3bugS'],
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
