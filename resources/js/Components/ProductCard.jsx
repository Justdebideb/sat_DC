import { useState } from 'react';

const styles = {
  card: {
    background: "white",
    borderRadius: "14px",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  badge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "#1d3557",
    color: "white",
    fontSize: "10px",
    fontWeight: "700",
    padding: "3px 8px",
    borderRadius: "20px",
    letterSpacing: "0.5px",
    zIndex: 2,
  },
  imgBox: {
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  shoeEmoji: {
    fontSize: "64px",
    filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.2))",
    transform: "rotate(-20deg)",
    display: "block",
  },
  cardBody: {
    padding: "12px 14px 14px",
  },
  productName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111",
    margin: "0 0 4px",
  },
  price: {
    fontSize: "14px",
    color: "#e63946",
    fontWeight: "600",
    margin: 0,
  },
  addBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "8px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.15s",
  },
};

export default function ProductCard({ product, onProductClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.12)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onProductClick(product.id)}
    >
      {product.badge && (
        <div style={styles.badge}>{product.badge}</div>
      )}
      <div
        style={{
          ...styles.imgBox,
          background: product.imgBg,
        }}
      >
        <span style={styles.shoeEmoji}>{"\ud83d\udc5f"}</span>
      </div>
      <div style={styles.cardBody}>
        <p style={styles.productName}>{product.name}</p>
        <p style={styles.price}>${product.price}.00</p>
        {hovered && (
          <button
            style={styles.addBtn}
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product.id);
            }}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
