/**
 * Represents an item in the cart, extending the base item type with a quantity.
 * @template T - The base item type, must have an `id` property
 */
export type CartItem<T extends { id: string | number }> = T & {
  /** Number of this item in the cart */
  quantity: number;
};

/**
 * The shape of the cart context, providing state and operations for cart management.
 * @template T - The base item type, must have an `id` property
 */
export type CartContextType<T extends { id: string | number }> = {
  /** Array of all items currently in the cart */
  cartItems: CartItem<T>[];
  /** Adds an item to the cart or increments quantity if it already exists */
  addItemToCart: (item: T, quantity?: number) => void;
  /** Updates the quantity of a specific item by its id */
  updateItemQuantity: (id: string | number, quantity: number) => void;
  /** Removes an item completely from the cart by its id */
  removeItemFromCart: (id: string | number) => void;
  /** Clears all items from the cart */
  clearCart: () => void;
  /** Total count of all items in the cart (sum of quantities) */
  cartCount: number;
};

/**
 * A simplified interface for storage objects, focusing on essential methods for cart management.
 *
 * @remarks
 * This type includes only the `getItem`, `setItem`, and `removeItem` methods from the standard Storage interface.
 */
export type CartStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
