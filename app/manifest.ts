import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'ইতালিপ্রবাসী - Bangla-Italy Portal',
    short_name: 'ইতালিপ্রবাসী',
    description: 'ইতালিতে বসবাসরত ও নতুন প্রবাসী বাংলাদেশিদের জন্য লিগ্যাল গাইড, অনুবাদক, পারমেসো ও জরুরি হটলাইন পোর্টাল',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#064e3b',
    theme_color: '#064e3b',
    categories: ['utilities', 'lifestyle', 'productivity', 'news'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
