import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { cartApi } from '../services/gameStoreApi.js';

const CartContext = createContext(null);

function normalizeItems(cart) {
  if (Array.isArray(cart)) return cart;
  return cart?.items ?? cart?.cartItems ?? [];
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return null;
    }

    setLoading(true);
    setError('');

    try {
      const result = await cartApi.getCart();
      setCart(result);
      return result;
    } catch (caughtError) {
      setError(caughtError.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addToCart = useCallback(async (gameId, quantity = 1) => {
    await cartApi.addItem(gameId, quantity);
    return refreshCart();
  }, [refreshCart]);

  const updateCartItem = useCallback(async (gameId, quantity) => {
    await cartApi.updateItem(gameId, quantity);
    return refreshCart();
  }, [refreshCart]);

  const removeCartItem = useCallback(async (gameId) => {
    await cartApi.removeItem(gameId);
    return refreshCart();
  }, [refreshCart]);

  const clearCart = useCallback(async () => {
    await cartApi.clear();
    setCart(null);
  }, []);

  const items = normalizeItems(cart);
  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + Number(item.quantity ?? 1), 0);
    const total = items.reduce((sum, item) => {
      const price = Number(item.unitPrice ?? item.price ?? item.game?.price ?? 0);
      return sum + price * Number(item.quantity ?? 1);
    }, 0);

    return { itemCount, total };
  }, [items]);

  const value = useMemo(() => ({
    cart,
    items,
    loading,
    error,
    ...totals,
    refreshCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    setCart,
  }), [cart, items, loading, error, totals, refreshCart, addToCart, updateCartItem, removeCartItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
