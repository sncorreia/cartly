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
