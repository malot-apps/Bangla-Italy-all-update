'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Radio,
  Tv,
  ExternalLink,
  RefreshCw,
  Clock,
  Calendar,
  Newspaper,
  Maximize2,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  FileCheck,
} from 'lucide-react';

interface ExpatNewsItem {
  id: string;
  title: string;
  source: string;
  pubDate: string;
  link: string;
  snippet: string;
}

interface ExpatStream {
  id: string;
  title: string;
  category: string;
  channel: string;
  badge: string;
  embedUrl: string;
  description: string;
}

// 6 Curated Initial/Fallback News Cards for 'ইতালি প্রবাসী'
const INITIAL_EXPAT_NEWS: ExpatNewsItem[] = [
  {
    id: 'exp-1',
    title: 'ইতালির মেলোনি সরকারের নতুন ভিসা ও কাজের অনুমতি নীতিমালায় প্রবাসীদের জন্য বিশেষ দিকনির্দেশনা',
    source: 'এখন টিভি',
    pubDate: 'আজ, সকাল ৯:৩০',
    link: 'https://news.google.com/search?q=ইতালি+প্রবাসী',
    snippet: 'ইতালিতে নিয়মিত বসবাসকারী প্রবাসী বাংলাদেশিদের ভিসা রিনিউ এবং স্থানীয় কাজের চুক্তি নবায়নে নতুন নীতিমালার গুরুত্বপূর্ণ বিষয় তুলে ধরা হয়েছে।',
  },
  {
    id: 'exp-2',
    title: 'রোম ও মিলান দূতাবাসে ই-পাসপোর্ট সেবা দ্রুততর করতে ভ্রাম্যমাণ কনস্যুলার ক্যাম্পের উদ্যোগ',
    source: 'প্রথম আলো',
    pubDate: 'আজ, সকাল ৮:১৫',
    link: 'https://news.google.com/search?q=ইতালি+প্রবাসী',
    snippet: 'ভেনিস, মেস্ত্রে, বলোনিয়া ও নাপোলির প্রবাসী বাংলাদেশিদের সরাসরি সেবা দিতে বিশেষ ভ্রাম্যমাণ টিম গঠন করেছে ইতালি বাংলাদেশ দূতাবাস।',
  },
  {
    id: 'exp-3',
    title: 'দেক্রেতো ফ্লুসি (Decreto Flussi) ২০২৬: কৃষি ও পর্যটন খাতে নাল্লা ওস্তা যাচাইয়ে পুলিশের কড়াকড়ি',
    source: 'বাংলা ট্রিবিউন',
    pubDate: 'গতকাল, সন্ধ্যা ৭:২০',
    link: 'https://news.google.com/search?q=ইতালি+প্রবাসী',
    snippet: 'ভুয়া স্পন্সর ও দালালদের দৌরাত্ম্য বন্ধে প্রিফেত্তুরা ও স্থানীয় শ্রম দফতর যৌথভাবে প্রতিটি কাজের চুক্তিপত্র কঠোরভাবে তদন্ত করছে।',
  },
  {
    id: 'exp-4',
    title: 'ইতালি থেকে বৈধ ব্যাংকিং মাধ্যমে রেমিট্যান্স প্রেরণে সরকারের ২.৫% ইনসেন্টিভ সুবিধায় ব্যাপক সাড়া',
    source: 'বিডিনিউজ২৪',
    pubDate: 'গতকাল, দুপুর ২:৪৫',
    link: 'https://news.google.com/search?q=ইতালি+প্রবাসী',
    snippet: 'ইউরো থেকে টাকায় সর্বোচ্চ সরকারি বিনিময় মূল্য ও অতিরিক্ত প্রণোদনা পাওয়ায় হুন্ডি পরিহার করে বৈধ চ্যানেলে রেমিট্যান্স পাঠাচ্ছেন প্রবাসীরা।',
  },
  {
    id: 'exp-5',
    title: 'ইতালির স্থায়ী রেসিডেন্স ও নাগরিকত্ব আবেদনের জন্য B1 ভাষা সার্টিফিকেট অর্জনের সহজ প্রস্তুতি',
    source: 'যুগান্তর',
    pubDate: '২ দিন আগে',
    link: 'https://news.google.com/search?q=ইতালি+প্রবাসী',
    snippet: 'সিপিআইএ (CPIA) ও অনুমোদিত শিক্ষাকেন্দ্রগুলো থেকে CILS বা CELI সার্টিফাইড ভাষা পরীক্ষা পাশের আইনি নিয়মাবলি ও ফ্রি ক্লাসের সুযোগ।',
  },
  {
    id: 'exp-6',
    title: 'পরিবার পুনর্মিলন (Ricongiungimento Familiare): হাউজিং ও বার্ষিক আয়ের নতুন নিয়মাবলি প্রকাশ',
    source: 'সমকাল',
    pubDate: '৩ দিন আগে',
    link: 'https://news.google.com/search?q=ইতালি+প্রবাসী',
    snippet: 'ইতালিতে স্ত্রী ও সন্তানদের নিয়ে আসার জন্য কম্যুনে থেকে বাসা উপযুক্ততা সার্টিফিকেট (Idoneità Alloggiativa) নেওয়ার নতুন নির্দেশিকা।',
  },
];

