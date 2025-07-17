// lib/data/products.ts - Updated with proper typing
import { Product } from "@/types/product";

// Import all language versions
import enProducts from "@/json/products/en.json";
import geProducts from "@/json/products/ge.json";
import ruProducts from "@/json/products/ru.json";

// Create a mapping of locale to products with proper type assertion
const productsMap: Record<string, Product[]> = {
  en: enProducts as Product[],
  ge: geProducts as Product[],
  ru: ruProducts as Product[],
};

// Function to get products by locale
export const getProductsByLocale = (locale: string): Product[] => {
  return productsMap[locale] || productsMap.en; // fallback to English
};

// Default export for backward compatibility
export const products: Product[] = enProducts as Product[];
