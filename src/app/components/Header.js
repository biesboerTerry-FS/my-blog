'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getImagePath } from '../lib/imagePath';

export default function Header() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const normalizedPathname =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || '/'
      : pathname;

  const isPostPage = normalizedPathname.startsWith('/blog/');
  if (isPostPage) return null;

  const isHome = normalizedPathname === '/';

  return (
    <nav style={{ borderBottom: '1px solid #999' }}>
      <div className="flex items-center justify-between max-w-3xl px-4 py-4 mx-auto">
        <Link
          href={isHome ? '/archive' : '/'}
          className="font-medium text-gray-900 transition-colors dark:text-gray-100 hover:text-orange-400 dark:hover:text-orange-400"
        >
          {isHome ? 'to archive' : 'to home'}
        </Link>
        <div className="flex gap-3">
          <Image
            src={getImagePath('hubert.png')}
            alt="Hubert skeleton"
            width={80}
            height={80}
            className="hidden object-cover rounded-full dark:block"
            style={{ borderWidth: '3px', borderColor: '#CCD1D8' }}
          />
          <Image
            src={getImagePath('hubert.png')}
            alt="Hubert skeleton inverted"
            width={80}
            height={80}
            className="block object-cover rounded-full dark:hidden invert"
            style={{ borderWidth: '3px', borderColor: '#302C23' }}
          />
        </div>
      </div>
    </nav>
  );
}
