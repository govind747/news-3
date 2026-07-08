import Link from 'next/link';
import ArticleCard from '@/components/articles/ArticleCard';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import { featuredArticles } from '@/lib/data';

export const metadata = {
  title: 'Blog – Wellness, Ayurveda & Natural Health',
  description: 'Read the latest articles on wellness, Ayurveda, yoga, dream meanings, beauty, and natural health.',
};

const blogCategories = ['All', 'Ayurveda', 'Health & Wellness', 'Yoga & Meditation', 'Beauty', 'Dream Meanings', 'Nutrition', 'Spirituality', 'Home Remedies'];

export default function BlogPage() {
  const featured = featuredArticles[0];
  const articles = featuredArticles;

  return (
    <>
      <div className="bg-[#F8F8F8] border-b border-[#E8E8E8] py-3">
        <div className="max-w-7xl mx-auto px-4 text-xs font-body text-[#999]">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-[#111]">Blog</span>
        </div>
      </div>

      <div className="bg-[#111] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">VedaWell Blog</h1>
          <p className="text-[#AAA] font-body max-w-2xl mx-auto">
            Expert articles on wellness, Ayurveda, yoga, dream interpretation, beauty, and natural health. Researched, trusted, practical.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="blog-top" size="leaderboard" />
      </div>

      {/* Category Filter Tabs */}
      <div className="border-b border-[#E8E8E8] sticky top-16 bg-white z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-0 -mb-px scrollbar-hide">
            {blogCategories.map((cat, i) => (
              <button
                key={cat}
                className={`flex-shrink-0 px-5 py-4 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-all font-body ${
                  i === 0 ? 'border-brand text-brand' : 'border-transparent text-[#999] hover:text-[#111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            {/* Featured Article */}
            <div className="mb-8">
              <div className="divider-title">
                <h2 className="text-sm font-bold uppercase tracking-widest">Featured</h2>
              </div>
              <ArticleCard article={featured} variant="featured" />
            </div>

            <AdBanner slot="blog-infeed-1" size="leaderboard" className="mb-8" />

            {/* 2-column grid */}
            <div className="divider-title">
              <h2 className="text-sm font-bold uppercase tracking-widest">Latest Articles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {articles.slice(1, 7).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <AdBanner slot="blog-infeed-2" size="leaderboard" className="mb-8" />

            {/* Horizontal list */}
            <div className="divider-title">
              <h2 className="text-sm font-bold uppercase tracking-widest">More Stories</h2>
            </div>
            <div className="space-y-5 mb-8">
              {articles.slice(7, 12).map((article) => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>

            <div className="text-center mt-4">
              <button className="btn-outline">Load More Stories</button>
            </div>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky-sidebar"><Sidebar /></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 pb-8">
        <AdBanner slot="blog-bottom" size="leaderboard" />
      </div>
    </>
  );
}
