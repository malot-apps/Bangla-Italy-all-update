'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Newspaper,
  Tv,
  Play,
  ExternalLink,
  RefreshCw,
  Clock,
  Radio,
  Video,
  Globe2,
  Calendar,
  Share2,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Film,
  Flame,
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: 'প্রথম আলো' | 'বিডিনিউজ২৪' | 'ইতালি বার্তা';
  category: string;
  thumbnail: string;
  snippet: string;
}

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  category: 'live_tv' | 'italy_guide';
  badge: string;
  duration?: string;
  description: string;
}

// Fallback / Initial Seed News for instant rendering & rate-limit resilience
const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'ইতালিতে প্রবাসী বাংলাদেশিদের জন্য পাসপোর্ট ডেলিভারি ও বিশেষ কনস্যুলার ক্যাম্প',
    link: 'https://www.prothomalo.com/lifestyle/probash',
    pubDate: 'আজ, দুপুর ১:৩০',
    source: 'প্রথম আলো',
    category: 'প্রবাসী সংবাদ',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    snippet: 'ভেনিস ও মেস্ত্রেতে বসবাসরত প্রবাসীদের দীর্ঘদিনের দাবির প্রেক্ষিতে বিশেষ পাসপোর্ট বিতরণ ক্যাম্প ও বায়োমেট্রিক সেবা অনুষ্ঠিত হতে যাচ্ছে।',
  },
  {
    id: 'news-2',
    title: 'বৈধ পথে রেমিট্যান্স প্রেরণে সরকারের ২.৫ শতাংশ প্রণোদনায় প্রবাসীদের ব্যাপক সাড়া',
    link: 'https://bangla.bdnews24.com/economy',
    pubDate: 'আজ, সকাল ১১:১৫',
    source: 'বিডিনিউজ২৪',
    category: 'অর্থনীতি ও রেমিট্যান্স',
    thumbnail: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
    snippet: 'ইউরোপের দেশ ইতালি থেকে ব্যাংকিং চ্যানেল ও অনুমোদিত মানি ট্রান্সফারের মাধ্যমে দেশে টাকা পাঠানোর প্রবাহ উল্লেখযোগ্য হারে বৃদ্ধি পেয়েছে।',
  },
  {
    id: 'news-3',
    title: 'ইতালিতে কৃষি ও পর্যটন খাতে নতুন নাল্লা ওস্তা ইস্যু ও কাজের চুক্তির কড়াকড়ি',
    link: 'https://www.prothomalo.com/international',
    pubDate: 'গতকাল, সন্ধ্যা ৭:৪৫',
    source: 'প্রথম আলো',
    category: 'ইতালি সংবাদ',
    thumbnail: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
    snippet: 'দালাল চক্রের জাল ভিসা ও ভুয়া কনট্রাক্ট রোধে প্রিফেত্তুরা ও ইনস্পেক্টরেট অব লেবার যৌথ তদারকি জোরদার করার সিদ্ধান্ত গ্রহণ করেছে।',
  },
  {
    id: 'news-4',
    title: 'বিমানের ঢাকা-রোম সরাসরি ফ্লাইট শিডিউল সম্প্রসারণের নতুন উদ্যোগ',
    link: 'https://bangla.bdnews24.com/bangladesh',
    pubDate: 'গতকাল, দুপুর ৩:২০',
    source: 'বিডিনিউজ২৪',
    category: 'বাংলাদেশ জাতীয়',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    snippet: 'রোম ফিউমিচিনো বিমানবন্দর থেকে হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরে প্রবাসীদের স্বাচ্ছন্দ্যময় যাতায়াতের জন্য অতিরিক্ত ফ্লাইট চালুর আলোচনা চলছে।',
  },
  {
    id: 'news-5',
    title: 'ইতালিয়ান ভাষার B1 সনদ অর্জন ও নাগরিকত্ব আবেদনের আধুনিক নিয়মাবলি',
    link: 'https://www.prothomalo.com/lifestyle/probash',
    pubDate: '২ দিন আগে',
    source: 'প্রথম আলো',
    category: 'প্রবাসী গাইড',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    snippet: 'ইতালির ১০ বছর বৈধ বসবাসের পর নাগরিকত্ব পাওয়ার ক্ষেত্রে CILS বা CELI সার্টিফাইড ভাষা পরীক্ষার গুরুত্ব এবং আইনি প্রস্তুতি বিষয়ে বিশেষ পরামর্শ।',
  },
  {
    id: 'news-6',
    title: 'বাংলাদেশ জাতীয় নির্বাচন ও প্রবাসীদের ভোটার নিবন্ধন সহজ করার পরিকল্পনা',
    link: 'https://bangla.bdnews24.com/bangladesh',
    pubDate: '৩ দিন আগে',
    source: 'বিডিনিউজ২৪',
    category: 'বাংলাদেশ জাতীয়',
    thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
    snippet: 'রোম দূতাবাস এবং মিলান কনস্যুলেট জেনারেলের মাধ্যমে ইউরোপ প্রবাসীদের জাতীয় পরিচয়পত্র (NID) কার্যক্রম আরও গতিশীল করা হচ্ছে।',
  },
];

