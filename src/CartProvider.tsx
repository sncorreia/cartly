import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartContextType, CartItem, CartStorage } from "./types";
import { safeReadJSON } from "./storage";

type Props = {
  children: React.ReactNode;
  storageKey?: string;
  storage?: CartStorage;
};

export function createCartContext<T extends { id: string | number }>() {
  const CartContext = createContext<CartContextType<T> | undefined>(undefined);

  function CartProvider({
    children,
    storageKey = "cart",
    storage = localStorage,
  }: Props) {
    const [cartItems, setCartItems] = useState<CartItem<T>[]>(() =>
      safeReadJSON<CartItem<T>[]>(storage, storageKey, []),
    );

    useEffect(() => {
      storage.setItem(storageKey, JSON.stringify(cartItems));
    }, [cartItems, storage, storageKey]);

    const addItemToCart = (item: T, quantity: number = 1) => {
      setCartItems((prev) => {
        // Check if the item exists
        const existing = prev.find((i) => i.id == item.id);
        // If it exists, increment by the quantity passed
        if (existing) {
          return prev.map((i) =>
            i.id == item.id ? { ...i, quantity: i.quantity + quantity } : i,
          );
        }
        // If it does not exist, add the new item to the List
        return [...prev, { ...item, quantity }];
      });
    };

    const updateItemQuantity = (id: string | number, quantity: number) => {
      setCartItems((prev) =>
        prev
          .map((i) => (i.id == id ? { ...i, quantity } : i))
          .filter((i) => i.quantity > 0),
      );
    };

    const removeItemFromCart = (id: string | number) => {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    const clearCart = () => {
      setCartItems([]);
    };

    const cartCount = useMemo(
      () => cartItems.reduce((acc, i) => acc + i.quantity, 0),
      [cartItems],
    );

    const value: CartContextType<T> = {
      cartItems,
      addItemToCart,
      updateItemQuantity,
      removeItemFromCart,
      clearCart,
      cartCount,
    };

    return (
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
  }

  function useCart() {
    const context = useContext(CartContext);
    if (!context)
      throw new Error("useCart must be used within a CartProvider.");
    return context;
  }

  return { CartProvider, useCart };
}
