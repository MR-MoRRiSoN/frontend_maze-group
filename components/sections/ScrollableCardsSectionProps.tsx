import React, { useState, useRef, useEffect, ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ScrollableCardsSectionProps<T> {
  id: string;
  title: string;
  subtitle: string;
  items: T[];
  isVisible: boolean;
  backgroundColor?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
  minHeight?: string;
  renderCard: (
    item: T,
    index: number,
    isVisible: boolean,
    animationDelay: number
  ) => ReactNode;
  renderFilters?: () => ReactNode;
  primaryButton: {
    text: string;
    onClick: () => void;
  };
  secondaryButton: {
    text: string;
    onClick: () => void;
  };
  seeAllCard?: {
    enabled: boolean;
    title: string;
    subtitle: string;
    onClick: () => void;
  };
  className?: string;
}

export function ScrollableCardsSection<T extends { id: string | number }>({
  id,
  title,
  subtitle,
  items,
  isVisible,
  backgroundColor = "bg-gray-50",
  gradientColors = { from: "from-gray-50", to: "to-transparent" },
  minHeight = "400px",
  renderCard,
  renderFilters,
  primaryButton,
  secondaryButton,
  seeAllCard,
  className = "",
}: ScrollableCardsSectionProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Add "See All" card to items if enabled
  const displayItems = seeAllCard?.enabled
    ? [...items, { id: -1 } as T]
    : items;

  const shouldShowNavigation = isClient && displayItems.length > itemsPerPage;

  useEffect(() => {
    setIsClient(true);

    const getItemsPerPage = () => {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };

    const checkIsDesktop = () => {
      return window.innerWidth >= 1024;
    };

    const newItemsPerPage = getItemsPerPage();
    setItemsPerPage(newItemsPerPage);
    setIsDesktop(checkIsDesktop());

    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      setItemsPerPage(newItemsPerPage);
      setIsDesktop(checkIsDesktop());
      setCurrentPage(0); // Reset to first page on resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [displayItems.length]);

  // Update current page based on scroll position
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.children[0]?.clientWidth || 0;
    const gap =
      window.innerWidth >= 1024 ? 48 : window.innerWidth >= 768 ? 32 : 24;
    const cardWithGap = cardWidth + gap;

    if (cardWithGap > 0) {
      const scrollProgress = container.scrollLeft / cardWithGap;
      const newPage = Math.round(scrollProgress);
      setCurrentPage(newPage);
    }
  };

  const scrollToPage = (pageIndex: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.children[0]?.clientWidth || 0;
    const gap =
      window.innerWidth >= 1024 ? 48 : window.innerWidth >= 768 ? 32 : 24;
    const targetScroll = pageIndex * (cardWidth + gap);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    const maxPage = Math.max(0, displayItems.length - itemsPerPage);
    const nextPage = currentPage >= maxPage ? 0 : currentPage + 1;
    scrollToPage(nextPage);
  };

  const handlePrev = () => {
    const maxPage = Math.max(0, displayItems.length - itemsPerPage);
    const prevPage = currentPage <= 0 ? maxPage : currentPage - 1;
    scrollToPage(prevPage);
  };

  const getCardWidthClass = () => {
    if (itemsPerPage === 1) return "w-full";
    if (itemsPerPage === 2) return "w-[calc(50%-1rem)]";
    return "w-[calc(33.333%-1rem)]";
  };

  const getMinHeightClass = () => {
    if (minHeight === "500px") {
      if (itemsPerPage === 1) return "min-h-[500px]";
      if (itemsPerPage === 2) return "min-h-[500px]";
      return "min-h-[500px] lg:min-h-[550px]";
    }
    if (itemsPerPage === 1) return "min-h-[400px]";
    if (itemsPerPage === 2) return "min-h-[400px]";
    return "min-h-[400px] lg:min-h-[450px]";
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 lg:py-32 ${backgroundColor} ${className}`}
      data-section={id}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 px-4 max-w-4xl mx-auto">
            {subtitle}
          </p>
        </div>

        {renderFilters && renderFilters()}

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 lg:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-16 pr-4 md:pr-8 lg:pr-12 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              minHeight,
            }}
            onScroll={handleScroll}
          >
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex-shrink-0 snap-center transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${getCardWidthClass()} ${getMinHeightClass()}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {item.id === -1 && seeAllCard?.enabled ? (
                  <div
                    onClick={seeAllCard.onClick}
                    className="h-full cursor-pointer select-none bg-gradient-to-br from-[#032685] to-[#021d5a] rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-101 p-8"
                  >
                    <div>
                      <div className="relative h-64 rounded-2xl flex items-center justify-center">
                        <ArrowRight className="w-12 h-12 text-white" />
                      </div>
                      <div className="mt-6 text-center">
                        <h3 className="text-xl font-bold text-white mb-3">
                          {seeAllCard.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {seeAllCard.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  renderCard(item, index, isVisible, index * 150)
                )}
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r ${gradientColors.from} ${gradientColors.to} pointer-events-none z-10`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l ${gradientColors.from} ${gradientColors.to} pointer-events-none z-10`}
          />
        </div>

        {/* Navigation */}
        {shouldShowNavigation && (
          <div className="flex items-center justify-center mb-6 md:mb-8 space-x-4 md:space-x-6">
            {isDesktop ? (
              <>
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#e6f2ff] group"
                  aria-label="Previous items"
                >
                  <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#032685] group-hover:text-[#021d5a]" />
                </button>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm">
                    <span className="text-sm font-medium text-[#032685]">
                      {currentPage + 1}
                    </span>
                    <span className="text-xs text-gray-500">/</span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.max(1, displayItems.length - itemsPerPage + 1)}
                    </span>
                  </div>
                  <div className="w-32 md:w-40 lg:w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#032685] rounded-full transition-all duration-300 ease-out"
                      style={{
                        width: `${
                          ((currentPage + 1) /
                            Math.max(1, displayItems.length - itemsPerPage + 1)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#e6f2ff] group"
                  aria-label="Next items"
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#032685] group-hover:text-[#021d5a]" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <span className="text-sm font-medium text-[#032685]">
                  {currentPage + 1}
                </span>
                <span className="text-xs text-gray-500">/</span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.max(1, displayItems.length - itemsPerPage + 1)}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
            <button
              style={{ cursor: "pointer" }}
              onClick={primaryButton.onClick}
              className="w-full sm:w-auto bg-[#032685] text-white px-8 md:px-12 py-3  md:py-4 rounded-xl text-lg md:text-xl font-bold hover:bg-[#021d5a] transition-colors duration-300"
            >
              {primaryButton.text}
            </button>
            <button
              style={{ cursor: "pointer" }}
              onClick={secondaryButton.onClick}
              className="w-full sm:w-auto border-2 border-[#032685] text-[#032685] px-8 md:px-12 py-3 md:py-4 rounded-xl text-lg md:text-xl font-bold hover:bg-[#e6f2ff] transition-colors duration-300"
            >
              {secondaryButton.text}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
