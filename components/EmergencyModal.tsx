'use client';

import React from 'react';
import {
  PhoneCall,
  X,
  ShieldAlert,
  Ambulance,
  Flame,
  Shield,
  HeartHandshake,
  Volume2,
  Copy,
  Check,
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '@/lib/data';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const [copiedPhrase, setCopiedPhrase] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const emergencyPhrases = [
    {
      it: "Ho bisogno urgente di un'ambulanza a questo indirizzo!",
      phonetic: "ও বিজোনিও উরজেন্তে দি উন আম্বুলানসা আ কুয়েস্তো ইন্দিরিৎসো!",
      bn: "আমার এই ঠিকানায় দ্রুত একটি জরুরি অ্যাম্বুলেন্স দরকার!",
    },
    {
      it: "C'è una persona svenuta / gravemente ferita!",
      phonetic: "চে উনা পেরসোনা সভেনুতা / গ্রাভেমেন্তে ফেরিতা!",
      bn: "এখানে একজন অজ্ঞান / গুরুতর আহত হয়েছেন!",
    },
    {
      it: "Aiuto! C'è un incendio / una fuga di gas!",
      phonetic: "আইউতো! চে উন ইনচেন্দিও / উনা ফুগা দি গাস!",
      bn: "বাঁচাও! এখানে আগুন লেগেছে / গ্যাস লিক হচ্ছে!",
    },
    {
      it: "Chiamate subito la polizia / i carabinieri!",
      phonetic: "কিয়ামাতে সুবিটো লা পোলিজিয়া / ই কারাবিনিয়েরি!",
      bn: "দ্রুত পুলিশ বা কারাবিনিয়েরি ডাকুন!",
    },
  ];

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'it-IT';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhrase(text);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-red-500/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-600 via-rose-700 to-red-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 text-white backdrop-blur-sm animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl">জরুরি হটলাইন ও SOS গাইড</h3>
              <p className="text-xs text-rose-100">ইতালিতে তাৎক্ষণিক সহায়তা ও কল করার নম্বর</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Quick 1-Tap Dial Numbers */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              সরাসরি কল করার বাটন (টোল ফ্রি):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <a
                href="tel:118"
                className="p-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-center font-bold flex flex-col items-center justify-center shadow-lg shadow-red-600/30 transition-transform active:scale-95"
              >
                <Ambulance className="w-6 h-6 mb-1" />
                <span className="text-lg font-black font-mono">১১৮ (118)</span>
                <span className="text-[10px] font-medium text-red-100">অ্যাম্বুলেন্স</span>
              </a>

              <a
                href="tel:112"
                className="p-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-center font-bold flex flex-col items-center justify-center shadow-md transition-transform active:scale-95"
              >
                <Shield className="w-6 h-6 mb-1 text-amber-400" />
                <span className="text-lg font-black font-mono">১১২ (112)</span>
                <span className="text-[10px] font-medium text-slate-300">কারাবিনিয়েরি</span>
              </a>

              <a
                href="tel:115"
                className="p-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-center font-bold flex flex-col items-center justify-center shadow-md transition-transform active:scale-95"
              >
                <Flame className="w-6 h-6 mb-1" />
                <span className="text-lg font-black font-mono">১১৫ (115)</span>
                <span className="text-[10px] font-medium text-orange-100">দমকল বাহিনী</span>
              </a>

              <a
                href="tel:1522"
                className="p-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-center font-bold flex flex-col items-center justify-center shadow-md transition-transform active:scale-95"
              >
                <HeartHandshake className="w-6 h-6 mb-1" />
                <span className="text-lg font-black font-mono">১৫২২</span>
                <span className="text-[10px] font-medium text-purple-100">নারী ও পরিবার</span>
              </a>
            </div>
          </div>

          {/* Embassy Hotlines */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2">
              বাংলাদেশ দূতাবাস ও কনস্যুলার হেল্পলাইন
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a
                href="tel:+39068078570"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-200"
              >
                <span>রোম দূতাবাস:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">+39 06 8078570</span>
              </a>
              <a
                href="tel:+390287068580"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-200"
              >
                <span>মিলান কনস্যুলেট:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">+39 02 87068580</span>
              </a>
            </div>
          </div>

          {/* Emergency Italian Phrases for 118 / 112 calls */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              ইমার্জেন্সি ফোন অপারেটরকে বলার জরুরি ইতালিয়ান বাক্য:
            </h4>
            <div className="space-y-2.5">
              {emergencyPhrases.map((phrase, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
                      {phrase.it}
                    </p>
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      উচ্চারণ: {phrase.phonetic}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                      অর্থ: {phrase.bn}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleSpeak(phrase.it)}
                      className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-slate-800 text-amber-800 dark:text-amber-300 transition-colors"
                      title="উচ্চারণ শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(phrase.it)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                      title="কপি করুন"
                    >
                      {copiedPhrase === phrase.it ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
