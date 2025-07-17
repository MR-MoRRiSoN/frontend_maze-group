import React from "react";
import { products } from "@/lib/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

// Server-side function to generate static params
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  // Unwrap the params Promise
  const { id } = await params;

  // Find the product by ID
  const product = products.find((p) => p.id === parseInt(id));

  // Pass the product data to the client component
  return <ProductDetailClient product={product} productId={id} />;
}
