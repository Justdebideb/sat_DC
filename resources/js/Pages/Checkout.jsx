import { useState } from "react";
import { useCart } from '../contexts/CartContext.jsx';

const SHIPPING = 15;

export default function Checkout({ onBack, onOrderConfirm }) {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirm = () => {
    if (items.length === 0) return;
    
    setConfirmed(true);
    setTimeout(() => {
      const orderData = {
        items: [...items],
        shipping: form,
        paymentMethod,
        total,
        timestamp: new Date().toISOString(),
        orderNumber: `ORD-${Date.now()}`
      };
      
      onOrderConfirm(orderData);
      clearCart();
      setConfirmed(false);
    }, 2200);
  };

  const isFormValid = form.firstName && form.lastName && form.phone && form.address && form.city && form.zip;

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>AURA.</span>
        <button style={s.backBtn} onClick={onBack}>Back</button>
      </nav>

      <div style={s.container}>
        {/* Left column */}
        <div style={s.leftCol}>
          {/* Shipping Details */}
          <section style={s.card}>
            <div style={s.stepHeader}>
              <div style={s.stepBadge}>1</div>
              <h2 style={s.stepTitle}>Shipping Details</h2>
            </div>

            <div style={s.formGrid}>
              <input
                style={s.input}
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                style={s.input}
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <input
              style={{ ...s.input, width: "100%", boxSizing: "border-box" }}
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              style={{ ...s.input, width: "100%", boxSizing: "border-box" }}
              name="address"
              placeholder="Street Address"
              value={form.address}
              onChange={handleChange}
            />

            <div style={s.formGrid}>
              <input
                style={s.input}
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
              />
              <input
                style={s.input}
                name="zip"
                placeholder="Zip Code"
                value={form.zip}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Payment Method */}
          <section style={s.card}>
            <div style={s.stepHeader}>
              <div style={s.stepBadge}>2</div>
              <h2 style={s.stepTitle}>Payment Method</h2>
            </div>

            <PaymentOption
              id="cod"
              label="Cash on Delivery (COD)"
              selected={paymentMethod === "cod"}
              onSelect={() => setPaymentMethod("cod")}
            />
            <PaymentOption
              id="bank"
              label="Bank Transfer"
              selected={paymentMethod === "bank"}
              onSelect={() => setPaymentMethod("bank")}
            />
          </section>
        </div>

        {/* Right column — Order Summary */}
        <aside style={s.summaryCard}>
          <h2 style={s.summaryTitle}>In Your Bag</h2>

          {/* Product rows */}
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} style={s.productRow}>
              <div style={{ ...s.thumb, background: item.bg }}>
                <span style={s.thumbEmoji}>{"\ud83d\udc5f"}</span>
              </div>
              <div>
                <p style={s.productName}>{item.name}</p>
                <p style={s.productMeta}>
                  Qty: {item.quantity} | Size: {item.size}
                </p>
                <p style={s.productPrice}>${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div style={s.summaryDivider} />

          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>Subtotal</span>
            <span style={s.summaryValue}>${subtotal.toFixed(2)}</span>
          </div>
          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>Shipping</span>
            <span style={s.summaryValue}>${shipping.toFixed(2)}</span>
          </div>

          <div style={s.summaryDivider} />

          <div style={s.totalRow}>
            <span style={s.totalLabel}>Total</span>
            <span style={s.totalAmount}>${total.toFixed(2)}</span>
          </div>

          <button
            style={{
              ...s.confirmBtn,
              background: confirmed ? "#2d9e5f" : "#111",
              opacity: !isFormValid || items.length === 0 ? 0.5 : 1,
              cursor: !isFormValid || items.length === 0 ? "not-allowed" : "pointer",
            }}
            onClick={handleConfirm}
            disabled={!isFormValid || items.length === 0}
          >
            {confirmed ? "Order Confirmed!" : "Confirm Order"}
          </button>
        </aside>
      </div>
    </div>
  );
}

function PaymentOption({ id, label, selected, onSelect }) {
  return (
    <div
      style={{
        ...s.payOption,
        border: selected
          ? "1.5px solid #1d3557"
          : "1.5px solid #e0e0e0",
        background: selected ? "#f5f7ff" : "white",
        marginBottom: "10px",
      }}
      onClick={onSelect}
    >
      <div
        style={{
          ...s.radio,
          borderColor: selected ? "#1d3557" : "#bbb",
        }}
      >
        {selected && <div style={s.radioDot} />}
      </div>
      <span
        style={{
          fontSize: "14px",
          fontWeight: selected ? "600" : "400",
          color: selected ? "#1d3557" : "#444",
        }}
      >
        {label}
      </span>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#f0f2f5",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  nav: {
    background: "white",
    borderBottom: "1px solid #e8e8e8",
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
    maxWidth: "860px",
    margin: "36px auto",
    padding: "0 24px",
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  leftCol: {
    flex: "1 1 420px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    minWidth: "300px",
  },
  card: {
    background: "white",
    borderRadius: "14px",
    padding: "24px",
    border: "1px solid #e8e8e8",
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  stepBadge: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#1d3557",
    color: "white",
    fontSize: "13px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#111",
    margin: 0,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "12px",
  },
  input: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "11px 14px",
    fontSize: "13px",
    color: "#333",
    outline: "none",
    fontFamily: "inherit",
    background: "#fafafa",
    marginBottom: "12px",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
  },
  payOption: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  radio: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "2px solid #bbb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "border-color 0.15s",
  },
  radioDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#1d3557",
  },
  summaryCard: {
    width: "260px",
    flexShrink: 0,
    background: "white",
    borderRadius: "14px",
    padding: "24px",
    border: "1px solid #e8e8e8",
  },
  summaryTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#111",
    margin: "0 0 16px",
  },
  productRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#f7f8fa",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "16px",
  },
  thumb: {
    width: "52px",
    height: "52px",
    borderRadius: "8px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbEmoji: {
    fontSize: "28px",
    transform: "rotate(-20deg)",
    display: "block",
    lineHeight: 1,
    filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.2))",
  },
  productName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#111",
    margin: "0 0 2px",
  },
  productMeta: {
    fontSize: "11px",
    color: "#888",
    margin: "0 0 3px",
  },
  productPrice: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#e63946",
    margin: 0,
  },
  summaryDivider: {
    height: "1px",
    background: "#f0f0f0",
    margin: "14px 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  summaryLabel: {
    fontSize: "13px",
    color: "#888",
  },
  summaryValue: {
    fontSize: "13px",
    color: "#333",
    fontWeight: "500",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  totalLabel: {
    fontSize: "14px",
    color: "#555",
    fontWeight: "500",
  },
  totalAmount: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#111",
    letterSpacing: "-0.5px",
  },
  confirmBtn: {
    width: "100%",
    height: "46px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s",
    fontFamily: "inherit",
    letterSpacing: "0.2px",
  },
};
