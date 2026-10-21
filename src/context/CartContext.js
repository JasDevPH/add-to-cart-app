import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  addItem,
  removeItem,
  removeLine,
  countItems,
  cartTotal,
  isValidVoucher,
  applyDiscount,
  VOUCHER_CODE,
  VOUCHER_RATE,
} from '../utils/cart';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  // useState: the source of truth for the cart and the voucher.
  const [cart, setCart] = useState([]);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherError, setVoucherError] = useState('');

  // Functional updates (prev => next) so rapid taps never use a stale cart.
  const addToCart = useCallback((product) => {
    setCart((prev) => addItem(prev, product));
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => removeItem(prev, productId));
  }, []);

  const removeAllOf = useCallback((productId) => {
    setCart((prev) => removeLine(prev, productId));
  }, []);

  const applyVoucher = useCallback((code) => {
    if (isValidVoucher(code)) {
      setVoucherApplied(true);
      setVoucherError('');
      return true;
    }
    setVoucherApplied(false);
    setVoucherError('Invalid voucher code');
    return false;
  }, []);

  const clearVoucher = useCallback(() => {
    setVoucherApplied(false);
    setVoucherError('');
  }, []);

  // useMemo: derived values are recalculated only when `cart` / voucher changes.
  const itemCount = useMemo(() => countItems(cart), [cart]);
  const total = useMemo(() => cartTotal(cart), [cart]);
  const discountedTotal = useMemo(
    () => (voucherApplied ? applyDiscount(total) : total),
    [total, voucherApplied]
  );

  // useEffect: side effect that reacts to cart changes.
  // An empty cart has nothing to discount, so drop the voucher.
  useEffect(() => {
    if (cart.length === 0) {
      setVoucherApplied(false);
      setVoucherError('');
    }
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      total,
      discountedTotal,
      voucherCode: VOUCHER_CODE,
      discountRate: VOUCHER_RATE,
      voucherApplied,
      voucherError,
      addToCart,
      removeFromCart,
      removeAllOf,
      applyVoucher,
      clearVoucher,
    }),
    [
      cart,
      itemCount,
      total,
      discountedTotal,
      voucherApplied,
      voucherError,
      addToCart,
      removeFromCart,
      removeAllOf,
      applyVoucher,
      clearVoucher,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
