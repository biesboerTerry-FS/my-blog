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
      <main className="blog-container">
        <h1>Post not found</h1>
        <Link href="/" className="back-link">
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
    <article className="blog-container">
      <Link href="/" className="back-link">
        ← Back to archive
      </Link>

      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <time className="post-date">{post.date}</time>
      </header>

      <div className="post-content">
        {mainContent.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
