'use client';

import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  PhoneCall,
  Search,
  BookOpen,
  DollarSign,
  FileText,
  MapPin,
  HelpCircle,
  ShieldCheck,
  Bell,
  Home,
  Tv,
  Calculator,
  Globe,
  Languages,
} from 'lucide-react';
import GoogleTranslateWidget from './GoogleTranslateWidget';
import { PWAInstallButton } from './PWAController';
import { useLanguage, AppLanguage } from '@/lib/LanguageContext';

interface NavbarProps {
  onSearchClick: () => void;
  onEmergencyClick: () => void;
  onEmbassyNewsClick?: () => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export default function Navbar({
  onSearchClick,
  onEmergencyClick,
  onEmbassyNewsClick,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const { currentLang, setLanguage, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { id: 'currency', label: t('navCurrency', 'ইউরো রেট'), icon: DollarSign, badge: currentLang === 'bn' ? 'লাইভ' : 'LIVE' },
    { id: 'tax-calculator', label: t('navTax', 'ট্যাক্স ও বেতন'), icon: Calculator, badge: currentLang === 'bn' ? 'টেবিল' : 'TAX' },
    { id: 'translator', label: t('navTranslator', 'অনুবাদ ও ভাষা'), icon: Languages, badge: currentLang === 'bn' ? 'ভয়েস' : 'VOICE' },
    { id: 'legal', label: t('navLegal', 'পারমেসো ও লিগ্যাল'), icon: ShieldCheck },
    { id: 'letters', label: t('navLetters', 'চিঠির ফরম্যাট'), icon: FileText, badge: 'PDF' },
    { id: 'directory', label: t('navDirectory', 'লোকাল ডিরেক্টরি'), icon: MapPin },
    { id: 'room-job-board', label: currentLang === 'bn' ? 'চাকরি ও রুম' : currentLang === 'en' ? 'Jobs & Rooms' : 'Lavoro e Casa', icon: Home, badge: currentLang === 'bn' ? 'নতুন' : 'NEW' },
    { id: 'italy-probashi', label: currentLang === 'bn' ? 'প্রবাসী নিউজ ও ভিডিও' : currentLang === 'en' ? 'Community News & Video' : 'Notizie e Video', icon: Globe, badge: 'HOT' },
    { id: 'news-media', label: t('navNews', 'তাজা খবর ও টিভি'), icon: Tv, badge: currentLang === 'bn' ? 'লাইভ' : 'LIVE' },
    { id: 'faq', label: currentLang === 'bn' ? 'জরুরি নোটিস ও FAQ' : currentLang === 'en' ? 'Notices & FAQ' : 'Avvisi e FAQ', icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-emerald-900/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg shadow-emerald-950/10 border-b border-emerald-800/40 dark:border-slate-800'
            : 'bg-emerald-900 dark:bg-slate-950 border-b border-emerald-800/60 dark:border-slate-800'
        }`}
      >
        {/* Top Mini Banner with Emergency Notice & Multi-Language Switcher */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-emerald-100 text-xs py-1.5 px-4 font-medium border-b border-emerald-700/50 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900 animate-pulse">
              {currentLang === 'bn' ? 'জরুরি' : currentLang === 'en' ? 'URGENT' : 'URGENTE'}
            </span>
            <span className="hidden sm:inline">
              {t('emergencyBar')}
            </span>
            <button
              onClick={onEmergencyClick}
              className="underline hover:text-amber-300 font-bold ml-1 transition-colors cursor-pointer"
            >
              {t('hotlineBtn')}
            </button>
          </div>

          {/* Top Bar Language Selector & Tools */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Dynamic 3-Language Switcher (BN / EN / IT) */}
            <div className="flex items-center p-0.5 rounded-xl bg-emerald-950/90 dark:bg-slate-900 border border-emerald-700/60 dark:border-slate-800 text-xs shadow-inner">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  currentLang === 'bn'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-200 dark:text-slate-300 hover:text-white'
                }`}
                title="বাংলা (Bengali)"
              >
                🇧🇩 বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-200 dark:text-slate-300 hover:text-white'
                }`}
                title="English"
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLanguage('it')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  currentLang === 'it'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-200 dark:text-slate-300 hover:text-white'
                }`}
                title="Italiano"
              >
                🇮🇹 IT
              </button>
            </div>

