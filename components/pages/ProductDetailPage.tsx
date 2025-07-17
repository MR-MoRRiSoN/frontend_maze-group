// components/pages/ProductDetailPage.tsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useImageCarousel } from "@/lib/hooks/useImageCarousel";
import { Product } from "@/types/product";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onContact: (product: Product) => void;
  onSectionClick: (sectionId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onContact,
  onSectionClick,
}) => {
  const { currentImageIndex, goToImage } = useImageCarousel(
    product.images,
    false
  );

  // Auto-scroll functionality
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrollEnabled || product.images.length <= 1) return;

    const interval = setInterval(() => {
      goToImage((currentImageIndex + 1) % product.images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [
    currentImageIndex,
    isAutoScrollEnabled,
    product.images.length,
    goToImage,
  ]);

  // Handle image click to open modal
  const handleImageClick = (index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
    setIsAutoScrollEnabled(false); // Pause auto-scroll when modal opens
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setIsAutoScrollEnabled(true); // Resume auto-scroll when modal closes
  };

  // Navigate in modal
  const navigateModal = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setModalImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    } else {
      setModalImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-[#032685] hover:text-[#021d5a] font-semibold text-base sm:text-lg mb-2 sm:mb-0 sm:mr-6"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Back to Catalog
            </button>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="sm:ml-6 text-gray-600 text-sm sm:text-base">
              Product Details
            </span>
          </div>

          {/* Product Detail */}
          <Card className="overflow-hidden" padding="sm">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                {/* Product Images */}
                <div>
                  <div className="relative mb-4 sm:mb-6">
                    <img
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => handleImageClick(currentImageIndex)}
                    />

                    {/* Auto-scroll toggle */}
                    {product.images.length > 1 && (
                      <button
                        onClick={() =>
                          setIsAutoScrollEnabled(!isAutoScrollEnabled)
                        }
                        className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-black/70 transition-colors"
                      >
                        {isAutoScrollEnabled ? "Pause" : "Play"}
                      </button>
                    )}

                    {/* Image Navigation Dots */}
                    {product.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {product.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              goToImage(index);
                              setIsAutoScrollEnabled(false);
                              setTimeout(
                                () => setIsAutoScrollEnabled(true),
                                5000
                              );
                            }}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? "bg-[#032685]"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Grid */}
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            goToImage(index);
                            setIsAutoScrollEnabled(false);
                            setTimeout(
                              () => setIsAutoScrollEnabled(true),
                              5000
                            );
                          }}
                          className={`relative rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${
                            index === currentImageIndex
                              ? "ring-2 ring-[#032685]"
                              : ""
                          }`}
                        >
                          <img
                            src={image}
                            alt=""
                            className="w-full h-16 sm:h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-6 lg:mt-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-0">
                      {product.name}
                    </h1>
                    <span className="bg-[#e6f2ff] text-[#032685] px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-bold text-sm sm:text-base lg:text-lg self-start">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-gray-700 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mb-6 sm:mb-8">
                    <span className="text-2xl sm:text-3xl font-bold text-[#032685]">
                      {product.price}
                    </span>
                  </div>

                  {/* Applications */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Ideal Applications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {product.applications.map((app, index) => (
                        <div key={index} className="flex items-center">
                          <ChevronRight className="w-4 h-4 text-[#032685] mr-2 flex-shrink-0" />
                          <span className="text-gray-700 text-sm sm:text-base">
                            {app}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Certifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full font-semibold text-xs sm:text-sm"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 sm:space-y-4">
                    <Button
                      size="lg"
                      className="w-full text-sm sm:text-base"
                      onClick={() => onContact(product)}
                    >
                      Request Quote & Information
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full text-sm sm:text-base"
                      onClick={() => onSectionClick("contact")}
                    >
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="border-t border-gray-200 pt-8 sm:pt-12 mt-8 sm:mt-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Technical Specifications
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {Object.entries(product.specs).map(([category, details]) => (
                    <div
                      key={category}
                      className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 capitalize">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {details}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Product Dimensions */}
                <div className="mt-6 sm:mt-8 bg-[#e6f2ff] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#032685] mb-2 sm:mb-3">
                    Dimensions
                  </h3>
                  <p className="text-[#032685] text-sm sm:text-base">
                    {product.dimensions}
                  </p>
                </div>
              </div>

              {/* Additional Product Information */}
              <div className="border-t border-gray-200 pt-8 sm:pt-12 mt-8 sm:mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Key Features */}
                  <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {Object.values(product.specs)
                        .slice(0, 4)
                        .map((spec, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-blue-800 text-xs sm:text-sm">
                              {spec.split(",")[0]}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Use Cases */}
                  <div className="bg-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-3 sm:mb-4">
                      Primary Use Cases
                    </h3>
                    <ul className="space-y-2">
                      {product.applications.map((app, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-purple-800 text-xs sm:text-sm">
                            {app}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quality Assurance */}
                  <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:col-span-2 lg:col-span-1">
                    <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3 sm:mb-4">
                      Quality Assurance
                    </h3>
                    <div className="space-y-3">
                      {product.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-green-800 font-semibold text-xs sm:text-sm">
                            {cert} Certified
                          </span>
                        </div>
                      ))}
                      <div className="mt-4 pt-3 border-t border-green-200">
                        <span className="text-green-700 text-xs sm:text-sm font-medium">
                          Professional Grade Equipment
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support & Warranty */}
              <div className="border-t border-gray-200 pt-8 sm:pt-12 mt-8 sm:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="bg-orange-50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-orange-900 mb-3 sm:mb-4">
                      Support & Warranty
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Extended warranty coverage",
                        "24/7 technical support",
                        "Professional installation",
                        "Training and documentation",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mr-3 flex-shrink-0" />
                          <span className="text-orange-800 text-sm sm:text-base">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Why Choose This Product?
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Enterprise-grade reliability",
                        "Competitive pricing",
                        "Fast deployment",
                        "Proven performance",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-[#032685] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm sm:text-base">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="border-t border-gray-200 pt-8 sm:pt-12 mt-8 sm:mt-12 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Ready to Get Started?
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Contact our experts for a personalized quote and consultation
                  on how this product can enhance your business operations.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button
                    size="xl"
                    onClick={() => onContact(product)}
                    className="w-full sm:w-auto"
                  >
                    Get Custom Quote
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    onClick={() => onSectionClick("contact")}
                    className="w-full sm:w-auto"
                  >
                    Speak with Expert
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            {product.images.length > 1 && (
              <button
                onClick={() => navigateModal("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {product.images.length > 1 && (
              <button
                onClick={() => navigateModal("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Modal Image */}
            <img
              src={product.images[modalImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Image Counter */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {modalImageIndex + 1} / {product.images.length}
              </div>
            )}

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-md overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setModalImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden ${
                      index === modalImageIndex ? "ring-2 ring-white" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
