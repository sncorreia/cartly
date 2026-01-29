# Cartly Sample App 🛒

This is a **sample React application** demonstrating how to use **cartly**, a lightweight, type-safe React Cart Context library built with modern hooks.

The goal of this sample is to show **real-world usage** of `cartly` with:

- React + TypeScript
- Vite
- Material UI
- A Navbar + Cart Drawer UX pattern
- Placeholder product data (no API required)

> ⚠️ This sample app is **not published to npm**.  
> It exists only as a usage example for the `cartly` library.

## ✨ What This Sample Demonstrates

- Creating a **typed cart context** using `createCartContext<T>()`
- Exporting a **single CartProvider + useCart hook** for the entire app
- Integrating cart state with a **Material UI Navbar + Drawer**
- Adding items to the cart from a product grid
- Updating quantities and removing items
- Persisting cart state using `localStorage`
- Clean separation between **UI state** (Drawer open/close) and **cart state**

## 🧱 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Material UI (MUI)**
- **cartly**

## 🚀 Getting Started

From the repository root:

```bash
cd samples/cartly-sample
npm install
npm run dev
```

The app will be available at:

```bash
http://localhost:5173
```

## 🧩 Cart Context Setup and Type Definition

The cart context is created once and reused throughout the app. Here, it is set up inside src/cart/cart.ts.

```TypeScript
import { createCartContext } from "cartly";
import type { CartItem } from "../types/types";

export const { CartProvider, useCart } = createCartContext<CartItem>();

```

This file is then imported wherever the cart is needed.

You need to define your Type before creating the cart context.

## 🏗️ Application Structure

```Plain Text
src/
├── cart/
│   └── cart.ts           # createCartContext<Product>()
├── components/
│   ├── Navbar.tsx
│   ├── CartDrawer.tsx
│   ├── ItemCard.tsx
│   └── ItemList.tsx
├── types/
│   └── types.ts          # Types definition
├── App.tsx
└── main.tsx              # Wrap your <App> component
```

## 🧭 Material UI Pattern Used

This sample follows the recommended MUI pattern:

- Navbar owns Drawer state
- Drawer is a controlled component (open, onClose)
- Cart state comes from useCart()

## 🧪 Placeholder Data

This sample uses static placeholder data instead of an API to keep the example simple and focused on cart behavior.
You can find it in:

```Plain Text
src/components/ItemList.tsx
```

## 🔍 Why This Sample Exists

- Show best practices for integrating cartly
- Provide a copy‑paste‑friendly reference
- Demonstrate a realistic UI flow
- Avoid overloading the main library README

## 📦 About cartly

If you’re looking for the library itself, see the main README at the root of the repository:
👉 https://github.com/sncorreia/cartly

## 📝 License

MIT © Sérgio Correia
