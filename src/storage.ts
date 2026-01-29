import { CartStorage } from "./types";

/**
 * Safely read JSON from storage, returning a fallback value if parsing fails or if the item does not exist
 *
 * @remarks
 * This function attempts to read a JSON string from the provided storage using the specified key.
 *
 * @param storage - The storage object to read from.
 * @param key - The key to read the JSON string from.
 * @param fallback - The fallback value to return if parsing fails or the item does not exist.
 * @returns The parsed JSON value or the fallback value.
 */
export function safeReadJSON<T>(
  storage: CartStorage,
  key: string,
  fallback: T,
): T {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.log(error);
    storage.removeItem(key);
    return fallback;
  }
}
