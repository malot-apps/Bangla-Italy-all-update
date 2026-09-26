'use client';

import React, { useState, useId } from 'react';
import {
  TrendingUp,
  ArrowRightLeft,
  Info,
  Building,
  Smartphone,
  Wallet,
  Calculator,
  Gift,
  CheckCircle2,
  RefreshCw,
  Coins,
  FileSpreadsheet,
  Receipt,
  UserCheck,
  PieChart,
  Percent,
} from 'lucide-react';
import { useAdminConfig } from '@/lib/AdminConfigContext';

export default function CurrencyConverter() {
  const euroInputId = useId();
  const rateInputId = useId();
  const grossRalId = useId();
  const colfHourlyId = useId();

  // Active Tool Mode
  const [activeCalculatorTab, setActiveCalculatorTab] = useState<'currency' | 'tax' | 'colf'>('currency');

  // =========================================================================
  // 1. CURRENCY CONVERTER STATE
  // =========================================================================
  const { config } = useAdminConfig();
  const [euroAmount, setEuroAmount] = useState<string>('500');
  const [customRate, setCustomRate] = useState<number | null>(null);
  const [customRateActive, setCustomRateActive] = useState<boolean>(false);

  const exchangeRate =
    customRateActive && customRate !== null
      ? customRate
      : config?.liveRate?.eurToBdt || 133.25;

  // Living Cost / Budget state
  const [monthlySalary, setMonthlySalary] = useState<number>(1500);
  const [rentCost, setRentCost] = useState<number>(350);
  const [foodCost, setFoodCost] = useState<number>(200);
  const [transportCost, setTransportCost] = useState<number>(60);
  const [otherCost, setOtherCost] = useState<number>(90);

  const bonusMultiplier = (config?.liveRate?.incentivePercent || 2.5) / 100;
  const parsedEuro = parseFloat(euroAmount) || 0;
  const standardBdt = parsedEuro * exchangeRate;
  const govIncentive = standardBdt * bonusMultiplier; // Bangladesh Govt Remittance Bonus
  const totalBdtWithIncentive = standardBdt + govIncentive;

  const totalExpenses = rentCost + foodCost + transportCost + otherCost;
  const netSavingsEuro = Math.max(0, monthlySalary - totalExpenses);
  const netSavingsBdt = netSavingsEuro * exchangeRate * 1.025;

  const quickEuroAmounts = [50, 100, 300, 500, 1000, 1500, 2000];

  // =========================================================================
  // 2. ITALIAN INCOME TAX & NET SALARY CALCULATOR (STIPENDIO NETTO / IRPEF)
  // =========================================================================
  const [inputMode, setInputMode] = useState<'annual' | 'monthly'>('annual');
  const [grossRalInput, setGrossRalInput] = useState<string>('24000');
  const [grossMonthlyInput, setGrossMonthlyInput] = useState<string>('1800');
  const [mensilita, setMensilita] = useState<12 | 13 | 14>(13);
  const [contractType, setContractType] = useState<'indeterminato' | 'determinato' | 'apprendistato'>('indeterminato');
  const [region, setRegion] = useState<string>('Lazio');
  const [childrenCount, setChildrenCount] = useState<number>(0);

  // Client-side tax computation
  const calcGrossAnnual =
    inputMode === 'annual'
      ? parseFloat(grossRalInput) || 0
      : (parseFloat(grossMonthlyInput) || 0) * mensilita;

  // INPS Employee social contribution: ~9.19%
  const inpsRate = contractType === 'apprendistato' ? 0.0584 : 0.0919;
  const inpsContribution = calcGrossAnnual * inpsRate;
  const imponibileIrpef = Math.max(0, calcGrossAnnual - inpsContribution);

  // Official Italian 3-Tier IRPEF brackets
  let irpefLorda = 0;
  if (imponibileIrpef <= 28000) {
    irpefLorda = imponibileIrpef * 0.23;
  } else if (imponibileIrpef <= 50000) {
    irpefLorda = 28000 * 0.23 + (imponibileIrpef - 28000) * 0.35;
  } else {
    irpefLorda = 28000 * 0.23 + 22000 * 0.35 + (imponibileIrpef - 50000) * 0.43;
  }

  // Detrazioni da lavoro dipendente (Employment tax rebate)
  let detrazioniLavoro = 0;
  if (imponibileIrpef > 0 && imponibileIrpef <= 15000) {
    detrazioniLavoro = 1955;
  } else if (imponibileIrpef > 15000 && imponibileIrpef <= 28000) {
    detrazioniLavoro = 1910 + 1190 * ((28000 - imponibileIrpef) / 13000);
  } else if (imponibileIrpef > 28000 && imponibileIrpef <= 50000) {
    detrazioniLavoro = 1910 * ((50000 - imponibileIrpef) / 22000);
  }

  // Children tax deduction
  const detrazioniFigli = childrenCount * 950;
  const totalDetrazioni = Math.min(irpefLorda, detrazioniLavoro + detrazioniFigli);
  const irpefNetta = Math.max(0, irpefLorda - totalDetrazioni);

  // Addizionale Regionale & Comunale (approx 1.8% to 2.4%)
  const regionalTaxRate = region === 'Lazio' || region === 'Campania' ? 0.024 : 0.018;
  const addizionali = imponibileIrpef * regionalTaxRate;

  // Final Net Annual & Monthly
  const totalDeductionsAnnual = inpsContribution + irpefNetta + addizionali;
  const netAnnual = Math.max(0, calcGrossAnnual - totalDeductionsAnnual);
  const netMonthlySalary = mensilita > 0 ? netAnnual / mensilita : 0;
  const netMonthlySalaryBdt = netMonthlySalary * exchangeRate;
  const effectiveTaxRate = calcGrossAnnual > 0 ? ((totalDeductionsAnnual / calcGrossAnnual) * 100).toFixed(1) : '0';

  // =========================================================================
  // 3. COLF & BADANTE HOURLY & MONTHLY CALCULATOR
  // =========================================================================
  const [colfHourlyRate, setColfHourlyRate] = useState<number>(8.5);
  const [colfWeeklyHours, setColfWeeklyHours] = useState<number>(30);
  const [colfLiveIn, setColfLiveIn] = useState<boolean>(false);

  const colfMonthlyGross = colfLiveIn ? 1150 : colfHourlyRate * colfWeeklyHours * 4.33;
  const colfInpsEstimate = colfMonthlyGross * 0.085; // Worker portion of INPS
  const colfNetMonthly = colfMonthlyGross - colfInpsEstimate;
  const colfNetBdt = colfNetMonthly * exchangeRate;

  const remittanceProviders = [
    {
      name: 'Ria Money Transfer',
      tag: 'ইতালিতে সর্বাধিক জনপ্রিয়',
      type: 'ক্যাশ পিকআপ / ব্যাংক / বিকাশ',
      fee: '€১.৫০ - €২.৫০',
      speed: 'তাৎক্ষণিক (Instant)',
      rateMultiplier: 1.0,
      badge: 'জনপ্রিয়',
    },
    {
      name: 'Western Union (পোস্ট অফিস ও এজেন্ট)',
      tag: 'সকল শহরে সহজলভ্য',
      type: 'ক্যাশ পিকআপ / ব্যাংক',
      fee: '€২.০০ - €৩.০০',
      speed: 'মিনিটের মধ্যে',
      rateMultiplier: 0.998,
      badge: 'বিশ্বস্ত',
    },
    {
      name: 'bKash / Nagad সরাসরি ওয়ালেট রেমিট্যান্স',
      tag: 'সরাসরি মোবাইল একাউন্টে',
      type: 'বিকাশ ও নগদ ওয়ালেট',
      fee: 'ফ্রি / স্পেশাল অফার',
      speed: '১০ সেকেন্ড',
      rateMultiplier: 1.002,
      badge: 'দ্রুততম',
    },
    {
      name: 'সোনালী / ব্র্যাক / ইসলামী ব্যাংক',
      tag: 'সরাসরি একাউন্টে জমা',
      type: 'BEFTN / RTGS ব্যাংক ট্রানস্ফার',
      fee: 'ন্যূনতম ফি',
      speed: '১-২ কর্মদিবস',
      rateMultiplier: 1.001,
      badge: 'অফিশিয়াল',
    },
  ];

  return (
    <section id="currency" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>ইতালি কারেন্সি ও ক্লায়েন্ট-সাইড ট্যাক্স হিসাব</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ইউরো কারেন্সি ও ইতালি ট্যাক্স ক্যালকুলেটর
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            রেমিট্যান্স রূপান্তর ছাড়াও বুস্তা পাগাতে (Busta Paga) আপনার গ্রস বেতন (RAL) থেকে কত ট্যাক্স (IRPEF ও INPS) কেটে নিট বেতন কত হবে তা সরাসরি হিসাব করুন।
          </p>

          {/* Calculator Tabs Header */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800 max-w-xl mx-auto">
            <button
              onClick={() => setActiveCalculatorTab('currency')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                activeCalculatorTab === 'currency'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>ইউরো রেমিট্যান্স ক্যালকুলেটর</span>
            </button>
            <button
              onClick={() => setActiveCalculatorTab('tax')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                activeCalculatorTab === 'tax'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>ইতালি ট্যাক্স ও নিট বেতন (Busta Paga)</span>
            </button>
            <button
              onClick={() => setActiveCalculatorTab('colf')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                activeCalculatorTab === 'colf'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>কোল্ফ ও বাদান্তে</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: CURRENCY & REMITTANCE CALCULATOR
           ========================================================================= */}
        {activeCalculatorTab === 'currency' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in">
            {/* Main Interactive Converter Box (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">
              {/* Header & Mode Switch */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-600/30">
                    €
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      ইউরো কারেন্সি এক্সচেঞ্জ
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      বর্তমান আদর্শ রেট: ১ € = {exchangeRate.toFixed(2)} ৳
                    </p>
                  </div>
                </div>

                {/* Rate Adjustment Button */}
                <button
                  onClick={() => setCustomRateActive(!customRateActive)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{customRateActive ? 'রেট লক করুন' : 'রেট পরিবর্তন করুন'}</span>
                </button>
              </div>

              {/* Custom Rate Input Drawer (Conditional) */}
              {customRateActive && (
                <div className="my-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 animate-in fade-in">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor={rateInputId} className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200">
                      ১ ইউরোর কাস্টম রেট লিখুন (BDT):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={rateInputId}
                        type="number"
                        step="0.1"
                        value={exchangeRate}
                        onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
                        className="w-24 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-400 dark:border-amber-700 text-sm font-bold text-slate-900 dark:text-white text-right focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-300">৳ / €</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Amount Inputs */}
              <div className="mt-6 space-y-4">
                {/* Euro Input Field */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor={euroInputId} className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      ইউরো পরিমাণ (EUR)
                    </label>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span>ইতালি থেকে পাঠানো</span> 🇮🇹
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-slate-400">€</span>
                    <input
                      id={euroInputId}
                      type="number"
                      value={euroAmount}
                      onChange={(e) => setEuroAmount(e.target.value)}
                      placeholder="0"
                      className="w-full text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white bg-transparent focus:outline-none placeholder:text-slate-300"
                    />
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                      EUR
                    </span>
                  </div>
                </div>

                {/* Quick Amount Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-slate-400 shrink-0 font-medium">দ্রুত নির্বাচন:</span>
                  {quickEuroAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setEuroAmount(amt.toString())}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                        parsedEuro === amt
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      €{amt}
                    </button>
                  ))}
                </div>

                {/* Converted BDT Result Box */}
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white shadow-lg border border-emerald-500/40 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-amber-400" />
                      দেশে পৌঁছাবে (মূল টাকা + ২.৫% বোনাস)
                    </span>
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      🇧🇩 বাংলাদেশ
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 my-2">
                    <span className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                      {totalBdtWithIncentive.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-200">টাকা (BDT)</span>
                  </div>

                  {/* Breakdown Calculation */}
                  <div className="mt-4 pt-3 border-t border-emerald-700/60 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-emerald-300/80 block">আসল বিনিময় মূল্য:</span>
                      <span className="font-bold text-white text-sm">
                        ৳ {standardBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-300/80 block">সরকারি ২.৫% প্রণোদনা বোনাস:</span>
                      <span className="font-bold text-amber-300 text-sm">
                        + ৳ {govIncentive.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note about official remittance */}
              <div className="mt-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  <strong>বৈধ পথে রেমিট্যান্স পাঠান:</strong> হুন্ডি পরিহার করে দেশের অর্থনীতি সমৃদ্ধ করুন।
                </span>
              </div>
            </div>

            {/* Right Column: Remittance Providers & Living Cost Estimator (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Remittance Providers in Italy */}
              <div className="bg-white dark:bg-slate-950 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                  <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ইতালির জনপ্রিয় রেমিট্যান্স চ্যানেল
                </h3>

                <div className="space-y-3">
                  {remittanceProviders.map((prov, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {prov.name}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                            {prov.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {prov.type} • গতি: {prov.speed}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          ফি: {prov.fee}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Italy Monthly Living & Savings Estimator */}
              <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-800/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-600 text-white">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">মাসিক আয় ও সঞ্চয় হিসাব</h3>
                      <p className="text-[11px] text-emerald-300">ইতালির গড় জীবনযাত্রার খরচের ভিত্তিতে</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>মাসিক আয় (Busta Paga নিট বেতন):</span>
                      <span className="font-bold text-emerald-300">€{monthlySalary}</span>
                    </div>
                    <input
                      type="range"
                      min="800"
                      max="3000"
                      step="50"
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(parseInt(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-800/60">
                    <div className="bg-slate-800/60 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">বাসা ভাড়া (Bed/Room):</span>
                      <span className="font-bold text-white">€{rentCost}</span>
                    </div>
                    <div className="bg-slate-800/60 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">খাবার খরচ (Spesa):</span>
                      <span className="font-bold text-white">€{foodCost}</span>
                    </div>
                    <div className="bg-slate-800/60 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">ট্রান্সপোর্ট ও সিম কার্ড:</span>
                      <span className="font-bold text-white">€{transportCost}</span>
                    </div>
                    <div className="bg-slate-800/60 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">অন্যান্য বিবিধ খরচ:</span>
                      <span className="font-bold text-white">€{otherCost}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-2xl bg-emerald-800/80 border border-emerald-400/40 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-emerald-200 block font-medium">সম্ভাব্য মাসিক নিট সঞ্চয়:</span>
                      <span className="text-xl font-black text-amber-300">€{netSavingsEuro} ইউরো</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-200 block">দেশে পাঠানোর মান (BDT):</span>
                      <span className="text-sm font-extrabold text-white">
                        ≈ ৳ {netSavingsBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: ITALIAN INCOME TAX & NET SALARY CALCULATOR (BUSTA PAGA / IRPEF)
           ========================================================================= */}
        {activeCalculatorTab === 'tax' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in">
            {/* Tax Inputs (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-600 text-white">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                      ইতালি আয়কর ও বেতন তথ্য লিখুন
                    </h3>
                    <p className="text-xs text-slate-400">IRPEF 2026 ও INPS কন্ট্রিবিউশন হিসাব</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
                  <button
                    onClick={() => setInputMode('annual')}
                    className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all ${
                      inputMode === 'annual'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    বার্ষিক RAL
                  </button>
                  <button
                    onClick={() => setInputMode('monthly')}
                    className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all ${
                      inputMode === 'monthly'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    মাসিক গ্রস
                  </button>
                </div>
              </div>

              {/* Gross Income Input */}
              {inputMode === 'annual' ? (
                <div>
                  <label htmlFor={grossRalId} className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 block uppercase tracking-wider">
                    বার্ষিক মোট বেতন (RAL - Retribuzione Annua Lorda):
                  </label>
                  <div className="relative">
                    <span className="text-xl font-bold absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">€</span>
                    <input
                      id={grossRalId}
                      type="number"
                      step="500"
                      value={grossRalInput}
                      onChange={(e) => setGrossRalInput(e.target.value)}
                      placeholder="24000"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xl font-extrabold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  {/* Preset RAL chips */}
                  <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
                    <span className="text-[11px] text-slate-400 shrink-0">কমন RAL:</span>
                    {['18000', '22000', '26000', '30000', '35000'].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setGrossRalInput(amt)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg font-bold cursor-pointer shrink-0 ${
                          grossRalInput === amt
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        €{parseInt(amt).toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 block uppercase tracking-wider">
                    মাসিক মোট বেতন (Stipendio Lordo Mensile):
                  </label>
                  <div className="relative">
                    <span className="text-xl font-bold absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">€</span>
                    <input
                      type="number"
                      step="50"
                      value={grossMonthlyInput}
                      onChange={(e) => setGrossMonthlyInput(e.target.value)}
                      placeholder="1800"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xl font-extrabold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Mensilita & Contract Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 block">
                    বেতনের কিস্তি (Mensilità):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[12, 13, 14].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMensilita(m as any)}
                        className={`py-2 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                          mensilita === m
                            ? 'bg-emerald-700 text-white border-emerald-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {m} মাস {m === 13 ? '(13a)' : m === 14 ? '(14a)' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 block">
                    চুক্তির ধরন:
                  </label>
                  <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="indeterminato">স্থায়ী (Tempo Indeterminato)</option>
                    <option value="determinato">মেয়াদি (Tempo Determinato)</option>
                    <option value="apprendistato">অ্যাপ্রেন্টিসশিপ (Apprendistato)</option>
                  </select>
                </div>
              </div>

              {/* Region & Dependents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 block">
                    অঞ্চল (Regione di Residenza):
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Lazio">লাসিও (রোম / Roma)</option>
                    <option value="Lombardia">লমবার্দিয়া (মিলান / Milano)</option>
                    <option value="Veneto">ভেনেতো (ভেনিস / মেস্ত্রে)</option>
                    <option value="Emilia-Romagna">এমিলিয়া-রোমানিয়া (বলোনিয়া)</option>
                    <option value="Campania">কাম্পানিয়া (নাপোলি / Napoli)</option>
                    <option value="Toscana">তোসকানা (ফ্লোরেন্স / Firenze)</option>
                    <option value="Piemonte">পিয়েমন্তে (তুরিন / Torino)</option>
                    <option value="Sicilia">সিসিলি (পালেরমো / Palermo)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 block">
                    নির্ভরশীল সন্তান (Figli a carico):
                  </label>
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setChildrenCount(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold cursor-pointer border ${
                          childrenCount === num
                            ? 'bg-emerald-700 text-white border-emerald-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {num === 0 ? 'নেই' : `${num} জন`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Calculation Results (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              {/* Highlight Result Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white shadow-2xl border border-emerald-500/40">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                  ব্যাংক অ্যাকাউন্টে প্রাপ্ত নিট বেতন (Netto in Busta Paga):
                </span>

                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-3xl sm:text-5xl font-black text-amber-300 tracking-tight">
                    €{netMonthlySalary.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-200">/ প্রতি মাস ({mensilita} কিস্তি)</span>
                </div>

                {/* BDT conversion equivalent */}
                <div className="p-3 rounded-2xl bg-emerald-800/80 border border-emerald-400/40 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-200 block">বাংলাদেশি টাকায় সমপরিমাণ:</span>
                    <span className="text-lg font-extrabold text-white">
                      ≈ ৳ {netMonthlySalaryBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })} টাকা / মাস
                    </span>
                  </div>
                  <span className="text-xs font-mono text-amber-300 font-bold">
                    রেট: ১€ = {exchangeRate}৳
                  </span>
                </div>

                {/* Annual Summary */}
                <div className="mt-4 pt-4 border-t border-emerald-700/60 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-emerald-300/80 block">বার্ষিক নিট আয় (Netto Annuo):</span>
                    <span className="font-extrabold text-white text-base">
                      €{netAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-300/80 block">কার্যকর ট্যাক্স হার (Aliquota):</span>
                    <span className="font-extrabold text-amber-300 text-base">
                      ~ {effectiveTaxRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-emerald-600" />
                  <span>বার্ষিক কর্তন ও করের বিস্তারিত বিবরণ (Dettaglio Tasse):</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">বার্ষিক গ্রস বেতন (RAL):</span>
                    <span className="font-bold text-slate-900 dark:text-white">€{calcGrossAnnual.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                    <span className="text-blue-900 dark:text-blue-300">
                      - INPS পেনশন ও সামাজিক সুরক্ষা ({(inpsRate * 100).toFixed(2)}%):
                    </span>
                    <span className="font-bold text-blue-700 dark:text-blue-300">
                      - €{inpsContribution.toFixed(0)}
                    </span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
                    <span className="text-amber-900 dark:text-amber-300">
                      - নিট IRPEF কর (ছাড় বাদ দিয়ে):
                    </span>
                    <span className="font-bold text-amber-700 dark:text-amber-300">
                      - €{irpefNetta.toFixed(0)}
                    </span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">
                      - আঞ্চলিক ও পৌর ট্যাক্স ({region}):
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      - €{addizionali.toFixed(0)}
                    </span>
                  </div>

                  <div className="flex justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-bold">
                    <span className="text-emerald-900 dark:text-emerald-300">
                      = মোট বার্ষিক নিট বেতন (Netto):
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-sm">
                      €{netAnnual.toFixed(0)}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic pt-2">
                  * নোট: এই হিসাবটি ইতালির আদর্শ শ্রম আইন (CCNL) ও ২০২৫/২০২৬ IRPEF স্ক্যাজলিওনি অনুযায়ী প্রাক্কলিত। সুনির্দিষ্ট বুস্তা পাগার জন্য আপনার কাফ (CAF) অফিসের পরামর্শ নিন।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: COLF & BADANTE DOMESTIC WORKER CALCULATOR
           ========================================================================= */}
        {activeCalculatorTab === 'colf' && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-2xl bg-purple-600 text-white">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  কোল্ফ ও বাদান্তে ঘন্টা ও মাসিক বেতন হিসাব (CCNL Lavoro Domestico)
                </h3>
                <p className="text-xs text-slate-500">গৃহকর্মী ও বয়স্ক সেবায় নিয়োজিত কর্মীদের অফিশিয়াল বেতন ও ইনপস হিসাব</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Colf Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                    কাজের ধরন:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setColfLiveIn(false)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer ${
                        !colfLiveIn
                          ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600'
                      }`}
                    >
                      ঘণ্টাভিত্তিক (Non Convivente)
                    </button>
                    <button
                      type="button"
                      onClick={() => setColfLiveIn(true)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer ${
                        colfLiveIn
                          ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600'
                      }`}
                    >
                      থাকা-খাওয়া সহ (Convivente)
                    </button>
                  </div>
                </div>

                {!colfLiveIn ? (
                  <>
                    <div>
                      <label htmlFor={colfHourlyId} className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                        প্রতি ঘণ্টার রেট (€ / ora):
                      </label>
                      <input
                        id={colfHourlyId}
                        type="number"
                        step="0.5"
                        value={colfHourlyRate}
                        onChange={(e) => setColfHourlyRate(parseFloat(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                        সপ্তাহে কাজের ঘণ্টা: {colfWeeklyHours} ঘণ্টা
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="54"
                        value={colfWeeklyHours}
                        onChange={(e) => setColfWeeklyHours(parseInt(e.target.value))}
                        className="w-full accent-purple-600"
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200">
                    <p className="font-bold mb-1">কনভিভেন্তে (Convivente) স্ট্যান্ডার্ড:</p>
                    <p>সপ্তাহে সর্বোচ্চ ৫৪ ঘণ্টা কাজের সুযোগ। থাকা-খাওয়া ফ্রি এবং রবিবার ও সাপ্তাহিক ছুটির দিন সম্পূর্ণ সংরক্ষিত।</p>
                  </div>
                )}
              </div>

              {/* Colf Results */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-slate-900 text-white border border-purple-500/40 space-y-4">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
                  মাসিক প্রাক্কলিত আয়:
                </span>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-amber-300 tracking-tight">
                    €{colfNetMonthly.toFixed(0)}
                  </span>
                  <span className="text-lg font-bold text-purple-200">ইউরো / মাস</span>
                </div>

                <div className="p-3 rounded-2xl bg-purple-900/60 border border-purple-400/30 text-xs">
                  <span className="text-purple-200 block text-[11px]">টাকায় রূপান্তর:</span>
                  <span className="font-extrabold text-white text-base">
                    ≈ ৳ {colfNetBdt.toLocaleString('bn-BD', { maximumFractionDigits: 0 })} টাকা
                  </span>
                </div>

                <div className="pt-2 border-t border-purple-800 text-xs space-y-1.5 text-purple-200/90">
                  <div className="flex justify-between">
                    <span>গ্রস আয় (Lordo):</span>
                    <span className="font-bold text-white">€{colfMonthlyGross.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>কর্মী অংশ INPS কন্ট্রিবিউশন:</span>
                    <span className="font-bold text-amber-300">- €{colfInpsEstimate.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>বাৎসরিক ১৩তম মাসের বোনাস (13a):</span>
                    <span className="font-bold text-white">প্রযোজ্য</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
