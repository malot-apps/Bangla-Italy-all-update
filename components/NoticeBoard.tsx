'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  Briefcase,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  CheckCircle2,
  Send,
  MessageCircle,
  Sparkles,
  BellRing,
  Calendar,
  Building2,
} from 'lucide-react';
import { SCAM_WARNINGS, FREQUENT_FAQS, EMBASSY_ALERTS } from '@/lib/data';

interface NoticeBoardProps {
  onOpenEmbassyAlerts?: () => void;
}

export default function NoticeBoard({ onOpenEmbassyAlerts }: NoticeBoardProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [questionSubmitted, setQuestionSubmitted] = useState<boolean>(false);

  const jobPortals = [
    {
      name: 'Indeed Italia',
      url: 'https://it.indeed.com',
      description: 'ইতালির বৃহত্তম চাকরির ওয়েবসাইট (রেস্টুরেন্ট, ফ্যাক্টরি, ওয়্যারহাউস ও ড্রাইভিং কাজ)',
      badge: 'জনপ্রিয়',
    },
    {
      name: 'InfoJobs Italia',
      url: 'https://www.infojobs.it',
      description: 'কোম্পানি ও কর্পোরেট সেক্টরে সরাসরি সিভি জমা দেওয়ার শীর্ষ পোর্টাল',
      badge: 'ভেরিফায়েড',
    },
    {
      name: 'Subito.it (Lavoro)',
      url: 'https://www.subito.it/offerte-lavoro/',
      description: 'লোকাল শহরে তাৎক্ষণিক পার্ট-টাইম ও ফুল-টাইম কাজের সুযোগ',
      badge: 'লোকাল জব',
    },
    {
      name: 'Centro per l\'Impiego (সরকারি কর্মসংস্থান)',
      url: 'https://www.anpal.gov.it',
      description: 'প্রতিটি শহরের সরকারি কর্মসংস্থান এক্সচেঞ্জ অফিস ও ফ্রি ভোকেশনাল কোর্স',
      badge: 'সরকারি',
    },
  ];

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setQuestionSubmitted(true);
    setTimeout(() => {
      setUserQuestion('');
      setQuestionSubmitted(false);
    }, 4000);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            PART 0: EMBASSY NOTIFICATIONS & CONSULAR CAMPS SHOWCASE
           ========================================================================= */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white shadow-xl border border-emerald-500/40 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-emerald-800/60">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20">
                  <BellRing className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      বাংলাদেশ দূতাবাস নোটিশ ও ভ্রাম্যমাণ কনস্যুলার ক্যাম্প
                    </h3>
                    <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-200 border border-emerald-500/30">
                      লাইভ পুশ সিস্টেম
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5">
                    রোম দূতাবাস ও মিলান কনস্যুলেট জেনারেলের সর্বশেষ পাসপোর্ট ডেলিভারি ও আঞ্চলিক সেবা ক্যাম্প
                  </p>
                </div>
              </div>

              {onOpenEmbassyAlerts && (
                <button
                  onClick={onOpenEmbassyAlerts}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <BellRing className="w-4 h-4" />
                  <span>পুশ নোটিফিকেশন সেন্টার খুলুন</span>
                </button>
              )}
            </div>

            {/* Quick Cards Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EMBASSY_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  onClick={onOpenEmbassyAlerts}
                  className="p-4 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-700/50 hover:border-amber-400/60 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 border border-emerald-600/40">
                        {alert.badge}
                      </span>
                      <span className="text-[10px] text-emerald-300/80 font-mono">
                        {alert.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {alert.title}
                    </h4>

                    <p className="text-[11px] text-emerald-200/80 mt-1 line-clamp-2">
                      {alert.summary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[11px] font-bold text-amber-300">
                    <span>{alert.mission}</span>
                    <span className="group-hover:translate-x-1 transition-transform">বিস্তারিত →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 1: SCAM AWARENESS & SAFETY WARNINGS
           ========================================================================= */}
        <div className="mb-14">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-300 dark:border-amber-800">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>কমিউনিটি নিরাপত্তা ও প্রতারণা রোধ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              প্রতারণা থেকে সাবধান ও আইনি সতর্কতা
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              ভুয়া নুলা ওস্তা, ফেক রেসিডেন্স ও অবৈধ দালাল চক্রের ফাঁদে পা দেবেন না।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SCAM_WARNINGS.map((warn, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-amber-50/50 dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                    {warn.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {warn.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-slate-800 flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>সর্বদা অফিশিয়াল আইন মেনে চলুন</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            PART 2: VERIFIED JOB PLATFORMS & CAREER TIPS
           ========================================================================= */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  ইতালিতে চাকরি খোঁজার নির্ভরযোগ্য ওয়েবসাইটসমূহ
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                বৈধভাবে নিজের যোগ্যতা অনুযায়ী কাজের সন্ধান করুন
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              ফ্রি অফিশিয়াল পোর্টাল
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobPortals.map((job, idx) => (
              <a
                key={idx}
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {job.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {job.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                  <span>সাইট দেখুন</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* =========================================================================
            PART 3: FREQUENTLY ASKED QUESTIONS (FAQS) & COMMUNITY HELP
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                সাধারণ প্রশ্নোত্তর (FAQ)
              </h3>
            </div>

            {FREQUENT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/60"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Community Question Box (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-950 text-white p-6 sm:p-7 rounded-3xl border border-emerald-800/50 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-amber-400" />
              <h4 className="text-base sm:text-lg font-bold">আপনার কোনো প্রশ্ন আছে?</h4>
            </div>
            <p className="text-xs text-emerald-200/90 mb-5 leading-relaxed">
              ইতালির পারমেসো, ট্যাক্স বা কোনো সমস্যা নিয়ে প্রশ্ন পাঠালে আমাদের কমিউনিটি গাইড টিমে যুক্ত করা হবে।
            </p>

            {questionSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-800/80 border border-emerald-400 text-center animate-in zoom-in-95">
                <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h5 className="font-bold text-sm text-white">ধন্যবাদ! প্রশ্নটি গৃহীত হয়েছে।</h5>
                <p className="text-xs text-emerald-200 mt-1">
                  আমরা দ্রুততম সময়ে গাইড আপডেট করে উত্তর সংযুক্ত করব।
                </p>
              </div>
            ) : (
              <form onSubmit={handleAskQuestion} className="space-y-3">
                <textarea
                  rows={4}
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="আপনার প্রশ্ন বা জিজ্ঞাসা বাংলায় বিস্তারিত লিখুন..."
                  className="w-full p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-700/60 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>প্রশ্ন জমা দিন</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
