import { useProducts } from '../hooks/useProducts.js';

const styles = {
  sidebar: {
    width: "220px",
    flexShrink: 0,
  },
  filtersTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111",
    margin: "0 0 16px",
  },
  searchInput: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "9px 12px",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
    background: "white",
  },
  catLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#111",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "12px",
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    borderRadius: "4px",
    border: "1.5px solid #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.15s",
  },
  catText: {
    fontSize: "14px",
    color: "#333",
  },
  catCount: {
    color: "#aaa",
    fontSize: "12px",
  },
};

export default function FiltersSidebar() {
  const {
    categories,
    activeCategories,
    searchQuery,
    toggleCategory,
    setSearchQuery,
  } = useProducts();

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.filtersTitle}>Filters</h2>
      <input
        type="text"
        placeholder="Search models..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchInput}
      />
      <div style={{ marginTop: "24px" }}>
        <p style={styles.catLabel}>Categories</p>
        {categories.map((cat) => (
          <label key={cat.name} style={styles.checkLabel}>
            <div
              style={{
                ...styles.checkbox,
                background: activeCategories.includes(cat.name) ? "#111" : "white",
                borderColor: activeCategories.includes(cat.name) ? "#111" : "#ccc",
              }}
              onClick={() => toggleCategory(cat.name)}
            >
              {activeCategories.includes(cat.name) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={styles.catText}>
              {cat.name} <span style={styles.catCount}>({cat.count})</span>
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}