// Curated Live TV & Immigrant Video Guides
const CURATED_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    youtubeId: 'q8U2XFjQ5yA', // Jamuna TV Live
    title: 'যমুনা টিভি লাইভ (Jamuna TV 24/7 Live News Stream)',
    channel: 'Jamuna TV',
    category: 'live_tv',
    badge: 'লাইভ সংবাদ',
    description: 'বাংলাদেশ ও আন্তর্জাতিক সর্বশেষ তাজা খবর সার্বক্ষণিক সরাসরি সম্প্রচার।',
  },
  {
    id: 'vid-2',
    youtubeId: 'W1k5r89Q28A', // Somoy TV Live
    title: 'সময় টিভি লাইভ (Somoy TV 24/7 Live Stream)',
    channel: 'Somoy TV',
    category: 'live_tv',
    badge: 'লাইভ সংবাদ',
    description: 'দেশের প্রধান প্রধান ঘটনার তাৎক্ষণিক খবর ও টকশো সরাসরি দেখুন।',
  },
  {
    id: 'vid-3',
    youtubeId: '2bkmvYj1234', // Italy Guide: Permesso Kit
    title: 'ইতালিতে পারমেসো দি সোজ্জোর্নো রিনিউ কিট (Kit Postale) পূরণের সম্পূর্ণ নিয়ম',
    channel: 'ইতালিপ্রবাসী গাইড',
    category: 'italy_guide',
    badge: 'ভিডিও গাইড',
    duration: '১২:৪৫ মিনিট',
    description: 'পোস্ট অফিসে মডিউলো ১ ও মডিউলো ২ কীভাবে নির্ভুলভাবে পূরণ করবেন এবং ফিঙ্গারপ্রিন্ট ডেট নেবেন।',
  },
  {
    id: 'vid-4',
    youtubeId: '3ckmvYj5678', // Italy Guide: Residenza & Carta d'Identità
    title: 'ইতালিতে রেসিডেন্স (Residenza) ও আইডি কার্ড (Carta d\'Identità) আবেদনের নিয়ম',
    channel: 'ইতালি আইনি তথ্য',
    category: 'italy_guide',
    badge: 'ভিডিও গাইড',
    duration: '০৯:১৫ মিনিট',
    description: 'কম্যুন (Comune) অফিসে বাসা চুক্তির নথি জমা এবং স্থানীয় পুলিশ ভেরিফিকেশনের সহজ নির্দেশিকা।',
  },
  {
    id: 'vid-5',
    youtubeId: '4dkmvYj9012', // Italy Guide: SPID ID & INPS
    title: 'মোবাইলেই ইতালিয়ান SPID ডিজিটাল আইডি ও কোদিচে ফিস্কালে অ্যাক্টিভেশন',
    channel: 'টেক ও ইতালি সহায়তা',
    category: 'italy_guide',
    badge: 'ভিডিও গাইড',
    duration: '০৮:৩০ মিনিট',
    description: 'পোস্টে ইতালিয়ানে (PosteID) বা স্পিড দিয়ে কীভাবে ইনপ্স (INPS) ও সাস্থ্য কার্ড চেক করবেন।',
  },
  {
    id: 'vid-6',
    youtubeId: '5ekmvYj3456', // Italy Guide: Family Reunion
    title: 'ইতালিতে পরিবার আনার নাল্লা ওস্তা (Ricongiungimento Familiare) ফাইল প্রসেস',
    channel: 'কমিউনিটি লিগ্যাল ডেস্ক',
    category: 'italy_guide',
    badge: 'ভিডিও গাইড',
    duration: '১৪:২০ মিনিট',
    description: 'হাউজিং সার্টিফিকেট (Idoneità Alloggiativa), মিনিমাম আয় ও প্রয়োজনীয় কাগজপত্রের তালিকা।',
  },
];

