import Link from "next/link";
import { getPosts } from "./lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="archive-container">
      <div className="archive-header">
        <h1>Archive</h1>
        <p>A collection of thoughts on tech and web development</p>
      </div>

      <div className="posts-list">
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet. Check back soon.</p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="post-item">
              <Link href={`/blog/${post.slug}`} className="post-link">
                <h2 className="post-title">{post.title}</h2>
                <time className="post-date">{post.date}</time>
              </Link>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
