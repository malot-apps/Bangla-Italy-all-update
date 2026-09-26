'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  WifiOff,
  Wifi,
  X,
  Share,
  CheckCircle2,
  Sparkles,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PWAController() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    }
    return false;
  });
  const [isIOS, setIsIOS] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    }
    return false;
  });
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return navigator.onLine;
    }
    return true;
  });
  const [showOfflineBanner, setShowOfflineBanner] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !navigator.onLine;
    }
    return false;
  });
  const [dismissedInstallBanner, setDismissedInstallBanner] = useState<boolean>(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            // Check for updates
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[PWA] New version ready.');
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }

    // 2. Capture beforeinstallprompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 3. Connectivity detection
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineBanner(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      {/* =========================================================================
          1. OFFLINE STATUS BANNER
         ========================================================================= */}
      {showOfflineBanner && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-amber-950/95 border border-amber-500/80 text-amber-100 p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0 mt-0.5">
                <WifiOff className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>অফলাইন মোড সক্রিয় (Offline Mode)</span>
                </h4>
                <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                  ইন্টারনেট সংযোগ বিচ্ছিন্ন। তবে অনুবাদ বাক্যাবলি, অফলাইন চিট শিট ও লিগ্যাল গাইড আপনার ডিভাইসে ক্যাশ করা রয়েছে।
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href="#translator"
                    className="text-[11px] font-bold underline text-amber-300 hover:text-white"
                  >
                    অনুবাদ বাক্য দেখুন →
                  </a>
                  <a
                    href="#legal"
                    className="text-[11px] font-bold underline text-amber-300 hover:text-white ml-2"
                  >
                    লিগ্যাল গাইড →
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowOfflineBanner(false)}
              className="text-amber-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* =========================================================================
          2. IN-APP PWA INSTALL FLOATING BANNER (Appears when installable)
         ========================================================================= */}
      {!isInstalled && (deferredPrompt || isIOS) && !dismissedInstallBanner && (
        <aside
          role="region"
          aria-label="PWA Install Prompt"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm bg-emerald-950/95 dark:bg-slate-900/95 border border-emerald-500/60 p-4 rounded-3xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 text-white"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
              🇮🇹
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-600">
                  অফলাইন অ্যাপ
                </span>
                <button
                  onClick={() => setDismissedInstallBanner(true)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5"
                  title="পরে"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <h5 className="font-black text-sm text-white">
                ফোনে ইনস্টল করুন (Install App)
              </h5>
              <p className="text-xs text-emerald-100/80 leading-snug">
                হোমস্ক্রিনে যুক্ত করলে ইন্টারনেট ছাড়াও জরুরি ইতালিয়ান অনুবাদ ও গাইড ব্যবহার করতে পারবেন।
              </p>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleInstallClick}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isIOS ? 'আইফোনে যুক্ত করুন' : 'ইনস্টল করুন'}</span>
                </button>
                <button
                  onClick={() => setDismissedInstallBanner(true)}
                  className="px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  পরে
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* =========================================================================
          3. IOS SAFARI STEP-BY-STEP INSTALL GUIDE MODAL
         ========================================================================= */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-emerald-500 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-base text-slate-900 dark:text-white">
                  আইফোন / আইপ্যাডে ইনস্টল করুন
                </h4>
                <p className="text-xs text-slate-500">Apple Safari নির্দেশিকা</p>
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  ১
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  সাফারি ব্রাউজারের নিচে থাকা <strong>Share (শেয়ার)</strong> আইকনটিতে ট্যাপ করুন।
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  ২
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  মেনু স্ক্রোল করে নিচে নেমে <strong>&apos;Add to Home Screen&apos;</strong> (হোম স্ক্রিনে যুক্ত করুন) নির্বাচন করুন।
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  ৩
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  উপরে ডানপাশে <strong>&apos;Add&apos;</strong> এ চাপুন। অ্যাপটি সরাসরি আপনার আইফোনের অ্যাপের মতো চালু হবে!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
            >
              বুঝেছি
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Compact In-App Install Button component for Header / Navbar
export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    }
    return false;
  });
  const [isIOS, setIsIOS] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    }
    return false;
  });
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (isInstalled) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-800/80 text-emerald-200 text-[11px] font-bold border border-emerald-600/50">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>ইনস্টল করা আছে</span>
      </span>
    );
  }

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      <button
        onClick={handleInstall}
        title="অ্যাপটি ডিভাইসে ইনস্টল করুন"
        className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
      >
        <Download className="w-3.5 h-3.5" />
        <span>অ্যাপ ইনস্টল</span>
      </button>

      {/* iOS Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xs w-full border border-emerald-500 text-center space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              আইফোনে যুক্ত করার নিয়ম:
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              সাফারি মেনুর <strong>Share</strong> চাপুন, তারপর <strong>&apos;Add to Home Screen&apos;</strong> এ ট্যাপ করুন।
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </>
  );
}
