import Link from "next/link";
import { getPosts } from "../lib/posts";
import { getImagePath } from "../lib/imagePath";
import ArchivePost from "../components/ArchivePost";

export default async function Archive() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl px-6 py-6 mx-auto md:py-8">
      <div className="pb-8 mb-12 border-b" style={{ borderColor: '#999' }}>
        <h1 className="text-gray-900 dark:text-white">Archive</h1>
        <p className="m-0 text-lg text-orange-600 dark:text-gray-400">A collection of thoughts on tech and web development</p>
      </div>

      <div className="space-y-8">
        {posts.length === 0 ? (
          <p className="py-8 italic text-center text-gray-500 dark:text-gray-500">No posts yet. Check back soon.</p>
        ) : (
          posts.map((post, index) => (
            <ArchivePost key={post.slug} post={post} index={index} totalPosts={posts.length} />
          ))
        )}
      </div>
    </main>
  );
}
