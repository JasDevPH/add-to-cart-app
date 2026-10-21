import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Custom hook: components call useCart() instead of useContext(CartContext),
// and get a clear error if they are rendered outside <CartProvider>.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
}
