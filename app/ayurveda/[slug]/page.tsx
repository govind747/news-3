import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import ArticleView from './ArticleView';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await sb
    .from('articles')
    .select('slug')
    .eq('category', 'ayurveda')
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
    title: post
      ? `${post.meta_title || post.title} – Ayurvedic Remedies & Natural Healing`
      : 'Ayurveda Health Guide',
    description:
      post?.meta_description ||
      post?.excerpt ||
      'Explore traditional Ayurvedic remedies, dosha balance, and holistic health tips on VedaWell.',
  };
}

export default async function AyurvedaDetailPage({ params }: Props) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch current Ayurveda article (both English and Hindi columns come back
  // in the same row — language switching happens client-side in ArticleView)
  const { data: post } = await sb
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#111] mb-2">
          Ayurvedic Article Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The health guide or remedy article you are looking for does not exist or has been removed.
        </p>
        <Link href="/ayurveda" className="btn-primary inline-block">
          Back to Ayurveda & Health
        </Link>
      </div>
    );
  }

  // Fetch related Ayurveda articles (include title_hi, dosha_type, key_herb so
  // related articles switch language and display dosha info inside ArticleView)
  const { data: relatedDreams } = await sb
    .from('articles')
    .select('id, slug, title, title_hi, image_url, dosha_type, key_herb, lucky_number, lucky_color')
    .eq('category', 'ayurveda')
    .neq('slug', params.slug)
    .limit(6);

  return <ArticleView post={post} relatedDreams={relatedDreams} />;
}