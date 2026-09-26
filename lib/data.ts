// Database and content repository for ইতালিপ্রবাসী ডটকম (Bangla-Italy Portal)

export interface PhraseItem {
  id: string;
  italian: string;
  phonetic: string;
  bangla: string;
  category: string;
  notes?: string;
  tags?: string[];
}

export interface LegalGuide {
  id: string;
  titleBn: string;
  titleIt: string;
  category: 'permesso' | 'spid' | 'embassy' | 'bonus' | 'driving' | 'citizenship';
  summary: string;
  badge: string;
  estimatedTime: string;
  requiredDocuments: string[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    tip?: string;
  }[];
  officialLinks?: { name: string; url: string }[];
  warningNote?: string;
}

export interface LetterTemplate {
  id: string;
  titleBn: string;
  titleIt: string;
  description: string;
  category: string;
  fields: {
    key: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
    type?: string;
  }[];
  generateContent: (data: Record<string, string>) => string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  category: 'caf' | 'grocery' | 'restaurant' | 'legal' | 'remittance' | 'mosque';
  city: 'Roma' | 'Milano' | 'Venezia' | 'Bologna' | 'Napoli' | 'Firenze' | 'Torino' | 'Palermo';
  address: string;
  phone: string;
  rating: number;
  services: string[];
  banglaStaff: boolean;
  hours?: string;
  googleMapQuery?: string;
}

export interface EmergencyContact {
  number: string;
  titleBn: string;
  titleIt: string;
  description: string;
  type: 'urgent' | 'embassy' | 'support';
  icon: string;
}

// 1. Emergency Hotlines
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    number: '112',
    titleBn: 'সাধারণ জরুরি সেবা / কারাবিনিয়েরি',
    titleIt: 'Numero Unico Europeo per le Emergenze (112)',
    description: 'যেকোনো বিপদে পুলিশ, কারাবিনিয়েরি বা সার্বিক নিরাপত্তার জন্য ২৪ ঘণ্টা ফ্রি কল।',
    type: 'urgent',
    icon: 'ShieldAlert',
  },
  {
    number: '118',
    titleBn: 'জরুরি অ্যাম্বুলেন্স ও মেডিকেল সেবা',
    titleIt: 'Soccorso Sanitario / Ambulanza (118)',
    description: 'গুরুতর অসুস্থতা, দুর্ঘটনা বা দ্রুত মেডিকেল চিকিৎসার জন্য জরুরি ফোন নম্বর।',
    type: 'urgent',
    icon: 'Ambulance',
  },
  {
    number: '115',
    titleBn: 'দমকল বাহিনী / ফায়ার সার্ভিস',
    titleIt: 'Vigili del Fuoco (115)',
    description: 'আগুন লাগা, গ্যাস লিক বা ভবনের জরুরি দুর্ঘটনার জন্য।',
    type: 'urgent',
    icon: 'Flame',
  },
  {
    number: '113',
    titleBn: 'ইতালিয়ান জাতীয় পুলিশ',
    titleIt: 'Polizia di Stato (113)',
    description: 'অপরাধ, পাসপোর্ট বা সরাসরি পুলিশ সহায়তা।',
    type: 'urgent',
    icon: 'Shield',
  },
  {
    number: '1522',
    titleBn: 'পারিবারিক সহিংসতা ও নারী সুরক্ষা হেল্পলাইন',
    titleIt: 'Numero Antiviolenza e Stalking (1522)',
    description: 'নারী নির্যাতন ও পারিবারিক সমস্যার সুরক্ষায় ফ্রি ২৪ ঘণ্টা বহুভাষিক হেল্পলাইন।',
    type: 'support',
    icon: 'HeartHandshake',
  },
  {
    number: '+39068078570',
    titleBn: 'বাংলাদেশ দূতাবাস, রোম',
    titleIt: 'Ambasciata del Bangladesh a Roma',
    description: 'পাসপোর্ট, ট্রাভেল পারমিট, এনআইডি ও কনস্যুলার হেল্পলাইন (সোম-শুক্র)।',
    type: 'embassy',
    icon: 'Building2',
  },
  {
    number: '+390287068580',
    titleBn: 'বাংলাদেশ কনস্যুলেট জেনারেল, মিলান',
    titleIt: 'Consolato Generale del Bangladesh a Milano',
    description: 'উত্তর ইতালির প্রবাসীদের জন্য পাসপোর্ট ও সব কনস্যুলার জরুরি সেবা।',
    type: 'embassy',
    icon: 'Building',
  },
];

// 2. Language Helper Phrases (Categorized)
export const ITALIAN_PHRASES: PhraseItem[] = [
  // Workplace (কর্মক্ষেত্র)
  {
    id: 'w1',
    italian: 'A che ora inizia il mio turno domani?',
    phonetic: 'আ কে ওরা ইনিসিয়া ইল মিও তুরনো দোমানি?',
    bangla: 'আগামীকাল আমার শিফট কয়টায় শুরু হবে?',
    category: 'কর্মক্ষেত্র ও চাকরি',
    notes: 'শিফটের সময় জানতে সুপারভাইজারকে বলুন',
  },
  {
    id: 'w2',
    italian: 'Ho finito questo lavoro, cosa devo fare adesso?',
    phonetic: 'ও ফিনিতো কুয়েস্তো লাভোরো, কোজা দেবো ফারে আদেসসো?',
    bangla: 'আমি এই কাজটি শেষ করেছি, এখন কী করতে হবে?',
    category: 'কর্মক্ষেত্র ও চাকরি',
  },
  {
    id: 'w3',
    italian: 'Non mi sento bene oggi, posso andare dal medico?',
    phonetic: 'নন মি সেন্তো বেনে অদজি, পসসো আন্দারে দাল মেদিকো?',
    bangla: 'আজ আমার শরীর ভালো লাগছে না, আমি কি ডাক্তারের কাছে যেতে পারি?',
    category: 'কর্মক্ষেত্র ও চাকরি',
  },
  {
    id: 'w4',
    italian: 'Quando viene pagata la busta paga questo mese?',
    phonetic: 'কুয়ান্তো ভিয়েনে পাগাঁতা লা বুস্তা পাগা কুয়েস্তো মেজে?',
    bangla: 'এই মাসে বুস্তা পাগা (বেতনের স্লিপ) কবে দেওয়া হবে?',
    category: 'কর্মক্ষেত্র ও চাকরি',
  },
  {
    id: 'w5',
    italian: 'Potrei richiedere le mie ferie per il mese prossimo?',
    phonetic: 'পোত্রেই রিকিয়েদেরে লে মিয়ে ফেরিয়ে পের ইল মেজে প্রসসিমো?',
    bangla: 'আমি কি আগামী মাসের জন্য ছুটির আবেদন করতে পারি?',
    category: 'কর্মক্ষেত্র ও চাকরি',
  },
  {
    id: 'w6',
    italian: 'C’è la pausa pranzo adesso?',
    phonetic: 'চে লা পাউজা প্রানসো আদেসসো?',
    bangla: 'এখন কি দুপুরের খাবারের বিরতি?',
    category: 'কর্মক্ষেত্র ও চাকরি',
  },

  // Supermarket & Shopping (সুপারমার্কেট)
  {
    id: 's1',
    italian: 'Dov’è il reparto dell’olio e della pasta?',
    phonetic: 'দোভ এ ইল রেপার্তো দেল ওলিও এ দেল্লা পাস্তা?',
    bangla: 'তেল ও পাস্তার সেকশনটি কোথায়?',
    category: 'সুপারমার্কেট ও কেনাকাটা',
  },
  {
    id: 's2',
    italian: 'Posso pagare con la carta o solo in contanti?',
    phonetic: 'পসসো পাগারে কন লা কার্তা ও সলো ইন কনতান্তি?',
    bangla: 'আমি কি কার্ড দিয়ে দিতে পারি নাকি শুধু ক্যাশ টাকা?',
    category: 'সুপারমার্কেট ও কেনাকাটা',
  },
  {
    id: 's3',
    italian: 'Quanto costa questo al chilo?',
    phonetic: 'কুয়ান্তো কোস্তা কুয়েস্তো আল কিলো?',
    bangla: 'এটির প্রতি কেজি কত দাম?',
    category: 'সুপারমার্কেট ও কেনাকাটা',
  },
  {
    id: 's4',
    italian: 'Mi fa lo scontrino, per favore?',
    phonetic: 'মি ফা লো স্কন্ত্রিনো, পের ফাভোরে?',
    bangla: 'দয়া করে আমাকে ক্রয়ের রসিদ (বিল মেমো) দেবেন?',
    category: 'সুপারমার্কেট ও কেনাকাটা',
  },
  {
    id: 's5',
    italian: 'Avete una busta/sacchetto, per favore?',
    phonetic: 'আভেতে উনা বুস্তা / সাক্কেত্তো, পের ফাভোরে?',
    bangla: 'আপনাদের কাছে কি কোনো শপিং ব্যাগ হবে?',
    category: 'সুপারমার্কেট ও কেনাকাটা',
  },
  {
    id: 's6',
    italian: 'Questo prodotto è senza maiale / senza strutto?',
    phonetic: 'কুয়েস্তো প্রদোত্তো এ সেনসা মায়ালে / সেনসা স্ত্রুত্তো?',
    bangla: 'এই খাবারে কি শূকরের মাংস বা চর্বি নেই তো?',
    category: 'সুপারমার্কেট ও কেনাকাটা',
    notes: 'হালাল খাবার নিশ্চিত করতে অত্যন্ত দরকারী প্রশ্ন',
  },

  // Hospital & Health (হাসপাতাল ও ডাক্তার)
  {
    id: 'h1',
    italian: 'Ho un forte dolore alla testa e allo stomaco.',
    phonetic: 'ও উন ফোরতে দোলোরে আল্লা তেস্তা এ আল্লো স্তোমাকো।',
    bangla: 'আমার মাথায় ও পেটে প্রচণ্ড ব্যথা হচ্ছে।',
    category: 'হাসপাতাল ও ডাক্তার',
  },
  {
    id: 'h2',
    italian: 'Vorrei prenotare una visita con il medico di base.',
    phonetic: 'ভোররেই প্রেনোতারে উনা ভিজিটা কন ইল মেদিকো দি বাজে।',
    bangla: 'আমি ফ্যামিলি ডাক্তারের সাথে একটি অ্যাপয়েন্টমেন্ট বুক করতে চাই।',
    category: 'হাসপাতাল ও ডাক্তার',
  },
  {
    id: 'h3',
    italian: 'Ho la tessera sanitaria scaduta, come posso rinnovarla?',
    phonetic: 'ও লা তেসসেরা সানিটারিয়া স্কাদুতা, কোমে পসসো রিন্নোভারলা?',
    bangla: 'আমার হেলথ কার্ডের মেয়াদ শেষ, কীভাবে নবায়ন করব?',
    category: 'হাসপাতাল ও ডাক্তার',
  },
  {
    id: 'h4',
    italian: 'Dov’è il Pronto Soccorso più vicino?',
    phonetic: 'দোভ এ ইল প্রন্তো সোক্কোরসো পিউ ভিচিনো?',
    bangla: 'নিকটতম জরুরি বিভাগ (ইমার্জেন্সি) কোথায়?',
    category: 'হাসপাতাল ও ডাক্তার',
  },
  {
    id: 'h5',
    italian: 'Quante volte al giorno devo prendere questa medicina?',
    phonetic: 'কুয়ান্তে ভোলতে আল জোরনো দেবো প্রেন্দেরে কুয়েস্তা মেদিচিনা?',
    bangla: 'দিনে কতবার আমাকে এই ওষুধটি খেতে হবে?',
    category: 'হাসপাতাল ও ডাক্তার',
  },

  // Transport & City Travel (যাতায়াত ও ট্রান্সপোর্ট)
  {
    id: 't1',
    italian: 'Dove posso comprare il biglietto dell’autobus o della metro?',
    phonetic: 'দোভ পসসো কম্পরারে ইল বিলিয়েত্তো দেল আউতোবুস ও দেল্লা মেত্রো?',
    bangla: 'বাস বা মেট্রোর টিকিট আমি কোথায় কিনতে পারব?',
    category: 'যাতায়াত ও ট্রান্সপোর্ট',
  },
  {
    id: 't2',
    italian: 'Questo treno va a Roma Termini / Milano Centrale?',
    phonetic: 'কুয়েস্তো ত্রেনো ভা আ রোমা তেরমিনি / মিলানো চেন্ত্রালে?',
    bangla: 'এই ট্রেনটি কি রোমা তেরমিনি / মিলানো সেন্ট্রালে যায়?',
    category: 'যাতায়াত ও ট্রান্সপোর্ট',
  },
  {
    id: 't3',
    italian: 'Da quale binario parte il treno?',
    phonetic: 'দা কুয়ালে বিনারিও পারতে ইল ত্রেনো?',
    bangla: 'ট্রেনটি কত নম্বর প্ল্যাটফর্ম থেকে ছাড়বে?',
    category: 'যাতায়াত ও ট্রান্সপোর্ট',
  },
  {
    id: 't4',
    italian: 'Come posso fare l’abbonamento mensile?',
    phonetic: 'কোমে পসসো ফারে ল আব্বোনামেন্তো মেনসিলে?',
    bangla: 'মাসিক যাতায়াত পাস (মান্থলি কার্ড) কীভাবে বানাবো?',
    category: 'যাতায়াত ও ট্রান্সপোর্ট',
  },

  // Questura, Post Office & Permesso (কুয়েস্তুরা ও পোস্ট অফিস)
  {
    id: 'q1',
    italian: 'Vorrei spedire il kit postale per il rinnovo del permesso.',
    phonetic: 'ভোররেই স্পেদিরেই ইল কিট পোস্তালে পের ইল রিন্নোভো দেল পারমেসো।',
    bangla: 'আমি পারমেসো রিনিউয়ের জন্য কিট পোস্টাল জমা দিতে চাই।',
    category: 'কুয়েস্তুরা ও পোস্ট অফিস',
  },
  {
    id: 'q2',
    italian: 'Ho l’appuntamento oggi alle dieci per le impronte digitali.',
    phonetic: 'ও ল আপ্পুন্তামেন্তো অদজি আল্লে দিয়েচি পের লে ইমপ্রন্তে দিজিতালি।',
    bangla: 'আজ সকাল ১০টায় আমার ফিঙ্গারপ্রিন্টের জন্য অ্যাপয়েন্টমেন্ট আছে।',
    category: 'কুয়েস্তুরা ও পোস্ট অফিস',
  },
  {
    id: 'q3',
    italian: 'Posso viaggiare in Bangladesh con la ricevuta postale (ricettina)?',
    phonetic: 'পসসো ভিয়াজ্জারে ইন বাংলাদেশ কন লা রিচেভুতা পোস্তালে (রিচেত্তিনা)?',
    bangla: 'পোস্ট অফিসের রসিদ (রিচেত্তিনা) দিয়ে কি বাংলাদেশে যাওয়া যাবে?',
    category: 'কুয়েস্তুরা ও পোস্ট অফিস',
    notes: 'ডিরেক্ট ফ্লাইটে যাওয়া বৈধ, কোনো শেঞ্জেন দেশে ট্রানজিট নেওয়া যাবে না',
  },
  {
    id: 'q4',
    italian: 'Manca qualche documento per completare la pratica?',
    phonetic: 'মাংকা কুয়ালকে দকুমেন্তো পের কম্প্লেতারে লা প্রাতিকা?',
    bangla: 'আবেদনটি সম্পন্ন করতে কোনো কাগজ কি বাকি আছে?',
    category: 'কুয়েস্তুরা ও পোস্ট অফিস',
  },

  // Housing & Rent (বাসা ভাড়া ও বাড়িওয়ালা)
  {
    id: 'r1',
    italian: 'Sto cercando una stanza singola / un monolocale in affitto.',
    phonetic: 'স্তো চেরকান্দো উনা স্তানসা সিঙ্গোলা / উন মোনোলোকালে ইন আফফিত্তো।',
    bangla: 'আমি একটি সিঙ্গেল রুম / ওয়ান রুম বাসা ভাড়ার জন্য খুঁজছি।',
    category: 'বাসা ভাড়া ও বাড়িওয়ালা',
  },
  {
    id: 'r2',
    italian: 'Le spese condominiali e le bollette sono incluse nel prezzo?',
    phonetic: 'লে স্পেজে কনদোমিনিয়ালি এ লে বল্লেত্তে সোনো ইনক্লুজে নেল প্রেতসো?',
    bangla: 'বিল ও কন্দোমিনিয়াম খরচ কি ভাড়ার ভেতর অন্তর্ভুক্ত?',
    category: 'বাসা ভাড়া ও বাড়িওয়ালা',
  },
  {
    id: 'r3',
    italian: 'È possibile fare il contratto regolare con la residenza?',
    phonetic: 'এ পসসিবিলে ফারে ইল কনত্রাত্তো রেগোলেরে কন লা রেজিদেনসা?',
    bangla: 'রেজিদেনসাসহ কি অফিসিয়াল চুক্তিপত্র করা সম্ভব?',
    category: 'বাসা ভাড়া ও বাড়িওয়ালা',
  },
  {
    id: 'r4',
    italian: 'Il riscaldamento / l’acqua calda non funziona bene.',
    phonetic: 'ইল রিস্কালদামেন্তো / ল আক্কুয়া কালদা নন ফুনসিওনা বেনে।',
    bangla: 'হিটার / গরম পানির লাইন ঠিকমতো কাজ করছে না।',
    category: 'বাসা ভাড়া ও বাড়িওয়ালা',
  },

  // Common Greetings & Essential (সম্ভাষণ ও প্রাত্যহিক)
  {
    id: 'c1',
    italian: 'Buongiorno! Come sta?',
    phonetic: 'বুওনজোরনো! কোমে স্তা?',
    bangla: 'শুভ সকাল / নমস্কার! আপনি কেমন আছেন?',
    category: 'প্রাত্যহিক সাধারণ কথা',
  },
  {
    id: 'c2',
    italian: 'Grazie mille per l’aiuto!',
    phonetic: 'গ্রাৎসিয়ে মিল্লে পের ল আইউতো!',
    bangla: 'সাহায্যের জন্য আপনাকে অনেক ধন্যবাদ!',
    category: 'প্রাত্যহিক সাধারণ কথা',
  },
  {
    id: 'c3',
    italian: 'Scusi, non parlo bene l’italiano. Può ripetere piano?',
    phonetic: 'স্কুজি, নন পারলো বেনে ল ইতালিয়ানো। পুও রিপেতেরে পিআনো?',
    bangla: 'মাফ করবেন, আমি ভালো ইতালিয়ান পারি না। দয়া করে একটু আস্তে বলবেন?',
    category: 'প্রাত্যহিক সাধারণ কথা',
  },
  {
    id: 'c4',
    italian: 'Piacere di conoscerti!',
    phonetic: 'পিয়াচের দে কোনশের্তি!',
    bangla: 'আপনার সাথে পরিচিত হয়ে ভালো লাগল!',
    category: 'প্রাত্যহিক সাধারণ কথা',
  },
];

