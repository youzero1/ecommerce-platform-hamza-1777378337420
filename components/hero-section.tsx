import Link from 'next/link';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';

export default function HeroSection() {
  return (
    <section>
      {/* Main Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              🔥 New arrivals just dropped
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Premium Products
            </h1>
            <p className="mt-6 max-w-lg text-lg text-primary-100">
              Shop the latest trends with unbeatable prices. Free shipping on orders over $50. Quality guaranteed.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <Truck className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-end">
              <RotateCcw className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
