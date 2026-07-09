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
    .eq('category', 'health')
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
    title: post ? `${post.meta_title || post.title} – Health, Wellness & Medical Insights` : 'Health & Wellness',
    description: post?.meta_description || post?.excerpt || 'Explore evidence-based health tips, clinical insights, and holistic wellness guides on VedaWell.',
  };
}

export default async function HealthDetailPage({ params }: Props) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch current health article (both English and Hindi columns come back
  // in the same row — language switching happens client-side in ArticleView)
  const { data: post } = await sb
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#111] mb-2">Health Article Not Found</h1>
        <p className="text-gray-600 mb-6">The article you are looking for does not exist or has been removed.</p>
        <Link href="/health" className="btn-primary inline-block">Back to Health & Wellness</Link>
      </div>
    );
  }

  // Fetch related health articles (include title_hi so related health titles can
  // also switch language inside ArticleView)
  const { data: relatedHealth } = await sb
    .from('articles')
    .select('id, slug, title, title_hi, image_url, lucky_number, lucky_color')
    .eq('category', 'health')
    .neq('slug', params.slug)
    .limit(6);

  return <ArticleView post={post} relatedHealth={relatedHealth} />;
}