'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getImagePath } from "../lib/imagePath";

export default function Header() {
  const pathname = usePathname();
  
  // Show "Archive" only on home page, otherwise show "Home"
  const isHome = pathname === '/';
  
  return (
    <nav style={{ borderBottom: '1px solid #999' }}>
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
            width={80}
            height={80}
            className="hidden dark:block rounded-full object-cover"
            style={{ borderWidth: '3px', borderColor: '#CCD1D8' }}
          />
          <img
            src={getImagePath("hubert.png")}
            alt="Hubert skeleton inverted"
            width={80}
            height={80}
            className="block dark:hidden rounded-full object-cover invert"
            style={{ borderWidth: '3px', borderColor: '#302C23' }}
          />
        </div>
      </div>
    </nav>
  );
}
