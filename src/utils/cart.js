// Pure cart helpers. They never mutate their input; they always return a new
// array so React detects the change and re-renders.

export const VOUCHER_CODE = 'discount10';
export const VOUCHER_RATE = 0.1;

// Add one unit of a product. If it is already in the cart, bump its quantity.
export function addItem(cart, product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
  }
  return [...cart, { ...product, qty: 1 }];
}

// Remove one unit of a product. When the quantity reaches 0 the line is dropped.
export function removeItem(cart, productId) {
  return cart
    .map((item) => (item.id === productId ? { ...item, qty: item.qty - 1 } : item))
    .filter((item) => item.qty > 0);
}

// Remove the whole line for a product, regardless of quantity.
export function removeLine(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

export function countItems(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Case-insensitive and whitespace-tolerant: " Discount10 " is accepted.
export function isValidVoucher(code) {
  return code.trim().toLowerCase() === VOUCHER_CODE;
}

export function applyDiscount(total, rate = VOUCHER_RATE) {
  // Round to centavos to avoid floating-point noise like 1349.1000000000001.
  return Math.round(total * (1 - rate) * 100) / 100;
}

export function formatPrice(amount) {
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