// 3. Detailed Legal Guides & Step-by-Step Instructions
export const LEGAL_GUIDES: LegalGuide[] = [
  {
    id: 'permesso-renewal',
    titleBn: 'পারমেসো দি সোজ্জোর্নো রিনিউ করার সহজ নিয়ম',
    titleIt: 'Rinnovo del Permesso di Soggiorno (Kit Postale)',
    category: 'permesso',
    badge: 'সবচেয়ে গুরুত্বপূর্ণ',
    estimatedTime: 'মেয়াদ শেষ হওয়ার ৬০ দিন আগে শুরু করুন',
    summary: 'ইতালিতে বৈধভাবে বসবাসের কার্ড (Permesso di Soggiorno) নবায়ন করার ধাপ, প্রয়োজনীয় ডকুমেন্টস, পোস্ট অফিসে কিট জমা ও ফিঙ্গারপ্রিন্টের সার্বিক গাইড।',
    requiredDocuments: [
      'পাসপোর্টের সকল পেজের ফটোকপি (মূল পাসপোর্টসহ)',
      'পুরোনো পারমেসো দি সোজ্জোর্নোর ফটোকপি',
      'কোদিচে ফিস্কালে (Codice Fiscale) কপি',
      'বাসার রেসিডেন্স সার্টিফিকেট (Certificato di Residenza) বা হসপিটালিটি ডিক্লারেশন',
      'সর্বশেষ ৩ মাসের বেতনের স্লিপ (Ultima 3 Buste Paga)',
      'কন্ট্রাক্ট অফ ওয়ার্ক বা ইউনিকো/CUD (CUD / Modello Unico)',
      '১৬ ইউরোর রেভিনিউ স্ট্যাম্প (Marca da bollo da 16,00€)',
      'পোস্ট অফিসের হলুদ ও নীল ফর্ম (Modulo 1 & Modulo 2 if self-employed)',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sportello Amico যুক্ত পোস্ট অফিস থেকে ফ্রি কিট (Kit Giallo) সংগ্রহ করুন',
        description: 'যেকোনো পোস্ট অফিসের স্পোর্টেল্লো আমিকো কাউন্টার থেকে বিনামূল্যে পারমেসো রিনিউয়ের হলুদ এনভেলাপ ও ফর্ম (Modulo 1) নিন।',
        tip: 'ফর্ম পূরণে ভুল হলে বা কাটাকাটি হলে নতুন আরেকটি ফর্ম পোস্ট অফিস থেকে চেয়ে নিতে পারবেন।',
      },
      {
        stepNumber: 2,
        title: 'কালো কালির কলম দিয়ে বড় হাতের অক্ষরে (Capital Letters) ফর্ম পূরণ',
        description: 'Modulo 1 এ আপনার ব্যক্তিগত তথ্য, পাসপোর্ট নম্বর, ঠিকানা ও বর্তমান নিয়োগকর্তার নাম ও পারতিথা ইভা লিখুন। ১৬ ইউরোর মারকা দা বল্লো ফর্মে সেঁটে দিন।',
      },
      {
        stepNumber: 3,
        title: 'পোস্ট অফিসে কিট ও ডকুমেন্টস জমা দেওয়া এবং ফি প্রদান',
        description: 'পোস্ট অফিসে গিয়ে এনভেলাপটি খোলা অবস্থায় দিন। কর্মকর্তা সব চেক করে সিল মেরে বন্ধ করবেন। আনুমানিক ৩০.৪৬ ইউরো পোস্টাল ফি + ৭০.৪৬/৮০.৪৬ ইউরো কার্ড ফি পে করবেন।',
      },
      {
        stepNumber: 4,
        title: 'রসিদ (Ricettina) ও অ্যাপয়েন্টমেন্ট পেপার যত্ন করে রাখা',
        description: 'পোস্ট অফিস আপনাকে ইউজার আইডি ও পাসওয়ার্ডযুক্ত একটি বড় রসিদ দেবে। এই রসিদ দিয়ে অনলাইনে (portaleimmigrazione.it বা poliziadistato.it) স্ট্যাটাস চেক করা যায়।',
        tip: 'মনে রাখবেন: রিচেত্তিনা থাকলে ডিরেক্ট ফ্লাইটে বাংলাদেশ যাওয়া যায়, তবে দুবাই/কাতার/ইস্তাম্বুল ট্রানজিট অনুমোদিত হলেও কোনো ইউরোপীয় ইউনিয়নের দেশে স্টপওভার করা যায় না।',
      },
      {
        stepNumber: 5,
        title: 'কুয়েস্তুরায় (Questura) হাজির হয়ে ফিঙ্গারপ্রিন্ট দেওয়া',
        description: 'চিঠিতে উল্লেখিত নির্দিষ্ট দিন ও সময়ে মূল পাসপোর্ট, মূল পারমেসো, ৪ কপি পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড) নিয়ে হাজির হন।',
      },
    ],
    officialLinks: [
      { name: 'Portale Immigrazione (স্ট্যাটাস চেক)', url: 'https://www.portaleimmigrazione.it/' },
      { name: 'Polizia di Stato (পারমেসো রেডিনেস চেক)', url: 'https://questure.poliziadistato.it/stranieri/' },
    ],
    warningNote: 'দালাল চক্রকে টাকা দিয়ে মিথ্যা কন্ট্রাক্ট বানাবেন না। ভুয়া কাগজের কারণে পারমেসো বাতিল ও ডিপোর্টেশনের ঝুঁকি থাকে।',
  },
  {
    id: 'spid-codice-fiscale',
    titleBn: 'কোদিচে ফিস্কালে ও SPID (ডিজিটাল আইডি) তৈরির নিয়ম',
    titleIt: 'Guida Codice Fiscale & SPID (PosteID / Lepida)',
    category: 'spid',
    badge: 'ডিজিটাল ইতালি',
    estimatedTime: '১ থেকে ৩ কর্মদিবস',
    summary: 'ইতালিতে ব্যাংক একাউন্ট, ট্যাক্স, ইনপস (INPS), পারমেসো স্ট্যাটাস ও সরকারি সকল সুবিধা পাওয়ার জন্য কোদিচে ফিস্কালে ও স্পিড আবশ্যক।',
    requiredDocuments: [
      'বৈধ পাসপোর্ট বা ইতালিয়ান জাতীয় পরিচয়পত্র (Carta d\'Identità)',
      'কোদিচে ফিস্কালে অরিজিনাল কার্ড বা সার্টিফিকেট',
      'একটি কার্যকর ইতালিয়ান মোবাইল নম্বর (+39)',
      'ব্যক্তিগত সচল ইমেইল অ্যাড্রেস',
      'বৈধ পারমেসো দি সোজ্জোর্নো বা রিনিউ রসিদ',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'কোদিচে ফিস্কালে সংগ্রহ (Agenzia delle Entrate)',
        description: 'নিকটস্থ Agenzia delle Entrate অফিসে পাসপোর্ট ও ভিসা নিয়ে গিয়ে Modello AA4/8 ফর্ম পূরণ করে সরাসরি ফ্রিতে কোদিচে ফিস্কালে কার্ড/পেপার পেয়ে যাবেন।',
      },
      {
        stepNumber: 2,
        title: 'পোস্ট অফিসে PosteID SPID আবেদন শুরু',
        description: 'posteid.poste.it ওয়েবসাইটে গিয়ে আপনার নাম, ইমেইল, ফোন ও কোদিচে ফিস্কালে দিয়ে ফর্ম সাবমিট করুন।',
      },
      {
        stepNumber: 3,
        title: 'পোস্ট অফিসে স্বশরীরে পরিচয় যাচাই (Riconoscimento di Persona)',
        description: 'অনলাইন রেজিস্ট্রেশনের পর আপনার কোড নিয়ে নিকটস্থ পোস্ট অফিসে যান। কর্মকর্তা আপনার পরিচয়পত্র দেখে স্পিড অ্যাক্টিভ করে দেবেন।',
        tip: 'আপনার যদি ইলেক্ট্রনিক আইডি কার্ড (CIE) এবং NFC সাপোর্টেড স্মার্টফোন থাকে, তবে ঘরে বসেই কোনো অফিসে না গিয়ে সাথে সাথে স্পিড চালু করা যায়।',
      },
      {
        stepNumber: 4,
        title: 'PosteID অ্যাপ ডাউনলোড ও লেভেল-২ সিকিউরিটি পিন সেট',
        description: 'স্মার্টফোনে PosteID অ্যাপ ইনস্টল করে ৬ ডিজিটের স্পিড কোড সেট করুন। এর মাধ্যমে INPS, Agenzia Entrate ও যেকোনো ওয়েবসাইটে লগইন করতে পারবেন।',
      },
    ],
    officialLinks: [
      { name: 'PosteID SPID রেজিস্ট্রেশন', url: 'https://posteid.poste.it/' },
      { name: 'Agenzia delle Entrate', url: 'https://www.agenziaentrate.gov.it/' },
      { name: 'INPS অনলাইন পোর্টাল', url: 'https://www.inps.it/' },
    ],
  },
  {
    id: 'embassy-consulate-services',
    titleBn: 'বাংলাদেশ দূতাবাস রোম ও কনস্যুলেট মিলান সেবা গাইড',
    titleIt: 'Servizi Consolari Ambasciata Roma e Consolato Milano',
    category: 'embassy',
    badge: 'কনস্যুলার গাইড',
    estimatedTime: 'অনলাইন অ্যাপয়েন্টমেন্ট প্রয়োজন',
    summary: 'ই-পাসপোর্ট রি-ইস্যু, পাওয়ার অব অ্যাটর্নি (আমমোক্তারনামা), এনআইডি কার্ড, জন্মনিবন্ধন ও ড্রাইভিং লাইসেন্স ভেরিফিকেশন নিয়মাবলী।',
    requiredDocuments: [
      'অনলাইন পূরণকৃত আবেদন ফর্মের প্রিন্ট কপি',
      'বর্তমান মূল পাসপোর্ট ও পাসপোর্টের ফটোকপি',
      'জাতীয় পরিচয়পত্র (NID) অথবা অনলাইন জন্ম নিবন্ধন সনদ (১৭ ডিজিট)',
      'পাসপোর্ট সাইজ ছবি (ল্যাব প্রিন্ট)',
      'ইতালির পারমেসো বা স্টে পারমিটের ফটোকপি',
      'ব্যাংক বা পোস্ট অফিসের মাধ্যমে পরিশোধিত ফি রসিদ',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'অনলাইনে ই-পাসপোর্ট আবেদন ও অ্যাপয়েন্টমেন্ট বুকিং',
        description: 'epassport.gov.bd ওয়েবসাইটে গিয়ে ইতালিতে বাংলাদেশ মিশন সিলেক্ট করে ফর্ম পূরণ করুন এবং অ্যাপয়েন্টমেন্ট স্লট নিন।',
      },
      {
        stepNumber: 2,
        title: 'দূতাবাস বা কনস্যুলেটের নির্ধারিত একাউন্টে ফি প্রদান',
        description: 'অর্ডিনারি বা এক্সপ্রেস ডেলিভারি ক্যাটাগরি অনুযায়ী পোস্টাল বোলেত্তিনো বা ব্যাংক ট্রানস্ফার (Bonifico) এর মাধ্যমে সঠিক ফি দিন।',
      },
      {
        stepNumber: 3,
        title: 'বায়োমেট্রিক ও ছবি তোলার জন্য দূতাবাসে উপস্থিতি',
        description: 'নির্দিষ্ট দিনে সকালের স্লটে রোম দূতাবাস বা মিলান কনস্যুলেটে হাজির হয়ে মূল কাগজপত্র জমা দিন এবং চোখের আইরিশ ও ফিঙ্গারপ্রিন্ট দিন।',
      },
      {
        stepNumber: 4,
        title: 'পাসপোর্ট ডেলিভারি ও রিসিট ট্র্যাকিং',
        description: 'সাধারণত ২১ থেকে ৩০ কর্মদিবসের মধ্যে নতুন ই-পাসপোর্ট প্রস্তুত হয়। ডেলিভারি স্লিপ নিয়ে সরাসরি বা কুরিয়ারে সংগ্রহ করা যায়।',
      },
    ],
    officialLinks: [
      { name: 'বাংলাদেশ দূতাবাস রোম অফিশিয়াল সাইট', url: 'https://rome.mofa.gov.bd/' },
      { name: 'বাংলাদেশ কনস্যুলেট জেনারেল মিলান', url: 'https://milan.mofa.gov.bd/' },
      { name: 'ই-পাসপোর্ট অনলাইন পোর্টাল', url: 'https://www.epassport.gov.bd/' },
    ],
  },
  {
    id: 'assegno-unico-bonus',
    titleBn: 'আসেঞো উনিচো (Assegno Unico) ও ফ্যামিলি বোনাস পাওয়ার নিয়ম',
    titleIt: 'Guida Assegno Unico Universale & Bonus Famiglia',
    category: 'bonus',
    badge: 'সরকারি ভাতা',
    estimatedTime: 'প্রতি বছর জানুয়ারি-মার্চে ISEE রিনিউ করুন',
    summary: 'ইতালিতে সন্তানদের জন্য সরকার প্রদত্ত মাসিক শিশু ভাতা (সন্তান প্রতি মাসে ৫০ থেকে ২০০ ইউরো পর্যন্ত) পাওয়ার আবেদন পদ্ধতি।',
    requiredDocuments: [
      'পরিবারের নতুন বছরের ISEE সার্টিফিকেট (CAF থেকে ফ্রি তৈরি)',
      'বাবা ও মা উভয়ের বৈধ পারমেসো দি সোজ্জোর্নো',
      'সন্তানের ইতালিয়ান কোদিচে ফিস্কালে ও হেলথ কার্ড',
      'ইতালিয়ান ব্যাংক একাউন্টের IBAN নম্বর (যেখানে টাকা ঢুকবে)',
      'বাসার রেসিডেন্স ডকুমেন্টস',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'CAF বা Patronato অফিসে গিয়ে ISEE তৈরি করুন',
        description: 'গত ২ বছরের ইনকাম ট্যাক্স (CUD), ব্যাংক ব্যালেন্সের বাৎসরিক বিবরণী (Giacenza media) ও বাড়ি ভাড়ার চুক্তি নিয়ে CAF এ ফ্রি ISEE বানিয়ে নিন।',
      },
      {
        stepNumber: 2,
        title: 'INPS পোর্টালে SPID দিয়ে লগইন করে আবেদন জমা',
        description: 'আপনি নিজেই INPS অ্যাপ বা CAF এর সহায়তায় Assegno Unico Universale সেকশনে গিয়ে সন্তানের তথ্য ও IBAN দিয়ে আবেদন করুন।',
      },
      {
        stepNumber: 3,
        title: 'মাসিক কিস্তিতে একাউন্টে অর্থ জমা হওয়া',
        description: 'আবেদন অনুমোদনের পর প্রতি মাসের ১৮ থেকে ২৭ তারিখের মধ্যে সরাসরি আপনার ইতালিয়ান ব্যাংক একাউন্টে ভাতার টাকা জমা হবে।',
      },
    ],
    officialLinks: [
      { name: 'INPS Assegno Unico গাইড', url: 'https://www.inps.it/it/it/dettaglio-scheda.scheda-servizio.55842.assegno-unico-e-universale-per-i-figli-a-carico.html' },
    ],
  },
  {
    id: 'driving-license-patente',
    titleBn: 'ইতালিয়ান ড্রাইভিং লাইসেন্স (Patente B) অর্জন গাইড',
    titleIt: 'Come prendere la Patente di Guida B in Italia',
    category: 'driving',
    badge: 'ড্রাইভিং ক্যারিয়ার',
    estimatedTime: '৩ থেকে ৬ মাস প্রস্তুতি',
    summary: 'ইতালিতে ড্রাইভিং লাইসেন্স (Patente B) পাওয়ার জন্য থিওরি পরীক্ষা, মেডিকেল টেস্ট ও প্র্যাকটিক্যাল ড্রাইভ পাস করার পূর্ণাঙ্গ দিকনির্দেশনা।',
    requiredDocuments: [
      'বৈধ পারমেসো দি সোজ্জোর্নো বা রিনিউ রসিদ',
      'জাতীয় পরিচয়পত্র (Carta d\'Identità) ও কোদিচে ফিস্কালে',
      'মেডিকেল সার্টিফিকেট (Certificato medico anamnestico)',
      '৩ কপি পাসপোর্ট সাইজ ছবি',
      'মটরিজ্জাজিওনে সিভিলে (Motorizzazione) ফি',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'অটোস্কুলায় (Autoscuola) ভর্তি অথবা প্রাইভেট আবেদন (Da Privatista)',
        description: 'খরচ বাঁচাতে চাইলে Privatista হিসেবে সরাসরি Motorizzazione এ ফরম জমা দিতে পারেন, অথবা নির্ভরযোগ্য Autoscuola এ ভর্তি হতে পারেন।',
      },
      {
        stepNumber: 2,
        title: 'থিওরি পরীক্ষার জন্য ইতালিয়ান ভোকাবুলারি ও কুইজ প্রস্তুতি',
        description: 'কম্পিউটারে ৩০টি ট্রু/ফলস (Vero/Falso) প্রশ্ন থাকবে। ৩০ মিনিটে সর্বোচ্চ ৩টি ভুলের মধ্যে পরীক্ষা পাস করতে হবে।',
        tip: 'বাংলায় অর্থসহ ইতালিয়ান ড্রাইভিং পরিভাষাগুলো বারবার মুখস্থ করুন এবং দিনে অন্তত ৫টি টেস্ট কুইজ দিন।',
      },
      {
        stepNumber: 3,
        title: 'পিংক পেপার (Foglio Rosa) ও প্র্যাকটিক্যাল ড্রাইভ অনুশীলন',
        description: 'থিওরি পাসের পর ৬ মাসের জন্য ফোলিও রোজা পাবেন। কমপক্ষে ৬ ঘণ্টার বাধ্যতামূলক গাইড ড্রাইভ (রাত ও হাইওয়েসহ) সম্পন্ন করতে হবে।',
      },
      {
        stepNumber: 4,
        title: 'চূড়ান্ত প্র্যাকটিক্যাল পরীক্ষা ও লাইসেন্স গ্রহণ',
        description: 'পরীক্ষকের সামনে পার্কিং, গোলচত্বর ও হাইওয়েতে সফলভাবে ড্রাইভ করে সেদিনই হাতে পেয়ে যাবেন প্লাস্টিক ড্রাইভিং লাইসেন্স কার্ড।',
      },
    ],
  },
  {
    id: 'citizenship-permanent-residence',
    titleBn: 'ইতালির নাগরিকত্ব ও দীর্ঘমেয়াদি পারমেসো (Carta di Soggiorno)',
    titleIt: 'Cittadinanza Italiana & Permesso UE Soggiornanti Lungo Periodo',
    category: 'citizenship',
    badge: 'স্থায়ী ভবিষ্যৎ',
    estimatedTime: '১০ বছর রেসিডেন্স (নাগরিকত্ব) / ৫ বছর (কার্তা)',
    summary: 'ইতালির পাসপোর্ট এবং স্থায়ী বসবাস কার্ড পাওয়ার আবশ্যক শর্তাবলী, ভাষা টেস্ট ও পুলিশ ক্লিয়ারেন্স সংক্রান্ত তথ্য।',
    requiredDocuments: [
      'ধারাবাহিক ১০ বছরের রেসিডেন্সের রেকর্ড (নাগরিকত্বের জন্য) / ৫ বছর (কার্তার জন্য)',
      'ইতালিয়ান ভাষা পারদর্শিতা সার্টিফিকেট (কমপক্ষে B1 লেভেল)',
      'গত ৩ বছরের পর্যাপ্ত বাৎসরিক আয় (Modello CUD / 730 / Unico)',
      'বাংলাদেশ থেকে সত্যায়িত জন্মনিবন্ধন সনদ ও পুলিশ ক্লিয়ারেন্স (ইতালিয়ান অনুবাদ ও লিগালাইজড)',
      'আবেদন ফি (২৫০ ইউরো বোলেত্তিনো)',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'B1 ভাষা টেস্ট সার্টিফিকেট অর্জন (CILS / CELI / PLIDA)',
        description: 'অনুমোদিত বিশ্ববিদ্যালয় বা সেন্টার থেকে B1 স্তরের ইতালিয়ান ভাষা পরীক্ষায় উত্তীর্ণ হতে হবে।',
      },
      {
        stepNumber: 2,
        title: 'বাংলাদেশি কাগজপত্রের লিগালাইজেশন ও অনুবাদ',
        description: 'বাংলাদেশের পররাষ্ট্র মন্ত্রণালয়, ইতালি দূতাবাস কর্তৃক লিগালাইজড জন্মনিবন্ধন ও পুলিশ ছাড়পত্র সংগ্রহ করুন।',
      },
      {
        stepNumber: 3,
        title: 'স্বরাষ্ট্র মন্ত্রণালয়ের পোর্টালে (Ministero dell\'Interno) অনলাইন আবেদন',
        description: 'SPID দিয়ে লগইন করে সমস্ত ডকুমেন্টস আপলোড করুন এবং ট্র্যাকিং কোড (K10 কোড) সংগ্রহ করুন।',
      },
    ],
    officialLinks: [
      { name: 'Ministero dell\'Interno সিটিজেনশিপ পোর্টাল', url: 'https://portaleservizi.dlci.interno.it/' },
    ],
  },
];

