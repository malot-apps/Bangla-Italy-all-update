'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AdSlotConfig {
  enabled: boolean;
  type: 'custom' | 'script';
  scriptCode: string;
  customTitle: string;
  customSubtitle?: string;
  customImage?: string;
  customButtonText?: string;
  customUrl?: string;
}

export interface AdminConfig {
  adminCredentials: {
    username: string;
    passwordHash: string; // plain or hashed stored password
  };
  ads: {
    allAdsEnabled: boolean;
    topBanner: AdSlotConfig;
    nativeInFeed: AdSlotConfig;
    floatingSidebar: AdSlotConfig;
    mobileStickyBottom: AdSlotConfig;
    directLink: {
      enabled: boolean;
      url: string;
    };
  };
  liveRate: {
    eurToBdt: number;
    incentivePercent: number;
    lastUpdatedText: string;
  };
  notices: {
    id: string;
    textBn: string;
    textEn: string;
    textIt: string;
    type: 'urgent' | 'info' | 'warning';
    active: boolean;
  }[];
  customDirectory: {
    id: string;
    name: string;
    city: string;
    category: 'caf' | 'grocery' | 'embassy' | 'medical';
    phone: string;
    address: string;
    link?: string;
  }[];
  youtube: {
    videoUrl: string;
    title: string;
  };
}

export const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  adminCredentials: {
    username: 'admin',
    passwordHash: '1234',
  },
  ads: {
    allAdsEnabled: true,
    topBanner: {
      enabled: true,
      type: 'custom',
      scriptCode: '<!-- Adsterra 728x90 Header Script Banner Placeholder -->\n<div class="p-3 text-center text-xs text-amber-900 bg-amber-100 rounded">Adsterra 728x90 Script Banner Active</div>',
      customTitle: 'রেমিট্যান্সে সর্বোচ্চ বোনাস ও নিরাপদ মানি ট্রান্সফার',
      customSubtitle: 'ব্যাংক এশিয়া, অগ্রণী ও সোনালী ব্যাংকে সরাসরি ২.৫% সরকারি প্রণোদনা',
      customImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=720&q=80',
      customButtonText: 'এখনই পাঠান',
      customUrl: '#currency',
    },
    nativeInFeed: {
      enabled: true,
      type: 'custom',
      scriptCode: '<!-- Adsterra Native In-Feed Ad Placeholder -->\n<div class="p-4 text-center text-xs text-emerald-900 bg-emerald-100 rounded-xl">Adsterra Native Card Active</div>',
      customTitle: 'ইতালিতে বিশ্বস্ত আইনজীবীর ফ্রি লিগ্যাল কনসাল্টেশন',
      customSubtitle: 'পারমেসো নবায়ন, ফ্যামিলি রিইউনিয়ন ও ভিসা রিজেক্টের বিরুদ্ধে আপিল সেবা',
      customImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      customButtonText: 'ফ্রি পরামর্শ নিন',
      customUrl: '#legal',
    },
    floatingSidebar: {
      enabled: true,
      type: 'custom',
      scriptCode: '<!-- Adsterra 300x250 Sticky Banner Placeholder -->\n<div class="w-[300px] h-[250px] bg-slate-900 text-amber-400 flex items-center justify-center text-xs font-mono">Adsterra 300x250 Sticky</div>',
      customTitle: 'বিকাশ ও ব্যাংক অ্যাকাউন্টে তাৎক্ষণিক টাকা পাঠান',
      customImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80',
      customButtonText: 'রেট দেখুন',
      customUrl: '#currency',
    },
    mobileStickyBottom: {
      enabled: true,
      type: 'custom',
      scriptCode: '<!-- Adsterra Mobile 320x50 Sticky Script Placeholder -->\n<div class="text-xs text-center text-white py-1">Adsterra Mobile 320x50 Active</div>',
      customTitle: 'প্রবাসী স্পেশাল: সেরা রেটে টাকা পাঠান',
      customButtonText: 'রেট দেখুন',
      customUrl: '#currency',
    },
    directLink: {
      enabled: false,
      url: 'https://example.com/direct-link-promo',
    },
  },
  liveRate: {
    eurToBdt: 133.25,
    incentivePercent: 2.5,
    lastUpdatedText: 'আজকের বাজার দর (ব্যাংক অফ ইতালি ও বাংলাদেশ ব্যাংক)',
  },
  notices: [
    {
      id: 'n1',
      textBn: 'জরুরি নোটিস: রোম বাংলাদেশ দূতাবাসের বিশেষ কন্স্যুলার সেবা ও পাসপোর্ট বিতরণ কর্মসূচি চলছে।',
      textEn: 'Urgent Notice: Rome Bangladesh Embassy special consular service and passport distribution is ongoing.',
      textIt: 'Avviso urgente: Servizio consolare speciale e distribuzione passaporti presso l\'Ambasciata a Roma.',
      type: 'urgent',
      active: true,
    },
    {
      id: 'n2',
      textBn: 'সতর্কতা: অবৈধ কোনো দালালের মাধ্যমে স্পিড (SPID) বা পারমেসো ফাইল জমা দেবেন না, সরাসরি অনুমোদিত CAF অফিসে যোগাযোগ করুন।',
      textEn: 'Caution: Do not submit SPID or Permesso files through illegal brokers; always use authorized CAF offices.',
      textIt: 'Attenzione: Non affidare pratiche a intermediari non autorizzati; rivolgersi sempre a CAF accreditati.',
      type: 'warning',
      active: true,
    },
  ],
  customDirectory: [
    {
      id: 'cd1',
      name: 'CAF Italia Bangla Roma (টর পিগেনাত্তারা)',
      city: 'Roma',
      category: 'caf',
      phone: '+39 06 1234567',
      address: 'Via di Tor Pignattara, 142, 00176 Roma RM',
      link: 'https://maps.google.com/?q=Tor+Pignattara+Roma',
    },
    {
      id: 'cd2',
      name: 'বাংলা বাজার ও হালাল গ্রোসারি মিলান (লোরেতো)',
      city: 'Milano',
      category: 'grocery',
      phone: '+39 02 7654321',
      address: 'Via Padova, 88, 20127 Milano MI',
      link: 'https://maps.google.com/?q=Via+Padova+Milano',
    },
    {
      id: 'cd3',
      name: 'বাংলাদেশ দূতাবাস হেল্পডেস্ক (রোম)',
      city: 'Roma',
      category: 'embassy',
      phone: '+39 06 8086274',
      address: 'Via Antonio Bertoloni, 14, 00197 Roma RM',
      link: 'https://maps.google.com/?q=Via+Antonio+Bertoloni+14+Roma',
    },
  ],
  youtube: {
    videoUrl: 'https://www.youtube.com/watch?v=7_Y8fK9bXzY',
    title: 'ইতালি প্রবাসী বাংলাদেশিদের বিশেষ সংবাদ বুলেটিন ও লাইভ আপডেট',
  },
};

