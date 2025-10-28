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
  const filteredProducts = (() => {
    console.log("Filtering products with catalogFilter:", catalogFilter);

    // First, apply category and search filters
    const filtered = products.filter((product) => {
      const matchesCategory =
        catalogFilter === "all" || product.category === catalogFilter;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    console.log("Filtered products:", filtered.length);

    // If "all" is selected, mix products from different categories
    if (catalogFilter === "all") {
      // Group products by category
      const byCategory = filtered.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {} as Record<string, typeof filtered>);

      console.log("Categories found:", Object.keys(byCategory));
      console.log(
        "Products per category:",
        Object.keys(byCategory).map(
          (cat) => `${cat}: ${byCategory[cat].length}`
        )
      );

      // Mix products: take one from each category in round-robin fashion
      const categories = Object.keys(byCategory);

      if (categories.length === 0) {
        return filtered;
      }

      if (categories.length === 1) {
        console.log("Only one category, returning as-is");
        return filtered;
      }

      const mixed = [];
      const maxLength = Math.max(
        ...categories.map((cat) => byCategory[cat].length)
      );

      console.log("Max length:", maxLength);

      for (let i = 0; i < maxLength; i++) {
        for (const category of categories) {
          if (byCategory[category] && byCategory[category][i]) {
            mixed.push(byCategory[category][i]);
            console.log(
              `Adding: ${byCategory[category][i].name} from ${category}`
            );
          }
        }
      }

      console.log("Mixed products count:", mixed.length);
      console.log(
        "First 5 mixed products:",
        mixed.slice(0, 5).map((p) => `${p.name} (${p.category})`)
      );
      return mixed;
    }

    return filtered;
  })();

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
      minHeight="350px"
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
