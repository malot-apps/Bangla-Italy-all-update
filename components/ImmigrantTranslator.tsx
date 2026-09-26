'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Languages,
  Mic,
  MicOff,
  Volume2,
  Copy,
  Check,
  ArrowRightLeft,
  Sparkles,
  Search,
  ShoppingCart,
  HeartPulse,
  Bus,
  Briefcase,
  X,
  Maximize2,
  Printer,
  UploadCloud,
  FileText,
  ScanLine,
  Star,
  AlertTriangle,
  ChevronRight,
  Globe,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import GoogleTranslateWidget from './GoogleTranslateWidget';
import { useLanguage } from '@/lib/LanguageContext';

export interface PhraseItem {
  id: string;
  category: 'supermarket' | 'hospital' | 'transport' | 'workplace' | 'emergency_legal';
  italian: string;
  phonetic: string;
  bangla: string;
  english: string;
  usageContext: string;
}

const CATEGORIZED_PHRASES: PhraseItem[] = [
  // 1. Supermarket & Shopping (🛒 সুপারমার্কেট)
  {
    id: 'sm-1',
    category: 'supermarket',
    italian: 'Quanto costa questo?',
    phonetic: 'কোয়ান্তো কোস্তা কুয়েস্তো?',
    bangla: 'এটার দাম কত?',
    english: 'How much does this cost?',
    usageContext: 'মূল্য জানতে ক্যাশিয়ার বা সেলসম্যানকে জিজ্ঞাসা করুন',
  },
  {
    id: 'sm-2',
    category: 'supermarket',
    italian: 'Posso pagare con la carta o bancomat?',
    phonetic: 'পোস্‌সো পাগারে কন লা কার্তা ও বাঙ্কোমাত?',
    bangla: 'আমি কি কার্ড দিয়ে বিল দিতে পারি?',
    english: 'Can I pay by card or debit card?',
    usageContext: 'বিল কাউন্টারে ক্যাশ না থাকলে কার্ড দিয়ে পে করার সময়',
  },
  {
    id: 'sm-3',
    category: 'supermarket',
    italian: 'Vorrei una busta della spesa, per favore.',
    phonetic: 'ভোররেই উনা বুস্তা দেল্লা স্পেজা, পের ফাভোরে।',
    bangla: 'দয়া করে আমাকে একটি শপিং ব্যাগ দেবেন।',
    english: 'I would like a shopping bag, please.',
    usageContext: 'মালামাল নেওয়ার জন্য ব্যাগ চাইলে',
  },
  {
    id: 'sm-4',
    category: 'supermarket',
    italian: 'Questo prodotto è halal / senza carne di maiale?',
    phonetic: 'কুয়েস্তো প্রোদোত্তো এ হালাল / সেন্ৎসা কার্নে দি মাইয়ালে?',
    bangla: 'এই পণ্যটি কি হালাল / শূকরের মাংস মুক্ত?',
    english: 'Is this product halal / free of pork?',
    usageContext: 'হালাল বা হালাল খাদ্য নিশ্চয়তার জন্য',
  },
  {
    id: 'sm-5',
    category: 'supermarket',
    italian: "Dov'è il riso / l'olio / il latte?",
    phonetic: 'দোভেই ইল রিজো / লোলিও / ইল লাত্তে?',
    bangla: 'চাল / রান্নার তেল / দুধ কোথায় পাব?',
    english: 'Where can I find rice / cooking oil / milk?',
    usageContext: 'সুপারমার্কেটের সেলফে জিনিসপত্র খুঁজতে',
  },
  {
    id: 'sm-6',
    category: 'supermarket',
    italian: 'Mi può dare lo scontrino, per favore?',
    phonetic: 'মি পুও দারে লো স্কোন্ত্রিনো, পের ফাভোরে?',
    bangla: 'দয়া করে আমাকে ক্যাশ মেমো / রশিদটি দিন।',
    english: 'Could you give me the receipt, please?',
    usageContext: 'পেমেন্টের পর বিক্রয় রসিদ সংগ্রহ করতে',
  },
  {
    id: 'sm-7',
    category: 'supermarket',
    italian: "C'è uno sconto o offerta su questo articolo?",
    phonetic: 'চে উনো স্কোন্তো ও অফফের্তা সু কুয়েস্তো আর্তিকলো?',
    bangla: 'এই পণ্যে কি কোনো বিশেষ ছাড় বা অফার আছে?',
    english: 'Is there a discount or special offer on this item?',
    usageContext: 'ডিসকাউন্ট বা অফার যাচাই করতে',
  },
  {
    id: 'sm-8',
    category: 'supermarket',
    italian: "Dov'è la cassa?",
    phonetic: 'দোভেই লা কাস্সা?',
    bangla: 'বিল দেওয়ার ক্যাশ কাউন্টারটি কোথায়?',
    english: 'Where is the checkout counter / cashier?',
    usageContext: 'বিল কাউন্টার খুঁজে না পেলে',
  },

  // 2. Hospital & Medical (🏥 হাসপাতাল ও ডাক্তার)
  {
    id: 'hp-1',
    category: 'hospital',
    italian: 'Ho bisogno urgente di un medico.',
    phonetic: 'ও বিজোনিয়ো উরজেন্তে দি উন মেদিকো।',
    bangla: 'আমার জরুরি একজন ডাক্তার প্রয়োজন।',
    english: 'I urgently need a doctor.',
    usageContext: 'আকস্মিক অসুস্থতায় সাহায্য চাওয়ার জন্য',
  },
  {
    id: 'hp-2',
    category: 'hospital',
    italian: "Dov'è il Pronto Soccorso più vicino?",
    phonetic: 'দোভেই ইল প্রোন্তো সোক্কোর্সো পিউ ভিচিনো?',
    bangla: 'নিকটস্থ ইমার্জেন্সি বিভাগ (জরুরি চিকিৎসা কেন্দ্র) কোথায়?',
    english: 'Where is the nearest Emergency Room (ER)?',
    usageContext: 'হাসপাতালের জরুরি বিভাগ বা রোড ডিরেকশন জানতে',
  },
  {
    id: 'hp-3',
    category: 'hospital',
    italian: 'Ho dolore forte allo stomaco / alla testa / al petto.',
    phonetic: 'ও দোলোরে ফোরতে আল্লো স্তোমাকো / আল্লা তেস্তা / আল পেত্তো।',
    bangla: 'আমার পেটে / মাথায় / বুকে প্রচণ্ড ব্যথা করছে।',
    english: 'I have severe pain in my stomach / head / chest.',
    usageContext: 'ডাক্তার বা নার্সকে ব্যথার স্থান বোঝাতে',
  },
  {
    id: 'hp-4',
    category: 'hospital',
    italian: 'Ho la febbre alta e tosse da due giorni.',
    phonetic: 'ও লা ফেব্ব্রে আলতা এ তোস্‌সে দা দুয়ে জোর্নি।',
    bangla: 'আমার দুই দিন ধরে তীব্র জ্বর ও কাশি হচ্ছে।',
    english: 'I have had a high fever and cough for two days.',
    usageContext: 'জ্বর ও ঠান্ডার লক্ষণ বলতে',
  },
  {
    id: 'hp-5',
    category: 'hospital',
    italian: 'Sono allergico a questo medicinale / antibiotico.',
    phonetic: 'সোনো আল্লের্জিকো আ কুয়েস্তো মেদিচিনালে / আন্তিবিওতিকো।',
    bangla: 'আমার এই ওষুধ বা অ্যান্টিবায়োটিক-এ অ্যালার্জি আছে।',
    english: 'I am allergic to this medication / antibiotic.',
    usageContext: 'ভুল ওষুধ এড়াতে ডাক্তারকে অবগত করতে',
  },
  {
    id: 'hp-6',
    category: 'hospital',
    italian: 'Ho la tessera sanitaria italiana, ecco qui.',
    phonetic: 'ও লা তেস্সেরা সানিতারিয়া ইতালিয়ানা, এক্কো কুই।',
    bangla: 'আমার কাছে ইতালিয়ান হেলথ কার্ড আছে, এই নিন।',
    english: 'I have the Italian health insurance card, here it is.',
    usageContext: 'হাসপাতালের কাউন্টারে স্বাস্থ্য কার্ড দেখানোর সময়',
  },
  {
    id: 'hp-7',
    category: 'hospital',
    italian: 'Devo fare una visita medica specialistica con ricetta.',
    phonetic: 'দেভো ফারে উনা ভিজিস্তা মেদিকা স্পেচিয়ালিস্তিকা কন রিচেত্তা।',
    bangla: 'প্রেসক্রিপশন অনুযায়ী বিশেষজ্ঞ ডাক্তার দেখাতে চাই।',
    english: 'I need to book a specialist medical visit with prescription.',
    usageContext: 'হাসপাতাল বা ক্লিনিকে বুকিং করার জন্য',
  },
  {
    id: 'hp-8',
    category: 'hospital',
    italian: "Dov'è la farmacia di turno?",
    phonetic: 'দোভেই লা ফারমাচিয়া দি তুরনো?',
    bangla: 'এখন খোলা থাকা অন-ডিউটি ফার্মেসি কোথায়?',
    english: 'Where is the on-duty pharmacy open right now?',
    usageContext: 'রাতে বা ছুটির দিনে জরুরি ওষুধ কিনতে',
  },

  // 3. Transport, Bus, Metro (🚌 যাতায়াত)
  {
    id: 'tr-1',
    category: 'transport',
    italian: 'Un biglietto per Roma Termini / Milano Centrale, per favore.',
    phonetic: 'উন বিলিয়েত্তো পের রোমা তেরমিনি / মিলানো চেন্ত্রালে, পের ফাভোরে।',
    bangla: 'রোম বা মিলান যাওয়ার একটি টিকিট দিন দয়া করে।',
    english: 'A ticket to Roma Termini / Milano Centrale, please.',
    usageContext: 'ট্রেন বা বাস স্টেশনের টিকিট কাউন্টারে',
  },
  {
    id: 'tr-2',
    category: 'transport',
    italian: 'A che ora parte il prossimo treno / autobus?',
    phonetic: 'আ কে ওরা পারতে ইল প্রোস্‌সিমো ত্রেনো / আউতোবুস?',
    bangla: 'পরবর্তী ট্রেন বা বাস কয়টায় ছাড়বে?',
    english: 'What time does the next train / bus depart?',
    usageContext: 'ট্রেন বা বাসের সময়সূচি জানতে',
  },
  {
    id: 'tr-3',
    category: 'transport',
    italian: 'Da quale binario parte questo treno?',
    phonetic: 'দা কুয়ালে বিনারিও পারতে কুয়েস্তো ত্রেনো?',
    bangla: 'এই ট্রেনটি কোন প্ল্যাটফর্ম / রেললাইন থেকে ছাড়বে?',
    english: 'Which platform / track does this train depart from?',
    usageContext: 'স্টেশনে প্ল্যাটফর্ম নম্বর খুঁজে না পেলে',
  },
  {
    id: 'tr-4',
    category: 'transport',
    italian: 'Questo autobus va alla stazione centrale?',
    phonetic: 'কুয়েস্তো আউতোবুস ভা আল্লা স্তাৎসিওনে চেন্ত্রালে?',
    bangla: 'এই বাসটি কি সেন্ট্রাল স্টেশনের দিকে যাবে?',
    english: 'Does this bus go to the central train station?',
    usageContext: 'বাসে ওঠার আগে চালককে নিশ্চিত হতে',
  },
  {
    id: 'tr-5',
    category: 'transport',
    italian: "Dov'è la fermata dell'autobus più vicina?",
    phonetic: 'দোভেই লা ফেরমাতা দেল্লাউতোবুস পিউ ভিচিনা?',
    bangla: 'সবচেয়ে কাছের বাস স্টপেজটি কোথায়?',
    english: 'Where is the nearest bus stop?',
    usageContext: 'রাস্তায় বাসের স্টপ খুঁজতে পথচারীকে জিজ্ঞাসা',
  },
  {
    id: 'tr-6',
    category: 'transport',
    italian: 'Devo convalidare il biglietto sulla macchinetta?',
    phonetic: 'দেভো কনভালিদারে ইল বিলিয়েত্তো সুল্লা মাক্কিনেত্তা?',
    bangla: 'টিকিটটি কি স্ট্যাম্পিং বা ভ্যালিডেট মেশিনে পাঞ্চ করতে হবে?',
    english: 'Do I need to validate / stamp the ticket on the machine?',
    usageContext: 'ইতালিতে জরিমানা এড়াতে টিকিট পাঞ্চ নিশ্চিত করতে',
  },
  {
    id: 'tr-7',
    category: 'transport',
    italian: 'Ho sbagliato fermata, come posso tornare indietro?',
    phonetic: 'ও স্‌বালিয়াতো ফেরমাতা, কোমে পোস্‌সো তোরনারে ইন্দিয়েত্রো?',
    bangla: 'আমি ভুল স্টপে নেমে পড়েছি, পেছনে কীভাবে ফেরত যাব?',
    english: 'I got off at the wrong stop, how can I go back?',
    usageContext: 'ভুল জায়গায় নেমে গেলে সাহায্য চাইতে',
  },
  {
    id: 'tr-8',
    category: 'transport',
    italian: "Quanto costa l'abbonamento mensile per i trasporti?",
    phonetic: 'কোয়ান্তো কোস্তা লাব্বোনামেন্তো মেনসিলে পের ই ত্রাস্পোরতি?',
    bangla: 'বাস বা মেট্রোর মাসিক টিকিটের (পাস) খরচ কত?',
    english: 'How much does the monthly public transport pass cost?',
    usageContext: 'মাসিক সাশ্রয়ী ট্রাভেল পাস কিনতে',
  },

  // 4. Workplace & Job (💼 কাজের জায়গা)
  {
    id: 'wp-1',
    category: 'workplace',
    italian: 'A che ora inizio il mio turno oggi?',
    phonetic: 'আ কে ওরা ইনিৎসিও ইল মিও তুরনো ওজ্জি?',
    bangla: 'আজ আমার কাজের শিফট কয়টায় শুরু হবে?',
    english: 'What time does my work shift start today?',
    usageContext: 'সুপারভাইজার বা ম্যানেজারকে শিফটের সময় জানতে',
  },
  {
    id: 'wp-2',
    category: 'workplace',
    italian: 'Ho finito il lavoro assegnato, cosa faccio adesso?',
    phonetic: 'ও ফিনিতো ইল লাভোরো আস্সেনিয়াতো, কোজা ফাচো আদ্দেস্‌সো?',
    bangla: 'আমার ওপর দেওয়া কাজটি শেষ, এখন কী করব?',
    english: 'I have finished my assigned task, what should I do now?',
    usageContext: 'কাজ শেষ করে নতুন নির্দেশ চাইতে',
  },
  {
    id: 'wp-3',
    category: 'workplace',
    italian: "Dov'è il capo reparto / responsabile di turno?",
    phonetic: 'দোভেই ইল কাপো রেপার্তো / রেস্পনসাবিলে দি তুরনো?',
    bangla: 'ইনচার্জ বা সুপারভাইজার কোথায় আছেন?',
    english: 'Where is the department head / shift supervisor?',
    usageContext: 'জরুরি বিষয়ে দায়িত্বশীল ব্যক্তিকে খুঁজতে',
  },
  {
    id: 'wp-4',
    category: 'workplace',
    italian: 'Posso fare lo straordinario questo sabato?',
    phonetic: 'পোস্‌সো ফারে লো স্ত্রাওরদিনারিও কুয়েস্তো সাবাতো?',
    bangla: 'এই শনিবার কি আমি ওভারটাইম কাজ করতে পারব?',
    english: 'Can I do overtime work this Saturday?',
    usageContext: 'অতিরিক্ত আয় ও ওভারটাইমের সুযোগ চাইতে',
  },
  {
    id: 'wp-5',
    category: 'workplace',
    italian: 'Non ho ancora ricevuto la busta paga di questo mese.',
    phonetic: 'নন ও আনকোরা রিচেভউতো লা বুস্তা পাগা দি কুয়েস্তো মেজে।',
    bangla: 'আমি এই মাসের পে-স্লিপ বা বেতনের হিসাব এখনও পাইনি।',
    english: 'I have not yet received my pay slip (busta paga) for this month.',
    usageContext: 'অফিস বা একাউন্টসের কাছে পে-স্লিপ চাইতে',
  },
  {
    id: 'wp-6',
    category: 'workplace',
    italian: 'Mi servono le scarpe antinfortunistiche e i guanti da lavoro.',
    phonetic: 'মি সেরভোনো লে স্কার্পে আন্তিনফরতুনিস্তিকে এ ই গুয়ানতি দা লাভোরো।',
    bangla: 'কাজের জন্য আমার সেফটি জুতো ও হ্যান্ডগ্লাভস প্রয়োজন।',
    english: 'I need safety shoes and work gloves for the job.',
    usageContext: 'কারখানায় সুরক্ষার পোশাক চাইতে',
  },
  {
    id: 'wp-7',
    category: 'workplace',
    italian: 'Domani ho un appuntamento in Questura per il permesso di soggiorno.',
    phonetic: 'দোমানি ও উন আপ্পুন্তামেন্তো ইন কুয়েস্তুরা পের ইল পেরমেসো দি সোজ্জোর্নো।',
    bangla: 'আগামীকাল কুয়েস্তুরায় পারমেসোর ফিঙ্গারপ্রিন্ট ডেট আছে।',
    english: 'Tomorrow I have an appointment at the Questura for my residence permit.',
    usageContext: 'মালিকের কাছে আইনি ছুটির আবেদন জানাতে',
  },
  {
    id: 'wp-8',
    category: 'workplace',
    italian: 'Oggi non mi sento bene, posso avere un giorno di malattia?',
    phonetic: 'ওজ্জি নন মি সেন্তো বেনে, পোস্‌সো আভেরে উন জোর্নো দি মালাত্তিয়া?',
    bangla: 'আজ শরীর খারাপ লাগছে, একদিনের অসুস্থতাজনিত ছুটি পাব?',
    english: 'I do not feel well today, can I take a sick day off?',
    usageContext: 'মেডিকেল ছুটির জন্য বসকে জানাতে',
  },

  // 5. Emergency & Legal (🚨 জরুরি ও লিগ্যাল)
  {
    id: 'el-1',
    category: 'emergency_legal',
    italian: 'Ho bisogno di aiuto, per favore chiami la polizia / i carabinieri!',
    phonetic: 'ও বিজোনিয়ো দি আউতো, পের ফাভোরে কিয়ামি লা পোলিৎসিয়া / ই কারাবিনিয়েরি!',
    bangla: 'আমার সাহায্য প্রয়োজন, দয়া করে পুলিশ বা কারাবিনিয়ারিকে ডাকুন!',
    english: 'I need help, please call the police / carabinieri!',
    usageContext: 'নিরাপত্তা বা অপরাধের শিকার হলে তাৎক্ষণিক সহায়তা চাইতে',
  },
  {
    id: 'el-2',
    category: 'emergency_legal',
    italian: "Dove si trova l'ufficio immigrazione della Questura?",
    phonetic: 'দোভেই সি ত্রোভা লুফফিচো ইম্মিগ্রাৎসিওনে দেল্লা কুয়েস্তুরা?',
    bangla: 'কুয়েস্তুরার ইমিগ্রেশন ও পারমেসো শাখাটি কোথায়?',
    english: 'Where is the Immigration Office at the Questura police headquarters?',
    usageContext: 'পুলিশ হেডকোয়ার্টারে পারমেসো দফতর খুঁজতে',
  },
  {
    id: 'el-3',
    category: 'emergency_legal',
    italian: 'Ho perso il mio passaporto e il permesso di soggiorno.',
    phonetic: 'ও পের্সো ইল মিও পাস্সাপোর্তো এ ইল পেরমেসো দি সোজ্জোর্নো।',
    bangla: 'আমি আমার পাসপোর্ট ও পারমেসো দি সোজ্জোর্নো হারিয়ে ফেলেছি।',
    english: 'I have lost my passport and residence permit (permesso di soggiorno).',
    usageContext: 'পুলিশ স্টেশনে সাধারণ ডায়েরি বা জিডি (denuncia) করতে',
  },
  {
    id: 'el-4',
    category: 'emergency_legal',
    italian: 'Ho con me la ricevuta postale del kit per il rinnovo.',
    phonetic: 'ও কন মে লা রিচেভউতা পোস্তালে দেল কিট পের ইল রিন্নোভো।',
    bangla: 'আমার সাথে পারমেসো নবায়নের পোস্ট অফিস জমার রসিদ আছে।',
    english: 'I have the postal receipt (ricevuta) for the renewal kit with me.',
    usageContext: 'পুলিশ চেকপোস্টে বৈধ অবস্থান প্রমাণ করার সময়',
  },
  {
    id: 'el-5',
    category: 'emergency_legal',
    italian: 'Ho bisogno di un interprete che parli bengalese o inglese.',
    phonetic: 'ও বিজোনিয়ো দি উন ইন্তের্প্রেতে কে পার্লি বেঙ্গালেজে ও ইংলেজে।',
    bangla: 'আমার একজন দোভাষী প্রয়োজন যিনি বাংলা বা ইংরেজি বলতে পারেন।',
    english: 'I need an interpreter who speaks Bengali or English.',
    usageContext: 'থানায় বা হাসপাতালে কথা পরিষ্কার করতে অনুবাদক চাইতে',
  },
  {
    id: 'el-6',
    category: 'emergency_legal',
    italian: 'Dove posso trovare un Patronato o CAF per la pratica?',
    phonetic: 'দোভেই পোস্‌সো ত্রোভারে উন পাত্রোনাতো ও কাফ পের লা প্রাতিকা?',
    bangla: 'ফাইল বা লিগ্যাল কাজ করার জন্য ভালো CAF বা Patronato কোথায়?',
    english: 'Where can I find a Patronato or CAF office to process my application?',
    usageContext: 'ফ্রি আইনি সহায়তা বা ফর্ম পূরণের অফিস খুঁজতে',
  },
  {
    id: 'el-7',
    category: 'emergency_legal',
    italian: "Chiami subito un'ambulanza, c'è un'emergenza medica!",
    phonetic: 'কিয়ামি সুবিতো উনাম্বুলান্ৎসা, চে উনেমের্জেন্ৎসা মেদিকা!',
    bangla: 'দ্রুত অ্যাম্বুলেন্স ডাকুন (১১৮), জরুরি চিকিৎসা প্রয়োজন!',
    english: 'Call an ambulance immediately (118), there is a medical emergency!',
    usageContext: 'দুর্ঘটনা বা হঠাৎ গুরুতর অসুস্থতায়',
  },
  {
    id: 'el-8',
    category: 'emergency_legal',
    italian: 'Voglio presentare una denuncia di smarrimento.',
    phonetic: 'ভোলিয়ো প্রেজেন্তারে উনা দেনুন্চা দি স্মাররিমেন্তো।',
    bangla: 'আমি হারানো জিনিসের একটি আনুষ্ঠানিক রিপোর্ট বা ডায়েরি করতে চাই।',
    english: 'I want to file a formal police report for lost property.',
    usageContext: 'কারাবিনিয়ারি বা পুলিশ স্টেশনে অভিযোগ লিপিবদ্ধ করতে',
  },
];