const STORAGE_KEY = 'italy_probashi_admin_config_v1';

interface AdminConfigContextType {
  config: AdminConfig;
  updateConfig: (updater: (prev: AdminConfig) => AdminConfig) => void;
  resetToDefaults: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  triggerDirectLinkAction: (fallbackCallback?: () => void) => void;
}

const AdminConfigContext = createContext<AdminConfigContextType | null>(null);

export function AdminConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AdminConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_ADMIN_CONFIG,
            ...parsed,
            ads: { ...DEFAULT_ADMIN_CONFIG.ads, ...parsed.ads },
            liveRate: { ...DEFAULT_ADMIN_CONFIG.liveRate, ...parsed.liveRate },
            adminCredentials: { ...DEFAULT_ADMIN_CONFIG.adminCredentials, ...parsed.adminCredentials },
          };
        }
      } catch {}
    }
    return DEFAULT_ADMIN_CONFIG;
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(
    () => typeof window !== 'undefined' && window.location.hash === '#admin'
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Sync with URL hash #admin on subsequent changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const updateConfig = useCallback((updater: (prev: AdminConfig) => AdminConfig) => {
    setConfig((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setConfig(DEFAULT_ADMIN_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const loginAdmin = useCallback(
    (user: string, pass: string): boolean => {
      if (
        user.trim() === config.adminCredentials.username &&
        pass.trim() === config.adminCredentials.passwordHash
      ) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    },
    [config.adminCredentials]
  );

  const logoutAdmin = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Direct link trigger helper for high-intent actions
  const triggerDirectLinkAction = useCallback(
    (fallbackCallback?: () => void) => {
      if (config.ads.allAdsEnabled && config.ads.directLink.enabled && config.ads.directLink.url) {
        try {
          window.open(config.ads.directLink.url, '_blank', 'noopener,noreferrer');
        } catch {
          // ignore popup blockers
        }
      }
      if (fallbackCallback) {
        fallbackCallback();
      }
    },
    [config.ads]
  );

  return (
    <AdminConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetToDefaults,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        triggerDirectLinkAction,
      }}
    >
      {children}
    </AdminConfigContext.Provider>
  );
}

export function useAdminConfig() {
  const ctx = useContext(AdminConfigContext);
  if (!ctx) {
    throw new Error('useAdminConfig must be used within AdminConfigProvider');
  }
  return ctx;
}
