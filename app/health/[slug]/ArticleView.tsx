'use client';

import Link from 'next/link';
import { Clock, User, Tag, ChevronRight, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

type HealthSections = {
  overview: string; causes: string; symptoms: string;
  diagnosis: string; treatment: string; lifestyle: string;
  prevention: string; diet: string; naturalRemedies: string;
  advice: string; precautions: string;
  faqs: { q: string; a: string }[];
};

const fallbackSections: HealthSections = {
  overview: 'Health and clinical conditions require a holistic understanding of physiological, lifestyle, and environmental factors. Exploring evidence-based insights helps you take proactive steps toward personal wellness and effective management.',
  causes: 'Many conditions stem from a combination of genetic predispositions, nutritional imbalances, environmental stressors, and lifestyle habits. Identifying root causes is key to sustainable care.',
  symptoms: 'Early physical signs may include mild fatigue, localized discomfort, or changes in bodily rhythms. Recognizing early indicators allows for timely medical evaluation and intervention.',
  diagnosis: 'Professional diagnosis typically involves clinical examinations, laboratory blood tests, and specialized diagnostic imaging to confirm findings and eliminate alternative causes.',
  treatment: 'Treatment plans vary based on severity, combining targeted medical therapy, clinical protocols, and tailored daily interventions under qualified healthcare supervision.',
  lifestyle: 'Adopting consistent physical exercise, stress management techniques, and restorative sleep habits significantly improves clinical outcomes and long-term vitality.',
  prevention: 'Preventive health focuses on routine clinical screenings, balanced hydration, ergonomic awareness, and proactive lifestyle adjustments to lower health risks.',
  diet: 'A well-rounded, nutrient-dense diet rich in antioxidants, whole foods, essential vitamins, and adequate protein supports natural healing and immune resilience.',
  naturalRemedies: 'Complementary practices like herbal infusions, mindful breathing, gentle stretching, and adequate rest serve as supportive aids alongside standard medical care.',
  advice: 'Prioritize daily self-care, monitor changes in your physical state, and maintain open communication with certified healthcare providers.',
  precautions: 'Do not discontinue prescribed medications or begin intensive health regimens without consulting a qualified medical professional.',
  faqs: [
    { q: 'When should I consult a doctor regarding these symptoms?', a: 'You should seek immediate medical attention if symptoms persist, worsen rapidly, or interfere with daily activities.' },
    { q: 'Can lifestyle changes alone resolve this condition?', a: 'While healthy habits significantly support recovery, severe or chronic conditions require professional medical evaluation and treatment.' },
  ],
};

function parseSections(raw: unknown): Partial<HealthSections> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as Partial<HealthSections>;
}

function resolveContent(dbSections: Partial<HealthSections> | null): HealthSections {
  return {
    overview: dbSections?.overview || fallbackSections.overview,
    causes: dbSections?.causes || fallbackSections.causes,
    symptoms: dbSections?.symptoms || fallbackSections.symptoms,
    diagnosis: dbSections?.diagnosis || fallbackSections.diagnosis,
    treatment: dbSections?.treatment || fallbackSections.treatment,
    lifestyle: dbSections?.lifestyle || fallbackSections.lifestyle,
    prevention: dbSections?.prevention || fallbackSections.prevention,
    diet: dbSections?.diet || fallbackSections.diet,
    naturalRemedies: dbSections?.naturalRemedies || fallbackSections.naturalRemedies,
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
    breadcrumbHome: 'Home', breadcrumbHealth: 'Health & Wellness',
    titleSuffix: 'Clinical Insights, Symptoms & Treatment Guide',
    minRead: 'min read', comments: 'Comments', share: 'Share:',
    healthTipCode: 'Health Tip', recommendedHydration: 'Daily Hydration', expertAdvice: "Expert Health Tip",
    whatYouNeedToKnow: 'What You Need to Know About This Condition',
    precautions: '⚡ Clinical Warnings & Precautions', faq: 'Frequently Asked Questions',
    disclaimerLabel: 'Medical Disclaimer:',
    disclaimer: 'The information provided in this article is for educational and informational purposes only and is not intended as medical advice. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition.',
    writtenBy: 'Reviewed by', authorBio: 'Certified health communicator and medical content specialist dedicated to accessible health literacy.',
    recommendedProducts: 'Recommended Health Essentials', relatedHealth: 'Related Health Articles',
    leaveComment: 'Leave a Comment', yourName: 'Your Name', yourEmail: 'Your Email',
    shareYourExperience: 'Share your experience or ask a health question...', postComment: 'Post Comment',
    tipLabel: 'Health Tip:',
    sections: [
      { key: 'causes', icon: '🔍', title: 'Causes & Risk Factors', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'symptoms', icon: '⚠️', title: 'Symptoms & Warning Signs', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'diagnosis', icon: '🩺', title: 'Diagnosis & Testing', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'treatment', icon: '💊', title: 'Treatment & Medical Care', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'lifestyle', icon: '🏃', title: 'Lifestyle & Care', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'prevention', icon: '🛡️', title: 'Prevention & Risk Reduction', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'diet', icon: '🥗', title: 'Nutrition & Diet', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'naturalRemedies', icon: '🌿', title: 'Home & Natural Remedies', bg: '#F0FDF4', border: '#BBF7D0' },
    ],
  },
  hi: {
    breadcrumbHome: 'होम', breadcrumbHealth: 'स्वास्थ्य एवं वेलनेस',
    titleSuffix: 'लक्षण, कारण, उपचार एवं रोकथाम निर्देशिका',
    minRead: 'मिनट पढ़ें', comments: 'टिप्पणियाँ', share: 'शेयर करें:',
    healthTipCode: 'स्वास्थ्य टिप', recommendedHydration: 'दैनिक जल पूर्ति', expertAdvice: 'विशेषज्ञ स्वास्थ्य सलाह',
    whatYouNeedToKnow: 'इस स्वास्थ्य विषय के बारे में आवश्यक जानकारी',
    precautions: '⚡ चिकित्सीय चेतावनियाँ व सावधानियाँ', faq: 'अक्सर पूछे जाने वाले प्रश्न',
    disclaimerLabel: 'चिकित्सीय अस्वीकरण:',
    disclaimer: 'इस लेख में प्रदान की गई जानकारी केवल शैक्षिक और सूचनात्मक उद्देश्यों के लिए है और इसे चिकित्सीय सलाह नहीं माना जाना चाहिए। किसी भी चिकित्सा स्थिति के संबंध में हमेशा अपने चिकित्सक या योग्य स्वास्थ्य प्रदाता की सलाह लें।',
    writtenBy: 'समीक्षक', authorBio: 'प्रमाणित स्वास्थ्य संचारक और चिकित्सा सामग्री विशेषज्ञ, जन-स्वास्थ्य साक्षरता के लिए समर्पित।',
    recommendedProducts: 'अनुशंसित स्वास्थ्य उत्पाद', relatedHealth: 'संबंधित स्वास्थ्य लेख',
    leaveComment: 'टिप्पणी छोड़ें', yourName: 'आपका नाम', yourEmail: 'आपका ईमेल',
    shareYourExperience: 'अपना स्वास्थ्य अनुभव साझा करें या प्रश्न पूछें...', postComment: 'टिप्पणी पोस्ट करें',
    tipLabel: 'स्वास्थ्य संकेत:',
    sections: [
      { key: 'causes', icon: '🔍', title: 'कारण एवं जोखिम कारक', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'symptoms', icon: '⚠️', title: 'लक्षण एवं शुरुआती संकेत', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'diagnosis', icon: '🩺', title: 'निदान एवं जाँच', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'treatment', icon: '💊', title: 'उपचार एवं डॉक्टरी देखभाल', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'lifestyle', icon: '🏃', title: 'जीवनशैली एवं देखभाल', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'prevention', icon: '🛡️', title: 'बचाव एवं रोकथाम', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'diet', icon: '🥗', title: 'पोषण एवं आहार योजना', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'naturalRemedies', icon: '🌿', title: 'घरेलू एवं प्राकृतिक उपाय', bg: '#F0FDF4', border: '#BBF7D0' },
    ],
  },
} as const;