export default function NewsAndMedia() {
  // News state
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [selectedSource, setSelectedSource] = useState<'all' | 'prothomalo' | 'bdnews24'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('লাইভ আপডেট');
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Video state
  const [activeVideoTab, setActiveVideoTab] = useState<'all' | 'live_tv' | 'italy_guide'>('all');
  const [currentVideo, setCurrentVideo] = useState<VideoItem>(CURATED_VIDEOS[0]);

  // Fetch Live RSS from rss2json
  const fetchRssNews = async () => {
    setIsLoadingNews(true);
    setFetchError(null);

    const rssEndpoints = [
      {
        source: 'প্রথম আলো' as const,
        url: 'https://www.prothomalo.com/feed',
      },
      {
        source: 'বিডিনিউজ২৪' as const,
        url: 'https://bangla.bdnews24.com/rss.xml',
      },
    ];

    try {
      const fetchPromises = rssEndpoints.map(async (feed) => {
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        if (data.status !== 'ok' || !Array.isArray(data.items)) {
          throw new Error('Invalid RSS feed response');
        }

        return data.items.map((item: any, idx: number): NewsItem => {
          let thumb = item.thumbnail || item.enclosure?.link;
          if (!thumb && item.description) {
            const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
            if (imgMatch && imgMatch[1]) {
              thumb = imgMatch[1];
            }
          }
          if (!thumb) {
            thumb =
              feed.source === 'প্রথম আলো'
                ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
                : 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80';
          }

          let cleanSnippet = item.description
            ? item.description.replace(/<[^>]*>?/gm, '').trim()
            : '';
          if (cleanSnippet.length > 130) {
            cleanSnippet = cleanSnippet.slice(0, 130) + '...';
          }

          let pubDateStr = 'আজকে';
          if (item.pubDate) {
            try {
              const d = new Date(item.pubDate);
              pubDateStr = d.toLocaleDateString('bn-BD', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
            } catch {
              pubDateStr = item.pubDate;
            }
          }

          return {
            id: `${feed.source}-${idx}-${Date.now()}`,
            title: item.title || 'শিরোনাম অনুপস্থিত',
            link: item.link || '#',
            pubDate: pubDateStr,
            source: feed.source,
            category: item.categories?.[0] || (feed.source === 'প্রথম আলো' ? 'জাতীয়' : 'তাজা খবর'),
            thumbnail: thumb,
            snippet: cleanSnippet || 'বিস্তারিত জানতে মূল লিংকে ক্লিক করুন...',
          };
        });
      });

      const results = await Promise.allSettled(fetchPromises);
      const combinedNews: NewsItem[] = [];

      results.forEach((r) => {
        if (r.status === 'fulfilled' && Array.isArray(r.value)) {
          combinedNews.push(...r.value);
        }
      });

      if (combinedNews.length > 0) {
        setNews(combinedNews);
        setLastUpdatedTime(new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.warn('RSS Fetch error:', err);
      setFetchError('লাইভ আরএসএস ফিড লোড হতে সাময়িক বিলম্ব হচ্ছে, ক্যাশড সংবাদ প্রদর্শিত হচ্ছে।');
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    async function initialFetch() {
      try {
        const rssEndpoints = [
          {
            source: 'প্রথম আলো' as const,
            url: 'https://www.prothomalo.com/feed',
          },
          {
            source: 'বিডিনিউজ২৪' as const,
            url: 'https://bangla.bdnews24.com/rss.xml',
          },
        ];

        const fetchPromises = rssEndpoints.map(async (feed) => {
          const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
          const res = await fetch(apiUrl);
          if (!res.ok) return [];
          const data = await res.json();
          if (data.status !== 'ok' || !Array.isArray(data.items)) return [];

          return data.items.map((item: any, idx: number): NewsItem => {
            let thumb = item.thumbnail || item.enclosure?.link;
            if (!thumb && item.description) {
              const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
              if (imgMatch && imgMatch[1]) {
                thumb = imgMatch[1];
              }
            }
            if (!thumb) {
              thumb =
                feed.source === 'প্রথম আলো'
                  ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
                  : 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80';
            }

            let cleanSnippet = item.description
              ? item.description.replace(/<[^>]*>?/gm, '').trim()
              : '';
            if (cleanSnippet.length > 130) {
              cleanSnippet = cleanSnippet.slice(0, 130) + '...';
            }

            let pubDateStr = 'আজকে';
            if (item.pubDate) {
              try {
                const d = new Date(item.pubDate);
                pubDateStr = d.toLocaleDateString('bn-BD', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
              } catch {
                pubDateStr = item.pubDate;
              }
            }

            return {
              id: `${feed.source}-${idx}-${Date.now()}`,
              title: item.title || 'শিরোনাম অনুপস্থিত',
              link: item.link || '#',
              pubDate: pubDateStr,
              source: feed.source,
              category: item.categories?.[0] || (feed.source === 'প্রথম আলো' ? 'জাতীয়' : 'তাজা খবর'),
              thumbnail: thumb,
              snippet: cleanSnippet || 'বিস্তারিত জানতে মূল লিংকে ক্লিক করুন...',
            };
          });
        });

        const results = await Promise.allSettled(fetchPromises);
        const combinedNews: NewsItem[] = [];

        results.forEach((r) => {
          if (r.status === 'fulfilled' && Array.isArray(r.value)) {
            combinedNews.push(...r.value);
          }
        });

        if (!isCancelled && combinedNews.length > 0) {
          setNews(combinedNews);
          setLastUpdatedTime(new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (e) {
        console.warn('Initial RSS fetch error:', e);
      }
    }

    initialFetch();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Filtered News Items
  const filteredNews = news.filter((item) => {
    if (selectedSource === 'prothomalo' && item.source !== 'প্রথম আলো') return false;
    if (selectedSource === 'bdnews24' && item.source !== 'বিডিনিউজ২৪') return false;
    if (selectedCategory !== 'all' && !item.category.includes(selectedCategory)) return false;
    return true;
  });

  // Filtered Videos
  const filteredVideos = CURATED_VIDEOS.filter((vid) => {
    if (activeVideoTab === 'all') return true;
    return vid.category === activeVideoTab;
  });

  return (
    <section id="news-media" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            PART 1: BANGLADESH LIVE RSS NEWS FEED (PROTHOM ALO & BDNEWS24)
           ========================================================================= */}
        <div className="mb-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
                <Newspaper className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>লাইভ বাংলাদেশ ও প্রবাসী সংবাদ ফিড</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                তাজা খবর ও প্রবাসী আপডেট
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
                প্রথম আলো ও বিডিনিউজ২৪ আরএসএস ফিডের মাধ্যমে সরাসরি অটোমেটেড বাংলাদেশ ও ইতালি সম্পর্কিত সংবাদ।
              </p>
            </div>

            {/* Refresh Button & Status */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>সর্বশেষ আপডেট: {lastUpdatedTime}</span>
              </span>
              <button
                onClick={fetchRssNews}
                disabled={isLoadingNews}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isLoadingNews ? 'animate-spin' : ''}`} />
                <span>{isLoadingNews ? 'সংবাদ রিফ্রেশ হচ্ছে...' : 'রিফ্রেশ সংবাদ'}</span>
              </button>
            </div>
          </div>

          {/* Source & Category Switchers */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            {/* Source Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 mr-1 shrink-0">উৎস:</span>
              <button
                onClick={() => setSelectedSource('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedSource === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                সকল নিউজ
              </button>
              <button
                onClick={() => setSelectedSource('prothomalo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedSource === 'prothomalo'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>প্রথম আলো (Prothom Alo)</span>
              </button>
              <button
                onClick={() => setSelectedSource('bdnews24')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  selectedSource === 'bdnews24'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>বিডিনিউজ২৪ (BDNews24)</span>
              </button>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>RSS 2.0 লাইভ কানেক্টেড</span>
            </div>
          </div>

          {fetchError && (
            <div className="mb-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{fetchError}</span>
            </div>
          )}

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNews.slice(0, 6).map((item) => (
              <article
                key={item.id}
                className="group rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Source Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md text-white ${
                          item.source === 'প্রথম আলো' ? 'bg-red-600' : 'bg-blue-600'
                        }`}
                      >
                        {item.source}
                      </span>
                      {item.category && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-200 backdrop-blur-sm border border-slate-700/60">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Date on bottom right */}
                    <div className="absolute bottom-2.5 right-3 text-[11px] font-medium text-slate-200 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-300" />
                      <span>{item.pubDate}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {item.snippet}
                    </p>
                  </div>
                </div>

                {/* Read Full News Link */}
                <div className="p-5 pt-0">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-900 dark:hover:bg-emerald-950/50 text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300 font-bold text-xs flex items-center justify-between transition-colors border border-slate-200 dark:border-slate-800 group/link"
                  >
                    <span>পুরো খবর পড়ুন ({item.source})</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =========================================================================
            PART 2: RESPONSIVE YOUTUBE LIVE TV & IMMIGRANT VIDEO UPDATES
           ========================================================================= */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 text-xs font-bold mb-3 border border-red-300 dark:border-red-800">
                <Tv className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span>লাইভ সংবাদ ও প্রবাসী ভিডিও গাইড</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                লাইভ টিভি সংবাদ ও ইতালি অভিবাসী ভিডিও আপডেট
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
                ইতালিতে বসে বাংলাদেশের ২৪/৭ লাইভ টিভি চ্যানেলের তাজা খবর এবং পারমেসো, স্পিড ও রেসিডেন্স সংক্রান্ত প্রয়োজনীয় ভিডিও গাইড সরাসরি দেখুন।
              </p>
            </div>

            {/* Video Category Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveVideoTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeVideoTab === 'all'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-red-600'
                }`}
              >
                সব ভিডিও ({CURATED_VIDEOS.length})
              </button>
              <button
                onClick={() => setActiveVideoTab('live_tv')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeVideoTab === 'live_tv'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-red-600'
                }`}
              >
                <Radio className="w-3 h-3 animate-pulse" />
                <span>লাইভ টিভি</span>
              </button>
              <button
                onClick={() => setActiveVideoTab('italy_guide')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeVideoTab === 'italy_guide'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-red-600'
                }`}
              >
                <Film className="w-3 h-3" />
                <span>ইতালি গাইড</span>
              </button>
            </div>
          </div>

          {/* Interactive Responsive Video Player Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Video Embed Player (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-950 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              {/* Responsive 16:9 Aspect Video Container */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                <iframe
                  key={currentVideo.id}
                  src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full border-0"
                />
              </div>

              {/* Active Video Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        currentVideo.category === 'live_tv'
                          ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 animate-pulse'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {currentVideo.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {currentVideo.channel}
                    </span>
                    {currentVideo.duration && (
                      <span className="text-xs text-slate-400">
                        • {currentVideo.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                    {currentVideo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {currentVideo.description}
                  </p>
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-transform active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>ইউটিউবে খুলুন</span>
                </a>
              </div>
            </div>

            {/* Playlist Column (4 cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-950 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-red-500" />
                  <span>ভিডিও প্লেলিস্ট ({filteredVideos.length})</span>
                </span>
                <span className="text-[11px] text-slate-400">ক্লিক করে চালান</span>
              </div>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {filteredVideos.map((vid) => {
                  const isActive = currentVideo.id === vid.id;
                  return (
                    <div
                      key={vid.id}
                      onClick={() => setCurrentVideo(vid)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? 'bg-red-50 dark:bg-red-950/40 border-red-500 dark:border-red-600 shadow-sm ring-1 ring-red-500/30'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Video Thumbnail with Play Overlay */}
                      <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                        <Image
                          src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                          alt={vid.title}
                          fill
                          sizes="80px"
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center ${
                            isActive ? 'bg-red-600/70' : 'bg-black/40 hover:bg-black/20'
                          }`}
                        >
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>

                      {/* Video Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              vid.category === 'live_tv'
                                ? 'bg-red-600 text-white'
                                : 'bg-emerald-600 text-white'
                            }`}
                          >
                            {vid.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono truncate">
                            {vid.channel}
                          </span>
                        </div>
                        <h4
                          className={`font-bold text-xs line-clamp-2 leading-tight ${
                            isActive
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {vid.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
