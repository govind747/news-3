'use client';

import Link from 'next/link';
import { Clock, User, Tag, ChevronRight, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

type BeautySections = {
  overview: string; skinType: string; keyIngredients: string;
  stepByStep: string; benefits: string; sideEffects: string;
  routine: string; expertTips: string; advice: string;
  precautions: string;
  faqs: { q: string; a: string }[];
};

const fallbackSections: BeautySections = {
  overview: 'Healthy skin and shiny hair begin with consistent care, adequate hydration, and using natural ingredients suited for your unique skin barrier.',
  skinType: 'Suitable for all skin types, especially beneficial for combination and dull skin seeking natural glow.',
  keyIngredients: 'Rose water, Aloe Vera gel, Raw Honey, Hyaluronic Acid, and Vitamin C.',
  stepByStep: '1. Cleanse face with a gentle cleanser.\n2. Apply the treatment evenly using clean hands or a brush.\n3. Leave on for 15 minutes and rinse with lukewarm water.',
  benefits: 'Boosts natural radiance, improves skin texture, deeply hydrates, and protects against environmental stressors.',
  sideEffects: 'Mild redness may occur if you have hyper-sensitive skin. Always perform a patch test before first use.',
  routine: 'Best incorporated into your evening (PM) skincare routine 2 to 3 times a week.',
  expertTips: 'Always follow up with a broad-spectrum SPF 30+ sunscreen during the daytime to lock in results and protect against UV damage.',
  advice: 'Consistency is key in skincare. Allow 3 to 4 weeks of regular use to notice visible improvements in texture and glow.',
  precautions: 'Do a 24-hour elbow patch test before applying any active ingredient or home mask to your face.',
  faqs: [
    { q: 'How often should I use this beauty remedy?', a: 'For best results without over-exfoliating your skin barrier, apply 2 to 3 times per week.' },
    { q: 'Can I use this alongside my daily retinol or Vitamin C serum?', a: 'Yes, but avoid layering multiple active acids together at the same time to prevent skin irritation.' },
  ],
};

function parseSections(raw: unknown): Partial<BeautySections> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as Partial<BeautySections>;
}

function resolveContent(dbSections: Partial<BeautySections> | null): BeautySections {
  return {
    overview: dbSections?.overview || fallbackSections.overview,
    skinType: dbSections?.skinType || fallbackSections.skinType,
    keyIngredients: dbSections?.keyIngredients || fallbackSections.keyIngredients,
    stepByStep: dbSections?.stepByStep || fallbackSections.stepByStep,
    benefits: dbSections?.benefits || fallbackSections.benefits,
    sideEffects: dbSections?.sideEffects || fallbackSections.sideEffects,
    routine: dbSections?.routine || fallbackSections.routine,
    expertTips: dbSections?.expertTips || fallbackSections.expertTips,
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
    breadcrumbHome: 'Home', breadcrumbCategory: 'Beauty & Skincare',
    titleSuffix: 'Beauty Tips, DIY Remedies & Care Guide',
    minRead: 'min read', comments: 'Comments', share: 'Share:',
    skinTypeLabel: 'Best For Skin/Hair', keyIngredientLabel: 'Key Ingredient', todaysAdvice: "Beauty Expert Tip",
    whatDoesItMean: 'Overview & Skin Benefits',
    precautions: '⚡ Safety & Patch Test Precautions', faq: 'Frequently Asked Questions',
    disclaimerLabel: 'Disclaimer:',
    disclaimer: 'Beauty and skincare content provided here is for educational and self-care informational purposes only. Individual skin reactions vary. Consult a board-certified dermatologist for specific dermatological concerns.',
    writtenBy: 'Written by', authorBio: 'Certified aesthetic researcher and skincare specialist passionate about natural ingredients and modern dermatology.',
    recommendedProducts: 'Recommended Beauty Products', relatedDreams: 'Related Beauty & Care Articles',
    leaveComment: 'Leave a Comment', yourName: 'Your Name', yourEmail: 'Your Email',
    shareYourDream: 'Share your skincare tip or ask a question...', postComment: 'Post Comment',
    skinTag: 'Skin Type:',
    sections: [
      { key: 'skinType', icon: '✨', title: 'Suitable Skin / Hair Type', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'keyIngredients', icon: '🧪', title: 'Key Natural Ingredients', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'stepByStep', icon: '📝', title: 'How to Apply (Step-by-Step)', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'benefits', icon: '🌟', title: 'Top Skin Benefits', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'routine', icon: '🗓️', title: 'Skincare Routine Integration', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'expertTips', icon: '💡', title: 'Expert Dermatologist Tips', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'sideEffects', icon: '⚠️', title: 'Possible Sensitivity & Reactions', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'overview', icon: '📜', title: 'Holistic Summary', bg: '#F0FDF4', border: '#BBF7D0' },
    ],
  },
  hi: {
    breadcrumbHome: 'होम', breadcrumbCategory: 'सौंदर्य और त्वचा की देखभाल',
    titleSuffix: 'ब्यूटी टिप्स, घरेलू नुस्खे और स्किन केयर गाइड',
    minRead: 'मिनट पढ़ें', comments: 'टिप्पणियाँ', share: 'शेयर करें:',
    skinTypeLabel: 'उपयुक्त त्वचा/बाल', keyIngredientLabel: 'मुख्य सामग्री', todaysAdvice: 'ब्यूटी एक्सपर्ट सलाह',
    whatDoesItMean: 'अवलोकन और त्वचा के लाभ',
    precautions: '⚡ सुरक्षा एवं पैच टेस्ट सावधानियाँ', faq: 'अक्सर पूछे जाने वाले प्रश्न',
    disclaimerLabel: 'अस्वीकरण:',
    disclaimer: 'यहाँ प्रदान की गई सौंदर्य और त्वचा देखभाल संबंधी जानकारी केवल सामान्य ज्ञान और स्व-देखभाल के लिए है। हर व्यक्ति की त्वचा अलग होती है। गंभीर त्वचा समस्याओं के लिए त्वचा विशेषज्ञ (Dermatologist) की सलाह लें।',
    writtenBy: 'लेखक', authorBio: 'प्रमाणित सौंदर्य शोधकर्ता एवं स्किनकेयर विशेषज्ञ, प्राकृतिक सामग्रियों और आधुनिक डर्मेटोलॉजी विशेषज्ञ।',
    recommendedProducts: 'अनुशंसित सौंदर्य उत्पाद', relatedDreams: 'संबंधित ब्यूटी आर्टिकल्स',
    leaveComment: 'टिप्पणी छोड़ें', yourName: 'आपका नाम', yourEmail: 'आपका ईमेल',
    shareYourDream: 'अपना अनुभव या प्रश्न साझा करें...', postComment: 'टिप्पणी पोस्ट करें',
    skinTag: 'त्वचा प्रकार:',
    sections: [
      { key: 'skinType', icon: '✨', title: 'उपयुक्त त्वचा / बालों का प्रकार', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'keyIngredients', icon: '🧪', title: 'मुख्य प्राकृतिक सामग्री', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'stepByStep', icon: '📝', title: 'उपयोग करने की विधि', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'benefits', icon: '🌟', title: 'त्वचा के लिए मुख्य फायदे', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'routine', icon: '🗓️', title: 'स्किनकेयर रूटीन में कब शामिल करें', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'expertTips', icon: '💡', title: 'विशेषज्ञ ब्यूटी टिप्स', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'sideEffects', icon: '⚠️', title: 'संभावित संवेदनशीलता व सावधानियाँ', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'overview', icon: '📜', title: 'विस्तृत सारांश', bg: '#F0FDF4', border: '#BBF7D0' },
    ],
  },
} as const;

