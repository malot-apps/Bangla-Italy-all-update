'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  Settings,
  DollarSign,
  Megaphone,
  Layers,
  Video,
  BookOpen,
  RotateCcw,
  Save,
  CheckCircle2,
  Trash2,
  Plus,
  ExternalLink,
  Code,
  Sliders,
  Eye,
  LogOut,
  Key,
} from 'lucide-react';
import { useAdminConfig, AdminConfig, AdSlotConfig } from '@/lib/AdminConfigContext';

export default function AdminModal() {
  const {
    config,
    updateConfig,
    resetToDefaults,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
  } = useAdminConfig();

  // Login form states
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'ads' | 'rates' | 'notices' | 'directory' | 'youtube' | 'security'>('ads');

  // Draft config states for editing
  const [draftConfig, setDraftConfig] = useState<AdminConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Notice form temporary state
  const [newNotice, setNewNotice] = useState({
    textBn: '',
    textEn: '',
    textIt: '',
    type: 'urgent' as 'urgent' | 'info' | 'warning',
  });

  // Directory form temporary state
  const [newDirItem, setNewDirItem] = useState({
    name: '',
    city: 'Roma',
    category: 'caf' as 'caf' | 'grocery' | 'embassy' | 'medical',
    phone: '',
    address: '',
    link: '',
  });

  // Sync draftConfig when external config changes
  const [prevConfig, setPrevConfig] = useState<AdminConfig>(config);
  if (config !== prevConfig) {
    setPrevConfig(config);
    setDraftConfig(config);
  }

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (success) {
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('ভুল ইউজারনেম বা পাসওয়ার্ড! ডিফল্ট: admin / 1234');
    }
  };

  const handleSaveAll = () => {
    updateConfig(() => draftConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm('আপনি কি নিশ্চিত যে সকল অ্যাডমিন ডাটা ডিফল্ট সেটিংসে ফিরিয়ে নিতে চান?')) {
      resetToDefaults();
      setDraftConfig(config);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  // Helper to update specific ad slot in draft
  const updateAdSlot = (slotKey: keyof typeof draftConfig.ads, field: keyof AdSlotConfig, value: unknown) => {
    setDraftConfig((prev) => {
      const currentSlot = prev.ads[slotKey] as AdSlotConfig;
      return {
        ...prev,
        ads: {
          ...prev.ads,
          [slotKey]: {
            ...currentSlot,
            [field]: value,
          },
        },
      };
    });
  };

  // Helper to add notice
  const handleAddNotice = () => {
    if (!newNotice.textBn.trim()) return;
    const newItem = {
      id: `n-${Date.now()}`,
      textBn: newNotice.textBn,
      textEn: newNotice.textEn || newNotice.textBn,
      textIt: newNotice.textIt || newNotice.textBn,
      type: newNotice.type,
      active: true,
    };
    setDraftConfig((prev) => ({
      ...prev,
      notices: [newItem, ...prev.notices],
    }));
    setNewNotice({ textBn: '', textEn: '', textIt: '', type: 'urgent' });
  };

  // Helper to delete notice
  const handleDeleteNotice = (id: string) => {
    setDraftConfig((prev) => ({
      ...prev,
      notices: prev.notices.filter((n) => n.id !== id),
    }));
  };

  // Helper to add directory item
  const handleAddDirectory = () => {
    if (!newDirItem.name.trim() || !newDirItem.phone.trim()) return;
    const newItem = {
      id: `dir-${Date.now()}`,
      ...newDirItem,
    };
    setDraftConfig((prev) => ({
      ...prev,
      customDirectory: [...prev.customDirectory, newItem],
    }));
    setNewDirItem({
      name: '',
      city: 'Roma',
      category: 'caf',
      phone: '',
      address: '',
      link: '',
    });
  };

  // Helper to delete directory item
  const handleDeleteDirectory = (id: string) => {
    setDraftConfig((prev) => ({
      ...prev,
      customDirectory: prev.customDirectory.filter((d) => d.id !== id),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between border-b border-emerald-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>ইতালিপ্রবাসী অ্যাডমিন ড্যাশবোর্ড</span>
                <span className="text-3xs px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-200 border border-emerald-500/40">
                  LIVE CONTROL
                </span>
              </h3>
              <p className="text-2xs text-emerald-200">
                Strategic Adsterra Placements, Live EUR Rates, Notices & Content Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 flex items-center gap-1 transition-colors"
                title="লগ আউট"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">লগআউট</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsAdminOpen(false);
                if (window.location.hash === '#admin') {
                  history.pushState('', document.title, window.location.pathname + window.location.search);
                }
              }}
              className="p-1.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Password Protection Form */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 border border-amber-300">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              সুরক্ষিত অ্যাডমিন প্যানেল প্রবেশ
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              বিজ্ঞাপন স্লট, লাইভ ইউরো রেট ও কনটেন্ট নিয়ন্ত্রণ করতে অ্যাডমিন পাসওয়ার্ড দিন।
              (ডিফল্ট: <span className="font-mono text-emerald-600 font-bold">admin</span> / <span className="font-mono text-emerald-600 font-bold">1234</span>)
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full max-w-xs space-y-3">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ইউজারনেম (admin)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড (1234)"
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-500 font-semibold">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Unlock className="w-4 h-4" />
                <span>লগইন করুন</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Management Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('ads')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'ads'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-t-2 border-emerald-600 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>অ্যাডস্টাররা ও কাস্টম অ্যাডস</span>
              </button>

              <button
                onClick={() => setActiveTab('rates')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'rates'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-t-2 border-emerald-600 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>লাইভ ইউরো রেট কন্ট্রোলার</span>
              </button>

              <button
                onClick={() => setActiveTab('notices')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'notices'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-t-2 border-emerald-600 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>জরুরি নোটিস ও অ্যালার্ট</span>
              </button>

              <button
                onClick={() => setActiveTab('directory')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'directory'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-t-2 border-emerald-600 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>ডিরেক্টরি ও CAF অফিস</span>
              </button>

              <button
                onClick={() => setActiveTab('youtube')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'youtube'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-t-2 border-emerald-600 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>ইউটিউব লাইভ ভিডিও</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`px-3.5 py-2.5 rounded-t-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-t-2 border-emerald-600 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>পাসওয়ার্ড পরিবর্তন</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* TAB 1: AD MANAGEMENT */}
              {activeTab === 'ads' && (
                <div className="space-y-6">
                  {/* Master Ad Switch */}
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-amber-900 dark:text-amber-300 flex items-center gap-2">
                        <Sliders className="w-4 h-4" />
                        <span>মাস্টার সুইচ: সকল বিজ্ঞাপন অন / অফ</span>
                      </h4>
                      <p className="text-xs text-amber-800/80 dark:text-amber-400/80 mt-0.5">
                        এক ক্লিকে ওয়েবসাইটের সব ব্যানার, ইন-ফিড ও স্টিকি বিজ্ঞাপন চালু বা বন্ধ করুন।
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draftConfig.ads.allAdsEnabled}
                        onChange={(e) =>
                          setDraftConfig((prev) => ({
                            ...prev,
                            ads: { ...prev.ads, allAdsEnabled: e.target.checked },
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {/* 1. Header Top Banner Slot */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          ১. হেডার টপ ব্যানার (728x90 / 320x50)
                        </span>
                        <span className="text-3xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                          TOP BANNER
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draftConfig.ads.topBanner.enabled}
                          onChange={(e) => updateAdSlot('topBanner', 'enabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="topBannerType"
                          checked={draftConfig.ads.topBanner.type === 'custom'}
                          onChange={() => updateAdSlot('topBanner', 'type', 'custom')}
                        />
                        <span>কাস্টম প্রমো ব্যানার</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="topBannerType"
                          checked={draftConfig.ads.topBanner.type === 'script'}
                          onChange={() => updateAdSlot('topBanner', 'type', 'script')}
                        />
                        <span>অ্যাডস্টাররা JS / HTML কোড</span>
                      </label>
                    </div>

                    {draftConfig.ads.topBanner.type === 'script' ? (
                      <div>
                        <label className="text-2xs text-slate-500 font-semibold block mb-1">
                          Adsterra স্ক্রিপ্ট কোড পেস্ট করুন:
                        </label>
                        <textarea
                          rows={3}
                          value={draftConfig.ads.topBanner.scriptCode}
                          onChange={(e) => updateAdSlot('topBanner', 'scriptCode', e.target.value)}
                          className="w-full font-mono text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">শিরোনাম:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.topBanner.customTitle}
                            onChange={(e) => updateAdSlot('topBanner', 'customTitle', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">ছবি URL:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.topBanner.customImage || ''}
                            onChange={(e) => updateAdSlot('topBanner', 'customImage', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">বাটন লেখা:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.topBanner.customButtonText || ''}
                            onChange={(e) => updateAdSlot('topBanner', 'customButtonText', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">টার্গেট লিঙ্ক:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.topBanner.customUrl || ''}
                            onChange={(e) => updateAdSlot('topBanner', 'customUrl', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. In-Feed Native Ad Card */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          ২. ইন-ফিড নেটিভ কার্ড (In-Feed Native)
                        </span>
                        <span className="text-3xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                          NATIVE FEED
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draftConfig.ads.nativeInFeed.enabled}
                          onChange={(e) => updateAdSlot('nativeInFeed', 'enabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="nativeInFeedType"
                          checked={draftConfig.ads.nativeInFeed.type === 'custom'}
                          onChange={() => updateAdSlot('nativeInFeed', 'type', 'custom')}
                        />
                        <span>কাস্টম নেটিভ কার্ড</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="nativeInFeedType"
                          checked={draftConfig.ads.nativeInFeed.type === 'script'}
                          onChange={() => updateAdSlot('nativeInFeed', 'type', 'script')}
                        />
                        <span>অ্যাডস্টাররা স্ক্রিপ্ট</span>
                      </label>
                    </div>

                    {draftConfig.ads.nativeInFeed.type === 'script' ? (
                      <textarea
                        rows={3}
                        value={draftConfig.ads.nativeInFeed.scriptCode}
                        onChange={(e) => updateAdSlot('nativeInFeed', 'scriptCode', e.target.value)}
                        className="w-full font-mono text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">শিরোনাম:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.nativeInFeed.customTitle}
                            onChange={(e) => updateAdSlot('nativeInFeed', 'customTitle', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">সাবটাইটেল:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.nativeInFeed.customSubtitle || ''}
                            onChange={(e) => updateAdSlot('nativeInFeed', 'customSubtitle', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">ছবি URL:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.nativeInFeed.customImage || ''}
                            onChange={(e) => updateAdSlot('nativeInFeed', 'customImage', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">বাটন টেক্সট ও লিঙ্ক:</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={draftConfig.ads.nativeInFeed.customButtonText || ''}
                              onChange={(e) => updateAdSlot('nativeInFeed', 'customButtonText', e.target.value)}
                              placeholder="বাটন টেক্সট"
                              className="w-1/2 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                            <input
                              type="text"
                              value={draftConfig.ads.nativeInFeed.customUrl || ''}
                              onChange={(e) => updateAdSlot('nativeInFeed', 'customUrl', e.target.value)}
                              placeholder="URL"
                              className="w-1/2 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Floating Sticky Sidebar Ad (300x250) */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          ৩. ফ্লোটিং স্টিকি ব্যানার (300x250 Desktop)
                        </span>
                        <span className="text-3xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                          STICKY 300x250
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draftConfig.ads.floatingSidebar.enabled}
                          onChange={(e) => updateAdSlot('floatingSidebar', 'enabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="floatingSidebarType"
                          checked={draftConfig.ads.floatingSidebar.type === 'custom'}
                          onChange={() => updateAdSlot('floatingSidebar', 'type', 'custom')}
                        />
                        <span>কাস্টম 300x250</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="floatingSidebarType"
                          checked={draftConfig.ads.floatingSidebar.type === 'script'}
                          onChange={() => updateAdSlot('floatingSidebar', 'type', 'script')}
                        />
                        <span>অ্যাডস্টাররা স্ক্রিপ্ট</span>
                      </label>
                    </div>

                    {draftConfig.ads.floatingSidebar.type === 'script' ? (
                      <textarea
                        rows={3}
                        value={draftConfig.ads.floatingSidebar.scriptCode}
                        onChange={(e) => updateAdSlot('floatingSidebar', 'scriptCode', e.target.value)}
                        className="w-full font-mono text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">শিরোনাম:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.floatingSidebar.customTitle}
                            onChange={(e) => updateAdSlot('floatingSidebar', 'customTitle', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-2xs text-slate-500 font-semibold block mb-1">ছবি URL:</label>
                          <input
                            type="text"
                            value={draftConfig.ads.floatingSidebar.customImage || ''}
                            onChange={(e) => updateAdSlot('floatingSidebar', 'customImage', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4. Mobile Bottom Sticky Banner */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          ৪. মোবাইল বটম স্টিকি ব্যানার (Mobile 320x50)
                        </span>
                        <span className="text-3xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                          MOBILE BOTTOM
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draftConfig.ads.mobileStickyBottom.enabled}
                          onChange={(e) => updateAdSlot('mobileStickyBottom', 'enabled', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-2xs text-slate-500 font-semibold block mb-1">ব্যানার টেক্সট:</label>
                        <input
                          type="text"
                          value={draftConfig.ads.mobileStickyBottom.customTitle}
                          onChange={(e) => updateAdSlot('mobileStickyBottom', 'customTitle', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <label className="text-2xs text-slate-500 font-semibold block mb-1">বাটন টেক্সট ও লিঙ্ক:</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={draftConfig.ads.mobileStickyBottom.customButtonText || ''}
                            onChange={(e) => updateAdSlot('mobileStickyBottom', 'customButtonText', e.target.value)}
                            className="w-1/2 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                          <input
                            type="text"
                            value={draftConfig.ads.mobileStickyBottom.customUrl || ''}
                            onChange={(e) => updateAdSlot('mobileStickyBottom', 'customUrl', e.target.value)}
                            className="w-1/2 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. Direct Link / Popunder Trigger */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white block">
                          ৫. ডিরেক্ট লিঙ্ক / পপআন্ডার ট্রিগার স্লট
                        </span>
                        <span className="text-2xs text-slate-500">
                          পিডিএফ ডাউনলোড বা অডিও শোনার মতো ক্লিকের সাথে অ্যাডস্টাররা ডিরেক্ট লিঙ্ক যুক্ত করুন।
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draftConfig.ads.directLink.enabled}
                          onChange={(e) =>
                            setDraftConfig((prev) => ({
                              ...prev,
                              ads: {
                                ...prev.ads,
                                directLink: { ...prev.ads.directLink, enabled: e.target.checked },
                              },
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div>
                      <input
                        type="url"
                        value={draftConfig.ads.directLink.url}
                        onChange={(e) =>
                          setDraftConfig((prev) => ({
                            ...prev,
                            ads: {
                              ...prev.ads,
                              directLink: { ...prev.ads.directLink, url: e.target.value },
                            },
                          }))
                        }
                        placeholder="https://example-direct-link.com"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE RATE CONTROLLER */}
              {activeTab === 'rates' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
                    <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4" />
                      <span>লাইভ ইউরো (EUR) টু টাকা (BDT) এক্সচেঞ্জ রেট কন্ট্রোলার</span>
                    </h4>
                    <p className="text-xs text-emerald-800/80 dark:text-emerald-400/80">
                      এখানে রেট পরিবর্তন করলে পুরো ওয়েবসাইটের কনভার্টার ও হিসাব স্বয়ংক্রিয়ভাবে আপডেট হবে।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        ১ ইউরো = কত টাকা (EUR to BDT Base Rate):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.05"
                          value={draftConfig.liveRate.eurToBdt}
                          onChange={(e) =>
                            setDraftConfig((prev) => ({
                              ...prev,
                              liveRate: { ...prev.liveRate, eurToBdt: parseFloat(e.target.value) || 0 },
                            }))
                          }
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-mono font-bold"
                        />
                        <span className="absolute left-3 top-2.5 text-slate-400 font-bold">€</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        সরকারি ব্যাংক রেমিট্যান্স প্রণোদনা (%):
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={draftConfig.liveRate.incentivePercent}
                          onChange={(e) =>
                            setDraftConfig((prev) => ({
                              ...prev,
                              liveRate: { ...prev.liveRate, incentivePercent: parseFloat(e.target.value) || 0 },
                            }))
                          }
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-mono font-bold"
                        />
                        <span className="absolute left-3 top-2.5 text-slate-400 font-bold">%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      রেটের উৎস বা আপডেটের নোট:
                    </label>
                    <input
                      type="text"
                      value={draftConfig.liveRate.lastUpdatedText}
                      onChange={(e) =>
                        setDraftConfig((prev) => ({
                          ...prev,
                          liveRate: { ...prev.liveRate, lastUpdatedText: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  {/* Calculated Preview Box */}
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-2xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                      লাইভ প্রিভিউ (Home Preview)
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-mono text-emerald-600">
                        ১ EUR = {draftConfig.liveRate.eurToBdt.toFixed(2)} BDT
                      </span>
                      <span className="text-xs text-amber-600 font-bold">
                        (+{draftConfig.liveRate.incentivePercent}% প্রণোদনায়:{' '}
                        {(
                          draftConfig.liveRate.eurToBdt *
                          (1 + draftConfig.liveRate.incentivePercent / 100)
                        ).toFixed(2)}{' '}
                        টাকা)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NOTICES & ANNOUNCEMENTS */}
              {activeTab === 'notices' && (
                <div className="space-y-5">
                  {/* Add New Notice Form */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-emerald-600" />
                      <span>নতুন নোটিস বা জরুরি সতর্কবার্তা যোগ করুন</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={newNotice.textBn}
                          onChange={(e) => setNewNotice({ ...newNotice, textBn: e.target.value })}
                          placeholder="নোটিসের বাংলা বিবরণ (যেমন: দূতাবাসের নতুন সময়সূচি...)"
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <select
                          value={newNotice.type}
                          onChange={(e) =>
                            setNewNotice({ ...newNotice, type: e.target.value as 'urgent' | 'info' | 'warning' })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                        >
                          <option value="urgent">🚨 অতি জরুরি (Urgent Red)</option>
                          <option value="warning">⚠️ সতর্কতা (Warning Amber)</option>
                          <option value="info">ℹ️ সাধারণ তথ্য (Info Blue)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleAddNotice}
                        disabled={!newNotice.textBn.trim()}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition-colors"
                      >
                        নোটিস যুক্ত করুন
                      </button>
                    </div>
                  </div>

                  {/* Existing Notices List */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-500 uppercase">বর্তমান নোটিস তালিকা:</h5>
                    {draftConfig.notices.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              n.type === 'urgent'
                                ? 'bg-red-500'
                                : n.type === 'warning'
                                ? 'bg-amber-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          <p className="truncate text-slate-800 dark:text-slate-200 font-medium">{n.textBn}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleDeleteNotice(n.id)}
                            className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                            title="মুছুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: DIRECTORY & CAF OFFICES */}
              {activeTab === 'directory' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-emerald-600" />
                      <span>নতুন অফিস বা গ্রোসারি হেল্পলাইন যোগ করুন</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div>
                        <input
                          type="text"
                          value={newDirItem.name}
                          onChange={(e) => setNewDirItem({ ...newDirItem, name: e.target.value })}
                          placeholder="প্রতিষ্ঠানের নাম"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={newDirItem.city}
                          onChange={(e) => setNewDirItem({ ...newDirItem, city: e.target.value })}
                          placeholder="শহর (যেমন: Roma, Milano)"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <select
                          value={newDirItem.category}
                          onChange={(e) =>
                            setNewDirItem({
                              ...newDirItem,
                              category: e.target.value as 'caf' | 'grocery' | 'embassy' | 'medical',
                            })
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        >
                          <option value="caf">CAF & Patronato</option>
                          <option value="grocery">হালাল শপ ও গ্রোসারি</option>
                          <option value="embassy">দূতাবাস ও কন্স্যুলার</option>
                          <option value="medical">হাসপাতাল ও ডাক্তার</option>
                        </select>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={newDirItem.phone}
                          onChange={(e) => setNewDirItem({ ...newDirItem, phone: e.target.value })}
                          placeholder="ফোন নম্বর (+39...)"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={newDirItem.address}
                          onChange={(e) => setNewDirItem({ ...newDirItem, address: e.target.value })}
                          placeholder="ঠিকানা (রাস্তার নাম ও পোস্টাল কোড)"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleAddDirectory}
                        disabled={!newDirItem.name.trim() || !newDirItem.phone.trim()}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition-colors"
                      >
                        ডিরেক্টরিতে যোগ করুন
                      </button>
                    </div>
                  </div>

                  {/* List of custom directory items */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-slate-500 uppercase">সংরক্ষিত কাস্টম ডিরেক্টরি:</h5>
                    {draftConfig.customDirectory.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                          <span className="text-slate-500">{item.city} · {item.phone}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteDirectory(item.id)}
                          className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: YOUTUBE VIDEO LINK */}
              {activeTab === 'youtube' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-900">
                    <h4 className="font-bold text-sm text-red-900 dark:text-red-300 flex items-center gap-1.5">
                      <Video className="w-4 h-4" />
                      <span>হোমপেজ ইউটিউব লাইভ ভিডিও বা চ্যানেল পরিবর্তন</span>
                    </h4>
                    <p className="text-xs text-red-800/80 dark:text-red-400/80 mt-0.5">
                      যেকোনো ইউটিউব ভিডিও বা লাইভ স্ট্রিমের লিঙ্ক এখানে পেস্ট করলেই হোমপেজের ভিডিও প্লেয়ারে সেটি চলবে।
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      ভিডিও বা লাইভ স্ট্রিম URL:
                    </label>
                    <input
                      type="text"
                      value={draftConfig.youtube.videoUrl}
                      onChange={(e) =>
                        setDraftConfig((prev) => ({
                          ...prev,
                          youtube: { ...prev.youtube, videoUrl: e.target.value },
                        }))
                      }
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      ভিডিওর শিরোনাম:
                    </label>
                    <input
                      type="text"
                      value={draftConfig.youtube.title}
                      onChange={(e) =>
                        setDraftConfig((prev) => ({
                          ...prev,
                          youtube: { ...prev.youtube, title: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: SECURITY / PASSWORD CHANGE */}
              {activeTab === 'security' && (
                <div className="space-y-4 max-w-md">
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Key className="w-4 h-4 text-emerald-600" />
                      <span>অ্যাডমিন ইউজার ও পাসওয়ার্ড পরিবর্তন</span>
                    </h4>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      ইউজারনেম:
                    </label>
                    <input
                      type="text"
                      value={draftConfig.adminCredentials.username}
                      onChange={(e) =>
                        setDraftConfig((prev) => ({
                          ...prev,
                          adminCredentials: { ...prev.adminCredentials, username: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      নতুন পাসওয়ার্ড:
                    </label>
                    <input
                      type="text"
                      value={draftConfig.adminCredentials.passwordHash}
                      onChange={(e) =>
                        setDraftConfig((prev) => ({
                          ...prev,
                          adminCredentials: { ...prev.adminCredentials, passwordHash: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Footer */}
            <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={handleReset}
                className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ফ্যাক্টরি রিসেট</span>
              </button>

              <div className="flex items-center gap-3">
                {saveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>সেভ সফল হয়েছে!</span>
                  </span>
                )}

                <button
                  onClick={handleSaveAll}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>পরিবর্তন সেভ করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
