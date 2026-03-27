'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getImagePath } from '../lib/imagePath';
import CalendarImage from './CalendarImage';

export default function ArchivePost({ post, index, totalPosts }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const postDate = new Date(post.date);
  const postDateTime = Number.isNaN(postDate.getTime())
    ? undefined
    : postDate.toISOString().slice(0, 10);

  let scale = 1;
  if (hoveredIndex !== null) {
    const distance = Math.abs(index - hoveredIndex);
    if (index === hoveredIndex) {
      scale = 1.05; 
    } else if (distance === 1) {
      scale = 0.98; 
    } else if (distance === 2) {
      scale = 0.95; 
    } else {
      scale = 0.92; 
    }
  }

  return (
    <article
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        borderWidth: '1px',
        borderColor: hoveredIndex === index ? '#999' : 'transparent',
        transform: `scale(${scale})`,
      }}
      className="p-6 transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10"
    >
      <Link href={`/blog/${post.slug}`} className="block no-underline">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <CalendarImage dateString={post.date} />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-xl text-gray-800 transition-colors dark:text-gray-200 md:text-lg hover:text-orange-500 dark:hover:text-orange-400">
              {post.title}
            </h2>
            <time
              dateTime={postDateTime}
              className="block text-sm text-orange-700 dark:text-orange-300"
            >
              {post.date}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
