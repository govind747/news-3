import Link from 'next/link';
import { Clock, User, Tag, Star, ChevronRight, Share2, Heart, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/products/ProductCard';
import { dreamPosts, products } from '@/lib/data';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return dreamPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = dreamPosts.find((p) => p.slug === params.slug);
  return {
    title: post ? `${post.title} – Dream Interpretation & Spiritual Meaning` : 'Dream Meaning',
    description: post?.excerpt,
  };
}

const dreamContent: Record<string, {
  meaning: string; positive: string; negative: string;
  career: string; business: string; loveLife: string;
  marriage: string; health: string; money: string;
  advice: string; precautions: string;
  faqs: { q: string; a: string }[];
}> = {
  'dream-about-cow-meaning': {
    meaning: 'In most cultural traditions, dreaming of a cow is considered highly auspicious. The cow is a sacred animal in Hinduism, representing abundance, prosperity, motherly love, and divine blessings. When a cow appears in your dream, it typically signals a period of positive transformation, nourishment, and spiritual growth in your life.\n\nThe specific meaning depends heavily on the context — whether the cow was white or black, whether it was healthy or ill, whether it was calm or aggressive, and what it was doing in the dream.',
    positive: 'A healthy, white, or golden cow in your dream is an exceptionally positive sign. It indicates material abundance, financial growth, and emotional contentment. A cow giving milk symbolizes nurturing energy, creative fertility, and the fulfillment of desires. Seeing a cow with a calf suggests new opportunities or the arrival of good news, possibly related to family or career.',
    negative: 'A sick, thin, or injured cow may suggest financial difficulties or health concerns on the horizon. A black cow or an angry cow charging at you could represent obstacles, hidden enemies, or unresolved conflicts. However, even these negative interpretations often serve as warnings rather than predictions — they can be understood as your subconscious urging you to take corrective action.',
    career: 'A cow in your dream relating to career suggests stability and steady progress. Just as a cow provides consistent nourishment, this dream indicates you are in — or will soon enter — a phase of reliable professional growth. It may signal a promotion, a new opportunity, or the recognition of your consistent hard work. Trust the process and remain dedicated.',
    business: 'For business-minded individuals, dreaming of a cow is one of the most auspicious omens. It suggests that your current business endeavors will yield substantial returns. If you have been considering a new venture, this dream encourages you to proceed with confidence. The cow also represents the value of patience in building long-term business relationships.',
    loveLife: 'A cow in your dream in the context of love suggests a nurturing, stable, and deeply caring relationship. If you are single, this dream indicates that someone with genuine, wholesome intentions will enter your life. If you are in a relationship, it suggests your bond is becoming deeper and more secure. The cow\'s motherly energy encourages unconditional love and emotional patience.',
    marriage: 'In the context of marriage, the cow is an exceptionally auspicious symbol in Indian tradition. It suggests that marriage plans will proceed smoothly, with the support of family and positive circumstances. For those already married, it signals a period of domestic harmony, mutual understanding, and shared prosperity.',
    health: 'Dreaming of a healthy cow generally suggests good health and vitality. It may indicate that your body is recovering from a period of illness or stress. If you have been concerned about a health issue, this dream offers reassurance. The cow\'s grounding energy also suggests that time spent in nature or with animals could be beneficial for your well-being.',
    money: 'Cows have been symbols of wealth across virtually every civilization. In dreams, a well-nourished cow represents financial security and the steady accumulation of resources. This dream may be signaling an upcoming financial gain — perhaps an inheritance, a bonus, a successful investment, or a new income stream. It encourages prudent financial planning alongside gratitude for existing abundance.',
    advice: 'The appearance of a cow in your dream is generally a positive message from your subconscious. Embrace the qualities the cow represents: patience, generosity, nurturing, and steadfastness. Consider whether there are areas of your life where you need to be more giving or where you need to slow down and be patient. Take this dream as encouragement to stay grounded and trust the process.',
    precautions: 'While this dream is largely positive, avoid making impulsive decisions in the days following this dream. The cow\'s energy is steady and deliberate — honor that by taking measured, thoughtful steps. If the cow in your dream appeared sick or distressed, this is your subconscious signaling that something in your life needs attention — particularly health, finances, or relationships.',
    faqs: [
      { q: 'Is dreaming of a cow good or bad?', a: 'Generally, dreaming of a cow is considered a very good omen, especially in Hindu tradition where the cow is sacred. It typically symbolizes prosperity, abundance, and nurturing energy. However, context matters — a sick or aggressive cow may carry cautionary messages.' },
      { q: 'What does a white cow in a dream mean?', a: 'A white cow is one of the most auspicious dream symbols. It represents spiritual purity, divine blessings, great fortune, and enlightenment. In Vedic tradition, white cows are associated with Kamadhenu, the wish-fulfilling divine cow.' },
      { q: 'What does it mean when a cow chases you in a dream?', a: 'Being chased by a cow may indicate that you are avoiding a responsibility or running from an obligation in your waking life. It can also represent feelings of guilt or unresolved conflicts. The dream encourages you to face these issues directly.' },
      { q: 'What does dreaming of a cow giving milk mean?', a: 'A cow giving milk is highly auspicious — it symbolizes nourishment, abundance, creative flow, and the fulfillment of desires. It may also suggest that a nurturing relationship or creative endeavor will soon bear fruit.' },
      { q: 'What is the Islamic interpretation of dreaming about a cow?', a: 'In Islamic dream interpretation (based on Ibn Sirin\'s work), a cow often represents a year or a period of time. A fat cow may indicate a prosperous year ahead, while a thin cow may signal a year of hardship. It can also represent a woman or the earth.' },
    ],
  },
};

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

