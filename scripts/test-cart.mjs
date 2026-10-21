// Sanity checks for the pure cart helpers. Run with: npm test
import assert from 'node:assert/strict';
import {
  addItem,
  removeItem,
  removeLine,
  countItems,
  cartTotal,
  isValidVoucher,
  applyDiscount,
} from '../src/utils/cart.js';

const earbuds = { id: 'p1', productName: 'Earbuds', description: '', price: 1499 };
const watch = { id: 'p2', productName: 'Watch', description: '', price: 2999 };

let cart = [];
cart = addItem(cart, earbuds);
cart = addItem(cart, earbuds);
cart = addItem(cart, watch);
assert.equal(cart.length, 2, 'two distinct lines');
assert.equal(countItems(cart), 3, 'three units');
assert.equal(cartTotal(cart), 1499 * 2 + 2999);

const before = cart;
cart = removeItem(cart, 'p1');
assert.notEqual(cart, before, 'returns a new array (immutable)');
assert.equal(before[0].qty, 2, 'original not mutated');
assert.equal(countItems(cart), 2);

cart = removeItem(cart, 'p1');
assert.equal(cart.find((i) => i.id === 'p1'), undefined, 'line dropped at qty 0');

cart = removeLine(addItem(addItem(cart, earbuds), earbuds), 'p1');
assert.equal(countItems(cart), 1, 'removeLine drops all units');

assert.ok(isValidVoucher('discount10'));
assert.ok(isValidVoucher('  DISCOUNT10 '));
assert.ok(!isValidVoucher('discount20'));
assert.equal(applyDiscount(1000), 900);
assert.equal(applyDiscount(1499), 1349.1);

console.log('All cart checks passed ✔');
