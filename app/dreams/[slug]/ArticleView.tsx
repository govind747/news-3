'use client';

import Link from 'next/link';
import { Clock, User, Tag, ChevronRight, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

type DreamSections = {
  meaning: string; positive: string; negative: string;
  career: string; business: string; loveLife: string;
  marriage: string; health: string; money: string;
  advice: string; precautions: string;
  faqs: { q: string; a: string }[];
};

const fallbackSections: DreamSections = {
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
};

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
  return {
    meaning: dbSections?.meaning || fallbackSections.meaning,
    positive: dbSections?.positive || fallbackSections.positive,
    negative: dbSections?.negative || fallbackSections.negative,
    career: dbSections?.career || fallbackSections.career,
    business: dbSections?.business || fallbackSections.business,
    loveLife: dbSections?.loveLife || fallbackSections.loveLife,
    marriage: dbSections?.marriage || fallbackSections.marriage,
    health: dbSections?.health || fallbackSections.health,
    money: dbSections?.money || fallbackSections.money,
    advice: dbSections?.advice || fallbackSections.advice,
    precautions: dbSections?.precautions || fallbackSections.precautions,
    faqs: dbSections?.faqs && dbSections.faqs.length > 0 ? dbSections.faqs : fallbackSections.faqs,
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

const LABELS = {
  en: {
    breadcrumbHome: 'Home', breadcrumbDreams: 'Dream Meanings',
    titleSuffix: 'Spiritual Meaning, Positive & Negative Signs',
    minRead: 'min read', comments: 'Comments', share: 'Share:',
    luckyNumber: 'Lucky Number', luckyColor: 'Lucky Color', todaysAdvice: "Today's Advice",
    whatDoesItMean: 'What Does It Mean to Have This Dream?',
    precautions: '⚡ Precautions', faq: 'Frequently Asked Questions',
    disclaimerLabel: 'Disclaimer:',
    disclaimer: 'Dream interpretations are based on traditional cultural and spiritual beliefs and are presented for educational and entertainment purposes only. They do not constitute psychological, medical, or professional advice.',
    writtenBy: 'Written by', authorBio: 'Certified dream analyst and spiritual researcher specializing in symbolism and traditional interpretations.',
    recommendedProducts: 'Recommended Products', relatedDreams: 'Related Dreams',
    leaveComment: 'Leave a Comment', yourName: 'Your Name', yourEmail: 'Your Email',
    shareYourDream: 'Share your dream experience or ask a question...', postComment: 'Post Comment',
    lucky: 'Lucky:',
    sections: [
      { key: 'positive', icon: '✨', title: 'Positive Meaning', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'negative', icon: '⚠️', title: 'Negative Meaning', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'career', icon: '💼', title: 'Career & Professional Life', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'business', icon: '📊', title: 'Business & Finance', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'loveLife', icon: '💕', title: 'Love Life & Relationships', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'marriage', icon: '💒', title: 'Marriage', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'health', icon: '🏥', title: 'Health', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'money', icon: '💰', title: 'Money & Wealth', bg: '#FEFCE8', border: '#FEF08A' },
    ],
  },
  hi: {
    breadcrumbHome: 'होम', breadcrumbDreams: 'स्वप्न फल',
    titleSuffix: 'आध्यात्मिक अर्थ, सकारात्मक और नकारात्मक संकेत',
    minRead: 'मिनट पढ़ें', comments: 'टिप्पणियाँ', share: 'शेयर करें:',
    luckyNumber: 'भाग्यशाली अंक', luckyColor: 'भाग्यशाली रंग', todaysAdvice: 'आज की सलाह',
    whatDoesItMean: 'इस सपने का क्या अर्थ है?',
    precautions: '⚡ सावधानियाँ', faq: 'अक्सर पूछे जाने वाले प्रश्न',
    disclaimerLabel: 'अस्वीकरण:',
    disclaimer: 'स्वप्न फल पारंपरिक सांस्कृतिक और आध्यात्मिक मान्यताओं पर आधारित हैं और केवल शैक्षिक व मनोरंजन उद्देश्यों के लिए प्रस्तुत किए गए हैं। यह मनोवैज्ञानिक, चिकित्सीय या पेशेवर सलाह नहीं है।',
    writtenBy: 'लेखक', authorBio: 'प्रमाणित स्वप्न विश्लेषक और आध्यात्मिक शोधकर्ता, प्रतीकों और पारंपरिक व्याख्याओं में विशेषज्ञ।',
    recommendedProducts: 'अनुशंसित उत्पाद', relatedDreams: 'संबंधित सपने',
    leaveComment: 'टिप्पणी छोड़ें', yourName: 'आपका नाम', yourEmail: 'आपका ईमेल',
    shareYourDream: 'अपना सपना साझा करें या प्रश्न पूछें...', postComment: 'टिप्पणी पोस्ट करें',
    lucky: 'भाग्यशाली:',
    sections: [
      { key: 'positive', icon: '✨', title: 'सकारात्मक अर्थ', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'negative', icon: '⚠️', title: 'नकारात्मक अर्थ', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'career', icon: '💼', title: 'करियर एवं व्यवसाय', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'business', icon: '📊', title: 'व्यापार एवं वित्त', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'loveLife', icon: '💕', title: 'प्रेम जीवन एवं रिश्ते', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'marriage', icon: '💒', title: 'वैवाहिक जीवन', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'health', icon: '🏥', title: 'स्वास्थ्य', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'money', icon: '💰', title: 'धन एवं संपत्ति', bg: '#FEFCE8', border: '#FEF08A' },
    ],
  },
} as const;

export default function ArticleView({ post, relatedDreams }: { post: any; relatedDreams: any[] | null }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const t = LABELS[isHi ? 'hi' : 'en'];

  // Pick language-specific fields, falling back to English if a Hindi
  // field is missing on a given article (translations get added over time).
  const title = (isHi && post.title_hi) || post.title;
  const excerpt = (isHi && post.excerpt_hi) || post.excerpt;
  const bodyHtml = (isHi && post.content_hi) || post.content;
  const subcategory = (isHi && post.subcategory_hi) || post.subcategory;

  const rawSections = isHi
    ? parseSections(post.sections_hi) || parseSections(post.sections_en)
    : parseSections(post.sections_en);
  const content = resolveContent(rawSections);

  const recommendedProducts = products.slice(0, 4);
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(isHi ? 'hi-IN' : 'en-US')
    : (isHi ? 'हाल ही में' : 'Recently');
  const tagsList = Array.isArray(post.tags) ? post.tags : [];

  const adviceSnippet =
    content.advice.length > 120 ? content.advice.split(/(?<=[.!?।])\s/)[0] : content.advice;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#F8F8F8] border-b border-[#E8E8E8] py-3">
        <div className="max-w-7xl mx-auto px-4 text-xs font-body text-[#999] flex items-center gap-1 flex-wrap">
          <Link href="/" className="hover:text-brand">{t.breadcrumbHome}</Link>
          <span>›</span>
          <Link href="/dreams" className="hover:text-brand">{t.breadcrumbDreams}</Link>
          <span>›</span>
          <span className="text-[#111]">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="dream-detail-top" size="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Link href="/dreams" className="tag-pill">{t.breadcrumbDreams}</Link>
                {subcategory && (
                  <span className="text-[10px] text-[#999] font-body uppercase tracking-wider">{subcategory}</span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#111] leading-tight mb-4">
                {title}: {t.titleSuffix}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#999] font-body mb-4">
                <span className="flex items-center gap-1.5">
                  <User size={12} />
                  {post.author || 'VedaWell Team'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={11} />{post.read_time || 5} {t.minRead}</span>
                <span>•</span>
                <span>{formattedDate}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MessageCircle size={11} />12 {t.comments}</span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-[11px] text-[#999] font-body">{t.share}</span>
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
                alt={title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Lucky Box */}
            <div className="bg-[#111] text-white p-5 mb-6 flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-brand">{post.lucky_number || 7}</div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.luckyNumber}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ background: (post.lucky_color || 'green').toLowerCase() }}
                  />
                  <span className="text-lg font-bold font-display">{post.lucky_color || 'Green'}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.luckyColor}</div>
              </div>
              <div className="flex-1 border-l border-[#333] pl-8">
                <div className="text-sm text-[#CCC] font-body italic">"{adviceSnippet}"</div>
                <div className="text-[11px] text-brand font-body mt-2 uppercase tracking-wider">{t.todaysAdvice}</div>
              </div>
            </div>

            <AdBanner slot="dream-detail-mid1" size="leaderboard" className="my-6" />

            {/* Meaning Section */}
            <div className="article-body mb-8">
              <h2>{t.whatDoesItMean}</h2>
              {bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              ) : (
                content.meaning.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 text-gray-700 leading-relaxed font-body">{para}</p>
                ))
              )}
            </div>

            {/* Meaning Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {t.sections.map((section) => (
                <div key={section.title} className="p-4 border" style={{ background: section.bg, borderColor: section.border }}>
                  <h3 className="font-body text-sm font-bold text-[#111] mb-2 flex items-center gap-2">
                    <span>{section.icon}</span> {section.title}
                  </h3>
                  <p className="text-sm text-[#444] font-body leading-relaxed">
                    {content[section.key as keyof DreamSections] as string}
                  </p>
                </div>
              ))}
            </div>

            <AdBanner slot="dream-detail-mid2" size="leaderboard" className="my-6" />

            <div className="border-l-4 border-brand bg-[#FFF8F6] p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-[#111] mb-3">💡 {t.todaysAdvice}</h2>
              <p className="text-sm text-[#444] font-body leading-relaxed">{content.advice}</p>
            </div>

            <div className="bg-[#F8F8F8] border border-[#E8E8E8] p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-[#111] mb-3">{t.precautions}</h2>
              <p className="text-sm text-[#444] font-body leading-relaxed">{content.precautions}</p>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-[#111] mb-4">{t.faq}</h2>
              {content.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>

            <div className="bg-[#F8F8F8] border border-[#E8E8E8] p-4 mb-8 text-[11px] text-[#888] font-body leading-relaxed">
              <strong className="text-[#555]">{t.disclaimerLabel}</strong> {t.disclaimer}
            </div>

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

            <div className="flex items-start gap-4 p-6 bg-[#F8F8F8] border border-[#E8E8E8] mb-8">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-lg flex-shrink-0">
                {(post.author || 'V')[0]}
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand font-body mb-0.5">{t.writtenBy}</div>
                <h4 className="font-display text-base font-bold text-[#111]">{post.author || 'VedaWell Team'}</h4>
                <p className="text-xs text-[#666] font-body mt-1">{t.authorBio}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="divider-title mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest">{t.recommendedProducts}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            {relatedDreams && relatedDreams.length > 0 && (
              <div className="mb-8">
                <div className="divider-title mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest">{t.relatedDreams}</h2>
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
                      <h3 className="text-xs font-semibold text-[#111] group-hover:text-brand transition-colors font-body line-clamp-2">
                        {isHi && dream.title_hi ? dream.title_hi : dream.title}
                      </h3>
                      {dream.lucky_number && (
                        <p className="text-[10px] text-[#AAA] font-body mt-0.5">{t.lucky} {dream.lucky_number} • {dream.lucky_color || 'Green'}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="divider-title mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest">{t.leaveComment}</h2>
              </div>
              <div className="bg-[#F8F8F8] p-6 border border-[#E8E8E8]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder={t.yourName} className="px-4 py-3 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand font-body" />
                  <input type="email" placeholder={t.yourEmail} className="px-4 py-3 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand font-body" />
                </div>
                <textarea
                  rows={4}
                  placeholder={t.shareYourDream}
                  className="w-full px-4 py-3 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand mb-4 font-body resize-none"
                />
                <button className="btn-primary">{t.postComment}</button>
              </div>
            </div>
          </article>

          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky-sidebar">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 pb-8">
        <AdBanner slot="dream-detail-bottom" size="leaderboard" />
      </div>
    </>
  );
}
