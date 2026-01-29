import { createCartContext } from "cartly";
import type { TcgSet } from "../types/types";

export const { CartProvider, useCart } = createCartContext<TcgSet>();