export default function ArticleView({ post, relatedDreams }: { post: any; relatedDreams: any[] | null }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const t = LABELS[isHi ? 'hi' : 'en'];

  // Pick language-specific fields, falling back to English if Hindi field is missing
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
          <Link href="/beauty" className="hover:text-brand">{t.breadcrumbCategory}</Link>
          <span>›</span>
          <span className="text-[#111]">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="beauty-detail-top" size="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Link href="/beauty" className="tag-pill">{t.breadcrumbCategory}</Link>
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

            {/* Beauty Quick Summary Box */}
            <div className="bg-[#111] text-white p-5 mb-6 flex flex-wrap gap-8 items-center">
              <div className="text-center">
                <div className="text-xl font-bold font-display text-brand">{post.skin_type || post.dosha_type || post.lucky_number || 'All Skin Types'}</div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.skinTypeLabel}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center bg-rose-600 text-xs font-bold">
                    ✨
                  </div>
                  <span className="text-lg font-bold font-display">{post.key_ingredient || post.key_herb || post.lucky_color || 'Aloe Vera'}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.keyIngredientLabel}</div>
              </div>
              <div className="flex-1 border-l border-[#333] pl-8">
                <div className="text-sm text-[#CCC] font-body italic">"{adviceSnippet}"</div>
                <div className="text-[11px] text-brand font-body mt-2 uppercase tracking-wider">{t.todaysAdvice}</div>
              </div>
            </div>

            <AdBanner slot="beauty-detail-mid1" size="leaderboard" className="my-6" />

            {/* Main Content Section */}
            <div className="article-body mb-8">
              <h2>{t.whatDoesItMean}</h2>
              {bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              ) : (
                content.overview.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 text-gray-700 leading-relaxed font-body">{para}</p>
                ))
              )}
            </div>

            {/* Beauty Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {t.sections.map((section) => (
                <div key={section.title} className="p-4 border" style={{ background: section.bg, borderColor: section.border }}>
                  <h3 className="font-body text-sm font-bold text-[#111] mb-2 flex items-center gap-2">
                    <span>{section.icon}</span> {section.title}
                  </h3>
                  <p className="text-sm text-[#444] font-body leading-relaxed whitespace-pre-line">
                    {content[section.key as keyof BeautySections] as string}
                  </p>
                </div>
              ))}
            </div>

            <AdBanner slot="beauty-detail-mid2" size="leaderboard" className="my-6" />

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
                  {relatedDreams.map((item) => (
                    <Link key={item.id} href={`/beauty/${item.slug}`} className="group block card-hover">
                      <div className="overflow-hidden mb-2">
                        <img
                          src={item.image_url || 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={item.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-xs font-semibold text-[#111] group-hover:text-brand transition-colors font-body line-clamp-2">
                        {isHi && item.title_hi ? item.title_hi : item.title}
                      </h3>
                      {(item.skin_type || item.dosha_type || item.lucky_number) && (
                        <p className="text-[10px] text-[#AAA] font-body mt-0.5">
                          {t.skinTag} {item.skin_type || item.dosha_type || 'All'} • {item.key_ingredient || item.key_herb || 'Natural'}
                        </p>
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
        <AdBanner slot="beauty-detail-bottom" size="leaderboard" />
      </div>
    </>
  );
}