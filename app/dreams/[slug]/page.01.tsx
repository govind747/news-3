import Link from 'next/link';
import { Clock, User, Tag, ChevronRight, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { createClient } from '@supabase/supabase-js';

interface Props { 
  params: { slug: string } 
}

export async function generateStaticParams() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data } = await sb
    .from('articles')
    .select('slug')
    .eq('category', 'dreams')
    .eq('is_published', true);

  return (data || []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data: post } = await sb
    .from('articles')
    .select('title, excerpt, meta_title, meta_description')
    .eq('slug', params.slug)
    .maybeSingle();

  return {
    title: post ? `${post.meta_title || post.title} – Dream Interpretation & Spiritual Meaning` : 'Dream Meaning',
    description: post?.meta_description || post?.excerpt || 'Explore spiritual and psychological dream interpretations on VedaWell.',
  };
}

type DreamSections = {
  meaning: string; positive: string; negative: string;
  career: string; business: string; loveLife: string;
  marriage: string; health: string; money: string;
  advice: string; precautions: string;
  faqs: { q: string; a: string }[];
};

const dreamContent: Record<string, DreamSections> = {
  default: {
    meaning: 'In most cultural traditions, dreaming carries profound symbolic weight. When this image appears in your dream, it typically signals a period of transformation, inner awareness, and personal growth in your waking life.\n\nThe specific meaning depends heavily on the context — whether the surrounding symbols were pleasant or unsettling, and what emotions you felt during the dream.',
    positive: 'A vivid, serene dream experience is an exceptionally positive sign. It indicates material abundance, emotional stability, and mental clarity. It symbolizes nurturing energy and the upcoming fulfillment of your goals.',
    negative: 'Feeling distressed or threatened in a dream may suggest underlying stress or unresolved emotional challenges. These interpretations serve as gentle warnings to address areas of your life that need care.',
    career: 'In the context of career, this dream suggests stability and steady progress. It indicates you are entering a phase of reliable professional development and eventual recognition.',
    business: 'This dream suggests that your current business endeavors require patience and consistent effort. Trust the process and focus on building strong long-term relationships.',
    loveLife: 'In terms of love, this dream highlights the value of emotional patience, open communication, and mutual trust within your relationships.',
    marriage: 'This dream signals a period of domestic harmony, mutual understanding, and shared emotional security in your home life.',
    health: 'Generally, this dream serves as a reminder to prioritize rest, grounding practices, and physical well-being.',
    money: 'This dream represents the value of financial prudence and steady accumulation of resources rather than impulsive investments.',
    advice: 'Embrace the qualities of patience, generosity, and steadfastness. Take this dream as encouragement to stay grounded and trust your intuition.',
    precautions: 'Avoid making impulsive decisions immediately following a vivid dream. Honor steady, deliberate choices.',
    faqs: [
      { q: 'Is this dream considered a good or bad sign?', a: 'Generally, dreams offer valuable guidance from your subconscious. While positive feelings bring good omens, unsettling dreams act as helpful warnings.' },
      { q: 'What should I do after having a vivid dream?', a: 'Reflect on your current life context, write down key details upon waking, and maintain a calm, grounded approach.' },
    ],
  },
};

/**
 * sections_en / sections_hi are jsonb columns. supabase-js normally
 * auto-parses jsonb into a JS object, but we guard for the case where
 * it comes back as a raw string (depends on client/version config).
 */
function parseSections(raw: unknown): Partial<DreamSections> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as Partial<DreamSections>;
}

function resolveContent(dbSections: Partial<DreamSections> | null): DreamSections {
  const fallback = dreamContent.default;
  return {
    meaning: dbSections?.meaning || fallback.meaning,
    positive: dbSections?.positive || fallback.positive,
    negative: dbSections?.negative || fallback.negative,
    career: dbSections?.career || fallback.career,
    business: dbSections?.business || fallback.business,
    loveLife: dbSections?.loveLife || fallback.loveLife,
    marriage: dbSections?.marriage || fallback.marriage,
    health: dbSections?.health || fallback.health,
    money: dbSections?.money || fallback.money,
    advice: dbSections?.advice || fallback.advice,
    precautions: dbSections?.precautions || fallback.precautions,
    faqs: dbSections?.faqs && dbSections.faqs.length > 0 ? dbSections.faqs : fallback.faqs,
  };
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border border-[#E8E8E8] mb-3">
      <details className="group">
        <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
          <span className="font-semibold text-sm text-[#111] font-body pr-4">{q}</span>
          <ChevronRight size={16} className="text-[#999] flex-shrink-0 group-open:rotate-90 transition-transform" />
        </summary>
        <div className="px-4 pb-4 text-sm text-[#555] font-body leading-relaxed border-t border-[#F0F0F0] pt-3">{a}</div>
      </details>
    </div>
  );
}

