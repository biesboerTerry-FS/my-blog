import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main className="max-w-3xl px-6 py-12 mx-auto md:py-16">
      <h1 className="mb-3 text-gray-900 dark:text-white">404</h1>
      <p className="mb-8 text-orange-700 dark:text-orange-300">
        This page could not be found.
      </p>
      <div className="flex flex-col gap-2">
        <Link
          href="/"
          className="inline-block text-sm text-orange-700 transition-colors dark:text-orange-300 hover:text-orange-500 dark:hover:text-orange-200"
        >
          ← to home
        </Link>
        <Link
          href="/archive"
          className="inline-block text-sm text-orange-700 transition-colors dark:text-orange-300 hover:text-orange-500 dark:hover:text-orange-200"
        >
          ← to archive
        </Link>
      </div>
    </main>
  );
}
