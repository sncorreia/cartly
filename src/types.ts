export type CartItem<T extends { id: string | number }> = T & {
  quantity: number;
};

export type CartContextType<T extends { id: string | number }> = {
  cartItems: CartItem<T>[];
  addItemToCart: (item: T, quantity?: number) => void;
  updateItemQuantity: (id: string | number, quantity: number) => void;
  removeItemFromCart: (id: string | number) => void;
  clearCart: () => void;
  cartCount: number;
};

/**
 * A simplified interface for storage objects, focusing on essential methods for cart management.
 *
 * @remarks
 * This type includes only the `getItem`, `setItem`, and `removeItem` methods from the standard Storage interface.
 */
export type CartStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
