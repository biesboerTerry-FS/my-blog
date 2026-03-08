import Link from "next/link";
import { getPostBySlug, getPosts } from "../../lib/posts";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post?.title || "Post Not Found",
    description: post?.date || "",
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <h1>Post not found</h1>
        <Link href="/" className="inline-block mb-8 text-slate-600 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-white transition-colors">
          ← Back to archive
        </Link>
      </main>
    );
  }

  // Extract content after the frontmatter (title and date)
  const contentLines = post.content.split("\n");
  const contentStart = contentLines.findIndex(
    (line, i) => i > 0 && line.match(/^\*\*Date:/)
  );
  const mainContent = contentLines.slice(contentStart + 1).join("\n").trim();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <Link href="/" className="inline-block mb-8 text-slate-600 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-white transition-colors">
        ← Back to archive
      </Link>

      <header className="mb-8 pb-8 border-b-2 border-slate-200 dark:border-slate-800">
        <h1 className="text-slate-900 dark:text-white mb-2">{post.title}</h1>
        <time className="block text-slate-600 dark:text-slate-400 text-base">{post.date}</time>
      </header>

      <div className="text-lg leading-relaxed space-y-6">
        {mainContent.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
