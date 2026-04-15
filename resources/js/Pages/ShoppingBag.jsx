import { useState } from "react";
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function ShoppingBag({ onBack, onCheckout, onAuthRequired }) {
  const { items, subtotal, shipping, total, updateQuantity, removeItem } = useCart();
  const { requireAuth, isAuthenticated } = useAuth();
  const [checkedOut, setCheckedOut] = useState(false);

  const SHIPPING = 15;

  const handleCheckout = () => {
    if (items.length === 0) return;

    if (!requireAuth()) {
      onAuthRequired();
      return;
    }

    onCheckout();
  };

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>AURA.</span>
        <button style={s.backBtn} onClick={onBack}>Back</button>
      </nav>

      <div style={s.container}>
        <h1 style={s.heading}>Shopping Bag</h1>

        <div style={s.layout}>
          {/* Cart table */}
          <div style={s.cartBox}>
            {/* Column headers */}
            <div style={s.tableHead}>
              <span style={{ ...s.colLabel, flex: 3 }}>PRODUCT DETAILS</span>
              <span style={{ ...s.colLabel, flex: 1, textAlign: "center" }}>QUANTITY</span>
              <span style={{ ...s.colLabel, flex: 1, textAlign: "right" }}>PRICE</span>
              <span style={{ ...s.colLabel, flex: 1, textAlign: "right" }}>TOTAL</span>
            </div>

            <div style={s.divider} />

            {/* Items */}
            {items.length === 0 ? (
              <div style={s.emptyState}>Your bag is empty.</div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.size}`} style={s.itemRow}>
                  {/* Product info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 3 }}>
                    <div style={{ ...s.imgBox, background: item.bg }}>
                      <span style={s.shoeEmoji}>{"\ud83d\udc5f"}</span>
                    </div>
                    <div>
                      <p style={s.itemName}>{item.name}</p>
                      <p style={s.itemSize}>Size: {item.size}</p>
                      <button style={s.removeBtn} onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <div style={s.qtyControl}>
                      <button style={s.qtyBtn} onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span style={s.qtyNum}>{item.quantity}</span>
                      <button style={s.qtyBtn} onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>

                  {/* Price */}
                  <span style={{ ...s.priceCell, flex: 1 }}>
                    ${item.price.toFixed(2)}
                  </span>

                  {/* Total */}
                  <span style={{ ...s.totalCell, flex: 1 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div style={s.summaryBox}>
            <h2 style={s.summaryTitle}>Order Summary</h2>

            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Subtotal</span>
              <span style={s.summaryValue}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={s.summaryRow}>
              <span style={s.summaryLabel}>Shipping</span>
              <span style={s.summaryValue}>
                {items.length > 0 ? `$${SHIPPING.toFixed(2)}` : "-"}
              </span>
            </div>

            <div style={s.summaryDivider} />

            <div style={s.totalRow}>
              <span style={s.totalLabel}>Total</span>
              <span style={s.totalAmount}>${total.toFixed(2)}</span>
            </div>

            <button
              style={{
                ...s.checkoutBtn,
                opacity: items.length === 0 ? 0.5 : 1,
                cursor: items.length === 0 ? "not-allowed" : "pointer",
                background: checkedOut ? "#2d9e5f" : "#ff4d6d",
              }}
              disabled={items.length === 0}
              onClick={handleCheckout}
            >
              {checkedOut ? "Order Placed!" : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
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
    borderBottom: "2px solid #1d3557",
    padding: "0 40px",
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "900",
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
  container: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "0 24px",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "900",
    color: "#111",
    margin: "0 0 24px",
    letterSpacing: "-0.5px",
    borderBottom: "2px dashed #b0c4de",
    paddingBottom: "16px",
  },
  layout: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  cartBox: {
    flex: "1 1 480px",
    background: "white",
    border: "1.5px dashed #b0c4de",
    borderRadius: "12px",
    padding: "24px",
    minWidth: "320px",
  },
  tableHead: {
    display: "flex",
    alignItems: "center",
    marginBottom: "14px",
  },
  colLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#999",
    textTransform: "uppercase",
  },
  divider: {
    height: "1px",
    background: "#eee",
    marginBottom: "20px",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "20px",
    gap: "8px",
  },
  imgBox: {
    width: "76px",
    height: "76px",
    borderRadius: "10px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  shoeEmoji: {
    fontSize: "40px",
    transform: "rotate(-20deg)",
    display: "block",
    filter: "drop-shadow(2px 3px 4px rgba(0,0,0,0.2))",
    lineHeight: 1,
  },
  itemName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111",
    margin: "0 0 3px",
  },
  itemSize: {
    fontSize: "12px",
    color: "#888",
    margin: "0 0 6px",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#e63946",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit",
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    background: "white",
  },
  qtyBtn: {
    width: "30px",
    height: "32px",
    border: "none",
    background: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#444",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  },
  qtyNum: {
    width: "28px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111",
    borderLeft: "1px solid #eee",
    borderRight: "1px solid #eee",
    lineHeight: "32px",
    display: "block",
  },
  priceCell: {
    fontSize: "14px",
    color: "#555",
    textAlign: "right",
  },
  totalCell: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111",
    textAlign: "right",
  },
  emptyState: {
    textAlign: "center",
    color: "#aaa",
    padding: "40px 0",
    fontSize: "15px",
  },
  summaryBox: {
    width: "280px",
    flexShrink: 0,
    background: "#111827",
    borderRadius: "16px",
    padding: "28px 24px",
    color: "white",
  },
  summaryTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "white",
    margin: "0 0 24px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  summaryLabel: {
    fontSize: "14px",
    color: "#9ca3af",
  },
  summaryValue: {
    fontSize: "14px",
    color: "white",
    fontWeight: "500",
  },
  summaryDivider: {
    height: "1px",
    background: "#374151",
    margin: "20px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  totalLabel: {
    fontSize: "15px",
    color: "#9ca3af",
  },
  totalAmount: {
    fontSize: "28px",
    fontWeight: "800",
    color: "white",
    letterSpacing: "-0.5px",
  },
  checkoutBtn: {
    width: "100%",
    height: "48px",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.2px",
    transition: "background 0.2s, transform 0.1s",
    fontFamily: "inherit",
  },
};
