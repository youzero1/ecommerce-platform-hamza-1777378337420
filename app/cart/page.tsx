'use client';

import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="h-20 w-20 text-gray-300" />
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-gray-500">Looks like you have not added any items yet.</p>
          <Link href="/products" className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice >= 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-gray-500">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              {/* Image */}
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-3xl">
                  {item.product.category === 'Electronics' && '🔌'}
                  {item.product.category === 'Clothing' && '👕'}
                  {item.product.category === 'Home & Garden' && '🏠'}
                  {item.product.category === 'Sports' && '🏃'}
                  {item.product.category === 'Books' && '📖'}
                  {item.product.category === 'Beauty' && '✨'}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${item.product.id}`}
                    className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-gray-500">{item.product.category}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 text-gray-500 hover:text-gray-700"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 text-gray-500 hover:text-gray-700"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.product.id)}
                className="self-start text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mt-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-900">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Tax</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-base font-bold text-gray-900">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {shipping > 0 && (
              <p className="mt-3 text-xs text-gray-500">
                Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
              </p>
            )}

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Proceed to Checkout
            </Link>

            {/* Payment Methods */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 text-center">Secure checkout powered by SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
