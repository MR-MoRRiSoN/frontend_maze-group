import React from "react";
import { useTranslations } from "next-intl";
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
          className: `w-6 h-6 ${getIconTextColor(index)}`,
        }
      );
    }
    // Fallback if icon is not a valid React element
    return <div className={`w-6 h-6 ${getIconTextColor(index)}`} />;
  };

  return (
    <Card
      key={`${keyPrefix}-${index}`}
      className={`flex-shrink-0 w-96 transition-all duration-500 hover:scale-105 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBgColor(
              index
            )}`}
          >
            {renderIcon()}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-xl mb-4">
            {benefit.title}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            {benefit.description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {statEntries.map((stat: StatEntry) => (
          <div key={stat.key} className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-sm font-bold text-blue-800">{stat.value}</div>
            <div className="text-xs text-gray-600 capitalize">
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

  return (
    <section id="benefits" className="py-32 bg-gray-50" data-section="benefits">
      <div className="container mx-auto px-8 max-w-7xl">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-6xl font-bold text-gray-900 mb-6">
            {t("benefits.title")}
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t("benefits.subtitle")}
          </p>
        </div>
      </div>

      {/* Full width horizontal scrolling container */}
      <div className="relative overflow-hidden w-full select-none pt-4 pb-16">
        <div className="flex animate-scroll-infinite gap-6 pl-6">
          {/* First set of cards */}
          {benefitsList.map((benefit: Benefit, index: number) => (
            <BenefitCard
              key={`first-${index}`}
              benefit={benefit}
              index={index}
              isVisible={isVisible}
              keyPrefix="first"
            />
          ))}

          {/* Second set of cards for seamless loop */}
          {benefitsList.map((benefit: Benefit, index: number) => (
            <BenefitCard
              key={`second-${index}`}
              benefit={benefit}
              index={index}
              isVisible={isVisible}
              keyPrefix="second"
            />
          ))}

          {/* Third set of cards for extra smoothness */}
          {benefitsList.map((benefit: Benefit, index: number) => (
            <BenefitCard
              key={`third-${index}`}
              benefit={benefit}
              index={index}
              isVisible={isVisible}
              keyPrefix="third"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 20s linear infinite;
          width: calc(300%);
        }

        /* Responsive speed adjustments */
        @media (max-width: 768px) {
          .animate-scroll-infinite {
            animation: scroll-infinite 20s linear infinite;
          }
        }

        @media (max-width: 480px) {
          .animate-scroll-infinite {
            animation: scroll-infinite 15s linear infinite;
          }
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;