// 4. Downloadable & Copyable Italian Letter & Application Templates
export const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: 'disdetta-affitto',
    titleBn: 'বাসা ছাড়ার নোটিস (Disdetta Contratto di Locazione)',
    titleIt: 'Lettera di Disdetta del Contratto di Locazione ad Uso Abitativo',
    description: 'বাড়িওয়ালাকে ৩ বা ৬ মাস আগে বাসা ছাড়ার আনুষ্ঠানিক চিঠি পাঠাতে এটি ব্যবহার করুন। রেজিস্টার্ড চিঠি (Raccomandata A/R) বা PEC এ পাঠানো নিয়ম।',
    category: 'বাসা ভাড়া',
    fields: [
      { key: 'tenantName', label: 'আপনার পূর্ণ নাম (Nome e Cognome)', placeholder: 'Md Rahman' },
      { key: 'tenantAddress', label: 'বাসার বর্তমান ঠিকানা (Indirizzo Immobile)', placeholder: 'Via Roma 12, 00185 Roma (RM)' },
      { key: 'tenantPhone', label: 'ফোন নম্বর (Telefono)', placeholder: '+39 320 1234567' },
      { key: 'landlordName', label: 'বাড়িওয়ালার নাম (Nome del Proprietario)', placeholder: 'Sig. Mario Rossi' },
      { key: 'contractDate', label: 'চুক্তির তারিখ (Data del Contratto)', placeholder: '15/03/2022' },
      { key: 'exitDate', label: 'বাসা ত্যাগের তারিখ (Data di Rilascio Immobile)', placeholder: '31/12/2026' },
      { key: 'city', label: 'শহরের নাম ও আজকের তারিখ (Città e Data)', placeholder: 'Roma, 26/09/2026' },
    ],
    generateContent: (d) => `Raccomandata A/R (o via PEC)

Mittente:
${d.tenantName || '[Nome del Conduttore]'}
${d.tenantAddress || '[Indirizzo]'}
Tel: ${d.tenantPhone || '[Telefono]'}

Destinatario:
${d.landlordName || '[Nome del Locatore / Proprietario]'}

Luogo e Data: ${d.city || 'Roma, 26/09/2026'}

OGGETTO: Disdetta del contratto di locazione ad uso abitativo relativo all'immobile sito in ${d.tenantAddress || '[Indirizzo Immobile]'}.

Egregio/Gentile ${d.landlordName || 'Locatore'},

Con la presente Le comunico formalmente la mia intenzione di recedere anticipatamente dal contratto di locazione stipulato in data ${d.contractDate || '[Data Contratto]'}, relativo all'appartamento sito in ${d.tenantAddress || '[Indirizzo Immobile]'}.

Pertanto, nel pieno rispetto dei termini di preavviso previsti dalle clausole contrattuali e dalla normativa vigente (Art. 3, L. 431/1998 e Art. 4, L. 392/1978), l'immobile verrà riconsegnato libero da persone e cose entro e non oltre la data del:

${d.exitDate || '[Data Rilascio Immobile]'}.

Resto a Sua completa disposizione per concordare un appuntamento nei giorni precedenti il rilascio, al fine di verificare lo stato dell'immobile, redigere il verbale di riconsegna delle chiavi e procedere alla restituzione del deposito cauzionale a suo tempo versato.

RingraziandoLa per la consueta disponibilità e collaborazione, porgo cordiali saluti.

Firma del Conduttore:

___________________________
(${d.tenantName || 'Md Rahman'})`,
  },
  {
    id: 'dimissioni-volontarie',
    titleBn: 'চাকরি ছাড়ার পদত্যাগপত্র (Preavviso di Dimissioni)',
    titleIt: 'Comunicazione di Dimissioni Volontarie e Rispetto del Preavviso',
    description: 'মালিক বা কোম্পানিকে পদত্যাগের নোটিস জানাতে এই চিঠি দিন। মনে রাখবেন, অফিসিয়ালভাবে INPS পোর্টালে SPID দিয়ে Dimissioni Telematiche সাবমিট করা বাধ্যতামূলক।',
    category: 'কর্মক্ষেত্র',
    fields: [
      { key: 'workerName', label: 'আপনার নাম (Nome Lavoratore)', placeholder: 'Md Hossain' },
      { key: 'workerCF', label: 'আপনার কোদিচে ফিস্কালে (Codice Fiscale)', placeholder: 'HSSMDD85C10Z249A' },
      { key: 'companyName', label: 'কোম্পানি বা মালিকের নাম (Azienda / Datore)', placeholder: 'Ristorante Da Mario S.r.l.' },
      { key: 'lastDay', label: 'কাজের শেষ কর্মদিবস (Ultimo Giorno Lavorativo)', placeholder: '15/10/2026' },
      { key: 'city', label: 'শহর ও তারিখ', placeholder: 'Milano, 26/09/2026' },
    ],
    generateContent: (d) => `Spettabile Azienda:
${d.companyName || '[Nome Azienda / Datore di Lavoro]'}

Luogo e Data: ${d.city || 'Milano, 26/09/2026'}

OGGETTO: Comunicazione formale di dimissioni volontarie.

Io sottoscritto/a ${d.workerName || '[Nome e Cognome]'}, nato/a in Bangladesh, Codice Fiscale: ${d.workerCF || '[Codice Fiscale]'}, attualmente assunto/a presso la Vostra spettabile azienda con la mansione di lavoratore subordinato;

Con la presente intendo rassegnare formalmente le mie dimissioni volontarie con rispetto dei termini di preavviso contrattualmente previsti dal CCNL di categoria.

Pertanto, Vi comunico che il mio ultimo giorno effettivo di lavoro sarà il:
${d.lastDay || '[Data Ultimo Giorno]'}.

Provvederò parallelamente all'invio telematico obbligatorio delle dimissioni tramite il portale ClicLavoro / INPS con accesso SPID come richiesto dalla legge.

Vi ringrazio per la fiducia accordatami e per l'opportunità professionale durante il periodo di collaborazione trascorsa insieme.

Distinti saluti.

Firma del Lavoratore:
___________________________
(${d.workerName || 'Lavoratore'})

Per ricevuta e accettazione (Datore di Lavoro):
___________________________`,
  },
  {
    id: 'permesso-medico',
    titleBn: 'কাজে ডাক্তার দেখানোর ছুটির আবেদন (Permesso per Visita Medica)',
    titleIt: 'Richiesta di Permesso Retribuito per Visita Medica',
    description: 'অফিস বা ফ্যাক্টরিতে ডাক্তারের অ্যাপয়েন্টমেন্টের জন্য বেতনভুক্ত ছুটির লিখিত আবেদন।',
    category: 'কর্মক্ষেত্র',
    fields: [
      { key: 'workerName', label: 'আপনার নাম', placeholder: 'Md Karim' },
      { key: 'companyName', label: 'কোম্পানির নাম', placeholder: 'Società Logistica S.p.A.' },
      { key: 'visitDate', label: 'ডাক্তারের ভিজিটের তারিখ', placeholder: '05/10/2026' },
      { key: 'visitHours', label: 'প্রয়োজনীয় সময় (যেমন: সকাল ০৯:০০ থেকে দুপুর ০১:০০)', placeholder: 'dalle ore 09:00 alle ore 13:00' },
      { key: 'city', label: 'শহর ও তারিখ', placeholder: 'Bologna, 26/09/2026' },
    ],
    generateContent: (d) => `All'Attenzione dell'Ufficio Risorse Umane / Datore di Lavoro:
${d.companyName || '[Nome Azienda]'}

Luogo e Data: ${d.city || 'Bologna, 26/09/2026'}

OGGETTO: Richiesta di permesso per visita medica specialistica / accertamenti sanitari.

Il/La sottoscritto/a ${d.workerName || '[Nome Dipendente]'}, dipendente presso la Vostra azienda;

CHIEDE

di poter usufruire di un permesso lavorativo retribuito per motivi di salute / visita medica programmata nella seguente giornata:

Data: ${d.visitDate || '[Data Visita]'}
Fascia oraria: ${d.visitHours || 'dalle ore 09:00 alle ore 13:00'}

Al rientro in servizio, sarà mia cura consegnare all'ufficio competente l'attestazione / giustificativo rilasciato dalla struttura sanitaria competente comprovante l'effettiva esecuzione della prestazione medica e l'orario di permanenza.

In attesa di un Vostro cortese riscontro, porgo cordiali saluti.

Firma del Lavoratore:
___________________________
(${d.workerName || 'Dipendente'})`,
  },
  {
    id: 'delega-ritiro',
    titleBn: 'পাওয়ার অব অথরাইজেশন / প্রতিনিধি নিয়োগ (Delega di Ritiro)',
    titleIt: 'Delega per Ritiro Documenti, Pacchi o Pratiche',
    description: 'পোস্ট অফিস, কুরিয়ার বা কোনো অফিস থেকে আপনার বদলে অন্য কাউকে জিনিস তোলার অনুমতিপত্র।',
    category: 'অফিস ও ডেলিভারি',
    fields: [
      { key: 'deleganteName', label: 'আপনার নাম (যে অনুমতি দিচ্ছেন)', placeholder: 'Md Anowar' },
      { key: 'deleganteCF', label: 'আপনার কোদিচে ফিস্কালে', placeholder: 'ANWMD90A01Z249B' },
      { key: 'deleganteDoc', label: 'আপনার পরিচয়পত্রের ধরন ও নম্বর', placeholder: 'Passaporto n. A12345678' },
      { key: 'delegatoName', label: 'প্রতিনিধির নাম (যাকে দায়িত্ব দিচ্ছেন)', placeholder: 'Faruk Ahmed' },
      { key: 'delegatoCF', label: 'প্রতিনিধির কোদিচে ফিস্কালে', placeholder: 'HMDFRK88H15Z249K' },
      { key: 'delegatoDoc', label: 'প্রতিনিধির পরিচয়পত্রের নম্বর', placeholder: 'Carta d\'Identità n. CA998877' },
      { key: 'objectToCollect', label: 'যা তোলার অনুমতি দিচ্ছেন (প্যাকেট/ডকুমেন্ট)', placeholder: 'Ritiro raccomandata n. 1548762589' },
      { key: 'city', label: 'শহর ও তারিখ', placeholder: 'Venezia, 26/09/2026' },
    ],
    generateContent: (d) => `MODULO DI DELEGA FORMALE

Il/La sottoscritto/a:
Nome e Cognome: ${d.deleganteName || '[Nome Delegante]'}
Nato/a in Bangladesh, Codice Fiscale: ${d.deleganteCF || '[Codice Fiscale Delegante]'}
Documento di Riconoscimento: ${d.deleganteDoc || '[Tipo e Numero Documento]'}

DELEGA

Il/La Sig./Sig.ra:
Nome e Cognome: ${d.delegatoName || '[Nome Delegato]'}
Nato/a in Bangladesh, Codice Fiscale: ${d.delegatoCF || '[Codice Fiscale Delegato]'}
Documento di Riconoscimento: ${d.delegatoDoc || '[Tipo e Numero Documento Delegato]'}

A compiere per proprio conto la seguente operazione:
"${d.objectToCollect || 'Ritiro plico / raccomandata / documentazione ufficiale'}"

Si allega alla presente fotocopia del documento di identità in corso di validità del delegante e del delegato.

Luogo e Data: ${d.city || 'Venezia, 26/09/2026'}

Firma del Delegante: ___________________________
(${d.deleganteName || 'Delegante'})

Firma del Delegato: ___________________________
(${d.delegatoName || 'Delegato'})`,
  },
  {
    id: 'richiesta-ferie',
    titleBn: 'বাৎসরিক ছুটির আবেদনপত্র (Richiesta di Ferie Annuali)',
    titleIt: 'Richiesta di Ferie e Permessi Retribuiti',
    description: 'মালিকের কাছে বাৎসরিক ছুটির (Ferie) জন্য আনুষ্ঠানিক লিখিত আবেদন।',
    category: 'কর্মক্ষেত্র',
    fields: [
      { key: 'workerName', label: 'আপনার নাম', placeholder: 'Md Shakil' },
      { key: 'companyName', label: 'কোম্পানির নাম', placeholder: 'Fabbrica Meccanica S.r.l.' },
      { key: 'startDate', label: 'ছুটি শুরুর তারিখ', placeholder: '01/08/2026' },
      { key: 'endDate', label: 'ছুটি শেষের তারিখ', placeholder: '25/08/2026' },
      { key: 'returnDate', label: 'কাজে যোগদানের তারিখ', placeholder: '26/08/2026' },
      { key: 'city', label: 'শহর ও তারিখ', placeholder: 'Torino, 26/09/2026' },
    ],
    generateContent: (d) => `Alla Spettabile Direzione / Ufficio del Personale:
${d.companyName || '[Nome Azienda]'}

Luogo e Data: ${d.city || 'Torino, 26/09/2026'}

OGGETTO: Richiesta piano ferie annuali.

Il/La sottoscritto/a ${d.workerName || '[Nome Dipendente]'}, dipendente presso la Vostra azienda;

Sottopone alla Vostra attenzione la richiesta di poter fruire del periodo di ferie retribuite:

- Dal giorno: ${d.startDate || '[Data Inizio]'}
- Al giorno: ${d.endDate || '[Data Fine]'} (compresi)
- Con rientro effettivo in servizio previsto per il: ${d.returnDate || '[Data Rientro]'}

Resto a disposizione per qualsiasi esigenza organizzativa e Vi prego di confermare l'approvazione della presente richiesta.

Cordiali saluti.

Firma del Dipendente:
___________________________
(${d.workerName || 'Dipendente'})

Approvazione del Datore di Lavoro / Responsabile:
___________________________`,
  },
];

