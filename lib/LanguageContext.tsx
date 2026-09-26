'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppLanguage = 'bn' | 'en' | 'it';

interface Translations {
  [key: string]: {
    bn: string;
    en: string;
    it: string;
  };
}

export const DICTIONARY: Translations = {
  // Brand & Header
  siteTitle: {
    bn: 'ইতালিপ্রবাসী',
    en: 'ItalyProbashi',
    it: 'ItalyProbashi',
  },
  siteSubtitle: {
    bn: 'ইতালি প্রবাসী বাংলাদেশিদের জন্য সর্বাত্মক ও নির্ভরযোগ্য সেবা পোর্টাল',
    en: 'Comprehensive portal for the Bangladeshi community in Italy',
    it: 'Portale completo per la comunità bangladese in Italia',
  },
  emergencyBar: {
    bn: 'ইতালিতে জরুরি স্বাস্থ্য সেবায় ১১৮ ও সার্বিক নিরাপত্তা হেল্পলাইনে ১১২ ডায়াল করুন (টোল ফ্রি)।',
    en: 'For medical emergencies dial 118, for general emergency & police dial 112 (Toll Free).',
    it: 'Per emergenze sanitarie comporre 118, per pronto intervento e polizia comporre 112 (Gratuito).',
  },
  hotlineBtn: {
    bn: 'হটলাইন →',
    en: 'Hotlines →',
    it: 'Numeri Utili →',
  },
  installApp: {
    bn: 'অ্যাপ ইনস্টল',
    en: 'Install App',
    it: 'Installa App',
  },
  installed: {
    bn: 'ইনস্টল করা আছে',
    en: 'Installed',
    it: 'Installato',
  },

  // Navigation Items
  navCurrency: {
    bn: 'ইউরো রেট',
    en: 'Euro Rate',
    it: 'Tasso Euro',
  },
  navTax: {
    bn: 'ট্যাক্স ও বেতন',
    en: 'Tax & Salary',
    it: 'Tasse e Stipendio',
  },
  navTranslator: {
    bn: 'অনুবাদ ও ভাষা',
    en: 'Translator & Language',
    it: 'Traduttore e Lingua',
  },
  navLegal: {
    bn: 'পারমেসো ও লিগ্যাল',
    en: 'Permesso & Legal',
    it: 'Permesso e Legale',
  },
  navLetters: {
    bn: 'চিঠির ফরম্যাট',
    en: 'Letter Templates',
    it: 'Modelli Lettere',
  },
  navDirectory: {
    bn: 'লোকাল ডিরেক্টরি',
    en: 'Local Directory',
    it: 'Directory Locale',
  },
  navPrayer: {
    bn: 'নামাজের সময়সূচি',
    en: 'Prayer Times',
    it: 'Orari Preghiera',
  },
  navNews: {
    bn: 'সংবাদ ও মিডিয়া',
    en: 'News & Media',
    it: 'Notizie e Media',
  },
  navEmergency: {
    bn: 'জরুরি হেল্পলাইন',
    en: 'Emergency',
    it: 'Emergenza',
  },

  // Hero Section
  heroBadge: {
    bn: 'ইতালি প্রবাসী বাংলাদেশিদের সার্বিক পোর্টাল',
    en: 'All-in-one Portal for Bangladeshis in Italy',
    it: 'Portale di supporto per la comunità bangladese in Italia',
  },
  heroTitle: {
    bn: 'ইতালিতে আপনার নতুন জীবন, কাজ ও অধিকারের বিশ্বস্ত সঙ্গী',
    en: 'Your Trusted Companion for Life, Work & Rights in Italy',
    it: 'Il tuo compagno fidato per vita, lavoro e diritti in Italia',
  },
  heroSubtitle: {
    bn: 'পারমেসো দি সোজ্জোর্নো, স্পিড, কোদিচে ফিস্কালে, লাইভ ইউরো রেট, নিত্যদিনের ইতালিয়ান ভাষা অনুবাদক এবং আইনি সহায়তার বিশ্বস্ত ঠিকানা।',
    en: 'Permesso di Soggiorno, SPID, Codice Fiscale, live Euro rate, voice/text Italian translator, and free legal guidelines.',
    it: 'Permesso di Soggiorno, SPID, Codice Fiscale, cambio Euro in tempo reale, traduttore e supporto per i nuovi arrivati.',
  },
  heroCtaTranslator: {
    bn: 'অনুবাদক ও ভাষা সহকারী',
    en: 'Translator & Language Tool',
    it: 'Traduttore e Assistente Lingua',
  },
  heroCtaLegal: {
    bn: 'পারমেসো ও লিগ্যাল গাইড',
    en: 'Legal & Permesso Guides',
    it: 'Guide Legali e Permesso',
  },

  // Translator Section
  translatorBadge: {
    bn: 'বহুভাষিক ভয়েস ও টেক্সট অনুবাদক',
    en: 'Multilingual Voice & Text Translator',
    it: 'Traduttore Multilingue Vocale e Testuale',
  },
  translatorTitle: {
    bn: 'বাংলা ⇄ English ⇄ Italiano স্মার্ট অনুবাদক',
    en: 'Bangla ⇄ English ⇄ Italiano Smart Translator',
    it: 'Traduttore Intelligente Bangla ⇄ Inglese ⇄ Italiano',
  },
  translatorSubtitle: {
    bn: 'ইতালিতে প্রবাসী বাংলাদেশিদের জন্য ভয়েস ইনপুট, অডিও উচ্চারণ, ধীরগতির প্রনান্সিয়েশন এবং বুকমার্ক সুবিধা।',
    en: 'Voice input, audio pronunciation with slow-speed controls, and bookmarking for expatriates in Italy.',
    it: 'Input vocale, pronuncia audio a velocità normale/lenta e segnalibri per la comunità.',
  },
  writeOrSpeak: {
    bn: 'এখানে লিখুন বা মাইক্রোফোনে কথা বলুন...',
    en: 'Type here or speak into the microphone...',
    it: 'Scrivi qui o parla nel microfono...',
  },
  voiceInput: {
    bn: 'ভয়েস ইনপুট',
    en: 'Voice Input',
    it: 'Input Vocale',
  },
  recording: {
    bn: 'রেকর্ড হচ্ছে... বলুন',
    en: 'Listening... speak now',
    it: 'In ascolto... parla ora',
  },
  translateBtn: {
    bn: 'অনুবাদ করুন',
    en: 'Translate',
    it: 'Traduci',
  },
  translating: {
    bn: 'অনুবাদ হচ্ছে...',
    en: 'Translating...',
    it: 'Traduzione in corso...',
  },
  listenAudio: {
    bn: 'উচ্চারণ শুনুন',
    en: 'Listen Audio',
    it: 'Ascolta Pronuncia',
  },
  slowSpeed: {
    bn: '০.৭x ধীরগতি',
    en: '0.7x Slow',
    it: '0.7x Lento',
  },
  normalSpeed: {
    bn: '১.০x স্বাভাবিক',
    en: '1.0x Normal',
    it: '1.0x Normale',
  },
  copyText: {
    bn: 'কপি',
    en: 'Copy',
    it: 'Copia',
  },
  copied: {
    bn: 'কপি হয়েছে!',
    en: 'Copied!',
    it: 'Copiato!',
  },
  showBigScreen: {
    bn: 'বড় স্ক্রিনে দেখান',
    en: 'Show on Big Screen',
    it: 'Mostra a Schermo Intero',
  },
  clear: {
    bn: 'মুছে ফেলুন',
    en: 'Clear',
    it: 'Cancella',
  },

  // Category Tabs
  catAll: {
    bn: 'সব বাক্য',
    en: 'All Phrases',
    it: 'Tutte le Frasi',
  },
  catSupermarket: {
    bn: 'সুপারমার্কেট',
    en: 'Supermarket',
    it: 'Supermercato',
  },
  catHospital: {
    bn: 'হাসপাতাল ও ডাক্তার',
    en: 'Hospital & Medical',
    it: 'Ospedale e Medico',
  },
  catTransport: {
    bn: 'যাতায়াত (বাস/ট্রেন)',
    en: 'Transport',
    it: 'Trasporti',
  },
  catWorkplace: {
    bn: 'কাজের জায়গা',
    en: 'Workplace',
    it: 'Lavoro',
  },
  catEmergency: {
    bn: 'জরুরি ও লিগ্যাল',
    en: 'Emergency & Legal',
    it: 'Emergenza e Legale',
  },
  catFavorites: {
    bn: 'বুকমার্ক / প্রিয় বাক্য',
    en: 'Bookmarks / Favorites',
    it: 'Preferiti',
  },

  // Card Labels
  italianPronunciation: {
    bn: 'বাংলায় উচ্চারণ:',
    en: 'Pronunciation Guide:',
    it: 'Guida alla pronuncia:',
  },
  banglaMeaning: {
    bn: 'বাংলা অর্থ:',
    en: 'Bangla Meaning:',
    it: 'Significato in Bengalese:',
  },
  englishMeaning: {
    bn: 'ইংরেজি অর্থ:',
    en: 'English Translation:',
    it: 'Traduzione in Inglese:',
  },
};

interface LanguageContextType {
  currentLang: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'bn',
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLangState] = useState<AppLanguage>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('app_language_preference');
        if (saved === 'bn' || saved === 'en' || saved === 'it') {
          return saved as AppLanguage;
        }
      } catch {}
    }
    return 'bn';
  });

  const setLanguage = (lang: AppLanguage) => {
    setCurrentLangState(lang);
    try {
      localStorage.setItem('app_language_preference', lang);
    } catch {}
  };

  const t = (key: string, fallback?: string): string => {
    const entry = DICTIONARY[key];
    if (entry && entry[currentLang]) {
      return entry[currentLang];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
