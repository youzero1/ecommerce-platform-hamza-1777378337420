import type { Metadata } from 'next';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShopWave - Premium E-Commerce Store',
  description: 'Discover premium products at unbeatable prices. Free shipping on orders over $50.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
