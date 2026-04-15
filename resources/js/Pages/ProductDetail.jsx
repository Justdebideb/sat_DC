import { useState } from "react";
import { useCart } from '../contexts/CartContext.jsx';
import { products } from '../data/products.js';

export default function ProductDetail({ productId, onBack }) {
  const product = products.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 9);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div style={s.page}>
        <nav style={s.nav}>
          <span style={s.logo}>AURA.</span>
          <button style={s.backBtn} onClick={onBack}>Back</button>
        </nav>
        <div style={s.container}>
          <p style={s.errorText}>Product not found</p>
        </div>
      </div>
    );
  }

  const handleAddToBag = () => {
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => Math.min(product.stock, q + 1));

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>AURA.</span>
        <button style={s.backBtn} onClick={onBack}>Back</button>
      </nav>

      {/* Product layout */}
      <div style={s.container}>
        {/* Left: image + thumbnails */}
        <div style={s.leftCol}>
          <div style={s.mainImgBox}>
            <ShoeImage bg={product.images[activeImage].bg} size={220} />
          </div>
          <div style={s.thumbnails}>
            {product.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(i)}
                style={{
                  ...s.thumb,
                  borderColor: activeImage === i ? "#1d3557" : "#ddd",
                  borderWidth: activeImage === i ? "2px" : "1.5px",
                }}
              >
                <ShoeImage bg={img.bg} size={48} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: product info */}
        <div style={s.rightCol}>
          <p style={s.collection}>{product.collection}</p>
          <h1 style={s.productName}>{product.name}</h1>
          <p style={s.price}>${product.price}.00</p>

          <div style={s.stockBadge}>
            <span style={s.dot} />
            <span style={s.stockText}>
              IN STOCK ({product.stock} AVAILABLE)
            </span>
          </div>

          <p style={s.description}>{product.description}</p>

          {/* Size selector */}
          <div style={{ marginBottom: "28px" }}>
            <p style={s.sizeLabel}>Select Size (US)</p>
            <div style={s.sizeGrid}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    ...s.sizeBtn,
                    borderColor:
                      selectedSize === size ? "#1d3557" : "#ddd",
                    color: selectedSize === size ? "#1d3557" : "#444",
                    background:
                      selectedSize === size ? "#f0f4ff" : "white",
                    fontWeight: selectedSize === size ? "600" : "400",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Bag */}
          <div style={s.actionRow}>
            <div style={s.qtyControl}>
              <button style={s.qtyBtn} onClick={decreaseQty}>-</button>
              <span style={s.qtyNum}>{quantity}</span>
              <button style={s.qtyBtn} onClick={increaseQty}>+</button>
            </div>
            <button
              style={{
                ...s.addBtn,
                background: added ? "#2d6a4f" : "#111",
              }}
              onClick={handleAddToBag}
            >
              {added ? "Added!" : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoeImage({ bg, size }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "inherit",
      }}
    >
      <span
        style={{
          fontSize: `${size}px`,
          filter: "drop-shadow(3px 6px 8px rgba(0,0,0,0.25))",
          transform: "rotate(-20deg)",
          display: "block",
          lineHeight: 1,
        }}
      >
        {"\ud83d\udc5f"}
      </span>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#f4f5f7",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  nav: {
    background: "white",
    borderBottom: "1px solid #eee",
    padding: "0 40px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    color: "#111",
  },
  backBtn: {
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  errorText: {
    fontSize: "18px",
    color: "#666",
    textAlign: "center",
    padding: "40px",
  },
  container: {
    maxWidth: "900px",
    margin: "48px auto",
    padding: "0 24px",
    display: "flex",
    gap: "56px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  leftCol: {
    flex: "0 0 420px",
    minWidth: "280px",
  },
  mainImgBox: {
    width: "100%",
    height: "360px",
    borderRadius: "16px",
    overflow: "hidden",
    background: "#e63946",
  },
  thumbnails: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  thumb: {
    width: "80px",
    height: "80px",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    padding: 0,
    background: "none",
    transition: "border-color 0.15s",
  },
  rightCol: {
    flex: 1,
    minWidth: "260px",
    paddingTop: "8px",
  },
  collection: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.2px",
    color: "#6b7cff",
    margin: "0 0 10px",
    textTransform: "uppercase",
  },
  productName: {
    fontSize: "38px",
    fontWeight: "900",
    color: "#111",
    margin: "0 0 12px",
    letterSpacing: "-1px",
    lineHeight: 1.1,
  },
  price: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#e63946",
    margin: "0 0 14px",
  },
  stockBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "16px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#2d9e5f",
    flexShrink: 0,
  },
  stockText: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#2d9e5f",
    letterSpacing: "0.5px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.7",
    margin: "0 0 24px",
    maxWidth: "400px",
  },
  sizeLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#111",
    margin: "0 0 12px",
  },
  sizeGrid: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  sizeBtn: {
    width: "58px",
    height: "44px",
    border: "1.5px solid #ddd",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    gap: "0",
    border: "1.5px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    background: "white",
  },
  qtyBtn: {
    width: "38px",
    height: "46px",
    border: "none",
    background: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#333",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyNum: {
    width: "36px",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
    color: "#111",
    borderLeft: "1px solid #eee",
    borderRight: "1px solid #eee",
    lineHeight: "46px",
    display: "block",
  },
  addBtn: {
    flex: 1,
    height: "46px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.3px",
    transition: "background 0.2s",
    fontFamily: "inherit",
  },
};
