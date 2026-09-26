'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  BookOpen,
  ShieldCheck,
  FileText,
  MapPin,
  ArrowRight,
  Sparkles,
  BellRing,
  Briefcase,
  Clock,
} from 'lucide-react';
import {
  ITALIAN_PHRASES,
  LEGAL_GUIDES,
  LETTER_TEMPLATES,
  COMMUNITY_DIRECTORY,
  EMBASSY_ALERTS,
  COMMUNITY_ROOM_JOBS,
} from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (sectionId: string, itemId?: string) => void;
  onOpenEmbassyModal?: () => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSelectResult,
  onOpenEmbassyModal,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent if listening, or we can handle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingPhrases = q
    ? ITALIAN_PHRASES.filter(
        (p) =>
          p.italian.toLowerCase().includes(q) ||
          p.bangla.toLowerCase().includes(q) ||
          p.phonetic.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchingGuides = q
    ? LEGAL_GUIDES.filter(
        (g) =>
          g.titleBn.toLowerCase().includes(q) ||
          g.titleIt.toLowerCase().includes(q) ||
          g.summary.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchingLetters = q
    ? LETTER_TEMPLATES.filter(
        (l) =>
          l.titleBn.toLowerCase().includes(q) ||
          l.titleIt.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchingDirectory = q
    ? COMMUNITY_DIRECTORY.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.address.toLowerCase().includes(q) ||
          d.services.some((s) => s.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const matchingAlerts = q
    ? EMBASSY_ALERTS.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.badge.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchingJobsRooms = q
    ? COMMUNITY_ROOM_JOBS.filter(
        (rj) =>
          rj.title.toLowerCase().includes(q) ||
          rj.area.toLowerCase().includes(q) ||
          rj.city.toLowerCase().includes(q) ||
          rj.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchingPrayer =
    Boolean(q) &&
    ('নামাজের সময়সূচি'.includes(q) ||
      'নামাজ'.includes(q) ||
      'prayer'.includes(q) ||
      'namaz'.includes(q) ||
      'azan'.includes(q) ||
      'আজান'.includes(q) ||
      'রোজা'.includes(q) ||
      'ইফতার'.includes(q) ||
      'সাহরি'.includes(q) ||
      'preghiera'.includes(q) ||
      'iftar'.includes(q) ||
      'qibla'.includes(q) ||
      'কিবলা'.includes(q));

  const hasResults =
    matchingPrayer ||
    matchingPhrases.length > 0 ||
    matchingGuides.length > 0 ||
    matchingLetters.length > 0 ||
    matchingDirectory.length > 0 ||
    matchingAlerts.length > 0 ||
    matchingJobsRooms.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="যা খুঁজতে চান লিখুন (যেমন: পারমেসো, Busta paga, স্পিড, রেমিট্যান্স, ডিরেক্টরি)..."
            className="w-full text-base sm:text-lg font-medium bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {!query ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-80" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                ইতালিপ্রবাসী পোর্টালে দ্রুত খুঁজুন
              </p>
              <p className="text-xs text-slate-500 mt-1">
                বাক্য, লিগ্যাল গাইড, দরকারি চিঠির ফর্ম বা কাফ/গ্রোসারি দোকানের নাম লিখুন
              </p>

              {/* Popular Search Suggestions */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {['নামাজের সময়সূচি', 'পারমেসো রিনিউ', 'Busta paga', 'SPID তৈরি', 'বাসা ছাড়ার চিঠি', 'বিকাশ রেমিট্যান্স'].map(
                  (sug) => (
                    <button
                      key={sug}
                      onClick={() => setQuery(sug)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-950 hover:text-emerald-800 transition-colors cursor-pointer"
                    >
                      {sug}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-slate-500">
              <p className="font-bold text-base text-slate-800 dark:text-slate-200">
                &quot;{query}&quot; এর কোনো ফলাফল মেলেনি
              </p>
              <p className="text-xs text-slate-400 mt-1">অন্য কোনো শব্দ দিয়ে চেষ্টা করুন</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Prayer Times Highlight if matched */}
              {matchingPrayer && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>দৈনিক ইসলামিক সময়সূচি</span>
                  </h4>
                  <div
                    onClick={() => {
                      onSelectResult('prayer-times');
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300/80 dark:border-emerald-800 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">
                        ইতালিতে আজকের ইসলামিক নামাজের সময়সূচি (রোম, মিলান, ভেনিস ও জিপিএস)
                      </span>
                      <span className="text-xs text-emerald-700 dark:text-emerald-300">
                        ৫ ওয়াক্ত নামাজ, সাহরি ও ইফতারের সময়, কিবলা দিক ও আজানের সুর
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              )}
              {/* Phrases */}
              {matchingPhrases.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    <span>ইতালিয়ান ভাষা সহায়িকা ({matchingPhrases.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingPhrases.map((phrase) => (
                      <div
                        key={phrase.id}
                        onClick={() => {
                          onSelectResult('language');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white block">
                            {phrase.italian}
                          </span>
                          <span className="text-xs text-emerald-700 dark:text-emerald-300">
                            {phrase.bangla}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Legal Guides */}
              {matchingGuides.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>লিগ্যাল ও ডকুমেন্টেশন গাইড ({matchingGuides.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingGuides.map((guide) => (
                      <div
                        key={guide.id}
                        onClick={() => {
                          onSelectResult('legal');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white block">
                            {guide.titleBn}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {guide.titleIt}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Letter Templates */}
              {matchingLetters.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-500" />
                    <span>ইতালিয়ান চিঠির ফরম্যাট ({matchingLetters.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingLetters.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          onSelectResult('letters');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-800 hover:border-purple-400 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white block">
                            {l.titleBn}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {l.titleIt}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Directory */}
              {matchingDirectory.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>কমিউনিটি শপ ও সার্ভিস ডিরেক্টরি ({matchingDirectory.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingDirectory.map((dir) => (
                      <div
                        key={dir.id}
                        onClick={() => {
                          onSelectResult('directory');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white block">
                            {dir.name} ({dir.city})
                          </span>
                          <span className="text-xs text-slate-500">
                            {dir.address}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Embassy Alerts */}
              {matchingAlerts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BellRing className="w-3.5 h-3.5 text-amber-500" />
                    <span>বাংলাদেশ দূতাবাস বিজ্ঞপ্তি ও ক্যাম্প ({matchingAlerts.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => {
                          onClose();
                          if (onOpenEmbassyModal) onOpenEmbassyModal();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                              {alert.badge}
                            </span>
                            <span className="text-[10px] text-slate-400">{alert.mission}</span>
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white block">
                            {alert.title}
                          </span>
                          <span className="text-xs text-slate-500">
                            {alert.summary}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Room & Job Listings */}
              {matchingJobsRooms.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-teal-500" />
                    <span>কমিউনিটি চাকরি ও রুম ভাড়া ({matchingJobsRooms.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingJobsRooms.map((rj) => (
                      <div
                        key={rj.id}
                        onClick={() => {
                          onSelectResult('room-job-board');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200 dark:border-slate-800 hover:border-teal-400 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-600 text-white">
                              {rj.type === 'job' ? 'চাকরি' : 'রুম ভাড়া'}
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold">{rj.city} • {rj.area}</span>
                            <span className="text-[10px] font-bold text-amber-500">{rj.priceOrSalary}</span>
                          </div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white block">
                            {rj.title}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
