'use client';

import Link from 'next/link';
import { Clock, User, Tag, ChevronRight, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

type YogaSections = {
  meaning: string; positive: string; negative: string;
  career: string; business: string; loveLife: string;
  marriage: string; health: string; money: string;
  advice: string; precautions: string;
  faqs: { q: string; a: string }[];
};

const fallbackSections: YogaSections = {
  meaning: 'Yoga operates as a deep therapeutic practice connecting somatic movement with nervous system regulation. Incorporating targeted postures into your daily routine addresses the root causes of musculoskeletal tension, rehydrates joint cartilage, and improves systemic vitality.\n\nThe overall effectiveness depends on mindful breathing, proper alignment, and honoring your body’s natural boundaries.',
  positive: 'Regular practice of gentle, therapeutic yoga restores natural movement mechanics, calms central nervous system hyper-reactivity, boosts immune cell circulation, and clears chronic physical fatigue.',
  negative: 'Attempting advanced postures without proper alignment or straining through sharp pain can lead to localized inflammation or ligament strain. Always listen to your body.',
  career: 'By releasing spinal compression and shoulder tension, yoga enhances seated posture during work hours, improves focus, and builds physical stamina.',
  business: 'Consistent stress-reduction practices keep cortisol levels low, aiding mental clarity and composed decision-making during demanding business hours.',
  loveLife: 'Releasing physical pain and anxiety calms the autonomic nervous system, promoting emotional patience, presence, and deeper connection.',
  marriage: 'Shared wellness habits and reduced personal physical stress help foster a peaceful home environment and mutual support.',
  health: 'Therapeutic yoga decompress spinal structures, stimulates abdominal organs, improves lymphatic drainage, and supports long-term joint health.',
  money: 'Investing time in preventive physical care reduces long-term healthcare expenses, pain management therapies, and lost productivity.',
  advice: 'Approach your practice with patience and breath awareness rather than focusing purely on flexibility. Consistency brings long-term healing.',
  precautions: 'Avoid sudden jerking movements or forcing depth during acute pain flare-ups. Move slowly and rely on supported variations.',
  faqs: [
    { q: 'Is yoga safe for chronic pain?', a: 'Yes, when practiced mindfully. Therapeutic yoga focuses on slow, controlled movements that decompress joints and calm nerve sensitivity.' },
    { q: 'How often should I practice for noticeable results?', a: 'A gentle 15-to-20 minute daily practice yields better long-term structural and nervous system benefits than a single long session per week.' },
  ],
};

function parseSections(raw: unknown): Partial<YogaSections> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as Partial<YogaSections>;
}

function resolveContent(dbSections: Partial<YogaSections> | null): YogaSections {
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
    breadcrumbHome: 'Home', breadcrumbYoga: 'Yoga & Health',
    titleSuffix: 'Therapeutic Benefits, Anatomical Insights & Precautions',
    minRead: 'min read', comments: 'Comments', share: 'Share:',
    luckyNumber: 'Healing Code', luckyColor: 'Focus Color', todaysAdvice: "Therapist's Advice",
    whatDoesItMean: 'Anatomical & Physiological Mechanism',
    precautions: '⚡ Safety & Modifications', faq: 'Frequently Asked Questions',
    disclaimerLabel: 'Disclaimer:',
    disclaimer: 'The yoga and health insights provided here are for educational and informational purposes only. They are not intended as a substitute for professional medical advice, diagnosis, or treatment.',
    writtenBy: 'Written by', authorBio: 'Certified yoga therapist and holistic wellness researcher specializing in biomechanics, spine care, and stress reduction.',
    recommendedProducts: 'Recommended Wellness Essentials', relatedYoga: 'Related Health Articles',
    leaveComment: 'Leave a Comment', yourName: 'Your Name', yourEmail: 'Your Email',
    shareYourYoga: 'Share your experience or ask a health query...', postComment: 'Post Comment',
    lucky: 'Focus:',
    sections: [
      { key: 'positive', icon: '✨', title: 'Health Benefits', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'negative', icon: '⚠️', title: 'Contraindications & Mistakes', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'career', icon: '💼', title: 'Workplace & Focus Impact', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'business', icon: '📊', title: 'Productivity & Energy', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'loveLife', icon: '💕', title: 'Stress & Emotional Balance', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'marriage', icon: '💒', title: 'Domestic Harmony & Vitality', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'health', icon: '🏥', title: 'Anatomy & Organ Health', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'money', icon: '💰', title: 'Preventive Care Value', bg: '#FEFCE8', border: '#FEF08A' },
    ],
  },
  hi: {
    breadcrumbHome: 'होम', breadcrumbYoga: 'योग एवं स्वास्थ्य',
    titleSuffix: 'चिकित्सीय लाभ, शारीरिक क्रियाविज्ञान एवं सावधानियाँ',
    minRead: 'मिनट पढ़ें', comments: 'टिप्पणियाँ', share: 'शेयर करें:',
    luckyNumber: 'हीलिंग अंक', luckyColor: 'फोकस रंग', todaysAdvice: 'विशेषज्ञ सलाह',
    whatDoesItMean: 'शारीरिक एवं वैज्ञानिक प्रभाव',
    precautions: '⚡ सावधानियाँ एवं सुरक्षा', faq: 'अक्सर पूछे जाने वाले प्रश्न',
    disclaimerLabel: 'अस्वीकरण:',
    disclaimer: 'यहाँ प्रदान की गई योग और स्वास्थ्य संबंधी जानकारी केवल शैक्षिक और शैक्षणिक उद्देश्यों के लिए है। यह पेशेवर चिकित्सीय सलाह, निदान या उपचार का विकल्प नहीं है।',
    writtenBy: 'लेखक', authorBio: 'प्रमाणित योग चिकित्सक और स्वास्थ्य शोधकर्ता, जो बायोटेक्निक्स, रीढ़ की हड्डी की देखभाल और तनाव प्रबंधन में विशेषज्ञ हैं।',
    recommendedProducts: 'अनुशंसित योग उत्पाद', relatedYoga: 'संबंधित योग लेख',
    leaveComment: 'टिप्पणी छोड़ें', yourName: 'आपका नाम', yourEmail: 'आपका ईमेल',
    shareYourYoga: 'अपना योग अनुभव साझा करें या प्रश्न पूछें...', postComment: 'टिप्पणी पोस्ट करें',
    lucky: 'मुख्य बिंदु:',
    sections: [
      { key: 'positive', icon: '✨', title: 'स्वास्थ्य लाभ', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'negative', icon: '⚠️', title: 'सावधानियाँ एवं गलतियाँ', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'career', icon: '💼', title: 'कार्यक्षमता और ध्यान', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'business', icon: '📊', title: 'उत्पादकता एवं ऊर्जा', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'loveLife', icon: '💕', title: 'तनाव मुक्ति एवं भावनात्मक संतुलन', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'marriage', icon: '💒', title: 'पारिवारिक स्वास्थ्य एवं ऊर्जा', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'health', icon: '🏥', title: 'शरीर रचना एवं अंग स्वास्थ्य', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'money', icon: '💰', title: 'निरोगी जीवन का आर्थिक लाभ', bg: '#FEFCE8', border: '#FEF08A' },
    ],
  },
} as const;

