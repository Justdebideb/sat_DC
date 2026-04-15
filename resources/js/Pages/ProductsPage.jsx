import ProductGrid from '../components/ProductGrid.jsx';
import FiltersSidebar from '../components/FiltersSidebar.jsx';

const styles = {
  main: {
    display: "flex",
    gap: "32px",
    padding: "40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
};

export default function ProductsPage({ activeNav, onProductClick }) {
  return (
    <div style={styles.main}>
      <ProductGrid activeNav={activeNav} onProductClick={onProductClick} />
      <FiltersSidebar />
    </div>
  );
}
