import type { Metadata, Viewport } from 'next';
import { Hind_Siliguri, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import PWAController from '@/components/PWAController';
import { LanguageProvider } from '@/lib/LanguageContext';
import { AdminConfigProvider } from '@/lib/AdminConfigContext';

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-hind',
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const viewport: Viewport = {
  themeColor: '#064e3b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://italyprobashi.com'),
  title: {
    default: 'ইতালিপ্রবাসী ডটকম 🇮🇹 | পারমেসো, লাইভ ইউরো রেট, ভাষা শিক্ষা ও লিগ্যাল গাইড',
    template: '%s | ইতালিপ্রবাসী ডটকম',
  },
  description:
    'ইতালিতে বসবাসরত বাংলাদেশি কমিউনিটির জন্য ১ নম্বর পূর্ণাঙ্গ সেবা পোর্টাল। পারমেসো রিনিউ, SPID ও কোদিচে ফিস্কালে গাইড, লাইভ ইউরো-টাকা এক্সচেঞ্জ রেট ও ২.৫% বোনাস ক্যালকুলেটর, অডিও সহ নিত্যদিনের ইতালিয়ান ভাষা শিক্ষা, রোম ও মিলানের দৈনিক নামাজের সময়সূচি এবং জরুরি ওয়ান-টাচ হেল্পলাইন।',
  applicationName: 'ইতালিপ্রবাসী ডটকম',
  authors: [{ name: 'ItalyProbashi Community' }],
  keywords: [
    'ইতালি প্রবাসী',
    'Italy Probashi',
    'ইতালি প্রবাসী পোর্টাল',
    'পারমেসো রিনিউ ইতালি',
    'SPID তৈরি ইতালি',
    'কোদিচে ফিস্কালে',
    'ইউরো রেট বাংলাদেশ',
    'Euro to BDT live rate',
    'ইতালিয়ান ভাষা শিক্ষা বাংলা',
    'CAF ইতালি বাংলা',
    'ইতালি নামাজের সময়সূচি',
    'রোম বাংলাদেশ দূতাবাস',
    'মিলান কনস্যুলেট',
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ইতালিপ্রবাসী',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'ইতালিপ্রবাসী ডটকম 🇮🇹 | পারমেসো, লাইভ ইউরো রেট, ভাষা শিক্ষা ও লিগ্যাল গাইড',
    description:
      'ইতালিতে বসবাসরত বাংলাদেশি কমিউনিটির জন্য ১ নম্বর পূর্ণাঙ্গ সেবা পোর্টাল। পারমেসো রিনিউ, SPID ও কোদিচে ফিস্কালে গাইড, লাইভ ইউরো-টাকা এক্সচেঞ্জ রেট ও ২.৫% বোনাস ক্যালকুলেটর, অডিও সহ নিত্যদিনের ইতালিয়ান ভাষা শিক্ষা, রোম ও মিলানের দৈনিক নামাজের সময়সূচি এবং জরুরি ওয়ান-টাচ হেল্পলাইন।',
    url: 'https://italyprobashi.com',
    siteName: 'ইতালিপ্রবাসী ডটকম (ItalyProbashi.com)',
    locale: 'bn_BD',
    alternateLocale: ['it_IT', 'en_US'],
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        secureUrl: '/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'ইতালিপ্রবাসী ডটকম - ItalyProbashi Portal 1200x630 Featured Social Share Banner',
      },
      {
        url: '/og-image.jpg',
        secureUrl: '/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'ইতালিপ্রবাসী ডটকম - ItalyProbashi Portal 1200x630 Featured Social Share Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ইতালিপ্রবাসী ডটকম 🇮🇹 | পারমেসো, লাইভ ইউরো রেট, ভাষা শিক্ষা ও লিগ্যাল গাইড',
    description:
      'ইতালিতে বসবাসরত বাংলাদেশি কমিউনিটির জন্য ১ নম্বর পূর্ণাঙ্গ সেবা পোর্টাল। পারমেসো রিনিউ, SPID ও কোদিচে ফিস্কালে গাইড, লাইভ ইউরো-টাকা এক্সচেঞ্জ রেট ও ২.৫% বোনাস ক্যালকুলেটর, অডিও সহ নিত্যদিনের ইতালিয়ান ভাষা শিক্ষা, রোম ও মিলানের দৈনিক নামাজের সময়সূচি এবং জরুরি ওয়ান-টাচ হেল্পলাইন।',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ইতালিপ্রবাসী ডটকম - ItalyProbashi Portal 1200x630 Featured Social Share Banner',
      },
    ],
  },
  other: {
    'fb:app_id': '966242223397117',
    'apple-mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`scroll-smooth ${hindSiliguri.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Rich Preview & Social Crawler Tags (Facebook, WhatsApp, Telegram, iMessage) */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <link rel="image_src" href="/og-image.png" />
        <meta itemProp="name" content="ইতালিপ্রবাসী ডটকম 🇮🇹 | পারমেসো, লাইভ ইউরো রেট, ভাষা শিক্ষা ও লিগ্যাল গাইড" />
        <meta
          itemProp="description"
          content="ইতালিতে বসবাসরত বাংলাদেশি কমিউনিটির জন্য ১ নম্বর পূর্ণাঙ্গ সেবা পোর্টাল। পারমেসো রিনিউ, SPID ও কোদিচে ফিস্কালে গাইড, লাইভ ইউরো-টাকা এক্সচেঞ্জ রেট ও ২.৫% বোনাস ক্যালকুলেটর, অডিও সহ নিত্যদিনের ইতালিয়ান ভাষা শিক্ষা এবং জরুরি ওয়ান-টাচ হেল্পলাইন।"
        />
        <meta itemProp="image" content="/og-image.png" />

        {/* Schema.org Structured Data for WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'ইতালিপ্রবাসী ডটকম',
              alternateName: 'ItalyProbashi Portal',
              url: 'https://italyprobashi.com',
              image: 'https://italyprobashi.com/og-image.png',
              description:
                'ইতালিতে বসবাসরত বাংলাদেশি কমিউনিটির জন্য ১ নম্বর পূর্ণাঙ্গ সেবা পোর্টাল। পারমেসো রিনিউ, SPID ও কোদিচে ফিস্কালে গাইড, লাইভ ইউরো-টাকা এক্সচেঞ্জ রেট ও ২.৫% বোনাস ক্যালকুলেটর, অডিও সহ নিত্যদিনের ইতালিয়ান ভাষা শিক্ষা এবং জরুরি হেল্পলাইন।',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'All',
              inLanguage: ['bn', 'it', 'en'],
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-emerald-500 selection:text-white bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300" suppressHydrationWarning>
        <LanguageProvider>
          <AdminConfigProvider>
            <PWAController />
            {children}
          </AdminConfigProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
