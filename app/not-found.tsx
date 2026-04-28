import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-8xl">😕</span>
        <h1 className="mt-6 text-4xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-lg text-gray-500">Page not found</p>
        <p className="mt-1 text-gray-400">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-8 btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
