import { useProducts } from '../hooks/useProducts.js';
import ProductCard from './ProductCard.jsx';

const styles = {
  content: {
    flex: 1,
    minWidth: 0,
  },
  headerRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#888",
    margin: "4px 0 0",
  },
  select: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "13px",
    color: "#333",
    background: "white",
    cursor: "pointer",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
    gap: "16px",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "32px",
  },
  pageBtn: {
    border: "1px solid #ddd",
    background: "white",
    color: "#111",
    width: "38px",
    height: "38px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    fontFamily: "inherit",
    padding: 0,
  },
  empty: {
    gridColumn: "1/-1",
    textAlign: "center",
    color: "#aaa",
    padding: "40px 0",
    fontSize: "15px",
  },
};

export default function ProductGrid({ activeNav, onProductClick }) {
  const {
    sortOptions,
    currentPage,
    totalPages,
    paginatedProducts,
    filteredProducts,
    setSort,
    setCurrentPage,
  } = useProducts();

  return (
    <div style={styles.content}>
      {/* Header row */}
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>
            {activeNav === "Men" ? "Men's" : "Women's"} Sneakers
          </h1>
          <p style={styles.subtitle}>
            Showing {paginatedProducts.length > 0 ? (currentPage - 1) * 9 + 1 : 0}-
            {Math.min(currentPage * 9, filteredProducts.length)} of {filteredProducts.length} products
          </p>
        </div>
        <select
          value={sortOptions.find(option => option === sortOptions[0]) ? "Latest Arrivals" : sortOptions[1]}
          onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
          style={styles.select}
        >
          {sortOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
        ))}
        {paginatedProducts.length === 0 && (
          <div style={styles.empty}>No products found.</div>
        )}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.pageBtn}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            style={{
              ...styles.pageBtn,
              background: p === currentPage ? "#111" : "white",
              color: p === currentPage ? "white" : "#111",
              fontWeight: p === currentPage ? "600" : "400",
            }}
          >
            {p}
          </button>
        ))}
        <button
          style={styles.pageBtn}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
