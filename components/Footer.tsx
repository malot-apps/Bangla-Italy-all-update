'use client';

import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  PhoneCall,
  ExternalLink,
  MapPin,
  FileText,
  DollarSign,
  BookOpen,
  ArrowUp,
  Share2,
  Home,
  Check,
  Tv,
  Calculator,
  Globe,
  Languages,
  Clock,
  Lock,
} from 'lucide-react';
import { useAdminConfig } from '@/lib/AdminConfigContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onEmergencyClick: () => void;
}

export default function Footer({ onNavigate, onEmergencyClick }: FooterProps) {
  const { setIsAdminOpen } = useAdminConfig();
  const [copiedLink, setCopiedLink] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'ইতালিপ্রবাসী ডটকম - Bangla-Italy Portal',
        text: 'ইতালিতে প্রবাসী বাংলাদেশিদের জন্য সর্বাত্মক সহায়িকা ও সেবা পোর্টাল',
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-emerald-900/80">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-lg shadow-md">
                🇮🇹
              </div>
              <span className="text-xl font-extrabold text-white">
                ইতালিপ্রবাসী<span className="text-amber-400">.কম</span>
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              ইতালিতে বসবাসরত সকল প্রবাসী বাংলাদেশি ভাই-বোনদের দৈনন্দিন সহায়তা, সঠিক লিগ্যাল গাইড ও কমিউনিটি সংযোগের অলাভজনক উন্মুক্ত পোর্টাল।
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-xs font-bold text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'লিঙ্ক কপি হয়েছে!' : 'বন্ধুদের সাথে শেয়ার করুন'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">
              গুরুত্বপূর্ণ বিভাগ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('currency')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ইউরো টু টাকা লাইভ কনভার্টার (+২.৫%)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tax-calculator')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ইতালি ট্যাক্স ও নিট বেতন টেবিল (IRPEF / RAL)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('translator')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Languages className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ইতালি প্রবাসী ভয়েস ও টেক্সট ট্রান্সলেটর</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('language')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ইতালিয়ান ভাষা অডিও ও উচ্চারণ গাইড</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>পারমেসো, স্পিড ও কনস্যুলার গাইড</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('letters')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ইতালিয়ান চিঠি ও অ্যাপ্লিকেশন ফরম্যাট (PDF)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>শহরের CAF ও হালাল শপ ডিরেক্টরি</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prayer-times')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ইতালিতে আজকের ইসলামিক নামাজের সময়সূচি</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('room-job-board')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-emerald-400" />
                  <span>চাকরি ও রুম / বাসা ভাড়া বোর্ড</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('italy-probashi')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ইতালি প্রবাসী সংবাদ ও বিশেষ ভিডিও</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news-media')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Tv className="w-3.5 h-3.5 text-emerald-400" />
                  <span>তাজা খবর ও লাইভ টিভি (Live News & TV)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">
              জরুরি হটলাইন (Italy)
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between">
                <span>সার্বিক জরুরি ও পুলিশ:</span>
                <a href="tel:112" className="font-bold text-amber-300 font-mono text-sm hover:underline">
                  ১১২ (112)
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>অ্যাম্বুলেন্স ও মেডিকেল:</span>
                <a href="tel:118" className="font-bold text-rose-300 font-mono text-sm hover:underline">
                  ১১৮ (118)
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>বাংলাদেশ দূতাবাস রোম:</span>
                <a href="tel:+39068078570" className="font-bold text-emerald-300 font-mono text-xs hover:underline">
                  +39 06 8078570
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>কনস্যুলেট মিলান:</span>
                <a href="tel:+390287068580" className="font-bold text-emerald-300 font-mono text-xs hover:underline">
                  +39 02 87068580
                </a>
              </li>
            </ul>
          </div>

          {/* Official Gov Links */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">
              ইতালির সরকারি পোর্টাল
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-200/80">
              <li>
                <a
                  href="https://www.poliziadistato.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Polizia di Stato</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.portaleimmigrazione.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Portale Immigrazione</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.inps.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>INPS (ইনপস পোর্টাল)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.agenziaentrate.gov.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Agenzia delle Entrate</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <div className="space-y-1 text-center md:text-left">
            <p className="leading-relaxed max-w-2xl">
              <strong>ডিসক্লেইমার:</strong> এই পোর্টালটি প্রবাসীদের প্রাথমিক তথ্য ও সহায়তার জন্য তৈরি একটি উন্মুক্ত কমিউনিটি মাধ্যম। চূড়ান্ত আইনি সিদ্ধান্তের জন্য সংশ্লিষ্ট সরকারি দপ্তর বা অনুমোদিত আইনজীবি/CAF কর্মকর্তার সাথে যোগাযোগ করুন।
            </p>
            <div className="pt-1 flex items-center justify-center md:justify-start gap-4">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 text-3xs text-emerald-400/70 hover:text-amber-300 transition-colors cursor-pointer"
                title="অ্যাডমিন প্যানেল ওপেন করুন"
              >
                <Lock className="w-3 h-3" />
                <span>অ্যাডমিন প্যানেল কন্ট্রোল (#admin)</span>
              </button>
              <span className="text-emerald-800">·</span>
              <span className="text-3xs text-emerald-500/60">কপিরাইট © ২০২৬ ইতালিপ্রবাসী ডটকম</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white flex items-center gap-1 font-bold text-xs transition-colors shrink-0 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>উপরে যান</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
