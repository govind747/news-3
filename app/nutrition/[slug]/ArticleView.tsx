'use client';

import Link from 'next/link';
import { Clock, User, Tag, ChevronRight, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

type NutritionSections = {
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

const fallbackSections: NutritionSections = {
  meaning: 'Balanced nutrition forms the foundation of human metabolic health, cellular repair, and physical stamina. Understanding bio-available nutrients helps optimize long-term health.',
  positive: 'Enhances cellular immunity, boosts cognitive clarity, improves gut microbiome diversity, and optimizes daily energy levels.',
  negative: 'Excessive consumption or unbalanced dietary intake can cause digestive discomfort or metabolic imbalances.',
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

function parseSections(raw: unknown): Partial<NutritionSections> | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as Partial<NutritionSections>;
}

function resolveContent(dbSections: Partial<NutritionSections> | null): NutritionSections {
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
    breadcrumbCategory: 'Nutrition & Diet',
    titleSuffix: 'Nutritional Value, Health Benefits & Dietary Insights',
    minRead: 'min read',
    comments: 'Comments',
    share: 'Share:',
    luckyNumberLabel: 'Nutritional Code',
    luckyColorLabel: 'Primary Color / Aspect',
    expertAdvice: 'Nutritionist Advice',
    whatYouNeedToKnow: 'Overview & Nutritional Impact',
    precautions: '⚡ Dietary Precautions & Guidelines',
    faq: 'Frequently Asked Questions',
    disclaimerLabel: 'Dietary Disclaimer:',
    disclaimer: 'The dietary and nutritional information presented here is for educational purposes only. Always consult a certified clinical nutritionist or physician before starting any strict dietary intervention.',
    writtenBy: 'Reviewed by',
    authorBio: 'Clinical nutrition specialist and wellness practitioner dedicated to evidence-based dietary education.',
    recommendedProducts: 'Recommended Dietary Essentials',
    relatedNutrition: 'Related Nutrition Articles',
    leaveComment: 'Leave a Comment',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    shareYourExperience: 'Share your dietary questions or experience...',
    postComment: 'Post Comment',
    tipLabel: 'Nutrient Code:',
    sections: [
      { key: 'positive', icon: '✨', title: 'Health Benefits & Pros', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'negative', icon: '⚠️', title: 'Possible Side Effects / Excess', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'health', icon: '🥗', title: 'Metabolic & Physical Health', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'career', icon: '🧠', title: 'Focus & Energy at Work', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'business', icon: '💼', title: 'Stamina & Productivity', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'money', icon: '💰', title: 'Preventive Cost Savings', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'loveLife', icon: '❤️', title: 'Vitality & Mood Harmony', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'marriage', icon: '🏡', title: 'Family Wellness & Meals', bg: '#EFF6FF', border: '#BFDBFE' },
    ],
  },
  hi: {
    breadcrumbHome: 'होम',
    breadcrumbCategory: 'पोषण एवं आहार योजना',
    titleSuffix: 'पोषण मूल्य, स्वास्थ्य लाभ एवं आहार निर्देशिका',
    minRead: 'मिनट पढ़ें',
    comments: 'टिप्पणियाँ',
    share: 'शेयर करें:',
    luckyNumberLabel: 'न्यूट्रिशन कोड',
    luckyColorLabel: 'मुख्य रंग / गुण',
    expertAdvice: 'न्यूट्रिशनिस्ट सलाह',
    whatYouNeedToKnow: 'अवलोकन एवं पोषण प्रभाव',
    precautions: '⚡ आहार संबंधी सावधानियाँ',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    disclaimerLabel: 'आहार संबंधी अस्वीकरण:',
    disclaimer: 'यहाँ दी गई पोषण और आहार संबंधी जानकारी केवल शैक्षिक उद्देश्यों के लिए है। किसी भी विशेष डाइट को अपनाने से पहले योग्य न्यूट्रिशनिस्ट या डॉक्टर की सलाह लें।',
    writtenBy: 'समीक्षक',
    authorBio: 'प्रमाणित क्लिनिकल न्यूट्रिशनिस्ट एवं आहार विशेषज्ञ, प्रामाणिक स्वास्थ्य साक्षरता के लिए समर्पित।',
    recommendedProducts: 'अनुशंसित आहार उत्पाद',
    relatedNutrition: 'संबंधित पोषण लेख',
    leaveComment: 'टिप्पणी छोड़ें',
    yourName: 'आपका नाम',
    yourEmail: 'आपका ईमेल',
    shareYourExperience: 'अपना आहार संबंधी प्रश्न या अनुभव साझा करें...',
    postComment: 'टिप्पणी पोस्ट करें',
    tipLabel: 'न्यूट्रिएंट कोड:',
    sections: [
      { key: 'positive', icon: '✨', title: 'मुख्य स्वास्थ्य लाभ', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'negative', icon: '⚠️', title: 'अत्यधिक सेवन के दुष्प्रभाव', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'health', icon: '🥗', title: 'शारीरिक व चयापचय स्वास्थ्य', bg: '#FEFCE8', border: '#FEF08A' },
      { key: 'career', icon: '🧠', title: 'मानसिक एकाग्रता व ऊर्जा', bg: '#EFF6FF', border: '#BFDBFE' },
      { key: 'business', icon: '💼', title: 'कार्यक्षमता व स्टेमिना', bg: '#FFF7ED', border: '#FED7AA' },
      { key: 'money', icon: '💰', title: 'स्वास्थ्य संबंधी बचत', bg: '#F0FDF4', border: '#BBF7D0' },
      { key: 'loveLife', icon: '❤️', title: 'ऊर्जा व स्वभाव में सुधार', bg: '#FFF1F2', border: '#FECDD3' },
      { key: 'marriage', icon: '🏡', title: 'पारिवारिक खान-पान व सेहत', bg: '#EFF6FF', border: '#BFDBFE' },
    ],
  },
} as const;

export default function ArticleView({ post, relatedNutrition }: { post: any; relatedNutrition: any[] | null }) {
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
                    {content[section.key as keyof NutritionSections] as string}
                  </p>
                </div>
              ))}
            </div>

            <AdBanner slot="nutrition-detail-mid2" size="leaderboard" className="my-6" />

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

            {/* Related Nutrition Articles */}
            {relatedNutrition && relatedNutrition.length > 0 && (
              <div className="mb-8">
                <div className="divider-title mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest">{t.relatedNutrition}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedNutrition.map((item) => (
                    <Link key={item.id} href={`/nutrition/${item.slug}`} className="group block card-hover">
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