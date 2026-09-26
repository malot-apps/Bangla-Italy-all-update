'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Home,
  MapPin,
  PhoneCall,
  Search,
  PlusCircle,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  FileCheck,
  AlertCircle,
  Filter,
  Copy,
  Check,
  Tag,
  Building,
} from 'lucide-react';
import { COMMUNITY_ROOM_JOBS, RoomJobListing } from '@/lib/data';

export default function RoomJobBoard() {
  const [activeTab, setActiveTab] = useState<'all' | 'job' | 'room'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [listings, setListings] = useState<RoomJobListing[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('bangla_italy_community_listings');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return [...parsed, ...COMMUNITY_ROOM_JOBS];
          }
        }
      } catch {
        // ignore
      }
    }
    return COMMUNITY_ROOM_JOBS;
  });
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Listing Form State
  const [formType, setFormType] = useState<'job' | 'room'>('room');
  const [formTitle, setFormTitle] = useState('');
  const [formCity, setFormCity] = useState<'Roma' | 'Milano' | 'Venezia' | 'Bologna' | 'Napoli' | 'Firenze' | 'Torino' | 'Palermo'>('Roma');
  const [formArea, setFormArea] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formContactName, setFormContactName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formResidenza, setFormResidenza] = useState<boolean>(true);
  const [formContractType, setFormContractType] = useState('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const cityList = [
    { id: 'সব', label: 'সকল শহর (All Italy)' },
    { id: 'Roma', label: 'রোম (Roma)' },
    { id: 'Milano', label: 'মিলান (Milano)' },
    { id: 'Venezia', label: 'ভেনিস / মেস্ত্রে (Venezia/Mestre)' },
    { id: 'Bologna', label: 'বলোনিয়া (Bologna)' },
    { id: 'Napoli', label: 'নাপোলি (Napoli)' },
    { id: 'Firenze', label: 'ফ্লোরেন্স (Firenze)' },
    { id: 'Torino', label: 'তুরিন (Torino)' },
    { id: 'Palermo', label: 'পালেরমো (Palermo)' },
  ];

  const handleCopyPhone = (id: string, phone: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(phone);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formPhone.trim() || !formArea.trim()) return;

    const newListing: RoomJobListing = {
      id: `custom-${Date.now()}`,
      type: formType,
      title: formTitle.trim(),
      city: formCity,
      area: formArea.trim(),
      priceOrSalary: formPrice.trim() || (formType === 'job' ? 'আলোচনা সাপেক্ষে' : '€২৫০ / মাস'),
      contactName: formContactName.trim() || 'প্রবাসী ভাই',
      phone: formPhone.trim(),
      description: formDescription.trim(),
      datePosted: 'এইমাত্র পোস্ট করা',
      tags: [formType === 'job' ? 'চাকরি' : 'রুম ভাড়া', formCity, formArea.trim()],
      residenzaAvailable: formType === 'room' ? formResidenza : undefined,
      contractType: formType === 'job' && formContractType ? formContractType : undefined,
      urgent: true,
    };

    const updated = [newListing, ...listings];
    setListings(updated);

    if (typeof window !== 'undefined') {
      try {
        const savedOnly = updated.filter((item) => item.id.startsWith('custom-'));
        localStorage.setItem('bangla_italy_community_listings', JSON.stringify(savedOnly));
      } catch {
        // ignore
      }
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsPostModalOpen(false);
      // Reset form
      setFormTitle('');
      setFormArea('');
      setFormPrice('');
      setFormContactName('');
      setFormPhone('');
      setFormDescription('');
    }, 1800);
  };

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesCity = selectedCity === 'সব' || item.city === selectedCity;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesTab && matchesCity;

    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.area.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));

    return matchesTab && matchesCity && matchesSearch;
  });

  return (
    <section id="room-job-board" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>কমিউনিটি ক্লাসিফায়েড বোর্ড</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ইতালিতে চাকরি ও রুম / বাসা ভাড়া নোটিস বোর্ড
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              রোম, মিলান, ভেনিস, বলোনিয়া ও অন্যান্য শহরে বাংলাদেশি প্রবাসীদের সরাসরি রুম শেয়ারিং, বেড স্পেস ও কাজের সুযোগ।
            </p>
          </div>

          {/* Post Listing CTA */}
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 flex items-center gap-2 cursor-pointer transition-transform active:scale-95 whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-amber-300" />
            <span>ফ্রি বিজ্ঞাপন পোস্ট করুন</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-8 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Category Filter Pills (5 cols) */}
            <div className="md:col-span-5 flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                সব নোটিস ({listings.length})
              </button>
              <button
                onClick={() => setActiveTab('job')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'job'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>চাকরির সুযোগ ({listings.filter((l) => l.type === 'job').length})</span>
              </button>
              <button
                onClick={() => setActiveTab('room')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'room'
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-purple-300" />
                <span>রুম / বাসা ভাড়া ({listings.filter((l) => l.type === 'room').length})</span>
              </button>
            </div>

            {/* City Dropdown Selector (3 cols) */}
            <div className="md:col-span-3">
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm appearance-none"
                >
                  {cityList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <Filter className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Input (4 cols) */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পদ, এলাকা বা সুযোগ লিখে খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 dark:text-slate-300 font-bold text-base">
              নির্বাচিত ক্যাটাগরি বা শহরে কোনো বিজ্ঞাপন পাওয়া যায়নি।
            </p>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              অন্য শহর নির্বাচন করুন অথবা সরাসরি আপনার বিজ্ঞাপন পোস্ট করুন।
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedCity('সব');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              সকল বিজ্ঞাপন রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((item) => {
              const isJob = item.type === 'job';
              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isJob
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                              : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                          }`}
                        >
                          {isJob ? <Briefcase className="w-3 h-3" /> : <Home className="w-3 h-3" />}
                          <span>{isJob ? 'চাকরির সুযোগ' : 'রুম / বাসা ভাড়া'}</span>
                        </span>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-red-500" />
                          <span>{item.city}</span>
                        </span>

                        {item.urgent && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 animate-pulse">
                            জরুরি
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>{item.datePosted}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                      {item.title}
                    </h3>

                    {/* Location Area & Contract */}
                    <div className="space-y-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
                      <p className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>এলাকা: <strong>{item.area}</strong></span>
                      </p>
                      {item.contractType && (
                        <p className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                          <FileCheck className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-mono text-[11px]">{item.contractType}</span>
                        </p>
                      )}
                      {item.residenzaAvailable !== undefined && (
                        <p className="flex items-center gap-1.5">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${item.residenzaAvailable ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className={item.residenzaAvailable ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : ''}>
                            {item.residenzaAvailable ? 'রেসিডেন্স (Residenza) করানো সম্ভব' : 'রেসিডেন্স সুবিধা নেই'}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Price / Salary Highlight */}
                    <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                        {isJob ? 'প্রস্তাবিত বেতন:' : 'ভাড়া:'}
                      </span>
                      <span className="text-base font-black text-emerald-700 dark:text-amber-400">
                        {item.priceOrSalary}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1"
                        >
                          <Tag className="w-2.5 h-2.5 opacity-60" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Contact Footer */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="text-xs truncate">
                      <span className="text-slate-400 block text-[10px]">যোগাযোগ:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {item.contactName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleCopyPhone(item.id, item.phone)}
                        title="নম্বর কপি করুন"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <a
                        href={`tel:${item.phone.replace(/\s+/g, '')}`}
                        className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-700/20 transition-transform active:scale-95"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>সরাসরি কল ({item.phone})</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Post New Listing */}
        {isPostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/20">
                    <PlusCircle className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg">নতুন বিজ্ঞাপন পোস্ট করুন</h3>
                    <p className="text-xs text-emerald-200">কমিউনিটি বোর্ডে আপনার চাকরি বা বাসা ভাড়ার নোটিস দিন</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPostModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form Body */}
              <div className="p-5 sm:p-6 overflow-y-auto">
                {formSubmitted ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                    <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      বিজ্ঞাপন সফলভাবে পোস্ট করা হয়েছে!
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      বিজ্ঞাপনটি এখন কমিউনিটি বোর্ডে প্রদর্শিত হচ্ছে।
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCreateListing} className="space-y-4">
                    {/* Type Selector */}
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 block">
                        বিজ্ঞাপনের ধরন নির্বাচন করুন:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormType('room')}
                          className={`p-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            formType === 'room'
                              ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Home className="w-4 h-4" />
                          <span>রুম / বাসা ভাড়া</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormType('job')}
                          className={`p-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            formType === 'job'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Briefcase className="w-4 h-4" />
                          <span>চাকরির সুযোগ (Job Offer)</span>
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                        বিজ্ঞাপনের শিরোনাম (Title) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder={
                          formType === 'room'
                            ? 'যেমন: মেস্ত্রেতে ফ্যামিলি ফ্ল্যাট বা পোস্টো লেত্তো খালি আছে'
                            : 'যেমন: ইতালিয়ান রেস্টুরেন্টে কিচেন হেল্পার প্রয়োজন'
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* City & Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                          শহর (City) *
                        </label>
                        <select
                          value={formCity}
                          onChange={(e) => setFormCity(e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        >
                          <option value="Roma">রোম (Roma)</option>
                          <option value="Milano">মিলান (Milano)</option>
                          <option value="Venezia">ভেনিস / মেস্ত্রে (Venezia)</option>
                          <option value="Bologna">বলোনিয়া (Bologna)</option>
                          <option value="Napoli">নাপোলি (Napoli)</option>
                          <option value="Firenze">ফ্লোরেন্স (Firenze)</option>
                          <option value="Torino">তুরিন (Torino)</option>
                          <option value="Palermo">পালেরমো (Palermo)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                          এলাকা / মেট্রো জোন (Area) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formArea}
                          onChange={(e) => setFormArea(e.target.value)}
                          placeholder="যেমন: Tor Pignattara / Loreto"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Price/Salary & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                          {formType === 'room' ? 'ভাড়া (€ / মাস)' : 'বেতন (€ / মাস)'}
                        </label>
                        <input
                          type="text"
                          value={formPrice}
                          onChange={(e) => setFormPrice(e.target.value)}
                          placeholder="যেমন: €২৫০ / মাস অথবা €১,৫০০"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                          মোবাইল নম্বর (ইতালি) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="+39 3XX XXXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Contact Person Name */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                        আপনার নাম
                      </label>
                      <input
                        type="text"
                        value={formContactName}
                        onChange={(e) => setFormContactName(e.target.value)}
                        placeholder="আপনার নাম বা প্রতিষ্ঠানের নাম"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Room Specific: Residenza */}
                    {formType === 'room' && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <input
                          type="checkbox"
                          id="residenzaCheck"
                          checked={formResidenza}
                          onChange={(e) => setFormResidenza(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <label htmlFor="residenzaCheck" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                          এই বাসায় রেসিডেন্স (Residenza) করানো সম্ভব
                        </label>
                      </div>
                    )}

                    {/* Job Specific: Contract */}
                    {formType === 'job' && (
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                          কন্ট্রাক্ট টাইপ (ঐচ্ছিক)
                        </label>
                        <input
                          type="text"
                          value={formContractType}
                          onChange={(e) => setFormContractType(e.target.value)}
                          placeholder="যেমন: Contratto Indeterminato / CCNL Ristorazione"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                        বিস্তারিত বিবরণ
                      </label>
                      <textarea
                        rows={3}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="সুযোগ-সুবিধা, ডিউটি সময় বা শর্তাবলি বাংলায় লিখুন..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-700/30 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-300" />
                        <span>বিজ্ঞাপন প্রকাশ করুন</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
