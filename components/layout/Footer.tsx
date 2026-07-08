'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Send, Facebook, Youtube, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-[#111111] text-white">
      {/* Newsletter Bar */}
      <div className="border-b border-[#2A2A2A] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-display">The VedaWell Newsletter</h3>
            <p className="text-[#999] text-sm mt-0.5">Wellness wisdom delivered every week. No spam, ever.</p>
          </div>
          {subscribed ? (
            <p className="text-green-400 font-medium text-sm">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 md:w-72 px-4 py-2.5 bg-[#222] border border-[#333] text-sm text-white placeholder-[#666] focus:outline-none focus:border-brand transition-colors"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold hover:bg-[#C93D0E] transition-colors"
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="block mb-4">
              <span className="text-2xl font-bold tracking-tight font-display">
                Veda<span className="text-brand">Well</span>
              </span>
            </Link>
            <p className="text-[#777] text-sm leading-relaxed mb-4">
              India's trusted wellness and knowledge platform. Healthy Mind • Healthy Body • Positive Life.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Youtube, href: '#' },
                { Icon: Twitter, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-8 h-8 bg-[#222] flex items-center justify-center hover:bg-brand transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-[#AAA] mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Dream Meanings', 'Health & Wellness', 'Ayurveda', 'Yoga', 'Beauty', 'Nutrition', 'Spirituality', 'Home Remedies'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-[#777] hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-[#AAA] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: 'Blog', href: '/blog' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Use', href: '/terms' },
                { label: 'Disclaimer', href: '/disclaimer' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#777] hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-[#AAA] mb-4">Shop</h4>
            <ul className="space-y-2">
              {['Supplements', 'Hair Care', 'Skin Care', 'Yoga Accessories', 'Organic Foods', 'Spirituality', 'Essential Oils', 'Books'].map((item) => (
                <li key={item}>
                  <Link href={`/shop?cat=${item.toLowerCase().replace(/ /g, '-')}`} className="text-[#777] hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-[#AAA] mb-4">Trending</h4>
            <ul className="space-y-2">
              {[
                { label: 'Dream About Cow', href: '/dreams/dream-about-cow-meaning' },
                { label: 'Dream About Snake', href: '/dreams/dream-about-snake-meaning' },
                { label: 'Ashwagandha Benefits', href: '/ayurveda/ashwagandha-benefits-dosage' },
                { label: 'Yoga for Back Pain', href: '/yoga/yoga-for-back-pain-beginners' },
                { label: 'Dark Circles Remedy', href: '/beauty/remove-dark-circles-naturally' },
                { label: 'Giloy Benefits', href: '/ayurveda/giloy-benefits-immunity' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#777] hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#222] py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[#555] text-xs">
            © 2026 VedaWell. All Rights Reserved. |
            <span className="text-[#444] ml-1">The content on this site is for informational purposes only and does not constitute medical advice.</span>
          </p>
          <div className="flex items-center gap-4 text-[#555] text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
