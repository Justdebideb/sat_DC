import { useState } from 'react';

export default function OrderConfirmation({ orderData, onContinueShopping, onTrackOrder }) {
  const [showAnimation, setShowAnimation] = useState(true);

  // Hide animation after 3 seconds
  setTimeout(() => setShowAnimation(false), 3000);

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>AURA.</span>
      </nav>

      <div style={s.container}>
        {/* Success Animation */}
        {showAnimation && (
          <div style={s.animationOverlay}>
            <div style={s.checkmarkCircle}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" stroke="#2d9e5f" strokeWidth="4" />
                <path
                  d="M22 40L35 53L58 30"
                  stroke="#2d9e5f"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    animation: "drawCheck 0.6s ease-out 0.3s forwards",
                    strokeDasharray: "60",
                    strokeDashoffset: "60"
                  }}
                />
              </svg>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div style={s.content}>
          {/* Success Message */}
          <div style={s.successSection}>
            <h1 style={s.title}>Thank You for Your Order!</h1>
            <p style={s.subtitle}>
              Your order has been confirmed and will be shipped soon.
            </p>

            {/* Order Info */}
            <div style={s.orderInfo}>
              <div style={s.infoItem}>
                <span style={s.infoLabel}>Order Number:</span>
                <span style={s.infoValue}>{orderData.orderNumber}</span>
              </div>
              <div style={s.infoItem}>
                <span style={s.infoLabel}>Payment Method:</span>
                <span style={s.infoValue}>
                  {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                </span>
              </div>
              <div style={s.infoItem}>
                <span style={s.infoLabel}>Estimated Delivery:</span>
                <span style={s.infoValue}>
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div style={s.orderDetails}>
            <h2 style={s.sectionTitle}>Order Details</h2>

            {/* Product List */}
            <div style={s.productList}>
              {orderData.items.map((item) => (
                <div key={`${item.id}-${item.size}`} style={s.orderItem}>
                  <div style={{ ...s.productThumb, background: item.bg }}>
                    <span style={s.thumbEmoji}>{"\ud83d\udc5f"}</span>
                  </div>
                  <div style={s.productInfo}>
                    <h3 style={s.productName}>{item.name}</h3>
                    <p style={s.productMeta}>
                      Size: {item.size} | Quantity: {item.quantity}
                    </p>
                    <p style={s.productPrice}>${item.price.toFixed(2)} each</p>
                  </div>
                  <div style={s.itemTotal}>
                    <p style={s.totalPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={s.orderSummary}>
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>Subtotal</span>
                <span style={s.summaryValue}>
                  ${(orderData.total - 15).toFixed(2)}
                </span>
              </div>
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>Shipping</span>
                <span style={s.summaryValue}>$15.00</span>
              </div>
              <div style={s.summaryDivider} />
              <div style={s.totalRow}>
                <span style={s.totalLabel}>Total Paid</span>
                <span style={s.totalAmount}>${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div style={s.shippingSection}>
            <h2 style={s.sectionTitle}>Shipping Address</h2>
            <div style={s.addressCard}>
              <p style={s.addressName}>
                {orderData.shipping.firstName} {orderData.shipping.lastName}
              </p>
              <p style={s.addressLine}>{orderData.shipping.address}</p>
              <p style={s.addressLine}>
                {orderData.shipping.city}, {orderData.shipping.zip}
              </p>
              <p style={s.addressLine}>{orderData.shipping.phone}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={s.actions}>
            <button style={s.primaryBtn} onClick={onContinueShopping}>
              Continue Shopping
            </button>
            <button style={s.secondaryBtn} onClick={onTrackOrder}>
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Add CSS animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes drawCheck {
            to {
              stroke-dashoffset: 0;
            }
          }
        `
      }} />
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  nav: {
    background: "white",
    borderBottom: "1px solid #e8e8e8",
    padding: "0 40px",
    height: "52px",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "-0.5px",
    color: "#111",
  },
  animationOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-in",
  },
  checkmarkCircle: {
    animation: "scaleIn 0.5s ease-out",
  },
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "0 24px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  successSection: {
    background: "white",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#111",
    margin: "0 0 16px",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
    margin: "0 0 32px",
    lineHeight: 1.6,
  },
  orderInfo: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  infoLabel: {
    fontSize: "12px",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  infoValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111",
  },
  orderDetails: {
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111",
    margin: "0 0 24px",
    letterSpacing: "-0.5px",
  },
  productList: {
    marginBottom: "24px",
  },
  orderItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    background: "#f8f9fa",
    borderRadius: "12px",
    marginBottom: "12px",
  },
  productThumb: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbEmoji: {
    fontSize: "32px",
    transform: "rotate(-20deg)",
    display: "block",
    lineHeight: 1,
    filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.2))",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#111",
    margin: "0 0 4px",
  },
  productMeta: {
    fontSize: "13px",
    color: "#888",
    margin: "0 0 4px",
  },
  productPrice: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  itemTotal: {
    textAlign: "right",
  },
  totalPrice: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111",
    margin: 0,
  },
  orderSummary: {
    background: "#f8f9fa",
    borderRadius: "12px",
    padding: "20px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  summaryLabel: {
    fontSize: "14px",
    color: "#666",
  },
  summaryValue: {
    fontSize: "14px",
    color: "#111",
    fontWeight: "500",
  },
  summaryDivider: {
    height: "1px",
    background: "#e0e0e0",
    margin: "12px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: "16px",
    color: "#111",
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: "24px",
    fontWeight: "900",
    color: "#111",
    letterSpacing: "-0.5px",
  },
  shippingSection: {
    background: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },
  addressCard: {
    background: "#f8f9fa",
    borderRadius: "12px",
    padding: "20px",
  },
  addressName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#111",
    margin: "0 0 8px",
  },
  addressLine: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 4px",
  },
  actions: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
    letterSpacing: "0.3px",
  },
  secondaryBtn: {
    background: "white",
    color: "#111",
    border: "2px solid #111",
    borderRadius: "12px",
    padding: "14px 30px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
    letterSpacing: "0.3px",
  },
};
