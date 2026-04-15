import { useState, useMemo } from 'react';
import { products, categories, sortOptions } from '../data/products.js';

export function useProducts() {
  const [activeCategories, setActiveCategories] = useState(["Lifestyle"]);
  const [sort, setSort] = useState("Latest Arrivals");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCategory = (cat) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const filteredAndSorted = useMemo(() => {
    // Filter products
    const filtered = products.filter((p) => {
      const matchesCat =
        activeCategories.length === 0 || activeCategories.includes(p.category);
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      return 0;
    });

    return sorted;
  }, [activeCategories, sort, searchQuery]);

  const perPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / perPage));
  const paginated = filteredAndSorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  const resetFilters = () => {
    setActiveCategories(["Lifestyle"]);
    setSort("Latest Arrivals");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return {
    // Data
    products,
    categories,
    sortOptions,
    
    // State
    activeCategories,
    sort,
    searchQuery,
    currentPage,
    totalPages,
    
    // Computed
    filteredProducts: filteredAndSorted,
    paginatedProducts: paginated,
    
    // Actions
    setActiveCategories,
    setSort,
    setSearchQuery,
    setCurrentPage,
    toggleCategory,
    resetFilters,
  };
}
