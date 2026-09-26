'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck,
  ExternalLink,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Search,
  BookOpen,
  Sparkles,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import { LEGAL_GUIDES, LegalGuide } from '@/lib/data';

interface LegalGuidesProps {
  initialCategory?: string;
}

export default function LegalGuides({ initialCategory }: LegalGuidesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [expandedGuideId, setExpandedGuideId] = useState<string>('permesso-renewal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'সকল গাইড' },
    { id: 'permesso', label: 'পারমেসো নবায়ন' },
    { id: 'spid', label: 'কোদিচে ও SPID' },
    { id: 'embassy', label: 'দূতাবাস ও পাসপোর্ট' },
    { id: 'bonus', label: 'Assegno ও বোনাস' },
    { id: 'driving', label: 'ড্রাইভিং লাইসেন্স' },
    { id: 'citizenship', label: 'নাগরিকত্ব' },
  ];

  const filteredGuides = LEGAL_GUIDES.filter((guide) => {
    const matchesCat = selectedCategory === 'all' || guide.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;
    return (
      matchesCat &&
      (guide.titleBn.toLowerCase().includes(q) ||
        guide.titleIt.toLowerCase().includes(q) ||
        guide.summary.toLowerCase().includes(q))
    );
  });

  const toggleDocCheck = (docKey: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docKey]: !prev[docKey],
    }));
  };

  return (
    <section id="legal" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>অফিশিয়াল লিগ্যাল ও ডকুমেন্টেশন গাইড</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ধাপে ধাপে সরকারি কাজের নিয়ম ও চেকলিস্ট
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            পারমেসো রিনিউ, কোদিচে ফিস্কালে, স্পিড, কনস্যুলার সেবা ও সরকারি ভাতার নির্ভুল সঠিক তথ্য জানুন।
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mb-8 space-y-4">
          <div className="max-w-2xl mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="গাইডের বিষয় দিয়ে খুঁজুন (যেমন: কিট পোস্টাল, পাসপোর্ট, SPID, বোলেত্তিনো)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/50'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Accordion Grid */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredGuides.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 font-medium">কোনো গাইড পাওয়া যায়নি।</p>
            </div>
          ) : (
            filteredGuides.map((guide) => {
              const isExpanded = expandedGuideId === guide.id;
              return (
                <div
                  key={guide.id}
                  className={`rounded-3xl transition-all duration-200 border ${
                    isExpanded
                      ? 'bg-white dark:bg-slate-950 border-emerald-500/80 shadow-xl ring-1 ring-emerald-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => setExpandedGuideId(isExpanded ? '' : guide.id)}
                    className="p-5 sm:p-6 cursor-pointer flex items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/50">
                          {guide.badge}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {guide.estimatedTime}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                        {guide.titleBn}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {guide.titleIt}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                        {guide.summary}
                      </p>

                      {/* Interactive Document Checklist */}
                      <div className="mb-6 p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                            <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            প্রয়োজনীয় কাগজপত্রের চেকলিস্ট (ক্লিক করে নিশ্চিত করুন):
                          </h4>
                          <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold hidden sm:inline">
                            {guide.requiredDocuments.filter((d) => checkedDocs[`${guide.id}-${d}`]).length} / {guide.requiredDocuments.length} প্রস্তুত
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {guide.requiredDocuments.map((doc, idx) => {
                            const docKey = `${guide.id}-${doc}`;
                            const isChecked = !!checkedDocs[docKey];
                            return (
                              <div
                                key={idx}
                                onClick={() => toggleDocCheck(docKey)}
                                className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-start gap-2 ${
                                  isChecked
                                    ? 'bg-emerald-100/90 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-100 border-emerald-400 line-through opacity-85'
                                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
                                }`}
                              >
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                )}
                                <span>{doc}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step-by-Step Instructions */}
                      <div className="mb-6 space-y-4">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                          ধাপে ধাপে প্রক্রিয়া (Step-by-Step Procedure):
                        </h4>

                        <div className="space-y-3">
                          {guide.steps.map((step) => (
                            <div
                              key={step.stepNumber}
                              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
                                  {step.stepNumber}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                                    {step.title}
                                  </h5>
                                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                    {step.description}
                                  </p>
                                  {step.tip && (
                                    <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 font-medium">
                                      💡 <strong>বিশেষ পরামর্শ:</strong> {step.tip}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Warning Notice if applicable */}
                      {guide.warningNote && (
                        <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                          <div>
                            <strong>সতর্কতা:</strong> {guide.warningNote}
                          </div>
                        </div>
                      )}

                      {/* Official Links */}
                      {guide.officialLinks && guide.officialLinks.length > 0 && (
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-500">সরকারি লিঙ্ক:</span>
                          {guide.officialLinks.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-emerald-700 dark:text-emerald-300 transition-colors"
                            >
                              <span>{link.name}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
