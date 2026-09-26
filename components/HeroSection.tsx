'use client';

import React from 'react';
import {
  ShieldCheck,
  Languages,
  DollarSign,
  FileEdit,
  Building,
  ArrowRight,
  Sparkles,
  AlertCircle,
  PhoneCall,
  CheckCircle2,
  Users,
  Compass,
  BellRing,
  Home,
  MapPin,
  Calculator,
  Clock,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface HeroSectionProps {
  onQuickAction: (targetId: string, filterQuery?: string) => void;
  onEmbassyNoticeClick?: () => void;
}

export default function HeroSection({ onQuickAction, onEmbassyNoticeClick }: HeroSectionProps) {
  const { currentLang, t } = useLanguage();
  const quickActions = [
    {
      title: 'পারমেসো রিনিউ গাইড',
      subtitle: 'Permesso di Soggiorno',
      icon: ShieldCheck,
      color: 'from-emerald-600 to-teal-700',
      borderColor: 'border-emerald-400/40',
      action: () => onQuickAction('legal', 'permesso'),
    },
    {
      title: 'কোদিচে ও SPID আইডি',
      subtitle: 'Codice Fiscale & SPID',
      icon: Compass,
      color: 'from-blue-600 to-indigo-700',
      borderColor: 'border-blue-400/40',
      action: () => onQuickAction('legal', 'spid'),
    },
    {
      title: 'ইতালিয়ান ভাষা ও অডিও',
      subtitle: 'Lingua Italiana con Audio',
      icon: Languages,
      color: 'from-amber-600 to-orange-700',
      borderColor: 'border-amber-400/40',
      action: () => onQuickAction('language'),
    },
    {
      title: 'ইউরো-টাকা ক্যালকুলেটর',
      subtitle: 'Euro to BDT + ২.৫% বোনাস',
      icon: DollarSign,
      color: 'from-emerald-700 to-emerald-900',
      borderColor: 'border-emerald-300/40',
      action: () => onQuickAction('currency'),
    },
    {
      title: 'ইতালি ট্যাক্স ও নিট বেতন',
      subtitle: 'RAL, IRPEF ও বুস্তা পাগা টেবিল',
      icon: Calculator,
      color: 'from-teal-600 to-emerald-800',
      borderColor: 'border-teal-300/40',
      action: () => onQuickAction('tax-calculator'),
    },
    {
      title: 'দরকারি চিঠির ফরম্যাট',
      subtitle: 'বাসা ছাড়া, ছুটি ও পদত্যাগপত্র',
      icon: FileEdit,
      color: 'from-purple-600 to-violet-800',
      borderColor: 'border-purple-400/40',
      action: () => onQuickAction('letters'),
    },
    {
      title: 'শহরের ডিরেক্টরি ও CAF',
      subtitle: 'রোম, মিলান, ভেনিস, বলোনিয়া...',
      icon: MapPin,
      color: 'from-rose-600 to-red-800',
      borderColor: 'border-rose-400/40',
      action: () => onQuickAction('directory'),
    },
    {
      title: 'চাকরি ও রুম ভাড়া বোর্ড',
      subtitle: 'পোস্টো লেত্তো, ফ্ল্যাট ও রেস্টুরেন্ট কাজ',
      icon: Home,
      color: 'from-teal-600 to-emerald-800',
      borderColor: 'border-teal-400/40',
      action: () => onQuickAction('room-job-board'),
    },
    {
      title: 'নামাজের সময়সূচি',
      subtitle: 'রোম, মিলান ও ৫ ওয়াক্ত আজান',
      icon: Clock,
      color: 'from-emerald-700 to-teal-800',
      borderColor: 'border-emerald-400/40',
      action: () => onQuickAction('prayer-times'),
    },
    {
      title: 'দূতাবাস ও কনস্যুলেট',
      subtitle: 'রোম দূতাবাস ও মিলান সেবা',
      icon: Building,
      color: 'from-amber-600 to-yellow-800',
      borderColor: 'border-amber-400/40',
      action: () => onQuickAction('legal', 'embassy'),
    },
  ];

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      {/* Italian Flag Accent Stripes on Top Right */}
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-2 flex opacity-75">
        <div className="flex-1 bg-green-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-red-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Live Safety Announcement Ribbon */}
        <div className="mb-6 max-w-4xl mx-auto">
          <div className="bg-emerald-800/80 border border-amber-400/40 rounded-2xl p-3 sm:px-4 sm:py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-emerald-50 backdrop-blur-md shadow-lg shadow-emerald-950/20">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-amber-400 text-slate-950 shrink-0 animate-pulse">
                <BellRing className="w-4 h-4" />
              </span>
              <p className="font-medium">
                <span className="text-amber-300 font-bold">দূতাবাস অ্যালার্ট: </span>
                ভেনিস-মেস্ত্রে ভ্রাম্যমাণ পাসপোর্ট ক্যাম্প ও নতুন NID সেবার আপডেট প্রকাশিত হয়েছে।
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {onEmbassyNoticeClick && (
                <button
                  onClick={onEmbassyNoticeClick}
                  className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-transform active:scale-95 cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <span>বিজ্ঞপ্তি ও পুশ অ্যালার্ট</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Title & Subtext */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm font-semibold mb-5 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t('heroBadge', 'ইতালি প্রবাসী বাংলাদেশিদের সর্ববৃহৎ সেবা পোর্টাল')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] text-white">
            {t('heroTitle', 'ইতালিতে আপনার দিনগুলো হোক সহজ ও নিরাপদ')}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle', 'পারমেসো রিনিউ থেকে শুরু করে স্পিড আইডি, ইতালিয়ান ভাষা অডিও গাইড, অফিশিয়াল চিঠির ফরম্যাট এবং শহরভিত্তিক কাফ ও হালাল শপ ডিরেক্টরি—সবকিছু এক প্ল্যাটফর্মে।')}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-amber-300">১.৫ লাখ+</div>
              <div className="text-xs text-emerald-200 font-medium">প্রবাসী সহায়িকা</div>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-300">১০০% ফ্রি</div>
              <div className="text-xs text-emerald-200 font-medium">উন্মুক্ত লিগ্যাল তথ্য</div>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-teal-300">৭+ শহর</div>
              <div className="text-xs text-emerald-200 font-medium">রোম, মিলান, ভেনিস..</div>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-rose-300">১১২ / ১১৮</div>
              <div className="text-xs text-emerald-200 font-medium">জরুরি সাহায্য হটলাইন</div>
            </div>
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={action.action}
                className={`group relative text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-900/90 to-slate-900/90 hover:from-emerald-800 hover:to-slate-800 border ${action.borderColor} shadow-lg shadow-emerald-950/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer overflow-hidden`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-md shrink-0 group-hover:rotate-6 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
                        {action.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-200/80 font-mono mt-0.5">
                      {action.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
