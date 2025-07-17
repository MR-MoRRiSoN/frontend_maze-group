import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Product } from "@/types/product";

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
  return (
    <Card
      className={`${className} cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
      //onClick={() => onViewDetails(product)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover rounded-2xl"
        />
        {/* Category badge positioned over image */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-gray-200">
            {product.category}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 text-2xl mb-2">
            {product.name}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onGetQuote(product);
            }}
            size="sm"
          >
            Get Quote
          </Button>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            size="sm"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
