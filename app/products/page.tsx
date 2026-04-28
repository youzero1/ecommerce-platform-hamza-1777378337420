import ProductCard from '@/components/product-card';
import { demoProducts, demoCategories } from '@/lib/demo-data';
import { SlidersHorizontal } from 'lucide-react';
import ProductSortSelect from '@/components/product-sort-select';

export const metadata = {
  title: 'Products - ShopWave',
  description: 'Browse our complete collection of premium products.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  let products = [...demoProducts];

  // Filter by search
  if (params.search) {
    const query = params.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (params.category) {
    const catSlug = params.category.toLowerCase();
    const matchingCat = demoCategories.find((c) => c.slug === catSlug);
    if (matchingCat) {
      products = products.filter((p) => p.category === matchingCat.name);
    }
  }

  // Sort
  if (params.sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (params.sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (params.sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  } else if (params.sort === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-500">
          {products.length} product{products.length !== 1 ? 's' : ''} found
          {params.search ? ` for "${params.search}"` : ''}
          {params.category ? ` in ${params.category}` : ''}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <SlidersHorizontal className="h-5 w-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filter:</span>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <a
            href="/products"
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !params.category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </a>
          {demoCategories.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.slug}${params.sort ? `&sort=${params.sort}` : ''}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                params.category === cat.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>

        <div className="ml-auto">
          <ProductSortSelect
            currentSort={params.sort || ''}
            currentCategory={params.category || ''}
          />
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl">🔍</span>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No products found</h2>
          <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
          <a href="/products" className="mt-6 btn-primary">
            Clear Filters
          </a>
        </div>
      )}
    </div>
  );
}
