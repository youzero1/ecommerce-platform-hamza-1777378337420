import ProductCard from '@/components/product-card';
import { demoProducts, demoCategories } from '@/lib/demo-data';
import { SlidersHorizontal } from 'lucide-react';

export const metadata = {
  title: 'Products - ShopWave',
  description: 'Browse our complete collection of premium products.',
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; sort?: string };
}) {
  let products = [...demoProducts];

  // Filter by search
  if (searchParams.search) {
    const query = searchParams.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (searchParams.category) {
    const catSlug = searchParams.category.toLowerCase();
    const matchingCat = demoCategories.find((c) => c.slug === catSlug);
    if (matchingCat) {
      products = products.filter((p) => p.category === matchingCat.name);
    }
  }

  // Sort
  if (searchParams.sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (searchParams.sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (searchParams.sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  } else if (searchParams.sort === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-500">
          {products.length} product{products.length !== 1 ? 's' : ''} found
          {searchParams.search ? ` for "${searchParams.search}"` : ''}
          {searchParams.category ? ` in ${searchParams.category}` : ''}
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
              !searchParams.category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </a>
          {demoCategories.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.slug}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                searchParams.category === cat.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>

        <div className="ml-auto">
          <select
            defaultValue={searchParams.sort || ''}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            onChange={() => {}}
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
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
