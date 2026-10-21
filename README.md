# ShopCart: React Native Add to Cart

A simple Add to Cart app built with **React Native (Expo)**, **React Hooks**, and **NativeWind** (Tailwind CSS for React Native).

📦 **Android APK:** see the [latest release](../../releases/latest)

## Features

| Requirement | Where |
|---|---|
| 6 static products (`productName`, `description`, `price`) | `src/data/products.js` |
| Add to cart / remove one unit / remove whole line | `src/utils/cart.js`, `src/components/CartItem.js` |
| Real-time item count (header badge + cart badge) | `itemCount` in `src/context/CartContext.js` |
| Cart list with product name + price | `src/components/CartSummary.js` |
| Real-time total | `total` (`useMemo`) |
| Voucher `discount10` gives 10% off (case-insensitive) | `applyVoucher`, `discountedTotal` |
| Tailwind styling | `className` props via NativeWind |

## Hooks used

| Hook | Used for |
|---|---|
| `useState` | `cart`, `voucherApplied`, `voucherError` (context) and the voucher text input (`CartSummary`) |
| `useEffect` | Clears the voucher automatically when the cart becomes empty |
| `useMemo` | Derived `itemCount`, `total`, `discountedTotal`, and the context value |
| `useCallback` | Stable `addToCart` / `removeFromCart` / voucher handlers |
| `useContext` | Shares cart state app-wide via `CartContext` |
| Custom hook `useCart()` | Wraps `useContext` and throws if used outside `<CartProvider>` |

## Project structure

```
App.js                     # SafeArea + CartProvider + FlatList (products, cart footer)
src/
  data/products.js         # static catalog
  utils/cart.js            # pure helpers: addItem, removeItem, cartTotal, applyDiscount…
  context/CartContext.js   # CartProvider: state + derived values
  hooks/useCart.js         # custom hook
  components/
    Header.js              # title + live cart badge
    ProductCard.js         # product + “Add to cart”
    CartItem.js            # line item with − / + / Remove
    CartSummary.js         # cart list, voucher input, totals
scripts/test-cart.mjs      # logic checks (npm test)
```

## Run locally

```bash
npm install
npx expo start          # scan the QR with Expo Go, or press "a" for an Android emulator
npm test                # cart logic checks
```

## Build the APK

```bash
npx expo prebuild -p android
cd android && ./gradlew assembleRelease
# → android/app/build/outputs/apk/release/app-release.apk
```

Or in the cloud: `npx eas-cli build -p android --profile preview` (with `"buildType": "apk"` in `eas.json`).