// 5. Searchable Directory for Bangladeshi Community across Italian Cities
export const COMMUNITY_DIRECTORY: DirectoryItem[] = [
  // Roma
  {
    id: 'dir-rm-1',
    name: 'Patronato & CAF Bangla Roma (Tor Pignattara)',
    category: 'caf',
    city: 'Roma',
    address: 'Via di Tor Pignattara 102, 00176 Roma (RM)',
    phone: '+39 06 24408190',
    rating: 4.8,
    services: ['পারমেসো রিনিউ কিট', 'ISEE ও 730 ট্যাক্স', 'SPID ও কোদিচে ফিস্কালে', 'ফ্যামিলি রিইউনিয়ন ভিসা'],
    banglaStaff: true,
    hours: '০৯:৩০ - ১৩:০০, ১৫:৩০ - ১৯:০০ (শনি খোলা)',
    googleMapQuery: 'Via di Tor Pignattara 102 Roma',
  },
  {
    id: 'dir-rm-2',
    name: 'সোনার বাংলা গ্রোসারি ও দেশি মাছের বাজার',
    category: 'grocery',
    city: 'Roma',
    address: 'Via Casilina 345, 00176 Roma (RM)',
    phone: '+39 06 27801122',
    rating: 4.7,
    services: ['পদ্মার তাজা ইলিশ ও রুই মাছ', 'দেশি পান-সুপারি ও কাঁচাবাজার', 'বাংলাদেশি মশলা ও চাল'],
    banglaStaff: true,
    hours: '০৮:০০ - ২২:০০ (প্রতিদিন খোলা)',
    googleMapQuery: 'Via Casilina 345 Roma',
  },
  {
    id: 'dir-rm-3',
    name: 'ঢাকা বিরিয়ানি ও সুইটস রোমা তেরমিনি',
    category: 'restaurant',
    city: 'Roma',
    address: 'Via Principe Amedeo 184, 00185 Roma (RM)',
    phone: '+39 06 4467332',
    rating: 4.6,
    services: ['১০০% হালাল কাচ্চি বিরিয়ানি', 'স্পেশাল চমচম ও রসগোল্লা', 'মোরগ পোলাও ও গরুর কালা ভুনা'],
    banglaStaff: true,
    hours: '১০:০০ - ২৩:৩০',
    googleMapQuery: 'Via Principe Amedeo 184 Roma',
  },
  {
    id: 'dir-rm-4',
    name: 'স্টুডিও লিগ্যাল ও ট্রানস্লেশন (Asseverazione Roma)',
    category: 'legal',
    city: 'Roma',
    address: 'Via Tuscolana 210, 00181 Roma (RM)',
    phone: '+39 06 7814755',
    rating: 4.9,
    services: ['কোর্টে সার্টিফাইড অনুবাদ (Tribunale)', 'নাগরিকত্ব ফাইল প্রসেসিং', 'লিগ্যাল নোটিস ও চুক্তিপত্র'],
    banglaStaff: true,
    hours: '১০:০০ - ১৮:০০ (সোম-শুক্র)',
    googleMapQuery: 'Via Tuscolana 210 Roma',
  },
  {
    id: 'dir-rm-5',
    name: 'বায়তুল মোকাররম জামে মসজিদ ও ইসলামিক সেন্টার রোম',
    category: 'mosque',
    city: 'Roma',
    address: 'Via Gabrio Serbelloni 112, 00176 Roma (RM)',
    phone: '+39 06 2419088',
    rating: 4.9,
    services: ['৫ ওয়াক্ত নামাজ ও জুম্মা', 'বাচ্চাদের কুরআন শিক্ষা ও মক্তব', 'জানাযা ও ইসলামিক বিয়ে সহায়তা'],
    banglaStaff: true,
    hours: 'ফজর থেকে এশা',
    googleMapQuery: 'Via Gabrio Serbelloni 112 Roma',
  },

  // Milano
  {
    id: 'dir-mi-1',
    name: 'মিলান সেন্ট্রাল CAF ও কনস্যুলার হেল্প ডেস্ক (Via Padova)',
    category: 'caf',
    city: 'Milano',
    address: 'Via Padova 88, 20127 Milano (MI)',
    phone: '+39 02 2841320',
    rating: 4.8,
    services: ['কনস্যুলেট অ্যাপয়েন্টমেন্ট গাইড', 'Assegno Unico ও বোনাস', 'পারমেসো ট্র্যাকিং', 'কন্ট্রাক্ট রেগুলেশন'],
    banglaStaff: true,
    hours: '০৯:০০ - ১৯:০০ (সোম-শনি)',
    googleMapQuery: 'Via Padova 88 Milano',
  },
  {
    id: 'dir-mi-2',
    name: 'রূপসী বাংলা হালাল সুপারমার্কেট মিলানো',
    category: 'grocery',
    city: 'Milano',
    address: 'Via Venini 45, 20127 Milano (MI)',
    phone: '+39 02 3652199',
    rating: 4.7,
    services: ['হালাল খাসি ও গরুর তাজা মাংস', 'দেশি শাক-সবজি ও ফলমূল', 'ফ্রোজেন স্ন্যাকস ও মসলা'],
    banglaStaff: true,
    hours: '০৮:৩০ - ২১:৩০',
    googleMapQuery: 'Via Venini 45 Milano',
  },
  {
    id: 'dir-mi-3',
    name: 'আল-মদিনা রেস্টুরেন্ট ও কাবাব হাউস (Loreto)',
    category: 'restaurant',
    city: 'Milano',
    address: 'Piazza Loreto 14, 20131 Milano (MI)',
    phone: '+39 02 2953110',
    rating: 4.6,
    services: ['হাঁসের মাংস ও ভুনা খিচুড়ি', 'চিকেন চাপ ও নান রুটি', 'দেশি মিষ্টি ও দই'],
    banglaStaff: true,
    hours: '১১:০০ - ০০:০০',
    googleMapQuery: 'Piazza Loreto 14 Milano',
  },
  {
    id: 'dir-mi-4',
    name: 'বাংলা মানি ট্রান্সফার ও ট্রাভেলস মিলান (Western Union / Ria)',
    category: 'remittance',
    city: 'Milano',
    address: 'Viale Monza 62, 20127 Milano (MI)',
    phone: '+39 02 8347291',
    rating: 4.8,
    services: ['সরাসরি বিকাশ ও ব্যাংক রেমিট্যান্স', 'সরকারি ২.৫% বোনাসসহ টাকা পাঠানো', 'বিমান টিকিট বুকিং'],
    banglaStaff: true,
    hours: '০৯:০০ - ২০:০০',
    googleMapQuery: 'Viale Monza 62 Milano',
  },

  // Venezia / Mestre
  {
    id: 'dir-ve-1',
    name: 'ভেনিস-মেস্ত্রে CAF ও লিগ্যাল এইড সেন্টার',
    category: 'caf',
    city: 'Venezia',
    address: 'Via Piave 76, 30171 Mestre (VE)',
    phone: '+39 041 984520',
    rating: 4.7,
    services: ['শিপইয়ার্ড কর্মীদের 730 ট্যাক্স', 'পারমেসো রিনিউ ও ফ্যামিলি ভিসা', 'রেসিডেন্স সার্টিফিকেট গাইড'],
    banglaStaff: true,
    hours: '০৯:০০ - ১৮:০০',
    googleMapQuery: 'Via Piave 76 Mestre Venezia',
  },
  {
    id: 'dir-ve-2',
    name: 'যমুনা হালাল বাজার ও বাংলা ডিপার্টমেন্টাল স্টোর',
    category: 'grocery',
    city: 'Venezia',
    address: 'Corso del Popolo 118, 30172 Mestre (VE)',
    phone: '+39 041 531889',
    rating: 4.6,
    services: ['দেশি তাজা শাকসবজি ও পান', 'হালাল মুরগি ও মাংস', 'বাংলাদেশি পণ্য'],
    banglaStaff: true,
    hours: '০৮:০০ - ২২:০০',
    googleMapQuery: 'Corso del Popolo 118 Mestre',
  },

  // Bologna
  {
    id: 'dir-bo-1',
    name: 'বলোনিয়া বাংলা সেবা কেন্দ্র ও CAF এসোসিয়েশন',
    category: 'caf',
    city: 'Bologna',
    address: 'Via Matteotti 34, 40129 Bologna (BO)',
    phone: '+39 051 358941',
    rating: 4.8,
    services: ['স্টুডেন্ট পারমেসো কনভার্ট', 'কাজের পারমেসো নবায়ন', 'ড্রাইভিং থিওরি গাইড'],
    banglaStaff: true,
    hours: '০৯:৩০ - ১৮:৩০',
    googleMapQuery: 'Via Matteotti 34 Bologna',
  },
  {
    id: 'dir-bo-2',
    name: 'তাজমহল হালাল কারি অ্যান্ড সুইটস বলোনিয়া',
    category: 'restaurant',
    city: 'Bologna',
    address: 'Via San Felice 80, 40122 Bologna (BO)',
    phone: '+39 051 520844',
    rating: 4.5,
    services: ['হান্ডি বিরিয়ানি ও শিক কাবাব', 'হালাল তরকারি ও পরোটা', 'মিষ্টি ও বোরহানি'],
    banglaStaff: true,
    hours: '১১:৩০ - ২৩:০০',
    googleMapQuery: 'Via San Felice 80 Bologna',
  },

  // Napoli
  {
    id: 'dir-na-1',
    name: 'নাপোলি বাংলা ফ্রেন্ডস CAF ও রেমিট্যান্স হাব',
    category: 'caf',
    city: 'Napoli',
    address: 'Corso Garibaldi 210, 80139 Napoli (NA)',
    phone: '+39 081 289412',
    rating: 4.7,
    services: ['কৃষি ও ডমেস্টিক কাজের পারমেসো ফাইল', 'তাত্ক্ষণিক রেমিট্যান্স ও বিকাশ', 'আইনি সহায়তা'],
    banglaStaff: true,
    hours: '০৯:০০ - ২০:০০',
    googleMapQuery: 'Corso Garibaldi 210 Napoli',
  },
  {
    id: 'dir-na-2',
    name: 'মদিনা সুপারমার্কেট ও হালাল মিট নাপোলি',
    category: 'grocery',
    city: 'Napoli',
    address: 'Piazza Garibaldi 45, 80142 Napoli (NA)',
    phone: '+39 081 5543210',
    rating: 4.6,
    services: ['হালাল মাংস ও তাজা সবজি', 'বাংলাদেশি চাল ও মসলা', 'রেমিট্যান্স সেবা'],
    banglaStaff: true,
    hours: '০৮:০০ - ২২:০০',
    googleMapQuery: 'Piazza Garibaldi 45 Napoli',
  },

  // Firenze
  {
    id: 'dir-fi-1',
    name: 'ফ্লোরেন্স প্যাট্রোনেটো CAF ও ইমিগ্রেশন সার্ভিস (Firenze SMN)',
    category: 'caf',
    city: 'Firenze',
    address: 'Via Alamanni 28, 50123 Firenze (FI)',
    phone: '+39 055 289410',
    rating: 4.8,
    services: ['হসপিটালিটি ও রেস্টুরেন্ট কর্মীদের 730', 'পারমেসো নবায়ন কিট', 'রেসিডেন্স ও কোদিচে ফিস্কালে'],
    banglaStaff: true,
    hours: '০৯:৩০ - ১৮:৩০',
    googleMapQuery: 'Via Alamanni 28 Firenze',
  },
  {
    id: 'dir-fi-2',
    name: 'বাংলা কারি হাউস ও দেশি সুইটস ফ্লোরেন্স',
    category: 'restaurant',
    city: 'Firenze',
    address: 'Via Faenza 62, 50123 Firenze (FI)',
    phone: '+39 055 210984',
    rating: 4.6,
    services: ['দম বিরিয়ানি ও চিকেন টিক্কা', 'হালিম ও সমুচা', 'হালাল নাস্তা ও মিষ্টি'],
    banglaStaff: true,
    hours: '১১:০০ - ২৩:০০',
    googleMapQuery: 'Via Faenza 62 Firenze',
  },

  // Torino
  {
    id: 'dir-to-1',
    name: 'তুরিন CAF বাংলা অ্যাসোসিয়েশন (Porta Nuova)',
    category: 'caf',
    city: 'Torino',
    address: 'Via Nizza 56, 10126 Torino (TO)',
    phone: '+39 011 669812',
    rating: 4.8,
    services: ['ফ্যাক্টরি ও মেকানিকাল কর্মীদের ট্যাক্স ফাইল', 'Permesso CE আনলিমিটেড কার্ড', 'ফ্যামিলি ভিসা'],
    banglaStaff: true,
    hours: '০৯:০০ - ১৯:০০',
    googleMapQuery: 'Via Nizza 56 Torino',
  },
  {
    id: 'dir-to-2',
    name: 'পদ্মা হালাল ফুডস ও এশিয়ান মার্কেট তুরিন',
    category: 'grocery',
    city: 'Torino',
    address: 'Corso Giulio Cesare 88, 10152 Torino (TO)',
    phone: '+39 011 248901',
    rating: 4.7,
    services: ['তাজা দেশি শাকসবজি', 'হালাল গরু ও খাসির মাংস', 'বাংলাদেশি মাছ'],
    banglaStaff: true,
    hours: '০৮:৩০ - ২১:০০',
    googleMapQuery: 'Corso Giulio Cesare 88 Torino',
  },

  // Palermo
  {
    id: 'dir-pa-1',
    name: 'পালেরমো বাংলা ফ্রেন্ডস CAF ও সাপোর্ট সেন্টার',
    category: 'caf',
    city: 'Palermo',
    address: 'Via Roma 180, 90133 Palermo (PA)',
    phone: '+39 091 617290',
    rating: 4.7,
    services: ['পারমেসো ও সিজনাল নাল্লা ওস্তা নবায়ন', 'রেসিডেন্স ফর্ম পূরণ', 'আইনি অনুবাদ'],
    banglaStaff: true,
    hours: '০৯:০০ - ১৮:০০',
    googleMapQuery: 'Via Roma 180 Palermo',
  },
  {
    id: 'dir-pa-2',
    name: 'ঢাকা এশিয়ান মিনিমার্কেট পালেরমো',
    category: 'grocery',
    city: 'Palermo',
    address: 'Via Maqueda 310, 90134 Palermo (PA)',
    phone: '+39 091 328456',
    rating: 4.6,
    services: ['দেশি কাঁচাবাজার', 'বাংলাদেশি পান ও মশলা', 'হালাল ফ্রোজেন খাবার'],
    banglaStaff: true,
    hours: '০৮:০০ - ২২:০০',
    googleMapQuery: 'Via Maqueda 310 Palermo',
  },
];

