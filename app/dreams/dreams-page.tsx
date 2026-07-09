'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import { createClient } from '@supabase/supabase-js';

const POSTS_OPTIONS = [20, 40, 60, 100];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DreamsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subcat, setSubcat] = useState('All');
  const [perPage, setPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');

  // Fetch articles directly from Supabase
  useEffect(() => {
    async function fetchDreams() {
      setLoading(true);

      let query = supabase
        .from('articles')
        .select('*')
        .eq('category', 'dreams')
        .eq('is_published', true);

      // Sorting
      if (sortBy === 'newest') {
        query = query.order('published_at', { ascending: false });
      } else if (sortBy === 'popular') {
        query = query.order('read_count', { ascending: false });
      } else if (sortBy === 'az') {
        query = query.order('title', { ascending: true });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching dream articles:', error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }

    fetchDreams();
  }, [sortBy]);

  // Derive subcategory filter options from the actual fetched data,
  // instead of a hardcoded list that can drift out of sync with the DB.
  const subcategories = useMemo(() => {
    const unique = Array.from(
      new Set(posts.map((p) => p.subcategory).filter(Boolean))
    ) as string[];
    return ['All', ...unique.sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  // If the currently selected subcategory no longer exists in the fetched
  // data (e.g. after a refetch), fall back to "All" instead of showing
  // an empty result with a dangling filter selected.
  useEffect(() => {
    if (subcat !== 'All' && !subcategories.includes(subcat)) {
      setSubcat('All');
    }
  }, [subcategories, subcat]);

  // Client-side filtering for quick search & subcategory updates
  const filtered = useMemo(() => {
    let result = [...posts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          (p.tags || []).some((t: string) => t.toLowerCase().includes(q))
      );
    }

    if (subcat !== 'All') {
      result = result.filter(
        (p) =>
          p.subcategory?.toLowerCase() === subcat.toLowerCase() ||
          (p.tags || []).map((t: string) => t.toLowerCase()).includes(subcat.toLowerCase())
      );
    }

    return result;
  }, [posts, search, subcat]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const pagePosts = filtered.slice((page - 1) * perPage, page * perPage);

  // Featured strip: a curated set of cards distinct from the table rows
  // below, instead of re-rendering the same first 8 posts twice.
  const featuredPosts = useMemo(
    () => posts.filter((p) => p.featured).slice(0, 8),
    [posts]
  );

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
            Explore {posts.length > 0 ? posts.length : '100'}+ dream interpretations rooted in traditional, Vedic, and spiritual insights. Search any symbol or browse below.
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
              {subcategories.length > 1 && (
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
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#666] font-body">
                {loading ? (
                  'Loading dream interpretations...'
                ) : filtered.length === 0 ? (
                  'No dreams found matching your criteria.'
                ) : (
                  <>
                    Showing <span className="font-semibold text-[#111]">{(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)}</span> of{' '}
                    <span className="font-semibold text-[#111]">{filtered.length}</span> dreams
                  </>
                )}
              </p>
            </div>

            {/* Featured Card Strip (distinct from table rows below) */}
            {!loading && featuredPosts.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#999] font-body mb-3">Featured Dreams</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {featuredPosts.map((post) => (
                    <Link key={post.id} href={`/dreams/${post.slug}`} className="group block card-hover">
                      <div className="overflow-hidden mb-2">
                        <img
                          src={post.image_url || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={post.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-xs font-semibold text-[#111] group-hover:text-brand transition-colors font-body line-clamp-2">{post.title}</h3>
                      {post.lucky_number && (
                        <p className="text-[10px] text-[#999] font-body mt-0.5">
                          Lucky: {post.lucky_number} {post.lucky_color ? `• ${post.lucky_color}` : ''}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Table View */}
            {!loading && pagePosts.length > 0 && (
              <div className="overflow-x-auto mb-6">
                <table className="posts-table w-full text-left">
                  <thead>
                    <tr className="border-b border-[#E8E8E8] bg-[#F8F8F8] text-xs uppercase text-[#777]">
                      <th className="p-3">#</th>
                      <th className="p-3">Dream Symbol</th>
                      <th className="p-3 hidden sm:table-cell">Lucky Number</th>
                      <th className="p-3 hidden sm:table-cell">Lucky Color</th>
                      <th className="p-3 hidden md:table-cell">Read Time</th>
                      <th className="p-3 hidden md:table-cell">Date</th>
                      <th className="p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagePosts.map((post, idx) => {
                      const formattedDate = post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : '—';

                      return (
                        <tr key={post.id} className="border-b border-[#F0F0F0] hover:bg-gray-50">
                          <td className="p-3 text-[#CCC] font-bold font-body">{(page - 1) * perPage + idx + 1}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={post.image_url || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150'}
                                alt={post.title}
                                className="w-12 h-9 object-cover flex-shrink-0"
                              />
                              <div>
                                <Link href={`/dreams/${post.slug}`} className="font-semibold text-[#111] hover:text-brand transition-colors text-sm font-body">
                                  {post.title}
                                </Link>
                                <p className="text-[11px] text-[#999] font-body line-clamp-1">{post.excerpt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 hidden sm:table-cell">
                            <span className="font-bold text-brand font-body">{post.lucky_number ?? '—'}</span>
                          </td>
                          <td className="p-3 hidden sm:table-cell">
                            {post.lucky_color ? (
                              <span className="flex items-center gap-1.5 font-body text-sm">
                                <span className="w-3 h-3 rounded-full border border-[#E8E8E8]" style={{ background: post.lucky_color.toLowerCase() }} />
                                {post.lucky_color}
                              </span>
                            ) : '—'}
                          </td>
                          <td className="p-3 hidden md:table-cell">
                            <span className="flex items-center gap-1 text-[#999] font-body text-xs">
                              <Clock size={10} />{post.read_time || 5} min
                            </span>
                          </td>
                          <td className="p-3 hidden md:table-cell text-[#999] font-body text-xs">{formattedDate}</td>
                          <td className="p-3">
                            <Link
                              href={`/dreams/${post.slug}`}
                              className="text-[10px] font-bold uppercase tracking-wider text-brand hover:underline font-body"
                            >
                              Read →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* In-feed Ad */}
            <AdBanner slot="dreams-infeed" size="leaderboard" className="my-6" />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-6">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="page-num disabled:opacity-30 disabled:cursor-not-allowed border px-3 py-1"
                >
                  <ChevronLeft size={14} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`page-num border px-3 py-1 ${page === i + 1 ? 'bg-brand text-white' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="page-num disabled:opacity-30 disabled:cursor-not-allowed border px-3 py-1"
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
