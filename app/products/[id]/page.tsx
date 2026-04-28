import { notFound } from 'next/navigation';
import { demoProducts } from '@/lib/demo-data';
import ProductDetailClient from './product-detail-client';

export function generateStaticParams() {
  return demoProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = demoProducts.find((p) => p.id === id);
  if (!product) {
    return { title: 'Product Not Found - ShopWave' };
  }
  return {
    title: `${product.name} - ShopWave`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = demoProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = demoProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