// Offline quick phrases dictionary for instant zero-latency translation
const OFFLINE_DICTIONARY: Record<string, string> = {
  'হ্যালো': 'Ciao',
  'ধন্যবাদ': 'Grazie',
  'দয়া করে': 'Per favore',
  'শুভ সকাল': 'Buongiorno',
  'শুভ রাত্রি': 'Buonanotte',
  'আমি সাহায্য চাই': 'Ho bisogno di aiuto',
  'hello': 'Ciao',
  'thank you': 'Grazie',
  'please': 'Per favore',
  'good morning': 'Buongiorno',
  'good night': 'Buonanotte',
  'help': 'Aiuto',
  'water': 'Acqua',
  'bread': 'Pane',
  'doctor': 'Medico',
  'hospital': 'Ospedale',
  'medicine': 'Medicina',
  'ticket': 'Biglietto',
  'train': 'Treno',
  'bus': 'Autobus',
  'job': 'Lavoro',
  'salary': 'Stipendio',
  'money': 'Soldi',
  'police': 'Polizia',
  'পানি': 'Acqua',
  'রুটি': 'Pane',
  'ডাক্তার': 'Medico',
  'হাসপাতাল': 'Ospedale',
  'ওষুধ': 'Medicina',
  'টিকেট': 'Biglietto',
  'ট্রেন': 'Treno',
  'বাস': 'Autobus',
  'কাজ': 'Lavoro',
  'বেতন': 'Stipendio',
  'পারমেসো': 'Permesso di soggiorno',
  'পাসপোর্ট': 'Passaporto',
  'পুলিশ': 'Polizia',
  'ciao': 'হ্যালো / শুভেচ্ছা / Hello',
  'grazie': 'ধন্যবাদ / Thank you',
  'buongiorno': 'শুভ সকাল / Good morning',
  'prego': 'স্বাগতম / You are welcome',
  'aiuto': 'সাহায্য / Help',
  'medico': 'ডাক্তার / Doctor',
  'ospedale': 'হাসপাতাল / Hospital',
  'biglietto': 'টিকেট / Ticket',
  'lavoro': 'কাজ / Job / Work',
  'stipendio': 'বেতন / Salary',
};

