import Link from "next/link";
import { getPostBySlug, getPosts } from "../../lib/posts";
import { getImagePath } from "../../lib/imagePath";

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
    title: post?.title || "Post Not Found",
    description: post?.date || "",
  };
}

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const allPosts = await getPosts();
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-gray-900 dark:text-white">Post not found</h1>
        <Link href="/archive" className="inline-block mb-8 text-gray-600 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          ← Back to archive
        </Link>
      </main>
    );
  }

  // Find current post index and get previous/next posts
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Extract content after the frontmatter (title and date)
  const contentLines = post.content.split("\n");
  const contentStart = contentLines.findIndex(
    (line, i) => i > 0 && line.match(/^\*\*Date:/)
  );
  const mainContent = contentLines.slice(contentStart + 1).join("\n").trim();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Link href="/archive" className="inline-block mb-8 text-gray-600 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
        ← Back to archive
      </Link>

      <header className="mb-8 pb-8" style={{ borderBottom: '1px solid #999' }}>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-gray-900 dark:text-white mb-2">{post.title}</h1>
            <time className="block text-gray-600 dark:text-gray-500 text-base">{post.date}</time>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <img
              src={getImagePath("hubert.png")}
              alt="Hubert skeleton"
              width={100}
              height={100}
              className="hidden dark:block rounded-full object-cover"
              style={{ borderWidth: '3px', borderColor: '#CCD1D8' }}
            />
            <img
              src={getImagePath("hubert.png")}
              alt="Hubert skeleton inverted"
              width={100}
              height={100}
              className="block dark:hidden rounded-full object-cover invert"
              style={{ borderWidth: '3px', borderColor: '#302C23' }}
            />
          </div>
        </div>
      </header>

      <div className="text-lg leading-relaxed space-y-6 text-gray-900 dark:text-gray-100">
        {mainContent.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* Navigation Chevrons */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            title={prevPost.title}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline text-sm">{prevPost.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-right"
            title={nextPost.title}
          >
            <span className="hidden sm:inline text-sm">{nextPost.title}</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