// Local City Emergency Contacts Interface
export interface LocalCityEmergency {
  city: 'Roma' | 'Milano' | 'Venezia' | 'Bologna' | 'Napoli' | 'Firenze' | 'Torino' | 'Palermo';
  questura: {
    name: string;
    address: string;
    phone: string;
    note: string;
  };
  hospital: {
    name: string;
    address: string;
    phone: string;
    emergencyDept: string;
  };
  guardiaMedica: {
    phone: string;
    hours: string;
    note: string;
  };
  consularHelp: {
    name: string;
    phone: string;
    address: string;
  };
}

export const LOCAL_CITY_EMERGENCIES: Record<string, LocalCityEmergency> = {
  Roma: {
    city: 'Roma',
    questura: {
      name: 'Questura di Roma - Ufficio Immigrazione',
      address: 'Via Patini 23, 00155 Roma (RM)',
      phone: '+39 06 4686',
      note: 'পারমেসো রিসিভ, ফিঙ্গারপ্রিন্ট ও ইমিগ্রেশন পুলিশ সদর দপ্তর',
    },
    hospital: {
      name: 'Policlinico Umberto I (Pronto Soccorso)',
      address: 'Viale del Policlinico 155, 00161 Roma',
      phone: '+39 06 49971',
      emergencyDept: 'জরুরি এমার্জেন্সি ডিপার্টমেন্ট ২৪ ঘণ্টা খোলা',
    },
    guardiaMedica: {
      phone: '+39 06 5878',
      hours: 'রাত ৮:০০ - সকাল ৮:০০ এবং ছুটির দিন ২৪ ঘণ্টা',
      note: 'পারিবারিক ডাক্তার বন্ধ থাকলে রাতে বা ছুটির দিনে জরুরি প্রেসক্রিপশন ও চিকিৎসক সহায়তা',
    },
    consularHelp: {
      name: 'বাংলাদেশ দূতাবাস, রোম',
      phone: '+39 06 8078570',
      address: 'Via dell\'Antartide 5, 00144 Roma (RM)',
    },
  },
  Milano: {
    city: 'Milano',
    questura: {
      name: 'Questura di Milano - Ufficio Immigrazione',
      address: 'Via Montebello 26 / Via Cireene 7, Milano',
      phone: '+39 02 62261',
      note: 'মিলান প্রদেশের পারমেসো নবায়ন ও বায়োমেট্রিক অফিস',
    },
    hospital: {
      name: 'Ospedale Niguarda (Pronto Soccorso)',
      address: 'Piazza Ospedale Maggiore 3, 20162 Milano',
      phone: '+39 02 64441',
      emergencyDept: 'ট্রমা ও যেকোনো মেডিকেল ইমার্জেন্সি ২৪ ঘণ্টা',
    },
    guardiaMedica: {
      phone: '+39 02 34567 / 116117',
      hours: 'রাত ৮:০০ - সকাল ৮:০০ এবং ছুটির দিন',
      note: 'লমবার্দিয়া অঞ্চলের কেন্দ্রীয় কন্টিনিউটি মেডিকেল অ্যাসিস্ট্যান্স নম্বর (116 117)',
    },
    consularHelp: {
      name: 'বাংলাদেশ কনস্যুলেট জেনারেল, মিলান',
      phone: '+39 02 87068580',
      address: 'Via Privata Maria Teresa 4, 20123 Milano (MI)',
    },
  },
  Venezia: {
    city: 'Venezia',
    questura: {
      name: 'Questura di Venezia - Ufficio Immigrazione',
      address: 'Via Nicolodi 22, 30175 Marghera (VE)',
      phone: '+39 041 2703511',
      note: 'মারঘেরা ও মেস্ত্রে অঞ্চলের প্রধান ইমিগ্রেশন কোয়েস্তুরা',
    },
    hospital: {
      name: 'Ospedale dell\'Angelo Mestre (Pronto Soccorso)',
      address: 'Via Paccagnella 11, 30174 Mestre (VE)',
      phone: '+39 041 9657111',
      emergencyDept: 'মেস্ত্রে-ভেনিসের কেন্দ্রীয় সুপার স্পেশালাইজড এমার্জেন্সি',
    },
    guardiaMedica: {
      phone: '+39 041 2326701',
      hours: 'প্রতিদিন রাত ২০:০০ - ০৮:০০, শনি-রবি ও ছুটির দিন',
      note: 'রাত্রিকালীন জরুরি সাধারণ স্বাস্থ্যসেবা',
    },
    consularHelp: {
      name: 'মিলান কনস্যুলেট (ভেনিস জোন কনস্যুলার হেল্প)',
      phone: '+39 02 87068580',
      address: 'আঞ্চলিক ভ্রাম্যমাণ ক্যাম্প মেস্ত্রেতে নিয়মিত অনুষ্ঠিত হয়',
    },
  },
  Bologna: {
    city: 'Bologna',
    questura: {
      name: 'Questura di Bologna - Ufficio Immigrazione',
      address: 'Piazza Galileo Galilei 7 / Via Bovi Campeggi 13, Bologna',
      phone: '+39 051 6401111',
      note: 'বলোনিয়া প্রভিন্সের কোয়েস্তুরা ও পারমেসো শাখা',
    },
    hospital: {
      name: 'Ospedale Maggiore (Pronto Soccorso)',
      address: 'Largo Nigrisoli 2, 40133 Bologna',
      phone: '+39 051 6478111',
      emergencyDept: '২৪ ঘণ্টা ইমার্জেন্সি ও ট্রমা কেয়ার',
    },
    guardiaMedica: {
      phone: '+39 051 3131',
      hours: 'রাত ৮:০০ থেকে সকাল ৮:০০ ও ছুটির দিন',
      note: 'বাসায় ডাক্তার ডাকা বা জরুরি পরামর্শের জন্য কল করুন',
    },
    consularHelp: {
      name: 'রোম দূতাবাস ও মিলান কনস্যুলেট হেল্পলাইন',
      phone: '+39 06 8078570',
      address: 'এমিলিয়া-রোমানিয়া রিজিয়ন কনস্যুলার সহায়তা',
    },
  },
  Napoli: {
    city: 'Napoli',
    questura: {
      name: 'Questura di Napoli - Ufficio Immigrazione',
      address: 'Via Galileo Ferraris 131, 80142 Napoli',
      phone: '+39 081 7941111',
      note: 'নাপোলি সেন্ট্রাল স্টেশন সংলগ্ন ইমিগ্রেশন পুলিশ দপ্তর',
    },
    hospital: {
      name: 'A.O.R.N. Cardarelli (Pronto Soccorso)',
      address: 'Via Antonio Cardarelli 9, 80131 Napoli',
      phone: '+39 081 7471111',
      emergencyDept: 'দক্ষিণ ইতালির বৃহত্তম ইমার্জেন্সি হাসপাতাল',
    },
    guardiaMedica: {
      phone: '+39 081 7511171',
      hours: 'রাত ২০:০০ - ০৮:০০ ও ছুটির দিন',
      note: 'নাপোলি মেট্রোপলিটন অন-কল মেডিকেল সার্ভিস',
    },
    consularHelp: {
      name: 'বাংলাদেশ দূতাবাস, রোম (নাপোলি কনস্যুলার সহায়তা)',
      phone: '+39 06 8078570',
      address: 'নাপোলিতে নিয়মিত কনস্যুলার ও পাসপোর্ট ডেলিভারি ক্যাম্প হয়',
    },
  },
  Firenze: {
    city: 'Firenze',
    questura: {
      name: 'Questura di Firenze - Ufficio Immigrazione',
      address: 'Via Zara 2, 50129 Firenze',
      phone: '+39 055 49771',
      note: 'ফ্লোরেন্স ও তোসকানা অঞ্চলের পারমেসো বিভাগ',
    },
    hospital: {
      name: 'Azienda Ospedaliero-Universitaria Careggi',
      address: 'Largo Brambilla 3, 50134 Firenze',
      phone: '+39 055 794111',
      emergencyDept: '২৪ ঘণ্টা প্রন্তো সোক্কোরসো',
    },
    guardiaMedica: {
      phone: '+39 055 6938980',
      hours: 'রাত ২০:০০ - ০৮:০০',
      note: 'তোসকানা রাত্রিকালীন মেডিকেল ডিউটি ডক্টর',
    },
    consularHelp: {
      name: 'বাংলাদেশ দূতাবাস রোম হেল্পডেস্ক',
      phone: '+39 06 8078570',
      address: 'তোসকানা রিজিয়ন সাপোর্ট',
    },
  },
  Torino: {
    city: 'Torino',
    questura: {
      name: 'Questura di Torino - Ufficio Immigrazione',
      address: 'Corso Verona 4, 10152 Torino',
      phone: '+39 011 55881',
      note: 'তুরিনের কোয়েস্তুরা ইমিগ্রেশন ডেস্ক',
    },
    hospital: {
      name: 'Ospedale Molinette (Pronto Soccorso)',
      address: 'Corso Bramante 88, 10126 Torino',
      phone: '+39 011 6331633',
      emergencyDept: '২৪ ঘণ্টা জরুরি বিভাগ',
    },
    guardiaMedica: {
      phone: '+39 011 5747 / 116117',
      hours: 'রাত ২০:০০ - ০৮:০০ ও ছুটির দিন',
      note: 'পিয়েনমোন্তে অঞ্চল ফ্রি মেডিকেল হেল্পলাইন (116 117)',
    },
    consularHelp: {
      name: 'বাংলাদেশ কনস্যুলেট মিলান (তুরিন জোন)',
      phone: '+39 02 87068580',
      address: 'উত্তর-পশ্চিম ইতালি কনস্যুলার সেবা',
    },
  },
  Palermo: {
    city: 'Palermo',
    questura: {
      name: 'Questura di Palermo - Ufficio Immigrazione',
      address: 'Via San Lorenzo 283, 90146 Palermo',
      phone: '+39 091 6951111',
      note: 'সিসিলি ও পালেরমোর পারমেসো প্রশাসন',
    },
    hospital: {
      name: 'Policlinico Paolo Giaccone (Pronto Soccorso)',
      address: 'Via del Vespro 129, 90127 Palermo',
      phone: '+39 091 6551111',
      emergencyDept: '২৪ ঘণ্টা জরুরি স্বাস্থ্যসেবা',
    },
    guardiaMedica: {
      phone: '+39 091 421491',
      hours: 'রাত ২০:০০ - ০৮:০০',
      note: 'পালেরমো মিউনিসিপ্যাল অন-কল ডক্টর',
    },
    consularHelp: {
      name: 'বাংলাদেশ দূতাবাস, রোম',
      phone: '+39 06 8078570',
      address: 'সিসিলি প্রবাসী সহায়তা ডেস্ক',
    },
  },
};

