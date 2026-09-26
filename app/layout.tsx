import type { Metadata } from 'next';
import { Hind_Siliguri, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'ইতালিপ্রবাসী ডটকম - Bangla-Italy Portal',
  description: 'ইতালিতে বসবাসরত প্রবাসী বাংলাদেশিদের জন্য লিগ্যাল গাইড, পারমেসো, স্পিড ও কোদিচে ফিস্কালে, ইউরো-টাকা লাইভ কনভার্টার, ইতালিয়ান-বাংলা ভাষা শিক্ষা ও সহায়িকা পোর্টাল।',
  openGraph: {
    title: 'ইতালিপ্রবাসী ডটকম - Bangla-Italy Portal',
    description: 'ইতালিতে বসবাসরত প্রবাসী বাংলাদেশিদের জন্য লিগ্যাল গাইড, পারমেসো, স্পিড ও কোদিচে ফিস্কালে, ইউরো-টাকা লাইভ কনভার্টার, ইতালিয়ান-বাংলা ভাষা শিক্ষা ও সহায়িকা পোর্টাল।',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ইতালিপ্রবাসী ডটকম - Bangla-Italy Portal',
    description: 'ইতালিতে বসবাসরত প্রবাসী বাংলাদেশিদের জন্য লিগ্যাল গাইড, পারমেসো, স্পিড ও কোদিচে ফিস্কালে, ইউরো-টাকা লাইভ কনভার্টার, ইতালিয়ান-বাংলা ভাষা শিক্ষা ও সহায়িকা পোর্টাল।',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`scroll-smooth ${hindSiliguri.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased selection:bg-emerald-500 selection:text-white bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
