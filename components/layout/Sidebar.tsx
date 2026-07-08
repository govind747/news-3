import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp } from 'lucide-react';
import AdBanner from '../ads/AdBanner';
import { featuredArticles, categories } from '@/lib/data';

export default function Sidebar() {
  const trending = featuredArticles.filter((a) => a.trending).slice(0, 5);

  return (
    <aside className="w-full space-y-8">
      {/* Ad Rectangle */}
      <AdBanner slot="sidebar-top" size="rectangle" />

      {/* Trending Posts */}
      <div>
        <div className="divider-title">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            <TrendingUp size={14} className="text-brand" />
            Trending
          </h2>
        </div>
        <div className="space-y-4">
          {trending.map((article, idx) => (
            <Link key={article.id} href={`/${article.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${article.slug}`} className="flex gap-3 group">
              <span className="text-2xl font-bold text-[#E8E8E8] font-display flex-shrink-0 leading-none w-6">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand font-body">{article.category}</span>
                <p className="text-sm font-medium text-[#111] group-hover:text-brand transition-colors leading-snug mt-0.5 line-clamp-2">
                  {article.title}
                </p>
                <span className="text-[11px] text-[#999] font-body">{article.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="divider-title">
          <h2 className="text-sm font-bold uppercase tracking-widest">Categories</h2>
        </div>
        <div className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="flex items-center justify-between py-2 border-b border-[#F5F5F5] hover:text-brand transition-colors group"
            >
              <span className="flex items-center gap-2 text-sm text-[#333] group-hover:text-brand">
                <span>{cat.icon}</span>
                {cat.name}
              </span>
              <span className="text-[11px] text-[#999] font-body bg-[#F5F5F5] px-2 py-0.5">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad */}
      <AdBanner slot="sidebar-mid" size="rectangle" />

      {/* Popular Tags */}
      <div>
        <div className="divider-title">
          <h2 className="text-sm font-bold uppercase tracking-widest">Popular Tags</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {['ayurveda', 'dreams', 'yoga', 'meditation', 'ashwagandha', 'immunity', 'diabetes', 'weight loss', 'skin care', 'hair fall', 'stress', 'home remedies', 'spirituality', 'nutrition'].map((tag) => (
            <Link
              key={tag}
              href={`/search?q=${tag}`}
              className="px-3 py-1 border border-[#E8E8E8] text-xs text-[#555] hover:border-brand hover:text-brand transition-all capitalize"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-[#111] text-white p-6">
        <h3 className="font-display text-lg font-bold mb-2">Weekly Wellness Tips</h3>
        <p className="text-[#AAA] text-sm mb-4">Join 50,000+ readers who get our free wellness newsletter.</p>
        <input
          type="email"
          placeholder="Your email address"
          className="w-full px-3 py-2.5 bg-[#222] border border-[#333] text-sm text-white placeholder-[#555] focus:outline-none focus:border-brand mb-3"
        />
        <button className="w-full btn-primary text-center">Subscribe Free</button>
      </div>

      {/* Ad Bottom */}
      <AdBanner slot="sidebar-bottom" size="rectangle" />
    </aside>
  );
}
