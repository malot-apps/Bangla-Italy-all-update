'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRightLeft, Globe } from 'lucide-react';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslateWidget({ compact = false }: { compact?: boolean }) {
  const [currentLang, setCurrentLang] = useState<'bn' | 'it'>('bn');

  useEffect(() => {
    // Inject Google Translate script if not present
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'bn',
            includedLanguages: 'bn,it,en',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };
  }, []);

  const changeLanguage = (targetLang: 'bn' | 'it') => {
    setCurrentLang(targetLang);
    try {
      // Set googtrans cookie for domain & path
      const cookieValue = `/bn/${targetLang}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; domain=.${window.location.hostname}; path=/;`;

      // Trigger translate combo element if present in DOM
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = targetLang;
        select.dispatchEvent(new Event('change'));
      }
    } catch {
      // Fallback
    }
  };

  const toggleLanguage = () => {
    const nextLang = currentLang === 'bn' ? 'it' : 'bn';
    changeLanguage(nextLang);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Hidden container for Google Translate element */}
      <div id="google_translate_element" className="hidden" />

      {/* Custom Clean Top Bar Language Selector */}
      <div className="flex items-center p-0.5 sm:p-1 rounded-xl bg-emerald-950/90 dark:bg-slate-900 border border-emerald-700/60 dark:border-slate-800 text-xs shadow-inner">
        <div className="flex items-center gap-1 px-1.5 py-0.5 text-emerald-300 dark:text-emerald-400">
          <Globe className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold hidden md:inline">গুগল ট্রান্সলেট:</span>
        </div>

        <button
          onClick={() => changeLanguage('bn')}
          title="বাংলায় অনুবাদ করুন"
          className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            currentLang === 'bn'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-emerald-200 dark:text-slate-300 hover:text-white'
          }`}
        >
          🇧🇩 বাংলা
        </button>

        <button
          onClick={toggleLanguage}
          title="ভাষা অদলবদল (Bangla <-> Italian)"
          className="p-1 text-emerald-300 hover:text-white hover:bg-emerald-800/50 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
        >
          <ArrowRightLeft className="w-3 h-3" />
        </button>

        <button
          onClick={() => changeLanguage('it')}
          title="ইতালিয়ানে অনুবাদ করুন (Traduci in Italiano)"
          className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            currentLang === 'it'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-emerald-200 dark:text-slate-300 hover:text-white'
          }`}
        >
          🇮🇹 Italiano
        </button>
      </div>
    </div>
  );
}