// Curated YouTube Streams specifically for Italian Bangladeshi Expat News
const EXPAT_STREAMS: ExpatStream[] = [
  {
    id: 'stream-1',
    title: 'ইতালি প্রবাসী সংবাদ ও বিশেষ বুলেটিন (Italy Probashi News & Bulletin)',
    category: 'প্রবাসী বুলেটিন',
    channel: 'ইতালি প্রবাসী নিউজ',
    badge: 'লাইভ সংবাদ',
    embedUrl: 'https://www.youtube.com/embed?listType=search&list=Italy+Bangla+Probashi+News',
    description: 'ইতালির বিভিন্ন শহর—রোম, মিলান, ভেনিস, নাপোলির প্রবাসী বাংলাদেশিদের তাজা খবর ও বিশেষ বুলেটিন।',
  },
  {
    id: 'stream-2',
    title: 'রোম দূতাবাস ও মিলান কনস্যুলেট সেবা সংক্রান্ত ব্রিফিং (Embassy & Consular Updates)',
    category: 'দূতাবাস ও পাসপোর্ট',
    channel: 'বাংলাদেশ দূতাবাস ইতালি',
    badge: 'কনস্যুলার গাইড',
    embedUrl: 'https://www.youtube.com/embed?listType=search&list=Bangladesh+Embassy+Rome+Passport+Camp+Italy',
    description: 'পাসপোর্ট ডেলিভারি, এনআইডি ক্যাম্প, নোটারি এবং কনস্যুলার সেবা সংক্রান্ত সরকারি দিকনির্দেশনা।',
  },
  {
    id: 'stream-3',
    title: 'দেক্রেতো ফ্লুসি ও কাজের ভিসা সংক্রান্ত সর্বশেষ খবর (Decreto Flussi & Work Visa)',
    category: 'ভিসা ও আইন',
    channel: 'ইতালি লিগ্যাল ডেস্ক',
    badge: 'আইনি আপডেট',
    embedUrl: 'https://www.youtube.com/embed?listType=search&list=Italy+Decreto+Flussi+Nulla+Osta+Bangla',
    description: 'নাল্লা ওস্তা, কনট্রাক্ট অব ওয়ার্ক ও প্রিফেত্তুরার সর্বশেষ আইন পরিবর্তন সম্পর্কিত তথ্য।',
  },
  {
    id: 'stream-4',
    title: 'যমুনা টিভি: ইউরোপ ও ইতালি প্রবাসী স্পেশাল (Jamuna TV European Expat Special)',
    category: 'লাইভ টিভি',
    channel: 'Jamuna TV Live',
    badge: 'সরাসরি সম্প্রচার',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCN6sm8iHiPd0cnoUardDAnw',
    description: 'বাংলাদেশ ও ইউরোপে বসবাসরত প্রবাসীদের সার্বক্ষণিক সরাসরি টেলিভিশন সম্প্রচার।',
  },
];

