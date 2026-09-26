'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  MapPin,
  Search,
  ExternalLink,
  ShieldAlert,
  Ambulance,
  Flame,
  Shield,
  HeartHandshake,
  Building2,
  Building,
  Store,
  UtensilsCrossed,
  Scale,
  DollarSign,
  Star,
  CheckCircle2,
  Clock,
  Navigation,
  ChevronDown,
  Sparkles,
  Stethoscope,
  Info,
  Phone,
} from 'lucide-react';
import {
  EMERGENCY_CONTACTS,
  COMMUNITY_DIRECTORY,
  LOCAL_CITY_EMERGENCIES,
  DirectoryItem,
  LocalCityEmergency,
} from '@/lib/data';

interface DirectoryHotlinesProps {
  onCallSosModal?: () => void;
}

export default function DirectoryHotlines({ onCallSosModal }: DirectoryHotlinesProps) {
  const [selectedCity, setSelectedCity] = useState<string>('সব');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cityOptions = [
    { id: 'সব', nameBn: 'সকল শহর (All Italy)', nameIt: 'Tutte le Città' },
    { id: 'Roma', nameBn: 'রোম (Roma)', nameIt: 'Lazio' },
    { id: 'Milano', nameBn: 'মিলান (Milano)', nameIt: 'Lombardia' },
    { id: 'Venezia', nameBn: 'ভেনিস ও মেস্ত্রে (Venezia/Mestre)', nameIt: 'Veneto' },
    { id: 'Bologna', nameBn: 'বলোনিয়া (Bologna)', nameIt: 'Emilia-Romagna' },
    { id: 'Napoli', nameBn: 'নাপোলি (Napoli)', nameIt: 'Campania' },
    { id: 'Firenze', nameBn: 'ফ্লোরেন্স (Firenze)', nameIt: 'Toscana' },
    { id: 'Torino', nameBn: 'তুরিন (Torino)', nameIt: 'Piemonte' },
    { id: 'Palermo', nameBn: 'পালেরমো (Palermo)', nameIt: 'Sicilia' },
  ];

  const categories = [
    { id: 'all', label: 'সকল সেবা', icon: Building2 },
    { id: 'caf', label: 'CAF ও প্যাট্রোনেটো', icon: Building },
    { id: 'grocery', label: 'বাংলা গ্রোসারি ও মাছ', icon: Store },
    { id: 'restaurant', label: 'হালাল রেস্টুরেন্ট', icon: UtensilsCrossed },
    { id: 'legal', label: 'আইন ও সার্টিফাইড অনুবাদ', icon: Scale },
    { id: 'remittance', label: 'রেমিট্যান্স ও মানি এক্সচেঞ্জ', icon: DollarSign },
    { id: 'mosque', label: 'মসজিদ ও ইসলামিক সেন্টার', icon: Building2 },
  ];

  const getEmergencyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ambulance':
        return Ambulance;
      case 'Flame':
        return Flame;
      case 'Shield':
        return Shield;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'Building2':
        return Building2;
      case 'Building':
        return Building;
      default:
        return ShieldAlert;
    }
  };

  const filteredDirectory = COMMUNITY_DIRECTORY.filter((item) => {
    const matchesCity = selectedCity === 'সব' || item.city === selectedCity;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCity && matchesCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.services.some((s) => s.toLowerCase().includes(q));
    return matchesCity && matchesCategory && matchesSearch;
  });

  // Local emergency info for selected city if not 'সব'
  const activeCityEmergency: LocalCityEmergency | undefined =
    selectedCity !== 'সব' ? LOCAL_CITY_EMERGENCIES[selectedCity] : undefined;

  // Local CAF offices specifically for selected city or top CAFs
  const localCafOffices = COMMUNITY_DIRECTORY.filter(
    (item) => item.category === 'caf' && (selectedCity === 'সব' || item.city === selectedCity)
  );

  return (
    <section id="directory" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            PART 1: EMERGENCY HOTLINES (NATIONAL & EMBASSY)
           ========================================================================= */}
        <div className="mb-14">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 text-xs font-bold mb-3 border border-red-300 dark:border-red-800 animate-pulse">
              <PhoneCall className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
              <span>ইতালি জরুরি হেল্পলাইন নম্বর</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              জরুরি হটলাইন ও দূতাবাস জরুরি যোগাযোগ
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              যেকোনো বিপদে এক ক্লিকে কল করুন। ইতালিয়ান ইমার্জেন্সি নম্বরসমূহ ২৪ ঘণ্টা ফ্রি এবং সিম কার্ডে ব্যালেন্স না থাকলেও কল করা যায়।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_CONTACTS.map((item, idx) => {
              const Icon = getEmergencyIcon(item.icon);
              const isEmbassy = item.type === 'embassy';
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                    isEmbassy
                      ? 'bg-gradient-to-br from-emerald-900 to-slate-950 text-white border-emerald-500/40 shadow-lg'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-red-500/50 shadow-sm hover:shadow-lg'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                          isEmbassy
                            ? 'bg-emerald-600/50 text-white'
                            : 'bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-lg sm:text-xl font-black font-mono px-3 py-1 rounded-xl ${
                          isEmbassy
                            ? 'bg-emerald-700/60 text-emerald-200'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {item.number}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base leading-tight mb-1">
                      {item.titleBn}
                    </h3>
                    <p
                      className={`text-xs font-mono mb-2 ${
                        isEmbassy ? 'text-emerald-300/80' : 'text-slate-400'
                      }`}
                    >
                      {item.titleIt}
                    </p>
                    <p
                      className={`text-xs leading-relaxed ${
                        isEmbassy ? 'text-emerald-100/90' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <a
                      href={`tel:${item.number}`}
                      className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm ${
                        isEmbassy
                          ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>সরাসরি কল দিন ({item.number})</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PART 2: LOCATION-SELECTOR DROPDOWN & COMMUNITY DIRECTORY
           ========================================================================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>শহরভিত্তিক সার্ভিস ও ডিরেক্টরি ফিল্টার</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ইতালির প্রধান শহরে বাংলাদেশি সেবা ও প্রতিষ্ঠান
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              নিচের ড্রপডাউন থেকে আপনার শহর নির্বাচন করুন। লোকাল কোয়েস্তুরা, এমার্জেন্সি হাসপাতাল, কাফ অফিস ও দেশি দোকান স্বয়ংক্রিয়ভাবে ফিল্টার হবে।
            </p>
          </div>

          {/* DYNAMIC LOCATION-SELECTOR DROPDOWN & SEARCH BAR */}
          <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Dropdown Selector (5 cols) */}
              <div className="md:col-span-5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 block uppercase tracking-wider">
                  📍 শহর নির্বাচন করুন (Select City Location):
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 pointer-events-none" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-emerald-50/60 dark:bg-slate-900 border-2 border-emerald-500/40 text-sm sm:text-base font-extrabold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm appearance-none"
                  >
                    {cityOptions.map((city) => (
                      <option key={city.id} value={city.id} className="py-2 font-medium">
                        {city.nameBn} - {city.nameIt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-700 dark:text-emerald-300 pointer-events-none" />
                </div>
              </div>

              {/* Search Input (7 cols) */}
              <div className="md:col-span-7">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 block uppercase tracking-wider">
                  🔍 প্রতিষ্ঠান বা সার্ভিস সার্চ (Search Directory):
                </label>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="নাম, সার্ভিস বা এলাকা দিয়ে খুঁজুন (যেমন: Tor Pignattara, ইলিশ মাছ, 730 ট্যাক্স)..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Quick City Pills for Mobile and Quick Tap */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">দ্রুত শহর পরিবর্তন:</span>
              {cityOptions.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    selectedCity === city.id
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {city.id === 'সব' ? 'সব শহর' : city.id}
                </button>
              ))}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">ক্যাটাগরি:</span>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              SELECTED CITY EMERGENCY & QUESTURA CONTACTS CARD
             ========================================================================= */}
          {activeCityEmergency && (
            <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-red-950/80 via-slate-950 to-slate-900 text-white border-2 border-red-500/40 shadow-xl animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-red-900/60 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-red-600 text-white shadow-md">
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-white">
                      {selectedCity} শহরের স্থানীয় জরুরি হেল্পলাইন ও কোয়েস্তুরা
                    </h3>
                    <p className="text-xs text-red-200/90">
                      ইমিগ্রেশন পুলিশ, ২৪ ঘণ্টা ট্রমা হাসপাতাল ও ডাক্তারের জরুরি ফোন
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-900/80 text-red-200 border border-red-500/40">
                  {selectedCity} Local
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Questura */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-900 text-blue-200 mb-2 inline-block">
                      ইমিগ্রেশন কোয়েস্তুরা
                    </span>
                    <h4 className="font-bold text-sm text-white mb-1">
                      {activeCityEmergency.questura.name}
                    </h4>
                    <p className="text-xs text-slate-400 mb-2">
                      {activeCityEmergency.questura.address}
                    </p>
                    <p className="text-[11px] text-emerald-300/90 leading-tight">
                      {activeCityEmergency.questura.note}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800">
                    <a
                      href={`tel:${activeCityEmergency.questura.phone.replace(/\s+/g, '')}`}
                      className="w-full py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>কল দিন ({activeCityEmergency.questura.phone})</span>
                    </a>
                  </div>
                </div>

                {/* Emergency Hospital Pronto Soccorso */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-900 text-red-200 mb-2 inline-block">
                      ২৪ ঘণ্টা প্রন্তো সোক্কোরসো
                    </span>
                    <h4 className="font-bold text-sm text-white mb-1">
                      {activeCityEmergency.hospital.name}
                    </h4>
                    <p className="text-xs text-slate-400 mb-2">
                      {activeCityEmergency.hospital.address}
                    </p>
                    <p className="text-[11px] text-red-300 leading-tight">
                      {activeCityEmergency.hospital.emergencyDept}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800">
                    <a
                      href={`tel:${activeCityEmergency.hospital.phone.replace(/\s+/g, '')}`}
                      className="w-full py-1.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Ambulance className="w-3.5 h-3.5" />
                      <span>হাসপাতালে কল ({activeCityEmergency.hospital.phone})</span>
                    </a>
                  </div>
                </div>

                {/* Guardia Medica */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-900 text-amber-200 mb-2 inline-block">
                      রাত্রিকালীন ডাক্তার (Guardia Medica)
                    </span>
                    <h4 className="font-bold text-sm text-white mb-1">
                      অন-কল মেডিকেল সার্ভিস ({selectedCity})
                    </h4>
                    <p className="text-xs text-amber-300/90 mb-1">
                      ডিউটি: {activeCityEmergency.guardiaMedica.hours}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {activeCityEmergency.guardiaMedica.note}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800">
                    <a
                      href={`tel:${activeCityEmergency.guardiaMedica.phone.split('/')[0].replace(/\s+/g, '')}`}
                      className="w-full py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>গার্ডিয়া মেডিকা ({activeCityEmergency.guardiaMedica.phone})</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              LOCAL CAF & PATRONATO OFFICES HIGHLIGHT
             ========================================================================= */}
          {localCafOffices.length > 0 && selectedCategory === 'all' && (
            <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 dark:text-emerald-200">
                    {selectedCity === 'সব'
                      ? 'ইতালির শীর্ষ CAF ও প্যাট্রোনেটো অফিস'
                      : `${selectedCity} শহরের অনুমোদিত CAF ও প্যাট্রোনেটো`}
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
                  {localCafOffices.length} টি অফিস তালিকাভুক্ত
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {localCafOffices.slice(0, 3).map((caf) => (
                  <div
                    key={caf.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {caf.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                          {caf.city}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{caf.address}</span>
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {caf.services.slice(0, 3).map((svc, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            ✓ {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <a
                        href={`tel:${caf.phone.replace(/\s+/g, '')}`}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>কল দিন ({caf.phone})</span>
                      </a>
                      {caf.googleMapQuery && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            caf.googleMapQuery
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="ম্যাপে লোকেশন দেখুন"
                          className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                        >
                          <Navigation className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Directory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDirectory.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <Info className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-500 font-medium">নির্বাচিত শহর বা ক্যাটাগরিতে কোনো প্রতিষ্ঠান পাওয়া যায়নি।</p>
                <button
                  onClick={() => {
                    setSelectedCity('সব');
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
                >
                  সব প্রতিষ্ঠান দেখুন
                </button>
              </div>
            ) : (
              filteredDirectory.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                          {item.city} • {item.category.toUpperCase()}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-lg border border-amber-300 dark:border-amber-800 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                          {item.rating}
                        </span>
                      </div>
                    </div>

                    {/* Address & Hours */}
                    <div className="space-y-1.5 my-3 text-xs text-slate-500 dark:text-slate-400">
                      <p className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{item.address}</span>
                      </p>
                      {item.hours && (
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.hours}</span>
                        </p>
                      )}
                      {item.banglaStaff && (
                        <p className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>বাংলাভাষী স্টাফ উপস্থিত আছেন</span>
                        </p>
                      )}
                    </div>

                    {/* Services Chips */}
                    <div className="flex flex-wrap gap-1.5 my-3">
                      {item.services.map((svc, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                        >
                          ✓ {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <a
                      href={`tel:${item.phone.replace(/\s+/g, '')}`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 transition-transform active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>কল দিন ({item.phone})</span>
                    </a>

                    {item.googleMapQuery && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          item.googleMapQuery
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        title="গুগল ম্যাপে দেখুন"
                      >
                        <Navigation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
