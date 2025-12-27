import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types/product";
import { Images } from "@/components/constants";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onGetQuote: (product: Product) => void;
  animationDelay?: number;
  isVisible?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onGetQuote,
  animationDelay = 0,
  isVisible = true,
  className,
}) => {
  const t = useTranslations();

  const getProductImage = (prodImageName: string) => {
    switch (prodImageName) {
      case "balsan":
        return Images.Balsen;
      case "lgCommercial":
        return Images.LgComercial;
      case "lgDigital":
        return Images.LgDigital;
      case "surglasses":
        return Images.Surglasses;
      case "eastonhk":
        return Images.Eastonhk;
      case "rak_ceramics":
        return Images.RakCeramics;
      default:
        console.error("NoProdFound");
        return Images.Balsen; // fallback image
    }
  };

  return (
    <Card
      className={`${className} cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-105 flex flex-col h-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Image container with Next.js Image */}
      <div className="relative min-h-48 max-h-64 bg-gray-50 overflow-hidden rounded-2xl">
        <Image
          src={getProductImage(product.image)}
          alt={`${product.name} - ${product.category}`}
          fill
          className="object-fill"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category badge positioned over image */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-gray-200">
            {product.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex-1 flex flex-col justify-center mb-4">
          <h3 className="font-bold text-gray-900 text-2xl mb-2">
            {product.name}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onGetQuote(product);
            }}
            size="sm"
          >
            {t("productCard.getQuote")}
          </Button>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            size="sm"
          >
            {t("productCard.viewDetails")}
          </Button>
        </div>
      </div>
    </Card>
  );
};
