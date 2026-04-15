import { useState, useEffect } from 'react';
import { CartProvider } from '../contexts/CartContext.jsx';
import { AuthProvider, useAuth } from '../contexts/AuthContext.jsx';
import Header from '../components/Header.jsx';
import HomePage from '../pages/HomePage.jsx';
import ProductsPage from '../pages/ProductsPage.jsx';
import ProductDetail from '../pages/ProductDetail.jsx';
import ShoppingBag from '../pages/ShoppingBag.jsx';
import Checkout from '../pages/Checkout.jsx';
import OrderConfirmation from '../pages/OrderConfirmation.jsx';
import TrackOrder from '../pages/TrackOrder.jsx';
import AuthPage from '../pages/AuthPage.jsx';
import '../styles/dashboard.css';

function AppContent() {
  const { user, isLoading, checkoutIntent, clearCheckoutIntent, isAuthenticated } = useAuth();
  const [activeNav, setActiveNav] = useState("New Arrivals");
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [orderData, setOrderData] = useState(null);

  // Redirect to checkout after successful login if there was checkout intent
  useEffect(() => {
    if (isAuthenticated && checkoutIntent) {
      clearCheckoutIntent();
      setCurrentPage("checkout");
    }
  }, [isAuthenticated, checkoutIntent, clearCheckoutIntent]);

  const handleNavClick = (link) => {
    setActiveNav(link);
    setCurrentPage("home");
    setSelectedProductId(null);

    // Handle specific navigation actions
    switch(link) {
      case 'Men':
        console.log('Navigating to Men\'s collection');
        break;
      case 'Women':
        console.log('Navigating to Women\'s collection');
        break;
      case 'New Arrivals':
        console.log('Showing New Arrivals');
        break;
      default:
        break;
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage("detail");
  };

  const handleCartClick = () => {
    setCurrentPage("cart");
  };

  const handleCheckout = () => {
    setCurrentPage("checkout");
  };

  const handleOrderConfirm = (order) => {
    setOrderData(order);
    setCurrentPage("confirmation");
  };

  const handleTrackOrder = () => {
    setCurrentPage("tracking");
  };

  const handleAuthRequired = () => {
    setCurrentPage("auth");
  };

  const handleAuthSuccess = () => {
    setCurrentPage("home");
  };

  const handleBack = () => {
    setCurrentPage("home");
    setSelectedProductId(null);
  };

  const handleContinueShopping = () => {
    setCurrentPage("home");
    setActiveNav("New Arrivals");
    setSelectedProductId(null);
    setOrderData(null);
  };

  const renderPage = () => {
    switch(currentPage) {
      case "detail":
        return (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBack}
          />
        );
      case "cart":
        return (
          <ShoppingBag
            onBack={handleBack}
            onCheckout={handleCheckout}
            onAuthRequired={handleAuthRequired}
          />
        );
      case "auth":
        return (
          <AuthPage
            onBack={handleBack}
            onAuthSuccess={handleAuthSuccess}
          />
        );
      case "checkout":
        return (
          <Checkout
            onBack={handleBack}
            onOrderConfirm={handleOrderConfirm}
          />
        );
      case "confirmation":
        return (
          <OrderConfirmation
            orderData={orderData}
            onContinueShopping={handleContinueShopping}
            onTrackOrder={handleTrackOrder}
          />
        );
      case "tracking":
        return (
          <TrackOrder
            orderData={orderData}
            onBack={handleBack}
          />
        );
      default:
        return (activeNav === "Men" || activeNav === "Women") ? (
          <ProductsPage
            activeNav={activeNav}
            onProductClick={handleProductClick}
          />
        ) : (
          <HomePage />
        );
    }
  };

  return (
    <div className="page">
      <Header
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onCartClick={handleCartClick}
      />

      {renderPage()}
    </div>
  );
}

export default function AuraStore() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
