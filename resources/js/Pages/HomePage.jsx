import { CATEGORIES } from '../data/products.js';

const styles = {
  hero: {
    width: "100%",
    padding: "48px 48px 56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
    minHeight: 360,
    position: "relative",
  },
  heroContent: {
    flex: "0 0 auto",
    maxWidth: 480,
    zIndex: 2,
  },
  exclusiveBadge: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#ff4b6e",
    marginBottom: 12,
    margin: "0 0 12px",
  },
  heroTitle: {
    fontSize: 72,
    fontWeight: 900,
    lineHeight: 1.0,
    color: "#111",
    margin: "0 0 16px",
    letterSpacing: "-2px",
  },
  heroTitleGradient: {
    background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 1.6,
    margin: "0 0 28px",
    maxWidth: 420,
  },
  shopBtn: {
    background: "linear-gradient(135deg, #ff4b6e, #ff6b8a)",
    color: "#fff",
    border: "none",
    borderRadius: 28,
    padding: "13px 28px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 75, 110, 0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  heroImageWrap: {
    flex: "1 1 auto",
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: 400,
  },
  heroImgBg: {
    position: "absolute",
    right: -48,
    top: -48,
    width: "85%",
    height: "calc(100% + 96px)",
    background: "#e63946",
    borderRadius: "0 0 0 40px",
    zIndex: 0,
  },
  heroImg: {
    position: "relative",
    zIndex: 1,
    width: "95%",
    maxWidth: 600,
    objectFit: "contain",
    transform: "rotate(-8deg) translateY(-16px)",
    filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.25))",
  },
  categories: {
    width: "100%",
    padding: "0 48px 64px",
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 800,
    color: "#111",
    margin: "0 0 32px",
    letterSpacing: "-0.5px",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr 1fr",
    gap: 24,
    alignItems: "end",
  },
  categoryCard: {
    borderRadius: 24,
    overflow: "hidden",
    padding: "0 0 24px",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  categoryCardFeatured: {
    gridRow: "span 1",
    transform: "translateY(-16px)",
  },
  categoryImgBox: {
    width: "100%",
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  categoryImgBoxFeatured: {
    height: 260,
  },
  categoryImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  categoryImgFeatured: {
    objectFit: "contain",
    padding: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 700,
    color: "#111",
    textAlign: "center",
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

export default function HomePage({ onAddToCart }) {
  return (
    <>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.exclusiveBadge}>EXCLUSIVE DROP</p>
          <h1 style={styles.heroTitle}>
            Elevate
            <br />
            <span style={styles.heroTitleGradient}>Your Step.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Curated premium sneakers and exclusive streetwear for modern
            aesthetic. Step into the future of footwear.
          </p>
          <button
            style={styles.shopBtn}
            onClick={onAddToCart}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(255, 75, 110, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(255, 75, 110, 0.3)";
            }}
          >
            Shop Collection
          </button>
        </div>

        {/* Hero Image */}
        <div style={styles.heroImageWrap}>
          <div style={styles.heroImgBg} />
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80"
            alt="Featured Sneaker"
            style={styles.heroImg}
          />
        </div>
      </section>

      {/* CATEGORY HIGHLIGHTS */}
      <section style={styles.categories}>
        <h2 style={styles.sectionTitle}>Category Highlights</h2>
        <div style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              style={{
                ...styles.categoryCard,
                background: cat.bg,
                ...(cat.featured ? styles.categoryCardFeatured : {}),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  ...styles.categoryImgBox,
                  background: cat.imgBg,
                  ...(cat.featured ? styles.categoryImgBoxFeatured : {}),
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{
                    ...styles.categoryImg,
                    ...(cat.featured ? styles.categoryImgFeatured : {}),
                  }}
                />
              </div>
              <p style={styles.categoryName}>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