export default function ArticleView({ post, relatedHealth }: { post: any; relatedHealth: any[] | null }) {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const t = LABELS[isHi ? 'hi' : 'en'];

  // Pick language-specific fields, falling back to English if a Hindi field is missing
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
          <Link href="/health" className="hover:text-brand">{t.breadcrumbHealth}</Link>
          <span>›</span>
          <span className="text-[#111]">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdBanner slot="health-detail-top" size="leaderboard" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Link href="/health" className="tag-pill">{t.breadcrumbHealth}</Link>
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
                  {post.author || 'VedaWell Health Team'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={11} />{post.read_time || 6} {t.minRead}</span>
                <span>•</span>
                <span>{formattedDate}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MessageCircle size={11} />18 {t.comments}</span>
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
                src={post.image_url || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80'}
                alt={title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Health Feature Box */}
            <div className="bg-[#111] text-white p-5 mb-6 flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-brand">{post.lucky_number || 'H-01'}</div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.healthTipCode}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-display text-brand">{post.lucky_color || '2.5 L / day'}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#AAA] font-body mt-0.5">{t.recommendedHydration}</div>
              </div>
              <div className="flex-1 border-l border-[#333] pl-8">
                <div className="text-sm text-[#CCC] font-body italic">"{adviceSnippet}"</div>
                <div className="text-[11px] text-brand font-body mt-2 uppercase tracking-wider">{t.expertAdvice}</div>
              </div>
            </div>

            <AdBanner slot="health-detail-mid1" size="leaderboard" className="my-6" />

            {/* Primary Overview / Article Body */}
            <div className="article-body mb-8">
              <h2>{t.whatYouNeedToKnow}</h2>
              {bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              ) : (
                content.overview.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 text-gray-700 leading-relaxed font-body">{para}</p>
                ))
              )}
            </div>

            {/* Medical & Lifestyle Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {t.sections.map((section) => (
                <div key={section.title} className="p-4 border" style={{ background: section.bg, borderColor: section.border }}>
                  <h3 className="font-body text-sm font-bold text-[#111] mb-2 flex items-center gap-2">
                    <span>{section.icon}</span> {section.title}
                  </h3>
                  <p className="text-sm text-[#444] font-body leading-relaxed">
                    {content[section.key as keyof HealthSections] as string}
                  </p>
                </div>
              ))}
            </div>

            <AdBanner slot="health-detail-mid2" size="leaderboard" className="my-6" />

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

            {/* Medical Disclaimer */}
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
                <h4 className="font-display text-base font-bold text-[#111]">{post.author || 'VedaWell Medical Team'}</h4>
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

            {/* Related Health Articles */}
            {relatedHealth && relatedHealth.length > 0 && (
              <div className="mb-8">
                <div className="divider-title mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest">{t.relatedHealth}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedHealth.map((item) => (
                    <Link key={item.id} href={`/health/${item.slug}`} className="group block card-hover">
                      <div className="overflow-hidden mb-2">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80'}
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
        <AdBanner slot="health-detail-bottom" size="leaderboard" />
      </div>
    </>
  );
}