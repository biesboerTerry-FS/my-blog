import Link from "next/link";
import { getPosts } from "./lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-12 pb-8 border-b-2 border-slate-200 dark:border-slate-800">
        <h1>Archive</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 m-0">A collection of thoughts on tech and web development</p>
      </div>

      <div className="space-y-8">
        {posts.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400 py-8 italic">No posts yet. Check back soon.</p>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
            >
              <Link href={`/blog/${post.slug}`} className="block no-underline text-inherit">
                <h2 className="text-blue-600 dark:text-blue-400 mb-2 text-xl md:text-lg hover:underline">{post.title}</h2>
                <time className="block text-slate-600 dark:text-slate-400 text-sm">{post.date}</time>
              </Link>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
