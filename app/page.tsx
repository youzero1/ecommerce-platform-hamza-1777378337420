import Link from 'next/link';
import HeroSection from '@/components/hero-section';
import ProductCard from '@/components/product-card';
import { demoProducts, demoCategories } from '@/lib/demo-data';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = demoProducts.slice(0, 8);

  return (
    <div>
      <HeroSection />

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p className="mt-1 text-gray-500">Find exactly what you are looking for</p>
          </div>
          <Link href="/categories" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {demoCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <span className="text-4xl">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-1 text-gray-500">Handpicked products just for you</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link href="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-12 sm:px-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Get 20% Off Your First Order
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Sign up for our newsletter and receive an exclusive discount code.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border-0 px-5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-colors hover:bg-gray-50">
                Get Discount
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