// Community Room & Job Notice Board Interface & Seed Data
export interface RoomJobListing {
  id: string;
  type: 'job' | 'room' | 'job_seeker';
  title: string;
  city: 'Roma' | 'Milano' | 'Venezia' | 'Bologna' | 'Napoli' | 'Firenze' | 'Torino' | 'Palermo';
  area: string;
  priceOrSalary: string;
  contactName: string;
  phone: string;
  description: string;
  datePosted: string;
  tags: string[];
  residenzaAvailable?: boolean;
  contractType?: string;
  urgent?: boolean;
}

export const COMMUNITY_ROOM_JOBS: RoomJobListing[] = [
  {
    id: 'rj-1',
    type: 'room',
    title: 'টর পিনিয়াত্তারায় ফার্নিশড পোস্টো লেত্তো (Posto Letto) ভাড়া',
    city: 'Roma',
    area: 'Tor Pignattara / Via Casilina',
    priceOrSalary: '€২২০ / মাস (বিল সহ)',
    contactName: 'কামরুল হাসান',
    phone: '+39 328 1122334',
    description: 'শান্ত ও নিরিবিলি ফ্ল্যাটে ২ জনের রুমে ১টি পরিষ্কার বেড খালি আছে। মেট্রো C ও ট্রামের খুব কাছে। দেশি কিচেন ও ফ্রি ওয়াইফাই সুবিধা। বৈধ চাকরিজীবী বা স্টুডেন্টদের অগ্রাধিকার।',
    datePosted: 'আজকে পোস্ট করা',
    tags: ['পোস্টো লেত্তো', 'মেট্রো সি সংলগ্ন', 'বিল অন্তর্ভুক্ত'],
    residenzaAvailable: true,
    urgent: true,
  },
  {
    id: 'rj-2',
    type: 'job',
    title: 'ইতালিয়ান রেস্টুরেন্টে অভিজ্ঞ শেফ / পিৎজাইয়োলো প্রয়োজন',
    city: 'Roma',
    area: 'Roma Termini / Monti',
    priceOrSalary: '€১,৬০০ - €১,৮০০ / মাস',
    contactName: 'মারিও ও রফিক',
    phone: '+39 347 5566778',
    description: 'সেন্ট্রাল রোমের ব্যস্ত রেস্টুরেন্টে ফুল-টাইম কাজের সুযোগ। পাস্তা ও রোমান পিৎজা তৈরিতে ন্যূনতম ২ বছরের অভিজ্ঞতা থাকতে হবে। নিয়মিত বুস্তা পাগা (Busta Paga) ও পারমেসো কনট্রাক্ট প্রদান করা হবে।',
    datePosted: 'গতকাল',
    tags: ['শেফ / পিৎজাইয়োলো', 'রেগুলার কন্ট্রাক্ট', 'ফুল টাইম'],
    contractType: 'Contratto a Tempo Indeterminato',
    urgent: true,
  },
  {
    id: 'rj-3',
    type: 'room',
    title: 'লোরেতো (Loreto) মেট্রোর পাশে সিঙ্গেল রুম (Camera Singola)',
    city: 'Milano',
    area: 'Piazza Loreto / Viale Monza',
    priceOrSalary: '€৪৫০ / মাস',
    contactName: 'শফিকুল ইসলাম',
    phone: '+39 389 9988776',
    description: 'সম্পূর্ণ আলাদা প্রাইভেট ব্যালকনিযুক্ত সিঙ্গেল রুম। সেন্ট্রাল হিটিং ও মডার্ন বাথরুম। রেসিডেন্স (Residenza) করানো সম্ভব। ভদ্র ও পরিচ্ছন্ন প্রবাসী ভাইদের যোগাযোগ করার অনুরোধ।',
    datePosted: '২ দিন আগে',
    tags: ['সিঙ্গেল রুম', 'রেসিডেন্স সুবিধা', 'রেড ও গ্রিন লাইন মেট্রো'],
    residenzaAvailable: true,
  },
  {
    id: 'rj-4',
    type: 'job',
    title: 'লজিস্টিক ও ওয়্যারহাউসে প্যাকার এবং ম্যাটেরিয়াল হ্যান্ডলার',
    city: 'Milano',
    area: 'Milano Lambrate / Segrate',
    priceOrSalary: '€১,৪৫০ / মাস (বোনাস সহ)',
    contactName: 'লজিস্টিকা নর্ড পার্সোনেল',
    phone: '+39 02 8912345',
    description: 'শিপিং ওয়্যারহাউসে অর্ডার বাছাই ও প্যাকিং কাজ। মৌলিক ইতালিয়ান ভাষা জানা বাধ্যতামূলক। ১৪ মাসের বেতন (14 Mensilità) ও বাৎসরিক ছুটি প্রযোজ্য।',
    datePosted: '৩ দিন আগে',
    tags: ['ওয়্যারহাউস জব', '১৪ মাসের বেতন', 'পারমেসো নবায়ন সহ'],
    contractType: 'Contratto Determinato 12 mesi',
  },
  {
    id: 'rj-5',
    type: 'job',
    title: 'শিপইয়ার্ডে সার্টিফাইড ওয়েল্ডার ও পাইপ ফিটার আবশ্যক',
    city: 'Venezia',
    area: 'Marghera / Mestre',
    priceOrSalary: '€১,৭০০ - €২,১০০ / মাস',
    contactName: 'ইঞ্জি. আলমগীর কবীর',
    phone: '+39 331 4455667',
    description: 'মারঘেরা ও মেস্ত্রে শিপইয়ার্ড প্রজেক্টে টিআইজি (TIG) বা এমআইজি ওয়েল্ডার প্রয়োজন। সেফটি কোর্স (Corso Sicurezza) সম্পন্ন থাকলে অগ্রাধিকার। সরাসরি কোম্পানি পে-রোল।',
    datePosted: 'আজকে',
    tags: ['শিপইয়ার্ড ওয়েল্ডার', 'উচ্চ বেতন', 'ওভারটাইম সুবিধা'],
    contractType: 'Tempo Indeterminato',
    urgent: true,
  },
  {
    id: 'rj-6',
    type: 'room',
    title: 'মেস্ত্রে স্টেশনের কাছে ফ্যামিলির জন্য ২ রুমের ফ্ল্যাট',
    city: 'Venezia',
    area: 'Mestre Stazione / Via Piave',
    priceOrSalary: '€৭৫০ / মাস',
    contactName: 'সুমন আহমেদ',
    phone: '+39 349 7788990',
    description: 'স্বপরিবারে থাকার জন্য আদর্শ সুন্দর অ্যাপার্টমেন্ট। ফার্নিশড কিচেন, ডাবল বেডরুম ও সেলফ হিটিং। অফিসিয়াল ৩+২ রেন্টাল কনট্রাক্ট রেজিস্ট্রি (Agenzia delle Entrate) করা হবে।',
    datePosted: '১ দিন আগে',
    tags: ['ফ্যামিলি ফ্ল্যাট', 'রেজিস্টার্ড কনট্রাক্ট', 'স্টেশন ৫ মিনিট'],
    residenzaAvailable: true,
  },
  {
    id: 'rj-7',
    type: 'job',
    title: 'রেস্তোরাঁয় কিচেন হেল্পার ও ডিশওয়াশার (Aiuto Cuoco)',
    city: 'Bologna',
    area: 'Bologna Centro Storico',
    priceOrSalary: '€১,৩০০ / মাস',
    contactName: 'তারেক মাহমুদ',
    phone: '+39 366 3322119',
    description: 'শাকসবজি কাটা ও কিচেন পরিষ্কার রাখার দায়িত্ব। সপ্তাহে ১ দিন ছুটি, ডিউটি টাইমে খাবার ফ্রি। নতুন ইতালি এসেছেন এমন কর্মীদের কাজের সুযোগ রয়েছে।',
    datePosted: '৪ দিন আগে',
    tags: ['আইউতো কুওকো', 'খাবার ফ্রি', 'নতুনদের সুযোগ'],
    contractType: 'Contratto CCNL Ristorazione',
  },
  {
    id: 'rj-8',
    type: 'room',
    title: 'বলোনিয়া সেন্ট্রাল স্টেশনের পাশে সিঙ্গেল / ডাবল বেডরুম',
    city: 'Bologna',
    area: 'Bologna Centrale / Via Matteotti',
    priceOrSalary: '€৩৫০ / মাস',
    contactName: 'নুরুল ইসলাম',
    phone: '+39 333 8877665',
    description: 'ইউনিভার্সিটি স্টুডেন্ট বা কর্মজীবী ভাইদের জন্য উপযুক্ত। শান্ত পরিবেশ, ওয়াইফাই ও ওয়াশিং মেশিন সুবিধাসহ।',
    datePosted: 'আজকে',
    tags: ['স্টুডেন্ট / জব', 'সেন্ট্রাল জোন', 'শান্ত পরিবেশ'],
    residenzaAvailable: false,
  },
  {
    id: 'rj-9',
    type: 'job',
    title: 'বাসা ও বয়স্ক সেবায় কল্ফ ও বাদান্তে (Colf / Badante convivente)',
    city: 'Firenze',
    area: 'Firenze Campo di Marte',
    priceOrSalary: '€১,২০০ / মাস + থাকা-খাওয়া ফ্রি',
    contactName: 'আলেসান্দ্রো ও সেলিনা',
    phone: '+39 320 9988112',
    description: 'ইতালিয়ান পরিবারে ভদ্র বৃদ্ধার দেখাশোনা ও ঘরের কাজের জন্য মহিলা কর্মী আবশ্যক। রবিবার ছুটি ও ইনপস কন্ট্রিবিউশন (Contributi INPS) সম্পূর্ণ দেওয়া হবে।',
    datePosted: 'গতকাল',
    tags: ['বাদান্তে / কোল্ফ', 'থাকা-খাওয়া ফ্রি', 'INPS কন্ট্রিবিউশন'],
    contractType: 'Contratto CCNL Lavoro Domestico',
  },
  {
    id: 'rj-10',
    type: 'room',
    title: 'ফ্লোরেন্স নোভাসেন্ট্রোর কাছে সাশ্রয়ী বেড স্পেস',
    city: 'Firenze',
    area: 'Novoli / Università',
    priceOrSalary: '€২০০ / মাস',
    contactName: 'মাহফুজুর রহমান',
    phone: '+39 342 1199883',
    description: 'ট্রামওয়ে T2 এর সাথে সংযোগ। রুমমেট সবাই বাংলাদেশি ভাই। কিচেন ও হিটিং চালু। জরুরি ভিত্তিতে রুমমেট নেওয়া হচ্ছে।',
    datePosted: '৩ দিন আগে',
    tags: ['সাশ্রয়ী ভাড়া', 'ট্রাম সংযোগ', 'দেশি পরিবেশ'],
    residenzaAvailable: false,
  },
  {
    id: 'rj-11',
    type: 'job',
    title: 'অটোমোবাইল ও মেকানিক্যাল পার্টস ফ্যাক্টরিতে হেল্পার',
    city: 'Torino',
    area: 'Torino Nord / Settimo Torinese',
    priceOrSalary: '€১,৫০০ / মাস',
    contactName: 'মুন্না চৌধুরী',
    phone: '+39 375 6655443',
    description: 'সিএনসি ও মেকানিকাল ওয়ার্কশপে সাহায্যকারী কর্মী। মেকানিকাল কাজের আগ্রহ থাকলে হাতে-কলমে প্রশিক্ষণ দেওয়া হবে। বৈধ পারমেসো থাকা আবশ্যক।',
    datePosted: 'আজকে',
    tags: ['ফ্যাক্টরি কাজ', 'ট্রেনিং সুবিধা', 'পারমেসো আবশ্যক'],
    contractType: 'Tempo Determinato con Proroga',
    urgent: true,
  },
  {
    id: 'rj-12',
    type: 'room',
    title: 'নাপোলি পিয়াজ্জা গারিবাল্দির কাছে বিগ রুম ভাড়া',
    city: 'Napoli',
    area: 'Piazza Garibaldi / Corso Novara',
    priceOrSalary: '€২৮০ / মাস',
    contactName: 'জালাল উদ্দিন',
    phone: '+39 338 2233445',
    description: 'রেলওয়ে স্টেশনের মাত্র ৩ মিনিটের দূরত্বে। খোলামেলা রৌদ্রোজ্জ্বল রুম। রেসিডেন্স সুবিধা দেওয়া সম্ভব।',
    datePosted: '২ দিন আগে',
    tags: ['গারিবাল্দি স্টেশন', 'রেসিডেন্স সম্ভব', 'খোলামেলা রুম'],
    residenzaAvailable: true,
  },
];

