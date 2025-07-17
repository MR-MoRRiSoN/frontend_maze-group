// types/product.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string | undefined>; // Allow undefined values
  applications: string[];
  certifications: string[];
  dimensions: string;
}