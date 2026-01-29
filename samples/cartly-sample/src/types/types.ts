// Tcg item type
export type TcgSet = {
  id: string; // Guid
  name: string;
  code: string;
  franchise: "Pokemon" | "MagicTheGathering" | "Yugioh"; // if you already enforce enum on backend
  releaseDate: string; // ISO-8601 date string
  price: number;
  inStock: boolean;
  quantityInStock: number;
  imageUrl: string;
  shortDescription: string;
  imageAltText: string;
};

// Cart item type
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  imageAltText?: string;
};
