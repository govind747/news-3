import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import AuthModal from '@/components/auth/AuthModal';
import CookieConsent from '@/components/shared/CookieConsent';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://vedawell.in'),
  title: {
    default: 'VedaWell – Wellness, Ayurveda, Dream Meanings & Natural Health',
    template: '%s | VedaWell',
  },
  description: 'India\'s trusted wellness platform covering dream meanings, Ayurveda, yoga, home remedies, beauty, nutrition, and spirituality. Healthy Mind • Healthy Body • Positive Life.',
  keywords: ['ayurveda', 'dream meanings', 'yoga', 'home remedies', 'wellness', 'natural health', 'spirituality'],
  authors: [{ name: 'VedaWell Editorial Team' }],
  openGraph: {
    type: 'website',
    siteName: 'VedaWell',
    title: 'VedaWell – Wellness, Ayurveda & Dream Meanings',
    description: 'India\'s trusted wellness platform. Healthy Mind • Healthy Body • Positive Life.',
    images: [{ url: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1200' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics – replace GA_MEASUREMENT_ID with your actual ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Google AdSense – replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <AuthModal />
              <CookieConsent />
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
