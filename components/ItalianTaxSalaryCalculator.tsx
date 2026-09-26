'use client';

import React, { useState, useId } from 'react';
import {
  Calculator,
  Table as TableIcon,
  Receipt,
  PieChart,
  Percent,
  CheckCircle2,
  Copy,
  Check,
  Building,
  Info,
  Layers,
  Coins,
  ArrowRight,
  Sparkles,
  Sliders,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

interface CommonRalExample {
  label: string;
  ral: number;
  roleBn: string;
}

export default function ItalianTaxSalaryCalculator() {
  const ralInputId = useId();

  // Inputs
  const [ral, setRal] = useState<number>(24000);
  const [mensilita, setMensilita] = useState<12 | 13 | 14>(13);
  const [contractType, setContractType] = useState<'indeterminato' | 'determinato' | 'apprendistato' | 'colf'>('indeterminato');
  const [region, setRegion] = useState<string>('Lazio');
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [hasSpouse, setHasSpouse] = useState<boolean>(false);
  const [exchangeRate, setExchangeRate] = useState<number>(132.5);
  const [copied, setCopied] = useState<boolean>(false);

  // Common preset salary tiers for quick clicking
  const presetRals: CommonRalExample[] = [
    { label: '€১৫,০০০', ral: 15000, roleBn: 'পার্ট-টাইম / ক্লিনার / হেল্পার' },
    { label: '€১৮,০০০', ral: 18000, roleBn: 'ডিশওয়াশার / ওয়্যারহাউস পিকার' },
    { label: '€২২,০০০', ral: 22000, roleBn: 'রেস্টুরেন্ট কর্মী / পিৎজাইয়োলো অ্যাসিস্ট্যান্ট' },
    { label: '€২৬,০০০', ral: 26000, roleBn: 'শিপইয়ার্ড ওয়েল্ডার / টেকনিশিয়ান' },
    { label: '€৩০,০০০', ral: 30000, roleBn: 'হেড শেফ / অভিজ্ঞ কারিগর' },
    { label: '€৩৫,০০০', ral: 35000, roleBn: 'কোম্পানি স্পেশালিস্ট / ইলেকট্রিশিয়ান' },
    { label: '€৪৫,০০০', ral: 45000, roleBn: 'সুপারভাইজার / সিনিয়র মেকানিক' },
  ];

  // Region specific Addizionale Regionale rates (approximate baseline)
  const regionalRates: Record<string, { nameBn: string; rate: number }> = {
    Lazio: { nameBn: 'লাসিও (রোম / Roma)', rate: 0.0233 },
    Lombardia: { nameBn: 'লমবার্দিয়া (মিলান / Milano)', rate: 0.0153 },
    Veneto: { nameBn: 'ভেনেতো (ভেনিস ও মেস্ত্রে)', rate: 0.0123 },
    EmiliaRomagna: { nameBn: 'এমিলিয়া-রোমানিয়া (বলোনিয়া)', rate: 0.0173 },
    Campania: { nameBn: 'কাম্পানিয়া (নাপোলি / Napoli)', rate: 0.0203 },
    Piemonte: { nameBn: 'পিয়েমন্তে (তুরিন / Torino)', rate: 0.0213 },
    Toscana: { nameBn: 'তোসকানা (ফ্লোরেন্স / Firenze)', rate: 0.0162 },
    Sicilia: { nameBn: 'সিসিলি (পালেরমো / Palermo)', rate: 0.0173 },
  };

  // =========================================================================
  // CLIENT-SIDE ITALIAN TAX & NET SALARY CALCULATION ENGINE
  // =========================================================================

  // 1. Gross Calculations
  const grossAnnual = Math.max(0, ral);
  const grossMonthly = mensilita > 0 ? grossAnnual / mensilita : 0;

  // 2. INPS Social Security Contributions
  // Standard employee: 9.19% | Apprentice: 5.84% | Colf/Badante ~8.5%
  let inpsRate = 0.0919;
  if (contractType === 'apprendistato') inpsRate = 0.0584;
  else if (contractType === 'colf') inpsRate = 0.085;

  const inpsAnnual = grossAnnual * inpsRate;
  const inpsMonthly = inpsAnnual / mensilita;

  // 3. Imponibile Fiscale (Taxable Base for IRPEF)
  const imponibileFiscaleAnnual = Math.max(0, grossAnnual - inpsAnnual);
  const imponibileFiscaleMonthly = imponibileFiscaleAnnual / mensilita;

  // 4. Official Italian 3-Tier IRPEF Tax Brackets (Scaglioni IRPEF 2025/2026):
  // Tier 1: 0 to 28,000 € -> 23%
  // Tier 2: 28,001 to 50,000 € -> 35%
  // Tier 3: over 50,000 € -> 43%
  let irpefTier1 = 0;
  let irpefTier2 = 0;
  let irpefTier3 = 0;

  if (imponibileFiscaleAnnual <= 28000) {
    irpefTier1 = imponibileFiscaleAnnual * 0.23;
  } else if (imponibileFiscaleAnnual <= 50000) {
    irpefTier1 = 28000 * 0.23;
    irpefTier2 = (imponibileFiscaleAnnual - 28000) * 0.35;
  } else {
    irpefTier1 = 28000 * 0.23;
    irpefTier2 = 22000 * 0.35;
    irpefTier3 = (imponibileFiscaleAnnual - 50000) * 0.43;
  }

  const irpefLordaAnnual = irpefTier1 + irpefTier2 + irpefTier3;
  const irpefLordaMonthly = irpefLordaAnnual / mensilita;

  // 5. Employment Tax Deductions (Detrazioni da Lavoro Dipendente - Art. 13 TUIR)
  let detrazioniLavoro = 0;
  if (imponibileFiscaleAnnual > 0 && imponibileFiscaleAnnual <= 15000) {
    detrazioniLavoro = 1955;
  } else if (imponibileFiscaleAnnual > 15000 && imponibileFiscaleAnnual <= 28000) {
    detrazioniLavoro = 1910 + 1190 * ((28000 - imponibileFiscaleAnnual) / 13000);
  } else if (imponibileFiscaleAnnual > 28000 && imponibileFiscaleAnnual <= 50000) {
    detrazioniLavoro = 1910 * ((50000 - imponibileFiscaleAnnual) / 22000);
  }

  // 6. Family Deductions (Detrazioni Carichi di Famiglia)
  const detrazioneFigli = childrenCount * 950;
  const detrazioneConiuge = hasSpouse ? (imponibileFiscaleAnnual < 40000 ? 690 : 350) : 0;
  const totalDetrazioni = Math.min(irpefLordaAnnual, detrazioniLavoro + detrazioneFigli + detrazioneConiuge);

  // 7. Net IRPEF (IRPEF Netta)
  const irpefNettaAnnual = Math.max(0, irpefLordaAnnual - totalDetrazioni);
  const irpefNettaMonthly = irpefNettaAnnual / mensilita;

  // 8. Regional & Municipal Surtaxes (Addizionale Regionale e Comunale)
  const regRate = regionalRates[region]?.rate || 0.0173;
  const addizionaleRegionaleAnnual = imponibileFiscaleAnnual * regRate;
  const addizionaleRegionaleMonthly = addizionaleRegionaleAnnual / mensilita;

  const comRate = 0.008; // Average municipal surcharge (~0.8%)
  const addizionaleComunaleAnnual = imponibileFiscaleAnnual * comRate;
  const addizionaleComunaleMonthly = addizionaleComunaleAnnual / mensilita;

  const totalAddizionaliAnnual = addizionaleRegionaleAnnual + addizionaleComunaleAnnual;
  const totalAddizionaliMonthly = totalAddizionaliAnnual / mensilita;

  // 9. Total Deductions & Final Net Salary
  const totalDeductionsAnnual = inpsAnnual + irpefNettaAnnual + totalAddizionaliAnnual;
  const totalDeductionsMonthly = totalDeductionsAnnual / mensilita;

  const netAnnual = Math.max(0, grossAnnual - totalDeductionsAnnual);
  const netMonthly = mensilita > 0 ? netAnnual / mensilita : 0;
  const netMonthlyBdt = netMonthly * exchangeRate;
  const netAnnualBdt = netAnnual * exchangeRate;

  // Percentage breakdown of RAL
  const netPercentage = grossAnnual > 0 ? ((netAnnual / grossAnnual) * 100).toFixed(1) : '0';
  const inpsPercentage = grossAnnual > 0 ? ((inpsAnnual / grossAnnual) * 100).toFixed(1) : '0';
  const taxPercentage = grossAnnual > 0 ? (((irpefNettaAnnual + totalAddizionaliAnnual) / grossAnnual) * 100).toFixed(1) : '0';

  // Copy table summary
  const handleCopySummary = () => {
    if (typeof navigator !== 'undefined') {
      const summaryText = `ইতালি বেতন ও কর হিসাব (Italian Salary Breakdown):
- বার্ষিক গ্রস বেতন (RAL): €${grossAnnual.toLocaleString()}
- মাসিক গ্রস বেতন: €${grossMonthly.toFixed(0)} (${mensilita} কিস্তি)
- INPS পেনশন কর্তন: -€${inpsMonthly.toFixed(0)} / মাস
- নিট IRPEF কর: -€${irpefNettaMonthly.toFixed(0)} / মাস
- আঞ্চলিক ও পৌর ট্যাক্স: -€${totalAddizionaliMonthly.toFixed(0)} / মাস
- মাসিক নিট বেতন (Netto in Busta Paga): €${netMonthly.toFixed(0)} / মাস
- বাংলাদেশি টাকায় সমপরিমাণ: ৳ ${netMonthlyBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })} টাকা / মাস
(হিসাবটি ইতালিপ্রবাসী ডটকম ক্যালকুলেটর থেকে প্রস্তুতকৃত)`;

      navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Precomputed Comparison Rows for the Comparison Table
  const comparisonRals = [12000, 16000, 20000, 24000, 28000, 32000, 36000, 45000];
  const comparisonData = comparisonRals.map((tierRal) => {
    const tInps = tierRal * 0.0919;
    const tTaxable = Math.max(0, tierRal - tInps);
    let tLorda = 0;
    if (tTaxable <= 28000) tLorda = tTaxable * 0.23;
    else if (tTaxable <= 50000) tLorda = 28000 * 0.23 + (tTaxable - 28000) * 0.35;
    else tLorda = 28000 * 0.23 + 22000 * 0.35 + (tTaxable - 50000) * 0.43;

    let tDetr = 0;
    if (tTaxable > 0 && tTaxable <= 15000) tDetr = 1955;
    else if (tTaxable > 15000 && tTaxable <= 28000) tDetr = 1910 + 1190 * ((28000 - tTaxable) / 13000);
    else if (tTaxable > 28000 && tTaxable <= 50000) tDetr = 1910 * ((50000 - tTaxable) / 22000);

    const tIrpefNetta = Math.max(0, tLorda - tDetr);
    const tAddiz = tTaxable * 0.025;
    const tNetAnnual = tierRal - (tInps + tIrpefNetta + tAddiz);
    const tNetMonthly13 = tNetAnnual / 13;
    const tNetBdt = tNetMonthly13 * exchangeRate;
    const tTaxRate = (( (tierRal - tNetAnnual) / tierRal ) * 100).toFixed(1);

    return {
      ral: tierRal,
      grossMonthly13: tierRal / 13,
      inpsMonthly: tInps / 13,
      taxMonthly: (tIrpefNetta + tAddiz) / 13,
      netMonthly: tNetMonthly13,
      netBdt: tNetBdt,
      effectiveRate: tTaxRate,
    };
  });

  return (
    <section id="tax-calculator" className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>ইতালি আয়কর ও বুস্তা পাগা ক্যালকুলেটর</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ইতালি ট্যাক্স ও নিট বেতন ক্যালকুলেটর (Calcolo Stipendio Netto)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            আপনার বাৎসরিক গ্রস বেতন (RAL) থেকে ইনপ্স (INPS), আইআরপিইএফ (IRPEF) আয়কর ও আঞ্চলিক কর কেটে প্রতি মাসে অ্যাকাউন্টে কত টাকা (Netto) জমা হবে তা নিচের বিস্তারিত টেবিলে সরাসরি দেখুন।
          </p>
        </div>

        {/* =========================================================================
            TOP INPUT CONTROLS CARD
           ========================================================================= */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-700 text-white shadow-md shadow-emerald-700/20">
                <Sliders className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  বেতন ও করের বিবরণ নির্বাচন করুন
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  সঠিক হিসাব পেতে আপনার চুক্তি, কিস্তি ও আবাসন অঞ্চল ঠিক করুন
                </p>
              </div>
            </div>

            {/* Quick Currency Rate Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <Coins className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">ইউরো এক্সচেঞ্জ রেট:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">১ € = {exchangeRate} ৳</span>
            </div>
          </div>

          {/* Main RAL Input & Slider */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor={ralInputId} className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>বার্ষিক মোট আয় / গ্রস বেতন (RAL - Retribuzione Annua Lorda):</span>
              </label>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                মাসিক গ্রস: €{grossMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })} / মাস ({mensilita} কিস্তি)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <span className="text-2xl font-black absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">€</span>
                <input
                  id={ralInputId}
                  type="number"
                  step="500"
                  min="5000"
                  max="120000"
                  value={ral}
                  onChange={(e) => setRal(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border-2 border-emerald-500/40 text-2xl font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
              </div>

              {/* Slider for quick visual tweaking */}
              <div className="hidden md:flex flex-col flex-1 gap-1">
                <input
                  type="range"
                  min="8000"
                  max="70000"
                  step="1000"
                  value={ral}
                  onChange={(e) => setRal(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>€৮,০০০</span>
                  <span>€২৫,০০০</span>
                  <span>€৪০,০০০</span>
                  <span>€৭০,০০০</span>
                </div>
              </div>
            </div>

            {/* Quick Preset RAL Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">সাধারণ RAL প্যাকেজ:</span>
              {presetRals.map((preset) => (
                <button
                  key={preset.ral}
                  type="button"
                  onClick={() => setRal(preset.ral)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    ral === preset.ral
                      ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/50'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Controls: Mensilità, Contract, Region, Dependents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Mensilita */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">
                বছরে বেতনের কিস্তি (Mensilità):
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[12, 13, 14].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMensilita(m as any)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      mensilita === m
                        ? 'bg-emerald-700 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {m} মাস {m === 13 ? '(13a)' : m === 14 ? '(14a)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Contract Type */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">
                চুক্তির ধরন (Tipo di Contratto):
              </label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
              >
                <option value="indeterminato">স্থায়ী চুক্তি (Indeterminato - ৯.১৯% INPS)</option>
                <option value="determinato">মেয়াদি চুক্তি (Determinato - ৯.১৯% INPS)</option>
                <option value="apprendistato">অ্যাপ্রেন্টিসশিপ (Apprendistato - ৫.৮৪% INPS)</option>
                <option value="colf">কোল্ফ ও বাদান্তে (Domestic Worker)</option>
              </select>
            </div>

            {/* Region of Residence */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">
                আবাসন অঞ্চল (Regione di Residenza):
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
              >
                {Object.entries(regionalRates).map(([regKey, val]) => (
                  <option key={regKey} value={regKey}>
                    {val.nameBn} ({(val.rate * 100).toFixed(2)}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Family & Dependents */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 block">
                নির্ভরশীল পরিবার (Carichi Famiglia):
              </label>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setChildrenCount(num)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      childrenCount === num
                        ? 'bg-emerald-700 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {num === 0 ? '০ সন্তান' : `${num} সন্তান`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SUMMARY HIGHLIGHT CARDS
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* 1. Net Monthly Euro */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white shadow-xl border border-emerald-500/40 relative overflow-hidden">
            <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block mb-1">
              মাসিক নিট বেতন (Netto Mensile)
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                €{netMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
              <span className="text-sm font-bold text-emerald-200">/ মাস</span>
            </div>
            <p className="text-xs text-emerald-200/90 mt-1">
              {mensilita} কিস্তিতে প্রতি মাসে বুস্তা পাগার ব্যাংক ট্রান্সফার
            </p>
          </div>

          {/* 2. Net Monthly BDT */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 text-white shadow-xl border border-teal-500/40">
            <span className="text-[11px] font-bold text-teal-200 uppercase tracking-wider block mb-1">
              টাকায় মাসিক আয় (BDT Equivalent)
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight">
                ৳ {netMonthlyBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-bold text-teal-200">টাকা</span>
            </div>
            <p className="text-xs text-teal-200/90 mt-1">
              বর্তমান এক্সচেঞ্জ রেট ({exchangeRate} ৳ / €) অনুযায়ী
            </p>
          </div>

          {/* 3. Net Annual Income */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              বাৎসরিক নিট আয় (Netto Annuo)
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                €{netAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/ বছর</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              মোট গ্রস আয়ের {netPercentage}% আপনার ঘরে থাকে
            </p>
          </div>

          {/* 4. Total Tax & INPS Deductions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              মোট কর ও কর্তন (Totale Trattenute)
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight">
                €{totalDeductionsAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs text-slate-400 font-semibold">({(100 - parseFloat(netPercentage)).toFixed(1)}%)</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              পেনশন (INPS) + IRPEF আয়কর + আঞ্চলিক কর
            </p>
          </div>
        </div>

        {/* Visual Progress Bar of Salary Distribution */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-700 dark:text-slate-300">বেতন বণ্টন অনুপাত (RAL Distribution):</span>
            <span className="text-slate-500">মোট বার্ষিক: €{grossAnnual.toLocaleString()}</span>
          </div>

          {/* Stacked Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800 shadow-inner">
            <div
              style={{ width: `${netPercentage}%` }}
              className="bg-emerald-600 transition-all duration-500"
              title={`নিট বেতন: ${netPercentage}%`}
            />
            <div
              style={{ width: `${inpsPercentage}%` }}
              className="bg-blue-600 transition-all duration-500"
              title={`INPS পেনশন: ${inpsPercentage}%`}
            />
            <div
              style={{ width: `${taxPercentage}%` }}
              className="bg-amber-500 transition-all duration-500"
              title={`IRPEF ও ট্যাক্স: ${taxPercentage}%`}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mt-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                নিট বেতন (Netto in tasca): <strong>{netPercentage}%</strong> (€{netAnnual.toFixed(0)})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                INPS পেনশন ও সুরক্ষা: <strong>{inpsPercentage}%</strong> (€{inpsAnnual.toFixed(0)})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                IRPEF ও আঞ্চলিক আয়কর: <strong>{taxPercentage}%</strong> (€{(irpefNettaAnnual + totalAddizionaliAnnual).toFixed(0)})
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TABLE 1: DETAILED SALARY & TAX BREAKDOWN TABLE
           ========================================================================= */}
        <div className="mb-14 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-700 text-white">
                <TableIcon className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  বুস্তা পাগা ও করের পূর্ণাঙ্গ বিস্তারিত টেবিল (Tabella Dettaglio Busta Paga)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  RAL €{grossAnnual.toLocaleString()} এবং {mensilita} কিস্তির জন্য সকল খাতের বিশ্লেষণ
                </p>
              </div>
            </div>

            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'কপি করা হয়েছে!' : 'হিসাব কপি করুন'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3.5 px-4 sm:px-6">খাত / বিবরণ (Voce di Paga)</th>
                  <th className="py-3.5 px-3">হার / সূত্র (Aliquota)</th>
                  <th className="py-3.5 px-3 text-right">বার্ষিক (€ Annuo)</th>
                  <th className="py-3.5 px-4 text-right">মাসিক (€ Mensile)</th>
                  <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">ব্যাখ্যা ও প্রয়োজনীয় তথ্য</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                {/* 1. Gross RAL */}
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 font-bold">
                  <td className="py-3.5 px-4 sm:px-6">
                    <span className="text-slate-900 dark:text-white font-extrabold">১. মোট গ্রস বেতন (RAL)</span>
                    <span className="block text-[11px] text-slate-400 font-normal">Retribuzione Annua Lorda</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono">১০০%</td>
                  <td className="py-3.5 px-3 text-right font-mono font-extrabold text-slate-900 dark:text-white">
                    €{grossAnnual.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-slate-900 dark:text-white">
                    €{grossMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    কোম্পানির সাথে চুক্তিকৃত মোট মূল বেতন
                  </td>
                </tr>

                {/* 2. INPS */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6">
                    <span className="text-blue-700 dark:text-blue-400 font-bold">২. INPS সামাজিক নিরাপত্তা ও পেনশন</span>
                    <span className="block text-[11px] text-slate-400 font-normal">Contributi Previdenziali a carico lavoratore</span>
                  </td>
                  <td className="py-3 px-3 text-blue-600 font-mono">{(inpsRate * 100).toFixed(2)}%</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-blue-700 dark:text-blue-400">
                    - €{inpsAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-blue-700 dark:text-blue-400">
                    - €{inpsMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    ভবিষ্যতের পেনশন, মাতৃত্ব/পিতৃত্ব ভাতা ও বেকারত্ব সুরক্ষার জন্য INPS এ জমা হয়
                  </td>
                </tr>

                {/* 3. Imponibile Fiscale */}
                <tr className="bg-slate-50/30 dark:bg-slate-900/30">
                  <td className="py-3 px-4 sm:px-6">
                    <span className="font-bold text-slate-700 dark:text-slate-300">৩. করযোগ্য আয় (Imponibile Fiscale)</span>
                    <span className="block text-[11px] text-slate-400 font-normal">RAL মাইনাস INPS কর্তন</span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono">বেস</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    €{imponibileFiscaleAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                    €{imponibileFiscaleMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    এই পরিমাণের উপর সরকার IRPEF আয়কর নির্ধারণ করে
                  </td>
                </tr>

                {/* 4. IRPEF Brackets Breakdown */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6">
                    <span className="text-amber-800 dark:text-amber-300 font-bold">৪. IRPEF গ্রস আয়কর (Imposta Lorda)</span>
                    <span className="block text-[11px] text-slate-400 font-normal">
                      ১ম ধাপ ২৩% (€{irpefTier1.toFixed(0)}) {irpefTier2 > 0 ? `+ ২য় ধাপ ৩৫% (€${irpefTier2.toFixed(0)})` : ''} {irpefTier3 > 0 ? `+ ৩য় ধাপ ৪৩% (€${irpefTier3.toFixed(0)})` : ''}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-amber-700 font-mono">২৩% / ৩৫% / ৪৩%</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-amber-700 dark:text-amber-300">
                    €{irpefLordaAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-amber-700 dark:text-amber-300">
                    €{irpefLordaMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    ছাড়ের পূর্বের জাতীয় আয়কর (Scaglioni IRPEF 2026)
                  </td>
                </tr>

                {/* 5. Detrazioni da Lavoro */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">৫. কর্মসংস্থান কর ছাড় (Detrazione Lavoro)</span>
                    <span className="block text-[11px] text-slate-400 font-normal">Art. 13 TUIR কর ছাড়ের সুবিধা</span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-mono">ছাড় (Rebate)</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    + €{detrazioniLavoro.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    + €{(detrazioniLavoro / mensilita).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    শ্রমিকদের আয়কর থেকে স্বয়ংক্রিয় সরকারি ছাড়
                  </td>
                </tr>

                {/* 6. Family Deductions if any */}
                {(detrazioneFigli > 0 || detrazioneConiuge > 0) && (
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 sm:px-6">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">৬. পরিবার ও সন্তান কর ছাড়</span>
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {childrenCount} জন সন্তান {hasSpouse ? '+ নির্ভরশীল স্ত্রী' : ''}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-emerald-600 font-mono">বোনাস ছাড়</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      + €{(detrazioneFigli + detrazioneConiuge).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      + €{((detrazioneFigli + detrazioneConiuge) / mensilita).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                      পরিবারের নির্ভরশীল সদস্যদের জন্য অতিরিক্ত কর ছাড়
                    </td>
                  </tr>
                )}

                {/* 7. IRPEF Netta */}
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 font-semibold">
                  <td className="py-3 px-4 sm:px-6">
                    <span className="text-rose-700 dark:text-rose-400 font-bold">৭. নিট IRPEF কর (IRPEF Netta)</span>
                    <span className="block text-[11px] text-slate-400 font-normal">মোট আয়কর মাইনাস ছাড়</span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono">প্রদেয় কর</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-rose-700 dark:text-rose-400">
                    - €{irpefNettaAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-700 dark:text-rose-400">
                    - €{irpefNettaMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    ছাড় সমন্বয় শেষে মূল সরকারি আয়কর
                  </td>
                </tr>

                {/* 8. Addizionale Regionale & Comunale */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">৮. আঞ্চলিক ও পৌর সারট্যাক্স</span>
                    <span className="block text-[11px] text-slate-400 font-normal">
                      {regionalRates[region]?.nameBn} ({((regRate + comRate) * 100).toFixed(2)}%)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono">{((regRate + comRate) * 100).toFixed(2)}%</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    - €{totalAddizionaliAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                    - €{totalAddizionaliMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell">
                    স্থানীয় মিউনিসিপ্যালিটি ও প্রদেশের রাস্তাঘাট ও হাসপাতালের উন্নয়নে নেওয়া কর
                  </td>
                </tr>

                {/* 9. Final Net Monthly in Busta Paga (HIGHLIGHT ROW) */}
                <tr className="bg-emerald-100/70 dark:bg-emerald-950/60 font-black text-emerald-950 dark:text-emerald-100 text-sm sm:text-base border-t-2 border-emerald-500">
                  <td className="py-4 px-4 sm:px-6">
                    <span className="flex items-center gap-1.5 text-emerald-900 dark:text-white">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>মাসিক নিট বেতন (Netto in Busta Paga)</span>
                    </span>
                    <span className="block text-xs font-normal text-emerald-700 dark:text-emerald-300">
                      ব্যাংক অ্যাকাউন্টে প্রাপ্ত অর্থ ({mensilita} কিস্তি)
                    </span>
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    {netPercentage}%
                  </td>
                  <td className="py-4 px-3 text-right font-mono font-black text-emerald-900 dark:text-emerald-200">
                    €{netAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-black text-xl text-emerald-800 dark:text-amber-300">
                    €{netMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-xs font-bold text-emerald-800 dark:text-emerald-200 hidden md:table-cell">
                    প্রতি মাসের বেতন বাবদ আসল টেক-হোম পে
                  </td>
                </tr>

                {/* 10. BDT Equivalent ROW */}
                <tr className="bg-teal-50 dark:bg-teal-950/50 font-extrabold text-teal-950 dark:text-teal-200 text-sm sm:text-base">
                  <td className="py-4 px-4 sm:px-6">
                    <span className="flex items-center gap-1.5 text-teal-900 dark:text-teal-100">
                      <span>🇧🇩 বাংলাদেশি টাকায় সমপরিমাণ নিট আয়</span>
                    </span>
                    <span className="block text-xs font-normal text-teal-700 dark:text-teal-300">
                      রেট: ১ € = {exchangeRate} BDT
                    </span>
                  </td>
                  <td className="py-4 px-3 font-mono text-teal-600">টাকা</td>
                  <td className="py-4 px-3 text-right font-mono font-extrabold text-teal-900 dark:text-teal-200">
                    ৳ {netAnnualBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-black text-lg text-emerald-700 dark:text-amber-300">
                    ৳ {netMonthlyBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-xs font-semibold text-teal-800 dark:text-teal-300 hidden md:table-cell">
                    প্রতি মাসের টাকায় সমপরিমাণ মূল্যমান
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            TABLE 2: COMMON ITALIAN RAL TIERS COMPARISON CHART
           ========================================================================= */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                  ইতালি বিভিন্ন পেশার সাধারণ RAL ও নিট বেতনের তুলনামূলক চার্ট
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                যেকোনো সারিতে ক্লিক করে উপরের ক্যালকুলেটরে সরাসরি লোড করতে পারবেন (১৩ কিস্তির ভিত্তিতে)
              </p>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              ১৩ কিস্তি স্ট্যান্ডার্ড
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4">বার্ষিক RAL</th>
                  <th className="py-3 px-3 text-right">মাসিক গ্রস (€)</th>
                  <th className="py-3 px-3 text-right">INPS পেনশন</th>
                  <th className="py-3 px-3 text-right">IRPEF কর</th>
                  <th className="py-3 px-4 text-right">মাসিক নিট (€)</th>
                  <th className="py-3 px-4 text-right">মাসিক নিট (টাকা ৳)</th>
                  <th className="py-3 px-3 text-center">কার্যকর কর (%)</th>
                  <th className="py-3 px-3 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {comparisonData.map((row) => {
                  const isSelected = ral === row.ral;
                  return (
                    <tr
                      key={row.ral}
                      onClick={() => setRal(row.ral)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 font-bold'
                          : 'hover:bg-white dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        €{row.ral.toLocaleString()}
                        {isSelected && (
                          <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                            নির্বাচিত
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-600 dark:text-slate-300">
                        €{row.grossMonthly13.toFixed(0)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-blue-600 dark:text-blue-400">
                        -€{row.inpsMonthly.toFixed(0)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-amber-600 dark:text-amber-400">
                        -€{row.taxMonthly.toFixed(0)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-black text-emerald-700 dark:text-emerald-300">
                        €{row.netMonthly.toFixed(0)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-teal-800 dark:text-teal-300">
                        ৳ {row.netBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-xs text-slate-500">
                        {row.effectiveRate}%
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          className="px-2 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/60 dark:hover:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold"
                        >
                          বাছাই
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>টিপস:</strong> ইতালিতে চাকরির ইন্টারভিউ বা কন্ট্রাক্ট করার সময় সর্বদা বার্ষিক গ্রস (RAL) নিশ্চিত করুন। সাধারণত কর্মীরা ১৩টি বা ১৪টি কিস্তিতে প্রতি মাসে এই নিট বেতন পেয়ে থাকেন।
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
