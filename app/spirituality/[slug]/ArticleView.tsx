'use client';

import Link from 'next/link';
import { Clock, User, Tag, ChevronRight, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';

type SpiritualitySections = {
  meaning: string;
  positive: string;
  negative: string;
  career: string;
  business: string;
  loveLife: string;
  marriage: string;
  health: string;
  money: string;
  advice: string;
  precautions: string;
  faqs: { q: string; a: string }[];
};

const fallbackSections: SpiritualitySections = {
  meaning: 'Spirituality is the pursuit of meaning and purpose in life, often involving a connection to something greater than oneself.',
  positive: 'Spiritual practices can enhance well-being, reduce stress, and foster a sense of inner peace and fulfillment.',
  negative: 'An unhealthy obsession with spirituality can lead to neglect of practical responsibilities and real-world relationships.',
  career: 'Proper dietary habits improve focus, reduce brain fog, and sustain high cognitive energy throughout demanding work hours.',
  business: 'Consistent vitality and stamina drive steady decision-making and prevent daily physical burnout.',
  loveLife: 'Balanced metabolic health improves mood regulation, hormonal harmony, and personal confidence.',
  marriage: 'Sharing nutrient-dense, wholesome meal routines builds healthy lifestyle habits and quality bonding moments.',
  health: 'Strengthens cellular defense, aids tissue repair, regulates blood sugar, and preserves cardiovascular integrity.',
  money: 'Investing in wholesome, nutrient-rich foods lowers long-term healthcare and medical expenses.',
  advice: 'Prioritize whole, unprocessed foods. Balance your daily intake of micronutrients, dietary fiber, and healthy fats.',
  precautions: 'Consult a clinical dietitian or physician if you have chronic metabolic conditions or food allergies before making drastic dietary changes.',
  faqs: [
    { q: 'How do I incorporate this ingredient into my daily diet?', a: 'You can add it to morning smoothies, salads, or cooked meals in moderate daily quantities.' },
    { q: 'Are there any side effects from overconsumption?', a: 'Consuming large amounts may cause mild digestive discomfort. Moderation is key.' },
  ],
};

function parseSections(raw: unknown): Partial<SpiritualitySections> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as Partial<SpiritualitySections>;
}

function resolveContent(dbSections: Partial<SpiritualitySections> | null): SpiritualitySections {
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
    breadcrumbHome: 'Home',
    breadcrumbCategory: 'Spirituality & Mindfulness',
    titleSuffix: 'Wisdom, Consciousness & Spiritual Insights',
    minRead: 'min read',
    comments: 'Comments',
    share: 'Share:',
    luckyNumberLabel: 'Wisdom Code',
    luckyColorLabel: 'Energy Aspect',
    expertAdvice: 'Spiritual Guidance',
    whatYouNeedToKnow: 'Core Philosophy',
    precautions: '✨ Spiritual Practice Guidelines',
    faq: 'Common Questions',
    disclaimerLabel: 'Note:',
    disclaimer: 'This content is for personal growth and educational purposes. Spiritual practices should be integrated mindfully.',
    writtenBy: 'Authored by',
    authorBio: 'Practitioner and researcher dedicated to ancient wisdom and modern consciousness exploration.',
    recommendedProducts: 'Recommended Products',
    relatedSpirituality: 'Related Spiritual Articles',
    leaveComment: 'Reflect & Comment',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    shareYourExperience: 'Share your thoughts or reflections...',
    postComment: 'Submit Reflection',
    tipLabel: 'Path Code:',
    sections: [
      { key: 'positive', icon: '🌟', title: 'Awakening Benefits', bg: '#F0FDFA', border: '#CCFBF1' },
      { key: 'negative', icon: '🧘', title: 'Practice Challenges', bg: '#FFF7ED', border: '#FFEDD5' },
      { key: 'health', icon: '🌀', title: 'Chakra & Body Harmony', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'career', icon: '✨', title: 'Purpose & Alignment', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'business', icon: '⚖️', title: 'Integrity & Ethics', bg: '#FDF2F8', border: '#FBCFE8' },
      { key: 'money', icon: '💎', title: 'Abundance Mindset', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'loveLife', icon: '💞', title: 'Soul Connection', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'marriage', icon: '🕊️', title: 'Sacred Union', bg: '#F5F3FF', border: '#DDD6FE' },
    ],
  },
  hi: {
    breadcrumbHome: 'होम',
    breadcrumbCategory: 'आध्यात्मिकता और ध्यान',
    titleSuffix: 'दर्शन, चेतना और आध्यात्मिक अनुभव',
    minRead: 'मिनट पढ़ें',
    comments: 'विचार',
    share: 'शेयर करें:',
    luckyNumberLabel: 'सूत्र कोड',
    luckyColorLabel: 'ऊर्जा का रंग',
    expertAdvice: 'आध्यात्मिक मार्गदर्शन',
    whatYouNeedToKnow: 'मूल दर्शन',
    precautions: '✨ साधना निर्देश',
    faq: 'जिज्ञासा और उत्तर',
    disclaimerLabel: 'नोट:',
    disclaimer: 'यह सामग्री व्यक्तिगत विकास और शैक्षिक उद्देश्यों के लिए है। आध्यात्मिक अभ्यासों का पालन पूरी जागरूकता के साथ करें।',
    writtenBy: 'लेखक',
    authorBio: 'प्राचीन ज्ञान और चेतना अनुसंधान के शोधकर्ता।',
    recommendedProducts: 'अनुशंसित उत्पाद',
    relatedSpirituality: 'संबंधित आध्यात्मिक लेख',
    leaveComment: 'अपनी बात रखें',
    yourName: 'आपका नाम',
    yourEmail: 'आपका ईमेल',
    shareYourExperience: 'अपने अनुभव या प्रश्न साझा करें...',
    postComment: 'टिप्पणी करें',
    tipLabel: 'मार्ग कोड:',
    sections: [
      { key: 'positive', icon: '🌟', title: 'साधना के लाभ', bg: '#F0FDFA', border: '#CCFBF1' },
      { key: 'negative', icon: '🧘', title: 'साधना की चुनौतियाँ', bg: '#FFF7ED', border: '#FFEDD5' },
      { key: 'health', icon: '🌀', title: 'चक्र और ऊर्जा संतुलन', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'career', icon: '✨', title: 'लक्ष्य और उद्देश्य', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'business', icon: '⚖️', title: 'नैतिकता और कर्म', bg: '#FDF2F8', border: '#FBCFE8' },
      { key: 'money', icon: '💎', title: 'समृद्धि का दृष्टिकोण', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'loveLife', icon: '💞', title: 'आत्मीय संबंध', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'marriage', icon: '🕊️', title: 'दांपत्य का अर्थ', bg: '#F5F3FF', border: '#DDD6FE' },
    ],
  },
} as const;

