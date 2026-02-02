# cartly 🛒

[![npm version](https://img.shields.io/npm/v/cartly.svg)](https://www.npmjs.com/package/cartly)
[![license](https://img.shields.io/npm/l/cartly.svg)](https://github.com/sncorreia/cartly/blob/main/LICENSE)

**cartly** is a lightweight, type-safe React Cart Context library built with modern hooks.  
It’s designed to be **generic**, **framework-agnostic**, and easy to integrate into any React application — from e‑commerce stores to internal tools.

- No external state libraries.
- Strong TypeScript support.
- Optional persistence.
- Safe for SSR.

## ✨ Features

- ✅ Generic `createCartContext<T>()` API
- ✅ `CartProvider` + `useCart` hook
- ✅ Cart actions: add, update, remove, clear
- ✅ Derived state (total item count)
- ✅ Optional persistence (`localStorage`, `sessionStorage`, or disabled)
- ✅ SSR-safe (no `window` access at import time)
- ✅ Works with Material UI, Vite, Next.js, CRA
- ✅ React as peer dependency (no duplicate React issues)

---

## 📦 Installation

```bash
npm install cartly
```

## 📦 Peer Dependencies

```bash
npm install react react-dom
```

## 🚀 Quick Start

### 1. Create a typed cart context (once per app)

```Typescript
import { createCartContext } from "cartly";

export type Product = {
  id: string;
  name: string;
  price: number;
};

export const { CartProvider, useCart } = createCartContext<Product>();
```

✅ This should be done once and re-exported.
Do not call createCartContext in every component.

### 2. Wrap your application

```Typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./cart/cart";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider storageKey="cart" storage={localStorage}>
      <App />
    </CartProvider>
  </StrictMode>,
);
```

### 3. Use the cart anywhere

```Typescript
import { useCart } from "./cart/cart";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItemToCart, cartCount } = useCart();

  return (
    <button onClick={() => addItemToCart(product)}>
      Add to cart ({cartCount})
    </button>
  );
}
```

## 🧠 API

### createCartContext<T>()

Creates a typed cart context for your application.

```TypeScript
const { CartProvider, useCart } = createCartContext<T>();
```

Call this once per app, export the result, and reuse it everywhere.

### &lt;CartProvider&gt;

```TypeScript
<CartProvider  storageKey="cart"  storage={localStorage}>
    {children}
</CartProvider>
```

#### Props

| Prop       | Type           | Required | Description                           |
| ---------- | -------------- | -------- | ------------------------------------- |
| children   | ReactNode      | ✅       | App tree                              |
| storageKey | string         | ❌       | Storage key (default: "cart")         |
| storage    | Storage / null | ❌       | localStorage, sessionStorage, or null |

💡 Pass storage={null} to disable persistence (recommended for SSR/tests).

#### Custom Storage (SSR/Next.js)

For SSR frameworks like Next.js, you can create a custom no-op storage adapter:

```TypeScript
import type { CartStorage } from "cartly";

const noopStorage: CartStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

// Usage
<CartProvider storageKey="cart" storage={noopStorage}>
  {children}
</CartProvider>
```

### useCart()

```TypeScript
const {
  cartItems,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
  cartCount
} = useCart();
```

#### Return Values

| Return               | Type                                               | Description                              |
| -------------------- | -------------------------------------------------- | ---------------------------------------- |
| `cartItems`          | `CartItem<T>[]`                                    | Current cart items                       |
| `addItemToCart`      | `(item: T) => void`                                | Add item (increments quantity if exists) |
| `updateItemQuantity` | `(id: string \| number, quantity: number) => void` | Set item quantity                        |
| `removeItemFromCart` | `(id: string \| number) => void`                   | Remove item from cart                    |
| `clearCart`          | `() => void`                                       | Empty the cart                           |
| `cartCount`          | `number`                                           | Total quantity of all items              |

### 🧾 Cart Item Shape

```TypeScript
export type CartItem<T> = {
  id: string | number;
  item: T;
  quantity: number;
};
```

This avoids collisions if your product model already contains a quantity field.

## 📁 Repository Structure

```Plain Text
cartly/
├─ src/                # Library source
├─ samples/            # Example apps
│  └─ react-vite-demo/
├─ dist/               # Build output (npm only)
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ README.md
└─ LICENSE
```

## 📄 License

MIT

## ❓ FAQ

### Why is my cart empty on page refresh?

Make sure you're passing the correct `storageKey` and `storage` props to `CartProvider`. If `storage` is `null` or not provided, persistence is disabled.

### How do I use this with Next.js or other SSR frameworks?

Use `storage={null}` to disable persistence during SSR, or provide a custom storage adapter (see [Custom Storage](#custom-storage-ssrnextjs) section above).

### Can I have multiple carts in the same app?

Yes! Call `createCartContext<T>()` multiple times with different types and use separate providers:

```TypeScript
export const { CartProvider: ProductCartProvider, useCart: useProductCart } = createCartContext<Product>();
export const { CartProvider: WishlistProvider, useCart: useWishlist } = createCartContext<WishlistItem>();
```

### Why does my item quantity not update?

Ensure your item has a unique `id` property. The cart uses `id` to identify and update items.

## 🤝 Contributing

Issues and PRs are welcome.
The library intentionally keeps a small, focused API surface.

Built with React, TypeScript, and Vite.
