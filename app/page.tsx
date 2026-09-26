'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CurrencyConverter from '@/components/CurrencyConverter';
import ItalianTaxSalaryCalculator from '@/components/ItalianTaxSalaryCalculator';
import LanguageHelper from '@/components/LanguageHelper';
import LegalGuides from '@/components/LegalGuides';
import LetterTemplates from '@/components/LetterTemplates';
import DirectoryHotlines from '@/components/DirectoryHotlines';
import RoomJobBoard from '@/components/RoomJobBoard';
import NewsAndMedia from '@/components/NewsAndMedia';
import NoticeBoard from '@/components/NoticeBoard';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import EmergencyModal from '@/components/EmergencyModal';
import EmbassyNotificationModal from '@/components/EmbassyNotificationModal';
import ScrollProgressBar from '@/components/ScrollProgressBar';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isEmbassyModalOpen, setIsEmbassyModalOpen] = useState<boolean>(false);
  const [legalCategory, setLegalCategory] = useState<string>('all');

  const handleQuickAction = (targetId: string, filterQuery?: string) => {
    setActiveSection(targetId);
    if (targetId === 'legal' && filterQuery) {
      setLegalCategory(filterQuery);
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchResultSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Viewport Smooth Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Sticky Header Navbar */}
      <Navbar
        onSearchClick={() => setIsSearchOpen(true)}
        onEmergencyClick={() => setIsEmergencyOpen(true)}
        onEmbassyNewsClick={() => setIsEmbassyModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onQuickAction={handleQuickAction}
          onEmbassyNoticeClick={() => setIsEmbassyModalOpen(true)}
        />

        {/* Live Euro to BDT Currency Converter & Remittance Incentive */}
        <CurrencyConverter />

        {/* Client-Side Italian Tax & Salary Calculator (RAL, IRPEF Brackets, Clear Table Format) */}
        <ItalianTaxSalaryCalculator />

        {/* Italian-Bangla Language Helper with Web Speech Synthesis & Flashcards */}
        <LanguageHelper />

        {/* Comprehensive Legal Guides (Permesso, SPID, Embassy, Bonuses, Driving) */}
        <LegalGuides initialCategory={legalCategory} />

        {/* Italian Formal Letters & Applications Generator */}
        <LetterTemplates />

        {/* Emergency Hotlines & Searchable Local Directory across Italy */}
        <DirectoryHotlines onCallSosModal={() => setIsEmergencyOpen(true)} />

        {/* Community Room & Job Notice Board */}
        <RoomJobBoard />

        {/* Live Bangladesh News Feed (Prothom Alo / BDNews24) & Live YouTube TV */}
        <NewsAndMedia />

        {/* Scam Warning Board, Verified Job Sites & FAQs */}
        <NoticeBoard onOpenEmbassyAlerts={() => setIsEmbassyModalOpen(true)} />
      </main>

      {/* Rich Footer */}
      <Footer
        onNavigate={handleQuickAction}
        onEmergencyClick={() => setIsEmergencyOpen(true)}
      />

      {/* Global Fast Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchResultSelect}
        onOpenEmbassyModal={() => setIsEmbassyModalOpen(true)}
      />

      {/* Emergency SOS & Italian Phrases Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Embassy Announcements & Push Notification Center Modal */}
      <EmbassyNotificationModal
        isOpen={isEmbassyModalOpen}
        onClose={() => setIsEmbassyModalOpen(false)}
      />
    </div>
  );
}
