import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScrollableCardsSection } from "./ScrollableCardsSectionProps";
import { ProductCard } from "@/components/features/products/ProductCard";
import { Product } from "@/types/product";
import { useTranslations } from "next-intl";

interface CatalogSectionProps {
  products: Product[];
  isVisible: boolean;
  onProductView: (product: Product) => void;
  onProductContact: (product: Product) => void;
  onRequestCustomSolution: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  isVisible,
  onProductView,
  onProductContact,
  onRequestCustomSolution,
}) => {
  const router = useRouter();
  const t = useTranslations("catalog");
  const [catalogFilter, setCatalogFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      catalogFilter === "all" || product.category === catalogFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const handleViewAllProducts = () => {
    router.push("/all-product");
  };

  const renderProductCard = (
    product: Product,
    index: number,
    isVisible: boolean,
    animationDelay: number
  ) => (
    <ProductCard
      product={product}
      onViewDetails={onProductView}
      onGetQuote={onProductContact}
      animationDelay={animationDelay}
      isVisible={isVisible}
      className="h-full flex flex-col"
    />
  );

  const renderFilters = () => (
    <Card className="mb-8 sm:mb-12 lg:mb-16 mt-5" padding="lg">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#032685] focus:border-transparent text-sm sm:text-base lg:text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="order-2 lg:order-none">
          <select
            className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#032685] text-sm sm:text-base lg:text-lg font-semibold"
            value={catalogFilter}
            onChange={(e) => setCatalogFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? t("allCategories") : category}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Filters Button */}
        <div className="order-1 lg:order-none">
          <Button className="w-full" size="lg">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            <span className="hidden sm:inline">{t("advanced")} </span>
            {t("filters")}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <ScrollableCardsSection
      id="catalog"
      title={t("title")}
      subtitle={t("subtitle")}
      items={filteredProducts}
      isVisible={isVisible}
      backgroundColor="bg-white"
      gradientColors={{ from: "from-white", to: "to-transparent" }}
      minHeight="500px"
      renderCard={renderProductCard}
      renderFilters={renderFilters}
      primaryButton={{
        text: t("requestCustomSolution"),
        onClick: onRequestCustomSolution,
      }}
      secondaryButton={{
        text: t("viewAllProducts"),
        onClick: handleViewAllProducts,
      }}
      className="py-16 sm:py-20 lg:py-32"
    />
  );
};
