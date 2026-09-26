'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { useAdminConfig, AdSlotConfig } from '@/lib/AdminConfigContext';
import Image from 'next/image';

interface AdSlotProps {
  position: 'topBanner' | 'nativeInFeed' | 'floatingSidebar' | 'mobileStickyBottom';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const { config } = useAdminConfig();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  const slotConfig: AdSlotConfig = config.ads[position];
  const isGloballyEnabled = config.ads.allAdsEnabled;
  const isSlotEnabled = slotConfig?.enabled && isGloballyEnabled && !isDismissed;

  // Execute raw script tags safely if type is 'script'
  useEffect(() => {
    if (!isSlotEnabled || slotConfig?.type !== 'script' || !slotConfig.scriptCode) return;

    if (scriptContainerRef.current) {
      scriptContainerRef.current.innerHTML = '';
      const range = document.createRange();
      range.selectNode(scriptContainerRef.current);
      const documentFragment = range.createContextualFragment(slotConfig.scriptCode);
      scriptContainerRef.current.appendChild(documentFragment);
    }
  }, [isSlotEnabled, slotConfig?.type, slotConfig?.scriptCode]);

  if (!isSlotEnabled) {
    return null;
  }

  // 1. Header Top Banner (728x90 Desktop, 320x50 Mobile)
  if (position === 'topBanner') {
    return (
      <div className={`w-full max-w-5xl mx-auto px-4 my-3 ${className}`}>
        <div className="relative rounded-xl overflow-hidden border border-amber-200/80 dark:border-amber-900/60 bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50 dark:from-slate-900 dark:via-emerald-950/40 dark:to-slate-900 shadow-2xs">
          <div className="absolute top-1 right-2 text-3xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1 z-10">
            <span>বিজ্ঞাপন / Ad</span>
          </div>

          {slotConfig.type === 'script' ? (
            <div ref={scriptContainerRef} className="min-h-[60px] sm:min-h-[90px] flex items-center justify-center p-2" />
          ) : (
            <a
              href={slotConfig.customUrl || '#currency'}
              target={slotConfig.customUrl?.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 sm:px-6 sm:py-3.5 gap-4 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {slotConfig.customImage && (
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-amber-300 dark:border-amber-700">
                    <Image
                      src={slotConfig.customImage}
                      alt="Sponsored"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                      স্পনসরড অফার
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-2xs text-slate-500 truncate">ইতালিপ্রবাসী পার্টনার</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {slotConfig.customTitle}
                  </h4>
                  {slotConfig.customSubtitle && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate hidden sm:block">
                      {slotConfig.customSubtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs group-hover:bg-amber-600 transition-colors">
                <span>{slotConfig.customButtonText || 'দেখুন'}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          )}
        </div>
      </div>
    );
  }

  // 2. In-Feed Native Ad Card
  if (position === 'nativeInFeed') {
    return (
      <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8 ${className}`}>
        <div className="relative rounded-2xl overflow-hidden border border-amber-300/80 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200/60 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>স্পন্সরড রেকমেন্ডেশন / Sponsored Partner</span>
            </div>
            <span className="text-3xs text-slate-400 uppercase tracking-widest font-mono">ADVERTISEMENT</span>
          </div>

          {slotConfig.type === 'script' ? (
            <div ref={scriptContainerRef} className="min-h-[140px] flex items-center justify-center" />
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start sm:items-center gap-4">
                {slotConfig.customImage && (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-amber-300 dark:border-amber-700 shadow-2xs">
                    <Image
                      src={slotConfig.customImage}
                      alt="Native Sponsor"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {slotConfig.customTitle}
                  </h4>
                  {slotConfig.customSubtitle && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {slotConfig.customSubtitle}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-2xs text-emerald-700 dark:text-emerald-400 font-medium">
                    <span>যাচাইকৃত সার্ভিস</span>
                    <span aria-hidden="true">·</span>
                    <span>সরাসরি যোগাযোগ ও পরামর্শ</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href={slotConfig.customUrl || '#legal'}
                  target={slotConfig.customUrl?.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/10 transition-transform active:scale-95"
                >
                  <span>{slotConfig.customButtonText || 'বিস্তারিত জানুন'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Floating Sidebar Sticky Banner (Desktop 300x250 bottom right)
  if (position === 'floatingSidebar') {
    return (
      <div className="hidden lg:block fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom duration-300">
        <div className="relative w-[300px] rounded-2xl overflow-hidden border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 shadow-xl">
          {/* Close button */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss Ad"
            className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white text-2xs font-semibold flex items-center justify-between">
            <span>স্পনসরড নোটিশ</span>
            <span className="text-amber-300">AD 300x250</span>
          </div>

          {slotConfig.type === 'script' ? (
            <div ref={scriptContainerRef} className="w-[300px] min-h-[220px] flex items-center justify-center p-2" />
          ) : (
            <div className="p-3">
              {slotConfig.customImage && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2.5 border border-slate-200 dark:border-slate-800">
                  <Image
                    src={slotConfig.customImage}
                    alt="Promo"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                {slotConfig.customTitle}
              </h5>
              <div className="mt-2.5">
                <a
                  href={slotConfig.customUrl || '#currency'}
                  target={slotConfig.customUrl?.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors"
                >
                  <span>{slotConfig.customButtonText || 'ক্লিক করুন'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. Mobile Bottom Sticky Banner (320x50 with close button)
  if (position === 'mobileStickyBottom') {
    return (
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-amber-500/40 backdrop-blur-md px-3 py-1.5 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          {slotConfig.type === 'script' ? (
            <div ref={scriptContainerRef} className="flex-1 min-h-[46px] flex items-center justify-center overflow-hidden" />
          ) : (
            <a
              href={slotConfig.customUrl || '#currency'}
              className="flex-1 flex items-center gap-2 min-w-0"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-ping" />
              <div className="min-w-0 flex-1">
                <span className="text-3xs uppercase font-bold text-amber-400 tracking-wider block">
                  বিজ্ঞাপন / SPONSORED
                </span>
                <p className="text-xs font-semibold text-white truncate">
                  {slotConfig.customTitle}
                </p>
              </div>
              <div className="shrink-0 px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-2xs font-extrabold whitespace-nowrap">
                {slotConfig.customButtonText || 'রেট দেখুন'}
              </div>
            </a>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Close Bottom Banner"
            className="p-1 rounded-full text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
