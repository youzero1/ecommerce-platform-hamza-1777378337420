'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, ChevronLeft, Minus, Plus, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/product-card';

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary-600">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <Link href="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600">
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-8xl">
            {product.category === 'Electronics' && '🔌'}
            {product.category === 'Clothing' && '👕'}
            {product.category === 'Home & Garden' && '🏠'}
            {product.category === 'Sports' && '🏃'}
            {product.category === 'Books' && '📖'}
            {product.category === 'Beauty' && '✨'}
          </span>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-2 text-sm font-medium text-primary-600 uppercase tracking-wide">
            {product.category}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews_count} reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>

          {/* Stock Status */}
          <div className="mt-6">
            {product.in_stock ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                <Check className="h-4 w-4" />
                In Stock
              </span>
            ) : (
              <span className="text-sm font-medium text-red-600">Out of Stock</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="inline-flex items-center rounded-lg border border-gray-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </button>
            <button
              className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Why buy from us?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Free shipping over $50
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> 30-day return policy
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> 2-year warranty included
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" /> Secure payment processing
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
