import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('aura-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
        setCartCount(parsedCart.reduce((sum, item) => sum + item.quantity, 0));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('aura-cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('aura-cart');
    }
    setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
  }, [items]);

  const addToCart = (product, selectedSize, quantity) => {
    const existingItemIndex = items.findIndex(
      item => item.id === product.id && item.size === selectedSize
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      setItems(prev => {
        const updated = [...prev];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      });
    } else {
      // Add new item
      const newItem = {
        id: product.id,
        name: product.name,
        size: `Men's US ${selectedSize}`,
        price: product.price,
        quantity: quantity,
        bg: product.bg,
        collection: product.collection,
      };
      setItems(prev => [...prev, newItem]);
    }
  };

  const updateQuantity = (itemId, delta) => {
    setItems(prev => 
      prev.map(item => 
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const value = {
    items,
    cartCount,
    subtotal,
    shipping,
    total,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
