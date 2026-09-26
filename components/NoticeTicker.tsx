'use client';

import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, X, ChevronRight } from 'lucide-react';
import { useAdminConfig } from '@/lib/AdminConfigContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function NoticeTicker() {
  const { config } = useAdminConfig();
  const { currentLang } = useLanguage();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const activeNotices = config.notices.filter(
    (n) => n.active && !dismissedIds.includes(n.id)
  );

  if (activeNotices.length === 0) return null;

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  return (
    <div className="w-full bg-slate-900 border-b border-amber-500/30 text-white">
      {activeNotices.map((notice) => {
        const text =
          currentLang === 'bn'
            ? notice.textBn
            : currentLang === 'it'
            ? notice.textIt
            : notice.textEn;

        const isUrgent = notice.type === 'urgent';
        const isWarning = notice.type === 'warning';

        return (
          <div
            key={notice.id}
            className={`px-4 py-2 flex items-center justify-between gap-3 text-xs border-b border-slate-800 last:border-b-0 ${
              isUrgent
                ? 'bg-red-950/70 text-red-200'
                : isWarning
                ? 'bg-amber-950/60 text-amber-200'
                : 'bg-emerald-950/60 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0 max-w-6xl mx-auto flex-1">
              <span className="shrink-0">
                {isUrgent ? (
                  <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
                ) : isWarning ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <Info className="w-4 h-4 text-emerald-400" />
                )}
              </span>

              <span className="text-3xs uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shrink-0 bg-white/10">
                {isUrgent
                  ? currentLang === 'bn' ? 'জরুরি' : 'URGENT'
                  : isWarning
                  ? currentLang === 'bn' ? 'সতর্কতা' : 'WARNING'
                  : currentLang === 'bn' ? 'নোটিস' : 'NOTICE'}
              </span>

              <p className="truncate font-medium">{text}</p>
            </div>

            <button
              onClick={() => handleDismiss(notice.id)}
              aria-label="Dismiss notice"
              className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
