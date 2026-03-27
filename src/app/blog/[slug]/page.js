/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getPosts } from '../../lib/posts';
import { getImagePath } from '../../lib/imagePath';
import CalendarImage from '../../components/CalendarImage';

function resolveContentSrc(src) {
  if (!src) return src;
  if (src.startsWith('/')) {
    return getImagePath(src.slice(1));
  }
  return src;
}

const mdxComponents = {
  img: ({ src, alt, style, ...props }) => {
    const resolvedSrc = resolveContentSrc(src);
    return (
      <img
        src={resolvedSrc}
        alt={alt || ''}
        style={style}
        {...props}
      />
    );
  },
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  return {
    title: post?.title || 'Post Not Found',
    description: post?.date || '',
  };
}

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const allPosts = await getPosts();
  const post = await getPostBySlug(resolvedParams.slug);
  const postDate = post ? new Date(post.date) : null;
  const postDateTime =
    postDate && !Number.isNaN(postDate.getTime())
      ? postDate.toISOString().slice(0, 10)
      : undefined;

  if (!post) {
    return (
      <main className="max-w-3xl px-6 py-12 mx-auto md:py-16">
        <h1 className="text-gray-900 dark:text-white">Post not found</h1>
        <Link
          href="/archive"
          className="inline-block mb-8 text-sm text-orange-700 transition-colors dark:text-orange-300 hover:text-orange-400 dark:hover:text-orange-400"
        >
          ← to archive
        </Link>
      </main>
    );
  }

  // Find current post index and get previous/next posts
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <article className="max-w-3xl px-6 py-12 mx-auto md:py-16">
      <div className="flex flex-col gap-2 mb-8">
        <Link
          href="/archive"
          className="inline-block text-sm text-orange-700 transition-colors dark:text-orange-300 hover:text-orange-400 dark:hover:text-orange-400"
        >
          ← to archive
        </Link>
        <Link
          href="/"
          className="inline-block text-sm text-orange-700 transition-colors dark:text-orange-300 hover:text-orange-400 dark:hover:text-orange-400"
        >
          ← to home
        </Link>
      </div>

      <div className="grid items-start grid-cols-[1fr_auto] gap-4 mb-8 md:min-h-38">
        <div className="min-h-32">
          <h1 className="mb-2 text-gray-900 dark:text-white min-h-24">
            {post.title}
          </h1>
          <time
            dateTime={postDateTime}
            className="block text-base text-orange-700 dark:text-orange-300"
          >
            {post.date}
          </time>
        </div>
        <div className="pt-1">
          <CalendarImage dateString={post.date} />
        </div>
      </div>

      <div className="pt-4 mb-8 border-t border-gray-300 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-6 min-h-18">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="flex items-center gap-2 text-orange-700 transition-colors dark:text-orange-300 hover:text-orange-400 dark:hover:text-orange-400"
            title={prevPost.title}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span
              className="hidden text-sm leading-6 sm:block"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                maxHeight: '3rem',
              }}
            >
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div className="h-full" />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center justify-end gap-2 text-right text-orange-700 transition-colors dark:text-orange-300 hover:text-orange-400 dark:hover:text-orange-400"
            title={nextPost.title}
          >
            <span
              className="hidden text-sm leading-6 sm:block"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                maxHeight: '3rem',
              }}
            >
              {nextPost.title}
            </span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div className="h-full" />
        )}
        </div>
      </div>

      <div className="space-y-6 text-lg leading-relaxed prose prose-lg text-gray-900 dark:text-gray-100 dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </article>
  );
}