// Sample Italian Documents for OCR Simulator
const SAMPLE_DOCS = [
  {
    title: 'পোস্টাল কিটের রসিদ (Ricevuta Permesso)',
    type: 'Poste Italiane',
    extractedIt: 'Poste Italiane - Ricevuta di accettazione dell\'istanza di rinnovo del Permesso di Soggiorno. Codice assicurata: 06123456789. Presentarsi in Questura per il fotosegnalamento.',
    extractedBn: 'পোস্টে ইতালিয়ানে - পারমেসো দি সোজ্জোর্নো নবায়নের আবেদনপত্র জমার রসিদ। রেজিস্টার্ড কোড: ০৬১২৩৪৫৬৭৮৯। ফিঙ্গারপ্রিন্ট ও ছবির জন্য কুয়েস্তুরায় উপস্থিত হোন।',
  },
  {
    title: 'কুয়েস্তুরার নোটিশ (Convocazione Questura)',
    type: 'Questura di Roma',
    extractedIt: 'Si comunica che la S.V. è convocata presso l\'Ufficio Immigrazione per il ritiro del Permesso di Soggiorno pronto. Portare passaporto e 4 fototessere.',
    extractedBn: 'আপনাকে জানানো যাচ্ছে যে তৈরি হওয়া পারমেসো দি সোজ্জোর্নো গ্রহণের জন্য ইমিগ্রেশন অফিসে উপস্থিত হওয়ার নোটিশ। মূল পাসপোর্ট ও ৪ কপি ছবি সাথে আনুন।',
  },
  {
    title: 'বেতন স্লিপের নোট (Busta Paga / Cedolino)',
    type: 'Busta Paga',
    extractedIt: 'Cedolino paga del mese di competenza. Retribuzione ordinaria, trattenute INPS e imposta netta IRPEF. Pagamento tramite bonifico bancario.',
    extractedBn: 'চলতি মাসের বেতনের হিসাব (বুস্তা পাগা)। সাধারণ মজুরি, ইনপ্স (INPS) কর্তন এবং নিট ট্যাক্স। ব্যাংক ট্রান্সফারের মাধ্যমে পরিশোধিত।',
  },
];

