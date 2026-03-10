'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getImagePath } from "../lib/imagePath";

export default function Header() {
  const pathname = usePathname();
  
  // Determine if we're on the archive page
  const isArchive = pathname === '/archive';
  
  return (
    <nav className="border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href={isArchive ? "/" : "/archive"} 
          className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {isArchive ? "Home" : "Archive"}
        </Link>
        <img
          src={getImagePath("ostrich-skeleton.png")}
          alt="Ostrich skeleton"
          width={40}
          height={40}
          className="dark:invert"
        />
      </div>
    </nav>
  );
}