export default function ArticleView({ post, relatedYoga }: { post: any; relatedYoga: any[] | null }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const t = LABELS[isHi ? 'hi' : 'en'];

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
          <Link href="/yoga" className="hover:text-brand">{t.breadcrumbYoga}</Link>
          <span>›</span>
          <span className="text-[#111]">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="yoga-detail-top" size="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Link href="/yoga" className="tag-pill">{t.breadcrumbYoga}</Link>
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
                src={post.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80'}
                alt={title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Healing Info Box */}
            <div className="bg-[#111] text-white p-5 mb-6 flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-brand">{post.lucky_number || 7}</div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.luckyNumber}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ background: (post.lucky_color || 'Saffron').toLowerCase().split('/')[0].trim() }}
                  />
                  <span className="text-lg font-bold font-display">{post.lucky_color || 'Saffron'}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.luckyColor}</div>
              </div>
              <div className="flex-1 border-l border-[#333] pl-8">
                <div className="text-sm text-[#CCC] font-body italic">"{adviceSnippet}"</div>
                <div className="text-[11px] text-brand font-body mt-2 uppercase tracking-wider">{t.todaysAdvice}</div>
              </div>
            </div>

            <AdBanner slot="yoga-detail-mid1" size="leaderboard" className="my-6" />

            {/* Main Article Body */}
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

            {/* Structured Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {t.sections.map((section) => (
                <div key={section.title} className="p-4 border" style={{ background: section.bg, borderColor: section.border }}>
                  <h3 className="font-body text-sm font-bold text-[#111] mb-2 flex items-center gap-2">
                    <span>{section.icon}</span> {section.title}
                  </h3>
                  <p className="text-sm text-[#444] font-body leading-relaxed">
                    {content[section.key as keyof YogaSections] as string}
                  </p>
                </div>
              ))}
            </div>

            <AdBanner slot="yoga-detail-mid2" size="leaderboard" className="my-6" />

            {/* Advice Box */}
            <div className="border-l-4 border-brand bg-[#FFF8F6] p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-[#111] mb-3">💡 {t.todaysAdvice}</h2>
              <p className="text-sm text-[#444] font-body leading-relaxed">{content.advice}</p>
            </div>

            {/* Precautions Box */}
            <div className="bg-[#F8F8F8] border border-[#E8E8E8] p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-[#111] mb-3">{t.precautions}</h2>
              <p className="text-sm text-[#444] font-body leading-relaxed">{content.precautions}</p>
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-[#111] mb-4">{t.faq}</h2>
              {content.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="bg-[#F8F8F8] border border-[#E8E8E8] p-4 mb-8 text-[11px] text-[#888] font-body leading-relaxed">
              <strong className="text-[#555]">{t.disclaimerLabel}</strong> {t.disclaimer}
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

            {/* Author Card */}
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

            {/* Recommended Products */}
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

            {/* Related Yoga Articles */}
            {relatedYoga && relatedYoga.length > 0 && (
              <div className="mb-8">
                <div className="divider-title mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest">{t.relatedYoga}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedYoga.map((item) => (
                    <Link key={item.id} href={`/yoga/${item.slug}`} className="group block card-hover">
                      <div className="overflow-hidden mb-2">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400'}
                          alt={item.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-xs font-semibold text-[#111] group-hover:text-brand transition-colors font-body line-clamp-2">
                        {isHi && item.title_hi ? item.title_hi : item.title}
                      </h3>
                      {item.lucky_number && (
                        <p className="text-[10px] text-[#AAA] font-body mt-0.5">{t.lucky} {item.lucky_number} • {item.lucky_color || 'Saffron'}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Box */}
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
                  placeholder={t.shareYourYoga}
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
        <AdBanner slot="yoga-detail-bottom" size="leaderboard" />
      </div>
    </>
  );
}