type SupportedLang = 'bn' | 'en' | 'it';

export default function ImmigrantTranslator() {
  const { currentLang, t } = useLanguage();

  // Voice & Text Translator state with 3-language selector
  const [sourceLang, setSourceLang] = useState<SupportedLang>('bn');
  const [targetLang, setTargetLang] = useState<SupportedLang>('it');
  const [inputText, setInputText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [copiedTranslator, setCopiedTranslator] = useState<boolean>(false);
  const [speakingTranslator, setSpeakingTranslator] = useState<boolean>(false);
  const [speechSpeed, setSpeechSpeed] = useState<'normal' | 'slow'>('normal');
  const [showLargeDisplay, setShowLargeDisplay] = useState<boolean>(false);

  // Categorized Phrase Cards state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'supermarket' | 'hospital' | 'transport' | 'workplace' | 'emergency_legal' | 'favorites'>('all');
  const [phraseSearch, setPhraseSearch] = useState<string>('');
  const [copiedPhraseId, setCopiedPhraseId] = useState<string | null>(null);
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('immigrant_favorite_phrases');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCheatSheetModal, setShowCheatSheetModal] = useState<boolean>(false);

  // Document OCR Translator State
  const [ocrFile, setOcrFile] = useState<File | null>(null);
  const [ocrPreviewUrl, setOcrPreviewUrl] = useState<string | null>(null);
  const [isOcrScanning, setIsOcrScanning] = useState<boolean>(false);
  const [extractedOcrText, setExtractedOcrText] = useState<string>('');
  const [translatedOcrText, setTranslatedOcrText] = useState<string>('');
  const [activeSampleIndex, setActiveSampleIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const recognitionRef = useRef<any>(null);

  // Toggle favorite phrase
  const toggleFavorite = (phraseId: string) => {
    setFavoriteIds((prev) => {
      const isAlreadyFav = prev.includes(phraseId);
      const next = isAlreadyFav ? prev.filter((id) => id !== phraseId) : [...prev, phraseId];
      try {
        localStorage.setItem('immigrant_favorite_phrases', JSON.stringify(next));
      } catch {}
      setToastMessage(isAlreadyFav ? 'Removed from favorites' : 'Saved to favorites ⭐');
      setTimeout(() => setToastMessage(null), 2500);
      return next;
    });
  };

  // Handle live translation
  const handleTranslate = async (textToTranslate?: string) => {
    const queryText = (textToTranslate ?? inputText).trim();
    if (!queryText) {
      setTranslatedText('');
      return;
    }

    if (sourceLang === targetLang) {
      setTranslatedText(queryText);
      return;
    }

    // Check instant offline dictionary first
    const lower = queryText.toLowerCase();
    if (OFFLINE_DICTIONARY[lower] || OFFLINE_DICTIONARY[queryText]) {
      setTranslatedText(OFFLINE_DICTIONARY[lower] || OFFLINE_DICTIONARY[queryText]);
      return;
    }

    setIsTranslating(true);
    try {
      const langpair = `${sourceLang}|${targetLang}`;
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(queryText)}&langpair=${langpair}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data && data.responseData && data.responseData.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setTranslatedText(queryText);
      }
    } catch {
      const fallbackMatch = Object.entries(OFFLINE_DICTIONARY).find(([k]) => queryText.includes(k));
      if (fallbackMatch) {
        setTranslatedText(fallbackMatch[1]);
      } else {
        setTranslatedText(queryText);
      }
    } finally {
      setIsTranslating(false);
    }
  };

  // Swap language
  const handleSwapLanguages = () => {
    const tempSource = sourceLang;
    const tempTarget = targetLang;
    setSourceLang(tempTarget);
    setTargetLang(tempSource);

    const currentInput = inputText;
    const currentTranslated = translatedText;
    setInputText(currentTranslated);
    setTranslatedText(currentInput);
  };

  // Voice Input Speech Recognition for BN, EN, or IT
  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') return;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechError('Web Speech API is not supported in this browser. Please type or use Chrome.');
      setTimeout(() => setSpeechError(null), 5000);
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = sourceLang === 'bn' ? 'bn-BD' : sourceLang === 'en' ? 'en-US' : 'it-IT';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleTranslate(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setSpeechError('Voice input error. Please check microphone permission.');
          setTimeout(() => setSpeechError(null), 4000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setSpeechError('Could not start microphone.');
    }
  };

  // Text-To-Speech Synthesis with Speed Options (Standard 1.0x vs Slow 0.7x) for IT, EN, BN
  const speakText = (text: string, langCode: 'it-IT' | 'en-US' | 'bn-BD', id?: string, forceSlow = false) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on your browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = forceSlow || speechSpeed === 'slow' ? 0.68 : 0.95;

    const voices = window.speechSynthesis.getVoices();
    const voicePrefix = langCode.slice(0, 2);
    const targetVoice = voices.find((v) => v.lang.startsWith(voicePrefix));
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    if (id) {
      setPlayingPhraseId(id);
      utterance.onend = () => setPlayingPhraseId(null);
      utterance.onerror = () => setPlayingPhraseId(null);
    } else {
      setSpeakingTranslator(true);
      utterance.onend = () => setSpeakingTranslator(false);
      utterance.onerror = () => setSpeakingTranslator(false);
    }

    window.speechSynthesis.speak(utterance);
  };

  // Copy helper with feedback toast
  const copyToClipboard = (text: string, isTranslator = false, phraseId?: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      if (isTranslator) {
        setCopiedTranslator(true);
        setTimeout(() => setCopiedTranslator(false), 2500);
      }
      if (phraseId) {
        setCopiedPhraseId(phraseId);
        setTimeout(() => setCopiedPhraseId(null), 2500);
      }
      setToastMessage('Text copied to clipboard! 📋');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  // OCR Simulator Handler
  const handleOcrFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOcrFile(file);
      setOcrPreviewUrl(URL.createObjectURL(file));
      setActiveSampleIndex(null);
      runOcrSimulation(SAMPLE_DOCS[0]);
    }
  };

  const runOcrSimulation = (doc: typeof SAMPLE_DOCS[0]) => {
    setIsOcrScanning(true);
    setExtractedOcrText('');
    setTranslatedOcrText('');

    setTimeout(() => {
      setIsOcrScanning(false);
      setExtractedOcrText(doc.extractedIt);
      setTranslatedOcrText(doc.extractedBn);
      setToastMessage('Document text extracted successfully!');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1800);
  };

  const handleSelectSampleDoc = (index: number) => {
    setActiveSampleIndex(index);
    setOcrFile(null);
    setOcrPreviewUrl(null);
    runOcrSimulation(SAMPLE_DOCS[index]);
  };

  // Filter phrases
  const filteredPhrases = CATEGORIZED_PHRASES.filter((p) => {
    if (selectedCategory === 'favorites') {
      if (!favoriteIds.includes(p.id)) return false;
    } else if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    const q = phraseSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      p.italian.toLowerCase().includes(q) ||
      p.bangla.toLowerCase().includes(q) ||
      p.english.toLowerCase().includes(q) ||
      p.phonetic.toLowerCase().includes(q)
    );
  });

  const getLanguageLabel = (code: SupportedLang) => {
    switch (code) {
      case 'bn':
        return '🇧🇩 বাংলা';
      case 'en':
        return '🇬🇧 English';
      case 'it':
        return '🇮🇹 Italiano';
    }
  };

  return (
    <section
      id="translator"
      className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* =========================================================================
            HEADER & TOP BAR GOOGLE TRANSLATE INTEGRATION
           ========================================================================= */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-emerald-800/60 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-600/50">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('translatorBadge', 'বহুভাষিক ভয়েস ও টেক্সট অনুবাদক')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {t('translatorTitle', 'বাংলা ⇄ English ⇄ Italiano স্মার্ট অনুবাদক')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              {t('translatorSubtitle', 'ইতালিতে প্রবাসী বাংলাদেশিদের জন্য ভয়েস ইনপুট, অডিও উচ্চারণ, ধীরগতির প্রনান্সিয়েশন এবং বুকমার্ক সুবিধা।')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 z-10 shrink-0">
            <GoogleTranslateWidget />
            <button
              onClick={() => setShowCheatSheetModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF / প্রিন্ট চিট শিট</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            PART 1: INTERACTIVE 3-LANGUAGE VOICE & TEXT TRANSLATOR TOOL
           ========================================================================= */}
        <div className="bg-slate-50 dark:bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base sm:text-lg">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>ইন্টারেক্টিভ ট্রান্সলেটর (Interactive Translator)</span>
            </div>

            {/* Language Selection: Source Lang & Target Lang with 3 Languages */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Speed Toggle */}
              <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  onClick={() => setSpeechSpeed('normal')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    speechSpeed === 'normal'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                  title="স্বাভাবিক অডিও গতি"
                >
                  {t('normalSpeed', '১.০x স্বাভাবিক')}
                </button>
                <button
                  onClick={() => setSpeechSpeed('slow')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    speechSpeed === 'slow'
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                  title="শেখার জন্য ধীরগতির স্পষ্ট উচ্চারণ"
                >
                  {t('slowSpeed', '০.৭x ধীরগতি')}
                </button>
              </div>

              {/* Source Lang Selector */}
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value as SupportedLang)}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="bn">🇧🇩 বাংলা (Bangla)</option>
                <option value="en">🇬🇧 English</option>
                <option value="it">🇮🇹 Italiano</option>
              </select>

              {/* Swap Button */}
              <button
                onClick={handleSwapLanguages}
                title="ভাষা অদলবদল করুন (Swap Language)"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-transform active:scale-90 cursor-pointer"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>

              {/* Target Lang Selector */}
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value as SupportedLang)}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="it">🇮🇹 Italiano</option>
                <option value="en">🇬🇧 English</option>
                <option value="bn">🇧🇩 বাংলা (Bangla)</option>
              </select>
            </div>
          </div>

          {/* Interactive Dual Box Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Box Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>{getLanguageLabel(sourceLang)} ইনপুট:</span>
                  {inputText && (
                    <button
                      onClick={() => {
                        setInputText('');
                        setTranslatedText('');
                      }}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{t('clear', 'মুছে ফেলুন')}</span>
                    </button>
                  )}
                </div>

                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    if (e.target.value.trim() === '') setTranslatedText('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTranslate();
                    }
                  }}
                  placeholder={
                    sourceLang === 'bn'
                      ? 'এখানে বাংলায় লিখুন অথবা মাইক্রোফোনে কথা বলুন... (যেমন: আমি একটি ট্রেনের টিকিট কিনতে চাই)'
                      : sourceLang === 'en'
                      ? 'Type in English or use voice input... (e.g. I need to buy a train ticket)'
                      : 'Scrivi qui in italiano o usa la voce...'
                  }
                  rows={4}
                  className="w-full text-base sm:text-lg bg-transparent border-0 focus:outline-none resize-none text-slate-900 dark:text-white placeholder:text-slate-400 leading-relaxed"
                />
              </div>

              {/* Quick suggestions & Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 self-center">কুইক প্রম্পট:</span>
                  {[
                    'আমার জরুরি ডাক্তার প্রয়োজন',
                    'এটার দাম কত?',
                    'সেন্ট্রাল স্টেশনের ট্রেন কোনটি?',
                    'আমি কাজের পারমেসো রিনিউ করতে চাই',
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setInputText(preset);
                        handleTranslate(preset);
                      }}
                      className="text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/40 text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Voice Input */}
                    <button
                      onClick={toggleVoiceInput}
                      title={isListening ? 'কথা বলা বন্ধ করুন' : 'মাইক্রোফোনে কথা বলুন (Web Speech API)'}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                        isListening
                          ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/30'
                          : 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      }`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-4 h-4 animate-spin" />
                          <span>{t('recording', 'রেকর্ড হচ্ছে... বলুন')}</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>{t('voiceInput', 'ভয়েস ইনপুট')}</span>
                        </>
                      )}
                    </button>

                    {inputText && (
                      <button
                        onClick={() =>
                          speakText(
                            inputText,
                            sourceLang === 'bn' ? 'bn-BD' : sourceLang === 'en' ? 'en-US' : 'it-IT'
                          )
                        }
                        title="উচ্চারণ শুনুন"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleTranslate()}
                    disabled={isTranslating || !inputText.trim()}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
                    <span>{isTranslating ? t('translating', 'অনুবাদ হচ্ছে...') : t('translateBtn', 'অনুবাদ করুন')}</span>
                  </button>
                </div>

                {speechError && (
                  <p className="text-[11px] text-rose-500 font-medium">{speechError}</p>
                )}
              </div>
            </div>

            {/* Output Box Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-emerald-300 dark:border-emerald-800/80 shadow-md flex flex-col justify-between space-y-4 relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>{getLanguageLabel(targetLang)} অনুবাদ:</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                    লাইভ অনুবাদ
                  </span>
                </div>

                <div className="min-h-[100px]">
                  {isTranslating ? (
                    <div className="flex items-center gap-2 text-slate-400 py-6">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-sm">অনুবাদ তৈরি হচ্ছে...</span>
                    </div>
                  ) : translatedText ? (
                    <div className="space-y-2">
                      <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-relaxed select-all">
                        {translatedText}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm italic py-4">
                      {sourceLang === 'bn'
                        ? 'বামপাশে বাংলায় কিছু লিখলে বা বললে এখানে সাথে সাথে অনুবাদ দেখতে পাবেন।'
                        : 'Write or speak on the left to see instant translation here.'}
                    </p>
                  )}
                </div>
              </div>

              {/* Output Actions Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {translatedText && (
                    <>
                      {/* Audio Pronunciation */}
                      <button
                        onClick={() =>
                          speakText(
                            translatedText,
                            targetLang === 'it' ? 'it-IT' : targetLang === 'en' ? 'en-US' : 'bn-BD'
                          )
                        }
                        title={`উচ্চারণ শুনুন (${speechSpeed === 'slow' ? 'ধীরগতি ০.৭x' : 'স্বাভাবিক ১.০x'})`}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          speakingTranslator
                            ? 'bg-amber-500 text-slate-950 animate-pulse font-black'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{speakingTranslator ? 'বলা হচ্ছে...' : `অডিও (${speechSpeed === 'slow' ? '০.৭x' : '১.০x'})`}</span>
                      </button>

                      {/* Slow Speech Button */}
                      <button
                        onClick={() =>
                          speakText(
                            translatedText,
                            targetLang === 'it' ? 'it-IT' : targetLang === 'en' ? 'en-US' : 'bn-BD',
                            undefined,
                            true
                          )
                        }
                        title="বিশেষ ধীরগতিতে শুনুন (Slow Pronunciation for Beginners)"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer border border-slate-200 dark:border-slate-700"
                      >
                        ০.৭x স্লো
                      </button>

                      {/* Copy Translation Text */}
                      <button
                        onClick={() => copyToClipboard(translatedText, true)}
                        title="অনুবাদ কপি করুন"
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                      >
                        {copiedTranslator ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-600">{t('copied', 'কপি হয়েছে!')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>{t('copyText', 'কপি')}</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>

                {/* Big Display Button for showing to Italian Native */}
                {translatedText && (
                  <button
                    onClick={() => setShowLargeDisplay(true)}
                    title="দোকানদার, ডাক্তার বা টিকিট চেকারকে বড় স্ক্রিনে দেখান"
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">{t('showBigScreen', 'বড় স্ক্রিনে দেখান')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 2: CATEGORIZED QUICK PHRASE CARDS WITH BENGALI & ENGLISH MEANING
           ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2 border border-emerald-300 dark:border-emerald-800">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>দৈনন্দিন প্রয়োজনীয় ইতালিয়ান বাক্যাবলি</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                ক্যাটেগরি অনুযায়ী কুইক ফ্রেজ কার্ড (Quick Phrase Cards)
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                সুপারমার্কেট, হাসপাতাল, যাতায়াত, কাজের জায়গা ও জরুরি বিষয়ের বড় অক্ষরের বাক্য, বাংলায় উচ্চারণ ও ইংরেজি অনুবাদ।
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCheatSheetModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-800 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>সারভাইভাল চিট শিট প্রিন্ট</span>
              </button>
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              {t('catAll', 'সব বাক্য')} ({CATEGORIZED_PHRASES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('supermarket')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'supermarket'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{t('catSupermarket', 'সুপারমার্কেট')}</span>
            </button>
            <button
              onClick={() => setSelectedCategory('hospital')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'hospital'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{t('catHospital', 'হাসপাতাল ও ডাক্তার')}</span>
            </button>
            <button
              onClick={() => setSelectedCategory('transport')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'transport'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <Bus className="w-3.5 h-3.5" />
              <span>{t('catTransport', 'যাতায়াত (বাস/ট্রেন)')}</span>
            </button>
            <button
              onClick={() => setSelectedCategory('workplace')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'workplace'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t('catWorkplace', 'কাজের জায়গা')}</span>
            </button>
            <button
              onClick={() => setSelectedCategory('emergency_legal')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'emergency_legal'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-red-600'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('catEmergency', 'জরুরি ও লিগ্যাল')}</span>
            </button>
            <button
              onClick={() => setSelectedCategory('favorites')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'favorites'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{t('catFavorites', 'বুকমার্ক')} ({favoriteIds.length})</span>
            </button>
          </div>

          {/* Search bar inside phrases */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={phraseSearch}
              onChange={(e) => setPhraseSearch(e.target.value)}
              placeholder="বাক্য, উচ্চারণ, বাংলা বা ইংরেজি অর্থ দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {phraseSearch && (
              <button
                onClick={() => setPhraseSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredPhrases.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Star className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="font-bold text-slate-800 dark:text-slate-200">
                {selectedCategory === 'favorites'
                  ? 'কোনো বুকমার্ক করা বাক্য পাওয়া যায়নি।'
                  : 'কোনো বাক্য পাওয়া যায়নি।'}
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                কার্ডের স্টার (⭐) বাটনে ক্লিক করে অফলাইনের মতো দ্রুত ব্যবহারের জন্য প্রিয় বাক্য সেভ করে রাখুন।
              </p>
            </div>
          )}

          {/* Phrases Grid (Responsive Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPhrases.map((phrase) => {
              const isPlaying = playingPhraseId === phrase.id;
              const isCopied = copiedPhraseId === phrase.id;
              const isFav = favoriteIds.includes(phrase.id);

              const getCategoryBadge = () => {
                switch (phrase.category) {
                  case 'supermarket':
                    return { label: 'সুপারমার্কেট', bg: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' };
                  case 'hospital':
                    return { label: 'হাসপাতাল', bg: 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300' };
                  case 'transport':
                    return { label: 'যাতায়াত', bg: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300' };
                  case 'workplace':
                    return { label: 'কাজের জায়গা', bg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' };
                  case 'emergency_legal':
                    return { label: 'জরুরি ও লিগ্যাল', bg: 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300' };
                }
              };

              const badge = getCategoryBadge();

              return (
                <article
                  key={phrase.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group relative"
                >
                  <div className="space-y-3">
                    {/* Category & Favorite Star */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${badge.bg}`}>
                        {badge.label}
                      </span>

                      <button
                        onClick={() => toggleFavorite(phrase.id)}
                        title={isFav ? 'বুকমার্ক থেকে মুছুন' : 'ফেভারিটে সেভ করুন'}
                        className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                          isFav
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                            : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Italian Phrase (Large text) */}
                    <div>
                      <h4 className="font-black text-xl text-slate-900 dark:text-white leading-snug">
                        {phrase.italian}
                      </h4>
                    </div>

                    {/* Bangla Phonetic Pronunciation Guide */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400 mb-0.5">
                        {t('italianPronunciation', 'বাংলায় উচ্চারণ:')}
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        &quot;{phrase.phonetic}&quot;
                      </p>
                    </div>

                    {/* Meaning in Bengali & English */}
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">🇧🇩 বাংলা অর্থ: </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                          {phrase.bangla}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">🇬🇧 English: </span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {phrase.english}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-100 dark:border-slate-800">
                        💡 {phrase.usageContext}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1">
                      {/* Audio Play Button (it-IT) */}
                      <button
                        onClick={() => speakText(phrase.italian, 'it-IT', phrase.id)}
                        title="ইতালিয়ান উচ্চারণ শুনুন"
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                          isPlaying
                            ? 'bg-amber-500 text-slate-950 font-black animate-pulse'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlaying ? 'চলছে...' : 'অডিও'}</span>
                      </button>

                      {/* Slow Audio Button */}
                      <button
                        onClick={() => speakText(phrase.italian, 'it-IT', phrase.id, true)}
                        title="ধীরগতির উচ্চারণ শুনুন (Slow Speed 0.7x)"
                        className="px-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold cursor-pointer"
                      >
                        ০.৭x
                      </button>
                    </div>

                    {/* Copy Italian Text Button */}
                    <button
                      onClick={() => copyToClipboard(phrase.italian, false, phrase.id)}
                      title="ইতালিয়ান বাক্য কপি করুন"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PART 3: DOCUMENT OCR & IMAGE TRANSLATOR UI PLACEHOLDER
           ========================================================================= */}
        <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-900/90 dark:to-slate-950 rounded-3xl p-6 sm:p-8 border border-emerald-200/60 dark:border-emerald-900/50 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2 border border-emerald-300 dark:border-emerald-800">
                <ScanLine className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>ডকুমেন্ট ও চিঠি রিডার</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                ডকুমেন্ট ও ইমেজ ট্রান্সলেটর (Document OCR & Photo Translator)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                ইতালিতে পোস্ট অফিসের চিঠি, কুয়েস্তুরার নোটিশ বা কাজের পে-স্লিপের (Busta Paga) ছবি আপলোড করে সহজে মূল ইতালিয়ান টেক্সট ও বাংলা অর্থ দেখুন।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500">নমুনা চিঠি:</span>
              {SAMPLE_DOCS.map((doc, idx) => (
                <button
                  key={doc.title}
                  onClick={() => handleSelectSampleDoc(idx)}
                  className={`text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    activeSampleIndex === idx
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                  }`}
                >
                  {doc.title.split(' ')[0]} {doc.type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-dashed border-emerald-300 dark:border-emerald-800/80 hover:border-emerald-500 transition-colors flex flex-col items-center justify-center text-center space-y-3 cursor-pointer relative overflow-hidden group">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleOcrFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {ocrPreviewUrl ? (
                <div className="w-full space-y-2">
                  <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Image
                      src={ocrPreviewUrl}
                      alt="Document Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    {isOcrScanning && (
                      <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                        <div className="w-full h-1 bg-emerald-400 shadow-lg shadow-emerald-400/80 animate-bounce" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {ocrFile?.name || 'আপলোড করা ডকুমেন্ট'}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-bold">অন্য ছবি দিতে ক্লিক করুন</p>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      ইতালিয়ান চিঠির ছবি এখানে ড্র্যাগ করুন বা ক্লিক করুন
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      PNG, JPG বা স্মার্টফোনের ক্যামেরা দিয়ে তোলা ছবি
                    </p>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm">
                    ফাইল সিলেক্ট করুন
                  </span>
                </>
              )}
            </div>

            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>এক্সট্র্যাক্ট করা ইতালিয়ান টেক্সট ও অনুবাদ</span>
                  </span>
                  {isOcrScanning && (
                    <span className="text-emerald-600 font-bold animate-pulse flex items-center gap-1">
                      <ScanLine className="w-3.5 h-3.5 animate-spin" />
                      <span>স্ক্যান হচ্ছে...</span>
                    </span>
                  )}
                </div>

                {isOcrScanning ? (
                  <div className="py-10 text-center space-y-2">
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
                    <p className="text-xs text-slate-500">ডকুমেন্টের লেখা শনাক্ত করা হচ্ছে...</p>
                  </div>
                ) : extractedOcrText ? (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">🇮🇹 মূল ইতালিয়ান পাঠ:</span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                        {extractedOcrText}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                        🇧🇩 বাংলায় তাৎক্ষণিক অর্থ:
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-emerald-950 dark:text-emerald-200 leading-relaxed">
                        {translatedOcrText}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-400 space-y-2">
                    <ScanLine className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-xs">
                      বামে ছবি আপলোড করুন অথবা উপরের যেকোনো একটি নমুনা চিঠিতে ক্লিক করুন।
                    </p>
                  </div>
                )}
              </div>

              {extractedOcrText && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakText(extractedOcrText, 'it-IT')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>উচ্চারণ শুনুন</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(extractedOcrText)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>কপি</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setInputText(extractedOcrText);
                      setTranslatedText(translatedOcrText);
                      const el = document.getElementById('translator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>মূল অনুবাদক-এ পাঠান</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Big Display Modal */}
      {showLargeDisplay && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 max-w-2xl w-full border border-emerald-500 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowLargeDisplay(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                ইতালিয়ান নাগরিককে বড় স্ক্রিনে দেখান (Mostra all&apos;interlocutore)
              </span>
              <p className="text-xs text-slate-500">আপনার স্মার্টফোনটি উল্টো করে সামনে দেখান</p>
            </div>

            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-4">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-tight">
                {translatedText}
              </h2>
              <p className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400">
                &quot;{inputText}&quot;
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() =>
                  speakText(
                    translatedText,
                    targetLang === 'it' ? 'it-IT' : targetLang === 'en' ? 'en-US' : 'bn-BD'
                  )
                }
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>উচ্চস্বরে শোনান (Ascolta Audio)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Cheat Sheet Modal */}
      {showCheatSheetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-emerald-500 shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 print:p-0 print:border-0 print:shadow-none print:max-h-none">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  🇮🇹
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    ইতালি প্রবাসী সারভাইভাল ল্যাঙ্গুয়েজ চিট শিট (Print & Offline Guide)
                  </h3>
                  <p className="text-xs text-slate-500">
                    জরুরি সব বাক্য একসাথে প্রিন্ট করে পকেটে রাখুন অথবা পিডিএফ সেভ করুন
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>প্রিন্ট / PDF সেভ করুন</span>
                </button>
                <button
                  onClick={() => setShowCheatSheetModal(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>জরুরি নম্বর (ইতালি):</span>
              </div>
              <div className="flex flex-wrap gap-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                <span>সার্বিক জরুরি ও পুলিশ: <strong>১১২ (112)</strong></span>
                <span>অ্যাম্বুলেন্স ও স্বাস্থ্য: <strong>১১৮ (118)</strong></span>
                <span>ফায়ার সার্ভিস: <strong>১১৫ (115)</strong></span>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { cat: 'supermarket', title: '🛒 ১. সুপারমার্কেট ও কেনাকাটা' },
                { cat: 'hospital', title: '🏥 ২. হাসপাতাল ও চিকিৎসা' },
                { cat: 'transport', title: '🚌 ৩. যাতায়াত (বাস ও ট্রেন)' },
                { cat: 'workplace', title: '💼 ৪. কাজের জায়গা ও ফ্যাক্টরি' },
                { cat: 'emergency_legal', title: '🚨 ৫. জরুরি ও লিগ্যাল সহায়তা' },
              ].map((grp) => (
                <div key={grp.cat} className="space-y-2">
                  <h4 className="font-black text-sm text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    {grp.title}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                          <th className="py-2 px-3 w-4/12">ইতালিয়ান বাক্য (Frase)</th>
                          <th className="py-2 px-3 w-3/12">বাংলায় উচ্চারণ</th>
                          <th className="py-2 px-3 w-3/12">বাংলা অর্থ</th>
                          <th className="py-2 px-3 w-2/12">English</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                        {CATEGORIZED_PHRASES.filter((p) => p.category === grp.cat).map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                              {item.italian}
                            </td>
                            <td className="py-2 px-3 font-semibold text-emerald-700 dark:text-emerald-400">
                              {item.phonetic}
                            </td>
                            <td className="py-2 px-3 text-slate-700 dark:text-slate-300">
                              {item.bangla}
                            </td>
                            <td className="py-2 px-3 text-slate-500 dark:text-slate-400">
                              {item.english}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowCheatSheetModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট করুন (Print Cheat Sheet)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-emerald-500/50 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
