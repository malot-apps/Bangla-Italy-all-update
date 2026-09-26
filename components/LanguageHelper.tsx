'use client';

import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  Search,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import { ITALIAN_PHRASES } from '@/lib/data';

export default function LanguageHelper() {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'list' | 'flashcard' | 'rules'>('list');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Flashcard mode state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [, setKnownCards] = useState<Record<string, boolean>>({});

  // Filter categories
  const categories = ['সব', ...Array.from(new Set(ITALIAN_PHRASES.map((p) => p.category)))];

  const filteredPhrases = ITALIAN_PHRASES.filter((item) => {
    const matchesCategory = selectedCategory === 'সব' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesSearch =
      item.italian.toLowerCase().includes(q) ||
      item.bangla.toLowerCase().includes(q) ||
      item.phonetic.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Audio Speech Synthesis for Italian
  const speakItalian = (text: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজার টেক্সট-টু-স্পিচ অডিও সাপোর্ট করছে না।');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.85; // Slightly slower for clear learning

    // Find Italian voice if available
    const voices = window.speechSynthesis.getVoices();
    const italianVoice = voices.find((v) => v.lang.startsWith('it'));
    if (italianVoice) {
      utterance.voice = italianVoice;
    }

    utterance.onstart = () => setPlayingId(id);
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < filteredPhrases.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    } else {
      setCurrentCardIndex(filteredPhrases.length - 1);
    }
  };

  const currentPhrase = filteredPhrases[currentCardIndex] || filteredPhrases[0];

  return (
    <section id="language" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-300 dark:border-amber-800">
            <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-bounce" />
            <span>ইতালিয়ান ভাষা সহায়িকা ও অডিও স্পিচ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            প্রয়োজনীয় ইতালিয়ান বাক্য ও সঠিক উচ্চারণ
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            কাজের জায়গা, সুপারমার্কেট, হাসপাতাল, ট্রেন-বাস ও সরকারি অফিসের জন্য প্রয়োজনীয় বাক্য শিখুন বাংলায় অর্থ ও ইতালিয়ান ভয়েস অডিওসহ।
          </p>

          {/* Navigation View Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'list'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>বাক্য তালিকা ({filteredPhrases.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('flashcard');
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'flashcard'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>ফ্ল্যাশকার্ড প্র্যাকটিস</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'rules'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>উচ্চারণ নিয়ম</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        {activeTab !== 'rules' && (
          <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentCardIndex(0);
                }}
                placeholder="ইতালিয়ান বাক্য, বাংলা অর্থ বা উচ্চারণ দিয়ে খুঁজুন (যেমন: Busta paga, হাসপাতাল, টিকিট)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-800"
                >
                  মুছুন
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentCardIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-500/50'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 1. LIST VIEW */}
        {activeTab === 'list' && (
          <div>
            {filteredPhrases.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
                  আপনার খোঁজা শব্দের কোনো বাক্য পাওয়া যায়নি।
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('সব');
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  সব বাক্য দেখুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPhrases.map((phrase) => {
                  const isPlaying = playingId === phrase.id;
                  return (
                    <div
                      key={phrase.id}
                      className="group p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Category & Audio Button */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                            {phrase.category}
                          </span>

                          {/* Speak Button */}
                          <button
                            onClick={() => speakItalian(phrase.italian, phrase.id)}
                            className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                              isPlaying
                                ? 'bg-amber-400 text-slate-950 scale-110 shadow-md'
                                : 'bg-emerald-100 hover:bg-emerald-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-300'
                            }`}
                            title="ইতালিয়ান উচ্চারণ শুনুন"
                          >
                            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                            <span className="text-[10px] hidden sm:inline">
                              {isPlaying ? 'বলছে...' : 'উচ্চারণ'}
                            </span>
                          </button>
                        </div>

                        {/* Italian Sentence */}
                        <div className="mb-2">
                          <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                            {phrase.italian}
                          </p>
                        </div>

                        {/* Phonetic Pronunciation in Bengali */}
                        <div className="mb-3 p-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 block uppercase">
                            বাংলা উচ্চারণ:
                          </span>
                          <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                            {phrase.phonetic}
                          </p>
                        </div>

                        {/* Bengali Meaning */}
                        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                          <span className="text-[10px] font-bold text-slate-400 block">অর্থ:</span>
                          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                            {phrase.bangla}
                          </p>
                        </div>
                      </div>

                      {phrase.notes && (
                        <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-100 dark:bg-slate-800/60 p-2 rounded-lg">
                          💡 {phrase.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. FLASHCARD PRACTICE VIEW */}
        {activeTab === 'flashcard' && currentPhrase && (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-4 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>
                কার্ড {currentCardIndex + 1} / {filteredPhrases.length}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                ক্লিক করে উল্টান (Flip Card)
              </span>
            </div>

            {/* Flashcard Box */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`cursor-pointer min-h-[300px] sm:min-h-[340px] p-8 rounded-3xl shadow-2xl transition-all duration-300 border flex flex-col justify-between items-center text-center ${
                isFlipped
                  ? 'bg-gradient-to-br from-emerald-900 to-teal-950 text-white border-emerald-500/50'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-800'
              }`}
            >
              <div className="w-full flex justify-between items-center text-xs">
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  {currentPhrase.category}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakItalian(currentPhrase.italian, currentPhrase.id);
                  }}
                  className="p-2.5 rounded-full bg-amber-400 text-slate-950 hover:scale-110 transition-transform shadow-md"
                  title="ইতালিয়ান অডিও শুনুন"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="my-auto py-6">
                {!isFlipped ? (
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      ইতালিয়ান বাক্য
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                      {currentPhrase.italian}
                    </h3>
                    <div className="mt-4 inline-block px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-sm font-semibold">
                      উচ্চারণ: {currentPhrase.phonetic}
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block mb-2">
                      বাংলা অনুবাদ ও অর্থ
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-300 leading-tight">
                      {currentPhrase.bangla}
                    </h3>
                    {currentPhrase.notes && (
                      <p className="mt-4 text-xs text-emerald-100 bg-emerald-800/60 p-2.5 rounded-xl">
                        💡 {currentPhrase.notes}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-400">
                {isFlipped ? 'ইতালিয়ান দেখতে আবার ট্যাপ করুন' : 'বাংলা অর্থ দেখতে কার্ডে ট্যাপ করুন'}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                onClick={handlePrevCard}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী</span>
              </button>

              <button
                onClick={() => {
                  setKnownCards((prev) => ({ ...prev, [currentPhrase.id]: true }));
                  handleNextCard();
                }}
                className="py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>জানা আছে</span>
              </button>

              <button
                onClick={handleNextCard}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>পরবর্তী</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3. PRONUNCIATION RULES */}
        {activeTab === 'rules' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                ইতালিয়ান ভাষার সঠিক উচ্চারণ নিয়মাবলী (সহজ বাংলায়)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                ইতালিয়ান বর্ণমালার উচ্চারণ একদম সরল ও ধারাবাহিক। নিচের কয়েকটি বিশেষ যুক্তবর্ণ মনে রাখলে যেকোনো ইতালিয়ান শব্দ অনর্গল পড়তে পারবেন:
              </p>

              <div className="mt-5 space-y-3">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      ১. C এবং CH এর নিয়ম:
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    • <strong>CE, CI</strong> থাকলে উচ্চারণ হবে <em>&apos;চে&apos;, &apos;চি&apos;</em> (যেমন: Ciao = চাও, Cena = চেনা)<br />
                    • <strong>CHE, CHI</strong> থাকলে উচ্চারণ হবে <em>&apos;কে&apos;, &apos;কি&apos;</em> (যেমন: Chiaro = কিয়ারো, Perché = পেরকে)<br />
                    • <strong>CA, CO, CU</strong> উচ্চারণ হবে <em>&apos;কা&apos;, &apos;কো&apos;, &apos;কু&apos;</em> (যেমন: Casa = কাসা, Cuore = কুওরে)
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      ২. GLI এবং GN এর উচ্চারণ:
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    • <strong>GLI</strong> এর উচ্চারণ হবে বাংলার <em>&apos;লিও&apos; বা &apos;লি&apos;</em> এর মতো (যেমন: Figlio = ফিলিও/পুত্র, Biglietto = বিলিয়েত্তো)<br />
                    • <strong>GN</strong> এর উচ্চারণ হবে <em>&apos;ঞ&apos; বা &apos;নিও&apos;</em> এর মতো (যেমন: Bagno = বানিও/বাথরুম, Bologna = বলোনিয়া)
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      ৩. SC এর উচ্চারণ:
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    • <strong>SCE, SCI</strong> থাকলে উচ্চারণ <em>&apos;শে&apos;, &apos;শি&apos;</em> (যেমন: Scusa = স্কুজা, Sciarpa = শার্পা/মাফলার, Scendere = শেন্দেরে)
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      ৪. H বর্ণটি সর্বদা অনুচ্চারিত (Muta):
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    • <strong>Ho</strong> = উচ্চারণ &apos;ও&apos; (আমার আছে), <strong>Hai</strong> = উচ্চারণ &apos;আই&apos; (তোমার আছে), <strong>Hanno</strong> = উচ্চারণ &apos;আন্নো&apos; (তাদের আছে)।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
