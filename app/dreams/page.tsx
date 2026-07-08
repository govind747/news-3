'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import { dreamPosts } from '@/lib/data';

const POSTS_OPTIONS = [20, 40, 60, 100];

const subcategories = ['All', 'Animals', 'Nature', 'Elements', 'People', 'Objects', 'Situations'];

export default function DreamsPage() {
  const [search, setSearch] = useState('');
  const [subcat, setSubcat] = useState('All');
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');

  const filtered = useMemo(() => {
    let posts = [...dreamPosts];
    if (search) posts = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || (p.tags || []).some((t) => t.includes(search.toLowerCase())));
    if (subcat !== 'All') posts = posts.filter((p) => p.subcategory === subcat || (p.tags || []).includes(subcat.toLowerCase()));
    return posts;
  }, [search, subcat]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pagePosts = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#F8F8F8] border-b border-[#E8E8E8] py-3">
        <div className="max-w-7xl mx-auto px-4 text-xs font-body text-[#999]">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-[#111]">Dream Meanings</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-[#111] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="tag-pill mb-3 inline-block">🌙 Dream Interpretation</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Dream Meanings Encyclopedia</h1>
          <p className="text-[#AAA] font-body max-w-2xl mx-auto">
            Explore {dreamPosts.length}+ dream interpretations rooted in Hindu, Islamic, and Biblical traditions. Search any symbol or browse by category.
          </p>
        </div>
      </div>

      {/* Top Ad */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="dreams-top" size="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Filters Bar */}
            <div className="bg-[#F8F8F8] border border-[#E8E8E8] p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search dream meanings..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8E8E8] text-sm focus:outline-none focus:border-brand font-body"
                  />
                </div>

                {/* Per page */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#999] font-body whitespace-nowrap">Show:</span>
                  <select
                    value={perPage}
                    onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                    className="px-3 py-2 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand font-body"
                  >
                    {POSTS_OPTIONS.map((n) => (
                      <option key={n} value={n}>{n} posts</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-[#999]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand font-body"
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="az">A → Z</option>
                  </select>
                </div>
              </div>

              {/* Subcategory Filter */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#E8E8E8]">
                {subcategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSubcat(cat); setPage(1); }}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all font-body ${
                      subcat === cat
                        ? 'bg-brand text-white'
                        : 'bg-white border border-[#E8E8E8] text-[#555] hover:border-brand hover:text-brand'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#666] font-body">
                Showing <span className="font-semibold text-[#111]">{(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)}</span> of{' '}
                <span className="font-semibold text-[#111]">{filtered.length}</span> dreams
              </p>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto mb-6">
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Dream Symbol</th>
                    <th className="hidden sm:table-cell">Lucky Number</th>
                    <th className="hidden sm:table-cell">Lucky Color</th>
                    <th className="hidden md:table-cell">Read Time</th>
                    <th className="hidden md:table-cell">Date</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {pagePosts.map((post, idx) => (
                    <tr key={post.id}>
                      <td className="text-[#CCC] font-bold font-body">{(page - 1) * perPage + idx + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <img src={post.image} alt={post.title} className="w-12 h-9 object-cover flex-shrink-0" />
                          <div>
                            <Link href={`/dreams/${post.slug}`} className="font-semibold text-[#111] hover:text-brand transition-colors text-sm font-body">
                              {post.title}
                            </Link>
                            <p className="text-[11px] text-[#999] font-body line-clamp-1">{post.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell">
                        <span className="font-bold text-brand font-body">{post.luckyNumber ?? '—'}</span>
                      </td>
                      <td className="hidden sm:table-cell">
                        {post.luckyColor ? (
                          <span className="flex items-center gap-1.5 font-body text-sm">
                            <span className="w-3 h-3 rounded-full border border-[#E8E8E8]" style={{ background: post.luckyColor.toLowerCase() }} />
                            {post.luckyColor}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="hidden md:table-cell">
                        <span className="flex items-center gap-1 text-[#999] font-body text-xs">
                          <Clock size={10} />{post.readTime} min
                        </span>
                      </td>
                      <td className="hidden md:table-cell text-[#999] font-body text-xs">{post.date}</td>
                      <td>
                        <Link
                          href={`/dreams/${post.slug}`}
                          className="text-[10px] font-bold uppercase tracking-wider text-brand hover:underline font-body"
                        >
                          Read →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {pagePosts.slice(0, 8).map((post) => (
                <Link key={post.id} href={`/dreams/${post.slug}`} className="group block card-hover">
                  <div className="overflow-hidden mb-2">
                    <img src={post.image} alt={post.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xs font-semibold text-[#111] group-hover:text-brand transition-colors font-body line-clamp-2">{post.title}</h3>
                  {post.luckyNumber && (
                    <p className="text-[10px] text-[#999] font-body mt-0.5">Lucky: {post.luckyNumber} • {post.luckyColor}</p>
                  )}
                </Link>
              ))}
            </div>

            {/* In-feed Ad */}
            <AdBanner slot="dreams-infeed" size="leaderboard" className="my-6" />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-6">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="page-num disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`page-num ${page === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="page-num disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky-sidebar">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 py-4 pb-8">
        <AdBanner slot="dreams-bottom" size="leaderboard" />
      </div>
    </>
  );
}