export default async function DreamDetailPage({ params }: Props) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch current dream article
  const { data: post } = await sb
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#111] mb-2">Dream Meaning Not Found</h1>
        <p className="text-gray-600 mb-6">The article you are looking for does not exist or has been removed.</p>
        <Link href="/dreams" className="btn-primary inline-block">Back to Dream Meanings</Link>
      </div>
    );
  }

  // Fetch related dreams
  const { data: relatedDreams } = await sb
    .from('articles')
    .select('id, slug, title, image_url, lucky_number, lucky_color')
    .eq('category', 'dreams')
    .neq('slug', params.slug)
    .limit(6);

  // Pull real section content from the DB (sections_en), falling back
  // to the generic placeholder only when a field is missing/empty.
  const dbSections = parseSections(post.sections_en);
  const content = resolveContent(dbSections);

  const recommendedProducts = products.slice(0, 4);

  const sections = [
    { icon: '✨', title: 'Positive Meaning', content: content.positive, bg: '#F0FDF4', border: '#BBF7D0' },
    { icon: '⚠️', title: 'Negative Meaning', content: content.negative, bg: '#FFF7ED', border: '#FED7AA' },
    { icon: '💼', title: 'Career & Professional Life', content: content.career, bg: '#EFF6FF', border: '#BFDBFE' },
    { icon: '📊', title: 'Business & Finance', content: content.business, bg: '#F0FDF4', border: '#BBF7D0' },
    { icon: '💕', title: 'Love Life & Relationships', content: content.loveLife, bg: '#FFF1F2', border: '#FECDD3' },
    { icon: '💒', title: 'Marriage', content: content.marriage, bg: '#FFF7ED', border: '#FED7AA' },
    { icon: '🏥', title: 'Health', content: content.health, bg: '#F0FDF4', border: '#BBF7D0' },
    { icon: '💰', title: 'Money & Wealth', content: content.money, bg: '#FEFCE8', border: '#FEF08A' },
  ];

  const formattedDate = post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Recently';
  const tagsList = Array.isArray(post.tags) ? post.tags : [];

  // Trim advice to a clean sentence boundary instead of a hard character slice
  const adviceSnippet =
    content.advice.length > 120
      ? content.advice.split(/(?<=[.!?])\s/)[0]
      : content.advice;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#F8F8F8] border-b border-[#E8E8E8] py-3">
        <div className="max-w-7xl mx-auto px-4 text-xs font-body text-[#999] flex items-center gap-1 flex-wrap">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span>›</span>
          <Link href="/dreams" className="hover:text-brand">Dream Meanings</Link>
          <span>›</span>
          <span className="text-[#111]">{post.title}</span>
        </div>
      </div>

      {/* Top Ad */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="dream-detail-top" size="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Article Container */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Link href="/dreams" className="tag-pill">Dream Meanings</Link>
                {post.subcategory && (
                  <span className="text-[10px] text-[#999] font-body uppercase tracking-wider">{post.subcategory}</span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#111] leading-tight mb-4">
                {post.title}: Spiritual Meaning, Positive & Negative Signs
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#999] font-body mb-4">
                <span className="flex items-center gap-1.5">
                  <User size={12} />
                  {post.author || 'VedaWell Team'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={11} />{post.read_time || 5} min read</span>
                <span>•</span>
                <span>{formattedDate}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MessageCircle size={11} />12 Comments</span>
              </div>

              {/* Share */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[11px] text-[#999] font-body">Share:</span>
                {['Facebook', 'Twitter', 'WhatsApp', 'Pinterest'].map((s) => (
                  <button key={s} className="px-3 py-1 text-[10px] font-semibold border border-[#E8E8E8] text-[#555] hover:border-brand hover:text-brand transition-all font-body">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-6 overflow-hidden">
              <img
                src={post.image_url || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <p className="text-[11px] text-[#AAA] font-body mt-1.5 italic">
                Traditional spiritual and cultural interpretation of {post.title}
              </p>
            </div>

            {/* Lucky Box */}
            <div className="bg-[#111] text-white p-5 mb-6 flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-brand">{post.lucky_number || 7}</div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">Lucky Number</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white" 
                    style={{ background: (post.lucky_color || 'green').toLowerCase() }} 
                  />
                  <span className="text-lg font-bold font-display">{post.lucky_color || 'Green'}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">Lucky Color</div>
              </div>
              <div className="flex-1 border-l border-[#333] pl-8">
                <div className="text-sm text-[#CCC] font-body italic">
                  "{adviceSnippet}"
                </div>
                <div className="text-[11px] text-brand font-body mt-2 uppercase tracking-wider">Today's Advice</div>
              </div>
            </div>

            {/* Ad in content */}
            <AdBanner slot="dream-detail-mid1" size="leaderboard" className="my-6" />

            {/* Meaning Section */}
            <div className="article-body mb-8">
              <h2>What Does It Mean to Have This Dream?</h2>
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                content.meaning.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 text-gray-700 leading-relaxed font-body">{para}</p>
                ))
              )}
            </div>

            {/* Meaning Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="p-4 border"
                  style={{ background: section.bg, borderColor: section.border }}
                >
                  <h3 className="font-body text-sm font-bold text-[#111] mb-2 flex items-center gap-2">
                    <span>{section.icon}</span> {section.title}
                  </h3>
                  <p className="text-sm text-[#444] font-body leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            {/* Ad */}
            <AdBanner slot="dream-detail-mid2" size="leaderboard" className="my-6" />

            {/* Today's Advice */}
            <div className="border-l-4 border-brand bg-[#FFF8F6] p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-[#111] mb-3">💡 Today's Advice</h2>
              <p className="text-sm text-[#444] font-body leading-relaxed">{content.advice}</p>
            </div>

            {/* Precautions */}
            <div className="bg-[#F8F8F8] border border-[#E8E8E8] p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-[#111] mb-3">⚡ Precautions</h2>
              <p className="text-sm text-[#444] font-body leading-relaxed">{content.precautions}</p>
            </div>

            {/* FAQ */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-[#111] mb-4">Frequently Asked Questions</h2>
              {content.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="bg-[#F8F8F8] border border-[#E8E8E8] p-4 mb-8 text-[11px] text-[#888] font-body leading-relaxed">
              <strong className="text-[#555]">Disclaimer:</strong> Dream interpretations are based on traditional cultural and spiritual beliefs and are presented for educational and entertainment purposes only. They do not constitute psychological, medical, or professional advice.
            </div>

            {/* Tags */}
            {tagsList.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tagsList.map((tag: string) => (
                  <Link key={tag} href={`/search?q=${tag}`} className="flex items-center gap-1 px-3 py-1 border border-[#E8E8E8] text-xs text-[#555] hover:border-brand hover:text-brand transition-all font-body">
                    <Tag size={10} />
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Author */}
            <div className="flex items-start gap-4 p-6 bg-[#F8F8F8] border border-[#E8E8E8] mb-8">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-lg flex-shrink-0">
                {(post.author || 'V')[0]}
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand font-body mb-0.5">Written by</div>
                <h4 className="font-display text-base font-bold text-[#111]">{post.author || 'VedaWell Team'}</h4>
                <p className="text-xs text-[#666] font-body mt-1">Certified dream analyst and spiritual researcher specializing in symbolism and traditional interpretations.</p>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="mb-8">
              <div className="divider-title mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest">Recommended Products</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* Related Dreams */}
            {relatedDreams && relatedDreams.length > 0 && (
              <div className="mb-8">
                <div className="divider-title mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest">Related Dreams</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedDreams.map((dream) => (
                    <Link key={dream.id} href={`/dreams/${dream.slug}`} className="group block card-hover">
                      <div className="overflow-hidden mb-2">
                        <img 
                          src={dream.image_url || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                          alt={dream.title} 
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <h3 className="text-xs font-semibold text-[#111] group-hover:text-brand transition-colors font-body line-clamp-2">{dream.title}</h3>
                      {dream.lucky_number && (
                        <p className="text-[10px] text-[#AAA] font-body mt-0.5">Lucky: {dream.lucky_number} • {dream.lucky_color || 'Green'}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div>
              <div className="divider-title mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest">Leave a Comment</h2>
              </div>
              <div className="bg-[#F8F8F8] p-6 border border-[#E8E8E8]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Your Name" className="px-4 py-3 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand font-body" />
                  <input type="email" placeholder="Your Email" className="px-4 py-3 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand font-body" />
                </div>
                <textarea
                  rows={4}
                  placeholder="Share your dream experience or ask a question..."
                  className="w-full px-4 py-3 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand mb-4 font-body resize-none"
                />
                <button className="btn-primary">Post Comment</button>
              </div>
            </div>
          </article>

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
        <AdBanner slot="dream-detail-bottom" size="leaderboard" />
      </div>
    </>
  );
}
