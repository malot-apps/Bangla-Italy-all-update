'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CurrencyConverter from '@/components/CurrencyConverter';
import ItalianTaxSalaryCalculator from '@/components/ItalianTaxSalaryCalculator';
import ImmigrantTranslator from '@/components/ImmigrantTranslator';
import LanguageHelper from '@/components/LanguageHelper';
import LegalGuides from '@/components/LegalGuides';
import LetterTemplates from '@/components/LetterTemplates';
import DirectoryHotlines from '@/components/DirectoryHotlines';
import PrayerTimesSection from '@/components/PrayerTimesSection';
import RoomJobBoard from '@/components/RoomJobBoard';
import ItalyProbashiNewsVideo from '@/components/ItalyProbashiNewsVideo';
import NewsAndMedia from '@/components/NewsAndMedia';
import NoticeBoard from '@/components/NoticeBoard';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import EmergencyModal from '@/components/EmergencyModal';
import EmbassyNotificationModal from '@/components/EmbassyNotificationModal';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import NoticeTicker from '@/components/NoticeTicker';
import AdSlot from '@/components/AdSlot';
import AdminModal from '@/components/AdminModal';

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

      {/* Dynamic Emergency Notice / Announcement Ticker (Admin Controlled) */}
      <NoticeTicker />

      {/* Header Top Strategic Ad Placement (728x90 Desktop / 320x50 Mobile) */}
      <AdSlot position="topBanner" />

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

        {/* Dedicated Immigrant Translation Tool: Google Translate Widget, Voice/Text Translator & Categorized Quick Phrases */}
        <ImmigrantTranslator />

        {/* Italian-Bangla Language Helper with Web Speech Synthesis & Flashcards */}
        <LanguageHelper />

        {/* In-Feed Native Ad Card (Between Language/Phrases & Guides) */}
        <AdSlot position="nativeInFeed" />

        {/* Comprehensive Legal Guides (Permesso, SPID, Embassy, Bonuses, Driving) */}
        <LegalGuides initialCategory={legalCategory} />

        {/* Italian Formal Letters & Applications Generator */}
        <LetterTemplates />

        {/* Emergency Hotlines & Searchable Local Directory across Italy */}
        <DirectoryHotlines onCallSosModal={() => setIsEmergencyOpen(true)} />

        {/* Daily Islamic Prayer Times across Italy & User Geolocation */}
        <PrayerTimesSection />

        {/* Community Room & Job Notice Board */}
        <RoomJobBoard />

        {/* Dedicated Italy Probashi News & Video Section (Google News RSS 'ইতালি প্রবাসী' + YouTube Video Streams) */}
        <ItalyProbashiNewsVideo />

        {/* Live Bangladesh News Feed (Prothom Alo / BDNews24) & Live YouTube TV */}
        <NewsAndMedia />

        {/* Scam Warning Board, Verified Job Sites & FAQs */}
        <NoticeBoard onOpenEmbassyAlerts={() => setIsEmbassyModalOpen(true)} />
      </main>

      {/* Strategic Floating Sticky Desktop Ad (300x250) */}
      <AdSlot position="floatingSidebar" />

      {/* Strategic Mobile Sticky Bottom Banner (320x50) */}
      <AdSlot position="mobileStickyBottom" />

      {/* Comprehensive Admin Panel Control Modal (#admin) */}
      <AdminModal />

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