export interface EmbassyNotification {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'passport' | 'advisory' | 'consular_camp' | 'nid' | 'urgent';
  badge: string;
  mission: 'Ambasciata Roma' | 'Consolato Milano' | 'Both';
  importance: 'urgent' | 'high' | 'normal';
  link?: string;
  details: string[];
}

export const EMBASSY_ALERTS: EmbassyNotification[] = [
  {
    id: 'emb-camp-venezia-2026',
    title: 'ভেনিস ও মেস্ত্রেতে ভ্রাম্যমাণ ই-পাসপোর্ট ও কনস্যুলার সেবা ক্যাম্প',
    summary: 'ভেনিস, মেস্ত্রে ও পার্শ্ববর্তী প্রবাসীদের জন্য সরাসরি কনস্যুলার ও বায়োমেট্রিক ক্যাম্পের আয়োজন।',
    date: '২৮ সেপ্টেম্বর ২০২৬',
    category: 'consular_camp',
    badge: 'বিশেষ ক্যাম্প',
    mission: 'Consolato Milano',
    importance: 'urgent',
    link: 'https://milan.mofa.gov.bd/',
    details: [
      'তারিখ: আগামী শনিবার ও রবিবার (সকাল ৯:০০ - বিকাল ৫:০০)',
      'স্থান: ইসলামিক কালচারাল সেন্টার হলরুম, মেস্ত্রে (ভেনিস)',
      'প্রদত্ত সেবা: ই-পাসপোর্ট আবেদন গ্রহণ, ফিঙ্গারপ্রিন্ট গ্রহণ, ডেলিভারি ও আমমোক্তারনামা সত্যায়ন',
      'প্রয়োজনীয় কাগজপত্র: অনলাইন আবেদনের প্রিন্ট কপি, মূল পাসপোর্ট ও বোলেত্তিনো রসিদ',
    ],
  },
  {
    id: 'emb-nid-registration-2026',
    title: 'ইতালিতে বসবাসরত বাংলাদেশিদের জাতীয় পরিচয়পত্র (NID) নিবন্ধন চালু',
    summary: 'রোম দূতাবাস ও মিলান কনস্যুলেটে সরাসরি নতুন স্মার্ট জাতীয় পরিচয়পত্র (NID) কার্ডের আবেদন গ্রহণ শুরু হয়েছে।',
    date: '২৪ সেপ্টেম্বর ২০২৬',
    category: 'nid',
    badge: 'নতুন সুবিধা',
    mission: 'Both',
    importance: 'high',
    link: 'https://rome.mofa.gov.bd/',
    details: [
      'services.nidw.gov.bd থেকে অনলাইনে প্রবাসী বাংলাদেশিদের ফরম পূরণ করুন',
      '১৭ ডিজিটের অনলাইন জন্মনিবন্ধন সনদ ও পাসপোর্টের কপি আবশ্যক',
      'দূতাবাস ও কনস্যুলেটে নির্দিষ্ট বুথে বিনামূল্যে বায়োমেট্রিক প্রদান করা যাবে',
    ],
  },
  {
    id: 'emb-decreto-flussi-advisory',
    title: 'জরুরি সতর্কতা: ডিক্রেতো ফ্লুসি ও কাজের ভিসার ভুয়া নিয়োগপত্র যাচাই',
    summary: 'দালাল ও মানবপাচার চক্রের ভুয়া নুলা ওস্তা এবং অবৈধ ভিসা থেকে প্রবাসীদের সতর্ক থাকার আহ্বান।',
    date: '২১ সেপ্টেম্বর ২০২৬',
    category: 'advisory',
    badge: 'জরুরি সতর্কবার্তা',
    mission: 'Ambasciata Roma',
    importance: 'urgent',
    link: 'https://rome.mofa.gov.bd/',
    details: [
      'ভুয়া নুলা ওস্তার মাধ্যমে বাংলাদেশে থাকা স্বজনদের প্রতারিত করার বিষয়ে একাধিক অভিযোগ',
      'যেকোনো নুলা ওস্তা সঠিক কিনা তা ইতালির প্রিফেত্তুরা বা অফিশিয়াল পোর্টাল থেকে নিশ্চিত হোন',
      'কোনো মধ্যস্বত্বভোগী বা দালালকে আর্থিক লেনদেন করা সম্পূর্ণ দণ্ডনীয় অপরাধ',
    ],
  },
  {
    id: 'emb-urgent-passport-delivery',
    title: 'প্রস্তুতকৃত নতুন ই-পাসপোর্ট দ্রুত সংগ্রহের জন্য বিশেষ বিজ্ঞপ্তি',
    summary: 'রোম ও মিলানে যেসব ই-পাসপোর্ট প্রস্তুত রয়েছে তা বিলম্ব না করে ডেলিভারি স্লিপ জমা দিয়ে নেওয়ার আহ্বান।',
    date: '১৫ সেপ্টেম্বর ২০২৬',
    category: 'passport',
    badge: 'পাসপোর্ট ডেলিভারি',
    mission: 'Both',
    importance: 'normal',
    link: 'https://www.epassport.gov.bd/',
    details: [
      'অনলাইনে স্ট্যাটাস "Passport is ready for issuance" দেখালে সরাসরি সংগ্রহ করা যাবে',
      'পোস্টাল কুরিয়ার সার্ভিসের মাধ্যমে ঘরে বসে পাসপোর্ট নেওয়ার বিশেষ ব্যবস্থা রয়েছে',
      'পুরোনো মূল পাসপোর্ট সাথে এনে অবশ্যই বাতিল (Cancel) সিল মোহর করিয়ে নিতে হবে',
    ],
  },
];