export default function DreamDetailPage({ params }: Props) {
  const post = dreamPosts.find((p) => p.slug === params.slug) || dreamPosts[0];
  const content = dreamContent[params.slug] || dreamContent['dream-about-cow-meaning'];
  const relatedDreams = dreamPosts.filter((p) => p.slug !== params.slug).slice(0, 6);
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
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Link href="/dreams" className="tag-pill">Dream Meanings</Link>
                {post.subcategory && <span className="text-[10px] text-[#999] font-body uppercase tracking-wider">{post.subcategory}</span>}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#111] leading-tight mb-4">
                {post.title}: Spiritual Meaning, Positive & Negative Signs
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#999] font-body mb-4">
                <span className="flex items-center gap-1.5">
                  <img src={post.authorImage || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=50'} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                  {post.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={11} />{post.readTime} min read</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MessageCircle size={11} />24 Comments</span>
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
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <p className="text-[11px] text-[#AAA] font-body mt-1.5 italic">
                Traditional interpretation of dreaming about a cow across Hindu, Islamic, and Biblical traditions
              </p>
            </div>

            {/* Lucky Box */}
            <div className="bg-[#111] text-white p-5 mb-6 flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-brand">{post.luckyNumber || 7}</div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">Lucky Number</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white" style={{ background: (post.luckyColor || 'green').toLowerCase() }} />
                  <span className="text-lg font-bold font-display">{post.luckyColor || 'Green'}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">Lucky Color</div>
              </div>
              <div className="flex-1 border-l border-[#333] pl-8">
                <div className="text-sm text-[#CCC] font-body italic">
                  "{content.advice.slice(0, 120)}..."
                </div>
                <div className="text-[11px] text-brand font-body mt-2 uppercase tracking-wider">Today's Advice</div>
              </div>
            </div>

            {/* Ad in content */}
            <AdBanner slot="dream-detail-mid1" size="leaderboard" className="my-6" />

            {/* Meaning */}
            <div className="article-body mb-8">
              <h2>What Does It Mean to Dream About a Cow?</h2>
              {content.meaning.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
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

            {/* Medical Disclaimer */}
            <div className="bg-[#F8F8F8] border border-[#E8E8E8] p-4 mb-8 text-[11px] text-[#888] font-body leading-relaxed">
              <strong className="text-[#555]">Disclaimer:</strong> Dream interpretations are based on traditional cultural and spiritual beliefs and are presented for educational and entertainment purposes only. They do not constitute psychological, medical, or professional advice. Dream meanings are subjective and may vary based on personal context.
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${tag}`} className="flex items-center gap-1 px-3 py-1 border border-[#E8E8E8] text-xs text-[#555] hover:border-brand hover:text-brand transition-all font-body">
                  <Tag size={10} />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Author */}
            <div className="flex items-start gap-4 p-6 bg-[#F8F8F8] border border-[#E8E8E8] mb-8">
              <img
                src={post.authorImage || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand font-body mb-0.5">Written by</div>
                <h4 className="font-display text-base font-bold text-[#111]">{post.author}</h4>
                <p className="text-xs text-[#666] font-body mt-1">Certified dream analyst and spiritual researcher with 15+ years of experience in Vedic astrology and symbolic interpretation.</p>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="mb-8">
              <div className="divider-title">
                <h2 className="text-sm font-bold uppercase tracking-widest">Recommended Products</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* Related Dreams */}
            <div className="mb-8">
              <div className="divider-title">
                <h2 className="text-sm font-bold uppercase tracking-widest">Related Dreams</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {relatedDreams.map((dream) => (
                  <Link key={dream.id} href={`/dreams/${dream.slug}`} className="group block card-hover">
                    <div className="overflow-hidden mb-2">
                      <img src={dream.image} alt={dream.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-xs font-semibold text-[#111] group-hover:text-brand transition-colors font-body line-clamp-2">{dream.title}</h3>
                    {dream.luckyNumber && (
                      <p className="text-[10px] text-[#AAA] font-body mt-0.5">Lucky: {dream.luckyNumber} • {dream.luckyColor}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <div className="divider-title">
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
