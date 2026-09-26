'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  X,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Calendar,
  Building2,
  ChevronRight,
  Info,
  Sparkles,
  Send,
} from 'lucide-react';
import { EMBASSY_ALERTS, EmbassyNotification } from '@/lib/data';

interface EmbassyNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAlertDetail?: (alert: EmbassyNotification) => void;
}

export default function EmbassyNotificationModal({
  isOpen,
  onClose,
  onViewAlertDetail,
}: EmbassyNotificationModalProps) {
  const [permissionState, setPermissionState] = useState<'default' | 'granted' | 'denied'>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });
  const [selectedAlert, setSelectedAlert] = useState<EmbassyNotification | null>(EMBASSY_ALERTS[0]);
  const [subscribedCategory, setSubscribedCategory] = useState<'all' | 'camps' | 'advisories'>('all');
  const [testNotificationSent, setTestNotificationSent] = useState<boolean>(false);
  const [readAlertIds, setReadAlertIds] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedRead = localStorage.getItem('embassy_read_alerts');
        return savedRead ? JSON.parse(savedRead) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  const [unsupportedError, setUnsupportedError] = useState<string | null>(null);

  if (!isOpen) return null;

  const markAsRead = (id: string) => {
    const updated = { ...readAlertIds, [id]: true };
    setReadAlertIds(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('embassy_read_alerts', JSON.stringify(updated));
    }
  };

  const requestPushPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setUnsupportedError('আপনার ব্রাউজারে পুশ নোটিফিকেশন এপিআই সমর্থিত নয়। তবে আপনি সরাসরি এই পোর্টাল থেকে সকল বিজ্ঞপ্তি পড়তে পারেন।');
      setTimeout(() => setUnsupportedError(null), 6000);
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionState(permission);

      if (permission === 'granted') {
        // Send welcome test notification
        new Notification('ইতালিপ্রবাসী দূতাবাস অ্যালার্ট চালু হয়েছে 🇧🇩🇮🇹', {
          body: 'পাসপোর্ট ক্যাম্প ও জরুরি বিজ্ঞপ্তির সকল আপডেট এখন থেকে সরাসরি আপনার ডিভাইসে পাবেন।',
          icon: '/favicon.ico',
        });
        setTestNotificationSent(true);
        setTimeout(() => setTestNotificationSent(false), 5000);
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  };

  const sendTestNotificationForAlert = (alertItem: EmbassyNotification) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(`[দূতাবাস নোটিস] ${alertItem.title}`, {
        body: alertItem.summary,
        icon: '/favicon.ico',
      });
      setTestNotificationSent(true);
      setTimeout(() => setTestNotificationSent(false), 4000);
    } else {
      requestPushPermission();
    }
  };

  const filteredAlerts = EMBASSY_ALERTS.filter((item) => {
    if (subscribedCategory === 'camps') return item.category === 'consular_camp';
    if (subscribedCategory === 'advisories') return item.category === 'advisory' || item.category === 'urgent';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-emerald-500/40 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white flex items-center justify-between border-b border-emerald-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-slate-950 shadow-md">
              <BellRing className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">বাংলাদেশ দূতাবাস পুশ নোটিফিকেশন</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-200 border border-emerald-500/30">
                  রোম ও মিলান
                </span>
              </div>
              <p className="text-xs text-emerald-200/90">
                পাসপোর্ট রিনিউ ক্যাম্প, এনআইডি এবং জরুরি কমিউনিটি সতর্কবার্তার সরাসরি পুশ অ্যালার্ট
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Push Notification Activation Card */}
        <div className="p-4 sm:p-5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
                <span>ব্রাউজার নোটিফিকেশন স্ট্যাটাস:</span>
                {permissionState === 'granted' ? (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-800 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    সক্রিয় (Active)
                  </span>
                ) : permissionState === 'denied' ? (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-rose-200 text-rose-800 font-bold">
                    ব্লক করা (ব্রাউজার সেটিংসে অ্যালাউ করুন)
                  </span>
                ) : (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold">
                    অনুমতি প্রয়োজন
                  </span>
                )}
              </h4>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-0.5">
                নতুন পাসপোর্ট ক্যাম্প ও সতর্কবার্তা ঘোষণার সাথে সাথে আপনার মোবাইলে বা পিসিতে নোটিফিকেশন যাবে।
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto">
            {permissionState !== 'granted' ? (
              <button
                onClick={requestPushPermission}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/30 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <BellRing className="w-3.5 h-3.5 text-amber-300" />
                <span>পুশ অ্যালার্ট চালু করুন</span>
              </button>
            ) : (
              <button
                onClick={() => sendTestNotificationForAlert(selectedAlert || EMBASSY_ALERTS[0])}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>টেস্ট নোটিফিকেশন পাঠান</span>
              </button>
            )}
          </div>
        </div>

        {/* Confirmation banner if test push sent */}
        {testNotificationSent && (
          <div className="px-5 py-2 bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>আপনার ডিভাইসে পুশ নোটিফিকেশন পাঠানো হয়েছে! চেক করে দেখুন।</span>
          </div>
        )}

        {/* Warning banner if notifications unsupported */}
        {unsupportedError && (
          <div className="px-5 py-2 bg-rose-500 text-white text-xs font-medium flex items-center justify-center gap-2 animate-in fade-in">
            <Info className="w-4 h-4" />
            <span>{unsupportedError}</span>
          </div>
        )}

        {/* Modal Main Content: List + Detail Pane */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Notification Feed (5 cols) */}
          <div className="md:col-span-5 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-4 space-y-2.5 max-h-[500px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                সর্বশেষ বিজ্ঞপ্তি তালিকা ({filteredAlerts.length})
              </span>
              <div className="flex gap-1 text-[10px]">
                <button
                  onClick={() => setSubscribedCategory('all')}
                  className={`px-2 py-0.5 rounded font-bold ${subscribedCategory === 'all' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}
                >
                  সব
                </button>
                <button
                  onClick={() => setSubscribedCategory('camps')}
                  className={`px-2 py-0.5 rounded font-bold ${subscribedCategory === 'camps' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}
                >
                  ক্যাম্প
                </button>
                <button
                  onClick={() => setSubscribedCategory('advisories')}
                  className={`px-2 py-0.5 rounded font-bold ${subscribedCategory === 'advisories' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}
                >
                  সতর্কবার্তা
                </button>
              </div>
            </div>

            {filteredAlerts.map((alert) => {
              const isSelected = selectedAlert?.id === alert.id;
              const isRead = !!readAlertIds[alert.id];
              const isUrgent = alert.importance === 'urgent';

              return (
                <div
                  key={alert.id}
                  onClick={() => {
                    setSelectedAlert(alert);
                    markAsRead(alert.id);
                  }}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all relative ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Unread dot */}
                  {!isRead && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}

                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                        isUrgent
                          ? 'bg-red-600 text-white'
                          : 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                      }`}
                    >
                      {alert.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {alert.date}
                    </span>
                  </div>

                  <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {alert.title}
                  </h5>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {alert.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Alert Detailed View (7 cols) */}
          <div className="md:col-span-7 p-5 sm:p-6 overflow-y-auto max-h-[500px] flex flex-col justify-between bg-white dark:bg-slate-950">
            {selectedAlert ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                      {selectedAlert.mission}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {selectedAlert.date}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                    {selectedAlert.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    {selectedAlert.summary}
                  </p>
                </div>

                {/* Bullet Points / Event Instructions */}
                <div>
                  <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    বিস্তারিত নির্দেশনা ও শর্তাবলী:
                  </h5>
                  <div className="space-y-2">
                    {selectedAlert.details.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-emerald-50/40 dark:bg-slate-900/60 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-800"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  {selectedAlert.link && (
                    <a
                      href={selectedAlert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>দূতাবাসের অফিশিয়াল সাইট</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => sendTestNotificationForAlert(selectedAlert)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5 text-emerald-600" />
                    <span>এই নোটিসটি পুশ অ্যালার্ট হিসেবে পান</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400">
                <Info className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-semibold">বাম পাশের তালিকা থেকে যেকোনো বিজ্ঞপ্তি নির্বাচন করুন।</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Notice */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 px-5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>
            * সকল বিজ্ঞপ্তি বাংলাদেশ দূতাবাস রোম ও মিলান কনস্যুলেট জেনারেলের অফিশিয়াল প্রেস রিলিজ অনুযায়ী প্রদর্শিত।
          </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 hidden sm:inline">
            সরাসরি ব্রাউজার পুশ সাপোর্টেড
          </span>
        </div>
      </div>
    </div>
  );
}
