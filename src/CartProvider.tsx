import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartContextType, CartItem, CartStorage } from "./types";
import { safeReadJSON } from "./storage";

/** Props for the CartProvider component */
type Props = {
  /** Child components that will have access to the cart context */
  children: React.ReactNode;
  /** Key used for persisting cart data in storage (default: "cart") */
  storageKey?: string;
  /** Storage mechanism for cart persistence (default: localStorage) */
  storage?: CartStorage;
};

/**
 * Factory function that creates a typed cart context and its associated hooks/providers.
 * This pattern allows for type-safe cart items with custom properties.
 *
 * @template T - The type of items in the cart, must have an `id` property
 * @returns An object containing the CartProvider component and useCart hook
 *
 * @example
 * ```tsx
 * type Product = { id: string; name: string; price: number };
 * const { CartProvider, useCart } = createCartContext<Product>();
 * ```
 */
export function createCartContext<T extends { id: string | number }>() {
  const CartContext = createContext<CartContextType<T> | undefined>(undefined);

  /**
   * Provider component that manages cart state and provides cart operations to children.
   * Automatically persists cart data to the specified storage on changes.
   */
  function CartProvider({
    children,
    storageKey = "cart",
    storage = localStorage,
  }: Props) {
    // Initialize cart state from storage, falling back to empty array
    const [cartItems, setCartItems] = useState<CartItem<T>[]>(() =>
      safeReadJSON<CartItem<T>[]>(storage, storageKey, []),
    );

    // Persist cart to storage whenever it changes
    useEffect(() => {
      storage.setItem(storageKey, JSON.stringify(cartItems));
    }, [cartItems, storage, storageKey]);

    /**
     * Adds an item to the cart or increments its quantity if it already exists.
     * @param item - The item to add to the cart
     * @param quantity - Number of items to add (default: 1)
     */
    const addItemToCart = (item: T, quantity: number = 1) => {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id == item.id);
        if (existing) {
          // Item exists: increment quantity
          return prev.map((i) =>
            i.id == item.id ? { ...i, quantity: i.quantity + quantity } : i,
          );
        }
        // Item doesn't exist: add new entry
        return [...prev, { ...item, quantity }];
      });
    };

    /**
     * Updates the quantity of an item in the cart.
     * If quantity is set to 0 or less, the item is removed from the cart.
     * @param id - The unique identifier of the item to update
     * @param quantity - The new quantity for the item
     */
    const updateItemQuantity = (id: string | number, quantity: number) => {
      setCartItems((prev) =>
        prev
          .map((i) => (i.id == id ? { ...i, quantity } : i))
          .filter((i) => i.quantity > 0),
      );
    };

    /**
     * Removes an item completely from the cart.
     * @param id - The unique identifier of the item to remove
     */
    const removeItemFromCart = (id: string | number) => {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    /**
     * Clears all items from the cart.
     */
    const clearCart = () => {
      setCartItems([]);
    };

    // Memoized total count of all items in the cart
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

  /**
   * Hook to access the cart context.
   * Must be used within a CartProvider component.
   *
   * @throws Error if used outside of a CartProvider
   * @returns The cart context containing items and cart operations
   */
  function useCart() {
    const context = useContext(CartContext);
    if (!context)
      throw new Error("useCart must be used within a CartProvider.");
    return context;
  }

  return { CartProvider, useCart };
}
