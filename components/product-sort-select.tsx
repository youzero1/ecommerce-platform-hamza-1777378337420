'use client';

import { useRouter } from 'next/navigation';

export default function ProductSortSelect({
  currentSort,
  currentCategory,
}: {
  currentSort: string;
  currentCategory: string;
}) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const sort = e.target.value;
    const params = new URLSearchParams();
    if (currentCategory) params.set('category', currentCategory);
    if (sort) params.set('sort', sort);
    const qs = params.toString();
    router.push(`/products${qs ? `?${qs}` : ''}`);
  }

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
    >
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Highest Rated</option>
      <option value="name">Name A-Z</option>
    </select>
  );
}
