'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { demoProducts } from '@/lib/demo-data';
import CheckoutForm from '@/components/checkout-form';
import { Check, ShoppingBag } from 'lucide-react';

export default function PayProductPage() {
  const params = useParams();
  const productId = params.productId as string;
  const product = demoProducts.find((p) => p.id === productId);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const stripePromise = useMemo(() => getStripe(), []);

  const tax = product ? product.price * 0.08 : 0;
  const shipping = product && product.price >= 50 ? 0 : 9.99;
  const finalTotal = product ? product.price + tax + shipping : 0;

  useEffect(() => {
    if (!product || paid) return;

    setLoading(true);
    setError(null);

    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: finalTotal,
        currency: 'usd',
        metadata: {
          productId: product.id,
          productName: product.name,
        },
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [product, finalTotal, paid]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="h-20 w-20 text-gray-300" />
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Product not found</h1>
          <Link href="/products" className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (paid) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="mt-3 text-gray-500 text-center max-w-md">
            Thank you for purchasing <strong>{product.name}</strong>. You will receive a confirmation email shortly.
          </p>
          <p className="mt-2 text-sm text-gray-400">Order #SW-{Date.now().toString().slice(-8)}</p>
          <Link href="/products" className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Pay for Product</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Summary */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
            <span className="text-6xl">
              {product.category === 'Electronics' && '🔌'}
              {product.category === 'Clothing' && '👕'}
              {product.category === 'Home & Garden' && '🏠'}
              {product.category === 'Sports' && '🏃'}
              {product.category === 'Books' && '📖'}
              {product.category === 'Beauty' && '✨'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">{product.description}</p>

          <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Price</span>
              <span className="font-medium">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="text-base font-bold">Total</span>
                <span className="text-base font-bold">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Payment</h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600" />
              <span className="ml-3 text-sm text-gray-500">Preparing payment...</span>
            </div>
          )}

          {!loading && !error && clientSecret && stripePromise && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#2563eb',
                    borderRadius: '8px',
                  },
                },
              }}
            >
              <CheckoutForm
                amount={finalTotal}
                onSuccess={() => setPaid(true)}
              />
            </Elements>
          )}

          {!loading && !error && !clientSecret && !stripePromise && (
            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
              <p className="text-sm text-yellow-800">
                Stripe is not configured. Please set <code className="font-mono">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> and <code className="font-mono">STRIPE_SECRET_KEY</code> environment variables.
              </p>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-gray-500">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
