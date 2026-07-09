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
    .eq('category', 'yoga')
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
    title: post ? `${post.meta_title || post.title} – Therapeutic Yoga & Health Benefits` : 'Yoga & Holistic Health',
    description: post?.meta_description || post?.excerpt || 'Explore therapeutic yoga poses, health benefits, and anatomical insights on VedaWell.',
  };
}

export default async function YogaDetailPage({ params }: Props) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch current yoga article (both English and Hindi columns returned in the same row)
  const { data: post } = await sb
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#111] mb-2">Yoga Article Not Found</h1>
        <p className="text-gray-600 mb-6">The yoga article you are looking for does not exist or has been removed.</p>
        <Link href="/yoga" className="btn-primary inline-block">Back to Yoga & Health</Link>
      </div>
    );
  }

  // Fetch related yoga articles with localized titles
  const { data: relatedYoga } = await sb
    .from('articles')
    .select('id, slug, title, title_hi, image_url, lucky_number, lucky_color')
    .eq('category', 'yoga')
    .neq('slug', params.slug)
    .limit(6);

  return <ArticleView post={post} relatedYoga={relatedYoga} />;
}