            <PWAInstallButton />
            <GoogleTranslateWidget />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Brand */}
            <div
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform border border-emerald-400/40">
                <span className="text-xl sm:text-2xl" role="img" aria-label="Bangladesh & Italy">
                  🇮🇹
                </span>
                <span className="absolute -bottom-1 -right-1 text-sm">
                  🇧🇩
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    ইতালিপ্রবাসী
                    <span className="text-amber-400 font-black">.কম</span>
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-700/80 text-emerald-200 border border-emerald-500/30">
                    Bangla-Italy Portal
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/80 dark:text-slate-400 hidden sm:block font-normal">
                  প্রবাসী বাংলাদেশিদের নির্ভরযোগ্য সহায়িকা ও সেবা পোর্টাল
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                      isActive
                        ? 'bg-emerald-700 text-amber-300 shadow-inner'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/70 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-80" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions & Utilities */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Modal Trigger */}
              <button
                onClick={onSearchClick}
                className="p-2 sm:px-3 sm:py-2 rounded-lg text-emerald-100 hover:text-white bg-emerald-800/60 hover:bg-emerald-700/80 dark:bg-slate-800 dark:hover:bg-slate-700 border border-emerald-700/50 dark:border-slate-700 text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                title="সার্চ করুন"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-medium">খুঁজুন</span>
                <kbd className="hidden xl:inline text-[10px] bg-emerald-950/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-600/30">
                  Ctrl+K
                </kbd>
              </button>

              {/* Embassy Push Notifications Alert Button */}
              {onEmbassyNewsClick && (
                <button
                  onClick={onEmbassyNewsClick}
                  className="relative p-2 sm:px-3 sm:py-2 rounded-lg text-emerald-100 hover:text-white bg-emerald-800/60 hover:bg-emerald-700/80 dark:bg-slate-800 dark:hover:bg-slate-700 border border-emerald-700/50 dark:border-slate-700 text-sm flex items-center gap-1.5 transition-colors cursor-pointer group"
                  title="বাংলাদেশ দূতাবাস বিজ্ঞপ্তি ও পুশ নোটিফিকেশন"
                  aria-label="Embassy push notifications"
                >
                  <Bell className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span className="hidden md:inline font-medium text-xs text-amber-200">দূতাবাস নোটিস</span>
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                </button>
              )}

              {/* Emergency Hotline Button */}
              <button
                onClick={onEmergencyClick}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-950/30 hover:scale-105 transition-all cursor-pointer animate-pulse"
                title="জরুরি হটলাইন"
              >
                <PhoneCall className="w-4 h-4" />
                <span className="hidden xs:inline">জরুরি ১১২/১১৮</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-2.5 rounded-lg text-emerald-200 hover:text-amber-300 bg-emerald-800/50 hover:bg-emerald-700/70 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-emerald-700/40 dark:border-slate-700 cursor-pointer"
                title={isDarkMode ? 'লাইট মোড অন করুন' : 'ডার্ক মোড অন করুন'}
                aria-label="Theme toggle"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-amber-300" />
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-emerald-100 hover:text-white bg-emerald-800/60 hover:bg-emerald-700 lg:hidden transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-emerald-950/98 dark:bg-slate-950/98 border-b border-emerald-800 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-in slide-in-from-top duration-200 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex flex-col items-start p-3 rounded-xl text-left font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-700 text-white ring-2 ring-amber-400'
                        : 'bg-emerald-900/70 text-emerald-100 hover:bg-emerald-800 dark:bg-slate-900 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <Icon className="w-4 h-4 text-amber-400" />
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-emerald-800/50 flex flex-col gap-2">
              {onEmbassyNewsClick && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onEmbassyNewsClick();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md border border-emerald-600/40"
                >
                  <Bell className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>বাংলাদেশ দূতাবাস ক্যাম্প ও পুশ নোটিফিকেশন</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onEmergencyClick();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                জরুরি অ্যাম্বুলেন্স (১১৮) ও পুলিশ (১১২) ডায়াল করুন
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