export default function ItalyProbashiNewsVideo() {
  const [news, setNews] = useState<ExpatNewsItem[]>(INITIAL_EXPAT_NEWS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('সরাসরি আপডেট');
  const [activeStream, setActiveStream] = useState<ExpatStream>(EXPAT_STREAMS[0]);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const playerRef = useRef<HTMLDivElement>(null);

  // Fetch Google News RSS for 'ইতালি প্রবাসী' using rss2json
  const fetchGoogleNews = async () => {
    setIsLoading(true);
    try {
      const googleRssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent('ইতালি প্রবাসী')}&hl=bn&gl=BD&ceid=BD:bn`;
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(googleRssUrl)}`;

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        const parsedItems: ExpatNewsItem[] = data.items.slice(0, 6).map((item: any, idx: number) => {
          let cleanTitle = item.title || 'ইতালি প্রবাসী সংবাদ';
          let sourceName = 'গুগল নিউজ';

          if (cleanTitle.includes(' - ')) {
            const parts = cleanTitle.split(' - ');
            sourceName = parts.pop()?.trim() || 'গুগল নিউজ';
            cleanTitle = parts.join(' - ').trim();
          }

          let formattedDate = 'আজ';
          if (item.pubDate) {
            try {
              const d = new Date(item.pubDate);
              formattedDate = d.toLocaleDateString('bn-BD', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
            } catch {
              formattedDate = item.pubDate;
            }
          }

          let snippet = item.description ? item.description.replace(/<[^>]*>?/gm, '').trim() : '';
          if (!snippet || snippet === item.title) {
            snippet = `${sourceName} কর্তৃক প্রকাশিত ইতালি প্রবাসী বাংলাদেশিদের সর্বশেষ খবরাখবর ও প্রতিবেদন।`;
          }
          if (snippet.length > 140) {
            snippet = snippet.slice(0, 140) + '...';
          }

          return {
            id: `gnews-${idx}-${Date.now()}`,
            title: cleanTitle,
            source: sourceName,
            pubDate: formattedDate,
            link: item.link || 'https://news.google.com',
            snippet,
          };
        });

        if (parsedItems.length >= 4) {
          // If fewer than 6, fill remaining from initial fallback to always ensure 6 cards
          const finalSix = [...parsedItems];
          while (finalSix.length < 6 && INITIAL_EXPAT_NEWS[finalSix.length]) {
            finalSix.push(INITIAL_EXPAT_NEWS[finalSix.length]);
          }
          setNews(finalSix.slice(0, 6));
          setLastUpdated(new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch {
      // In case of rate limits or connection failure, keep high quality initial expat news
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const googleRssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent('ইতালি প্রবাসী')}&hl=bn&gl=BD&ceid=BD:bn`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(googleRssUrl)}`;

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!ignore && data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
          const parsedItems: ExpatNewsItem[] = data.items.slice(0, 6).map((item: any, idx: number) => {
            let cleanTitle = item.title || 'ইতালি প্রবাসী সংবাদ';
            let sourceName = 'গুগল নিউজ';

            if (cleanTitle.includes(' - ')) {
              const parts = cleanTitle.split(' - ');
              sourceName = parts.pop()?.trim() || 'গুগল নিউজ';
              cleanTitle = parts.join(' - ').trim();
            }

            let formattedDate = 'আজ';
            if (item.pubDate) {
              try {
                const d = new Date(item.pubDate);
                formattedDate = d.toLocaleDateString('bn-BD', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
              } catch {
                formattedDate = item.pubDate;
              }
            }

            let snippet = item.description ? item.description.replace(/<[^>]*>?/gm, '').trim() : '';
            if (!snippet || snippet === item.title) {
              snippet = `${sourceName} কর্তৃক প্রকাশিত ইতালি প্রবাসী বাংলাদেশিদের সর্বশেষ খবরাখবর ও প্রতিবেদন।`;
            }
            if (snippet.length > 140) {
              snippet = snippet.slice(0, 140) + '...';
            }

            return {
              id: `gnews-${idx}-${Date.now()}`,
              title: cleanTitle,
              source: sourceName,
              pubDate: formattedDate,
              link: item.link || 'https://news.google.com',
              snippet,
            };
          });

          if (parsedItems.length >= 4) {
            const finalSix = [...parsedItems];
            while (finalSix.length < 6 && INITIAL_EXPAT_NEWS[finalSix.length]) {
              finalSix.push(INITIAL_EXPAT_NEWS[finalSix.length]);
            }
            setNews(finalSix.slice(0, 6));
            setLastUpdated(new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }));
          }
        }
      } catch {
        // Fallback already initialized in state
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleToggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSelectStream = (stream: ExpatStream) => {
    setActiveStream(stream);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <section
      id="italy-probashi"
      className="py-16 sm:py-24 bg-gradient-to-b from-slate-100/80 via-white to-slate-50 dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ================= Section Header ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>ইতালি প্রবাসী লাইভ মিডিয়া হাব</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              ইতালি প্রবাসী সংবাদ ও ভিডিও
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              ইতালিতে বসবাসরত বাংলাদেশিদের জন্য গুগল নিউজ আরএসএস থেকে সংগৃহীত সরাসরি তাজা খবর এবং ইতালি প্রবাসী কমিউনিটি বিষয়ক বিশেষ ভিডিও ও লাইভ সম্প্রচার।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchGoogleNews}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
              <span>{isLoading ? 'খবর রিফ্রেশ হচ্ছে...' : 'সংবাদ রিফ্রেশ'}</span>
            </button>
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 font-mono">
              {lastUpdated}
            </span>
          </div>
        </div>

        {/* =========================================================================
            PART 1: RESPONSIVE YOUTUBE VIDEO CONTAINER (RIGHT ABOVE THE NEWS GRID)
           ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Tv className="w-4 h-4 text-red-600" />
                <span>ইতালি প্রবাসী ভিডিও প্লেলিস্ট ও লাইভ স্ট্রিম</span>
              </h3>
            </div>

            {/* Stream Quick Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {EXPAT_STREAMS.map((stream) => {
                const isActive = activeStream.id === stream.id;
                return (
                  <button
                    key={stream.id}
                    onClick={() => handleSelectStream(stream)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400'
                    }`}
                  >
                    <span>{stream.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 16:9 Responsive Ratio Video Player Container */}
          <div className="bg-white dark:bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div
              ref={playerRef}
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-800"
            >
              <iframe
                key={`${activeStream.id}-${reloadKey}`}
                src={`${activeStream.embedUrl}${activeStream.embedUrl.includes('?') ? '&' : '?'}autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title={activeStream.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Video Meta Info & In-Place Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800">
                    {activeStream.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    {activeStream.channel}
                  </span>
                </div>
                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                  {activeStream.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  {activeStream.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setReloadKey((prev) => prev + 1)}
                  title="ভিডিও রিফ্রেশ বা পুনরায় লোড করুন"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>রিলোড</span>
                </button>
                <button
                  onClick={handleToggleFullscreen}
                  title="ওয়েবসাইটের ভেতরে ফুলস্ক্রিন করুন"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-transform active:scale-95 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>ফুলস্ক্রিন</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 2: GOOGLE NEWS RSS DYNAMIC 6 TEXT NEWS CARDS GRID
           ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                গুগল নিউজ লাইভ আপডেট: ইতালি প্রবাসী (সর্বশেষ ৬টি খবর)
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Google News Feed
            </span>
          </div>

          {/* 6 Text News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <article
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Top Bar: Source badge & publication date */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.source}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.pubDate}
                    </span>
                  </div>

                  {/* News Title */}
                  <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-3">
                    {item.title}
                  </h4>

                  {/* News Snippet */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 font-normal">
                    {item.snippet}
                  </p>
                </div>

                {/* Direct Link */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800/80 dark:hover:bg-emerald-950/40 text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300 font-bold text-xs flex items-center justify-between transition-colors border border-slate-200 dark:border-slate-700/60 group/btn"
                  >
                    <span>পুরো খবর পড়ুন ({item.source})</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-emerald-600 dark:text-emerald-400" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
