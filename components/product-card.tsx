'use client';

import Link from 'next/link';
import { Star, ShoppingCart, CreditCard } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
        {/* Image placeholder */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-5xl">
            {product.category === 'Electronics' && '🔌'}
            {product.category === 'Clothing' && '👕'}
            {product.category === 'Home & Garden' && '🏠'}
            {product.category === 'Sports' && '🏃'}
            {product.category === 'Books' && '📖'}
            {product.category === 'Beauty' && '✨'}
          </span>
          {product.in_stock && (
            <span className="absolute top-3 left-3 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              In Stock
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-1 text-xs font-medium text-primary-600 uppercase tracking-wide">
            {product.category}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews_count})</span>
          </div>

          {/* Price and Actions */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-700"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
