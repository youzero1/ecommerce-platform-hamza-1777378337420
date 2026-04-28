import Link from 'next/link';
import { demoCategories, demoProducts } from '@/lib/demo-data';

export const metadata = {
  title: 'Categories - ShopWave',
  description: 'Browse our product categories.',
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="mt-2 text-gray-500">Browse products by category</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demoCategories.map((category) => {
          const productCount = demoProducts.filter(
            (p) => p.category === category.name
          ).length;

          return (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-5xl">{category.icon}</span>
                  <h2 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {productCount} product{productCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <span className="text-3xl text-gray-200 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
