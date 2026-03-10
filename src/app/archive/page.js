import Link from "next/link";
import { getPosts } from "../lib/posts";
import { getImagePath } from "../lib/imagePath";
import ArchivePost from "../components/ArchivePost";

export default async function Archive() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-6 md:py-8">
      <div className="mb-12 pb-8 border-b" style={{ borderColor: '#999' }}>
        <h1 className="text-gray-900 dark:text-white">Archive</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 m-0">A collection of thoughts on tech and web development</p>
      </div>

      <div className="space-y-8">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-500 py-8 italic">No posts yet. Check back soon.</p>
        ) : (
          posts.map((post, index) => (
            <ArchivePost key={post.slug} post={post} index={index} totalPosts={posts.length} />
          ))
        )}
      </div>
    </main>
  );
}
