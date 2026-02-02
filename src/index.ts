/**
 * Cartly - Generic, type-safe Cart Context & hooks for React
 *
 * @packageDocumentation
 */

// Main factory function to create a typed cart context and provider
export { createCartContext } from "./CartProvider";

// Type exports for consumers to use in their applications
export type { CartContextType, CartItem, CartStorage } from "./types";
