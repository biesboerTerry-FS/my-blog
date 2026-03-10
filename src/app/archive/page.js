import Link from "next/link";
import { getPosts } from "../lib/posts";
import { getImagePath } from "../lib/imagePath";

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
          posts.map((post) => {
            // Extract day from date string (e.g., "March 9, 2026" -> 9)
            const dateMatch = post.date.match(/\d+/);
            const day = dateMatch ? dateMatch[0] : '1';
            
            return (
              <article
                key={post.slug}
                className="p-6 rounded-lg transition-all duration-300 hover:border hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 hover:-translate-y-1"
                style={{ 
                  borderWidth: '1px', 
                  borderColor: 'transparent',
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                  borderLeftColor: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#999'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <Link href={`/blog/${post.slug}`} className="block no-underline text-inherit">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={getImagePath(`${day}.calendar.png`)}
                        alt={`Calendar - ${day}`}
                        width={35}
                        height={35}
                        className="dark:invert"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-gray-900 dark:text-white mb-2 text-xl md:text-lg hover:text-gray-700 dark:hover:text-gray-300">{post.title}</h2>
                      <time className="block text-gray-600 dark:text-gray-400 text-sm">{post.date}</time>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
