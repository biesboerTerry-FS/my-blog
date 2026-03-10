'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getImagePath } from "../lib/imagePath";

export default function Header() {
  const pathname = usePathname();
  
  // Show "Archive" only on home page, otherwise show "Home"
  const isHome = pathname === '/';
  
  return (
    <nav className="border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href={isHome ? "/archive" : "/"} 
          className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {isHome ? "Archive" : "Home"}
        </Link>
        <div className="flex gap-3">
          <img
            src={getImagePath("hubert.png")}
            alt="Hubert skeleton"
            width={56}
            height={56}
            className="rounded-full border-2 border-gray-900 dark:border-white object-cover"
          />
          <img
            src={getImagePath("hubert.png")}
            alt="Hubert skeleton inverted"
            width={56}
            height={56}
            className="rounded-full border-2 border-gray-900 dark:border-white object-cover invert"
          />
        </div>
      </div>
    </nav>
  );
}
