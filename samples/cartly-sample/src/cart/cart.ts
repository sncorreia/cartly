import { createCartContext } from "cartly";
import type { CartItem } from "../types/types";

export const { CartProvider, useCart } = createCartContext<CartItem>();
