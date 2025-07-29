import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { getBenefits } from "@/lib/data/benefits";
import { Benefit } from "../../types/benefit";

// Type definitions
interface BenefitsSectionProps {
  isVisible?: boolean;
}

interface ColorPattern {
  bgColor: string;
  textColor: string;
}

interface StatEntry {
  key: string;
  value: string;
}

// Color configuration
const colorPatterns: ColorPattern[] = [
  { bgColor: "bg-blue-100", textColor: "text-blue-600" },
  { bgColor: "bg-green-100", textColor: "text-green-600" },
  { bgColor: "bg-purple-100", textColor: "text-purple-600" },
  { bgColor: "bg-orange-100", textColor: "text-orange-600" },
  { bgColor: "bg-red-100", textColor: "text-red-600" },
  { bgColor: "bg-teal-100", textColor: "text-teal-600" },
  { bgColor: "bg-indigo-100", textColor: "text-indigo-600" },
  { bgColor: "bg-pink-100", textColor: "text-pink-600" },
  { bgColor: "bg-yellow-100", textColor: "text-yellow-600" },
];

// Helper functions for consistent color patterns
const getIconBgColor = (index: number): string => {
  return colorPatterns[index % colorPatterns.length].bgColor;
};

const getIconTextColor = (index: number): string => {
  return colorPatterns[index % colorPatterns.length].textColor;
};

// Component for individual benefit card
interface BenefitCardProps {
  benefit: Benefit;
  index: number;
  isVisible: boolean;
  keyPrefix: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  benefit,
  index,
  isVisible,
  keyPrefix,
}) => {
  const statEntries: StatEntry[] = Object.entries(benefit.stats).map(
    ([key, value]) => ({
      key,
      value: String(value),
    })
  );

  // Safe icon rendering with type checking
  const renderIcon = (): React.ReactElement => {
    if (React.isValidElement(benefit.icon)) {
      return React.cloneElement(
        benefit.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
        {
          className: `w-5 h-5 sm:w-6 sm:h-6 ${getIconTextColor(index)}`,
        }
      );
    }
    // Fallback if icon is not a valid React element
    return (
      <div className={`w-5 h-5 sm:w-6 sm:h-6 ${getIconTextColor(index)}`} />
    );
  };

  return (
    <Card
      key={`${keyPrefix}-${index}`}
      className={`flex-shrink-0 w-80 sm:w-96 transition-all duration-500 hover:scale-105 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex items-start space-x-4 sm:space-x-6">
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${getIconBgColor(
              index
            )}`}
          >
            {renderIcon()}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl lg:text-xl mb-3 sm:mb-4 leading-tight">
            {benefit.title}
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm lg:text-sm leading-relaxed mb-4 sm:mb-6">
            {benefit.description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {statEntries.map((stat: StatEntry) => (
          <div
            key={stat.key}
            className="bg-blue-50 rounded-lg p-2 sm:p-3 text-center"
          >
            <div className="text-xs sm:text-sm font-bold text-blue-800">
              {stat.value}
            </div>
            <div className="text-xs text-gray-600 capitalize leading-tight">
              {stat.key.replace(/([A-Z])/g, " $1").trim()}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Main component
export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  isVisible = true,
}) => {
  const t = useTranslations();
  const benefitsList: Benefit[] = getBenefits(t);
  const [isPaused, setIsPaused] = React.useState(false);

  // Duplicate the list for seamless scrolling
  const duplicatedBenefits = [
    ...benefitsList,
    ...benefitsList,
    ...benefitsList,
  ];

  // Calculate responsive card width for animation
  const getCardWidth = () => {
    // Base width: 320px (w-80) for mobile, 384px (w-96) for desktop
    // Gap: 16px (gap-4) for mobile, 24px (gap-6) for desktop
    // Using desktop values for animation calculation
    return 408; // 384px + 24px gap
  };

  return (
    <section
      id="benefits"
      className="py-16 sm:py-24 lg:py-32 bg-gray-50"
      data-section="benefits"
    >
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${benefitsList.length * getCardWidth()}px);
          }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {t("benefits.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            {t("benefits.subtitle")}
          </p>
        </div>
      </div>

      {/* Horizontal scroll with CSS animation */}
      <div
        className="relative overflow-hidden w-full select-none pt-2 sm:pt-4 pb-20 sm:pb-12 lg:pb-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-4 sm:gap-6"
          style={{
            animation: `scroll-left 50s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {duplicatedBenefits.map((benefit: Benefit, index: number) => (
            <BenefitCard
              key={`benefit-${index}`}
              benefit={benefit}
              index={index % benefitsList.length}
              isVisible={isVisible}
              keyPrefix="benefit"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
