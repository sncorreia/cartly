# cartly 🛒

**cartly** is a lightweight, type-safe React Cart Context library built with modern hooks.  
It’s designed to be **generic**, **framework-agnostic**, and easy to integrate into any React application — from e‑commerce stores to internal tools.

- No external state libraries.
- Strong TypeScript support.
- Optional persistence.
- Safe for SSR.

---

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
