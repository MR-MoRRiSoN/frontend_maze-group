"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { WhatsAppCard } from "@/components/features/contact/WhatsAppCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProductCard } from "@/components/features/products/ProductCard";
import { useWhatsApp } from "@/lib/hooks/useWhatsApp";
import { scrollToSection } from "@/lib/utils/helpers";
import { products } from "@/lib/data/products";
import { Product } from "@/types/product";

type ViewMode = "grid" | "list";
type SortOption = "name" | "category" | "newest" | "popular";

export default function AllProductsPage() {
  const router = useRouter();
  const whatsapp = useWhatsApp();

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );

  // Get unique categories and applications
  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    []
  );

  const applications = useMemo(
    () => [...new Set(products.flatMap((p) => p.applications || []))],
    []
  );

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.applications &&
          product.applications.some((app) =>
            app.toLowerCase().includes(searchTerm.toLowerCase())
          ));
      const matchesApplications =
        selectedApplications.length === 0 ||
        (product.applications &&
          selectedApplications.some((app) =>
            product.applications?.includes(app)
          ));

      return matchesCategory && matchesSearch && matchesApplications;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "newest":
          return (b.id || 0) - (a.id || 0);
        case "popular":
          return (a.id || 0) - (b.id || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedApplications, sortBy]);

  // Event handlers
  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const handleProductView = (product: Product) => {
    router.push(`/catalog/${product.id}`);
  };

  const handleProductContact = (product: Product) => {
    whatsapp.setProductMessage(product.name);
  };

  const handleBackToHome = () => {
    router.back();
  };

  const handleApplicationToggle = (application: string) => {
    setSelectedApplications((prev) =>
      prev.includes(application)
        ? prev.filter((a) => a !== application)
        : [...prev, application]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedApplications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onSectionClick={handleSectionClick} />

      {/* Header Section - Reduced padding */}
      <section className="bg-white shadow-sm border-b pt-28 pb-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToHome}
                className="flex items-center gap-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  All Products
                </h1>
                <p className="text-sm lg:text-base text-gray-600 mt-1">
                  Discover our complete range of professional solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search Section - Improved layout */}
      <section className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#032685] focus:border-transparent text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-48">
              <select
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#032685] text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="w-full lg:w-48">
              <select
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#032685] text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="newest">Newest First</option>
                <option value="popular">Oldest First</option>
              </select>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="whitespace-nowrap"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel - Simplified layout */}
          {showFilters && (
            <Card className="mt-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Applications Filter */}
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                    Applications
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                    {applications.map((application) => (
                      <label
                        key={application}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedApplications.includes(application)}
                          onChange={() => handleApplicationToggle(application)}
                          className="w-4 h-4 text-[#032685] border-gray-300 rounded focus:ring-[#032685]"
                        />
                        <span className="text-sm text-gray-700 truncate">
                          {application}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {filteredAndSortedProducts.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-gray-500">
                <Filter className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Try adjusting your search criteria or filters
                </p>
                <Button size="sm" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </Card>
          ) : (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" // Even fewer columns
                  : "grid-cols-1 max-w-3xl mx-auto"
              }`}
            >
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleProductView}
                  onGetQuote={handleProductContact}
                  animationDelay={index * 50}
                  isVisible={true}
                  //  compact={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section - Reduced size */}
      <section className="bg-[#032685] text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-xl lg:text-2xl font-bold mb-3">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-base lg:text-lg mb-6 text-blue-100">
            We specialize in custom solutions tailored to your specific needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#032685]"
              onClick={() => whatsapp.setIsOpen(true)}
            >
              Request Custom Solution
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#032685]"
              onClick={handleBackToHome}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      <WhatsAppButton onClick={() => whatsapp.setIsOpen(!whatsapp.isOpen)} />

      <WhatsAppCard
        isOpen={whatsapp.isOpen}
        selectedPhone={whatsapp.selectedPhone}
        setSelectedPhone={whatsapp.setSelectedPhone}
        message={whatsapp.message}
        setMessage={whatsapp.setMessage}
        onSend={whatsapp.sendMessage}
        onClose={() => whatsapp.setIsOpen(false)}
      />
    </div>
  );
}
