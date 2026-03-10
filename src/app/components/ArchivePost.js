'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getImagePath } from '../lib/imagePath';

export default function ArchivePost({ post, index, totalPosts }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const dateMatch = post.date.match(/\d+/);
  const day = dateMatch ? dateMatch[0] : '1';

  // Calculate scale based on distance from hovered post
  let scale = 1;
  if (hoveredIndex !== null) {
    const distance = Math.abs(index - hoveredIndex);
    if (index === hoveredIndex) {
      scale = 1.05; // Hovered post slightly larger
    } else if (distance === 1) {
      scale = 0.98; // Adjacent posts slightly smaller
    } else if (distance === 2) {
      scale = 0.95; // Two posts away more shrunk
    } else {
      scale = 0.92; // Far posts most shrunk
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
      className="p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10"
    >
      <Link href={`/blog/${post.slug}`} className="block no-underline">
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
            <h2 className="text-gray-800 dark:text-gray-200 mb-2 text-xl md:text-lg hover:text-gray-600 dark:hover:text-gray-400">{post.title}</h2>
            <time className="block text-gray-600 dark:text-gray-400 text-sm">{post.date}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
