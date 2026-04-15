import { NAV_LINKS } from '../data/products.js';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "#fff",
    borderBottom: "1px solid #f0f0f0",
    padding: "0 48px",
  },
  navInner: {
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  logo: {
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: "-0.5px",
    color: "#111",
    flexShrink: 0,
  },
  navLinks: {
    display: "flex",
    gap: 24,
    alignItems: "center",
  },
  navLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "#555",
    fontWeight: 500,
    padding: "8px 12px",
    borderRadius: 8,
    transition: "all 0.2s",
    position: "relative",
  },
  navLinkActive: {
    color: "#ff4b6e",
    fontWeight: 700,
    backgroundColor: "rgba(255, 75, 110, 0.1)",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  navAction: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "#555",
    padding: 0,
  },
  cartBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "#555",
    padding: 0,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    background: "#ff4b6e",
    color: "white",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 5px",
    borderRadius: "10px",
    minWidth: "16px",
    textAlign: "center",
  },
  loginBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 24,
    padding: "8px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  userMenu: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px",
    background: "#f8f9fa",
    borderRadius: 20,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  userAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#111",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#111",
  },
  logoutBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default function Header({ activeNav, onNavClick, onCartClick }) {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        {/* Logo */}
        <span style={styles.logo}>AURA.</span>

        {/* Nav Links */}
        <div style={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => onNavClick(link)}
              style={{
                ...styles.navLink,
                ...(activeNav === link ? styles.navLinkActive : {}),
              }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div style={styles.navRight}>
          <button style={styles.navAction}>Search</button>
          <button style={styles.cartBtn} onClick={onCartClick}>
            Cart
            {cartCount > 0 && (
              <span style={styles.cartBadge}>{cartCount}</span>
            )}
          </button>

          {isAuthenticated ? (
            <div style={styles.userMenu}>
              <div style={styles.userInfo}>
                <div style={styles.userAvatar}>{user?.avatar || '👤'}</div>
                <span style={styles.userName}>
                  {user?.name} {isAdmin && '(Admin)'}
                </span>
              </div>
              <button style={styles.logoutBtn} onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              style={styles.loginBtn}
              onClick={() => window.location.href = '#auth'}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
