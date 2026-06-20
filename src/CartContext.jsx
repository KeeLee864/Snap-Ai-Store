import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('snap-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('snap-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (product, quantity = 1, upsell = null) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem = { ...product, quantity, upsell: upsell || null };
      return [...prev, newItem];
    });
    setCartOpen(true);
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) { removeItem(id); return; }
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const addUpsell = (id, upsell) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, upsell } : item
    ));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity + (item.upsell ? item.upsell.price : 0), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 49;
  const shippingProgress = Math.min(subtotal / freeShippingThreshold * 100, 100);
  const freeShippingEarned = subtotal >= freeShippingThreshold;

  return (
    <CartContext.Provider value={{
      cart, cartOpen, setCartOpen,
      addItem, removeItem, updateQuantity, addUpsell, clearCart,
      subtotal, itemCount, freeShippingThreshold, shippingProgress, freeShippingEarned,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);