'use client';

import Link from 'next/link';
import { Clock, User, Tag, ChevronRight, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

type AyurvedaSections = {
  overview: string; causes: string; symptoms: string;
  diet: string; remedies: string; lifestyle: string;
  dosha: string; herbs: string; advice: string;
  precautions: string;
  faqs: { q: string; a: string }[];
};

const fallbackSections: AyurvedaSections = {
  overview: 'Ayurveda views body health as a delicate balance between mind, body, and spirit. When dosha imbalance occurs, natural remedies and dietary adjustments help restore harmony.',
  causes: 'Imbalance is typically caused by improper diet, irregular sleep schedules, high stress, and seasonal changes affecting internal metabolic fire (Agni).',
  symptoms: 'Common indicators include digestive sluggishness, fatigue, restless sleep, and mild body stiffness.',
  diet: 'Favor warm, freshly cooked foods with light spices like cumin, turmeric, and ginger. Minimize cold, processed, or excessively spicy meals.',
  remedies: 'Warm herbal infusions such as Holy Basil (Tulsi) or Ginger tea twice daily help detoxify and strengthen natural immunity.',
  lifestyle: 'Establish a consistent daily routine (Dinacharya), including morning gentle stretching, yoga, and adequate hydration.',
  dosha: 'Primarily associated with Vata and Kapha imbalances that require grounding and warming therapies.',
  herbs: 'Beneficial traditional herbs include Ashwagandha, Triphala, Tulsi, and Amalaki.',
  advice: 'Maintain consistency with your daily wellness routine and practice mindful eating in a calm environment.',
  precautions: 'Consult a certified Ayurvedic practitioner before introducing potent herbal remedies if you have existing medical conditions.',
  faqs: [
    { q: 'How long does it take to see results with Ayurvedic remedies?', a: 'Ayurveda works holistically on the root cause. Visible improvements usually begin within 2 to 4 weeks of consistent diet and routine modifications.' },
    { q: 'Can I follow these remedies alongside regular medication?', a: 'Always consult your primary physician or an Ayurvedic doctor before combining herbal remedies with standard medications.' },
  ],
};

function parseSections(raw: unknown): Partial<AyurvedaSections> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as Partial<AyurvedaSections>;
}

function resolveContent(dbSections: Partial<AyurvedaSections> | null): AyurvedaSections {
  return {
    overview: dbSections?.overview || fallbackSections.overview,
    causes: dbSections?.causes || fallbackSections.causes,
    symptoms: dbSections?.symptoms || fallbackSections.symptoms,
    diet: dbSections?.diet || fallbackSections.diet,
    remedies: dbSections?.remedies || fallbackSections.remedies,
    lifestyle: dbSections?.lifestyle || fallbackSections.lifestyle,
    dosha: dbSections?.dosha || fallbackSections.dosha,
    herbs: dbSections?.herbs || fallbackSections.herbs,
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
    breadcrumbHome: 'Home', breadcrumbCategory: 'Ayurveda & Health',
    titleSuffix: 'Ayurvedic Remedies, Causes & Diet Tips',
    minRead: 'min read', comments: 'Comments', share: 'Share:',
    doshaType: 'Primary Dosha', keyHerb: 'Key Herb / Remedy', todaysAdvice: "Ayurvedic Health Tip",
    whatDoesItMean: 'Overview & Ayurvedic Perspective',
    precautions: '⚡ Precautions & Safety', faq: 'Frequently Asked Questions',
    disclaimerLabel: 'Disclaimer:',
    disclaimer: 'Ayurvedic health information presented here is based on traditional wellness practices and is intended for educational purposes only. It should not replace professional medical diagnosis, advice, or treatment.',
    writtenBy: 'Written by', authorBio: 'Certified Ayurvedic practitioner and wellness researcher specializing in traditional herbal remedies and holistic health.',
    recommendedProducts: 'Recommended Herbal Products', relatedDreams: 'Related Health Articles',
    leaveComment: 'Leave a Comment', yourName: 'Your Name', yourEmail: 'Your Email',
    shareYourDream: 'Share your health query or experience...', postComment: 'Post Comment',
    doshaLabel: 'Dosha:',
    sections: [
      { key: 'causes', icon: '🔍', title: 'Causes & Triggers', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'symptoms', icon: '🩺', title: 'Symptoms & Signs', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'diet', icon: '🥗', title: 'Recommended Diet (Pathya)', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'remedies', icon: '🌿', title: 'Home & Natural Remedies', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'lifestyle', icon: '🧘', title: 'Lifestyle & Routine', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'dosha', icon: '☯️', title: 'Dosha Impact', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'herbs', icon: '🌱', title: 'Beneficial Herbs', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'overview', icon: '📜', title: 'Holistic Overview', bg: '#FEFCE8', border: '#FEF08A' },
    ],
  },
  hi: {
    breadcrumbHome: 'होम', breadcrumbCategory: 'आयुर्वेद और स्वास्थ्य',
    titleSuffix: 'आयुर्वेदिक उपचार, कारण और आहार सलाह',
    minRead: 'मिनट पढ़ें', comments: 'टिप्पणियाँ', share: 'शेयर करें:',
    doshaType: 'मुख्य दोष', keyHerb: 'मुख्य जड़ी-बूटी', todaysAdvice: 'आयुर्वेदिक सलाह',
    whatDoesItMean: 'अवलोकन और आयुर्वेदिक दृष्टिकोण',
    precautions: '⚡ सावधानियाँ एवं सुरक्षा टिप्स', faq: 'अक्सर पूछे जाने वाले प्रश्न',
    disclaimerLabel: 'अस्वीकरण:',
    disclaimer: 'यहाँ प्रस्तुत आयुर्वेदिक स्वास्थ्य जानकारी पारंपरिक सिद्धांतों पर आधारित है और केवल शैक्षिक उद्देश्यों के लिए है। यह किसी चिकित्सीय सलाह, निदान या डॉक्टर के उपचार का विकल्प नहीं है।',
    writtenBy: 'लेखक', authorBio: 'प्रमाणित आयुर्वेदिक विशेषज्ञ और शोधकर्ता, प्राकृतिक उपचार एवं हर्बल चिकित्सा में पारंगत।',
    recommendedProducts: 'अनुशंसित हर्बल उत्पाद', relatedDreams: 'संबंधित स्वास्थ्य लेख',
    leaveComment: 'टिप्पणी छोड़ें', yourName: 'आपका नाम', yourEmail: 'आपका ईमेल',
    shareYourDream: 'अपना अनुभव या प्रश्न पूछें...', postComment: 'टिप्पणी पोस्ट करें',
    doshaLabel: 'दोष:',
    sections: [
      { key: 'causes', icon: '🔍', title: 'मुख्य कारण', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'symptoms', icon: '🩺', title: 'मुख्य लक्षण', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'diet', icon: '🥗', title: 'आयुर्वेदिक आहार (पथ्य)', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'remedies', icon: '🌿', title: 'प्राकृतिक एवं घरेलू उपचार', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'lifestyle', icon: '🧘', title: 'जीवनशैली और योग', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'dosha', icon: '☯️', title: 'दोष प्रभाव', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'herbs', icon: '🌱', title: 'लाभकारी जड़ी-बूटियाँ', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'overview', icon: '📜', title: 'विस्तृत अवलोकन', bg: '#FEFCE8', border: '#FEF08A' },
    ],
  },
} as const;

