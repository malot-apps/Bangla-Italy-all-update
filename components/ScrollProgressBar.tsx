'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isInLegalSection, setIsInLegalSection] = useState<boolean>(false);
  const [legalProgress, setLegalProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Overall document scroll progress (0 - 100%)
      const docProgress = totalDocHeight > 0 ? (scrollY / totalDocHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, docProgress)));

      // Check specifically if user is reading the Legal Guides section
      const legalEl = document.getElementById('legal');
      if (legalEl) {
        const rect = legalEl.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // If the legal section is in view or active
        if (scrollY + windowHeight >= sectionTop && scrollY <= sectionTop + sectionHeight) {
          setIsInLegalSection(true);
          const currentReadingOffset = scrollY + windowHeight * 0.4 - sectionTop;
          const sectionPct = Math.min(100, Math.max(0, (currentReadingOffset / sectionHeight) * 100));
          setLegalProgress(Math.round(sectionPct));
        } else {
          setIsInLegalSection(false);
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* Background track */}
      <div className="h-1 sm:h-1.5 w-full bg-slate-900/20 dark:bg-black/30 backdrop-blur-xs">
        {/* Progress Fill Bar with Bangladesh emerald green into Italian tricolor / gold glow */}
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(16,185,129,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Reading Indicator Badge when in Legal Guides or scrolled */}
      {isInLegalSection && (
        <div className="absolute top-2 right-4 sm:right-8 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-1 rounded-full bg-emerald-950/90 dark:bg-slate-900/95 text-emerald-200 border border-emerald-500/50 shadow-lg text-[11px] font-bold backdrop-blur-md flex items-center gap-1.5 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>লিগ্যাল গাইড পাঠ অগ্রগতি:</span>
            <span className="text-amber-300 font-mono text-xs">{legalProgress}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
