"use client";
import React, { useMemo, use } from "react";
import { getProductsByLocale } from "@/lib/data/products";
import { ProductDetailClient } from "./ProductDetailClient";
import { useLocale } from "next-intl";

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { id } = use(params); // Unwrap the Promise using React.use()
  const locale = useLocale();
  const products = useMemo(() => getProductsByLocale(locale), [locale]);
  const product = products.find((p) => p.id === parseInt(id));

  return <ProductDetailClient product={product} productId={id} />;
}