export default function ArticleView({ post, relatedDreams }: { post: any; relatedDreams: any[] | null }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const t = LABELS[isHi ? 'hi' : 'en'];

  // Pick language-specific fields, falling back to English if a Hindi
  // field is missing on a given article.
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
          <Link href="/ayurveda" className="hover:text-brand">{t.breadcrumbCategory}</Link>
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
                <Link href="/ayurveda" className="tag-pill">{t.breadcrumbCategory}</Link>
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

            {/* Ayurvedic Quick Summary Box (Replaced Lucky Box) */}
            <div className="bg-[#111] text-white p-5 mb-6 flex flex-wrap gap-8 items-center">
              <div className="text-center">
                <div className="text-2xl font-bold font-display text-brand">{post.dosha_type || post.lucky_number || 'Vata/Pitta'}</div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.doshaType}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center bg-emerald-700 text-xs font-bold"
                  >
                    🌿
                  </div>
                  <span className="text-lg font-bold font-display">{post.key_herb || post.lucky_color || 'Tulsi'}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.keyHerb}</div>
              </div>
              <div className="flex-1 border-l border-[#333] pl-8">
                <div className="text-sm text-[#CCC] font-body italic">"{adviceSnippet}"</div>
                <div className="text-[11px] text-brand font-body mt-2 uppercase tracking-wider">{t.todaysAdvice}</div>
              </div>
            </div>

            <AdBanner slot="dream-detail-mid1" size="leaderboard" className="my-6" />

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

            {/* Ayurveda Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {t.sections.map((section) => (
                <div key={section.title} className="p-4 border" style={{ background: section.bg, borderColor: section.border }}>
                  <h3 className="font-body text-sm font-bold text-[#111] mb-2 flex items-center gap-2">
                    <span>{section.icon}</span> {section.title}
                  </h3>
                  <p className="text-sm text-[#444] font-body leading-relaxed">
                    {content[section.key as keyof AyurvedaSections] as string}
                  </p>
                </div>
              ))}
            </div>

            <AdBanner slot="dream-detail-mid2" size="leaderboard" className="my-6" />

            <div className="border-l-4 border-brand bg-[#FFF8F6] p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-[#111] mb-3">🌿 {t.todaysAdvice}</h2>
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
                    <Link key={item.id} href={`/ayurveda/${item.slug}`} className="group block card-hover">
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
                      {(item.dosha_type || item.lucky_number) && (
                        <p className="text-[10px] text-[#AAA] font-body mt-0.5">
                          {t.doshaLabel} {item.dosha_type || item.lucky_number} • {item.key_herb || item.lucky_color || 'Herbal'}
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
        <AdBanner slot="dream-detail-bottom" size="leaderboard" />
      </div>
    </>
  );
}