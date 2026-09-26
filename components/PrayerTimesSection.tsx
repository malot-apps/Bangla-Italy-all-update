'use client';

import React, { useState, useEffect, useMemo, useSyncExternalStore } from 'react';
import {
  Clock,
  MapPin,
  Navigation,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Copy,
  Check,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  RefreshCw,
  Calendar,
  Compass,
  ChevronDown,
  Share2,
  Info,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export interface ItalianCity {
  id: string;
  nameBn: string;
  nameIt: string;
  nameEn: string;
  region: string;
  lat: number;
  lng: number;
  qiblaBearing: number; // degrees clockwise from True North
  distanceKm: number;   // approximate distance to Makkah in km
}

export const MAJOR_ITALIAN_CITIES: ItalianCity[] = [
  { id: 'rome', nameBn: 'রোম', nameIt: 'Roma', nameEn: 'Rome', region: 'Lazio', lat: 41.9028, lng: 12.4964, qiblaBearing: 123.3, distanceKm: 3650 },
  { id: 'milan', nameBn: 'মিলান', nameIt: 'Milano', nameEn: 'Milan', region: 'Lombardia', lat: 45.4642, lng: 9.1900, qiblaBearing: 125.1, distanceKm: 3950 },
  { id: 'venice', nameBn: 'ভেনিস', nameIt: 'Venezia', nameEn: 'Venice', region: 'Veneto', lat: 45.4408, lng: 12.3155, qiblaBearing: 128.4, distanceKm: 3780 },
  { id: 'bologna', nameBn: 'বোলোগনা', nameIt: 'Bologna', nameEn: 'Bologna', region: 'Emilia-Romagna', lat: 44.4949, lng: 11.3426, qiblaBearing: 125.8, distanceKm: 3790 },
  { id: 'florence', nameBn: 'ফ্লোরেন্স', nameIt: 'Firenze', nameEn: 'Florence', region: 'Toscana', lat: 43.7696, lng: 11.2558, qiblaBearing: 124.9, distanceKm: 3780 },
  { id: 'naples', nameBn: 'নাপোলি', nameIt: 'Napoli', nameEn: 'Naples', region: 'Campania', lat: 40.8518, lng: 14.2681, qiblaBearing: 120.9, distanceKm: 3480 },
  { id: 'turin', nameBn: 'তুরিন', nameIt: 'Torino', nameEn: 'Turin', region: 'Piemonte', lat: 45.0703, lng: 7.6869, qiblaBearing: 123.4, distanceKm: 4060 },
  { id: 'brescia', nameBn: 'ব্রেশিয়া', nameIt: 'Brescia', nameEn: 'Brescia', region: 'Lombardia', lat: 45.5416, lng: 10.2118, qiblaBearing: 126.1, distanceKm: 3890 },
  { id: 'genoa', nameBn: 'জেনোয়া', nameIt: 'Genova', nameEn: 'Genoa', region: 'Liguria', lat: 44.4056, lng: 8.9463, qiblaBearing: 123.7, distanceKm: 3970 },
  { id: 'verona', nameBn: 'ভেরোনা', nameIt: 'Verona', nameEn: 'Verona', region: 'Veneto', lat: 45.4384, lng: 10.9916, qiblaBearing: 126.9, distanceKm: 3840 },
  { id: 'palermo', nameBn: 'পালেরমো', nameIt: 'Palermo', nameEn: 'Palermo', region: 'Sicilia', lat: 38.1157, lng: 13.3615, qiblaBearing: 114.7, distanceKm: 3370 },
  { id: 'catania', nameBn: 'কাতানিয়া', nameIt: 'Catania', nameEn: 'Catania', region: 'Sicilia', lat: 37.5079, lng: 15.0830, qiblaBearing: 113.8, distanceKm: 3230 },
  { id: 'bari', nameBn: 'বারি', nameIt: 'Bari', nameEn: 'Bari', region: 'Puglia', lat: 41.1171, lng: 16.8719, qiblaBearing: 123.5, distanceKm: 3310 },
  { id: 'padova', nameBn: 'পাদোভা', nameIt: 'Padova', nameEn: 'Padua', region: 'Veneto', lat: 45.4064, lng: 11.8768, qiblaBearing: 127.8, distanceKm: 3800 },
  { id: 'bergamo', nameBn: 'বেরগামো', nameIt: 'Bergamo', nameEn: 'Bergamo', region: 'Lombardia', lat: 45.6983, lng: 9.6773, qiblaBearing: 125.6, distanceKm: 3930 },
  { id: 'vicenza', nameBn: 'ভিচেঞ্জা', nameIt: 'Vicenza', nameEn: 'Vicenza', region: 'Veneto', lat: 45.5455, lng: 11.5354, qiblaBearing: 127.4, distanceKm: 3810 },
  { id: 'perugia', nameBn: 'পেরুজা', nameIt: 'Perugia', nameEn: 'Perugia', region: 'Umbria', lat: 43.1107, lng: 12.3908, qiblaBearing: 124.2, distanceKm: 3690 },
  { id: 'ancona', nameBn: 'আনকোনা', nameIt: 'Ancona', nameEn: 'Ancona', region: 'Marche', lat: 43.6158, lng: 13.5189, qiblaBearing: 126.6, distanceKm: 3620 },
  { id: 'modena', nameBn: 'মোদেনা', nameIt: 'Modena', nameEn: 'Modena', region: 'Emilia-Romagna', lat: 44.6471, lng: 10.9252, qiblaBearing: 125.4, distanceKm: 3820 },
  { id: 'reggio-emilia', nameBn: 'রেজ্জো এমিলিয়া', nameIt: 'Reggio Emilia', nameEn: 'Reggio Emilia', region: 'Emilia-Romagna', lat: 44.6983, lng: 10.6312, qiblaBearing: 125.1, distanceKm: 3850 },
];

export interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface PrayerMeta {
  hijriDate: string;
  hijriMonth: string;
  hijriYear: string;
  gregorianDate: string;
  gregorianDay: string;
  timezone: string;
  methodName: string;
}

const CALCULATION_METHODS = [
  { id: 3, nameBn: 'মুসলিম ওয়ার্ল্ড লীগ (ইতালিতে প্রচলিত)', nameIt: 'Lega Musulmana Mondiale (MWL)', nameEn: 'Muslim World League' },
  { id: 13, nameBn: 'ইউকোই - ইসলামিক ইউনিয়ন অব ইতালি (UCOII)', nameIt: 'Unione Comunità Islamiche d\'Italia (UCOII)', nameEn: 'UCOII - Italy' },
  { id: 5, nameBn: 'মিশরীয় সার্ভে জেনারেল অথরিটি', nameIt: 'Autorità Generale Egiziana', nameEn: 'Egyptian General Authority' },
  { id: 1, nameBn: 'করাচি ইসলামিক বিজ্ঞান বিশ্ববিদ্যালয়', nameIt: 'Univ. Scienze Islamiche Karachi', nameEn: 'Univ. of Islamic Sciences Karachi' },
  { id: 4, nameBn: 'উম্মুল কুরা বিশ্ববিদ্যালয়, মক্কা', nameIt: 'Univ. Umm al-Qura, La Mecca', nameEn: 'Umm al-Qura Univ. Makkah' },
];

// Offline sensible default for Rome
const DEFAULT_TIMINGS: PrayerTimesData = {
  Fajr: '05:28',
  Sunrise: '07:01',
  Dhuhr: '13:01',
  Asr: '16:24',
  Sunset: '19:01',
  Maghrib: '19:01',
  Isha: '20:28',
  Imsak: '05:18',
  Midnight: '01:01',
  Firstthird: '23:01',
  Lastthird: '03:01',
};

// Convert HH:MM string to today's Date object
function parseTimeToDate(timeStr: string, baseDate: Date): Date {
  if (!timeStr) return new Date(baseDate);
  const [h, m] = timeStr.split(':').map((num) => parseInt(num, 10));
  const d = new Date(baseDate);
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function PrayerTimesSection() {
  const { currentLang } = useLanguage();
  const isMounted = useIsClient();

  const [selectedCityId, setSelectedCityId] = useState<string>('rome');
  const [customLocation, setCustomLocation] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [calculationMethod, setCalculationMethod] = useState<number>(3);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData>(DEFAULT_TIMINGS);
  const [prayerMeta, setPrayerMeta] = useState<PrayerMeta>({
    hijriDate: '15',
    hijriMonth: 'Rabīʿ al-thānī',
    hijriYear: '1448',
    gregorianDate: '26-09-2026',
    gregorianDay: 'Saturday',
    timezone: 'Europe/Rome',
    methodName: 'Muslim World League',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showAllCities, setShowAllCities] = useState<boolean>(false);

  // Keep a live 1-second clock after mount
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentCity = useMemo(() => {
    if (customLocation) {
      return {
        id: 'custom',
        nameBn: customLocation.label,
        nameIt: customLocation.label,
        nameEn: customLocation.label,
        region: 'GPS Position',
        lat: customLocation.lat,
        lng: customLocation.lng,
        qiblaBearing: calculateQiblaAngle(customLocation.lat, customLocation.lng),
        distanceKm: Math.round(calculateDistanceToMecca(customLocation.lat, customLocation.lng)),
      };
    }
    return MAJOR_ITALIAN_CITIES.find((c) => c.id === selectedCityId) || MAJOR_ITALIAN_CITIES[0];
  }, [selectedCityId, customLocation]);

  // Fetch Prayer Times from Aladhan API with cancellation cleanup
  useEffect(() => {
    let isCancelled = false;
    const loadTimes = async () => {
      try {
        const today = new Date();
        const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
        const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${currentCity.lat}&longitude=${currentCity.lng}&method=${calculationMethod}`;

        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();

        if (!isCancelled && data && data.data && data.data.timings) {
          const cleanTimings: Partial<PrayerTimesData> = {};
          for (const [key, val] of Object.entries(data.data.timings)) {
            cleanTimings[key as keyof PrayerTimesData] = String(val).split(' ')[0];
          }
          setPrayerTimes(cleanTimings as PrayerTimesData);

          const hijri = data.data.date?.hijri;
          const greg = data.data.date?.gregorian;
          setPrayerMeta({
            hijriDate: hijri?.day || '15',
            hijriMonth: hijri?.month?.en || 'Rabīʿ al-thānī',
            hijriYear: hijri?.year || '1448',
            gregorianDate: greg?.date || dateStr,
            gregorianDay: greg?.weekday?.en || 'Saturday',
            timezone: data.data.meta?.timezone || 'Europe/Rome',
            methodName: data.data.meta?.method?.name || 'Muslim World League',
          });
        }
      } catch {
        console.warn('Could not fetch live prayer times from API, using cached offline times.');
      }
    };

    loadTimes();

    return () => {
      isCancelled = true;
    };
  }, [currentCity.lat, currentCity.lng, calculationMethod]);

  const handleManualRefresh = async () => {
    setIsLoading(true);
    try {
      const today = new Date();
      const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
      const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${currentCity.lat}&longitude=${currentCity.lng}&method=${calculationMethod}`;

      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();

      if (data && data.data && data.data.timings) {
        const cleanTimings: Partial<PrayerTimesData> = {};
        for (const [key, val] of Object.entries(data.data.timings)) {
          cleanTimings[key as keyof PrayerTimesData] = String(val).split(' ')[0];
        }
        setPrayerTimes(cleanTimings as PrayerTimesData);
      }
    } catch {
      // keep existing
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Geolocation auto-detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        currentLang === 'bn'
          ? 'আপনার ব্রাউজার লোকেশন সমর্থন করে না।'
          : currentLang === 'it'
          ? 'La geolocalizzazione non è supportata dal browser.'
          : 'Geolocation is not supported by your browser.'
      );
      return;
    }

    setIsLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Check if nearest major Italian city
        let closestCity = MAJOR_ITALIAN_CITIES[0];
        let minDistance = Infinity;

        MAJOR_ITALIAN_CITIES.forEach((city) => {
          const dist = Math.hypot(city.lat - latitude, city.lng - longitude);
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = city;
          }
        });

        const label =
          currentLang === 'bn'
            ? `আপনার অবস্থান (কাছে: ${closestCity.nameBn})`
            : currentLang === 'it'
            ? `Posizione Rilevata (Vicino: ${closestCity.nameIt})`
            : `Detected Location (Near: ${closestCity.nameEn})`;

        setCustomLocation({
          lat: latitude,
          lng: longitude,
          label,
        });
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        let msg =
          currentLang === 'bn'
            ? 'লোকেশন পারমিশন দেওয়া হয়নি। তালিকা থেকে শহর বেছে নিন।'
            : currentLang === 'it'
            ? 'Permesso di localizzazione non concesso. Seleziona una città dall\'elenco.'
            : 'Location permission was denied. Please select a city from the list.';
        if (error.code === error.POSITION_UNAVAILABLE) {
          msg = currentLang === 'bn' ? 'লোকেশন সিগন্যাল পাওয়া যায়নি।' : 'Location unavailable.';
        }
        setLocationError(msg);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Calculate current active prayer and next prayer countdown
  const prayerSchedule = useMemo(() => {
    const list = [
      { id: 'Fajr', nameBn: 'ফজর', nameIt: 'Fajr', nameEn: 'Fajr', arName: 'الفجر', time: prayerTimes.Fajr, icon: Sunrise },
      { id: 'Sunrise', nameBn: 'সূর্যোদয়', nameIt: 'Alba / Shuruq', nameEn: 'Sunrise', arName: 'الشروق', time: prayerTimes.Sunrise, icon: Sun },
      { id: 'Dhuhr', nameBn: 'যোহর', nameIt: 'Dhuhr', nameEn: 'Dhuhr', arName: 'الظهر', time: prayerTimes.Dhuhr, icon: Sun },
      { id: 'Asr', nameBn: 'আসর', nameIt: 'Asr', nameEn: 'Asr', arName: 'العصر', time: prayerTimes.Asr, icon: Sun },
      { id: 'Maghrib', nameBn: 'মাগরিব (ইফতার)', nameIt: 'Maghrib (Iftar)', nameEn: 'Maghrib (Iftar)', arName: 'المغرب', time: prayerTimes.Maghrib, icon: Sunset },
      { id: 'Isha', nameBn: 'ইশা', nameIt: 'Isha', nameEn: 'Isha', arName: 'العشاء', time: prayerTimes.Isha, icon: Moon },
    ];

    const now = currentTime.getTime();
    const fajrDate = parseTimeToDate(prayerTimes.Fajr, currentTime).getTime();
    const sunriseDate = parseTimeToDate(prayerTimes.Sunrise, currentTime).getTime();
    const dhuhrDate = parseTimeToDate(prayerTimes.Dhuhr, currentTime).getTime();
    const asrDate = parseTimeToDate(prayerTimes.Asr, currentTime).getTime();
    const maghribDate = parseTimeToDate(prayerTimes.Maghrib, currentTime).getTime();
    const ishaDate = parseTimeToDate(prayerTimes.Isha, currentTime).getTime();

    // Tomorrow's Fajr
    const tomorrowFajr = new Date(fajrDate);
    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);

    let active = 'Isha';
    let next = { id: 'Fajr', nameBn: 'ফজর', nameIt: 'Fajr', nameEn: 'Fajr', timeMs: fajrDate };

    if (now < fajrDate) {
      active = 'Isha';
      next = { id: 'Fajr', nameBn: 'ফজর', nameIt: 'Fajr', nameEn: 'Fajr', timeMs: fajrDate };
    } else if (now < sunriseDate) {
      active = 'Fajr';
      next = { id: 'Sunrise', nameBn: 'সূর্যোদয়', nameIt: 'Alba', nameEn: 'Sunrise', timeMs: sunriseDate };
    } else if (now < dhuhrDate) {
      active = 'Sunrise';
      next = { id: 'Dhuhr', nameBn: 'যোহর', nameIt: 'Dhuhr', nameEn: 'Dhuhr', timeMs: dhuhrDate };
    } else if (now < asrDate) {
      active = 'Dhuhr';
      next = { id: 'Asr', nameBn: 'আসর', nameIt: 'Asr', nameEn: 'Asr', timeMs: asrDate };
    } else if (now < maghribDate) {
      active = 'Asr';
      next = { id: 'Maghrib', nameBn: 'মাগরিব', nameIt: 'Maghrib', nameEn: 'Maghrib', timeMs: maghribDate };
    } else if (now < ishaDate) {
      active = 'Maghrib';
      next = { id: 'Isha', nameBn: 'ইশা', nameIt: 'Isha', nameEn: 'Isha', timeMs: ishaDate };
    } else {
      active = 'Isha';
      next = { id: 'Fajr', nameBn: 'ফজর (আগামীকাল)', nameIt: 'Fajr (Domani)', nameEn: 'Fajr (Tomorrow)', timeMs: tomorrowFajr.getTime() };
    }

    const diffMs = Math.max(0, next.timeMs - now);
    const diffSec = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSec / 3600);
    const minutes = Math.floor((diffSec % 3600) / 60);
    const seconds = diffSec % 60;

    return {
      list,
      active,
      next,
      countdown: {
        hours,
        minutes,
        seconds,
        formatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      },
    };
  }, [prayerTimes, currentTime]);

  // Copy Prayer Times to clipboard for WhatsApp / Social
  const handleCopyTimes = () => {
    const cityName = currentLang === 'bn' ? currentCity.nameBn : currentLang === 'it' ? currentCity.nameIt : currentCity.nameEn;
    const text = `🕌 ইতালিতে নামাজের সময়সূচি (${cityName}) - ${prayerMeta.gregorianDate}
----------------------------------------
হিজরি: ${prayerMeta.hijriDate} ${prayerMeta.hijriMonth} ${prayerMeta.hijriYear}
সাহরি শেষ (ইমসাক): ${prayerTimes.Imsak}
ফজর: ${prayerTimes.Fajr}
সূর্যোদয়: ${prayerTimes.Sunrise}
যোহর: ${prayerTimes.Dhuhr}
আসর: ${prayerTimes.Asr}
মাগরিব (ইফতার): ${prayerTimes.Maghrib}
ইশা: ${prayerTimes.Isha}
অর্ধরাত: ${prayerTimes.Midnight}
কিবলা দিক: ${currentCity.qiblaBearing}° (মক্কা অভিমুখে)
----------------------------------------
উৎস: ইতালিপ্রবাসী ডটকম`;

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  // Play a soothing audio chime preview using Web Audio API
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setIsPlayingAudio(true);

      // Play soft harmonic meditative chimes
      const now = ctx.currentTime;
      const frequencies = [392.0, 440.0, 523.25, 587.33, 659.25]; // G4, A4, C5, D5, E5

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.45);

        gain.gain.setValueAtTime(0, now + idx * 0.45);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.45 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.45 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.45);
        osc.stop(now + idx * 0.45 + 1.3);
      });

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 3000);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  // Toggle browser push notification for prayers
  const handleToggleNotifications = async () => {
    if (!('Notification' in window)) {
      alert(currentLang === 'bn' ? 'আপনার ব্রাউজারে নোটিফিকেশন সাপোর্ট করে না।' : 'Notification not supported.');
      return;
    }

    if (Notification.permission === 'granted') {
      setNotificationsEnabled(!notificationsEnabled);
    } else {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        new Notification(
          currentLang === 'bn' ? 'ইতালিপ্রবাসী নামাজের সতর্কতা চালু হয়েছে' : 'ItalyProbashi Prayer Alert Enabled',
          {
            body: currentLang === 'bn' ? `${currentCity.nameBn} শহরের নামাজের ওয়াক্তে আপনাকে রিমাইন্ডার পাঠানো হবে।` : `You will be notified for prayer times in ${currentCity.nameEn}.`,
            icon: '/icon-192.png',
          }
        );
      } else {
        setNotificationsEnabled(false);
      }
    }
  };

  // 5 Main Obligatory Prayer cards list
  const primaryPrayers = [
    {
      id: 'Fajr',
      nameBn: 'ফজর',
      nameIt: 'Fajr',
      nameEn: 'Fajr',
      arName: 'الفجر',
      time: prayerTimes.Fajr,
      subTextBn: `সাহরি শেষ: ${prayerTimes.Imsak}`,
      subTextIt: `Imsak: ${prayerTimes.Imsak}`,
      subTextEn: `Suhoor: ${prayerTimes.Imsak}`,
      icon: Sunrise,
      badge: currentLang === 'bn' ? 'ভোর' : 'Dawn',
    },
    {
      id: 'Dhuhr',
      nameBn: 'যোহর',
      nameIt: 'Dhuhr',
      nameEn: 'Dhuhr',
      arName: 'الظهر',
      time: prayerTimes.Dhuhr,
      subTextBn: 'দুপুরের নামাজ',
      subTextIt: 'Mezzogiorno',
      subTextEn: 'Noon Prayer',
      icon: Sun,
      badge: currentLang === 'bn' ? 'দুপুর' : 'Noon',
    },
    {
      id: 'Asr',
      nameBn: 'আসর',
      nameIt: 'Asr',
      nameEn: 'Asr',
      arName: 'العصر',
      time: prayerTimes.Asr,
      subTextBn: 'বিকেলের নামাজ',
      subTextIt: 'Pomeriggio',
      subTextEn: 'Afternoon',
      icon: Sun,
      badge: currentLang === 'bn' ? 'বিকাল' : 'Afternoon',
    },
    {
      id: 'Maghrib',
      nameBn: 'মাগরিব',
      nameIt: 'Maghrib',
      nameEn: 'Maghrib',
      arName: 'المغرب',
      time: prayerTimes.Maghrib,
      subTextBn: `ইফতারের সময়: ${prayerTimes.Maghrib}`,
      subTextIt: `Iftar: ${prayerTimes.Maghrib}`,
      subTextEn: `Iftar: ${prayerTimes.Maghrib}`,
      icon: Sunset,
      badge: currentLang === 'bn' ? 'ইফতার' : 'Iftar',
      isIftar: true,
    },
    {
      id: 'Isha',
      nameBn: 'ইশা',
      nameIt: 'Isha',
      nameEn: 'Isha',
      arName: 'العشاء',
      time: prayerTimes.Isha,
      subTextBn: 'রাতের নামাজ ও তারাবীহ',
      subTextIt: 'Notte',
      subTextEn: 'Night Prayer',
      icon: Moon,
      badge: currentLang === 'bn' ? 'রাত' : 'Night',
    },
  ];

  return (
    <section id="prayer-times" className="py-12 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">
              <span>{currentLang === 'bn' ? 'ইসলামিক সময়সূচি' : currentLang === 'it' ? 'Orari Islamici' : 'Islamic Schedule'}</span>
              <span aria-hidden="true">·</span>
              <span>{currentLang === 'bn' ? 'ইতালি প্রবাসী' : 'Italy Community'}</span>
              <span aria-hidden="true">·</span>
              <span suppressHydrationWarning>{prayerMeta.gregorianDate}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentLang === 'bn'
                ? 'ইতালিতে আজকের নামাজের সময়সূচি'
                : currentLang === 'it'
                ? 'Orari delle Preghiere in Italia'
                : 'Islamic Prayer Times in Italy'}
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-2xl text-balance">
              {currentLang === 'bn'
                ? 'আপনার বর্তমান জিপিএস অবস্থান বা ইতালির যেকোনো প্রধান শহরের ৫ ওয়াক্ত নামাজ, সাহরি ও ইফতারের নির্ভরযোগ্য সময়সূচি।'
                : currentLang === 'it'
                ? 'Orari affidabili per le 5 preghiere giornaliere, Suhoor e Iftar per la tua città in Italia.'
                : 'Reliable 5 daily prayer times, Suhoor, and Iftar based on your location in Italy.'}
            </p>
          </div>

          {/* Action Tools: Geolocation, Audio Chime, Copy, Notifications */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDetectLocation}
              disabled={isLoading}
              title={currentLang === 'bn' ? 'আমার বর্তমান লোকেশন ব্যবহার করুন' : 'Use Current Location'}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shadow-2xs"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="whitespace-nowrap">{currentLang === 'bn' ? 'আমার লোকেশন' : currentLang === 'it' ? 'Mia Posizione' : 'My Location'}</span>
            </button>

            <button
              onClick={handleToggleAudio}
              title={currentLang === 'bn' ? 'আজানের সুর প্রিভিউ' : 'Adhan Chime Preview'}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors shadow-2xs ${
                isPlayingAudio
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 animate-pulse'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="whitespace-nowrap">{currentLang === 'bn' ? 'আজানের সুর' : currentLang === 'it' ? 'Suono Adhan' : 'Adhan Sound'}</span>
            </button>

            <button
              onClick={handleToggleNotifications}
              title={currentLang === 'bn' ? 'নামাজের রিমাইন্ডার' : 'Prayer Notifications'}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors shadow-2xs ${
                notificationsEnabled
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {notificationsEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
              <span className="whitespace-nowrap">
                {notificationsEnabled
                  ? currentLang === 'bn' ? 'নোটিফিকেশন অন' : 'Alerts On'
                  : currentLang === 'bn' ? 'নোটিফিকেশন' : 'Alerts'}
              </span>
            </button>

            <button
              onClick={handleCopyTimes}
              title={currentLang === 'bn' ? 'সময়সূচি কপি করুন' : 'Copy Prayer Times'}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="whitespace-nowrap">
                {isCopied
                  ? currentLang === 'bn' ? 'কপি হয়েছে!' : 'Copied!'
                  : currentLang === 'bn' ? 'কপি / শেয়ার' : 'Share'}
              </span>
            </button>
          </div>
        </div>

        {/* Location Error Notice if any */}
        {locationError && (
          <div className="mb-6 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between">
            <span>{locationError}</span>
            <button
              onClick={() => setLocationError(null)}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline ml-2"
            >
              {currentLang === 'bn' ? 'ঠিক আছে' : 'OK'}
            </button>
          </div>
        )}

        {/* City Filter Tabs Bar (Interactive Filter Controls) */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {currentLang === 'bn' ? 'শহর বেছে নিন:' : currentLang === 'it' ? 'Seleziona Città:' : 'Select City:'}
            </span>

            {/* Quick dropdown for all cities */}
            <div className="relative inline-block text-left">
              <select
                value={customLocation ? 'custom' : selectedCityId}
                onChange={(e) => {
                  if (e.target.value === 'custom') return;
                  setCustomLocation(null);
                  setSelectedCityId(e.target.value);
                }}
                className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              >
                {customLocation && (
                  <option value="custom">📍 {customLocation.label}</option>
                )}
                {MAJOR_ITALIAN_CITIES.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nameIt} ({city.nameBn}) - {city.region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Segmented City Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {MAJOR_ITALIAN_CITIES.slice(0, showAllCities ? 20 : 8).map((city) => {
              const isSelected = !customLocation && selectedCityId === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    setCustomLocation(null);
                    setSelectedCityId(city.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-emerald-800 dark:bg-emerald-600 text-white shadow-2xs font-semibold'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {currentLang === 'bn' ? city.nameBn : city.nameIt}
                </button>
              );
            })}
            <button
              onClick={() => setShowAllCities(!showAllCities)}
              className="px-2.5 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
            >
              <span>{showAllCities ? (currentLang === 'bn' ? 'কম দেখান' : 'Show Less') : (currentLang === 'bn' ? '+ আরো শহর' : '+ More Cities')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllCities ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Current Active Prayer & Live Countdown Banner */}
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-md relative overflow-hidden border border-emerald-800/40">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-200 mb-1">
                <span className="font-semibold text-emerald-300">
                  {currentLang === 'bn' ? currentCity.nameBn : currentCity.nameIt}
                </span>
                <span aria-hidden="true">·</span>
                <span suppressHydrationWarning>{prayerMeta.hijriDate} {prayerMeta.hijriMonth} {prayerMeta.hijriYear} AH</span>
                <span aria-hidden="true">·</span>
                <span suppressHydrationWarning>{prayerMeta.timezone}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl sm:text-2xl font-bold" suppressHydrationWarning>
                  {isMounted
                    ? (currentLang === 'bn'
                        ? `পরবর্তী ওয়াক্ত: ${prayerSchedule.next.nameBn}`
                        : `Prossima Preghiera: ${prayerSchedule.next.nameIt}`)
                    : (currentLang === 'bn'
                        ? 'পরবর্তী ওয়াক্ত'
                        : 'Prossima Preghiera')}
                </h3>
                <span className="text-emerald-300 text-sm font-medium" suppressHydrationWarning>
                  {isMounted ? `(${prayerTimes[prayerSchedule.next.id as keyof PrayerTimesData] || '--:--'})` : ''}
                </span>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="bg-emerald-950/70 border border-emerald-700/60 rounded-lg p-3 sm:px-4 sm:py-2.5 text-right flex items-center justify-between sm:justify-end gap-3 backdrop-blur-xs">
              <div className="text-left sm:text-right">
                <span className="block text-2xs uppercase tracking-wider text-emerald-300/90 font-medium">
                  {currentLang === 'bn' ? 'বাকি সময়' : currentLang === 'it' ? 'Tempo Rimanente' : 'Time Remaining'}
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold tabular-nums text-white tracking-wide" suppressHydrationWarning>
                  {isMounted ? prayerSchedule.countdown.formatted : '--:--:--'}
                </span>
              </div>
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* 5 Primary Prayer Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
          {primaryPrayers.map((prayer) => {
            const isActive = isMounted && prayerSchedule.active === prayer.id;
            const isNext = isMounted && prayerSchedule.next.id === prayer.id;
            const IconComponent = prayer.icon;

            return (
              <div
                key={prayer.id}
                className={`relative rounded-xl p-4 transition-all duration-200 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                    : isNext
                    ? 'bg-white dark:bg-slate-900 border-teal-300 dark:border-teal-700 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                {/* Header of Card */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {prayer.badge}
                    </span>
                    <span className="text-xs font-arabic text-slate-400 dark:text-slate-500">
                      {prayer.arName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <IconComponent
                      className={`w-4 h-4 ${
                        isActive
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isNext
                          ? 'text-teal-600 dark:text-teal-400'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    />
                    <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                      {currentLang === 'bn' ? prayer.nameBn : prayer.nameIt}
                    </h4>
                  </div>
                </div>

                {/* Prayer Time Display */}
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white tracking-tight mb-1">
                    {prayer.time || '--:--'}
                  </div>

                  {/* Subtext info */}
                  <div className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
                    {currentLang === 'bn' ? prayer.subTextBn : prayer.subTextIt}
                  </div>

                  {/* Status Indicator */}
                  {isActive && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-200 dark:border-emerald-900/60 text-2xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{currentLang === 'bn' ? 'চলমান ওয়াক্ত' : currentLang === 'it' ? 'In corso' : 'Active Now'}</span>
                    </div>
                  )}
                  {isNext && !isActive && (
                    <div className="mt-2.5 pt-2 border-t border-teal-200 dark:border-teal-900/60 text-2xs font-semibold text-teal-700 dark:text-teal-400 flex items-center gap-1">
                      <span>{currentLang === 'bn' ? 'পরবর্তী ওয়াক্ত' : currentLang === 'it' ? 'Prossima' : 'Next Up'}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Milestones & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Milestone Times Card */}
          <div className="md:col-span-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-2xs">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                {currentLang === 'bn'
                  ? 'দৈনিক অন্যান্য গুরুত্বপূর্ণ ইসলামিক সময়সূচি'
                  : currentLang === 'it'
                  ? 'Altri Orari Importanti del Giorno'
                  : 'Other Daily Islamic Milestones'}
              </span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="block text-2xs text-slate-500 dark:text-slate-400 mb-0.5">
                  {currentLang === 'bn' ? 'সাহরি শেষ (ইমসাক)' : 'Fine Suhoor (Imsak)'}
                </span>
                <span className="text-lg font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                  {prayerTimes.Imsak}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="block text-2xs text-slate-500 dark:text-slate-400 mb-0.5">
                  {currentLang === 'bn' ? 'সূর্যোদয় (শুরুক)' : 'Alba (Shuruq)'}
                </span>
                <span className="text-lg font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                  {prayerTimes.Sunrise}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="block text-2xs text-slate-500 dark:text-slate-400 mb-0.5">
                  {currentLang === 'bn' ? 'সূর্যাস্ত (ইফতার)' : 'Tramonto (Iftar)'}
                </span>
                <span className="text-lg font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                  {prayerTimes.Maghrib}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="block text-2xs text-slate-500 dark:text-slate-400 mb-0.5">
                  {currentLang === 'bn' ? 'ইসলামিক মধ্যরাত' : 'Mezzanotte Islamica'}
                </span>
                <span className="text-lg font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                  {prayerTimes.Midnight}
                </span>
              </div>
            </div>

            {/* Quick tips about prayers in Italy */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {currentLang === 'bn'
                  ? 'ইতালিতে গ্রীষ্ম ও শীতকালে নামাজের ওয়াক্তের সময়ের পার্থক্য বেশি থাকে। রোজা রাখা বা জামাতে নামাজের জন্য স্থানীয় মসজিদ বা ইসলামিক সেন্টারের সাথে মিলিয়ে নিন।'
                  : currentLang === 'it'
                  ? 'Gli orari variano sensibilmente tra estate e inverno. Per il digiuno e le preghiere comunitarie verificare con la moschea locale.'
                  : 'Times vary significantly between summer and winter seasons. Coordinate with your local Italian mosque for congregational prayers.'}
              </span>
            </div>
          </div>

          {/* Qibla Direction Card */}
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{currentLang === 'bn' ? 'কিবলা দিকনির্দেশনা' : currentLang === 'it' ? 'Direzione Qibla' : 'Qibla Direction'}</span>
                </h4>
                <span className="text-2xs text-slate-400 dark:text-slate-500 font-mono">
                  {currentCity.qiblaBearing.toFixed(1)}°
                </span>
              </div>

              {/* Compass Visual Mock */}
              <div className="relative w-28 h-28 mx-auto my-2 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center shadow-inner">
                <span className="absolute top-1 text-2xs font-bold text-red-500">N</span>
                <span className="absolute bottom-1 text-2xs font-bold text-slate-400">S</span>
                <span className="absolute left-1 text-2xs font-bold text-slate-400">W</span>
                <span className="absolute right-1 text-2xs font-bold text-slate-400">E</span>

                {/* Rotating Qibla Needle */}
                <div
                  className="w-1 h-12 bg-gradient-to-t from-transparent via-emerald-500 to-emerald-600 rounded-full origin-bottom transition-transform duration-700"
                  style={{ transform: `rotate(${currentCity.qiblaBearing}deg)` }}
                />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-600 border border-white" />
              </div>

              <div className="text-center mt-2">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {currentLang === 'bn'
                    ? `উত্তর থেকে ${currentCity.qiblaBearing.toFixed(0)}° পূর্ব-দক্ষিণ দিকে`
                    : `${currentCity.qiblaBearing.toFixed(0)}° Sud-Est dal Nord`}
                </p>
                <p className="text-2xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentLang === 'bn'
                    ? `মক্কার দূরত্ব: প্রায় ${currentCity.distanceKm.toLocaleString('bn-BD')} কিমি`
                    : `Distanza da La Mecca: ~${currentCity.distanceKm} km`}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-2xs text-slate-400">
                {currentLang === 'bn' ? 'কা\'বা শরীফ অভিমুখে কিবলা অ্যাঙ্গেল' : 'Direzione verso la Sacra Kaaba'}
              </span>
            </div>
          </div>
        </div>

        {/* Calculation Method Footer Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {currentLang === 'bn' ? 'গণনা পদ্ধতি:' : currentLang === 'it' ? 'Metodo di calcolo:' : 'Method:'}
            </span>
            <select
              value={calculationMethod}
              onChange={(e) => setCalculationMethod(parseInt(e.target.value, 10))}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            >
              {CALCULATION_METHODS.map((method) => (
                <option key={method.id} value={method.id}>
                  {currentLang === 'bn' ? method.nameBn : currentLang === 'it' ? method.nameIt : method.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <span>
              {currentLang === 'bn' ? 'উৎস: AlAdhan API · MWL' : 'Data: AlAdhan API · MWL Standard'}
            </span>
            <button
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{currentLang === 'bn' ? 'রিফ্রেশ' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Great circle bearing from coordinates to Makkah (21.4225° N, 39.8262° E)
function calculateQiblaAngle(lat: number, lng: number): number {
  const meccaLat = (21.4225 * Math.PI) / 180;
  const meccaLng = (39.8262 * Math.PI) / 180;
  const userLat = (lat * Math.PI) / 180;
  const userLng = (lng * Math.PI) / 180;

  const dLng = meccaLng - userLng;
  const y = Math.sin(dLng);
  const x = Math.cos(userLat) * Math.tan(meccaLat) - Math.sin(userLat) * Math.cos(dLng);

  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  bearing = (bearing + 360) % 360;
  return Math.round(bearing * 10) / 10;
}

// Approximate distance in km to Makkah
function calculateDistanceToMecca(lat: number, lng: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((21.4225 - lat) * Math.PI) / 180;
  const dLng = ((39.8262 - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) * Math.cos((21.4225 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
