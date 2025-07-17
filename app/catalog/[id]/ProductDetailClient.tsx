"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ProductDetailPage } from "@/components/pages/ProductDetailPage";
import { useWhatsApp } from "@/lib/hooks/useWhatsApp";
import { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product | undefined;
  productId: string;
}

export function ProductDetailClient({
  product,
  productId,
}: ProductDetailClientProps) {
  const router = useRouter();
  const whatsapp = useWhatsApp();

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-[#032685] text-white px-6 py-3 rounded-lg hover:bg-[#021d5a] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleContact = (product: Product) => {
    whatsapp.setProductMessage(product.name);
    router.push("/#contact");
  };

  const handleSectionClick = (sectionId: string) => {
    router.push(`/#${sectionId}`);
  };

  return (
    <ProductDetailPage
      product={product}
      onBack={handleBack}
      onContact={handleContact}
      onSectionClick={handleSectionClick}
    />
  );
}