export default function ArticleView({ post, relatedSpirituality }: { post: any; relatedSpirituality: any[] | null }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const t = LABELS[isHi ? 'hi' : 'en'];

  // Pick language-specific fields, falling back to English if Hindi field is absent
  const title = (isHi && post.title_hi) || post.title;
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
          <Link href="/nutrition" className="hover:text-brand">{t.breadcrumbCategory}</Link>
          <span>›</span>
          <span className="text-[#111]">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="nutrition-detail-top" size="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Link href="/nutrition" className="tag-pill">{t.breadcrumbCategory}</Link>
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
                  {post.author || 'VedaWell Nutrition Team'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={11} />{post.read_time || 6} {t.minRead}</span>
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
                src={post.image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80'}
                alt={title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Nutrition Highlights Box */}
            <div className="bg-[#111] text-white p-5 mb-6 flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-brand">{post.lucky_number || 'N-01'}</div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.luckyNumberLabel}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-display text-brand">{post.lucky_color || 'Green / प्राकृतिक'}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.luckyColorLabel}</div>
              </div>
              <div className="flex-1 border-l border-[#333] pl-8">
                <div className="text-sm text-[#CCC] font-body italic">"{adviceSnippet}"</div>
                <div className="text-[11px] text-brand font-body mt-2 uppercase tracking-wider">{t.expertAdvice}</div>
              </div>
            </div>

            <AdBanner slot="nutrition-detail-mid1" size="leaderboard" className="my-6" />

            {/* Primary Article Body */}
            <div className="article-body mb-8">
              <h2>{t.whatYouNeedToKnow}</h2>
              {bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              ) : (
                <p className="mb-4 text-gray-700 leading-relaxed font-body">{content.meaning}</p>
              )}
            </div>

            {/* Dynamic Grid Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {t.sections.map((section) => (
                <div key={section.title} className="p-4 border" style={{ background: section.bg, borderColor: section.border }}>
                  <h3 className="font-body text-sm font-bold text-[#111] mb-2 flex items-center gap-2">
                    <span>{section.icon}</span> {section.title}
                  </h3>
                  <p className="text-sm text-[#444] font-body leading-relaxed">
                    {content[section.key as keyof SpiritualitySections] as string}
                  </p>
                </div>
              ))}
            </div>

            <AdBanner slot="spirituality-detail-mid2" size="leaderboard" className="my-6" />

            {/* Expert Advice Banner */}
            <div className="border-l-4 border-brand bg-[#FFF8F6] p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-[#111] mb-3">💡 {t.expertAdvice}</h2>
              <p className="text-sm text-[#444] font-body leading-relaxed">{content.advice}</p>
            </div>

            {/* Clinical Precautions */}
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

            {/* Author / Reviewer Bio */}
            <div className="flex items-start gap-4 p-6 bg-[#F8F8F8] border border-[#E8E8E8] mb-8">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-lg flex-shrink-0">
                {(post.author || 'V')[0]}
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand font-body mb-0.5">{t.writtenBy}</div>
                <h4 className="font-display text-base font-bold text-[#111]">{post.author || 'VedaWell Nutrition Team'}</h4>
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

            {/* Related Spirituality Articles */}
            {relatedSpirituality && relatedSpirituality.length > 0 && (
              <div className="mb-8">
                <div className="divider-title mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest">{t.relatedSpirituality}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedSpirituality.map((item) => (
                    <Link key={item.id} href={`/spirituality/${item.slug}`} className="group block card-hover">
                      <div className="overflow-hidden mb-2">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80'}
                          alt={item.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-xs font-semibold text-[#111] group-hover:text-brand transition-colors font-body line-clamp-2">
                        {isHi && item.title_hi ? item.title_hi : item.title}
                      </h3>
                      {item.lucky_number && (
                        <p className="text-[10px] text-[#AAA] font-body mt-0.5">{t.tipLabel} {item.lucky_number}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comment Section */}
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
                  placeholder={t.shareYourExperience}
                  className="w-full px-4 py-3 border border-[#E8E8E8] text-sm bg-white focus:outline-none focus:border-brand mb-4 font-body resize-none"
                />
                <button className="btn-primary">{t.postComment}</button>
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

      <div className="max-w-7xl mx-auto px-4 py-4 pb-8">
        <AdBanner slot="nutrition-detail-bottom" size="leaderboard" />
      </div>
    </>
  );
}