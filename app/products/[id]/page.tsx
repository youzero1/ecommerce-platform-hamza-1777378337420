import { notFound } from 'next/navigation';
import { demoProducts } from '@/lib/demo-data';
import ProductDetailClient from './product-detail-client';

export function generateStaticParams() {
  return demoProducts.map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = demoProducts.find((p) => p.id === params.id);
  if (!product) {
    return { title: 'Product Not Found - ShopWave' };
  }
  return {
    title: `${product.name} - ShopWave`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = demoProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = demoProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