// 6. Community Safety Notices & FAQs
export const SCAM_WARNINGS = [
  {
    title: 'ভুয়া নুলা ওস্তা (Nulla Osta) ও ডিক্রেতো ফ্লুসি প্রতারণা সতর্কতা',
    description: 'কোনো দালালকে অগ্রিম লাখ লাখ টাকা দেবেন না। কোনো কোম্পানি চাকরি দেওয়ার নামে টাকা দাবি করলে তা সম্পূর্ণ বেআইনি। অফিশিয়াল ভিসা শুধুমাত্র সরকারি স্পোর্টেল্লো উনিচো ইমিগ্রাজিয়োনে পোর্টালের মাধ্যমেই অনুমোদন পায়।',
    icon: 'AlertTriangle',
    severity: 'high',
  },
  {
    title: 'রিচেত্তিনা (Ricettina) নিয়ে ট্রাভেল করার সতর্কতা',
    description: 'পারমেসো রিনিউয়ের পোস্ট অফিসের রসিদ নিয়ে আপনি ডিরেক্ট ফ্লাইটে ঢাকা যেতে পারবেন। কিন্তু কোনো শেঞ্জেন দেশ (জার্মানি, ফ্রান্স, নেদারল্যান্ডস) দিয়ে ট্রানজিট নেওয়া যাবে না। দুবাই, কাতার বা তুরস্ক ট্রানজিটে কোনো সমস্যা নেই।',
    icon: 'PlaneAlert',
    severity: 'medium',
  },
  {
    title: 'ভুয়া রেসিডেন্স ও কন্ট্রাক্ট কেনার বিষয়ে আইনি ঝুঁকি',
    description: 'টাকা দিয়ে ভুয়া রেসিডেন্স বা ভুয়া বুস্তা পাগা বানালে পুলিশ ইনভেস্টিগেশনে ধরা পড়লে ফৌজদারি মামলা এবং পারমেসো বাতিলের স্থায়ী আদেশ হতে পারে। সর্বদা বিশ্বস্ত ও আসল কাজে নিযুক্ত থাকুন।',
    icon: 'ShieldCheck',
    severity: 'high',
  },
];

export const FREQUENT_FAQS = [
  {
    question: 'পারমেসো রিনিউয়ের আবেদন কতদিন আগে করতে হয়?',
    answer: 'ইতালির আইন অনুযায়ী আপনার পারমেসোর মেয়াদ শেষ হওয়ার কমপক্ষে ৬০ দিন (২ মাস) আগে কিট পোস্টাল পাঠিয়ে রিনিউ প্রক্রিয়া শুরু করা শ্রেয়। তবে মেয়াদ শেষ হওয়ার ৬০ দিনের মধ্যেও আইনত আবেদন জমা দেওয়া যায়।',
  },
  {
    question: 'রিচেত্তিনা দিয়ে কাজ করা যায় কি?',
    answer: 'হ্যাঁ! আপনার কাছে যদি আগের বৈধ পারমেসোর কপি এবং নতুন রিনিউয়ের কিট জমা দেওয়ার পোস্টাল রসিদ (Ricevuta) থাকে, তবে নতুন কার্ড হাতে না পাওয়া পর্যন্ত আপনি সম্পূর্ণ বৈধভাবে যেকোনো কোম্পানিতে কাজ করতে পারবেন এবং বুস্তা পাগা পেতে পারবেন।',
  },
  {
    question: 'বাচ্চাদের জন্য ফ্যামিলি বোনাস (Assegno Unico) কীভাবে পাব?',
    answer: 'আপনার নতুন বছরের ISEE বানিয়ে নিকটস্থ CAF অফিসে যান অথবা নিজের SPID দিয়ে INPS পোর্টালে Assegno Unico আবেদন করুন। সন্তানের বয়স ২১ বছর পর্যন্ত প্রতি মাসে সন্তান প্রতি সরকারি ভাতা আপনার ব্যাংক একাউন্টে জমা হবে।',
  },
  {
    question: 'বাংলাদেশ দূতাবাসে পাসপোর্ট রিনিউ করতে কী কী লাগে?',
    answer: 'বর্তমান মূল পাসপোর্ট, পাসপোর্ট কপি, অনলাইন ফর্মের প্রিন্ট, ১৭ ডিজিটের জন্মনিবন্ধন অথবা জাতীয় পরিচয়পত্র (NID), পারমেসো কপি এবং পোস্টাল বোলেত্তিনো বা ব্যাংক ট্রানস্ফার রসিদ প্রয়োজন হয়।',
  },
  {
    question: 'ইতালির ড্রাইভিং লাইসেন্স (Patente B) বাংলায় দেওয়া যায়?',
    answer: 'অফিশিয়াল পরীক্ষা কম্পিউটার স্ক্রিনে ইতালিয়ান বা ফরাসি/জার্মান ভাষায় দিতে হয়। সরাসরি বাংলা প্রশ্ন থাকে না। তবে বাংলায় অনুবাদ করা ড্রাইভিং বই ও বাংলা ভিডিও টিউটোরিয়াল দেখে প্রস্তুতি নিলে সহজেই ইতালিয়ান ভাষায় ট্রু/ফলস পরীক্ষা পাস করা সম্ভব।',
  },
];
