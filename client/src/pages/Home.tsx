// NEMESIS Home Page — Obsidian Chronicle Design
// Main page with all sections

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TeamsSection from '@/components/TeamsSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import JoinSection from '@/components/JoinSection';
import Footer from '@/components/Footer';

export default function Home() {
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
